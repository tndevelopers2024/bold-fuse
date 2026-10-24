"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button, Container } from "./ui";
import { routes } from "@/config/routes";
import { site } from "@/content/site";
import { ui } from "@/content/ui";
import type { HeroSlide } from "@/content/types";
import { cn } from "@/lib/cn";

export function HeroCarousel({ slides }: { slides: readonly HeroSlide[] }) {
  const [active, setActive] = useState(0);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const move = (step: number) =>
    setActive((index) => (index + step + slides.length) % slides.length);
  return (
    <section
      id="home"
      aria-label={ui.carousel.label}
      aria-roledescription={ui.carousel.role}
      className="relative isolate h-screen overflow-hidden bg-white text-brand-950"
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          move(-1);
        }
        if (event.key === "ArrowRight") {
          event.preventDefault();
          move(1);
        }
      }}
      onTouchStart={(event) => {
        const point = event.touches[0];
        touch.current = point ? { x: point.clientX, y: point.clientY } : null;
      }}
      onTouchEnd={(event) => {
        const point = event.changedTouches[0];
        if (!point || !touch.current) return;
        const dx = point.clientX - touch.current.x;
        const dy = point.clientY - touch.current.y;
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy))
          move(dx < 0 ? 1 : -1);
        touch.current = null;
      }}
    >
      {slides.map((slide, index) => (
        <div
          key={slide.title}
          aria-hidden={index !== active}
          className={cn(
            "absolute inset-0 transition-opacity duration-500 motion-reduce:transition-none",
            index === active ? "opacity-100" : "opacity-0",
          )}
        >
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            preload={index === 0}
            sizes="100vw"
            className="object-contain object-right-bottom lg:object-right"
          />
        </div>
      ))}
      <Container className="relative flex h-full flex-col overflow-y-auto pt-24 pb-8 md:pt-28 md:pb-12">
        <div className="my-auto w-full max-w-3xl shrink-0 self-start lg:w-1/2">
          <div className="grid">
            {slides.map((slide, index) => {
              const Heading = index === 0 ? "h1" : "h2";
              return (
                <div
                  key={slide.title}
                  aria-hidden={index !== active}
                  inert={index !== active}
                  className={cn(
                    "col-start-1 row-start-1 flex flex-col",
                    index !== active && "pointer-events-none invisible",
                  )}
                >
                  <p className="eyebrow">{slide.eyebrow}</p>
                  <Heading className="text-5xl leading-[1.08] font-extrabold tracking-tight md:text-6xl xl:text-7xl">
                    {slide.title.split(" ").slice(0, 3).join(" ")}{" "}
                    <span className="text-brand-700">
                      {slide.title.split(" ").slice(3).join(" ")}
                    </span>
                  </Heading>
                  <p className="mt-8 text-sm font-semibold">{slide.welcome}</p>
                  <p className="body-copy mt-2 max-w-xl">{slide.body}</p>
                  <div className="mt-auto flex flex-wrap gap-4 pt-8">
                    <Button route={slide.route} size="lg" variant="primary">
                      {ui[slide.action]}
                      <span className="sr-only">
                        {" "}
                        {routes[slide.route].label}
                      </span>
                    </Button>
                    <Button
                      href={`tel:${site.telephone}`}
                      size="lg"
                      variant="outline"
                      arrow={false}
                      className="border-brand-950/30 hover:bg-brand-50"
                    >
                      {ui.talk}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-8 flex items-center justify-between gap-3 border-t border-brand-950/15 pt-5">
            <div
              className="flex items-center"
              aria-label={ui.carousel.navigation}
            >
              {slides.map((slide, index) => (
                <button
                  key={slide.title}
                  type="button"
                  aria-label={`${ui.carousel.goTo} ${index + 1}`}
                  aria-current={index === active ? "true" : undefined}
                  onClick={() => setActive(index)}
                  className="flex h-11 w-11 items-center justify-center rounded-full"
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "h-1.5 w-6 rounded-full border border-brand-700 transition-colors motion-reduce:transition-none",
                      index === active ? "bg-brand-700" : "bg-transparent",
                    )}
                  />
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                aria-label={ui.carousel.previous}
                onClick={() => move(-1)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-950/25 bg-white transition-colors hover:border-brand-700 hover:bg-brand-50"
              >
                <ArrowLeft size={19} aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label={ui.carousel.next}
                onClick={() => move(1)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-950/25 bg-white transition-colors hover:border-brand-700 hover:bg-brand-50"
              >
                <ArrowRight size={19} aria-hidden="true" />
              </button>
            </div>
          </div>
          <p className="sr-only" aria-live="polite" aria-atomic="true">
            {ui.carousel.slide} {active + 1} {ui.carousel.of} {slides.length}:{" "}
            {slides[active].title}
          </p>
        </div>
      </Container>
    </section>
  );
}
