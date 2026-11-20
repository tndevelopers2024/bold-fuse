"use client";

import { Briefcase, MapPin, TrendingUp, Users } from "lucide-react";
import { stats } from "@/content/editorial/data";
import { ForestCardBackdrop, forestCardClass, forestCardIconClass } from "./ForestCard";
import CountUp from "./CountUp";
import { RevealGroup, RevealItem } from "./Reveal";

const icons = [Briefcase, TrendingUp, Users, MapPin];

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
                className={forestCardClass}
              >
                <ForestCardBackdrop />
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
                    className={forestCardIconClass}
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
