import "server-only";
import type { ObjectId } from "mongodb";
import nodemailer from "nodemailer";
import { hiringDb } from "./db";

const DEFAULT_RECIPIENT = "hiring@boldfuse.in";

export interface ApplicationNotification {
  jobId: ObjectId;
  name: string;
  email: string;
  phone: string;
  resumeUrl?: string;
  resumeFileName?: string;
  resumeBuffer?: Buffer;
  appliedAt: Date;
}

function sanitizeHeader(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatAppliedAt(date: Date): string {
  try {
    return new Intl.DateTimeFormat("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Asia/Kolkata",
    }).format(date);
  } catch {
    return date.toISOString();
  }
}

function resolveSmtpConfig() {
  const host = process.env.SMTP_HOST?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) return null;

  const parsedPort = Number(process.env.SMTP_PORT || 465);
  const port =
    Number.isInteger(parsedPort) && parsedPort > 0 ? parsedPort : 465;

  const secureEnv = process.env.SMTP_SECURE?.trim().toLowerCase();
  const secure =
    secureEnv === "true"
      ? true
      : secureEnv === "false"
        ? false
        : port === 465;

  const from =
    process.env.SMTP_FROM?.trim() || `Boldfuse Careers <${user}>`;
  const to = process.env.HIRING_NOTIFICATION_EMAIL?.trim() || DEFAULT_RECIPIENT;

  return { host, port, secure, user, pass, from, to };
}

