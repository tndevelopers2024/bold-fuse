"use client";
import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { EASE } from "@/lib/editorial/motion";

import { heroBanner } from "@/content/editorial/data";
import Button from "./Button";
import { SplitWords } from "./Reveal";

const slide = heroBanner;

/**
 * Static banner photograph with a word-by-word headline entrance.
 * The copy eases out on scroll; the image has no zoom or parallax animation.
 */
export default function Hero() {
  const reduced = useReducedMotion();
  // Hold the entrance until the preloader curtain starts lifting
  const ready = true;
  const enter = reduced ? {} : ready ? { opacity: 1, y: 0 } : undefined;

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="home"
      ref={sectionRef}
      data-cursor-theme="dark"
      className="relative isolate flex h-dvh min-h-[50rem] w-full items-start overflow-hidden sm:min-h-[64rem] lg:min-h-[42rem] lg:items-center"
    >
      {/* ---- Background banner image ---- */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="h-full w-full">
          <div className="relative h-full w-full max-lg:bg-[#0b261d]">
            <picture className="block h-full w-full">
              {slide.mobileSrc && (
                <source
                  media={slide.mobileMedia}
                  srcSet={slide.mobileSrc}
                  type="image/avif"
                />
              )}
              <Image
                src={slide.src}
                alt={slide.alt}
                width={1672}
                height={941}
                sizes="(min-width: 1024px) 100vw, 200vw"
                className={`h-full w-full object-cover max-lg:absolute max-lg:right-0 max-lg:bottom-[10%] max-lg:h-auto max-lg:w-[200%] max-lg:max-w-none max-lg:[mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)] sm:max-lg:bottom-0 sm:max-lg:w-[150%] ${slide.position || "object-center"}`}
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </picture>
          </div>
        </div>
        {/* Small screens: the headline sits over the photo, so shade the top half */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 via-45% to-transparent to-60% lg:hidden"
        />
      </div>

      {/* ---- Content Block ---- */}
      <motion.div
        className="relative z-10 flex w-full flex-col items-start px-5 pt-[5.5rem] pb-14 min-[400px]:pt-24 sm:px-8 sm:pt-32 sm:pb-16 lg:px-10 lg:pt-36"
        style={reduced ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <div className="w-full max-w-3xl text-left [text-shadow:0_2px_14px_rgba(0,0,0,0.85)] lg:w-[52%] lg:max-w-[52rem]">
          <motion.p
            className="eyebrow text-accent-soft"
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={enter}
            transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
          >
            {slide.eyebrow}
          </motion.p>

          <h1 className="display-1 mt-3 text-ivory max-[400px]:text-[2rem] max-[370px]:text-[1.875rem] sm:mt-4">
            <SplitWords
              text={slide.title}
              trigger={ready}
              delay={0.65}
              stagger={0.07}
            />
          </h1>

          <motion.div
            className="mt-4 sm:mt-6"
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={enter}
            transition={{ duration: 0.9, delay: 1.05, ease: EASE }}
          >
            <p className="lede max-w-xl text-left font-medium text-ivory [text-shadow:0_1px_8px_rgba(0,0,0,0.85)] max-[400px]:text-[0.9375rem] max-[400px]:leading-relaxed">
              <span className="sm:hidden">
                {slide.mobileDescription ?? slide.description}
              </span>
              <span className="hidden sm:inline">{slide.description}</span>
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-1.5 min-[370px]:gap-2 min-[400px]:gap-2.5 sm:mt-8 sm:gap-4">
              <Button
                to={slide.primaryCta.to}
                variant={slide.primaryCta.variant}
                className="min-h-[44px] border border-transparent max-[400px]:px-3.5! max-[400px]:tracking-[0.02em]! max-[370px]:px-3! max-[370px]:text-[0.625rem]! max-sm:px-4 max-sm:py-3 max-sm:text-[0.6875rem] max-sm:tracking-[0.04em] max-[400px]:[&>svg]:hidden!"
              >
                {slide.primaryCta.label}
              </Button>
              <Button
                to={slide.secondaryCta.to}
                variant={slide.secondaryCta.variant}
                withArrow={false}
                className="min-h-[44px] max-[400px]:px-3.5! max-[400px]:tracking-[0.02em]! max-[370px]:px-3! max-[370px]:text-[0.625rem]! max-sm:px-4 max-sm:py-3 max-sm:text-[0.6875rem] max-sm:tracking-[0.04em]"
              >
                {slide.secondaryCta.label}
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
