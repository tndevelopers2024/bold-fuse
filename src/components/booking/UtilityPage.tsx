import CTA from "@/components/editorial/CTA";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import { routes } from "@/config/routes";

export type UtilityAction = {
  label: string;
  href: string;
  external?: boolean;
  variant?: "solid" | "outline";
};

export default function UtilityPage({
  eyebrow,
  title,
  heading,
  message,
  icon: Icon,
  actions,
}: {
  eyebrow: string;
  title: string;
  heading: string;
  message: readonly string[];
  icon: LucideIcon;
  actions: readonly UtilityAction[];
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
              <li>
                <Link href="/book-appointment/" className="hover:text-white">
                  Appointments
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
            {heading}
          </h1>
        </div>
      </section>

      {/* Message card */}
      <section className="shell pt-12 pb-0 sm:pt-16">
        <div className="mx-auto max-w-2xl">
          <div className="relative isolate overflow-hidden rounded-3xl border border-line bg-white p-8 text-center sm:p-10">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_100%_100%,rgba(169,233,217,0.25),transparent_65%)]"
            />
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/12 text-accent-ink">
              <Icon size={26} aria-hidden="true" />
            </span>
            <div className="mt-6 space-y-4 font-description text-base leading-[1.85] font-medium text-muted">
              {message.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              {actions.map((action) =>
                action.external ? (
                  <a
                    key={action.label}
                    href={action.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 ${
                      action.variant === "outline"
                        ? "border border-line text-forest hover:bg-[#e8f5ef] focus-visible:outline-forest"
                        : "bg-accent-ink text-white hover:bg-forest focus-visible:outline-accent-ink"
                    }`}
                  >
                    {action.label}
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                ) : (
                  <Link
                    key={action.label}
                    href={action.href}
                    className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 ${
                      action.variant === "outline"
                        ? "border border-line text-forest hover:bg-[#e8f5ef] focus-visible:outline-forest"
                        : "bg-accent-ink text-white hover:bg-forest focus-visible:outline-accent-ink"
                    }`}
                  >
                    {action.label}
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </Link>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      <CTA />
    </main>
  );
}
