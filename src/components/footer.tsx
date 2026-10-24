import Image from "next/image";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { assets } from "@/assets";
import { navigation, routes } from "@/config/routes";
import { site } from "@/content/site";
import { AppLink, Container } from "./ui";
export function Footer() {
  return (
    <footer className="bg-brand-950 pt-20 pb-7 text-white">
      <Container>
        <div className="grid gap-12 pb-16 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <AppLink route="home">
              <Image
                src={assets.footerLogo}
                alt={site.name}
                width={160}
                height={159}
                className="h-40 w-40 object-contain"
              />
            </AppLink>
            <p className="mt-5 max-w-xs font-display text-xl font-semibold">
              {site.tagline}
            </p>
          </div>
          <div className="lg:col-span-4">
            <h2 className="mb-6 text-lg font-semibold">{site.reach}</h2>
            <a
              className="mb-4 flex items-center gap-3 text-brand-200"
              href={`tel:${site.telephone}`}
            >
              <Phone size={17} aria-hidden="true" />
              {site.phone}
            </a>
            <a
              className="flex items-center gap-3 text-brand-200"
              href={`mailto:${site.email}`}
            >
              <Mail size={17} aria-hidden="true" />
              {site.email}
            </a>
            <address className="mt-6 max-w-64 text-base text-brand-200 not-italic">
              {site.address}
            </address>
            <h2 className="mt-8 mb-3 text-base font-semibold">
              {site.otherBrands}
            </h2>
            <p className="text-brand-200">{site.brands.join(" · ")}</p>
          </div>
          <div className="lg:col-span-2">
            <h2 className="mb-6 text-lg font-semibold">{site.quickLinks}</h2>
            <nav className="flex flex-col gap-3" aria-label={site.quickLinks}>
              {navigation.map((key) => (
                <AppLink
                  key={key}
                  route={key}
                  className="text-brand-200 hover:text-white"
                >
                  {routes[key].label}
                </AppLink>
              ))}
            </nav>
          </div>
          <div className="lg:col-span-2">
            <h2 className="mb-6 text-lg font-semibold">{site.socialTitle}</h2>
            <div className="flex flex-col gap-3">
              {site.socials.map((s) => (
                <a
                  href={s.href}
                  key={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-brand-200 hover:text-white"
                >
                  {s.label}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-5 border-t border-brand-200/20 pt-7 text-sm font-medium text-brand-200 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <div className="flex flex-wrap gap-6">
            <AppLink route="privacy">{routes.privacy.label}</AppLink>
            <AppLink route="terms">{routes.terms.label}</AppLink>
          </div>
        </div>
      </Container>
    </footer>
  );
}
