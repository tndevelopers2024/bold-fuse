import "server-only";
import { createHash } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { hiringDb } from "./db";

export const sessionCookie = "boldfuse_hiring_session";
export function digest(value: string) {
  return createHash("sha256").update(value).digest("hex");
}
export function accountKey() {
  return digest(
    JSON.stringify([
      process.env.HIRING_ADMIN_EMAIL,
      process.env.HIRING_ADMIN_PASSWORD,
    ]),
  );
}
export async function signedIn() {
  const token = (await cookies()).get(sessionCookie)?.value;
  if (
    !token ||
    !process.env.HIRING_ADMIN_PASSWORD ||
    !process.env.HIRING_ADMIN_EMAIL
  )
    return false;
  const { sessions } = await hiringDb();
  return Boolean(
    await sessions.findOne({
      _id: digest(token),
      expires: { $gt: new Date() },
      account: accountKey(),
    }),
  );
}
export async function requireAdmin() {
  if (!(await signedIn())) redirect("/admin/");
}
