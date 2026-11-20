import CTA from "@/components/editorial/CTA";
import { pageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  Code2,
  Cpu,
  Mail,
  MapPin,
  Server,
  ShieldCheck,
  Sparkles,
  Users2,
} from "lucide-react";
import { servicesContent } from "@/content/services";
import CounsellingReadMoreModal from "@/components/CounsellingReadMoreModal";

export const metadata: Metadata = pageMetadata({
  title: "Services",
  description:
    "Our Services. Comprehensive business automation, mental wellness, financial advisory, creative branding, process excellence, legal, and HR services.",
  alternates: { canonical: "/services/" },
});

const itCategoryIcons = [Code2, Server, BarChart3, ShieldCheck, Users2, Cpu];

function ServiceReadMore({
  description,
  children,
}: {
  description: string;
  children?: ReactNode;
}) {
  const intro = description.match(/^.+?[.!?](?=\s|$)/)?.[0] ?? description;
  const remainder = description.slice(intro.length).trim();

  return (
    <div className="mt-5 font-description text-base leading-relaxed font-medium text-muted sm:text-lg">
      <p>{intro}</p>
      {(remainder || children) && (
        <details className="group mt-3">
          <summary className="w-fit cursor-pointer rounded-full border border-line px-4 py-2 text-sm font-semibold text-forest hover:border-forest">
            <span className="group-open:hidden">Read more</span>
            <span className="hidden group-open:inline">Read less</span>
          </summary>
          {remainder && <p className="mt-4">{remainder}</p>}
          {children}
        </details>
      )}
    </div>
  );
}

