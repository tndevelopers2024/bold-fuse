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

export default async function Openings() {
  const jobs = await availableJobs();

  return (
    <section
      id="openings"
      aria-labelledby="openings-heading"
      className="mt-12 scroll-mt-24 sm:mt-16"
    >
      <LiveUpdates />
      <div className="border-b border-line pb-6">
        <div className="flex flex-wrap items-center gap-2.5">
          <p className="text-xs font-semibold tracking-[0.2em] text-accent-ink uppercase">
            Open Positions
          </p>
          {jobs && jobs.length > 0 && (
            <span className="inline-flex items-center rounded-full border border-accent/35 bg-accent/12 px-2.5 py-0.5 text-xs font-semibold text-accent-ink tabular-nums">
              {jobs.length} {jobs.length === 1 ? "open role" : "open roles"}
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
        </div>
      ) : (
        <OpeningsGrid jobs={jobs} />
      )}
    </section>
  );
}
