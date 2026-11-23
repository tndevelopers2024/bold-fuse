import { ObjectId } from "mongodb";
import { signedIn } from "@/lib/hiring/auth";
import { hiringDb } from "@/lib/hiring/db";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await signedIn())) {
    return new Response("Unauthorized", {
      status: 401,
      headers: { "Cache-Control": "no-store" },
    });
  }

  const { id } = await params;
  if (!ObjectId.isValid(id)) {
    return new Response("Invalid candidate ID", { status: 400 });
  }

  try {
    const { resumes, applications } = await hiringDb();
    const targetId = new ObjectId(id);

    // Look up resume by candidateId, by resume _id, or via application doc
    let doc = await resumes.findOne({ candidateId: targetId });
    if (!doc) {
      doc = await resumes.findOne({ candidateId: id as unknown as ObjectId });
    }
    if (!doc) {
      doc = await resumes.findOne({ _id: targetId });
    }
    if (!doc) {
      const app =
        (await applications.findOne({ _id: targetId })) ||
        (await applications.findOne({ _id: id as unknown as ObjectId }));
      if (app?.resumeFileId) {
        doc =
          (await resumes.findOne({ _id: app.resumeFileId })) ||
          (await resumes.findOne({ _id: new ObjectId(app.resumeFileId) })) ||
          (await resumes.findOne({
            _id: String(app.resumeFileId) as unknown as ObjectId,
          }));
      }
    }

    if (!doc || !doc.data) {
      return new Response("Resume file not found", { status: 404 });
    }

    // Extract raw buffer from MongoDB Binary or Buffer to avoid text corruption
    const rawData = doc.data as {
      buffer?: Buffer | ArrayBuffer;
      read?: (offset: number, length: number) => Buffer;
      length?: (() => number) | number;
    } | Buffer;

    let fileBuffer: Buffer;
    if (Buffer.isBuffer(rawData)) {
      fileBuffer = rawData;
    } else if (rawData?.buffer && Buffer.isBuffer(rawData.buffer)) {
      fileBuffer = rawData.buffer;
    } else if (rawData?.buffer && rawData.buffer instanceof ArrayBuffer) {
      fileBuffer = Buffer.from(rawData.buffer);
    } else if (
      typeof rawData?.read === "function" &&
      typeof rawData.length === "function"
    ) {
      fileBuffer = rawData.read(0, rawData.length());
    } else {
      fileBuffer = Buffer.from(rawData as unknown as Uint8Array);
    }

    const url = new URL(request.url);
    const isDownload = url.searchParams.get("download") === "1";
    const rawFilename = (doc.filename || "resume.pdf").replace(/["\r\n]/g, "");
    const safeAsciiName =
      rawFilename.replace(/[^\x20-\x7E]/g, "_").replace(/["\\]/g, "") ||
      "resume.pdf";
    const encodedFilename = encodeURIComponent(rawFilename);

    const dispositionType = isDownload ? "attachment" : "inline";
    // application/octet-stream for download=1 guarantees the browser downloads the file directly
    // rather than intercepting it in the browser PDF viewer
    const contentType = isDownload
      ? "application/octet-stream"
      : doc.contentType || "application/pdf";

    return new Response(new Uint8Array(fileBuffer), {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `${dispositionType}; filename="${safeAsciiName}"; filename*=UTF-8''${encodedFilename}`,
        "Content-Length": String(fileBuffer.length),
        "X-Content-Type-Options": "nosniff",
        "Cache-Control": "private, no-cache, no-store",
      },
    });
  } catch (error) {
    console.error("Failed to retrieve candidate resume.", error);
    return new Response("Could not load resume file.", { status: 500 });
  }
}
