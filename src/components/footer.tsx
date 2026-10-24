import Image from "next/image";
import Link from "next/link";
import { ArrowUp, ArrowUpRight, Phone, Mail, MapPin } from "lucide-react";
import headerLogo from "@/assets/headerLogo.png";
import { site } from "@/content/site";
import { home } from "@/content/home";
import { footerContent } from "@/content/footer";
import { navigation, routes, serviceNavigation } from "@/config/routes";
import { AppLink } from "./ui";

const linkClass =
  "inline-flex min-h-9 items-center gap-2 text-sm leading-relaxed text-white/75 transition-colors hover:text-accent-soft";
const titleClass =
  "mb-5 text-xs font-semibold tracking-[0.2em] text-accent-soft uppercase";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t-2 border-accent/30 bg-[#091d17] text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-forest-soft/25 to-transparent"
      />
      <div className="shell relative">
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:py-16">
          <div className="lg:col-span-4">
            <AppLink route="home" className="inline-block max-w-full">
              <Image
                src={headerLogo}
                alt={site.name}
                width={208}
                height={59}
                sizes="(min-width: 640px) 320px, 280px"
                className="h-auto w-[280px] max-w-full brightness-0 invert sm:w-80"
              />
            </AppLink>
            <p className="mt-5 max-w-sm font-display text-2xl leading-snug text-white">
              {site.tagline}
            </p>
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-xs tracking-wider text-accent-soft uppercase">
                {home.experience.missionTitle}
              </p>
              <p className="mt-3 font-description text-sm leading-relaxed text-white/75">
                {home.experience.mission}
              </p>
            </div>
            <p className="mt-6 text-xs tracking-[0.18em] text-accent-soft uppercase">
              {site.socialTitle}
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              {site.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-1 rounded-full border border-white/20 px-3 text-xs hover:bg-white hover:text-forest"
                >
                  {s.label}
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          <nav aria-label={footerContent.services} className="lg:col-span-3">
            <h2 className={titleClass}>{footerContent.services}</h2>
            <ul className="space-y-2">
              {serviceNavigation.map((key) => (
                <li key={key}>
                  <AppLink route={key} className={linkClass}>
                    {routes[key].label}
                  </AppLink>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label={footerContent.company} className="lg:col-span-2">
            <h2 className={titleClass}>{footerContent.company}</h2>
            <ul className="space-y-2">
              {navigation.map((key) => (
                <li key={key}>
                  <AppLink route={key} className={linkClass}>
                    {routes[key].label}
                  </AppLink>
                </li>
              ))}
            </ul>
            <h2 className={`${titleClass} mt-7`}>{site.otherBrands}</h2>
            {footerContent.brands.map((brand) => (
              <AppLink
                key={brand.route}
                route={brand.route}
                className={linkClass}
              >
                {brand.label}
                <ArrowUpRight size={14} aria-hidden="true" />
              </AppLink>
            ))}
          </nav>
          <div className="lg:col-span-3">
            <h2 className={titleClass}>{site.reach}</h2>
            <div className="flex flex-col items-start gap-4">
              <a href={`tel:${site.telephone}`} className={linkClass}>
                <Phone size={17} aria-hidden="true" />
                {site.phone}
              </a>
              <a href={`mailto:${site.email}`} className={linkClass}>
                <Mail size={17} aria-hidden="true" />
                {site.email}
              </a>
              <address className="flex items-start gap-3 text-sm leading-relaxed text-white/75 not-italic">
                <MapPin
                  size={18}
                  className="mt-1 shrink-0"
                  aria-hidden="true"
                />
                {site.address}
              </address>
            </div>
          </div>
        </div>
        <nav
          aria-label={footerContent.explore}
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
        >
          <h2 className={titleClass}>{footerContent.explore}</h2>
          <div className="flex flex-wrap gap-x-7 gap-y-2">
            {footerContent.sections.map((s) => (
              <Link key={s.id} href={`/#${s.id}`} className={linkClass}>
                {s.label}
              </Link>
            ))}
          </div>
        </nav>
        <nav
          aria-label={footerContent.resources}
          className="mt-6 rounded-xl border border-white/10 p-6"
        >
          <h2 className={titleClass}>{footerContent.resources}</h2>
          <div className="grid gap-5 md:grid-cols-2">
            {footerContent.articles.map((key) => (
              <AppLink key={key} route={key} className={linkClass}>
                {routes[key].label}
                <ArrowUpRight
                  size={17}
                  className="shrink-0"
                  aria-hidden="true"
                />
              </AppLink>
            ))}
          </div>
        </nav>
        <div className="mt-8 flex flex-col justify-between gap-4 border-t border-white/10 py-6 text-xs text-white/65 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <nav
            aria-label={footerContent.legal}
            className="flex flex-wrap gap-6"
          >
            <AppLink route="privacy" className={linkClass}>
              {routes.privacy.label}
            </AppLink>
            <AppLink route="terms" className={linkClass}>
              {routes.terms.label}
            </AppLink>
            <a href="#main-content" className={linkClass}>
              {footerContent.backToTop}
              <ArrowUp size={16} aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
