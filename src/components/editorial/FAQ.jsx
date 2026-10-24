"use client";

import { Plus } from "lucide-react";
import { faq } from "@/content/faq";
import { site } from "@/content/site";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import Button from "./Button";

export default function FAQ() {
  return (
    <section
      id="faq"
      aria-label={faq.title}
      className="section border-t border-line/60 bg-white"
    >
      <div className="shell">
        <SectionHeading
          prominent
          eyebrow={faq.eyebrow}
          title={faq.title}
          lede={faq.description}
        />
        <div className="mt-9 grid items-start gap-7 sm:mt-12 lg:grid-cols-[1.65fr_0.85fr] lg:gap-9">
          <div className="space-y-3">
            {faq.items.map((item, index) => (
              <details
                name="boldfuse-faq"
                open={index === 0}
                key={item.question}
                onPointerEnter={(event) => {
                  if (event.pointerType === "mouse") {
                    event.currentTarget.open = true;
                  }
                }}
                className="group overflow-hidden rounded-2xl border border-line bg-white open:border-accent/50"
              >
                <summary className="flex min-h-16 list-none items-center justify-between gap-5 px-5 py-5 focus-visible:outline-offset-[-4px] sm:px-6">
                  <span className="font-heading text-base leading-relaxed font-bold text-forest sm:text-[1.0625rem]">
                    {item.question}
                  </span>
                  <Plus
                    size={18}
                    strokeWidth={1.8}
                    aria-hidden="true"
                    className="shrink-0 text-accent-ink group-open:rotate-45"
                  />
                </summary>
                <div className="px-5 pb-6 sm:px-6">
                  <p className="font-description text-[0.9375rem] leading-[1.8] text-muted">
                    {item.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>
          <Reveal className="relative isolate overflow-hidden rounded-3xl border border-forest-soft bg-forest p-7 text-white sm:p-8">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_0%_0%,rgba(2,170,119,0.3),transparent_70%)]"
            >
              <svg
                viewBox="0 0 400 420"
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full text-accent-soft"
                fill="none"
              >
                <path
                  d="M80 450C240 430 200 270 340 295S435 180 470 120"
                  stroke="currentColor"
                  opacity="0.16"
                />
                <path
                  d="M140 460C290 440 270 330 385 350S470 255 495 200"
                  stroke="currentColor"
                  opacity="0.1"
                />
              </svg>
            </div>
            <h3 className="text-2xl leading-tight text-white">
              Still have a question?
            </h3>
            <p className="mt-4 font-description text-base leading-relaxed text-white/80">
              Tell us what you are working on. Let’s find a practical way
              forward for your business.
            </p>
            <div className="mt-7">
              <Button href={`tel:${site.telephone}`} variant="light">
                Talk to our team
              </Button>
            </div>
            <div className="mt-7 flex flex-col items-start gap-3 border-t border-white/15 pt-6 font-description text-base text-white/90">
              <a
                href={`tel:${site.telephone}`}
                className="py-1 hover:text-accent-soft"
              >
                {site.phone}
              </a>
              <a
                href={`mailto:${site.email}`}
                className="py-1 underline decoration-white/30 underline-offset-4 hover:text-accent-soft"
              >
                {site.email}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
