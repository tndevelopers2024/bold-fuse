"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";

/**
 * Interactive selector elements that trigger pointer expand state.
 */
const INTERACTIVE =
  'a, button, [role="button"], input, select, textarea, label, [data-cursor="pointer"]';

/**
 * Checks if an element resides inside a dark surface (e.g. hero photo banner, footer).
 */
function isDarkSurface(target) {
  if (!target || !(target instanceof Element)) return false;
  return Boolean(
    target.closest(
      '[data-cursor-theme="dark"], section[aria-label*="Banner"], footer, .bg-forest, [class*="bg-[#091D17]"]',
    ),
  );
}

export default function CustomCursor() {
  const prefersReduced = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [clicking, setClicking] = useState(false);
  const hasTouchRef = useRef(false);

  // Raw mouse position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Dot follows tightly
  const dotX = useSpring(mouseX, { damping: 40, stiffness: 850, mass: 0.12 });
  const dotY = useSpring(mouseY, { damping: 40, stiffness: 850, mass: 0.12 });

  // Trailing ring follows with an elegant elastic ease
  const ringX = useSpring(mouseX, { damping: 28, stiffness: 220, mass: 0.45 });
  const ringY = useSpring(mouseY, { damping: 28, stiffness: 220, mass: 0.45 });

  const onMouseMove = useCallback(
    (e) => {
      if (hasTouchRef.current) return;
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);
      setIsDark(isDarkSurface(e.target));
    },
    [mouseX, mouseY, visible],
  );

  useEffect(() => {
    const onTouch = () => {
      hasTouchRef.current = true;
      setVisible(false);
    };

    const onMouseOver = (e) => {
      if (e.target?.closest?.(INTERACTIVE)) setHovered(true);
      setIsDark(isDarkSurface(e.target));
    };

    const onMouseOut = (e) => {
      if (e.target?.closest?.(INTERACTIVE)) setHovered(false);
    };

    const onMouseDown = () => setClicking(true);
    const onMouseUp = () => setClicking(false);
    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = (e) => {
      if (!hasTouchRef.current) {
        setVisible(true);
        setIsDark(isDarkSurface(e.target));
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", onMouseOver, { passive: true });
    window.addEventListener("mouseout", onMouseOut, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchstart", onTouch, { once: true });
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    document.documentElement.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchstart", onTouch);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      document.documentElement.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [onMouseMove]);

  // Don't render on touch screens or for users preferring reduced motion
  if (prefersReduced) return null;

  const dotSize = 6;
  const ringSize = hovered ? 46 : 30;

  // Adaptive palette:
  // - Dark surfaces: luminous accent-soft / ivory
  // - Light surfaces: deep forest green / warm accent
  const dotColor = isDark ? "#eefaf5" : "#173F35";
  const ringBorder = isDark
    ? hovered
      ? "rgba(169, 233, 217, 0.95)"
      : "rgba(169, 233, 217, 0.55)"
    : hovered
      ? "rgba(23, 63, 53, 0.75)"
      : "rgba(23, 63, 53, 0.32)";

  const ringBg = isDark
    ? hovered
      ? "rgba(169, 233, 217, 0.12)"
      : "rgba(2, 170, 119, 0)"
    : hovered
      ? "rgba(2, 170, 119, 0.08)"
      : "rgba(2, 170, 119, 0)";

  return (
    <>
      {/* Precision Center Dot */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full shadow-xs"
        style={{
          width: dotSize,
          height: dotSize,
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
          scale: clicking ? 0.65 : 1,
        }}
        animate={{
          backgroundColor: dotColor,
        }}
        transition={{
          backgroundColor: { duration: 0.2 },
          scale: { duration: 0.12 },
        }}
      />

      {/* Adaptive Trailing Ring */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full border transition-colors"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
        }}
        animate={{
          width: ringSize,
          height: ringSize,
          borderColor: ringBorder,
          backgroundColor: ringBg,
          scale: clicking ? 0.85 : 1,
        }}
        transition={{
          width: { type: "spring", damping: 24, stiffness: 320 },
          height: { type: "spring", damping: 24, stiffness: 320 },
          borderColor: { duration: 0.2 },
          backgroundColor: { duration: 0.2 },
          scale: { duration: 0.12 },
        }}
      />
    </>
  );
}
