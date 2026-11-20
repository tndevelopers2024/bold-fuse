import CTA from "@/components/editorial/CTA";
import { pageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/content/site";
import ContactForm from "./ContactForm";

export const metadata: Metadata = pageMetadata({
  title: "Contact us",
  description:
    "Get in touch with Boldfuse to discuss how we can help your business.",
  alternates: { canonical: "/contact/" },
});

const details = [
  {
    icon: Phone,
    label: "Call us",
    value: site.phone,
    href: `tel:${site.telephone}`,
  },
  {
    icon: Mail,
    label: "Email us",
    value: site.email,
    href: `mailto:${site.email}`,
  },
  {
    icon: MapPin,
    label: "Visit us",
    value: site.address,
    href: "https://www.google.com/maps/search/?api=1&query=Lanco%20Hills%20Road%2C%20Gachibowli%2C%20Hyderabad%20500089"
  },
];

const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const mapEmbedUrl = googleMapsApiKey
  ? `https://www.google.com/maps/embed/v1/place?key=${googleMapsApiKey}&q=Lanco+Hills+Road,+Gachibowli,+Hyderabad+500089`
  : "https://www.google.com/maps/embed?origin=mfe&pb=!1m2!2m1!1sLanco+Hills+Road,+Gachibowli,+Hyderabad+500089";

export default function ContactPage() {
  return (
    <main id="main-content" className="bg-white">
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
          <p className="text-xs font-semibold tracking-[0.2em] text-accent-soft uppercase">
            Let’s talk
          </p>
          <h1 className="mt-5 max-w-3xl font-heading text-4xl leading-tight font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Contact us
          </h1>
          <p className="mt-5 max-w-xl font-description text-lg leading-relaxed font-medium text-white/80">
            Ready to give wings to your business? Let’s start a conversation
            about your goals and how Boldfuse can help.
          </p>
        </div>
        <div className="grid gap-5 pt-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-6 lg:pt-16">
          <div className="relative isolate overflow-hidden rounded-3xl bg-forest-surface px-7 py-10 text-white sm:px-10 lg:px-12 lg:py-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_0%_0%,rgba(2,170,119,0.3),transparent_55%),radial-gradient(ellipse_at_100%_100%,rgba(97,198,168,0.2),transparent_50%)]"
            >
              <svg
                viewBox="0 0 500 700"
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full text-accent-soft"
                fill="none"
              >
                <path
                  d="M-60 650C90 560 100 680 240 570S400 460 550 500M-60 610C90 520 110 640 250 530S410 420 550 460"
                  stroke="currentColor"
                  strokeWidth="1"
                  opacity=".18"
                />
              </svg>
            </div>
            <p className="text-xs font-semibold tracking-[0.2em] text-accent-soft uppercase">
              Get in touch
            </p>
            <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Let’s Talk
            </h2>
            <p className="mt-4 max-w-sm font-description leading-relaxed text-white/75">
              Have a question or an idea? Reach out to us by phone, email, or
              using the form.
            </p>
            <div className="mt-10 border-t border-white/20">
              {details.map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  className="group flex items-center gap-4 border-b border-white/20 py-5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                  {...(label === "Visit us"
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-accent-soft">
                    <Icon size={19} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-xs font-semibold tracking-wider text-accent-soft uppercase">
                      {label}
                    </span>
                    <span className="mt-1 block font-description font-medium text-white group-hover:underline">
                      {value}
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </div>
          <div id="contact-form" className="relative scroll-mt-24 overflow-hidden rounded-3xl border border-[#cfe2d8] bg-white p-6 sm:p-9 lg:p-12">
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#008e68] via-[#75c8aa] to-[#e0f3e9]"
            />
            <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-accent-ink uppercase">
              Your next step
            </p>
            <h2 className="font-heading text-2xl font-bold text-forest">
              Send us a message
            </h2>
            <p className="mt-2 mb-7 font-description leading-relaxed text-muted">
              Share a few details and let’s find the right way forward together.
            </p>
            <ContactForm />
          </div>
        </div>
        <section className="mt-12 lg:mt-14" aria-labelledby="location-heading">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] text-accent-ink uppercase">
                Find us in Hyderabad
              </p>
              <h2
                id="location-heading"
                className="mt-3 font-heading text-3xl font-bold tracking-tight text-forest sm:text-4xl"
              >
                Good conversations start here.
              </h2>
            </div>
            <p className="max-w-xs font-description leading-relaxed text-muted">
              Find us on Lanco Hills Road in Gachibowli.
            </p>
          </div>
          <div className="relative overflow-hidden rounded-3xl border border-[#dbe9e1]">
            <div className="h-[350px] w-full sm:h-[480px] lg:h-[520px]">
              <iframe
                title="Map showing Lanco Hills Road, Gachibowli, Hyderabad"
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ width: "100%", height: "100%" }}
                className="block h-full w-full border-0"
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            <div className="relative isolate overflow-hidden bg-forest-surface px-6 py-7 text-white sm:px-8 lg:absolute lg:right-6 lg:bottom-6 lg:w-[360px] lg:rounded-2xl">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_0%_0%,rgba(2,170,119,0.3),transparent_65%),radial-gradient(ellipse_at_100%_100%,rgba(97,198,168,0.2),transparent_55%)]"
              >
                <svg
                  viewBox="0 0 400 250"
                  preserveAspectRatio="none"
                  className="absolute inset-0 h-full w-full text-accent-soft"
                  fill="none"
                >
                  <path
                    d="M-50 260C90 180 120 290 230 200S350 120 450 140M-50 230C90 150 130 260 240 170S360 90 450 110"
                    stroke="currentColor"
                    strokeWidth="1"
                    opacity=".18"
                  />
                </svg>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10 text-accent-soft">
                  <MapPin size={18} aria-hidden="true" />
                </span>
                <p className="text-xs font-semibold tracking-[0.16em] text-accent-soft uppercase">
                  Our location
                </p>
              </div>
              <p className="mt-5 font-heading text-xl font-bold text-white">
                Lanco Hills Road
              </p>
              <p className="mt-2 font-description leading-relaxed text-white/80">
                Gachibowli, Hyderabad 500089
              </p>
              <a
                href="https://maps.google.com/?q=Lanco+hills+road,+Gachibowli,+Hyderabad+500089"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex min-h-11 items-center gap-3 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-forest hover:bg-[#e8f5ef] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Get directions <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>
      </section>
      <CTA actionHref="#contact-form" />
    </main>
  );
}
