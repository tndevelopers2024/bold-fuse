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
                      className="flex h-24 w-36 shrink-0 items-center justify-center rounded-2xl border border-line/80 bg-white p-4 sm:h-28 sm:w-44 sm:p-5"
                    >
                      <Image
                        src={client.image}
                        alt={duplicate ? "" : client.name}
                        sizes="112px"
                        className="h-12 w-28 max-w-full object-contain sm:h-14"
                      />
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 2. Testimonials: All 4 Cards in the Same Row on Desktop */}
      <div
        id="testimonials"
        className="mt-8 sm:mt-10 lg:mt-12"
        aria-label="Client testimonials"
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3.5 lg:grid-cols-4 lg:gap-3.5">
          {quotes.map((quote) => (
            <figure
              key={quote.name}
              className="flex flex-col justify-between rounded-xl border border-line/80 bg-white p-3 shadow-xs transition-colors duration-200 hover:border-accent/40 sm:rounded-2xl sm:p-3.5"
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
                  {quote.name}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}
