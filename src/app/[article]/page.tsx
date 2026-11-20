import CTA from "@/components/editorial/CTA";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Calendar, Clock, Tag, UserRound } from "lucide-react";
import {
  blogArticles,
  getArticleBySlug,
  getReadingTime,
} from "@/content/blogs";
import { routes } from "@/config/routes";
import { site } from "@/content/site";
import { siteUrl } from "@/config/site";

type Props = {
  params: Promise<{ article: string }>;
};

export function generateStaticParams() {
  return blogArticles.map((article) => ({ article: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { article: slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  const path = routes[article.route].path;
  const url = new URL(path, siteUrl).href;
  const image = new URL(article.image.src, siteUrl).href;

  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      url,
      title: article.title,
      description: article.excerpt,
      publishedTime: article.publishedISO,
      authors: [article.author],
      section: article.category,
      images: [
        {
          url: image,
          width: article.image.width,
          height: article.image.height,
          alt: article.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [{ url: image, alt: article.imageAlt }],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { article: slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const otherArticles = blogArticles.filter(
    (item) => item.slug !== article.slug,
  );
  const readingTime = getReadingTime(article);
  const articleUrl = new URL(routes[article.route].path, siteUrl).href;
  const imageUrl = new URL(article.image.src, siteUrl).href;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${articleUrl}#article`,
        headline: article.title,
        description: article.excerpt,
        image: [imageUrl],
        datePublished: article.publishedISO,
        dateModified: article.publishedISO,
        inLanguage: "en-IN",
        articleSection: article.category,
        author: {
          "@type": "Organization",
          name: article.author,
          url: siteUrl,
        },
        publisher: {
          "@type": "Organization",
          "@id": `${siteUrl}/#organization`,
          name: site.name,
          logo: {
            "@type": "ImageObject",
            url: new URL("/icon.png", siteUrl).href,
          },
        },
        mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${articleUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: new URL("/", siteUrl).href,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blogs",
            item: new URL("/blogs/", siteUrl).href,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: article.title,
            item: articleUrl,
          },
        ],
      },
    ],
  };

  return (
    <main id="main-content" className="bg-white">
      <div className="shell pt-8 pb-16 sm:pt-12 lg:pb-24">
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

          <Link
            href="/blogs/"
            className="inline-flex min-h-10 items-center gap-2 text-xs font-semibold tracking-[0.16em] text-accent-soft uppercase hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            <ArrowLeft size={15} aria-hidden="true" />
            Back to Blogs
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium tracking-[0.14em] text-white/80 uppercase">
            <span className="inline-flex items-center gap-1.5 text-accent-soft">
              <Tag size={14} aria-hidden="true" />
              {article.category}
            </span>
            <span aria-hidden="true" className="hidden text-white/35 lg:inline">
              •
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar size={14} aria-hidden="true" />
              <time dateTime={article.publishedISO}>{article.published}</time>
            </span>
            <span aria-hidden="true" className="hidden text-white/35 lg:inline">
              •
            </span>
            <span className="inline-flex items-center gap-1.5">
              <UserRound size={14} aria-hidden="true" />
              {article.author}
            </span>
            <span aria-hidden="true" className="hidden text-white/35 lg:inline">
              •
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock size={14} aria-hidden="true" />
              {readingTime} min read
            </span>
          </div>

          <h1 className="mt-4 max-w-4xl font-heading text-3xl leading-[1.2] font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {article.title}
          </h1>
        </section>

        <article className="mx-auto mt-10 max-w-4xl lg:mt-14">
          <div className="overflow-hidden rounded-3xl border border-line bg-white p-3">
            <Image
              src={article.image}
              alt={article.imageAlt}
              priority
              sizes="(min-width: 1024px) 896px, 92vw"
              className="aspect-[16/9] w-full rounded-2xl object-cover"
            />
          </div>

          {article.leadQuote && (
            <blockquote className="relative isolate mt-10 overflow-hidden rounded-2xl border border-line bg-white p-6 sm:p-8">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_100%_100%,rgba(169,233,217,0.25),transparent_65%)]"
              />
              <p className="font-heading text-xl leading-snug font-bold text-forest sm:text-2xl">
                {article.leadQuote}
              </p>
            </blockquote>
          )}

          <div className="mt-8 space-y-10">
            {article.sections.map((section, idx) => (
              <section key={section.heading ?? idx} className="space-y-4">
                {section.heading && (
                  <h2 className="font-heading text-2xl leading-snug font-bold text-forest sm:text-[1.75rem]">
                    {section.heading}
                  </h2>
                )}
                {section.paragraphs.map((paragraph, pIdx) => (
                  <p
                    key={pIdx}
                    className="font-description text-base leading-[1.85] font-medium text-muted sm:text-[1.0625rem]"
                  >
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </article>

        {otherArticles.length > 0 && (
          <section
            aria-labelledby="more-articles-heading"
            className="mx-auto mt-16 max-w-4xl border-t border-line pt-12 lg:mt-20"
          >
            <p className="text-xs font-semibold tracking-[0.2em] text-accent-ink uppercase">
              Continue reading
            </p>
            <h2
              id="more-articles-heading"
              className="mt-2 font-heading text-2xl font-bold text-forest sm:text-3xl"
            >
              More from our blog
            </h2>
            <div
              className={`mt-6 grid gap-6 ${
                otherArticles.length > 1 ? "sm:grid-cols-2" : ""
              }`}
            >
              {otherArticles.map((post) => (
                <Link
                  key={post.slug}
                  href={routes[post.route].path}
                  className="group relative isolate flex flex-col justify-between overflow-hidden rounded-2xl border border-line bg-white p-6 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest"
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_100%_100%,rgba(169,233,217,0.22),transparent_65%)]"
                  />
                  <div>
                    <p className="text-xs font-semibold tracking-[0.16em] text-accent-ink uppercase">
                      {post.category}
                    </p>
                    <h3 className="mt-3 font-heading text-xl leading-snug font-bold text-forest group-hover:underline">
                      {post.title}
                    </h3>
                    <p className="mt-3 font-description text-sm leading-relaxed font-medium text-muted">
                      {post.excerpt}
                    </p>
                  </div>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-forest">
                    Read article <ArrowUpRight size={16} aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <CTA contained />
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
    </main>
  );
}
