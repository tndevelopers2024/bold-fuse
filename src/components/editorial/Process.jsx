"use client";
import { home } from "@/content/home";
import { ClipboardList, RefreshCcw, Rocket, Search } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { processSteps } from "@/content/editorial/data";
import { EASE, viewportOnce } from "@/lib/editorial/motion";
import SectionHeading from "./SectionHeading";
import { RevealGroup, RevealItem } from "./Reveal";
import SwipeArea from "./SwipeArea";

const iconMap = { Search, ClipboardList, Rocket, RefreshCcw };

/** Icon-in-circle marker that sits on the rail. The review step is inverted to accent. */
function Marker({ Icon, accent = false, size = "lg" }) {
  const dims = size === "lg" ? "h-11 w-11" : "h-9 w-9";
  const icon = size === "lg" ? "h-4 w-4" : "h-3.5 w-3.5";
  const tone = accent
    ? "border-accent bg-accent text-forest"
    : "border-accent/60 bg-forest text-accent-soft";
  return (
    <span
      className={`relative z-10 flex ${dims} shrink-0 items-center justify-center rounded-full border ${tone} shadow-[0_0_0_6px_rgba(2,170,119,0.12)]`}
    >
      {accent && (
        <span
          aria-hidden="true"
          className="animate-ripple absolute inset-0 rounded-full border border-accent motion-reduce:hidden"
        />
      )}
      <Icon
        aria-hidden="true"
        className={`${icon} ${accent ? "animate-spin-slow [animation-duration:9s]" : ""}`}
        strokeWidth={1.75}
      />
    </span>
  );
}

/** Hairline that draws itself in along one axis on first view. */
function Rail({ className, axis = "x" }) {
  const reduced = useReducedMotion();
  const origin = axis === "x" ? "origin-left" : "origin-top";
  if (reduced)
    return <span aria-hidden="true" className={`${className} ${origin}`} />;

  const from = axis === "x" ? { scaleX: 0 } : { scaleY: 0 };
  const to = axis === "x" ? { scaleX: 1 } : { scaleY: 1 };
  return (
    <motion.span
      aria-hidden="true"
      className={`${className} ${origin}`}
      initial={from}
      whileInView={to}
      viewport={viewportOnce}
      transition={{ duration: 1.1, ease: EASE }}
    />
  );
}

/**
 * Four steps as one continuous path. From `lg` the steps run left to right
 * along a rail, and a dashed return line loops Review back to Understand, since
 * the process repeats. Below `lg` the same rail runs down the left edge.
 *
 * Review is the step that keeps the others honest, so it is set in forest
 * rather than white.
 */
