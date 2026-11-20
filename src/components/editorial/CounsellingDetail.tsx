import CTA from "@/components/editorial/CTA";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, ChevronRight, Mail, MessageCircle, Phone } from "lucide-react";
import type { CounsellingDetail } from "@/content/counselling-details";
import { site } from "@/content/site";
import { routes } from "@/config/routes";

export default function CounsellingDetail({
  detail,
  related,
}: {
  detail: CounsellingDetail;
  related: readonly CounsellingDetail[];
}) {
  const bookUrl = `/book-appointment/?service=${encodeURIComponent(detail.title)}`;

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
              <li>
                <Link href={routes.services.path} className="hover:text-white">
                  Services
                </Link>
              </li>
              <li aria-hidden="true" className="text-white/40">
                ›
              </li>
              <li>
                <Link
                  href={`${routes.services.path}#healthwellness`}
                  className="hover:text-white"
                >
                  Wellness and Mental Health
                </Link>
              </li>
              <li aria-hidden="true" className="text-white/40">
                ›
              </li>
              <li>
                <Link
                  href={routes["counselling-services"].path}
                  className="hover:text-white"
                >
                  Counselling Services
                </Link>
              </li>
              <li aria-hidden="true" className="text-white/40">
                ›
              </li>
              <li className="font-semibold text-white/90" aria-current="page">
                {detail.title}
              </li>
            </ol>
          </nav>

          <p className="text-xs font-semibold tracking-[0.2em] text-accent-soft uppercase">
            Wellness &amp; Mental Health
          </p>
          <h1 className="mt-5 max-w-3xl font-heading text-4xl leading-tight font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {detail.title}
          </h1>
          <p className="mt-5 max-w-2xl font-description text-base leading-relaxed font-medium text-white/80 sm:text-lg">
            {detail.heroText}
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="shell pt-12 pb-0 sm:pt-16">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_20rem] lg:gap-14">
          <div>
            <div className="overflow-hidden rounded-3xl border border-line bg-white p-3">
              <Image
                src={detail.image}
                alt={detail.imageAlt}
                priority
                sizes="(min-width: 1024px) 720px, 92vw"
                className="aspect-[16/10] w-full rounded-2xl object-cover"
              />
            </div>

            <div className="mt-10">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold tracking-[0.2em] text-accent-ink uppercase">
                  About this service
                </span>
                <div className="h-0.5 w-10 bg-accent/40" />
              </div>
              <h2 className="mt-3 font-heading text-2xl font-bold tracking-tight text-forest sm:text-3xl">
                About {detail.title}
              </h2>
              <div className="mt-5 space-y-4 font-description text-base leading-[1.85] font-medium text-muted">
                {detail.intro.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="mt-12 space-y-12">
              {detail.sections.map((section) => (
                <section
                  key={section.heading}
                  aria-labelledby={`${detail.route}-${section.heading
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")}`}
                >
                  <h2
                    id={`${detail.route}-${section.heading
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, "-")}`}
                    className="font-heading text-2xl font-bold tracking-tight text-forest sm:text-3xl"
                  >
                    {section.heading}
                  </h2>
                  {section.paragraphs && (
                    <div className="mt-4 space-y-4 font-description text-base leading-[1.85] font-medium text-muted">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                      ))}
                    </div>
                  )}
                  {section.bullets && (
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      {section.bullets.map((bullet) => (
                        <div
                          key={bullet.title}
                          className="relative isolate flex gap-3.5 overflow-hidden rounded-2xl border border-line bg-white p-5"
                        >
                          <div
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_100%_100%,rgba(169,233,217,0.22),transparent_65%)]"
                          />
                          <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/12 text-accent-ink">
                            <Check
                              size={15}
                              strokeWidth={2.5}
                              aria-hidden="true"
                            />
                          </span>
                          <div>
                            <h3 className="font-heading text-base font-bold text-forest">
                              {bullet.title}
                            </h3>
                            <p className="mt-1.5 font-description text-sm leading-relaxed font-medium text-muted">
                              {bullet.text}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-28">
            <div className="relative isolate overflow-hidden rounded-3xl border border-line bg-white p-6">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_100%_100%,rgba(169,233,217,0.25),transparent_65%)]"
              />
              <p className="text-xs font-semibold tracking-[0.2em] text-accent-ink uppercase">
                Book a session
              </p>
              <h2 className="mt-2 font-heading text-xl font-bold text-forest">
                Start your journey today
              </h2>
              <p className="mt-2 font-description text-sm leading-relaxed font-medium text-muted">
                Reach out for a confidential first conversation.
              </p>
              <div className="mt-5 space-y-3">
                <a
                  href={`tel:${site.telephone}`}
                  className="flex min-h-12 items-center gap-3 rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-white hover:bg-forest-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
                >
                  <Phone size={16} aria-hidden="true" />
                  {site.phone}
                </a>
                <a
                  href={`https://wa.me/${site.telephone.replace("+", "")}?text=${encodeURIComponent(
                    `Hello Boldfuse, I would like to book a session for ${detail.title}.`,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-12 items-center gap-3 rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-forest hover:bg-[#e8f5ef] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
                >
                  <MessageCircle size={16} aria-hidden="true" />
                  Chat on WhatsApp
                </a>
                <a
                  href={`mailto:${site.email}?subject=${encodeURIComponent(
                    `Booking enquiry: ${detail.title}`,
                  )}`}
                  className="flex min-h-12 items-center gap-3 rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-forest hover:bg-[#e8f5ef] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
                >
                  <Mail size={16} aria-hidden="true" />
                  Email us
                </a>
                <Link
                  href={bookUrl}
                  className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent-ink px-5 py-2.5 text-sm font-semibold text-white hover:bg-forest focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink"
                >
                  Book an appointment
                  <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </div>

            {related.length > 0 && (
              <div className="rounded-3xl border border-line bg-white p-6">
                <p className="text-xs font-semibold tracking-[0.2em] text-accent-ink uppercase">
                  Related support
                </p>
                <ul className="mt-4 divide-y divide-line/70">
                  {related.map((item) => (
                    <li key={item.route}>
                      <Link
                        href={routes[item.route].path}
                        className="group flex items-center justify-between gap-3 py-3 font-description text-sm font-semibold text-forest hover:text-accent-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest"
                      >
                        {item.cardTitle}
                        <ChevronRight
                          size={16}
                          className="shrink-0 text-accent-ink"
                          aria-hidden="true"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </section>

      <CTA actionHref={routes["counselling-services"].path} actionLabel="Explore all counselling services" />
    </main>
  );
}
