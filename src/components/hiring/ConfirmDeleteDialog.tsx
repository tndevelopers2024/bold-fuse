"use client";

import { useEffect, useRef } from "react";
import { AlertCircle, Trash2, X } from "lucide-react";

interface ConfirmDeleteDialogProps {
  open: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  pending: boolean;
  error: string | null;
  onClose: () => void;
  onConfirm: () => void;
}

export function ConfirmDeleteDialog({
  open,
  title,
  description,
  confirmLabel,
  pending,
  error,
  onClose,
  onConfirm,
}: ConfirmDeleteDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const cancelButtonRef = useRef<HTMLButtonElement>(null);
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
      cancelButtonRef.current?.focus();
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
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
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
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-delete-heading"
        aria-describedby="confirm-delete-description"
        className="max-h-[90vh] w-full max-w-md overflow-y-auto overscroll-contain rounded-2xl border border-line bg-white p-5 [-webkit-overflow-scrolling:touch] supports-[height:100dvh]:max-h-[90dvh] sm:rounded-3xl sm:p-7"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-danger/30 bg-danger/8 text-danger">
            <Trash2 size={20} aria-hidden="true" />
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={pending}
            aria-label="Close delete confirmation"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-white text-forest hover:border-forest disabled:opacity-50"
          >
            <X size={16} aria-hidden="true" />
          </button>
        </div>

        <h2
          id="confirm-delete-heading"
          className="mt-4 font-heading text-xl font-bold break-words text-forest"
        >
          {title}
        </h2>
        <p
          id="confirm-delete-description"
          className="mt-2 font-description text-sm leading-relaxed font-medium text-muted"
        >
          {description}
        </p>

        {error && (
          <div
            role="alert"
            className="mt-4 flex items-start gap-2 rounded-2xl border border-danger/30 bg-danger/5 px-3.5 py-2.5 font-description text-sm font-medium text-danger"
          >
            <AlertCircle
              size={16}
              aria-hidden="true"
              className="mt-0.5 shrink-0"
            />
            <span>{error}</span>
          </div>
        )}

        <div className="mt-6 flex flex-col-reverse gap-2.5 border-t border-line pt-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end sm:pt-5">
          <button
            ref={cancelButtonRef}
            type="button"
            onClick={onClose}
            disabled={pending}
            className="inline-flex min-h-11 w-full touch-manipulation items-center justify-center rounded-full border border-line bg-white px-5 py-2 text-sm font-semibold text-forest hover:border-forest disabled:opacity-50 sm:min-h-10 sm:w-auto"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={pending}
            className="inline-flex min-h-11 w-full touch-manipulation items-center justify-center gap-1.5 rounded-full bg-danger px-5 py-2 text-sm font-semibold text-white hover:bg-danger/90 disabled:opacity-60 sm:min-h-10 sm:w-auto"
          >
            <Trash2 size={15} aria-hidden="true" />
            <span>{pending ? "Deleting…" : confirmLabel}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
