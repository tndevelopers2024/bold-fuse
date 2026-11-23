import { ObjectId } from "mongodb";
import { requireAdmin } from "@/lib/hiring/auth";
import { hiringDb } from "@/lib/hiring/db";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireAdmin();
  } catch {
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
    const { resumes } = await hiringDb();
    const candidateId = new ObjectId(id);
    let doc = await resumes.findOne({ candidateId });
    if (!doc) {
      doc = await resumes.findOne({ _id: candidateId });
    }
    if (!doc || !doc.data) {
      return new Response("Resume file not found", { status: 404 });
    }

    const url = new URL(request.url);
    const download = url.searchParams.get("download") === "1";
    const disposition = download ? "attachment" : "inline";
    const filename = (doc.filename || "resume.pdf").replace(/["\r\n]/g, "");

    return new Response(doc.data as unknown as BodyInit, {
      status: 200,
      headers: {
        "Content-Type": doc.contentType || "application/pdf",
        "Content-Disposition": `${disposition}; filename="${encodeURIComponent(filename)}"`,
        "Content-Length": String(doc.size || doc.data.length),
        "Cache-Control": "private, no-cache, no-store",
      },
    });
  } catch (error) {
    console.error("Failed to retrieve candidate resume.", error);
    return new Response("Could not load resume file.", { status: 500 });
  }
}
