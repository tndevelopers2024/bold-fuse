"use client";
import { motion, useReducedMotion } from "motion/react";
import { EASE, viewportOnce } from "@/lib/editorial/motion";

/**
 * Scroll-triggered reveal. Wraps children in a single motion element so the
 * whole site shares one entrance language.
 *
 * With `prefers-reduced-motion` the element renders in its final state and no
 * transform is applied at all, so nothing shifts during layout.
 */
export default function Reveal({
  children,
  as = "div",
  delay = 0,
  y = 24,
  duration = 0.7,
  className = "",
  amount,
  ...rest
}) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as] ?? motion.div;

  if (reduced) {
    const Tag = as;
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={amount ? { ...viewportOnce, amount } : viewportOnce}
      transition={{ duration, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Staggered list container. Pair with <RevealItem> children.
 */
export function RevealGroup({
  children,
  as = "div",
  className = "",
  stagger = 0.09,
  delay = 0,
  amount,
  ...rest
}) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as] ?? motion.div;

  if (reduced) {
    const Tag = as;
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={amount ? { ...viewportOnce, amount } : viewportOnce}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

export function RevealItem({
  children,
  as = "div",
  className = "",
  y = 22,
  x = 0,
  scale = 1,
  ...rest
}) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as] ?? motion.div;

  if (reduced) {
    const Tag = as;
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      className={className}
      variants={{
        hidden: { opacity: 0, y, x, scale },
        visible: {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          transition: { duration: 0.65, ease: EASE },
        },
      }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Line of copy that rises into view one word at a time, each word sliding up
 * out of its own clipping mask. The full string stays in the accessibility
 * tree; the animated words are hidden from it.
 *
 * `trigger="view"` fires on scroll; `trigger` as a boolean fires when true
 * (used by the hero, which waits for the preloader).
 */
export function SplitWords({
  text,
  trigger = "view",
  delay = 0,
  stagger = 0.06,
  className = "",
}) {
  const reduced = useReducedMotion();
  if (reduced || typeof text !== "string") return text;

  const words = text.split(" ");
  const play =
    trigger === "view"
      ? { initial: "hidden", whileInView: "visible", viewport: viewportOnce }
      : { initial: "hidden", animate: trigger ? "visible" : "hidden" };

  return (
    <>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden="true"
        className={className}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: stagger, delayChildren: delay },
          },
        }}
        {...play}
      >
        {words.map((word, i) => (
          <span key={`${word}-${i}`}>
            <span className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-bottom">
              <motion.span
                className="inline-block will-change-transform"
                variants={{
                  hidden: { y: "105%" },
                  visible: {
                    y: "0%",
                    transition: { duration: 0.9, ease: EASE },
                  },
                }}
              >
                {word}
              </motion.span>
            </span>
            {i < words.length - 1 && " "}
          </span>
        ))}
      </motion.span>
    </>
  );
}
