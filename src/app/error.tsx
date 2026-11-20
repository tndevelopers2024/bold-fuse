"use client";
import { ui } from "@/content/ui";
import { site } from "@/content/site";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main id="main-content" className="mx-auto max-w-3xl px-5 py-24">
      <h1 className="text-5xl font-bold text-brand-950">{ui.error.title}</h1>
      <p className="mt-6 text-lg text-sage-700">{ui.error.body}</p>
      <button
        type="button"
        onClick={reset}
        className="mt-8 rounded-full bg-brand-700 px-7 py-4 font-semibold text-white"
      >
        {ui.error.retry}
      </button>
      <a
        className="ml-6 text-brand-700 underline"
        href={`mailto:${site.email}`}
      >
        {ui.email}
      </a>
    </main>
  );
}
