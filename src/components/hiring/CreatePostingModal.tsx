"use client";

import { useEffect, useRef, type FormEvent } from "react";
import { AlertCircle, Briefcase, X } from "lucide-react";
import { inputClass } from "@/components/hiring/Forms";

export interface PostingDraft {
  title: string;
  location: string;
  description: string;
}

interface CreatePostingModalProps {
  open: boolean;
  draft: PostingDraft;
  pending: boolean;
  error: string | null;
  onDraftChange: (next: PostingDraft) => void;
  onClearDraft: () => void;
  onClose: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export function CreatePostingModal({
  open,
  draft,
  pending,
  error,
  onDraftChange,
  onClearDraft,
  onClose,
  onSubmit,
}: CreatePostingModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const onCloseRef = useRef(onClose);
  const pendingRef = useRef(pending);

  useEffect(() => {
    onCloseRef.current = onClose;
    pendingRef.current = pending;
  }, [onClose, pending]);

  useEffect(() => {
    if (!open) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = setTimeout(() => {
      titleInputRef.current?.focus();
    }, 20);

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        if (!pendingRef.current) onCloseRef.current();
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
  }, [open]);

  if (!open) return null;

  const hasDraftContent = Boolean(
    draft.title.trim() || draft.location.trim() || draft.description.trim(),
  );

  return (
    <div
      role="presentation"
      className="fixed inset-0 z-50 flex items-end justify-center overscroll-contain bg-forest/70 p-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] sm:items-center sm:p-6"
      onClick={(event) => {
        if (event.target === event.currentTarget && !pending) {
          onClose();
        }
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-posting-heading"
        aria-describedby="create-posting-subtitle"
        className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-line bg-white supports-[height:100dvh]:max-h-[90dvh] sm:rounded-3xl"
      >
        <div className="relative isolate flex shrink-0 items-start justify-between gap-3 overflow-hidden bg-forest-surface px-4 py-4 text-white sm:px-8 sm:py-6">
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
            <p className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.18em] text-accent-soft uppercase">
              <Briefcase size={14} aria-hidden="true" />
              New opening
            </p>
            <h2
              id="create-posting-heading"
              className="mt-1 font-heading text-2xl font-bold text-white"
            >
              Create a job posting
            </h2>
            <p
              id="create-posting-subtitle"
              className="mt-1 font-description text-sm font-medium text-white/80"
            >
              Published roles appear immediately on the public Careers page and
              stay synced across sessions.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={pending}
            aria-label="Close create posting dialog"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/25 text-white hover:bg-white/10 focus-visible:outline-accent-soft disabled:opacity-50"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <form
          onSubmit={onSubmit}
          className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain p-4 [-webkit-overflow-scrolling:touch] sm:space-y-5 sm:p-8"
        >
          {error && (
            <div
              role="alert"
              className="flex items-start gap-2.5 rounded-2xl border border-danger/30 bg-danger/5 px-4 py-3 font-description text-sm font-medium text-danger"
            >
              <AlertCircle
                size={18}
                aria-hidden="true"
                className="mt-0.5 shrink-0"
              />
              <span>{error}</span>
            </div>
          )}

          <div>
            <div className="flex items-baseline justify-between gap-2">
              <label
                htmlFor="posting-title"
                className="block text-sm font-semibold text-forest"
              >
                Job title
              </label>
              <span className="text-xs font-medium text-muted tabular-nums">
                {draft.title.length}/120
              </span>
            </div>
            <input
              ref={titleInputRef}
              id="posting-title"
              name="title"
              type="text"
              required
              maxLength={120}
              placeholder="e.g. Senior Full-Stack Engineer"
              value={draft.title}
              onChange={(event) =>
                onDraftChange({ ...draft, title: event.target.value })
              }
              className={inputClass}
            />
          </div>

          <div>
            <div className="flex items-baseline justify-between gap-2">
              <label
                htmlFor="posting-location"
                className="block text-sm font-semibold text-forest"
              >
                Location or remote
              </label>
              <span className="text-xs font-medium text-muted tabular-nums">
                {draft.location.length}/160
              </span>
            </div>
            <input
              id="posting-location"
              name="location"
              type="text"
              required
              maxLength={160}
              placeholder="e.g. Hyderabad, India · Hybrid or Remote"
              value={draft.location}
              onChange={(event) =>
                onDraftChange({ ...draft, location: event.target.value })
              }
              className={inputClass}
            />
          </div>

          <div>
            <div className="flex items-baseline justify-between gap-2">
              <label
                htmlFor="posting-description"
                className="block text-sm font-semibold text-forest"
              >
                Job description
              </label>
              <span className="text-xs font-medium text-muted tabular-nums">
                {draft.description.length}/8000
              </span>
            </div>
            <textarea
              id="posting-description"
              name="description"
              rows={6}
              required
              maxLength={8000}
              placeholder="Describe the role, key responsibilities, required experience, and how this person contributes to Boldfuse."
              value={draft.description}
              onChange={(event) =>
                onDraftChange({ ...draft, description: event.target.value })
              }
              className={`${inputClass} min-h-36 resize-y leading-relaxed`}
            />
          </div>

          <div className="flex flex-col-reverse gap-2.5 border-t border-line pt-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-3 sm:pt-5">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                disabled={pending}
                className="inline-flex min-h-11 flex-1 touch-manipulation items-center justify-center rounded-full border border-line bg-white px-5 py-2 text-sm font-semibold text-forest hover:border-forest disabled:opacity-50 sm:flex-none"
              >
                Cancel
              </button>
              {hasDraftContent && (
                <button
                  type="button"
                  onClick={onClearDraft}
                  disabled={pending}
                  className="inline-flex min-h-11 flex-1 touch-manipulation items-center justify-center rounded-full px-4 py-2 text-sm font-semibold text-muted hover:text-forest disabled:opacity-50 sm:flex-none"
                >
                  Clear draft
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={pending}
              className="inline-flex min-h-11 w-full touch-manipulation items-center justify-center rounded-full bg-forest px-6 py-2.5 text-sm font-semibold text-white hover:bg-forest-soft disabled:opacity-60 sm:w-auto"
            >
              {pending ? "Publishing…" : "Publish opening"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
