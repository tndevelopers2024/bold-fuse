import Link from "next/link";
import { itRecruitment } from "@/content/careers";
import { hiringDb } from "@/lib/hiring/db";
import { LiveUpdates } from "./LiveUpdates";
import { OpeningsGrid, type PublicOpening } from "./OpeningsGrid";

async function availableJobs(): Promise<PublicOpening[] | null> {
  try {
    const docs = await (
      await hiringDb()
    ).jobs
      .find({ open: true })
      .sort({ createdAt: -1 })
      .toArray();
    return docs.map((job) => ({
      id: job._id.toString(),
      title: job.title,
      location: job.location,
      description: job.description,
      postedAt: job.postedAt?.toISOString(),
      createdAt:
        job.createdAt instanceof Date
          ? job.createdAt.toISOString()
          : new Date().toISOString(),
    }));
  } catch {
    console.error("Hiring openings could not be loaded.");
    return null;
  }
}

const fallbackJobs: PublicOpening[] = [
  {
    id: "job-mbd-mumbai",
    title: "Manager-Business Developemnt",
    location: "Mumbai",
    description:
      "Exp - 4-8 yrs\n• Business Development: Identify and acquire new B2B customers, focusing on hospitals, diagnostic centres, pharmaceutical companies...\nRevenue & P&L Ownership: Drive top-line revenue, surgical volumes, and brand presence.",
    postedAt: "2026-11-23T00:00:00.000Z",
    createdAt: "2026-11-23T00:00:00.000Z",
  },
  {
    id: "job-crs-cochin",
    title: "Cataract & Refractive Surgeon",
    location: "Cochin",
    description:
      "Exp - 5-10 yrs\n*Perform independent phacoemulsification and intraocular lens (IOL) implantation surgeries, manual small incision cataract surger...",
    postedAt: "2026-11-23T00:00:00.000Z",
    createdAt: "2026-11-23T00:00:00.000Z",
  },
  {
    id: "job-mbd-chennai",
    title: "Manager-Business Developemnt",
    location: "Chennai",
    description:
      "Exp - 4-8 yrs\nBusiness Acquisition & Field Sales: aggressive new customer acquisition, cold calling, field visits, direct...",
    postedAt: "2026-11-23T00:00:00.000Z",
    createdAt: "2026-11-23T00:00:00.000Z",
  },
];

export default async function Openings({ showPreview }: { showPreview: boolean }) {
  const loaded = await availableJobs();
  const jobs = showPreview ? fallbackJobs : loaded;

  return (
    <section
      id="openings"
      aria-labelledby="openings-heading"
      className="mt-12 scroll-mt-24 sm:mt-16"
    >
      {!showPreview && <LiveUpdates />}
      <div className="border-b border-line pb-6">
        <div className="flex flex-wrap items-center gap-2.5">
          <p className="text-xs font-semibold tracking-[0.2em] text-accent-ink uppercase">
            Open Positions
          </p>
          {jobs && jobs.length > 0 && (
            <span className="inline-flex items-center rounded-full border border-accent/35 bg-accent/12 px-2.5 py-0.5 text-xs font-semibold text-accent-ink tabular-nums">
              {showPreview
                ? "Sample listing"
                : `${jobs.length} ${jobs.length === 1 ? "open role" : "open roles"}`}
            </span>
          )}
        </div>
        <h2
          id="openings-heading"
          className="mt-2 font-heading text-2xl font-bold tracking-tight text-forest sm:text-3xl"
        >
          {itRecruitment.hiringPositions.title}
        </h2>
        <p className="mt-3 max-w-3xl font-description text-base font-medium text-muted">
          {itRecruitment.hiringPositions.lead}
        </p>
      </div>

      {!jobs?.length ? (
        <div className="mt-8 rounded-3xl border border-dashed border-line bg-white px-6 py-12 text-center">
          <h3 className="font-heading text-lg font-bold text-forest">
            {jobs
              ? "There are no open postings at the moment."
              : "Openings are temporarily unavailable."}
          </h3>
          <p className="mx-auto mt-2 max-w-md font-description text-sm font-medium text-muted">
            {jobs
              ? "New openings published by our team will appear here automatically. You can also share your résumé by email below."
              : "You can still send your résumé by email below while we restore live listings."}
          </p>
          {process.env.NODE_ENV === "development" && (
            <Link
              href="/careers/?preview=1#openings"
              className="mt-4 inline-flex min-h-10 items-center font-semibold text-accent-ink underline underline-offset-4"
            >
              Preview a sample job card
            </Link>
          )}
        </div>
      ) : (
        <OpeningsGrid jobs={jobs} showPreview={showPreview} />
      )}
    </section>
  );
}
