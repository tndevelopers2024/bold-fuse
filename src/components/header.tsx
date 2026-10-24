"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import headerLogo from "@/assets/headerLogo.png";
import { navigation, routes, serviceNavigation } from "@/config/routes";
import { site } from "@/content/site";
import { ui } from "@/content/ui";
import { cn } from "@/lib/cn";
import { AppLink, Container } from "./ui";
export function Header() {
  const pathname = usePathname();
  const isHome = pathname === routes.home.path;
  const header = useRef<HTMLElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const dropdown = useRef<HTMLDetailsElement>(null);
  const [pastBanner, setPastBanner] = useState(false);
  const transparent = isHome && !pastBanner;
  useEffect(() => {
    const update = () => {
      setPastBanner(window.scrollY > 25);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);
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
      ref={header}
      className={cn(
        "top-0 z-40 pt-2 transition-all duration-300 motion-reduce:transition-none sm:pt-2.5",
        isHome ? "fixed inset-x-0" : "sticky",
        transparent
          ? "bg-transparent px-5 text-white sm:px-8 lg:px-10"
          : "px-3 text-forest sm:px-6",
      )}
    >
      <Container
        className={cn(
          "flex w-full items-center justify-between gap-5 border transition-all duration-300 motion-reduce:transition-none",
          transparent
            ? "h-16 max-w-full rounded-none border-transparent bg-transparent px-0 sm:px-0 md:h-18"
            : "h-14 max-w-6xl rounded-full border-line/70 bg-white/95 pr-3 pl-5 shadow-[0_12px_36px_-6px_rgba(23,63,53,0.18)] backdrop-blur-md sm:pr-4 sm:pl-8",
        )}
      >
        <AppLink route="home" className="shrink-0">
          <Image
            src={headerLogo}
            alt={site.name}
            sizes="(min-width: 768px) 208px, 176px"
            width={208}
            height={59}
            className={cn(
              "h-auto w-32 md:w-40",
              transparent && "brightness-0 invert",
            )}
          />
        </AppLink>
        <nav aria-label={ui.menu} className="hidden items-center gap-7 lg:flex">
          {navigation.map((key) =>
            key === "services" ? (
              <details
                key={key}
                ref={dropdown}
                className="relative"
                onPointerEnter={(event) => {
                  if (event.pointerType === "mouse")
                    event.currentTarget.open = true;
                }}
                onPointerLeave={(event) => {
                  if (
                    event.pointerType === "mouse" &&
                    !event.currentTarget.contains(document.activeElement)
                  )
                    event.currentTarget.open = false;
                }}
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
                <summary className="flex min-h-12 list-none items-center gap-2 text-[13px] font-semibold">
                  {routes[key].label}
                  <ChevronDown size={15} aria-hidden="true" />
                </summary>
                <div className="absolute top-full -left-6 w-80 rounded-2xl border border-brand-950/15 bg-white p-3 text-brand-950">
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
                className="flex min-h-12 items-center text-[13px] font-medium decoration-accent underline-offset-8 hover:underline"
              >
                {routes[key].label}
              </AppLink>
            ),
          )}
        </nav>
        <a
          data-button
          href={`tel:${site.telephone}`}
          className={cn(
            "hidden min-h-9 items-center justify-center rounded-full px-5 text-xs font-medium tracking-wider uppercase xl:flex",
            transparent ? "bg-white text-forest" : "bg-forest text-white",
          )}
        >
          {ui.talk}
        </a>
        <button
          ref={trigger}
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-current/30 lg:hidden"
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
        className="fixed inset-x-3 top-2 bottom-auto m-0 max-h-[calc(100dvh-1rem)] w-[calc(100%-1.5rem)] overflow-y-auto rounded-2xl border border-line bg-white p-0 text-forest shadow-2xl backdrop:bg-forest/25"
      >
        <Container className="flex flex-col pb-7">
          <div className="flex h-16 shrink-0 items-center justify-between md:h-18">
            <Image
              src={headerLogo}
              alt={site.name}
              sizes="(min-width: 768px) 208px, 176px"
              width={208}
              height={59}
              className="h-auto w-36 md:w-44"
            />
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-950/15"
              aria-label={ui.closeMenu}
              onClick={close}
            >
              <X />
            </button>
          </div>
          <nav aria-label={ui.menu} className="flex flex-col py-3">
            {navigation.map((key) =>
              key === "services" ? (
                <details
                  key={key}
                  className="border-b border-brand-950/10 py-4"
                >
                  <summary className="flex list-none items-center justify-between font-display text-lg font-medium">
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
                  className="border-b border-brand-950/10 py-4 font-display text-lg font-medium"
                  onClick={close}
                >
                  {routes[key].label}
                </AppLink>
              ),
            )}
          </nav>
          <a
            href={`tel:${site.telephone}`}
            className="mt-3 rounded-xl bg-cream p-4 text-sm font-medium"
          >
            {ui.talk}
            <span className="mt-2 block font-medium">{site.phone}</span>
          </a>
        </Container>
      </dialog>
    </header>
  );
}
