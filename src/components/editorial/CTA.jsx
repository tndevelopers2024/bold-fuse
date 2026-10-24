"use client";
import { home } from "@/content/home";
import { Phone } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { EASE, viewportOnce } from "@/lib/editorial/motion";
import { site } from "@/content/editorial/data";
import Reveal from "./Reveal";
import Button from "./Button";
import SectionHeading from "./SectionHeading";

/**
 * The single dark moment on an otherwise light site — deep forest, used once,
 * as the closing anchor.
 */
export default function CTA({
  eyebrow = home.cta.title,
  title = home.cta.body,
  body,
}) {
  const reduced = useReducedMotion();
  const enter = reduced
    ? {}
    : {
        initial: { opacity: 0, scale: 0.94, y: 24 },
        whileInView: { opacity: 1, scale: 1, y: 0 },
        viewport: viewportOnce,
        transition: { duration: 1, ease: EASE },
      };

  return (
    <section id="contact" className="bg-ivory py-10 sm:py-12 lg:py-14 xl:py-16">
      <div className="shell">
        <motion.div
          {...enter}
          className="relative isolate overflow-hidden rounded-3xl border border-forest-soft/40 bg-forest px-6 py-10 text-center shadow-[0_20px_50px_-15px_rgba(23,63,53,0.3)] sm:rounded-[2.25rem] sm:px-10 sm:py-12 lg:py-14"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_0%_0%,rgba(2,170,119,0.28),transparent_55%),radial-gradient(ellipse_at_100%_100%,rgba(97,198,168,0.18),transparent_50%)]"
          >
            <svg
              viewBox="0 0 1200 480"
              preserveAspectRatio="none"
              focusable="false"
              className="absolute inset-0 h-full w-full text-accent-soft"
              fill="none"
            >
              <path
                d="M650 520C850 500 810 325 1010 350S1180 210 1260 150L1260 520Z"
                fill="currentColor"
                opacity="0.035"
              />
              <path
                d="M620 520C830 490 800 300 1000 325S1170 180 1260 120"
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.13"
              />
              <path
                d="M710 520C900 490 850 365 1050 385S1210 250 1260 210"
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.09"
              />
            </svg>
          </div>

          <div className="relative mx-auto max-w-2xl">
            <SectionHeading
              eyebrow={eyebrow}
              title={title}
              titleClassName="text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.3] tracking-[-0.02em]"
              lede={body}
              tone="light"
            />

            <Reveal y={16} delay={0.24}>
              <div className="mt-7 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
                <Button to="/contact/" variant="light">
                  Get Started
                </Button>
                <a
                  href={site.phoneHref}
                  className="group inline-flex items-center gap-2.5 py-2 text-ivory/85 transition-colors duration-300 hover:text-ivory"
                >
                  <Phone
                    aria-hidden="true"
                    className="h-4 w-4"
                    strokeWidth={1.5}
                  />
                  <span className="font-display text-xl tracking-wide">
                    {site.phoneDisplay}
                  </span>
                </a>
              </div>
            </Reveal>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