export async function notifyHiringApplication(
  application: ApplicationNotification,
): Promise<void> {
  try {
    const smtp = resolveSmtpConfig();
    if (!smtp) {
      console.warn(
        "[Hiring Email] SMTP_HOST, SMTP_USER, or SMTP_PASS is not configured; skipped notification email.",
      );
      return;
    }

    let jobTitle = "IT Position";
    let jobLocation = "—";
    try {
      const { jobs } = await hiringDb();
      const job = await jobs.findOne(
        { _id: application.jobId },
        { projection: { title: 1, location: 1 } },
      );
      if (job?.title) jobTitle = job.title;
      if (job?.location) jobLocation = job.location;
    } catch (lookupError) {
      console.error(
        "[Hiring Email] Could not look up job metadata; sending email with fallback role title.",
        lookupError,
      );
    }

    const safeTitle = sanitizeHeader(jobTitle);
    const safeName = sanitizeHeader(application.name);
    const safeEmail = sanitizeHeader(application.email);
    const safePhone = sanitizeHeader(application.phone);
    const safeLocation = sanitizeHeader(jobLocation);
    const submittedAt = `${formatAppliedAt(application.appliedAt)} IST`;

    const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://boldfuse.in")
      .trim()
      .replace(/\/+$/, "");
    const adminUrl = `${siteUrl}/admin/`;

    const subject = `New Job Application: ${safeTitle} — ${safeName}`;

    const textLines = [
      "New job application received on Boldfuse Careers.",
      "",
      `Role: ${safeTitle}`,
      `Location: ${safeLocation}`,
      "",
      "Applicant Details",
      `Full Name: ${safeName}`,
      `Email: ${safeEmail}`,
      `Mobile: ${safePhone}`,
    ];
    if (application.resumeUrl) {
      textLines.push(`Resume Link: ${sanitizeHeader(application.resumeUrl)}`);
    }
    if (application.resumeFileName) {
      textLines.push(
        `Resume File: ${sanitizeHeader(application.resumeFileName)} (attached)`,
      );
    }
    textLines.push(
      `Submitted: ${submittedAt} (${application.appliedAt.toISOString()})`,
      "",
      `Review in Hiring Dashboard: ${adminUrl}`,
    );
    const text = textLines.join("\n");

    const telHref = safePhone.replace(/[^\d+]/g, "");

    const html = `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:24px;background-color:#f5f7f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#102a22;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;margin:0 auto;background-color:#ffffff;border:1px solid #d9e5df;border-radius:16px;overflow:hidden;">
      <tr>
        <td style="background-color:#0b3d2e;padding:24px 28px;color:#ffffff;">
          <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:#61c6a8;">Boldfuse Careers</p>
          <h1 style="margin:8px 0 0;font-size:20px;line-height:1.3;font-weight:700;color:#ffffff;">New Job Application</h1>
        </td>
      </tr>
      <tr>
        <td style="padding:24px 28px;">
          <p style="margin:0 0 16px;font-size:14px;line-height:1.6;color:#3d554c;">
            A new candidate has applied through the Careers page.
          </p>
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;border:1px solid #e2ece7;border-radius:12px;">
            <tr>
              <td style="padding:10px 14px;border-bottom:1px solid #e2ece7;font-size:13px;font-weight:600;color:#4a6359;width:140px;">Role</td>
              <td style="padding:10px 14px;border-bottom:1px solid #e2ece7;font-size:14px;font-weight:700;color:#0b3d2e;">${escapeHtml(safeTitle)}</td>
            </tr>
            <tr>
              <td style="padding:10px 14px;border-bottom:1px solid #e2ece7;font-size:13px;font-weight:600;color:#4a6359;">Location</td>
              <td style="padding:10px 14px;border-bottom:1px solid #e2ece7;font-size:14px;font-weight:500;color:#102a22;">${escapeHtml(safeLocation)}</td>
            </tr>
            <tr>
              <td style="padding:10px 14px;border-bottom:1px solid #e2ece7;font-size:13px;font-weight:600;color:#4a6359;">Full Name</td>
              <td style="padding:10px 14px;border-bottom:1px solid #e2ece7;font-size:14px;font-weight:600;color:#102a22;">${escapeHtml(safeName)}</td>
            </tr>
            <tr>
              <td style="padding:10px 14px;border-bottom:1px solid #e2ece7;font-size:13px;font-weight:600;color:#4a6359;">Email</td>
              <td style="padding:10px 14px;border-bottom:1px solid #e2ece7;font-size:14px;font-weight:500;color:#102a22;">
                <a href="mailto:${escapeHtml(safeEmail)}" style="color:#007a58;text-decoration:underline;">${escapeHtml(safeEmail)}</a>
              </td>
            </tr>
            <tr>
              <td style="padding:10px 14px;border-bottom:1px solid #e2ece7;font-size:13px;font-weight:600;color:#4a6359;">Mobile</td>
              <td style="padding:10px 14px;border-bottom:1px solid #e2ece7;font-size:14px;font-weight:500;color:#102a22;">
                <a href="tel:${escapeHtml(telHref)}" style="color:#007a58;text-decoration:underline;">${escapeHtml(safePhone)}</a>
              </td>
            </tr>
            ${
              application.resumeUrl
                ? `<tr>
              <td style="padding:10px 14px;border-bottom:1px solid #e2ece7;font-size:13px;font-weight:600;color:#4a6359;">Resume Link</td>
              <td style="padding:10px 14px;border-bottom:1px solid #e2ece7;font-size:14px;font-weight:500;color:#102a22;">
                <a href="${escapeHtml(application.resumeUrl)}" target="_blank" rel="noopener noreferrer" style="color:#007a58;text-decoration:underline;">${escapeHtml(application.resumeUrl)}</a>
              </td>
            </tr>`
                : ""
            }
            ${
              application.resumeFileName
                ? `<tr>
              <td style="padding:10px 14px;border-bottom:1px solid #e2ece7;font-size:13px;font-weight:600;color:#4a6359;">Resume File</td>
              <td style="padding:10px 14px;border-bottom:1px solid #e2ece7;font-size:14px;font-weight:500;color:#102a22;">
                Attached (${escapeHtml(application.resumeFileName)})
              </td>
            </tr>`
                : ""
            }
            <tr>
              <td style="padding:10px 14px;font-size:13px;font-weight:600;color:#4a6359;">Submitted</td>
              <td style="padding:10px 14px;font-size:14px;font-weight:500;color:#102a22;">${escapeHtml(submittedAt)}</td>
            </tr>
          </table>
          <p style="margin:20px 0 0;font-size:13px;line-height:1.5;color:#4a6359;">
            You can reply directly to this email to contact the applicant, or open the
            <a href="${escapeHtml(adminUrl)}" style="color:#007a58;font-weight:600;text-decoration:underline;">Hiring Dashboard</a>.
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>`;

    const transporter = nodemailer.createTransport({
      host: smtp.host,
      port: smtp.port,
      secure: smtp.secure,
      auth: {
        user: smtp.user,
        pass: smtp.pass,
      },
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000,
    });

    const attachments = [];
    if (application.resumeBuffer && application.resumeFileName) {
      attachments.push({
        filename: application.resumeFileName,
        content: application.resumeBuffer,
        contentType: "application/pdf",
      });
    }

    await transporter.sendMail({
      from: smtp.from,
      to: smtp.to,
      replyTo: safeEmail,
      subject,
      text,
      html,
      attachments,
    });
  } catch (error) {
    console.error(
      "[Hiring Email] Failed to send application notification.",
      error,
    );
  }
}
