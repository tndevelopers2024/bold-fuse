/**
 * Shared motion language.
 *
 * Everything is slow, short-travel and eased out — no bounce, no spring
 * overshoot, no parallax. Durations sit between 0.4s and 1.0s.
 *
 * The variants themselves live with the components that use them; what is
 * shared is the easing curve and the viewport trigger, so every reveal on the
 * site fires at the same point and moves at the same rate.
 */

export const EASE = [0.22, 0.61, 0.36, 1];

/** Reveal once, a quarter of the way in, with a little bottom slack. */
export const viewportOnce = {
  once: true,
  amount: 0.25,
  margin: "0px 0px -10% 0px",
};

/**
 * Pointer handler for `.spotlight` cards: writes the cursor position into
 * --mx / --my so the CSS glow can follow it. No React state, no re-render.
 */
export function trackPointer(event) {
  const el = event.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
  el.style.setProperty("--my", `${event.clientY - rect.top}px`);
}
