"use client";

import { useEffect, useState } from "react";
import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";
import { ArrowUp, Phone } from "lucide-react";
import { site } from "@/content/site";
import CustomCursor from "./CustomCursor";

export default function Experience({ children }) {
  const reduced = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 300);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <ReactLenis
      root
      options={{
        smoothWheel: !reduced,
        anchors: { offset: -96 },
        prevent: (node) =>
          node.tagName === "DIALOG" ||
          document.documentElement.classList.contains("menu-open"),
      }}
    >
      {children}
      <CustomCursor />
      {scrolled && (
        <aside
          aria-label="Quick actions"
          className="fixed right-4 bottom-5 z-30 flex flex-col items-center gap-3 sm:right-6"
        >
          <button
            type="button"
            aria-label="Back to top"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: reduced ? "instant" : "smooth",
              })
            }
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-forest"
          >
            <ArrowUp size={19} aria-hidden="true" />
          </button>
          <a
            data-button
            href={`tel:${site.telephone}`}
            aria-label={`Call ${site.name}`}
            className="flex h-13 w-13 items-center justify-center rounded-full border border-accent/60 bg-forest text-accent-soft"
          >
            <Phone size={22} aria-hidden="true" />
          </a>
        </aside>
      )}
    </ReactLenis>
  );
}
