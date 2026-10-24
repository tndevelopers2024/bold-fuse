import Image from "next/image";
import { Quote } from "lucide-react";

export default function ClientLoops({ clients, quotes }) {
  const rows = [clients.slice(0, Math.ceil(clients.length / 2)), clients.slice(Math.ceil(clients.length / 2))];

  return (
    <div className="mt-10">
      <div className="space-y-4" aria-label="Our clients">
        {rows.map((row, index) => (
          <div className="client-loop" key={index}>
            <div className={`client-loop-track ${index === 1 ? "client-loop-reverse" : ""}`}>
              {[0, 1].map((copy) => (
                <div className="client-loop-group" key={copy} aria-hidden={copy === 1 ? true : undefined}>
                  {row.map((client) => (
                    <div key={client.name} className="flex h-28 w-44 shrink-0 items-center justify-center rounded-xl border border-line bg-white p-5 sm:w-52">
                      <Image src={client.image} alt={copy === 1 ? "" : client.name} sizes="170px" className="max-h-20 w-auto max-w-full object-contain" />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div id="testimonials" className="client-loop mt-10" aria-label="Client testimonials">
        <div className="client-loop-track testimonial-loop-track">
          {[0, 1].map((copy) => (
            <div className="client-loop-group" key={copy} aria-hidden={copy === 1 ? true : undefined}>
              {quotes.map((quote) => (
                <figure key={quote.name} className="testimonial-loop-card rounded-2xl border border-line bg-white p-7 sm:p-8">
                  <Quote className="text-accent" size={32} strokeWidth={1.3} aria-hidden="true" />
                  <blockquote className="mt-5 font-description text-lg leading-relaxed text-forest">“{quote.text}”</blockquote>
                  <figcaption className="eyebrow mt-7 flex items-center gap-3"><span className="h-px w-8 bg-accent" />{quote.name}</figcaption>
                </figure>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
