"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Wraps a `.swipe-mobile` row and adds position dots under it on phones (a
 * progress bar with a counter instead once there are more than seven items).
 * The row itself is found inside the wrapper, so any element (a RevealGroup,
 * a motion list) can be the scroller without forwarding refs. Dots are
 * buttons: tapping one snaps to that card. Hidden from `sm` up, where the
 * row is a normal grid again.
 */
export default function SwipeArea({
  children,
  className = "",
  tone = "light",
}) {
  const wrapper = useRef(null);
  const [count, setCount] = useState(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const row = wrapper.current?.querySelector(".swipe-mobile");
    if (!row) return;

    const measure = () => {
      const items = [...row.children].filter(
        (el) => getComputedStyle(el).display !== "none",
      );
      setCount(getComputedStyle(row).display === "flex" ? items.length : 0);
      if (items.length < 2) return;
      const step = items[1].offsetLeft - items[0].offsetLeft || 1;
      const atEnd = row.scrollLeft + row.clientWidth >= row.scrollWidth - 4;
      setActive(atEnd ? items.length - 1 : Math.round(row.scrollLeft / step));
    };

    measure();
    row.addEventListener("scroll", measure, { passive: true });
    const resize = new ResizeObserver(measure);
    resize.observe(row);
    const mutations = new MutationObserver(measure);
    mutations.observe(row, { childList: true });
    return () => {
      row.removeEventListener("scroll", measure);
      resize.disconnect();
      mutations.disconnect();
    };
  }, []);

  const goTo = (index) => {
    const row = wrapper.current?.querySelector(".swipe-mobile");
    if (!row) return;
    const items = [...row.children].filter(
      (el) => getComputedStyle(el).display !== "none",
    );
    const item = items[index];
    if (!item) return;
    row.scrollTo({
      left: item.offsetLeft - items[0].offsetLeft,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  };

  const dark = tone === "dark";

  return (
    <div ref={wrapper} className={className}>
      {children}
      {count > 7 && (
        <div
          aria-live="polite"
          className="mt-1 flex items-center justify-center gap-3 sm:hidden"
        >
          <span
            className={`relative h-1 w-24 overflow-hidden rounded-full ${dark ? "bg-ivory/20" : "bg-forest/15"}`}
          >
            <span
              className={`absolute inset-y-0 left-0 rounded-full transition-[width] duration-300 ${dark ? "bg-accent-soft" : "bg-forest"}`}
              style={{ width: `${((active + 1) / count) * 100}%` }}
            />
          </span>
          <span
            className={`text-[0.6875rem] tabular-nums ${dark ? "text-ivory/70" : "text-muted"}`}
          >
            {active + 1} / {count}
          </span>
        </div>
      )}
      {count > 1 && count <= 7 && (
        <div className="mt-1 flex items-center justify-center gap-1.5 sm:hidden">
          {Array.from({ length: count }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show item ${i + 1} of ${count}`}
              aria-current={i === active ? "true" : undefined}
              className="flex h-11 min-w-8 items-center justify-center px-1"
            >
              <span
                className={`block h-1.5 rounded-full transition-all duration-300 ${
                  i === active
                    ? `w-5 ${dark ? "bg-accent-soft" : "bg-forest"}`
                    : `w-1.5 ${dark ? "bg-ivory/30" : "bg-forest/25"}`
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
