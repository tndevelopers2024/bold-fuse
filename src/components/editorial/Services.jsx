"use client";
import { memo, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { home } from "@/content/home";
import { services } from "@/content/editorial/data";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import SectionHeading from "./SectionHeading";
import Button from "./Button";
import ServicePreview from "./ServicePreview";
import styles from "./Services.module.css";

const MemoServicePreview = memo(ServicePreview);
const AUTO_ADVANCE_MS = 5500;

const items = [
  [
    "service6",
    "Build a stronger team with practical HR support that helps employees grow and prepare for what’s next.",
  ],
  [
    "service1",
    "Support mental health and well-being for individuals and help teams build healthier workplaces.",
  ],
  [
    "service3",
    "Reach customers where they spend time online with digital marketing, creative branding and PR.",
  ],
  [
    "service0",
    "Use automation and AI to simplify daily workflows and give your team more time for creative work.",
  ],
  [
    "service2",
    "Review your financial plans and get practical advice to make better decisions as your business grows.",
  ],
  [
    "service4",
    "Improve daily operations by giving teams better ways to work together and respond to changing customer needs.",
  ],
  [
    "service5",
    "Work with independent legal consultants for help with a specific matter or ongoing business advice.",
  ],
].map(([slug, description]) => ({
  ...services.find((service) => service.slug === slug),
  description,
}));

export default function Services({ withCta = true }) {
  const [position, setPosition] = useState(0);
  const [dragPosition, setDragPosition] = useState(null);
  const [autoAdvancing, setAutoAdvancing] = useState(false);
  const reducedMotion = useReducedMotion();
  const stageRef = useRef(null);
  const gesture = useRef(null);
  const suppressClick = useRef(false);
  const resumeAfter = useRef(0);
  const active = ((position % items.length) + items.length) % items.length;
  const move = (direction) => {
    resumeAfter.current = performance.now() + 2200;
    setAutoAdvancing(false);
    setPosition((current) => current + direction);
  };

  useEffect(() => {
    if (reducedMotion) return;

    const stage = stageRef.current;
    const backdrop = stage.parentElement;
    let visible = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.intersectionRatio >= 0.25;
      },
      { threshold: 0.25 },
    );
    observer.observe(stage);

    let frame;
    let previousTime = null;
    let advancing = false;
    let offset = 0;
    let nearest = 0;

    function advance(time) {
      frame = requestAnimationFrame(advance);
      if (!visible || document.hidden || gesture.current) {
        previousTime = null;
        return;
      }
      if (
        time < resumeAfter.current ||
        (backdrop.contains(document.activeElement) &&
          document.activeElement.matches(":focus-visible"))
      ) {
        if (advancing) setAutoAdvancing(false);
        advancing = false;
        previousTime = null;
        return;
      }

      if (!advancing) {
        offset = Number(
          stage.style.getPropertyValue("--services-manual-position"),
        );
        nearest = Math.round(offset);
        advancing = true;
        setAutoAdvancing(true);
      }

      if (previousTime !== null)
        offset += Math.min(time - previousTime, 50) / AUTO_ADVANCE_MS;
      previousTime = time;
      stage.style.setProperty("--services-auto-position", offset);

      const next = Math.round(offset);
      if (next !== nearest) {
        nearest = next;
        setPosition(next);
      }
    }
    frame = requestAnimationFrame(advance);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      stage.style.removeProperty("--services-auto-position");
    };
  }, [reducedMotion]);

  function startGesture(event) {
    if (!event.isPrimary || event.button !== 0) return;
    const stage = event.currentTarget;
    const card = stage.querySelector("[data-active='true']");
    suppressClick.current = false;
    gesture.current = {
      id: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      lastX: event.clientX,
      lastTime: event.timeStamp,
      velocity: 0,
      pitch: card.offsetWidth * 1.2,
      origin: Number(
        getComputedStyle(stage).getPropertyValue(
          "--boldfuse-services-position",
        ),
      ),
      dragging: false,
    };
  }

  function trackGesture(event) {
    const drag = gesture.current;
    if (drag?.id !== event.pointerId) return;
    const dx = event.clientX - drag.startX;
    if (!drag.dragging) {
      const dy = event.clientY - drag.startY;
      if (Math.abs(dy) > 8 && Math.abs(dy) > Math.abs(dx)) {
        gesture.current = null;
        return;
      }
      if (Math.abs(dx) < 8) return;
      event.currentTarget.setPointerCapture(event.pointerId);
      drag.dragging = true;
      setAutoAdvancing(false);
      suppressClick.current = true;
    }

    const elapsed = event.timeStamp - drag.lastTime;
    if (elapsed > 0) {
      drag.velocity = (event.clientX - drag.lastX) / elapsed;
    }
    drag.lastX = event.clientX;
    drag.lastTime = event.timeStamp;
    setDragPosition(drag.origin - dx / drag.pitch);
  }

  function endGesture(event) {
    const drag = gesture.current;
    if (drag?.id !== event.pointerId) return;
    gesture.current = null;
    if (!drag.dragging) return;
    resumeAfter.current = performance.now() + 2200;

    const released = event.type === "pointerup";
    const x = released ? event.clientX : drag.lastX;
    const velocity =
      released && event.timeStamp - drag.lastTime < 90 ? drag.velocity : 0;
    const momentum = Math.max(-2, Math.min(2, (velocity * 240) / drag.pitch));
    setAutoAdvancing(false);
    setPosition(
      Math.round(drag.origin - (x - drag.startX) / drag.pitch - momentum),
    );
    setDragPosition(null);
  }

  return (
    <section id="services" className={`section bg-white ${styles.section}`}>
      <div className={styles.intro}>
        <SectionHeading
          prominent
          className="max-w-full"
          eyebrow={home.services.eyebrow}
          title={home.services.title}
          lede={
            "Practical expertise to strengthen your people, processes and healthcare business.\nExplore solutions that simplify operations and support lasting growth."
          }
        />
      </div>

      <div className={styles.backdrop}>
        <div aria-hidden="true" className={styles.curves}>
          <svg
            viewBox="0 0 1440 850"
            preserveAspectRatio="none"
            fill="none"
            focusable="false"
          >
            <path d="M-180 700C180 760 220 440 440 510S720 260 780 170" />
            <path d="M-200 780C180 840 270 520 490 580S780 340 840 250" />
            <path d="M920-160C800 60 1220 20 1190 250S1480 440 1580 590" />
          </svg>
        </div>
        <div
          ref={stageRef}
          className={styles.stage}
          role="region"
          aria-roledescription="carousel"
          aria-label="Our business services"
          aria-describedby="services-instructions"
          tabIndex={0}
          data-dragging={dragPosition !== null}
          data-auto-advancing={autoAdvancing && !reducedMotion}
          style={{ "--services-manual-position": dragPosition ?? position }}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
              event.preventDefault();
              event.currentTarget.focus({ preventScroll: true });
              move(event.key === "ArrowLeft" ? -1 : 1);
            }
          }}
          onPointerDown={startGesture}
          onPointerMove={trackGesture}
          onPointerUp={endGesture}
          onPointerCancel={endGesture}
          onLostPointerCapture={(event) => {
            if (event.target === event.currentTarget) endGesture(event);
          }}
          onPointerLeave={(event) => {
            if (!gesture.current?.dragging) endGesture(event);
          }}
          onClickCapture={(event) => {
            if (suppressClick.current && event.detail > 0) {
              event.preventDefault();
              event.stopPropagation();
              suppressClick.current = false;
            }
          }}
        >
          <p id="services-instructions" className="sr-only">
            Use the left and right arrow keys, drag or swipe, or use the
            controls below to explore all seven services.
          </p>
          {items.map((service, index) => {
            return (
              <article
                key={service.slug}
                className={styles.card}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${items.length}: ${service.title}`}
                aria-hidden={index !== active}
                data-active={index === active}
                style={{ "--index": index, "--slide-count": items.length }}
              >
                <div className={styles.media}>
                  <MemoServicePreview slug={service.slug} />
                </div>
                <h3 className={styles.title}>{service.title}</h3>
                <p className={styles.description}>{service.description}</p>
                <Link
                  data-button
                  href={service.path}
                  className={styles.link}
                  inert={index !== active}
                >
                  Explore service
                  <span className="sr-only">: {service.title}</span>
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </article>
            );
          })}
        </div>
        <div
          className={styles.controls}
          role="group"
          aria-label="Service carousel controls"
        >
          <button
            type="button"
            className={styles.control}
            aria-label="Previous service"
            onClick={() => move(-1)}
          >
            <ChevronLeft size={18} aria-hidden="true" />
          </button>
          <button
            type="button"
            className={styles.control}
            aria-label="Next service"
            onClick={() => move(1)}
          >
            <ChevronRight size={18} aria-hidden="true" />
          </button>
          <p
            className="sr-only"
            aria-live={autoAdvancing ? "off" : "polite"}
            aria-atomic="true"
          >
            {items[active].title}, service {active + 1} of {items.length}
          </p>
        </div>
      </div>
      {withCta && (
        <div className="mt-7 flex justify-center sm:mt-8">
          <Button
            to="/services/"
            variant="secondary"
            size="sm"
            withArrow={false}
          >
            View All Services
          </Button>
        </div>
      )}
    </section>
  );
}
