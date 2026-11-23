import Openings from "@/components/hiring/Openings";
import { itRecruitment } from "@/content/careers";
import { pageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import { ArrowUpRight, Mail, MapPin, Users2 } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
  title: "Careers",
  description:
    "Explore Boldfuse’s healthcare and IT opportunities across India and the United States, and learn how to apply.",
  alternates: { canonical: "/careers/" },
});

export default async function CareersPage({
  searchParams,
}: PageProps<"/careers">) {
  const showPreview =
    process.env.NODE_ENV === "development" &&
    (await searchParams).preview === "1";

  return (
    <main id="main-content" className="bg-white">
      <div className="shell pt-8 pb-12 sm:pt-12 sm:pb-16">
        <section id="it-recruitment" aria-labelledby="it-recruitment-heading">
          {/* Header Banner */}
          <div className="relative isolate overflow-hidden rounded-3xl bg-forest-surface px-6 py-12 text-white sm:px-10 sm:py-16 lg:px-14">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_0%_0%,rgba(2,170,119,0.28),transparent_55%),radial-gradient(ellipse_at_100%_100%,rgba(97,198,168,0.18),transparent_50%)]"
            >
              <svg
                viewBox="0 0 1200 380"
                preserveAspectRatio="none"
                focusable="false"
                className="absolute inset-0 h-full w-full text-accent-soft"
                fill="none"
              >
                <path
                  d="M620 400C830 360 800 200 1000 220S1170 90 1260 40"
                  stroke="currentColor"
                  strokeWidth="1"
                  opacity="0.14"
                />
              </svg>
            </div>
            <p className="text-xs font-semibold tracking-[0.2em] text-accent-soft uppercase">
              {itRecruitment.eyebrow}
            </p>
            <h1
              id="it-recruitment-heading"
              className="mt-3 max-w-3xl font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
            >
              {itRecruitment.title}
            </h1>
            <p className="mt-4 max-w-2xl font-description text-base leading-relaxed font-medium text-white/80 sm:text-lg">
              {itRecruitment.lead}
            </p>
          </div>

          {/* "What We Do" card */}
          <div className="mt-8 rounded-3xl border border-line bg-white p-6 sm:p-10 lg:p-12">
            <div className="flex items-center gap-2.5 text-accent-ink">
              <Users2 size={22} aria-hidden="true" />
              <h2 className="font-heading text-2xl font-bold text-forest">
                {itRecruitment.whatWeDo.title}
              </h2>
            </div>
            <p className="mt-4 font-description text-base leading-[1.8] font-medium text-muted sm:text-lg">
              {itRecruitment.whatWeDo.body}
            </p>
          </div>

          {/* "Open Positions / Hiring for IT Positions" — live postings from /admin/ */}
          <Openings showPreview={showPreview} />

          {/* Locations & How to Apply split */}
          <div className="mt-12 grid gap-8 sm:mt-16 lg:grid-cols-2">
            {/* Locations */}
            <div className="flex flex-col justify-between rounded-3xl border border-line bg-white p-6 shadow-xs sm:p-8">
              <div>
                <div className="flex items-center gap-2.5 text-accent-ink">
                  <MapPin size={22} aria-hidden="true" />
                  <h2 className="font-heading text-2xl font-bold text-forest">
                    {itRecruitment.locations.title}
                  </h2>
                </div>
                <div className="mt-6 space-y-4">
                  {itRecruitment.locations.items.map((loc) => (
                    <div
                      key={loc.country}
                      className="flex items-start gap-4 rounded-2xl border border-line bg-white p-4"
                    >
                      <span
                        className="text-3xl"
                        role="img"
                        aria-label={loc.country}
                      >
                        {loc.flag}
                      </span>
                      <div>
                        <h3 className="font-heading text-lg font-bold text-forest">
                          {loc.country}
                        </h3>
                        <p className="mt-1 font-description text-sm font-medium text-muted">
                          {loc.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* How to Apply */}
            <div className="flex flex-col justify-between rounded-3xl border border-line bg-white p-6 shadow-xs sm:p-8">
              <div>
                <div className="flex items-center gap-2.5 text-accent-ink">
                  <Mail size={22} aria-hidden="true" />
                  <h2 className="font-heading text-2xl font-bold text-forest">
                    {itRecruitment.howToApply.title}
                  </h2>
                </div>

                <p className="mt-3 font-heading text-lg font-bold text-forest">
                  {itRecruitment.howToApply.subtitle}
                </p>

                <div className="mt-5 space-y-3 font-description text-sm font-medium text-muted">
                  <p>
                    <span className="font-semibold text-forest">
                      {itRecruitment.howToApply.emailPrompt}{" "}
                    </span>
                    <a
                      href={`mailto:${itRecruitment.howToApply.email}`}
                      className="font-semibold text-accent-ink underline hover:text-forest"
                    >
                      {itRecruitment.howToApply.email}
                    </a>
                  </p>
                  <p>
                    <span className="font-semibold text-forest">
                      Connect with us:{" "}
                    </span>
                    Follow us on LinkedIn{" "}
                    <a
                      href={itRecruitment.howToApply.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-accent-ink underline hover:text-forest"
                    >
                      @Boldfuse
                    </a>{" "}
                    for the latest openings and updates.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={`mailto:${itRecruitment.howToApply.email}?subject=Application for Healthcare / IT Position - Boldfuse`}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-forest px-7 py-3 text-sm font-semibold text-white hover:bg-forest-soft"
                >
                  <Mail size={16} aria-hidden="true" />
                  Send Your Resume
                </a>
                <a
                  href={itRecruitment.howToApply.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-line bg-white px-6 py-3 text-sm font-semibold text-forest hover:bg-forest/5"
                >
                  LinkedIn Updates
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
