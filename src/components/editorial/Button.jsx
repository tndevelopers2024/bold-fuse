"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const base =
  "group relative inline-flex items-center justify-center gap-2.5 rounded-full text-[0.8125rem] font-medium tracking-[0.06em] uppercase aria-disabled:pointer-events-none aria-disabled:opacity-60 disabled:pointer-events-none disabled:opacity-60";

const sizes = {
  md: "px-6 py-3.5",
  sm: "px-5 py-3 text-[0.75rem]",
};

// `light`/`outlineLight` are only ever used on the dark hero photo or the
// forest CTA card, so their focus ring is swapped to accent-soft — the default
// forest ring is close to invisible against a forest-toned backdrop (7.8:1 on
// forest per the palette notes, vs. an unreadable ~1:1 for forest-on-forest).
const variants = {
  primary:
    "bg-forest text-ivory hover:bg-forest-soft focus-visible:outline-forest",
  secondary:
    "border border-forest/40 bg-transparent text-forest hover:border-forest/60 hover:bg-forest/5 focus-visible:outline-forest",
  light:
    "bg-ivory text-forest hover:bg-white focus-visible:outline-accent-soft",
  outlineLight:
    "border border-ivory/50 bg-transparent text-ivory hover:border-ivory/70 hover:bg-ivory/10 focus-visible:outline-accent-soft",
};

/**
 * The one button in the system. Renders as a router <Link>, an <a> for
 * external/tel targets, or a <button> — `to`/`href` decide which.
 *
 * `disabled` works on every rendered tag, including `to`/`href`: the CSS
 * `:disabled` pseudo-class only matches real form controls, so an anchor or
 * Link stays fully clickable even when it looks greyed out unless we also
 * gate navigation and tab order by hand here.
 */
export default function Button({
  children,
  to,
  href,
  variant = "primary",
  size = "md",
  withArrow = true,
  disabled = false,
  onClick,
  className = "",
  ...rest
}) {
  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`;

  const content = (
    <>
      <span className="relative">{children}</span>
      {withArrow && (
        <ArrowRight
          aria-hidden="true"
          className="relative h-4 w-4 shrink-0"
          strokeWidth={1.5}
        />
      )}
    </>
  );

  if (to) {
    return (
      <Link
        data-button
        href={disabled ? "#" : to}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : undefined}
        onClick={disabled ? (e) => e.preventDefault() : onClick}
        className={classes}
        {...rest}
      >
        {content}
      </Link>
    );
  }

  if (href) {
    const external = href.startsWith("http");
    return (
      <a
        data-button
        href={disabled ? undefined : href}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : undefined}
        onClick={disabled ? (e) => e.preventDefault() : onClick}
        className={classes}
        {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      data-button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={classes}
      {...rest}
    >
      {content}
    </button>
  );
}

/** Static text link used inside cards and footers. */
export function ArrowLink({ children, to, href, className = "", ...rest }) {
  const classes = `group inline-flex items-center gap-2 text-[0.8125rem] font-medium tracking-[0.08em] text-forest uppercase hover:text-accent-ink ${className}`;

  const content = (
    <>
      <span>{children}</span>
      <ArrowRight
        aria-hidden="true"
        className="h-3.5 w-3.5"
        strokeWidth={1.5}
      />
    </>
  );

  if (to) {
    return (
      <Link data-button href={to} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  return (
    <a data-button href={href} className={classes} {...rest}>
      {content}
    </a>
  );
}
