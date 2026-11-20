"use client";
import { ui } from "@/content/ui";
import { site } from "@/content/site";
export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html lang="en-IN">
      <body>
        <main className="mx-auto max-w-3xl px-5 py-24 font-sans">
          <p className="mb-8 text-xl font-bold text-brand-700">{site.name}</p>
          <h1 className="text-5xl font-bold">{ui.error.title}</h1>
          <p className="mt-6 text-lg">{ui.error.body}</p>
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
      </body>
    </html>
  );
}
