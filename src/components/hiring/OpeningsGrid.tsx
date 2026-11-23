"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  MapPin,
  X,
} from "lucide-react";
import { applyToJob } from "@/lib/hiring/actions";
import { inputClass } from "@/components/hiring/Forms";

export interface PublicOpening {
  id: string;
  title: string;
  location: string;
  description: string;
  createdAt: string;
}

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

function formatPostedDate(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return dateFormatter.format(date);
}

interface ApplicationDraft {
  name: string;
  email: string;
  phone: string;
}

const emptyDraft: ApplicationDraft = {
  name: "",
  email: "",
  phone: "",
};

function descriptionPreview(description: string) {
  return description.split("\n", 3).join("\n").slice(0, 150).trimEnd();
}

export function OpeningsGrid({
  jobs,
  showPreview,
}: {
  jobs: PublicOpening[];
  showPreview: boolean;
}) {
  const [activeJobId, setActiveJobId] = useState<string | null>(null);
  const [expandedDescriptions, setExpandedDescriptions] = useState<
    Record<string, boolean>
  >({});
  // Keep unsaved form drafts per job ID so incoming SSE updates never clear them
  const [drafts, setDrafts] = useState<Record<string, ApplicationDraft>>({});
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{
    tone: "success" | "error";
    text: string;
  } | null>(null);

  const dialogRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const submittingRef = useRef(submitting);

  useEffect(() => {
    submittingRef.current = submitting;
  }, [submitting]);

  const activeJob =
    activeJobId !== null
      ? (jobs.find((job) => job.id === activeJobId) ?? null)
      : null;

  const isModalOpen = activeJob !== null;

  useEffect(() => {
    if (!isModalOpen) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = setTimeout(() => {
      nameInputRef.current?.focus();
    }, 20);

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        if (!submittingRef.current) {
          setActiveJobId(null);
          setFeedback(null);
        }
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusables = [
        ...dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ].filter((el) => el.getClientRects().length > 0);
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(focusTimer);
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [isModalOpen]);

  const currentDraft =
    activeJob ? (drafts[activeJob.id] ?? emptyDraft) : emptyDraft;

  function updateDraft(patch: Partial<ApplicationDraft>) {
    if (!activeJob) return;
    setDrafts((prev) => ({
      ...prev,
      [activeJob.id]: {
        ...(prev[activeJob.id] ?? emptyDraft),
        ...patch,
      },
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!activeJob) return;
    setSubmitting(true);
    setFeedback(null);
    try {
      const formData = new FormData();
      formData.set("name", currentDraft.name);
      formData.set("email", currentDraft.email);
      formData.set("phone", currentDraft.phone);
      const message = await applyToJob(activeJob.id, "", formData);
      const isError =
        /enter|closed|unavailable|invalid/i.test(message);
      setFeedback({
        tone: isError ? "error" : "success",
        text: message,
      });
      if (!isError) {
        setDrafts((prev) => {
          const next = { ...prev };
          delete next[activeJob.id];
          return next;
        });
      }
    } catch {
      setFeedback({
        tone: "error",
        text: "Could not submit your application right now. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {jobs.map((job) => {
          const posted = formatPostedDate(job.createdAt);
          const description = job.description.trimEnd();
          const preview = descriptionPreview(description);
          const hasMore = preview !== description;
          const expanded = expandedDescriptions[job.id] ?? false;
          const descriptionId = `job-description-${job.id}`;
          return (
            <article
              key={job.id}
              className="flex flex-col justify-between rounded-3xl border border-line bg-white p-5"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/35 bg-accent/12 px-2.5 py-0.5 text-xs font-semibold text-accent-ink">
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 rounded-full bg-accent-ink"
                    />
                    Open
                  </span>
                  {posted && (
                    <span className="text-xs font-medium text-muted">
                      {posted}
                    </span>
                  )}
                </div>

                <h3 className="mt-3.5 font-heading text-lg font-bold break-words text-forest">
                  {job.title}
                </h3>

                <p className="mt-1.5 flex items-center gap-1.5 text-sm font-semibold break-words text-accent-ink">
                  <MapPin size={14} aria-hidden="true" className="shrink-0" />
                  <span className="min-w-0 break-words">{job.location}</span>
                </p>

                <p
                  id={descriptionId}
                  className="mt-3 font-description text-sm leading-relaxed font-medium break-words whitespace-pre-line text-muted"
                >
                  {hasMore && !expanded ? `${preview}…` : description}
                </p>
                {hasMore && (
                  <button
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={descriptionId}
                    aria-label={`${expanded ? "View less" : "View more"} about ${job.title}`}
                    onClick={() =>
                      setExpandedDescriptions((previous) => ({
                        ...previous,
                        [job.id]: !previous[job.id],
                      }))
                    }
                    className="mt-2 min-h-10 rounded-sm text-sm font-semibold text-accent-ink underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2"
                  >
                    {expanded ? "View less" : "View more"}
                  </button>
                )}
              </div>

              <div className="mt-5 border-t border-line/80 pt-4">
                <button
                  type="button"
                  disabled={showPreview}
                  onClick={() => {
                    setFeedback(null);
                    setActiveJobId(job.id);
                  }}
                  className="inline-flex min-h-10 w-full items-center justify-center rounded-full bg-forest px-4 py-2 text-sm font-semibold text-white enabled:hover:bg-forest-soft disabled:opacity-60"
                >
                  Apply for this role
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {/* Role Details & Application Modal */}
      {activeJob && (
        <div
          role="presentation"
          className="fixed inset-0 z-50 flex items-center justify-center bg-forest/70 p-4 sm:p-6"
          onClick={(event) => {
            if (event.target === event.currentTarget && !submitting) {
              setActiveJobId(null);
              setFeedback(null);
            }
          }}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="apply-modal-title"
            className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-line bg-white"
          >
            <div className="relative isolate flex items-start justify-between gap-4 overflow-hidden bg-forest-surface px-6 py-5 text-white sm:px-8 sm:py-6">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_0%_0%,rgba(2,170,119,0.28),transparent_60%),radial-gradient(ellipse_at_100%_100%,rgba(97,198,168,0.18),transparent_55%)]"
              >
                <svg
                  viewBox="0 0 640 200"
                  preserveAspectRatio="none"
                  focusable="false"
                  className="absolute inset-0 h-full w-full text-accent-soft"
                  fill="none"
                >
                  <path
                    d="M320 220C440 200 430 105 550 118S625 55 660 25"
                    stroke="currentColor"
                    strokeWidth="1"
                    opacity="0.16"
                  />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold tracking-[0.18em] text-accent-soft uppercase">
                  Open position
                </p>
                <h3
                  id="apply-modal-title"
                  className="mt-1 font-heading text-2xl font-bold break-words text-white"
                >
                  {activeJob.title}
                </h3>
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-medium text-white/85">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin size={14} aria-hidden="true" />
                    {activeJob.location}
                  </span>
                  {formatPostedDate(activeJob.createdAt) && (
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar size={14} aria-hidden="true" />
                      Posted {formatPostedDate(activeJob.createdAt)}
                    </span>
                  )}
                </div>
              </div>
              <button
                type="button"
                disabled={submitting}
                onClick={() => {
                  setActiveJobId(null);
                  setFeedback(null);
                }}
                aria-label="Close application dialog"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/25 text-white hover:bg-white/10 focus-visible:outline-accent-soft disabled:opacity-50"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>

            <div className="p-6 sm:p-8">
              <div className="rounded-2xl border border-line/80 bg-white p-4">
                <p className="text-xs font-semibold tracking-wider text-accent-ink uppercase">
                  Role description
                </p>
                <p className="mt-2 font-description text-sm leading-relaxed font-medium break-words whitespace-pre-line text-muted">
                  {activeJob.description}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
                <label className="block text-sm font-semibold text-forest">
                  Full name
                  <input
                    ref={nameInputRef}
                    className={inputClass}
                    type="text"
                    name="name"
                    required
                    maxLength={120}
                    autoComplete="name"
                    value={currentDraft.name}
                    onChange={(event) =>
                      updateDraft({ name: event.target.value })
                    }
                  />
                </label>

                <label className="block text-sm font-semibold text-forest">
                  Email address
                  <input
                    className={inputClass}
                    type="email"
                    name="email"
                    required
                    maxLength={254}
                    autoComplete="email"
                    value={currentDraft.email}
                    onChange={(event) =>
                      updateDraft({ email: event.target.value })
                    }
                  />
                </label>

                <label className="block text-sm font-semibold text-forest">
                  Mobile number
                  <input
                    className={inputClass}
                    type="tel"
                    name="phone"
                    required
                    maxLength={30}
                    autoComplete="tel"
                    placeholder="+91 98765 43210"
                    value={currentDraft.phone}
                    onChange={(event) =>
                      updateDraft({ phone: event.target.value })
                    }
                  />
                </label>

                {feedback && (
                  <div
                    role={feedback.tone === "error" ? "alert" : "status"}
                    className={
                      feedback.tone === "error"
                        ? "flex items-start gap-2.5 rounded-xl border border-danger/30 bg-danger/5 px-3.5 py-3 font-description text-sm font-medium text-danger"
                        : "flex items-start gap-2.5 rounded-xl border border-accent/35 bg-accent/10 px-3.5 py-3 font-description text-sm font-medium text-forest"
                    }
                  >
                    {feedback.tone === "error" ? (
                      <AlertCircle
                        size={18}
                        aria-hidden="true"
                        className="mt-0.5 shrink-0"
                      />
                    ) : (
                      <CheckCircle2
                        size={18}
                        aria-hidden="true"
                        className="mt-0.5 shrink-0 text-accent-ink"
                      />
                    )}
                    <span>{feedback.text}</span>
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-end gap-3 border-t border-line pt-4">
                  <button
                    type="button"
                    disabled={submitting}
                    onClick={() => {
                      setActiveJobId(null);
                      setFeedback(null);
                    }}
                    className="inline-flex min-h-11 items-center rounded-full border border-line bg-white px-5 py-2 text-sm font-semibold text-forest hover:border-forest disabled:opacity-50"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex min-h-11 items-center rounded-full bg-forest px-6 py-2.5 text-sm font-semibold text-white hover:bg-forest-soft disabled:opacity-60"
                  >
                    {submitting ? "Submitting…" : "Submit application"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
