"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { PostingDescription, plainDescription } from "./PostingDescription";
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
  postedAt?: string;
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

const jobsPerBatch = 6;

export function OpeningsGrid({
  jobs,
  showPreview,
}: {
  jobs: PublicOpening[];
  showPreview: boolean;
}) {
  const [activeJobId, setActiveJobId] = useState<string | null>(null);
  const [showApplication, setShowApplication] = useState(false);
  const [visibleJobCount, setVisibleJobCount] = useState(jobsPerBatch);
  // Keep unsaved form drafts per job ID so incoming SSE updates never clear them
  const [drafts, setDrafts] = useState<Record<string, ApplicationDraft>>({});
  const [submitting, setSubmitting] = useState(false);
  const [applicationError, setApplicationError] = useState<string | null>(null);
  const [applicationReceived, setApplicationReceived] = useState(false);

  const dialogRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const submittingRef = useRef(submitting);

  const activeJob =
    activeJobId !== null
      ? (jobs.find((job) => job.id === activeJobId) ?? null)
      : null;

  const isModalOpen = activeJob !== null || applicationReceived;

  useEffect(() => {
    if (!isModalOpen) return;

    const originalOverflow = document.body.style.overflow;
    const originalRootOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const focusTimer = setTimeout(() => {
      titleRef.current?.focus({ preventScroll: true });
    }, 20);

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        if (!submittingRef.current) {
          setActiveJobId(null);
          setApplicationReceived(false);
          setApplicationError(null);
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
      if (
        event.shiftKey &&
        (document.activeElement === first ||
          document.activeElement === titleRef.current)
      ) {
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
      document.documentElement.style.overflow = originalRootOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [isModalOpen]);

  useEffect(() => {
    if (!applicationReceived) return;

    titleRef.current?.focus({ preventScroll: true });
    const timer = setTimeout(() => setApplicationReceived(false), 5000);
    return () => clearTimeout(timer);
  }, [applicationReceived]);

  const currentDraft =
    activeJob ? (drafts[activeJob.id] ?? emptyDraft) : emptyDraft;

  function openRole(
    jobId: string,
    trigger: HTMLButtonElement,
    openApplication = false,
  ) {
    previousFocusRef.current = trigger;
    setShowApplication(openApplication);
    setApplicationError(null);
    setActiveJobId(jobId);
  }

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
    if (!activeJob || showPreview || submittingRef.current) return;
    submittingRef.current = true;
    setSubmitting(true);
    setApplicationError(null);
    try {
      const formData = new FormData();
      formData.set("name", currentDraft.name);
      formData.set("email", currentDraft.email);
      formData.set("phone", currentDraft.phone);
      const result = await applyToJob(activeJob.id, "", formData);
      if (!result.ok) {
        setApplicationError(result.error ?? "Could not submit your application. Please try again.");
        return;
      }
      setDrafts((prev) => {
        const next = { ...prev };
        delete next[activeJob.id];
        return next;
      });
      setActiveJobId(null);
      setApplicationReceived(true);
    } catch {
      setApplicationError(
        "Could not submit your application right now. Please try again.",
      );
    } finally {
      submittingRef.current = false;
      setSubmitting(false);
    }
  }

  return (
    <>
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {jobs.slice(0, visibleJobCount).map((job) => {
          const posted = formatPostedDate(job.postedAt ?? job.createdAt);
          const description = job.description.trimEnd();
          const plain = plainDescription(description);
          const preview = descriptionPreview(plain);
          const hasMore = preview !== plain;
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

                <p className="mt-3 font-description text-sm leading-relaxed font-medium break-words whitespace-pre-wrap text-muted">
                  {hasMore ? `${preview}…` : <PostingDescription text={description} />}
                </p>
                {hasMore && (
                  <button
                    type="button"
                    aria-haspopup="dialog"
                    aria-label={`View more about ${job.title}`}
                    onClick={(event) => openRole(job.id, event.currentTarget)}
                    className="mt-2 min-h-11 rounded-sm text-sm font-semibold text-accent-ink underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2"
                  >
                    View more
                  </button>
                )}
              </div>

              <div className="mt-5 border-t border-line/80 pt-4">
                <button
                  type="button"
                  disabled={showPreview}
                  aria-haspopup="dialog"
                  onClick={(event) => openRole(job.id, event.currentTarget, true)}
                  className="inline-flex min-h-10 w-full items-center justify-center rounded-full bg-forest px-4 py-2 text-sm font-semibold text-white enabled:hover:bg-forest-soft disabled:opacity-60"
                >
                  Apply for this role
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {visibleJobCount < jobs.length && (
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={() => setVisibleJobCount((count) => count + jobsPerBatch)}
            className="min-h-11 rounded-full border border-line bg-white px-5 py-2 text-sm font-semibold text-forest hover:border-forest focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Show more jobs
          </button>
        </div>
      )}

      {applicationReceived && (
        <div
          role="presentation"
          data-lenis-prevent
          className="fixed inset-0 z-50 flex items-center justify-center bg-forest/70 p-4"
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="application-received-title"
            aria-describedby="application-received-message"
            className="w-full max-w-sm rounded-2xl border border-line bg-white p-6 text-center"
          >
            <CheckCircle2 size={32} aria-hidden="true" className="mx-auto text-accent-ink" />
            <h3
              ref={titleRef}
              id="application-received-title"
              tabIndex={-1}
              className="mt-3 font-heading text-xl font-bold text-forest focus:outline-none"
            >
              Application received
            </h3>
            <p id="application-received-message" className="mt-2 font-description text-sm font-medium text-muted">
              Thank you for applying.
            </p>
            <button
              type="button"
              onClick={() => setApplicationReceived(false)}
              className="mt-5 min-h-11 rounded-full bg-forest px-6 py-2 text-sm font-semibold text-white hover:bg-forest-soft"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Role Details & Application Modal */}
      {activeJob && (
        <div
          role="presentation"
          data-lenis-prevent
          className="fixed inset-0 z-50 flex items-center justify-center bg-forest/70 p-2 sm:p-6"
          onClick={(event) => {
            if (event.target === event.currentTarget && !submitting) {
              setActiveJobId(null);
              setApplicationError(null);
            }
          }}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="apply-modal-title"
            className={`flex max-h-[calc(100vh-1rem)] w-full flex-col overflow-hidden rounded-2xl border border-line bg-white supports-[height:100dvh]:max-h-[calc(100dvh-1rem)] sm:max-h-[90dvh] sm:rounded-3xl ${showApplication ? "max-w-xl" : "max-w-4xl"}`}
          >
            <div className="relative isolate flex shrink-0 items-start justify-between gap-2 overflow-hidden bg-forest-surface px-4 py-3 text-white sm:gap-4 sm:px-8 sm:py-5">
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
                  ref={titleRef}
                  id="apply-modal-title"
                  tabIndex={-1}
                  className="mt-1 font-heading text-xl leading-tight font-bold break-words text-white focus:outline-none sm:text-2xl"
                >
                  {activeJob.title}
                </h3>
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-medium text-white/85">
                  <span className="inline-flex min-w-0 items-start gap-1.5">
                    <MapPin size={14} aria-hidden="true" className="mt-0.5 shrink-0" />
                    <span className="break-words">{activeJob.location}</span>
                  </span>
                  {formatPostedDate(activeJob.postedAt ?? activeJob.createdAt) && (
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar size={14} aria-hidden="true" />
                      Posted {formatPostedDate(activeJob.postedAt ?? activeJob.createdAt)}
                    </span>
                  )}
                </div>
              </div>
              <button
                type="button"
                disabled={submitting}
                onClick={() => {
                  setActiveJobId(null);
                  setApplicationError(null);
                }}
                aria-label="Close role dialog"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/25 text-white hover:bg-white/10 focus-visible:outline-accent-soft disabled:opacity-50"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>

            <div
              key={showApplication ? "application" : "description"}
              className="min-h-0 overflow-y-auto overscroll-contain px-4 py-4 sm:px-8 sm:py-6"
            >
              <div className={showApplication ? "hidden" : "bg-white sm:rounded-2xl sm:border sm:border-line/80 sm:p-5"}>
                <p className="text-xs font-semibold tracking-wider text-accent-ink uppercase">
                  Role description
                </p>
                <p className="mt-2 font-description text-sm leading-relaxed font-medium break-words whitespace-pre-wrap text-muted">
                  <PostingDescription text={activeJob.description} />
                </p>
              </div>

              {!showPreview && !showApplication && (
                <button
                  type="button"
                  onClick={() => {
                    titleRef.current?.focus({ preventScroll: true });
                    setShowApplication(true);
                  }}
                  className="mt-4 min-h-11 w-full rounded-full bg-forest px-5 py-2 text-sm font-semibold text-white hover:bg-forest-soft sm:w-auto"
                >
                  Apply for this role
                </button>
              )}

              <form
                onSubmit={handleSubmit}
                className={showApplication && !showPreview ? "grid gap-4" : "hidden"}
              >
                <label className="block text-sm font-semibold text-forest">
                  Full name
                  <input
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

                {applicationError && (
                  <div
                    role="alert"
                    className="flex items-start gap-2.5 rounded-xl border border-danger/30 bg-danger/5 px-3.5 py-3 font-description text-sm font-medium text-danger"
                  >
                    <AlertCircle size={18} aria-hidden="true" className="mt-0.5 shrink-0" />
                    <span>{applicationError}</span>
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-end gap-3 border-t border-line pt-4">
                  <button
                    type="button"
                    disabled={submitting}
                    onClick={() => {
                      setActiveJobId(null);
                      setApplicationError(null);
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
