"use client";

import { Briefcase, LayoutGrid, TrendingUp, Users } from "lucide-react";
import { stats } from "@/content/editorial/data";
import CountUp from "./CountUp";
import { RevealGroup, RevealItem } from "./Reveal";

const icons = [Briefcase, TrendingUp, Users, LayoutGrid];

export default function Stats() {
  return (
    <section
      id="stats"
      aria-label="Boldfuse at a glance"
      className="relative z-10 bg-white pb-8 lg:pb-10"
    >
      <div className="shell">
        <RevealGroup
          as="dl"
          className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6"
          stagger={0.08}
          amount={0.15}
        >
          {stats.map((stat, index) => {
            const Icon = icons[index];
            return (
              <RevealItem
                key={stat.label}
                data-cursor-theme="dark"
                y={18}
                className="relative isolate flex flex-col overflow-hidden rounded-[1.5rem] border border-forest-soft/60 bg-forest p-5 shadow-[0_18px_40px_-22px_rgba(23,63,53,0.55)] sm:p-7"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_0%_0%,rgba(2,170,119,0.3),transparent_70%)]"
                >
                  <svg
                    viewBox="0 0 300 200"
                    preserveAspectRatio="none"
                    className="absolute inset-0 h-full w-full text-accent-soft"
                    fill="none"
                  >
                    <path
                      d="M70 230C180 215 160 125 250 140S310 75 340 40"
                      stroke="currentColor"
                      opacity="0.14"
                    />
                    <path
                      d="M120 235C215 220 200 160 280 170S335 120 355 90"
                      stroke="currentColor"
                      opacity="0.09"
                    />
                  </svg>
                </div>
                <dt className="relative order-2 mt-5 text-xs leading-relaxed font-medium tracking-[0.1em] text-white/80 uppercase">
                  {stat.label}
                </dt>
                <dd className="relative order-1 flex flex-wrap items-center justify-between gap-3">
                  <CountUp
                    value={stat.value}
                    className="font-heading text-[2.75rem] leading-none font-bold tracking-[-0.04em] text-white tabular-nums sm:text-[3.25rem]"
                    suffixClassName="text-accent-soft"
                  />
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-accent-soft"
                  >
                    <Icon size={20} strokeWidth={1.5} />
                  </span>
                </dd>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
