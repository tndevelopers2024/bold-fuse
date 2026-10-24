"use client";

import { home } from "@/content/home";
import Reveal, { RevealGroup, RevealItem } from "./Reveal";
import Button from "./Button";

function FlowLines({ light = false }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 500 500"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute inset-0 h-full w-full ${light ? "text-accent-soft" : "text-accent"}`}
      fill="none"
    >
      <path
        d="M80 540C260 510 210 330 380 350S510 215 560 150"
        stroke="currentColor"
        opacity={light ? "0.18" : "0.08"}
      />
      <path
        d="M150 550C330 520 285 390 440 405S550 300 580 230"
        stroke="currentColor"
        opacity={light ? "0.12" : "0.05"}
      />
    </svg>
  );
}

export default function Values() {
  return (
    <section
      id="values"
      aria-labelledby="values-heading"
      className="section bg-white"
    >
      <div className="shell">
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.65fr] lg:gap-7">
          <Reveal className="relative isolate flex flex-col overflow-hidden rounded-[1.75rem] border border-forest bg-forest p-7 sm:p-9 lg:p-8 xl:p-9">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_0%_0%,rgba(2,170,119,0.32),transparent_70%)]"
            />
            <FlowLines light />
            <div className="relative">
              <p className="eyebrow text-accent-soft">{home.values.eyebrow}</p>
              <h2
                id="values-heading"
                className="mt-5 max-w-md text-[2.25rem] leading-[1.12] tracking-[-0.035em] text-white sm:text-[2.5rem] lg:text-[2.625rem]"
              >
                {home.values.title}
              </h2>
            </div>
            <div className="relative mt-10 pt-6 lg:mt-auto lg:pt-12">
              <p className="font-description text-lg leading-relaxed text-white/85">
                {home.cta.title}
              </p>
              <div className="mt-6">
                <Button to="/#contact" variant="light">
                  Let’s Talk
                </Button>
              </div>
              <p className="mt-7 text-[0.6875rem] font-medium tracking-[0.16em] text-accent-soft uppercase">
                People · Process · Productivity
              </p>
            </div>
          </Reveal>
          <RevealGroup
            className="grid gap-5 sm:grid-cols-2 lg:gap-6"
            stagger={0.07}
            amount={0.1}
          >
            {home.values.items.map((item) => (
              <RevealItem
                as="article"
                key={item.title}
                className="relative isolate overflow-hidden rounded-[1.5rem] border border-line bg-white p-6 sm:p-7 lg:min-h-64"
              >
                <FlowLines />
                <span
                  aria-hidden="true"
                  className="relative block h-1 w-9 rounded-full bg-accent"
                />
                <h3 className="relative mt-6 max-w-xs text-[1.375rem] leading-[1.3] tracking-[-0.025em] text-forest">
                  {item.title}
                </h3>
                <p className="relative mt-4 font-description text-[0.9375rem] leading-[1.8] text-muted">
                  {item.text}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
