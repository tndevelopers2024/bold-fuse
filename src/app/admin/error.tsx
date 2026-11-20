"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, ArrowLeft, RefreshCw } from "lucide-react";

export default function AdminError({
  error,
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  useEffect(() => {
    console.error("Hiring dashboard error:", error);
  }, [error]);

  return (
    <main id="main-content" className="bg-white">
      <div className="mx-auto w-full max-w-[80rem] px-3 py-8 sm:px-6 sm:py-16 md:px-10 xl:px-16">
        <section
          role="alert"
          className="mx-auto max-w-xl rounded-2xl border border-line bg-white p-5 sm:rounded-3xl sm:p-10"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-danger/30 bg-danger/8 text-danger">
            <AlertCircle size={24} aria-hidden="true" />
          </div>
          <p className="mt-5 text-xs font-semibold tracking-[0.18em] text-accent-ink uppercase">
            Boldfuse Recruiting
          </p>
          <h1 className="mt-2 font-heading text-2xl font-bold text-forest sm:text-3xl">
            Unable to load the hiring dashboard
          </h1>
          <p className="mt-3 font-description text-base font-medium text-muted">
            We could not reach the recruiting database right now. Your existing
            postings and candidate records are safe — try reloading the
            workspace.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => retry()}
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-forest px-6 py-2.5 text-sm font-semibold text-white hover:bg-forest-soft"
            >
              <RefreshCw size={16} aria-hidden="true" />
              Try again
            </button>
            <Link
              href="/careers/"
              className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-line bg-white px-5 py-2.5 text-sm font-semibold text-forest hover:border-forest"
            >
              <ArrowLeft size={15} aria-hidden="true" />
              Back to Careers
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
