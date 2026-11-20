import CTA from "@/components/editorial/CTA";
import { ForestCardBackdrop, forestCardClass, forestCardIconClass } from "@/components/editorial/ForestCard";
import { pageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Compass, Eye, Phone, Sparkles, Target, Zap } from "lucide-react";
import aboutImage from "@/assets/about-healthcare-team-v1.jpg";
import founderImage from "@/assets/founder-keerthy-reddy.jpeg";
import { about } from "@/content/about";
import { site } from "@/content/site";

export const metadata: Metadata = pageMetadata({
  title: "About Us",
  description:
    "Learn about Boldfuse, our founder Keerthy Reddy, our multidisciplinary team, and our vision to blend innovation with human potential.",
  alternates: { canonical: "/about/" },
});

const pillarIcons = [Compass, Zap, Sparkles];


export default function AboutPage() {
  return (
    <main id="main-content" className="bg-white">
      <div className="shell pt-8 sm:pt-12">
        {/* 1. Top Banner */}
        <section className="page-hero relative isolate overflow-hidden rounded-3xl bg-forest-surface px-6 text-white sm:px-12 lg:px-16">
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
            Boldfuse
          </p>
          <h1 className="mt-5 max-w-3xl font-heading text-4xl leading-tight font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {about.topBanner.title}
          </h1>
          <p className="mt-5 max-w-2xl font-description text-lg leading-relaxed font-medium text-white/80">
            People, process and productivity partners. Transforming organizations
            to achieve excellence and sustainable competitive advantage.
          </p>
        </section>

        {/* 2. Who We Are */}
        <section
          aria-labelledby="who-we-are"
          className="pt-9 sm:pt-12 lg:pt-16"
        >
          <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
            <div className="relative overflow-hidden rounded-3xl border border-line bg-white p-3 lg:self-stretch">
              <Image
                src={aboutImage}
                alt={about.whoWeAre.imageAlt}
                sizes="(min-width: 1280px) 520px, (min-width: 1024px) 45vw, 92vw"
                className="aspect-[4/3] w-full rounded-2xl object-cover lg:absolute lg:inset-3 lg:aspect-auto lg:h-[calc(100%-1.5rem)] lg:w-[calc(100%-1.5rem)]"
                priority
              />
            </div>
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] text-accent-ink uppercase">
                {about.whoWeAre.eyebrow}
              </p>
              <h2
                id="who-we-are"
                className="mt-3 font-heading text-3xl font-bold tracking-tight text-forest sm:text-4xl"
              >
                {about.whoWeAre.title}
              </h2>

              <div className="mt-6 space-y-4 font-description text-base leading-[1.8] font-medium text-muted">
                {about.whoWeAre.paragraphs.map((p, idx) => (
                  <p
                    key={idx}
                    className={
                      idx === about.whoWeAre.paragraphs.length - 1
                        ? "font-semibold text-forest"
                        : idx === 2
                          ? "text-lg font-bold text-forest"
                          : ""
                    }
                  >
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Three Pillars */}
          <div className="mt-8 grid gap-4 md:grid-cols-3 lg:gap-6">
            {about.whoWeAre.pillars.map((pillar, idx) => {
              const Icon = pillarIcons[idx] ?? CheckCircle2;
              return (
                <div
                  key={pillar.title}
                  data-cursor-theme="dark"
                  className={forestCardClass}
                >
                  <ForestCardBackdrop />
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="self-center font-heading text-xl font-bold text-white">
                      {pillar.title}
                    </h3>
                    <span className={forestCardIconClass} aria-hidden="true">
                      <Icon size={20} strokeWidth={1.5} />
                    </span>
                  </div>
                  <p className="mt-5 font-description text-sm leading-relaxed font-medium text-white/85">
                    {pillar.text}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* 3. Founder & CEO: Keerthy Reddy */}
        <section
          aria-labelledby="founder-section"
          className="pt-9 sm:pt-12 lg:pt-16"
        >
          <div className="rounded-3xl border border-[#dbe9e1] bg-white p-6 sm:p-10 lg:p-14">
            <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
              {/* Left: Founder Image */}
              <div className="relative mx-auto flex w-full max-w-md overflow-hidden rounded-3xl border border-line bg-white p-3 shadow-sm lg:max-w-none lg:self-stretch">
                <Image
                  src={founderImage}
                  alt={about.founder.imageAlt}
                  sizes="(min-width: 1024px) 440px, 92vw"
                  className="h-[480px] w-full rounded-2xl object-cover object-top sm:h-[560px] lg:absolute lg:inset-3 lg:h-[calc(100%-1.5rem)] lg:w-[calc(100%-1.5rem)]"
                  priority
                />
              </div>

              {/* Right: Founder Details */}
              <div className="flex flex-col justify-center">
                <p className="text-xs font-semibold tracking-[0.2em] text-accent-ink uppercase">
                  {about.founder.eyebrow}
                </p>
                <h2
                  id="founder-section"
                  className="mt-3 font-heading text-3xl font-bold tracking-tight text-forest sm:text-4xl lg:text-5xl"
                >
                  {about.founder.name}
                </h2>

                <div className="mt-6 space-y-4 font-description text-base leading-[1.8] font-medium text-muted">
                  {about.founder.paragraphs.map((p, idx) => (
                    <p
                      key={idx}
                      className={
                        idx === 2
                          ? "rounded-2xl border-l-4 border-forest bg-forest/5 p-4 text-sm font-semibold text-forest"
                          : ""
                      }
                    >
                      {p}
                    </p>
                  ))}
                </div>

                <div className="@container mt-8">
                  <div className="grid gap-3 @min-[28rem]:grid-cols-[auto_auto_auto] @min-[28rem]:justify-start">
                    <Link
                      href="/contact/"
                      className="inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-forest px-3 py-3 text-sm font-semibold text-white hover:bg-forest-soft"
                    >
                      Connect with Keerthy
                      <ArrowUpRight size={17} aria-hidden="true" />
                    </Link>
                    <a
                      href={`tel:${site.telephone}`}
                      className="inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-line px-3 py-3 text-sm font-semibold text-forest hover:bg-forest/5"
                    >
                      <Phone size={16} aria-hidden="true" />
                      {site.telephone}
                    </a>
                    <a
                      href={about.founder.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Keerthy Reddy on LinkedIn"
                      className="inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-line px-3 py-3 text-sm font-semibold text-forest hover:bg-forest/5"
                    >
                      LinkedIn
                      <ArrowUpRight size={17} aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 grid gap-6 border-t border-line pt-6 sm:mt-8 sm:pt-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,1fr)] lg:gap-10">
              <div>
                <h3 className="font-heading text-xl font-bold text-forest sm:text-2xl">
                  {about.founder.healthcarePerspective.title}
                </h3>
                <div className="mt-4 max-w-3xl space-y-4 font-description text-base leading-[1.8] font-medium text-muted">
                  {about.founder.healthcarePerspective.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
              <div className="self-start rounded-2xl border border-line p-5">
                <h3 className="font-heading text-base font-bold text-forest">
                  Top skills
                </h3>
                <ul className="mt-3 list-disc space-y-2 pl-5 font-description text-sm font-medium text-muted marker:text-accent-ink">
                  {about.founder.healthcarePerspective.skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Our Vision & Mission */}
        <section
          aria-labelledby="vision-mission-heading"
          className="pt-9 sm:pt-12 lg:pt-16"
        >
          <div
            className="relative isolate overflow-hidden rounded-3xl border border-forest-soft/60 bg-forest-soft px-6 py-7 sm:px-9 sm:py-9 lg:px-12"
            data-cursor-theme="dark"
          >
            <ForestCardBackdrop />
            <h2
              id="vision-mission-heading"
              className="font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl"
            >
              Our Direction
            </h2>
            <div className="mt-5 grid border-t border-white/20 md:grid-cols-2">
              {[
                { ...about.visionMission.vision, Icon: Eye },
                { ...about.visionMission.mission, Icon: Target },
              ].map(({ title, text, Icon }, index) => (
                <div
                  key={title}
                  className={
                    index === 0
                      ? "pt-5 pb-5 md:pr-8 md:pb-0"
                      : "border-t border-white/20 pt-5 md:border-t-0 md:border-l md:pl-8"
                  }
                >
                  <div className="flex items-center gap-3">
                    <span className={forestCardIconClass} aria-hidden="true">
                      <Icon size={20} strokeWidth={1.5} />
                    </span>
                    <h3 className="font-heading text-xl font-bold text-white">
                      {title}
                    </h3>
                  </div>
                  <p className="mt-3 max-w-[52ch] font-description text-base leading-relaxed font-medium text-white/90">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTA contained compactBottom />
      </div>
    </main>
  );
}
