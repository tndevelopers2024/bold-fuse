import type { HTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { routes, type RouteKey } from "@/config/routes";
export function Container({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mx-auto max-w-7xl px-5 sm:px-8", className)}
      {...props}
    />
  );
}
export function Section({
  id,
  tone = "white",
  className,
  children,
}: {
  id: string;
  tone?: "white" | "dark" | "bright";
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-20 md:py-28",
        tone === "white" && "bg-white text-brand-950",
        tone === "dark" && "bg-brand-950 text-white",
        tone === "bright" && "bg-brand-500 text-brand-950",
        className,
      )}
    >
      <Container>{children}</Container>
    </section>
  );
}
export function SectionHeading({
  eyebrow,
  title,
  lead,
  className,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-12 max-w-3xl", className)}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="text-4xl leading-tight font-bold tracking-tight md:text-5xl">
        {title}
      </h2>
      {lead && <p className="body-copy mt-6">{lead}</p>}
    </div>
  );
}
export function AppLink({
  route,
  children,
  className,
  onClick,
}: {
  route: RouteKey;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const r = routes[route];
  return (
    <Link
      href={r.path}
      prefetch={false}
      className={className}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
export function Button({
  route,
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  arrow = true,
}: {
  route?: RouteKey;
  href?: string;
  children: ReactNode;
  variant?: "primary" | "bright" | "outline";
  size?: "md" | "lg";
  className?: string;
  arrow?: boolean;
}) {
  const classes = cn(
    "site-button inline-flex min-h-12 items-center justify-center gap-5 rounded-full border text-base font-semibold",
    size === "lg" ? "px-7 py-4" : "px-6 py-3",
    variant === "primary" &&
      "border-brand-700 bg-brand-700 text-white hover:border-brand-800 hover:bg-brand-800",
    variant === "bright" &&
      "border-brand-500 bg-brand-500 text-brand-950 hover:border-brand-200 hover:bg-brand-200",
    variant === "outline" &&
      "border-current bg-transparent text-inherit hover:bg-brand-950/5",
    className,
  );
  const content = (
    <>
      {children}
      {arrow && (
        <ArrowUpRight size={19} strokeWidth={1.75} aria-hidden="true" />
      )}
    </>
  );
  return route ? (
    <AppLink route={route} className={classes}>
      {content}
    </AppLink>
  ) : (
    <a href={href} className={classes}>
      {content}
    </a>
  );
}
export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("rounded-3xl border border-brand-950/10", className)}
      {...props}
    />
  );
}
export function Badge({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-brand-950/15 px-3 py-1 text-sm font-medium",
        className,
      )}
      {...props}
    />
  );
}
