"use client";

import Image from "next/image";
import {
  Cpu,
  Layers3,
  Users,
  ChartNoAxesCombined,
  Megaphone,
} from "lucide-react";
import { home } from "@/content/home";
import BlogLoop from "./BlogLoop";
import Hero from "./Hero";
import About from "./About";
import Services from "./Services";
import Stats from "./Stats";
import Values from "./Values";
import Process from "./Process";
import CTA from "./CTA";
import FAQ from "./FAQ";
import ScrollProgress from "./ScrollProgress";
import { RevealGroup, RevealItem } from "./Reveal";
import SectionHeading from "./SectionHeading";
import ClientLoops from "./ClientLoops";
import { JaaliField } from "./Ornaments";
import Button from "./Button";

const icons = [Cpu, Layers3, Users, ChartNoAxesCombined, Megaphone];

export default function EditorialHome() {
  return (
    <main id="main-content">
      <ScrollProgress />
      <Hero />
      <About />
      <Stats />
      <Services background="bg-white" />
      <section
        id="capabilities"
        className="section relative overflow-hidden bg-ivory"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-16 -left-20 h-96 w-96 [mask-image:radial-gradient(circle,black,transparent_72%)]"
        >
          <JaaliField opacity={0.08} scale={40} />
        </div>
        <div className="shell relative">
          <SectionHeading
            eyebrow={home.capabilities.eyebrow}
            title={home.capabilities.title}
          />
          <RevealGroup className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-10">
            <RevealItem className="relative overflow-hidden rounded-3xl border border-line/80 bg-white p-5 shadow-card sm:p-8">
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent/30 via-accent to-accent/30"
              />
              <Image
                src={home.capabilities.image}
                alt={home.capabilities.alt}
                sizes="(min-width:1024px) 45vw, 90vw"
                className="aspect-[4/3] w-full rounded-xl object-cover"
              />
              <h2 className="mt-6 font-display text-2xl text-forest">
                {home.hero.welcome}
              </h2>
              <p className="mt-3 font-description text-sm leading-relaxed text-muted">
                {home.hero.body}
              </p>
            </RevealItem>
            <RevealItem className="relative overflow-hidden rounded-3xl border border-line/80 bg-white p-5 shadow-card sm:p-8">
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent/30 via-accent to-accent/30"
              />
              {home.capabilities.items.map((item, i) => {
                const Icon = icons[i];
                return (
                  <div
                    key={item.title}
                    className="group flex items-center gap-5 border-b border-line/60 py-5 first:pt-0 last:border-0 last:pb-0"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-cream text-forest">
                      <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-xs text-accent-ink">{item.tagline}</p>
                      <h3 className="mt-1 text-xl">{item.title}</h3>
                    </div>
                  </div>
                );
              })}
            </RevealItem>
          </RevealGroup>
        </div>
      </section>
      <Process background="bg-white" />
      <Values />
      <section id="clients" className="section bg-white">
        <div className="shell">
          <SectionHeading
            prominent
            title={home.clients.eyebrow}
            lede={"Relationships built through collaboration, practical support and shared progress.\nHear from the businesses and teams we have worked alongside."}
          />
          <ClientLoops clients={home.clients.items} quotes={home.clients.quotes} />
        </div>
      </section>
      <section id="blog" className="section bg-white">
        <div className="shell">
          <SectionHeading
            prominent
            title="Latest Blogs"
            lede={"Fresh perspectives on healthcare, leadership and business growth.\nExplore practical ideas to help you take your next step."}
          />
          <BlogLoop />
          <div className="mt-10 flex justify-center">
            <Button to="/blogs/" variant="secondary">
              All Articles
            </Button>
          </div>
        </div>
      </section>
      <FAQ />
      <CTA />
    </main>
  );
}
