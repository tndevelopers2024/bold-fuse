"use server";

import { randomBytes, timingSafeEqual } from "node:crypto";
import { ObjectId, MongoServerError } from "mongodb";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { after } from "next/server";
import { accountKey, digest, requireAdmin, sessionCookie } from "./auth";
import { hiringDb, stages, type Stage } from "./db";
import { notifyHiringApplication } from "./notify";
import type { ActionResult } from "./types";

function field(data: FormData, key: string, max: number) {
  const value = data.get(key);
  if (typeof value !== "string" || value.length > max) return "";
  return value.trim();
}

export async function login(_: string, data: FormData) {
  const email = field(data, "email", 254).toLowerCase();
  const expected = process.env.HIRING_ADMIN_PASSWORD;
  if (!expected || !process.env.HIRING_ADMIN_EMAIL || !process.env.MONGODB_URI)
    return "Admin sign-in has not been configured.";
  if (email !== process.env.HIRING_ADMIN_EMAIL.trim().toLowerCase())
    return "Invalid email or password.";
  try {
    const { attempts, sessions } = await hiringDb();
    const windowMs = 10 * 60 * 1000;
    const bucket = Math.floor(Date.now() / windowMs);
    const attempt = await attempts.findOneAndUpdate(
      { _id: String(bucket) },
      {
        $inc: { count: 1 },
        $setOnInsert: { expires: new Date((bucket + 1) * windowMs) },
      },
      { upsert: true, returnDocument: "after" },
    );
    if (attempt && attempt.count > 20)
      return "Too many attempts. Try again in ten minutes.";
    const password = data.get("password");
    if (
      typeof password !== "string" ||
      !timingSafeEqual(
        Buffer.from(digest(password)),
        Buffer.from(digest(expected)),
      )
    )
      return "Invalid email or password.";
    const token = randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 8 * 3600 * 1000);
    await sessions.insertOne({
      _id: digest(token),
      expires,
      account: accountKey(),
    });
    (await cookies()).set(sessionCookie, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/admin",
      expires,
    });
  } catch (error) {
    console.error("Admin sign-in failed.", error);
    return "Sign-in is temporarily unavailable. Please try again.";
  }
  redirect("/admin/");
}

export async function logout() {
  const jar = await cookies();
  const token = jar.get(sessionCookie)?.value;
  if (token) {
    try {
      await (await hiringDb()).sessions.deleteOne({ _id: digest(token) });
    } catch (error) {
      console.error("Failed to remove admin session on sign-out.", error);
    }
  }
  jar.set(sessionCookie, "", { path: "/admin", maxAge: 0 });
  redirect("/admin/");
}

export async function publishJob(
  data: FormData,
): Promise<ActionResult<{ jobId: string }>> {
  await requireAdmin();
  const title = field(data, "title", 120);
  const location = field(data, "location", 160);
  const description = field(data, "description", 8000);
  if (!title || !location || !description) {
    return {
      ok: false,
      error:
        "Enter the title, location, and description within the field limits.",
    };
  }
  try {
    const { jobs } = await hiringDb();
    const { insertedId } = await jobs.insertOne({
      title,
      location,
      description,
      open: true,
      applicants: 0,
      createdAt: new Date(),
    });
    revalidatePath("/admin");
    revalidatePath("/careers");
    return {
      ok: true,
      message: `Published “${title}” to Careers.`,
      data: { jobId: insertedId.toString() },
    };
  } catch (error) {
    console.error("Failed to publish job posting.", error);
    return {
      ok: false,
      error:
        "Could not publish the posting right now. Your draft has been kept — please try again.",
    };
  }
}

export async function setJobOpen(
  id: string,
  open: boolean,
): Promise<ActionResult> {
  await requireAdmin();
  if (!ObjectId.isValid(id) || typeof open !== "boolean") {
    return { ok: false, error: "Invalid job posting." };
  }
  try {
    const result = await (
      await hiringDb()
    ).jobs.updateOne({ _id: new ObjectId(id) }, { $set: { open } });
    if (!result.matchedCount) {
      return { ok: false, error: "That job posting could not be found." };
    }
    revalidatePath("/admin");
    revalidatePath("/careers");
    return {
      ok: true,
      message: open
        ? "Posting reopened and visible on Careers."
        : "Posting closed and hidden from Careers.",
    };
  } catch (error) {
    console.error("Failed to update job posting status.", error);
    return {
      ok: false,
      error: "Could not update the posting status right now. Please try again.",
    };
  }
}

