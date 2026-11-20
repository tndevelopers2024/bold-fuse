import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container, Button } from "@/components/ui";
import { ui } from "@/content/ui";
import { site } from "@/content/site";
import { routes } from "@/config/routes";
export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};
export default function NotFound() {
  return (
    <main id="main-content" className="py-16 md:py-24">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div
            aria-hidden="true"
            className="relative border-b border-brand-950/15 pb-10 font-display text-[8rem] leading-none font-extrabold tracking-tighter text-brand-950 sm:text-[13rem] lg:border-r lg:border-b-0 lg:pb-0"
          >
            4<span className="text-brand-700">0</span>4
            <span className="absolute bottom-0 left-0 h-3 w-20 rounded-full bg-brand-500 lg:-bottom-7" />
          </div>
          <div>
            <p className="eyebrow text-brand-700">{ui.notFound.eyebrow}</p>
            <h1 className="text-4xl leading-tight font-bold tracking-tight md:text-5xl">
              {ui.notFound.title}
            </h1>
            <p className="body-copy mt-6 text-sage-700">{ui.notFound.body}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button route="home">{ui.home}</Button>
              <Button href={`tel:${site.telephone}`} variant="outline">
                {ui.talk}
              </Button>
            </div>
            <a
              className="mt-6 inline-block font-medium text-brand-700 underline underline-offset-4"
              href={`mailto:${site.email}`}
            >
              {site.email}
            </a>
          </div>
        </div>
        <div className="mt-20 border-t border-brand-950/15 pt-8">
          <h2 className="mb-6 text-xl font-semibold">{ui.notFound.explore}</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {ui.notFound.jumps.map((jump) => (
              <Link
                key={jump.id}
                href={`${routes.home.path}#${jump.id}`}
                className="flex items-center justify-between rounded-2xl border border-brand-950/15 p-5 font-medium hover:border-brand-700"
              >
                {jump.label}
                <ArrowUpRight size={20} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </main>
  );
}
