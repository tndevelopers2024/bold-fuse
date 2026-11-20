import CTA from "@/components/editorial/CTA";
import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { routes } from "@/config/routes";

export type BrandSection = {
  heading: string;
  intro?: string;
  items: readonly {
    title: string;
    text: string;
    Icon?: LucideIcon;
  }[];
};

export default function BrandPage({
  eyebrow,
  title,
  heroText,
  image,
  imageAlt,
  introHeading,
  intro,
  sections,
}: {
  eyebrow: string;
  title: string;
  heroText: string;
  image: Parameters<typeof Image>[0]["src"];
  imageAlt: string;
  introHeading: string;
  intro: readonly string[];
  sections: readonly BrandSection[];
}) {
  return (
    <main id="main-content" className="bg-white">
      {/* Hero */}
      <section className="shell pt-8 pb-0 sm:pt-12">
        <div className="page-hero relative isolate overflow-hidden rounded-3xl bg-forest-surface px-6 text-white sm:px-12 lg:px-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_0%_0%,rgba(2,170,119,0.28),transparent_55%),radial-gradient(ellipse_at_100%_100%,rgba(97,198,168,0.18),transparent_50%)]"
          >
            <svg
              viewBox="0 0 1200 400"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full text-accent-soft"
              fill="none"
            >
              <path
                d="M620 440C830 400 800 230 1000 255S1170 110 1260 50M710 440C900 410 850 295 1050 315S1210 180 1260 140"
                stroke="currentColor"
                strokeWidth="1"
                opacity=".16"
              />
            </svg>
          </div>

          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-white/60">
              <li>
                <Link href={routes.home.path} className="hover:text-white">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-white/40">
                ›
              </li>
              <li className="font-semibold text-white/90" aria-current="page">
                {title}
              </li>
            </ol>
          </nav>

          <p className="text-xs font-semibold tracking-[0.2em] text-accent-soft uppercase">
            {eyebrow}
          </p>
          <h1 className="mt-5 max-w-3xl font-heading text-4xl leading-tight font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl font-description text-base leading-relaxed font-medium text-white/80 sm:text-lg">
            {heroText}
          </p>
        </div>
      </section>

      {/* Intro with image */}
      <section className="shell pt-12 pb-0 sm:pt-16">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold tracking-[0.2em] text-accent-ink uppercase">
                Our other brands
              </span>
              <div className="h-0.5 w-10 bg-accent/40" />
            </div>
            <h2 className="mt-3 font-heading text-2xl font-bold tracking-tight text-forest sm:text-3xl">
              {introHeading}
            </h2>
            <div className="mt-5 space-y-4 font-description text-base leading-[1.85] font-medium text-muted">
              {intro.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl border border-line bg-white p-3">
            <Image
              src={image}
              alt={imageAlt}
              priority
              sizes="(min-width: 1024px) 560px, 92vw"
              className="aspect-square w-full rounded-2xl object-cover"
            />
          </div>
        </div>
      </section>

      {/* Sections */}
      <div className="shell pt-14 pb-0 sm:pt-16">
        <div className="space-y-14 sm:space-y-16">
          {sections.map((section) => (
            <section
              key={section.heading}
              aria-labelledby={`section-${section.heading
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")}`}
            >
              <div className="border-b border-line pb-6">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold tracking-[0.2em] text-accent-ink uppercase">
                    {eyebrow}
                  </span>
                  <div className="h-0.5 w-10 bg-accent/40" />
                </div>
                <h2
                  id={`section-${section.heading
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")}`}
                  className="mt-3 font-heading text-3xl font-bold tracking-tight text-forest sm:text-4xl"
                >
                  {section.heading}
                </h2>
                {section.intro && (
                  <p className="mt-3 max-w-2xl font-description text-base leading-relaxed font-medium text-muted">
                    {section.intro}
                  </p>
                )}
              </div>
              <div
                className={`mt-8 grid gap-4 sm:grid-cols-2 ${
                  section.items.length === 2 ? "" : "lg:grid-cols-3"
                }`}
              >
                {section.items.map((item) => (
                  <div
                    key={item.title}
                    className="relative isolate overflow-hidden rounded-2xl border border-line bg-white p-6"
                  >
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_100%_100%,rgba(169,233,217,0.22),transparent_65%)]"
                    />
                    {item.Icon && (
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/12 text-accent-ink">
                        <item.Icon size={19} aria-hidden="true" />
                      </span>
                    )}
                    <h3 className="mt-4 font-heading text-lg font-bold text-forest">
                      {item.title}
                    </h3>
                    <p className="mt-2 font-description text-sm leading-relaxed font-medium text-muted">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      <CTA />
    </main>
  );
}