export default function ServicesPage() {
  const { hero, services, itRecruitment, raiseTheBar } = servicesContent;

  return (
    <main id="main-content" className="bg-white">
      <div className="shell pt-8 pb-0 sm:pt-12">
        {/* ========================================================= */}
        {/* 1. SERVICES HERO SECTION                                  */}
        {/* ========================================================= */}
        <section
          aria-labelledby="services-hero-heading"
          className="page-hero relative isolate overflow-hidden rounded-3xl bg-forest-surface px-6 text-white sm:px-12 lg:px-16"
        >
          {/* Subtle flowing SVG background decoration - matching Contact page */}
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
            {hero.eyebrow}
          </p>

          <h1
            id="services-hero-heading"
            className="mt-5 max-w-3xl font-heading text-4xl leading-tight font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Our Services
          </h1>

          <p className="mt-5 max-w-2xl font-description text-base leading-relaxed font-medium text-white/80 sm:text-lg">
            We empower leaders with practical solutions that build resilience,
            streamline operations, and drive sustainable business growth.
          </p>
        </section>

        {/* ========================================================= */}
        {/* 2. SERVICES LIST (SECTIONS 01 TO 07)                      */}
        {/* ========================================================= */}
        <div className="space-y-20 pt-16 sm:space-y-24 sm:pt-20 lg:space-y-32 lg:pt-28">
          {/* ------------------------------------------------------- */}
          {/* SERVICE 01: PEOPLE MANAGEMENT / HR                      */}
          {/* ------------------------------------------------------- */}
          <section
            id={services[0].id}
            aria-labelledby={`service-title-${services[0].id}`}
            className="scroll-mt-28"
          >
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
              {/* Text Left */}
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-heading text-4xl font-extrabold tracking-tight text-accent-ink sm:text-5xl">
                    {services[0].number}
                  </span>
                  <div className="h-0.5 w-10 bg-accent/40" />
                  <span className="text-xs font-semibold tracking-[0.2em] text-accent-ink uppercase">
                    Service Overview
                  </span>
                </div>

                <h2
                  id={`service-title-${services[0].id}`}
                  className="mt-3 font-heading text-3xl font-bold tracking-tight text-forest sm:text-4xl"
                >
                  {services[0].title}
                </h2>

                <p className="mt-3 font-heading text-xl leading-snug font-bold text-accent-ink sm:text-2xl">
                  {services[0].tagline}
                </p>

                <ServiceReadMore description={services[0].description}>
                  {/* 16 HR Capability Areas Grid */}
                  {services[0].offerings && (
                    <div className="mt-8">
                      <p className="text-xs font-semibold tracking-wider text-forest uppercase">
                        HR & People Competencies:
                      </p>
                      <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                        {services[0].offerings.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 rounded-xl border border-line bg-white px-3.5 py-2 font-description text-sm font-semibold text-forest"
                          >
                            <CheckCircle2
                              size={15}
                              className="shrink-0 text-accent"
                              aria-hidden="true"
                            />
                            <span className="min-w-0">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </ServiceReadMore>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="/contact/"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-forest px-7 py-3 text-sm font-semibold text-white hover:bg-forest-soft"
                  >
                    Empower Your Workforce
                    <ArrowUpRight size={17} aria-hidden="true" />
                  </Link>
                </div>
              </div>

              {/* Image Right */}
              <div className="relative overflow-hidden rounded-3xl border border-line bg-white p-3 shadow-sm">
                <Image
                  src={services[0].image}
                  alt={services[0].imageAlt}
                  sizes="(min-width: 1024px) 480px, 92vw"
                  className="aspect-[4/3] w-full rounded-2xl object-cover lg:absolute lg:inset-3 lg:aspect-auto lg:h-[calc(100%-1.5rem)] lg:w-[calc(100%-1.5rem)]"
                />
              </div>
            </div>
          </section>

          {/* ------------------------------------------------------- */}
          {/* SERVICE 02: WELLNESS AND MENTAL HEALTH                  */}
          {/* ------------------------------------------------------- */}
          <section
            id={services[1].id}
            aria-labelledby={`service-title-${services[1].id}`}
            className="scroll-mt-28"
          >
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
              {/* Image Left */}
              <div className="relative order-2 overflow-hidden rounded-3xl border border-line bg-white p-3 shadow-sm lg:order-1">
                <Image
                  src={services[1].image}
                  alt={services[1].imageAlt}
                  sizes="(min-width: 1024px) 480px, 92vw"
                  className="aspect-[4/3] w-full rounded-2xl object-cover lg:absolute lg:inset-3 lg:aspect-auto lg:h-[calc(100%-1.5rem)] lg:w-[calc(100%-1.5rem)]"
                />
              </div>

              {/* Text Right */}
              <div className="order-1 lg:order-2">
                <div className="flex items-center gap-3">
                  <span className="font-heading text-4xl font-extrabold tracking-tight text-accent-ink sm:text-5xl">
                    {services[1].number}
                  </span>
                  <div className="h-0.5 w-10 bg-accent/40" />
                  <span className="text-xs font-semibold tracking-[0.2em] text-accent-ink uppercase">
                    Service Overview
                  </span>
                </div>

                <h2
                  id={`service-title-${services[1].id}`}
                  className="mt-3 font-heading text-3xl font-bold tracking-tight text-forest sm:text-4xl"
                >
                  {services[1].title}
                </h2>

                <p className="mt-3 font-heading text-xl leading-snug font-bold text-accent-ink sm:text-2xl">
                  {services[1].tagline}
                </p>

                {services[1].previewParagraphs &&
                services[1].modalParagraphs ? (
                  <CounsellingReadMoreModal
                    tagline={services[1].tagline}
                    previewParagraphs={services[1].previewParagraphs.slice(
                      0,
                      1,
                    )}
                    paragraphs={services[1].modalParagraphs}
                  />
                ) : (
                  <p className="mt-5 font-description text-base leading-[1.8] font-medium text-muted">
                    {services[1].description}
                  </p>
                )}

                {/* Sub-services pills */}
                {services[1].offerings && (
                  <div className="mt-6">
                    <p className="text-xs font-semibold tracking-wider text-forest uppercase">
                      Specialized Offerings:
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2.5">
                      {services[1].offerings.map((item, idx) => {
                        const offeringHref =
                          item === "Counselling Services"
                            ? "/counselling-services/"
                            : item === "Therapy"
                              ? "/therapy/"
                              : item === "Parenting"
                                ? "/parenting/"
                                : item.toLowerCase() === "de-addiction services"
                                  ? "/de-addiction-services/"
                                  : item.toLowerCase() === "psychosis treatment"
                                    ? "/psychosis-treatment/"
                                    : item.toLowerCase() ===
                                        "psychological testing"
                                      ? "/psychological-testing/"
                                      : null;

                        return offeringHref ? (
                          <Link
                            key={idx}
                            href={offeringHref}
                            className="inline-flex items-center gap-1.5 rounded-full border border-forest/20 bg-white px-4 py-1.5 font-description text-sm font-semibold text-forest hover:border-forest hover:bg-forest hover:text-white"
                          >
                            <CheckCircle2
                              size={14}
                              className="text-accent"
                              aria-hidden="true"
                            />
                            {item}
                          </Link>
                        ) : (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-4 py-1.5 font-description text-sm font-semibold text-forest"
                          >
                            <CheckCircle2
                              size={14}
                              className="text-accent"
                              aria-hidden="true"
                            />
                            {item}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="/contact/"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-forest px-7 py-3 text-sm font-semibold text-white hover:bg-forest-soft"
                  >
                    Book a Consultation
                    <ArrowUpRight size={17} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* ------------------------------------------------------- */}
          {/* MID-PAGE CTA 1                                          */}
          {/* ------------------------------------------------------- */}
          <div className="-mt-14 mb-2 sm:-mt-[4.5rem] sm:mb-4 lg:-mt-24 lg:mb-6">
            <CTA contained />
          </div>

          {/* ------------------------------------------------------- */}
          {/* SERVICE 03: DIGITAL MARKETING / CREATIVE BRANDING AND PR */}
          {/* ------------------------------------------------------- */}
          <section
            id={services[2].id}
            aria-labelledby={`service-title-${services[2].id}`}
            className="scroll-mt-28"
          >
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
              {/* Text Left */}
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-heading text-4xl font-extrabold tracking-tight text-accent-ink sm:text-5xl">
                    {services[2].number}
                  </span>
                  <div className="h-0.5 w-10 bg-accent/40" />
                  <span className="text-xs font-semibold tracking-[0.2em] text-accent-ink uppercase">
                    Service Overview
                  </span>
                </div>

                <h2
                  id={`service-title-${services[2].id}`}
                  className="mt-3 font-heading text-3xl font-bold tracking-tight text-forest sm:text-4xl"
                >
                  {services[2].title}
                </h2>

                <p className="mt-3 font-heading text-xl leading-snug font-bold text-accent-ink sm:text-2xl">
                  {services[2].tagline}
                </p>

                <ServiceReadMore description={services[2].description} />

                {/* Sub-brand highlight */}
                {services[2].subBrand && (
                  <div className="mt-6 inline-flex items-center gap-2 rounded-2xl border border-line bg-white px-5 py-3 shadow-xs">
                    <Sparkles
                      size={18}
                      className="text-accent"
                      aria-hidden="true"
                    />
                    <span className="font-heading text-base font-bold text-forest">
                      {services[2].subBrand}
                    </span>
                  </div>
                )}

                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="/contact/"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-forest px-7 py-3 text-sm font-semibold text-white hover:bg-forest-soft"
                  >
                    Build Your Brand
                    <ArrowUpRight size={17} aria-hidden="true" />
                  </Link>
                </div>
              </div>

              {/* Image Right */}
              <div className="relative overflow-hidden rounded-3xl border border-line bg-white p-3 shadow-sm">
                <Image
                  src={services[2].image}
                  alt={services[2].imageAlt}
                  sizes="(min-width: 1024px) 480px, 92vw"
                  className="aspect-[4/3] w-full rounded-2xl object-cover lg:absolute lg:inset-3 lg:aspect-auto lg:h-[calc(100%-1.5rem)] lg:w-[calc(100%-1.5rem)]"
                />
              </div>
            </div>
          </section>

          {/* ------------------------------------------------------- */}
          {/* SERVICE 04: BUSINESS AUTOMATION                         */}
          {/* ------------------------------------------------------- */}
          <section
            id={services[3].id}
            aria-labelledby={`service-title-${services[3].id}`}
            className="scroll-mt-28"
          >
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
              {/* Image Left */}
              <div className="relative order-2 overflow-hidden rounded-3xl border border-line bg-white p-3 shadow-sm lg:order-1">
                <Image
                  src={services[3].image}
                  alt={services[3].imageAlt}
                  sizes="(min-width: 1024px) 480px, 92vw"
                  className="aspect-[4/3] w-full rounded-2xl object-cover lg:absolute lg:inset-3 lg:aspect-auto lg:h-[calc(100%-1.5rem)] lg:w-[calc(100%-1.5rem)]"
                />
              </div>

              {/* Text Right */}
              <div className="order-1 lg:order-2">
                <div className="flex items-center gap-3">
                  <span className="font-heading text-4xl font-extrabold tracking-tight text-accent-ink sm:text-5xl">
                    {services[3].number}
                  </span>
                  <div className="h-0.5 w-10 bg-accent/40" />
                  <span className="text-xs font-semibold tracking-[0.2em] text-accent-ink uppercase">
                    Service Overview
                  </span>
                </div>

                <h2
                  id={`service-title-${services[3].id}`}
                  className="mt-3 font-heading text-3xl font-bold tracking-tight text-forest sm:text-4xl"
                >
                  {services[3].title}
                </h2>

                <p className="mt-3 font-heading text-xl leading-snug font-bold text-accent-ink sm:text-2xl">
                  {services[3].tagline}
                </p>

                <ServiceReadMore description={services[3].description} />

                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="/contact/"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-forest px-7 py-3 text-sm font-semibold text-white hover:bg-forest-soft"
                  >
                    Automate Your Business
                    <ArrowUpRight size={17} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* ------------------------------------------------------- */}
          {/* MID-PAGE CTA 2                                          */}
          {/* ------------------------------------------------------- */}
          <div className="-mt-14 mb-2 sm:-mt-[4.5rem] sm:mb-4 lg:-mt-24 lg:mb-6">
            <CTA contained />
          </div>

          {/* ------------------------------------------------------- */}
          {/* SERVICE 05: FINANCE AND ADVISORY SERVICES               */}
          {/* ------------------------------------------------------- */}
          <section
            id={services[4].id}
            aria-labelledby={`service-title-${services[4].id}`}
            className="scroll-mt-28"
          >
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
              {/* Text Left */}
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-heading text-4xl font-extrabold tracking-tight text-accent-ink sm:text-5xl">
                    {services[4].number}
                  </span>
                  <div className="h-0.5 w-10 bg-accent/40" />
                  <span className="text-xs font-semibold tracking-[0.2em] text-accent-ink uppercase">
                    Service Overview
                  </span>
                </div>

                <h2
                  id={`service-title-${services[4].id}`}
                  className="mt-3 font-heading text-3xl font-bold tracking-tight text-forest sm:text-4xl"
                >
                  {services[4].title}
                </h2>

                <p className="mt-3 font-heading text-xl leading-snug font-bold text-accent-ink sm:text-2xl">
                  {services[4].tagline}
                </p>

                <ServiceReadMore description={services[4].description} />

                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="/contact/"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-forest px-7 py-3 text-sm font-semibold text-white hover:bg-forest-soft"
                  >
                    Consult Our Financial Advisors
                    <ArrowUpRight size={17} aria-hidden="true" />
                  </Link>
                </div>
              </div>

              {/* Image Right */}
              <div className="relative overflow-hidden rounded-3xl border border-line bg-white p-3 shadow-sm">
                <Image
                  src={services[4].image}
                  alt={services[4].imageAlt}
                  sizes="(min-width: 1024px) 480px, 92vw"
                  className="aspect-[4/3] w-full rounded-2xl object-cover lg:absolute lg:inset-3 lg:aspect-auto lg:h-[calc(100%-1.5rem)] lg:w-[calc(100%-1.5rem)]"
                />
              </div>
            </div>
          </section>

          {/* ------------------------------------------------------- */}
          {/* SERVICE 06: BUSINESS PROCESS EXCELLENCE                 */}
          {/* ------------------------------------------------------- */}
          <section
            id={services[5].id}
            aria-labelledby={`service-title-${services[5].id}`}
            className="scroll-mt-28"
          >
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
              {/* Image Left */}
              <div className="relative order-2 overflow-hidden rounded-3xl border border-line bg-white p-3 shadow-sm lg:order-1">
                <Image
                  src={services[5].image}
                  alt={services[5].imageAlt}
                  sizes="(min-width: 1024px) 480px, 92vw"
                  className="aspect-[4/3] w-full rounded-2xl object-cover lg:absolute lg:inset-3 lg:aspect-auto lg:h-[calc(100%-1.5rem)] lg:w-[calc(100%-1.5rem)]"
                />
              </div>

              {/* Text Right */}
              <div className="order-1 lg:order-2">
                <div className="flex items-center gap-3">
                  <span className="font-heading text-4xl font-extrabold tracking-tight text-accent-ink sm:text-5xl">
                    {services[5].number}
                  </span>
                  <div className="h-0.5 w-10 bg-accent/40" />
                  <span className="text-xs font-semibold tracking-[0.2em] text-accent-ink uppercase">
                    Service Overview
                  </span>
                </div>

                <h2
                  id={`service-title-${services[5].id}`}
                  className="mt-3 font-heading text-3xl font-bold tracking-tight text-forest sm:text-4xl"
                >
                  {services[5].title}
                </h2>

                <p className="mt-3 font-heading text-xl leading-snug font-bold text-accent-ink sm:text-2xl">
                  {services[5].tagline}
                </p>

                <ServiceReadMore description={services[5].description}>
                  {/* Four Transformation Pillars */}
                  {services[5].pillars && (
                    <div className="mt-8 grid gap-4 sm:grid-cols-2">
                      {services[5].pillars.map((pillar, idx) => (
                        <div
                          key={idx}
                          className="rounded-2xl border border-line bg-white p-5 shadow-xs"
                        >
                          <div className="flex items-center gap-2 text-forest">
                            <CheckCircle2
                              size={18}
                              className="text-accent"
                              aria-hidden="true"
                            />
                            <h4 className="font-heading text-base font-bold">
                              {pillar.title}
                            </h4>
                          </div>
                          <p className="mt-2 font-description text-sm leading-relaxed font-medium text-muted">
                            {pillar.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </ServiceReadMore>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="/contact/"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-forest px-7 py-3 text-sm font-semibold text-white hover:bg-forest-soft"
                  >
                    Transform Your Operations
                    <ArrowUpRight size={17} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* ------------------------------------------------------- */}
          {/* SERVICE 07: LEGAL AND ADVISORY SERVICES                 */}
          {/* ------------------------------------------------------- */}
          <section
            id={services[6].id}
            aria-labelledby={`service-title-${services[6].id}`}
            className="scroll-mt-28"
          >
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
              {/* Text Left */}
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-heading text-4xl font-extrabold tracking-tight text-accent-ink sm:text-5xl">
                    {services[6].number}
                  </span>
                  <div className="h-0.5 w-10 bg-accent/40" />
                  <span className="text-xs font-semibold tracking-[0.2em] text-accent-ink uppercase">
                    Service Overview
                  </span>
                </div>

                <h2
                  id={`service-title-${services[6].id}`}
                  className="mt-3 font-heading text-3xl font-bold tracking-tight text-forest sm:text-4xl"
                >
                  {services[6].title}
                </h2>

                <p className="mt-3 font-heading text-xl leading-snug font-bold text-accent-ink sm:text-2xl">
                  {services[6].tagline}
                </p>

                <ServiceReadMore description={services[6].description} />

                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="/contact/"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-forest px-7 py-3 text-sm font-semibold text-white hover:bg-forest-soft"
                  >
                    Speak with Legal Advisors
                    <ArrowUpRight size={17} aria-hidden="true" />
                  </Link>
                </div>
              </div>

              {/* Image Right */}
              <div className="relative overflow-hidden rounded-3xl border border-line bg-white p-3 shadow-sm">
                <Image
                  src={services[6].image}
                  alt={services[6].imageAlt}
                  sizes="(min-width: 1024px) 480px, 92vw"
                  className="aspect-[4/3] w-full rounded-2xl object-cover lg:absolute lg:inset-3 lg:aspect-auto lg:h-[calc(100%-1.5rem)] lg:w-[calc(100%-1.5rem)]"
                />
              </div>
            </div>
          </section>
        </div>

        {/* ========================================================= */}
        {/* 3. IT RECRUITMENT & TALENT SECTION                        */}
        {/* ========================================================= */}
        <section
          id="it-recruitment"
          aria-labelledby="it-recruitment-heading"
          className="mt-12 border-t border-line pt-10 sm:mt-14 sm:pt-12 lg:mt-16 lg:pt-14"
        >
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
            <h2
              id="it-recruitment-heading"
              className="mt-3 max-w-3xl font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
            >
              {itRecruitment.title}
            </h2>
            <p className="mt-4 max-w-2xl font-description text-base leading-relaxed font-medium text-white/80 sm:text-lg">
              {itRecruitment.lead}
            </p>
          </div>

          {/* "What We Do" card */}
          <div className="mt-8 rounded-3xl border border-line bg-white p-6 sm:p-10 lg:p-12">
            <div className="flex items-center gap-2.5 text-accent-ink">
              <Users2 size={22} aria-hidden="true" />
              <h3 className="font-heading text-2xl font-bold text-forest">
                {itRecruitment.whatWeDo.title}
              </h3>
            </div>
            <p className="mt-4 font-description text-base leading-[1.8] font-medium text-muted sm:text-lg">
              {itRecruitment.whatWeDo.body}
            </p>
          </div>

          {/* "Hiring for IT Positions" + Categories */}
          <div className="mt-12 sm:mt-16">
            <div className="border-b border-line pb-6">
              <p className="text-xs font-semibold tracking-[0.2em] text-accent-ink uppercase">
                Open Positions
              </p>
              <h3 className="mt-2 font-heading text-2xl font-bold tracking-tight text-forest sm:text-3xl">
                {itRecruitment.hiringPositions.title}
              </h3>
              <p className="mt-3 max-w-3xl font-description text-base font-medium text-muted">
                {itRecruitment.hiringPositions.lead}
              </p>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {itRecruitment.hiringPositions.categories.map((cat, idx) => {
                const IconComponent = itCategoryIcons[idx] ?? Code2;
                return (
                  <div
                    key={idx}
                    className="flex flex-col justify-between rounded-3xl border border-line bg-white p-6 shadow-xs hover:border-accent/40"
                  >
                    <div>
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-forest/5 text-forest">
                        <IconComponent size={24} aria-hidden="true" />
                      </div>
                      <h4 className="mt-5 font-heading text-lg font-bold text-forest">
                        {cat.title}
                      </h4>
                      <p className="mt-2 font-description text-sm leading-relaxed font-medium text-muted">
                        {cat.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Locations & How to Apply split */}
          <div className="mt-12 grid gap-8 sm:mt-16 lg:grid-cols-2">
            {/* Locations */}
            <div className="flex flex-col justify-between rounded-3xl border border-line bg-white p-6 shadow-xs sm:p-8">
              <div>
                <div className="flex items-center gap-2.5 text-accent-ink">
                  <MapPin size={22} aria-hidden="true" />
                  <h3 className="font-heading text-2xl font-bold text-forest">
                    {itRecruitment.locations.title}
                  </h3>
                </div>
                <div className="mt-6 space-y-4">
                  {itRecruitment.locations.items.map((loc, idx) => (
                    <div
                      key={idx}
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
                        <h4 className="font-heading text-lg font-bold text-forest">
                          {loc.country}
                        </h4>
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
                  <h3 className="font-heading text-2xl font-bold text-forest">
                    {itRecruitment.howToApply.title}
                  </h3>
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
                      @bOLDFUSE
                    </a>{" "}
                    for the latest openings and updates.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={`mailto:${itRecruitment.howToApply.email}?subject=Application for IT Position - Boldfuse`}
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

        {/* ========================================================= */}
        {/* 4. CLOSING "RAISE THE BAR" PERSPECTIVE BANNER             */}
        {/* ========================================================= */}
        <section
          aria-labelledby="raise-the-bar-heading"
          className="mt-12 sm:mt-14 lg:mt-16"
        >
          <div className="relative isolate overflow-hidden rounded-3xl bg-forest-surface px-6 py-14 text-white sm:px-12 sm:py-20 lg:px-16">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_0%_0%,rgba(2,170,119,0.30),transparent_55%),radial-gradient(ellipse_at_100%_100%,rgba(97,198,168,0.20),transparent_50%)]"
            >
              <svg
                viewBox="0 0 1000 350"
                preserveAspectRatio="none"
                focusable="false"
                className="absolute inset-0 h-full w-full text-accent-soft"
                fill="none"
              >
                <path
                  d="M500 380C720 340 700 180 900 210S1050 80 1100 20"
                  stroke="currentColor"
                  strokeWidth="1"
                  opacity="0.14"
                />
              </svg>
            </div>

            <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
              {/* Left Column */}
              <div>
                <p className="text-xs font-semibold tracking-[0.2em] text-accent-soft uppercase">
                  {raiseTheBar.eyebrow}
                </p>
                <h2
                  id="raise-the-bar-heading"
                  className="mt-4 font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
                >
                  {raiseTheBar.title}
                </h2>
              </div>

              {/* Right Column: Statistics */}
              <div className="grid grid-cols-2 gap-6 border-t border-white/15 pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
                {raiseTheBar.stats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur-sm"
                  >
                    <div className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl">
                      {stat.value}
                    </div>
                    <div className="mt-2 font-description text-sm font-semibold tracking-wide text-accent-soft uppercase">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
      <CTA />
    </main>
  );
}
