import Image from "next/image";
import { Quote } from "lucide-react";

export default function ClientLoops({ clients, quotes }) {
  const rows = Array.from({ length: 3 }, (_, row) =>
    clients.slice(
      Math.ceil((row * clients.length) / 3),
      Math.ceil(((row + 1) * clients.length) / 3),
    ),
  );

  return (
    <div className="mt-8 sm:mt-10 lg:mt-12">
      <div
        className="grid gap-3 sm:gap-4"
        role="group"
        aria-label="Our client logos"
      >
        {rows.map((row, index) => (
          <div
            key={index}
            tabIndex={0}
            role="region"
            aria-label={`Client logos row ${index + 1}`}
            className="min-w-0 overflow-hidden motion-reduce:overflow-x-auto focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <div
              className="animate-marquee"
              style={{ "--marquee-duration": ["24s", "28s", "26s"][index] }}
            >
              {[false, true].map((duplicate) => (
                <ul
                  key={String(duplicate)}
                  aria-hidden={duplicate || undefined}
                  className={`flex shrink-0 gap-3 pr-3 sm:gap-4 sm:pr-4 ${duplicate ? "motion-reduce:hidden" : ""}`}
                >
                  {row.map((client) => (
                    <li
                      key={client.name}
                      className="flex h-24 w-36 shrink-0 items-center justify-center rounded-2xl border border-line/80 bg-white p-2 sm:h-28 sm:w-44 sm:p-2.5"
                    >
                      <Image
                        src={client.image}
                        alt={duplicate ? "" : client.name}
                        sizes="(min-width: 640px) 156px, 128px"
                        className="h-20 w-full max-w-full object-contain sm:h-[92px]"
                      />
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div
        id="testimonials"
        className="client-loop mt-8 sm:mt-10 lg:mt-12 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        role="region"
        aria-label="Client testimonials"
        tabIndex={0}
      >
        <div className="client-loop-track testimonial-loop-track">
          {[false, true].map((duplicate) => (
          <div key={String(duplicate)} className="client-loop-group" aria-hidden={duplicate || undefined}>
          {quotes.map((quote, index) => (
            <figure
              key={`${quote.name}-${index}`}
              className="flex w-[min(320px,82vw)] shrink-0 flex-col justify-between rounded-xl border border-line/80 bg-white p-3 shadow-xs sm:rounded-2xl sm:p-3.5"
            >
              <div>
                <Quote
                  className="text-accent shrink-0"
                  size={16}
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <blockquote className="mt-2 font-description text-[11px] leading-relaxed font-medium text-forest sm:text-xs">
                  “{quote.text}”
                </blockquote>
              </div>
              <figcaption className="mt-3 flex items-center gap-1.5">
                <span className="h-0.5 w-3 bg-accent shrink-0" aria-hidden="true" />
                <span className="font-heading text-[10px] font-bold tracking-wider text-accent-ink uppercase sm:text-[11px]">
                  {quote.name}{quote.sample ? " · Sample review" : ""}
                </span>
              </figcaption>
            </figure>
          ))}
          </div>
          ))}
        </div>
      </div>
    </div>
  );
}