export async function applyToJob(id: string, _: string, data: FormData) {
  const name = field(data, "name", 120);
  const email = field(data, "email", 254).toLowerCase();
  const phone = field(data, "phone", 30);
  if (
    !ObjectId.isValid(id) ||
    !name ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  )
    return "Enter your name and a valid email address.";
  const phoneDigits = phone.replace(/\D/g, "");
  if (
    !phone ||
    !/^[+\d\s().-]+$/.test(phone) ||
    phoneDigits.length < 7 ||
    phoneDigits.length > 15
  )
    return "Enter a valid mobile number (7 to 15 digits).";
  const { client, jobs, applications } = await hiringDb();
  const jobId = new ObjectId(id);
  let isNewApplication = false;
  try {
    const accepted = await client.withSession((session) =>
      session.withTransaction(async () => {
        const job = await jobs.updateOne(
          { _id: jobId, open: true },
          { $inc: { applicants: 1 } },
          { session },
        );
        if (!job.matchedCount) return false;
        await applications.insertOne(
          {
            jobId,
            name,
            email,
            phone,
            stage: "Applied",
            createdAt: new Date(),
          },
          { session },
        );
        return true;
      }),
    );
    if (!accepted) return "This opening has closed.";
    isNewApplication = true;
  } catch (error) {
    if (!(error instanceof MongoServerError && error.code === 11000))
      throw error;
    // Return the same acknowledgement for repeat submissions.
  }
  if (isNewApplication) {
    const appliedAt = new Date();
    after(() =>
      notifyHiringApplication({
        jobId,
        name,
        email,
        phone,
        appliedAt,
      }),
    );
  }
  revalidatePath("/admin");
  return "Application received. Thank you for applying.";
}

export async function updateStage(
  id: string,
  stageInput: string,
): Promise<ActionResult<{ stage: Stage }>> {
  await requireAdmin();
  const stage = stageInput.trim() as Stage;
  if (!ObjectId.isValid(id) || !stages.includes(stage)) {
    return { ok: false, error: "Invalid candidate status." };
  }
  try {
    const result = await (
      await hiringDb()
    ).applications.updateOne({ _id: new ObjectId(id) }, { $set: { stage } });
    if (!result.matchedCount) {
      return { ok: false, error: "That candidate application was not found." };
    }
    revalidatePath("/admin");
    return {
      ok: true,
      message: `Candidate status saved as ${stage}.`,
      data: { stage },
    };
  } catch (error) {
    console.error("Failed to update candidate stage.", error);
    return {
      ok: false,
      error: "Could not save the candidate status right now. Please try again.",
    };
  }
}

export async function deleteJob(id: string): Promise<ActionResult> {
  await requireAdmin();
  if (!ObjectId.isValid(id)) {
    return { ok: false, error: "Invalid job posting." };
  }
  try {
    const { client, jobs, applications } = await hiringDb();
    const jobId = new ObjectId(id);
    const deleted = await client.withSession((session) =>
      session.withTransaction(async () => {
        const jobResult = await jobs.deleteOne({ _id: jobId }, { session });
        if (!jobResult.deletedCount) return false;
        await applications.deleteMany({ jobId }, { session });
        return true;
      }),
    );
    if (!deleted) {
      return { ok: false, error: "That job posting could not be found." };
    }
    revalidatePath("/admin");
    revalidatePath("/careers");
    return {
      ok: true,
      message: "Job posting deleted.",
    };
  } catch (error) {
    console.error("Failed to delete job posting.", error);
    return {
      ok: false,
      error: "Could not delete the job posting right now. Please try again.",
    };
  }
}

export async function deleteCandidate(id: string): Promise<ActionResult> {
  await requireAdmin();
  if (!ObjectId.isValid(id)) {
    return { ok: false, error: "Invalid candidate application." };
  }
  try {
    const { client, jobs, applications } = await hiringDb();
    const appId = new ObjectId(id);
    const deletedName = await client.withSession((session) =>
      session.withTransaction(async () => {
        const removed = await applications.findOneAndDelete(
          { _id: appId },
          { session },
        );
        if (!removed) return null;
        await jobs.updateOne(
          { _id: removed.jobId, applicants: { $gt: 0 } },
          { $inc: { applicants: -1 } },
          { session },
        );
        return removed.name;
      }),
    );
    if (!deletedName) {
      return { ok: false, error: "That candidate application was not found." };
    }
    revalidatePath("/admin");
    return {
      ok: true,
      message: `Deleted candidate “${deletedName}”.`,
    };
  } catch (error) {
    console.error("Failed to delete candidate application.", error);
    return {
      ok: false,
      error: "Could not delete the candidate right now. Please try again.",
    };
  }
}
