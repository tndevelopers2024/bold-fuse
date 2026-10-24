"use client";
import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { EASE } from "@/lib/editorial/motion";

/**
 * Counts a figure like "200+" or "20+ Years" up from zero the first time it
 * enters view. The full value is always in the accessible text, so nothing is
 * announced mid-count; with reduced motion the final figure renders directly.
 */
export default function CountUp({
  value,
  className = "",
  suffixClassName,
  duration = 1.4,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();
  const [, target, suffix] = value.match(/^(\d+)(.*)$/) ?? [null, null, value];
  const [shown, setShown] = useState(
    reduced || target === null ? (target ?? value) : "0",
  );

  useEffect(() => {
    if (!inView || reduced || target === null) return;
    const controls = animate(0, Number(target), {
      duration,
      ease: EASE,
      onUpdate: (n) => setShown(String(Math.round(n))),
    });
    return () => controls.stop();
  }, [inView, reduced, target, duration]);

  return (
    <span ref={ref} className={className}>
      <span aria-hidden="true">
        {reduced ? (target ?? value) : shown}
        {target !== null && <span className={suffixClassName}>{suffix}</span>}
      </span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
