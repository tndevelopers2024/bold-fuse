"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export default function ServiceCard({ service, featured = false }) {
  return (
    <article
      className={`service-card relative isolate flex h-full flex-col overflow-hidden rounded-[1.5rem] border p-5 ${featured ? "service-card-featured border-forest bg-forest text-white" : "border-line/80 bg-white text-forest"}`}
    >
      {service.image && (
        <div className="service-card-image relative -mx-2 -mt-2 mb-5 overflow-hidden rounded-2xl">
          <Image
            src={service.image}
            alt={service.imageAlt}
            sizes={
              featured
                ? "(min-width:1024px) 520px, (min-width:640px) 90vw, 85vw"
                : "(min-width:1280px) 370px, (min-width:1024px) 30vw, (min-width:640px) 45vw, 85vw"
            }
            className="aspect-[4/3] w-full object-cover"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest/35 via-transparent to-transparent"
          />
        </div>
      )}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 -z-10 ${featured ? "bg-[radial-gradient(ellipse_at_0%_0%,rgba(2,170,119,0.28),transparent_65%)]" : "bg-[radial-gradient(ellipse_at_100%_100%,rgba(169,233,217,0.17),transparent_65%)]"}`}
      >
        <svg
          viewBox="0 0 500 320"
          preserveAspectRatio="none"
          className="absolute right-0 bottom-0 h-48 w-full text-accent"
          fill="none"
        >
          <path
            d="M150 340C310 310 260 180 410 205S490 120 540 70"
            stroke="currentColor"
            opacity={featured ? "0.23" : "0.1"}
          />
          <path
            d="M210 350C350 310 320 225 450 250S530 170 560 130"
            stroke="currentColor"
            opacity={featured ? "0.16" : "0.07"}
          />
        </svg>
      </div>
      <div className="service-card-heading">
        <h3
          className={`text-xl leading-[1.25] tracking-[-0.025em] ${featured ? "text-white" : "text-forest"}`}
        >
          {service.title}
        </h3>
      </div>
      <div className="service-card-copy mt-3 flex grow flex-col">
        <p
          className={`font-description text-sm leading-[1.65] ${featured ? "text-white/80" : "text-muted"}`}
        >
          {service.summary}
        </p>
      </div>
      <div
        className={`service-card-action mt-3 border-t pt-2 ${featured ? "border-white/15" : "border-line/70"}`}
      >
        <Link
          data-button
          href={service.path}
          className={`inline-flex min-h-11 items-center gap-3 text-sm font-semibold ${featured ? "text-white hover:text-accent-soft" : "text-forest hover:text-accent-ink"}`}
        >
          Explore service<span className="sr-only">: {service.title}</span>
          <ArrowUpRight size={18} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
