"use client";
const primary = ["People", "Process", "Productivity", "Growth"];
const secondary = ["Assess", "Strategize", "Execute", "We grow when you grow"];

/**
 * Editorial ticker directly under the hero banner: large display words alternating solid
 * and outlined, over a quieter line running the other way. Decorative only —
 * the words repeat ideas stated elsewhere on the page.
 */
export default function BrandTicker() {
  const row = (words, reverse, big) => (
    <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div
        className={`${reverse ? "animate-marquee-reverse" : "animate-marquee"} items-center`}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {[...words, ...words].map((word, i) => (
              <span key={`${word}-${i}`} className="flex shrink-0 items-center">
                <span
                  className={
                    big
                      ? `px-6 font-display text-[3rem] leading-none font-semibold tracking-[-0.02em] whitespace-nowrap sm:px-10 sm:text-[4.5rem] lg:text-[5.5rem] ${
                          i % 2 === 0
                            ? "text-forest"
                            : "text-transparent [-webkit-text-stroke:1px_#02aa77]"
                        }`
                      : "px-5 text-[0.75rem] font-medium tracking-[0.28em] whitespace-nowrap text-muted uppercase sm:px-8"
                  }
                >
                  {word}
                </span>
                <span
                  className={`inline-block rotate-45 border border-accent ${big ? "h-2.5 w-2.5 bg-accent/30" : "h-1.5 w-1.5"}`}
                />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section
      aria-hidden="true"
      className="overflow-hidden border-b border-line bg-ivory py-5 sm:py-6 lg:py-7"
    >
      {row(primary, false, true)}
      <div className="mt-3 sm:mt-4">{row(secondary, true, false)}</div>
    </section>
  );
}
