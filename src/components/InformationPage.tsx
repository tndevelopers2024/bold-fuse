import CTA from "@/components/editorial/CTA";
import Link from "next/link";
import { site } from "@/content/site";

type Section = { heading: string; text: string };
export default function InformationPage({
  title,
  sections,
}: {
  title: string;
  sections: Section[];
}) {
  return (
    <main id="main-content" className="bg-white">
      <div className="shell py-12 sm:py-20">
        <header className="page-hero relative isolate overflow-hidden rounded-3xl bg-forest-surface px-6 text-white sm:px-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_0%_0%,rgba(2,170,119,0.28),transparent_60%)]"
          >
            <svg
              viewBox="0 0 1200 400"
              preserveAspectRatio="none"
              className="h-full w-full"
              fill="none"
            >
              <path
                d="M620 440C830 400 800 230 1000 255S1170 110 1260 50"
                stroke="#a9e9d9"
                opacity=".16"
              />
            </svg>
          </div>
          <Link
            href="/"
            className="text-sm font-medium text-white/80 underline underline-offset-4"
          >
            Home
          </Link>
          <h1 className="mt-6 font-heading text-4xl font-bold text-white sm:text-5xl">
            {title}
          </h1>
        </header>
        <div className="mx-auto mt-12 max-w-3xl space-y-10">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-heading text-2xl font-bold text-forest">
                {section.heading}
              </h2>
              <p className="mt-4 font-description text-base leading-relaxed font-medium text-muted">
                {section.text}
              </p>
            </section>
          ))}
          <p className="font-description font-medium text-muted">
            Questions? Email{" "}
            <a
              className="text-accent-ink underline underline-offset-4"
              href={`mailto:${site.email}`}
            >
              {site.email}
            </a>{" "}
            or{" "}
            <Link
              href="/contact/"
              className="text-accent-ink underline underline-offset-4"
            >
              contact our team
            </Link>
            .
          </p>
        </div>
      </div>
      <CTA />
    </main>
  );
}
