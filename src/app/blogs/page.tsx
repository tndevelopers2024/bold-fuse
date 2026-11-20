import CTA from "@/components/editorial/CTA";
import { pageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import { blogArticles, getReadingTime } from "@/content/blogs";
import { routes } from "@/config/routes";

export const metadata: Metadata = pageMetadata({
  title: "Blogs",
  description:
    "Explore Boldfuse articles on workplace culture, mental health and business growth.",
  alternates: { canonical: "/blogs/" },
});

export default function BlogsPage() {
  return (
    <main id="main-content" className="bg-white">
      <div className="shell pt-8 pb-0 sm:pt-12">
        <section className="page-hero relative isolate overflow-hidden rounded-3xl bg-forest-surface px-6 text-white sm:px-12 lg:px-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_0%_0%,rgba(2,170,119,0.28),transparent_55%),radial-gradient(ellipse_at_100%_100%,rgba(97,198,168,0.18),transparent_50%)]"
          >
            <svg
              viewBox="0 0 1200 400"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full text-accent-soft"
              fill="none"
            >
              <path
                d="M620 440C830 400 800 230 1000 255S1170 110 1260 50M710 440C900 410 850 295 1050 315S1210 180 1260 140"
                stroke="currentColor"
                strokeWidth="1"
                opacity=".16"
              />
            </svg>
          </div>
          <p className="text-xs font-semibold tracking-[0.2em] text-accent-soft uppercase">
            From our blog
          </p>
          <h1 className="mt-5 max-w-3xl font-heading text-4xl leading-tight font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Blogs
          </h1>
          <p className="mt-5 max-w-xl font-description text-lg leading-relaxed text-white/80">
            Ideas and perspectives on people, wellbeing and the challenges of
            building a stronger business.
          </p>
        </section>
        <section className="pt-16 lg:pt-24" aria-labelledby="articles-heading">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#dbe9e1] pb-7">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] text-accent-ink uppercase">
                From our blog
              </p>
              <h2
                id="articles-heading"
                className="mt-3 font-heading text-3xl font-bold tracking-tight text-forest sm:text-4xl"
              >
                Keeping Up with Boldfuse
              </h2>
            </div>
            <p className="max-w-sm font-description leading-relaxed text-muted">
              Explore ideas to support your people and move your business
              forward.
            </p>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:gap-8">
            {blogArticles.map((post) => (
              <article
                key={post.slug}
                className="overflow-hidden rounded-3xl border border-line bg-white"
              >
                <Link
                  href={routes[post.route].path}
                  className="group flex h-full flex-col focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-forest"
                >
                  {/* Image Frame */}
                  <div className="border-b border-line rounded-b-3xl p-3.5 sm:p-4">
                    <Image
                      src={post.image}
                      alt={post.imageAlt}
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="aspect-[16/10] w-full rounded-2xl object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6 sm:p-8">
                    <div className="flex flex-wrap items-center gap-3 text-xs font-semibold tracking-[0.16em] text-accent-ink uppercase">
                      <span>{post.category}</span>
                      <span
                        aria-hidden="true"
                        className="hidden text-muted/40 lg:inline"
                      >
                        •
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-muted">
                        <Calendar size={13} aria-hidden="true" />
                        <time dateTime={post.publishedISO}>
                          {post.published}
                        </time>
                      </span>
                      <span
                        aria-hidden="true"
                        className="hidden text-muted/40 lg:inline"
                      >
                        •
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-muted">
                        <Clock size={13} aria-hidden="true" />
                        {getReadingTime(post)} min read
                      </span>
                    </div>
                    <h3 className="mt-4 font-heading text-2xl leading-snug font-bold text-forest group-hover:underline">
                      {post.title}
                    </h3>
                    <p className="mt-4 font-description leading-relaxed font-medium text-muted">
                      {post.excerpt}
                    </p>
                    <span className="mt-auto inline-flex items-center gap-2 pt-7 text-sm font-semibold text-forest">
                      Read article <ArrowUpRight size={17} aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>
        <CTA contained />
      </div>
    </main>
  );
}
