"use client";
import { home } from "@/content/home";
import { Phone } from "lucide-react";
import { motion } from "motion/react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { EASE, viewportOnce } from "@/lib/editorial/motion";
import { site } from "@/content/editorial/data";
import Reveal from "./Reveal";
import Button from "./Button";
import SectionHeading from "./SectionHeading";

export default function CTA({
  id = "",
  contained = false,
  compactBottom = false,
  actionHref = "/contact/",
  actionLabel = "Get Started",
  opensContactModal = false,
  secondaryHref = "",
  secondaryLabel = "",
}) {
  const reduced = useReducedMotion();
  const enter = reduced
    ? {
        initial: false,
        animate: { opacity: 1, scale: 1, y: 0 },
        transition: { duration: 0 },
      }
    : {
        initial: { opacity: 0, scale: 0.94, y: 24 },
        whileInView: { opacity: 1, scale: 1, y: 0 },
        viewport: viewportOnce,
        transition: { duration: 1, ease: EASE },
      };

  return (
    <section
      id={id || undefined}
      className={`bg-white pt-10 sm:pt-12 lg:pt-14 xl:pt-16 ${compactBottom ? "pb-6 sm:pb-8" : "pb-10 sm:pb-12 lg:pb-14 xl:pb-16"}`}
    >
      <div className={contained ? undefined : "shell"}>
        <motion.div
          data-motion-reveal
          {...enter}
          className="relative isolate overflow-hidden rounded-3xl border border-forest-soft/40 bg-forest-surface px-6 py-10 text-center shadow-[0_20px_50px_-15px_rgba(23,63,53,0.3)] sm:rounded-[2.25rem] sm:px-10 sm:py-12 lg:py-14"
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

          <div className="relative mx-auto">
            <SectionHeading
              eyebrow={home.cta.title}
              title={home.cta.body}
              titleClassName="text-2xl leading-[1.3] tracking-[-0.02em]"
              tone="light"
            />

            <Reveal y={16} delay={0.24}>
              <div className="mt-7 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
                <Button
                  to={opensContactModal ? undefined : actionHref}
                  data-open-contact-modal={
                    opensContactModal ? "true" : undefined
                  }
                  variant="light"
                >
                  {actionLabel}
                </Button>
                <a
                  href={site.phoneHref}
                  data-button
                  className="inline-flex items-center gap-2.5 py-2 font-medium text-ivory/85 hover:text-ivory focus-visible:outline-accent-soft"
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
                {secondaryHref && (
                  <Button
                    to={secondaryHref}
                    variant="outlineLight"
                    withArrow={false}
                  >
                    {secondaryLabel}
                  </Button>
                )}
              </div>
            </Reveal>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
