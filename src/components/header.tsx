"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import headerLogo from "@/assets/headerLogo.png";
import { navigation, routes, serviceNavigation } from "@/config/routes";
import { site } from "@/content/site";
import { ui } from "@/content/ui";
import { cn } from "@/lib/cn";
import { AppLink, Container } from "./ui";
export function Header() {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const dropdown = useRef<HTMLDetailsElement>(null);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 8);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  const close = () => {
    dialog.current?.close();
    document.documentElement.classList.remove("menu-open");
    trigger.current?.focus();
  };
  useEffect(
    () => () => document.documentElement.classList.remove("menu-open"),
    [],
  );
  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b bg-white",
        scrolled ? "border-brand-950/10" : "border-white",
      )}
    >
      <Container className="flex h-24 items-center justify-between gap-5">
        <AppLink route="home" className="shrink-0">
          <Image
            src={headerLogo}
            alt={site.name}
            sizes="(min-width: 640px) 240px, 192px"
            width={235}
            height={66}
            className="h-auto w-48 sm:w-60"
          />
        </AppLink>
        <nav aria-label={ui.menu} className="hidden items-center gap-7 lg:flex">
          {navigation.map((key) =>
            key === "services" ? (
              <details
                key={key}
                ref={dropdown}
                className="relative"
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    dropdown.current?.removeAttribute("open");
                    dropdown.current?.querySelector("summary")?.focus();
                  }
                }}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget))
                    dropdown.current?.removeAttribute("open");
                }}
              >
                <summary className="flex min-h-12 list-none items-center gap-2 text-sm font-semibold">
                  {routes[key].label}
                  <ChevronDown size={15} aria-hidden="true" />
                </summary>
                <div className="absolute top-full -left-6 w-80 rounded-2xl border border-brand-950/15 bg-white p-3">
                  <AppLink
                    route="services"
                    className="block rounded-lg px-3 py-3 text-sm font-semibold"
                    onClick={() => dropdown.current?.removeAttribute("open")}
                  >
                    {routes.services.label}
                  </AppLink>
                  {serviceNavigation.map((route) => (
                    <AppLink
                      key={route}
                      route={route}
                      className="block rounded-lg px-3 py-3 text-sm font-medium hover:bg-brand-50"
                      onClick={() => dropdown.current?.removeAttribute("open")}
                    >
                      {routes[route].label}
                    </AppLink>
                  ))}
                </div>
              </details>
            ) : (
              <AppLink
                key={key}
                route={key}
                className="flex min-h-12 items-center text-sm font-semibold hover:text-brand-700"
              >
                {routes[key].label}
              </AppLink>
            ),
          )}
        </nav>
        <a
          href={`tel:${site.telephone}`}
          className="hidden items-center gap-3 text-sm font-semibold xl:flex"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-950/15">
            <Phone size={18} aria-hidden="true" />
          </span>
          {ui.talk}
        </a>
        <button
          ref={trigger}
          type="button"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-brand-950/15 lg:hidden"
          aria-label={ui.openMenu}
          aria-haspopup="dialog"
          onClick={() => {
            dialog.current?.showModal();
            document.documentElement.classList.add("menu-open");
          }}
        >
          <Menu size={24} />
        </button>
      </Container>
      <dialog
        ref={dialog}
        aria-label={ui.menu}
        onKeyDown={(event) => {
          if (event.key !== "Tab") return;
          const elements = [
            ...event.currentTarget.querySelectorAll<HTMLElement>(
              'a[href],button,summary,[tabindex="0"]',
            ),
          ].filter((el) => el.getClientRects().length > 0);
          const first = elements[0];
          const last = elements.at(-1);
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
        }}
        onClose={close}
        className="fixed inset-0 m-0 h-dvh w-screen bg-white p-0 text-brand-950"
      >
        <Container className="flex min-h-full flex-col pb-10">
          <div className="flex h-24 shrink-0 items-center justify-between">
            <Image
              src={headerLogo}
              alt={site.name}
              sizes="210px"
              width={210}
              height={59}
            />
            <button
              type="button"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-brand-950/15"
              aria-label={ui.closeMenu}
              onClick={close}
            >
              <X />
            </button>
          </div>
          <nav aria-label={ui.menu} className="flex flex-col py-8">
            {navigation.map((key) =>
              key === "services" ? (
                <details
                  key={key}
                  className="border-b border-brand-950/10 py-4"
                >
                  <summary className="flex list-none items-center justify-between font-display text-3xl font-semibold">
                    {routes[key].label}
                    <ChevronDown />
                  </summary>
                  <div className="flex flex-col gap-1 pt-5">
                    {["services", ...serviceNavigation].map((route) => (
                      <AppLink
                        key={route}
                        route={route as "services"}
                        className="py-3 text-base font-medium"
                        onClick={close}
                      >
                        {routes[route as "services"].label}
                      </AppLink>
                    ))}
                  </div>
                </details>
              ) : (
                <AppLink
                  key={key}
                  route={key}
                  className="border-b border-brand-950/10 py-4 font-display text-3xl font-semibold"
                  onClick={close}
                >
                  {routes[key].label}
                </AppLink>
              ),
            )}
          </nav>
          <a
            href={`tel:${site.telephone}`}
            className="mt-auto pt-8 text-lg font-semibold"
          >
            {ui.talk}
            <span className="mt-2 block font-normal">{site.phone}</span>
          </a>
        </Container>
      </dialog>
    </header>
  );
}
