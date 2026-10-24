"use client";

import Image from "next/image";
import { about } from "@/content/about";
import { home } from "@/content/home";
import aboutImage from "@/assets/about-healthcare-team-v1.jpg";
import Reveal, { RevealGroup, RevealItem } from "./Reveal";
import Button from "./Button";

export default function About() {
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
              className="aspect-[3/4] w-full rounded-2xl object-cover sm:aspect-[4/3] lg:absolute lg:inset-3 lg:aspect-auto lg:h-[calc(100%-1.5rem)] lg:w-[calc(100%-1.5rem)]"
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
            <div
              id="experience"
              className="mt-8 grid gap-6 border-t border-line pt-7 sm:grid-cols-[0.8fr_1.2fr] sm:gap-7"
            >
              <div>
                <h3 className="text-lg text-forest">
                  {home.experience.visionTitle}
                </h3>
                <p className="mt-2 font-description text-sm leading-relaxed text-muted">
                  {home.experience.vision}
                </p>
              </div>
              <div>
                <h3 className="text-lg text-forest">
                  {home.experience.missionTitle}
                </h3>
                <p className="mt-2 font-description text-sm leading-relaxed text-muted">
                  {home.experience.mission}
                </p>
              </div>
            </div>
          </div>
        </div>
        <RevealGroup className="mt-10 grid gap-7 border-t border-line pt-8 sm:grid-cols-3 sm:gap-8 lg:mt-12">
          {about.pillars.map((pillar) => (
            <RevealItem key={pillar.title}>
              <h3 className="text-lg text-forest">{pillar.title}</h3>
              <p className="mt-3 font-description text-sm leading-relaxed text-muted">
                {pillar.text}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