export default function Process({
  eyebrow = home.process.eyebrow,
  background = "bg-white",
  className = "",
}) {
  const last = processSteps.length - 1;

  return (
    <section id="process" className={`section ${background} ${className}`}>
      <div className="shell">
        <SectionHeading
          prominent
          title={eyebrow}
          lede={"A clear path from understanding your challenges to putting solutions into practice.\nWe assess, strategize and execute with your business goals at the centre."}
        />

        <div className="relative mt-8 sm:mt-10 lg:mt-12">
          {/* Desktop rail: first marker centre → last marker centre (4 cols, gap-6) */}
          <Rail className="absolute top-[1.375rem] right-[calc(33.333%_-_2.5rem)] left-[1.375rem] hidden h-px bg-line lg:block" />
          {/* A accent bead travelling the rail, from Understand toward Review */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-[1.375rem] right-[calc(33.333%_-_2.5rem)] left-[1.375rem] hidden motion-reduce:hidden lg:block"
          >
            <span className="animate-travel absolute top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_0_4px_rgba(2,170,119,0.18)]" />
          </span>
          {/* Mobile rail, down the left edge */}
          <Rail
            axis="y"
            className="absolute top-4 bottom-4 left-[1.125rem] hidden w-px bg-line sm:block lg:hidden"
          />

          <SwipeArea>
            <RevealGroup
              as="ol"
              className="relative swipe-mobile grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-6"
              stagger={0.12}
              amount={0.15}
            >
              {processSteps.map((step, i) => {
                const Icon = iconMap[step.icon];
                const accent = i === last;

                return (
                  <RevealItem
                    as="li"
                    key={step.number}
                    className="relative flex max-sm:pl-0 sm:pl-14 lg:flex-col lg:pl-0"
                    y={18}
                  >
                    <span className="absolute top-5 left-0 max-sm:hidden lg:hidden">
                      <Marker Icon={Icon} accent={accent} size="sm" />
                    </span>
                    <span className="hidden lg:block">
                      <Marker Icon={Icon} accent={accent} />
                    </span>

                    <article
                      className={`group flex w-full flex-1 flex-col rounded-2xl border p-6 transition-[border-color,box-shadow,transform] duration-500 hover:-translate-y-1 sm:p-7 lg:mt-7 ${
                        accent
                          ? "border-forest bg-forest text-ivory hover:shadow-lift"
                          : "border-line bg-white hover:border-accent/60 hover:shadow-card"
                      }`}
                    >
                      <p
                        className={`text-[0.6875rem] font-medium tracking-[0.2em] uppercase ${
                          accent ? "text-accent-soft" : "text-accent-ink"
                        }`}
                      >
                        Step {step.number}
                        <span
                          className={accent ? "text-ivory/50" : "text-muted/70"}
                        >
                          {" "}
                          / 0{processSteps.length}
                        </span>
                      </p>

                      <h3
                        className={`mt-4 font-display text-[1.5rem] leading-tight sm:text-[1.625rem] ${
                          accent ? "text-ivory" : "text-forest"
                        }`}
                      >
                        {step.title}
                      </h3>

                      <span
                        aria-hidden="true"
                        className={`mt-4 block h-px w-8 ${accent ? "bg-accent-soft" : "bg-accent"}`}
                      />

                      <p
                        className={`mt-4 font-description text-[0.9375rem] leading-relaxed ${accent ? "text-ivory/80" : "text-muted"}`}
                      >
                        {step.body}
                      </p>

                      {step.tags?.length > 0 && (
                        <ul className="mt-auto flex flex-wrap gap-2 pt-6">
                          {step.tags.map((tag) => (
                            <li
                              key={tag}
                              className={`rounded-full border px-3 py-1 text-[0.625rem] font-medium tracking-[0.08em] uppercase ${
                                accent
                                  ? "border-ivory/25 text-ivory/80"
                                  : "border-line text-muted"
                              }`}
                            >
                              {tag}
                            </li>
                          ))}
                        </ul>
                      )}
                    </article>
                  </RevealItem>
                );
              })}
            </RevealGroup>
          </SwipeArea>

          {/* Desktop return loop: under Review, back along the bottom, up into Understand */}
          <div className="relative mt-3 hidden h-10 lg:block">
            <div className="absolute top-0 right-[calc(33.333%_-_2.5rem)] bottom-0 left-[1.375rem] rounded-b-2xl border border-t-0 border-dashed border-accent/70">
              <svg
                aria-hidden="true"
                viewBox="0 0 10 6"
                className="absolute -top-1 left-0 h-1.5 w-2.5 -translate-x-1/2 fill-accent"
              >
                <path d="M5 0 10 6H0z" />
              </svg>
              <p
                className={`absolute bottom-0 left-1/2 flex -translate-x-1/2 translate-y-1/2 items-center gap-2 px-4 text-[0.6875rem] font-medium tracking-[0.18em] whitespace-nowrap text-accent-ink uppercase ${background}`}
              >
                <RefreshCcw
                  aria-hidden="true"
                  className="animate-spin-slow h-3.5 w-3.5 [animation-duration:9s]"
                  strokeWidth={1.75}
                />
                Assess. Strategize. Execute.
              </p>
            </div>
          </div>

          {/* Mobile return note */}
          <p className="mt-5 flex items-center gap-2 pl-14 text-[0.6875rem] font-medium tracking-[0.18em] text-accent-ink uppercase lg:hidden">
            <RefreshCcw
              aria-hidden="true"
              className="h-3.5 w-3.5"
              strokeWidth={1.75}
            />
            Assess. Strategize. Execute.
          </p>
        </div>
      </div>
    </section>
  );
}
