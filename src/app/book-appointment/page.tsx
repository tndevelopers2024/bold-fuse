import CTA from "@/components/editorial/CTA";
import { pageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MessageCircle, Phone } from "lucide-react";
import BookingForm from "@/components/booking/BookingForm";
import { site } from "@/content/site";
import { routes } from "@/config/routes";

export const metadata: Metadata = pageMetadata({
  title: "Book an Appointment",
  description:
    "Book a counselling or consultation appointment with Boldfuse in seconds via WhatsApp, email or phone.",
  alternates: { canonical: routes["book-appointment"].path },
});

export default async function BookAppointmentPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string | string[] }>;
}) {
  const { service } = await searchParams;

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
                Book an Appointment
              </li>
            </ol>
          </nav>

          <p className="text-xs font-semibold tracking-[0.2em] text-accent-soft uppercase">
            Appointments
          </p>
          <h1 className="mt-5 max-w-3xl font-heading text-4xl leading-tight font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Book an Appointment
          </h1>
          <p className="mt-5 max-w-2xl font-description text-base leading-relaxed font-medium text-white/80 sm:text-lg">
            Tell us a little about what you need and we will confirm your
            session right away — no accounts, no waiting on hold.
          </p>
        </div>
      </section>

      {/* Form + contact card */}
      <section className="shell pt-12 pb-16 sm:pt-16 sm:pb-24">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_22rem] lg:gap-14">
          <div className="rounded-3xl border border-line bg-white p-6 sm:p-10">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold tracking-[0.2em] text-accent-ink uppercase">
                Request your session
              </span>
              <div className="h-0.5 w-10 bg-accent/40" />
            </div>
            <h2 className="mt-3 font-heading text-2xl font-bold tracking-tight text-forest sm:text-3xl">
              Tell us about your appointment
            </h2>
            <p className="mt-3 font-description text-sm leading-relaxed font-medium text-muted">
              Fill in the details and send them to us on WhatsApp — we will
              confirm your slot shortly.
            </p>
            <div className="mt-8">
              <BookingForm
                initialService={typeof service === "string" ? service : ""}
              />
            </div>
          </div>

          <aside className="relative isolate space-y-4 overflow-hidden rounded-3xl border border-line bg-white p-6 sm:p-8">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_100%_100%,rgba(169,233,217,0.25),transparent_65%)]"
            />
            <p className="text-xs font-semibold tracking-[0.2em] text-accent-ink uppercase">
              Prefer to talk?
            </p>
            <h2 className="font-heading text-xl font-bold text-forest">
              Reach us directly
            </h2>
            <div className="space-y-3 pt-1">
              <a
                href={`tel:${site.telephone}`}
                className="flex items-center gap-3 rounded-2xl border border-line p-4 hover:bg-[#e8f5ef] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/12 text-accent-ink">
                  <Phone size={18} aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-description text-xs font-semibold tracking-[0.14em] text-muted uppercase">
                    Call us
                  </span>
                  <span className="block font-description text-sm font-semibold text-forest">
                    {site.phone}
                  </span>
                </span>
              </a>
              <a
                href={`https://wa.me/${site.telephone.replace("+", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-2xl border border-line p-4 hover:bg-[#e8f5ef] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/12 text-accent-ink">
                  <MessageCircle size={18} aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-description text-xs font-semibold tracking-[0.14em] text-muted uppercase">
                    WhatsApp
                  </span>
                  <span className="block font-description text-sm font-semibold text-forest">
                    Chat with us
                  </span>
                </span>
              </a>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-3 rounded-2xl border border-line p-4 hover:bg-[#e8f5ef] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/12 text-accent-ink">
                  <Mail size={18} aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-description text-xs font-semibold tracking-[0.14em] text-muted uppercase">
                    Email
                  </span>
                  <span className="block font-description text-sm font-semibold text-forest">
                    {site.email}
                  </span>
                </span>
              </a>
            </div>
            <p className="pt-2 font-description text-xs leading-relaxed font-medium text-muted">
              Your details are only used to arrange your appointment and are
              never shared.
            </p>
          </aside>
        </div>
      </section>

      <CTA actionHref={routes["counselling-services"].path} actionLabel="View counselling services" />
    </main>
  );
}
