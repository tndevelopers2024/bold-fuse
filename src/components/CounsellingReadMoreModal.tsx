"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

interface CounsellingReadMoreModalProps {
  tagline: string;
  initialText?: string;
  previewParagraphs?: string[];
  paragraphs: string[];
}

export default function CounsellingReadMoreModal({
  tagline,
  initialText,
  previewParagraphs,
  paragraphs,
}: CounsellingReadMoreModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const displayParagraphs =
    previewParagraphs && previewParagraphs.length > 0
      ? previewParagraphs
      : initialText
        ? [initialText]
        : [];

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  return (
    <>
      <div className="mt-5 space-y-4 font-description text-base leading-[1.8] font-medium text-muted">
        {displayParagraphs.map((paragraph, idx) => (
          <p key={idx}>{paragraph}</p>
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="inline-flex cursor-pointer items-center justify-center rounded-full border border-forest bg-white px-7 py-2.5 text-sm font-semibold text-forest hover:bg-forest hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
          aria-haspopup="dialog"
          aria-expanded={isOpen}
        >
          Read More
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8"
            role="dialog"
            aria-modal="true"
            aria-labelledby="counselling-modal-heading"
          >
            {/* Backdrop: click outside to close */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-forest/70 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />

            {/* Modal Dialog Window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative z-10 flex max-h-[88vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header with Heading & Close (X) */}
              <div className="flex items-start justify-between border-b border-line px-6 py-5 sm:px-8 sm:py-6">
                <div className="pr-4">
                  <p className="text-xs font-semibold tracking-[0.2em] text-accent-ink uppercase">
                    Service Overview • Mental Wellness
                  </p>
                  <h3
                    id="counselling-modal-heading"
                    className="mt-1 font-heading text-xl leading-snug font-bold text-forest sm:text-2xl"
                  >
                    {tagline}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="shrink-0 cursor-pointer rounded-full p-2 text-forest/70 hover:bg-white hover:text-forest focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
                  aria-label="Close modal"
                >
                  <X size={20} aria-hidden="true" />
                </button>
              </div>

              {/* Scrollable Content Body */}
              <div className="overflow-y-auto px-6 py-6 sm:px-8 sm:py-7">
                <div className="space-y-4 font-description text-base leading-[1.8] font-medium text-muted">
                  {paragraphs.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>

                {/* Consultation Call to Action */}
                <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-line pt-6">
                  <Link
                    href="/contact/"
                    onClick={() => setIsOpen(false)}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-forest px-7 py-3 text-sm font-semibold text-white hover:bg-forest-soft"
                  >
                    Book a Consultation
                    <ArrowUpRight size={17} aria-hidden="true" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="inline-flex min-h-12 cursor-pointer items-center justify-center rounded-full border border-line bg-white px-6 py-3 text-sm font-semibold text-forest hover:bg-white"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
