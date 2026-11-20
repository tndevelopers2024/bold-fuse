"use client";

import Image from "next/image";
import { about } from "@/content/about";
import { home } from "@/content/home";
import aboutImage from "@/assets/about-healthcare-team-v1.jpg";
import Reveal, { RevealGroup, RevealItem } from "./Reveal";
import Button from "./Button";

export default function About() {
  const tiles = [
    {
      title: home.experience.visionTitle,
      text: home.experience.vision,
    },
    {
      title: home.experience.missionTitle,
      text: home.experience.mission,
    },
    ...about.pillars,
  ];

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="section bg-white"
    >
      <div className="shell">
        <div className="grid items-stretch gap-9 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <Reveal className="relative rounded-3xl border border-line bg-white p-3">
            <Image
              src={aboutImage}
              alt={about.imageAlt}
              sizes="(min-width:1280px) 480px, (min-width:1024px) 42vw, 90vw"
              className="aspect-[4/3] w-full rounded-2xl object-cover lg:absolute lg:inset-3 lg:aspect-auto lg:h-[calc(100%-1.5rem)] lg:w-[calc(100%-1.5rem)]"
            />
          </Reveal>
          <div>
            <Reveal y={12}>
              <p className="eyebrow">{about.eyebrow}</p>
            </Reveal>
            <Reveal y={16}>
              <h2 id="about-heading" className="mt-4 max-w-xl text-[clamp(1.875rem,3.5vw,3rem)] leading-[1.18] tracking-[-0.03em]">
                {about.title}
              </h2>
            </Reveal>
            <Reveal y={16} delay={0.08}>
              <p className="mt-6 font-description text-base leading-[1.8] text-muted">
                {about.introduction}
              </p>
              <p className="mt-4 font-description text-base leading-[1.8] text-muted">
                {about.team}
              </p>
              <p className="mt-5 font-description text-base leading-[1.7] text-forest">
                {about.closing}
              </p>
              <div className="mt-6">
                <Button to="/#contact" variant="secondary">
                  Let’s Talk
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
        <RevealGroup
          id="experience"
          className="mt-10 grid gap-4 border-t border-line pt-8 sm:grid-cols-2 lg:mt-12 lg:grid-cols-5 lg:gap-5"
        >
          {tiles.map((tile) => (
            <RevealItem
              key={tile.title}
              className="relative isolate flex h-full flex-col overflow-hidden rounded-2xl border-2 border-forest/20 bg-white p-5 sm:p-6"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_100%_100%,rgba(169,233,217,0.22),transparent_65%)]"
              >
                <svg
                  viewBox="0 0 300 200"
                  preserveAspectRatio="none"
                  className="absolute inset-0 h-full w-full text-accent"
                  fill="none"
                >
                  <path
                    d="M60 220C160 205 140 120 230 135S295 75 330 40"
                    stroke="currentColor"
                    opacity="0.18"
                  />
                </svg>
              </div>
              <h3 className="font-heading text-xl font-bold tracking-tight text-forest">{tile.title}</h3>
              <p className="mt-2.5 font-description text-sm font-medium leading-relaxed text-forest/85">
                {tile.text}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
