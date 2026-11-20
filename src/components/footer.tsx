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
  "inline-flex min-h-9 items-center gap-2 py-1 text-sm leading-relaxed font-medium text-white/75 hover:text-accent-soft";
const titleClass =
  "mb-3 text-xs font-semibold tracking-[0.2em] text-accent-soft uppercase";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t-2 border-accent/30 bg-forest-surface text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-forest-soft/25 to-transparent"
      />
      <div className="shell relative">
        <div className="grid items-start gap-x-8 gap-y-8 pt-10 pb-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-[1.2fr_1.1fr_0.7fr_1.1fr] lg:pt-12">
          <div className="min-w-0 sm:col-span-2 md:col-span-3 lg:col-span-1">
            <AppLink route="home" className="inline-block max-w-full">
              <Image
                src={headerLogo}
                alt={site.name}
                width={208}
                height={59}
                sizes="256px"
                className="h-auto w-64 max-w-full brightness-0 invert"
              />
            </AppLink>
            <p className="mt-3 max-w-sm font-display text-xl leading-snug font-medium text-white">
              {site.tagline}
            </p>
            <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-xs font-semibold tracking-wider text-accent-soft uppercase">
                {home.experience.missionTitle}
              </p>
              <p className="mt-2 font-description text-sm leading-relaxed font-medium text-white/75">
                {home.experience.mission}
              </p>
            </div>
          </div>
          <nav aria-label={footerContent.services} className="min-w-0">
            <h2 className={titleClass}>{footerContent.services}</h2>
            <ul className="space-y-1">
              {serviceNavigation.map((key) => (
                <li key={key}>
                  <AppLink route={key} className={linkClass}>
                    {routes[key].label}
                  </AppLink>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label={footerContent.company} className="min-w-0">
            <h2 className={titleClass}>{footerContent.company}</h2>
            <ul className="space-y-1">
              {navigation.map((key) => (
                <li key={key}>
                  <AppLink route={key} className={linkClass}>
                    {routes[key].label}
                  </AppLink>
                </li>
              ))}
            </ul>
            <h2 className={`${titleClass} mt-5`}>{site.otherBrands}</h2>
            <ul className="space-y-1">
              {footerContent.brands.map((brand) => (
                <li key={brand.route}>
                  <AppLink route={brand.route} className={linkClass}>
                    {brand.label}
                    <ArrowUpRight
                      size={14}
                      className="shrink-0"
                      aria-hidden="true"
                    />
                  </AppLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="min-w-0 sm:col-span-2 md:col-span-1">
            <h2 className={titleClass}>{site.reach}</h2>
            <div className="flex flex-col items-start gap-1">
              <a href={`tel:${site.telephone}`} className={linkClass}>
                <Phone size={17} className="shrink-0" aria-hidden="true" />
                {site.phone}
              </a>
              <a href={`mailto:${site.email}`} className={linkClass}>
                <Mail size={17} className="shrink-0" aria-hidden="true" />
                {site.email}
              </a>
              <address className="flex min-h-9 items-start gap-2 py-1 text-sm leading-relaxed font-medium text-white/75 not-italic">
                <MapPin
                  size={18}
                  className="mt-1 shrink-0"
                  aria-hidden="true"
                />
                {site.address}
              </address>
            </div>
            <h2 className={`${titleClass} mt-5`}>{site.socialTitle}</h2>
            <div className="flex flex-wrap gap-2">
              {site.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-1 rounded-full border border-white/20 px-2.5 text-xs font-medium hover:bg-white hover:text-forest"
                >
                  {s.label}
                  <ArrowUpRight size={12} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <nav
          aria-label={footerContent.explore}
          className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 sm:px-5"
        >
          <h2 className={titleClass}>{footerContent.explore}</h2>
          <div className="flex flex-wrap gap-x-6 gap-y-1">
            {footerContent.sections.map((s) => (
              <Link key={s.id} href={`/#${s.id}`} className={linkClass}>
                {s.label}
              </Link>
            ))}
          </div>
        </nav>
        <div className="mt-6 flex flex-col justify-between gap-2 border-t border-white/10 py-4 text-xs font-medium text-white/65 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <nav
            aria-label={footerContent.legal}
            className="flex flex-wrap gap-x-6 gap-y-1"
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
