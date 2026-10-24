"use client";
import { useId } from "react";
import { motion, useReducedMotion } from "motion/react";
import { EASE, viewportOnce } from "@/lib/editorial/motion";

/**
 * Heritage-inspired decoration.
 *
 * The vocabulary here is deliberately restrained: lattice geometry borrowed
 * from jaali screens, thin drawn rules, and a small rotated square used as a
 * repeating mark. It reads as craftsmanship and longevity — not as ornament for
 * its own sake, and never as religious or cultural iconography.
 */

/** Faint lattice field. Use as an absolutely positioned backdrop. */
export function JaaliField({
  className = "",
  opacity = 0.07,
  scale = 48,
  tone = "#173F35",
}) {
  const id = useId();
  return (
    <svg
      className={className}
      aria-hidden="true"
      focusable="false"
      width="100%"
      height="100%"
      style={{ opacity }}
    >
      <defs>
        <pattern
          id={id}
          width={scale}
          height={scale}
          patternUnits="userSpaceOnUse"
        >
          <path
            d={`M${scale / 2} 0 L${scale} ${scale / 2} L${scale / 2} ${scale} L0 ${scale / 2} Z`}
            fill="none"
            stroke={tone}
            strokeWidth="1"
          />
          <circle
            cx={scale / 2}
            cy={scale / 2}
            r={scale / 5}
            fill="none"
            stroke={tone}
            strokeWidth="1"
          />
          <circle cx="0" cy="0" r="1.4" fill={tone} />
          <circle cx={scale} cy="0" r="1.4" fill={tone} />
          <circle cx="0" cy={scale} r="1.4" fill={tone} />
          <circle cx={scale} cy={scale} r="1.4" fill={tone} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

/** A thin accent rule that draws itself from the left when scrolled into view. */
export function AccentRule({
  className = "",
  width = "3.5rem",
  delay = 0,
  tone = "bg-accent",
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <span
        aria-hidden="true"
        className={`block h-px ${tone} ${className}`}
        style={{ width }}
      />
    );
  }

  return (
    <motion.span
      aria-hidden="true"
      className={`block h-px origin-left ${tone} ${className}`}
      style={{ width }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={viewportOnce}
      transition={{ duration: 0.9, ease: EASE, delay }}
    />
  );
}

/** Small rotated square. Used as a bullet, a divider node and a hover mark. */
export function Diamond({ className = "", size = 6 }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block rotate-45 border border-accent ${className}`}
      style={{ width: size, height: size }}
    />
  );
}

/** rule — diamond — rule, for centred section breaks. */
export function OrnamentDivider({ className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={`flex items-center justify-center gap-3 ${className}`}
    >
      <span className="h-px w-10 bg-linear-to-r from-transparent to-accent/80 sm:w-16" />
      <Diamond size={7} />
      <span className="h-px w-10 bg-linear-to-l from-transparent to-accent/80 sm:w-16" />
    </div>
  );
}

/** Oversized serif quotation mark for the testimonial block. */
export function QuoteMark({ className = "" }) {
  return (
    <span
      aria-hidden="true"
      className={`block font-display leading-[0.6] select-none ${className}`}
    >
      &ldquo;
    </span>
  );
}
