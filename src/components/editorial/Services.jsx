"use client";
import { memo, useCallback, useEffect, useRef, useState } from "react";
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
const COUNT = 7;
const HALF = COUNT / 2;

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

function getArcGeometry(viewportWidth) {
  if (viewportWidth <= 639) {
    return {
      radius: Math.min(viewportWidth * 4.6, 2100),
      stepDeg: 10,
      cardWidth: Math.min(viewportWidth * 0.7, 320),
    };
  }
  if (viewportWidth <= 1023) {
    return {
      radius: Math.min(viewportWidth * 5.9, 3600),
      stepDeg: 6,
      cardWidth: Math.min(viewportWidth * 0.52, 322),
    };
  }
  return {
    radius: 4250,
    stepDeg: 6,
    cardWidth: 370,
  };
}

function wrapIndex(pos) {
  return ((Math.round(pos) % COUNT) + COUNT) % COUNT;
}

export default function Services({ withCta = true }) {
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [autoAdvancing, setAutoAdvancing] = useState(false);
  const reducedMotion = useReducedMotion();

  const stageRef = useRef(null);
  const cardRefs = useRef([]);
  const cardStateRef = useRef(
    Array.from({ length: COUNT }, () => ({ opacity: "", zIndex: "" })),
  );
  const geometryRef = useRef({ radius: 4250, stepDeg: 6, cardWidth: 370 });

  // Continuous physics state kept in refs so touch drags & glides never trigger React re-renders.
  const currentPosRef = useRef(0);
  const targetPosRef = useRef(null);
  const activeRef = useRef(0);
  const autoAdvancingRef = useRef(false);
  const gestureRef = useRef(null);
  const suppressClickRef = useRef(false);
  const resumeAfterRef = useRef(0);

  const paintCards = useCallback((pos) => {
    const { radius, stepDeg } = geometryRef.current;
    const degToRad = Math.PI / 180;

    for (let index = 0; index < COUNT; index++) {
      const card = cardRefs.current[index];
      if (!card) continue;

      const raw = index - pos + HALF;
      const offset = (((raw % COUNT) + COUNT) % COUNT) - HALF;
      const absOffset = Math.abs(offset);
      const deg = offset * stepDeg;
      const rad = deg * degToRad;
      const x = radius * Math.sin(rad);
      const y = radius * (1 - Math.cos(rad));

      card.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) rotate(${deg.toFixed(3)}deg)`;

      const nextOpacity = Math.max(
        0,
        Math.min(1, (3 - absOffset) * 2),
      ).toFixed(3);
      const nextZ = String(4 - Math.ceil(absOffset));
      const prev = cardStateRef.current[index];
      if (prev.opacity !== nextOpacity) {
        card.style.opacity = nextOpacity;
        prev.opacity = nextOpacity;
      }
      if (prev.zIndex !== nextZ) {
        card.style.zIndex = nextZ;
        prev.zIndex = nextZ;
      }
    }

    const nextActive = wrapIndex(pos);
    if (nextActive !== activeRef.current) {
      activeRef.current = nextActive;
      setActive(nextActive);
    }
  }, []);

  const move = useCallback(
    (direction) => {
      resumeAfterRef.current = performance.now() + 2400;
      if (autoAdvancingRef.current) {
        autoAdvancingRef.current = false;
        setAutoAdvancing(false);
      }
      const base =
        targetPosRef.current !== null
          ? targetPosRef.current
          : Math.round(currentPosRef.current);
      const nextTarget = base + direction;
      if (reducedMotion) {
        currentPosRef.current = nextTarget;
        targetPosRef.current = null;
        paintCards(nextTarget);
      } else {
        targetPosRef.current = nextTarget;
      }
    },
    [paintCards, reducedMotion],
  );

  // Sync geometry on mount and resize without layout thrashing during animation frames.
  useEffect(() => {
    const updateGeometry = () => {
      geometryRef.current = getArcGeometry(window.innerWidth);
      paintCards(currentPosRef.current);
    };
    updateGeometry();
    window.addEventListener("resize", updateGeometry, { passive: true });
    return () => window.removeEventListener("resize", updateGeometry);
  }, [paintCards]);

  // Unified GPU-composited animation loop for smooth 60/120fps glide and settling on iOS & Android.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const backdrop = stage.parentElement;

    if (reducedMotion) {
      const snapped = Math.round(currentPosRef.current);
      currentPosRef.current = snapped;
      targetPosRef.current = null;
      if (autoAdvancingRef.current) {
        autoAdvancingRef.current = false;
        setAutoAdvancing(false);
      }
      paintCards(snapped);
      return;
    }

    let visible = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.intersectionRatio >= 0.2;
      },
      { threshold: 0.2 },
    );
    observer.observe(stage);

    let frame = 0;
    let previousTime = null;

    function tick(time) {
      frame = requestAnimationFrame(tick);

      if (document.hidden) {
        previousTime = null;
        return;
      }

      const dt =
        previousTime === null ? 16.67 : Math.min(time - previousTime, 48);
      previousTime = time;

      const drag = gestureRef.current;
      if (drag?.dragging) {
        // Position is updated directly from touch/pointer events; skip auto/settle.
        return;
      }

      // Smoothly settle toward target position after drag release or button/key navigation.
      if (targetPosRef.current !== null) {
        const diff = targetPosRef.current - currentPosRef.current;
        if (Math.abs(diff) < 0.0008) {
          currentPosRef.current = targetPosRef.current;
          targetPosRef.current = null;
        } else {
          // Exponential damping gives silky, framerate-independent easing at 60Hz & 120Hz.
          const factor = 1 - Math.exp(-(dt / 1000) * 9.5);
          currentPosRef.current += diff * factor;
        }
        paintCards(currentPosRef.current);
        return;
      }

      if (!visible) return;

      const keyboardFocused =
        backdrop?.contains(document.activeElement) &&
        document.activeElement?.matches(":focus-visible");

      if (time < resumeAfterRef.current || keyboardFocused) {
        if (autoAdvancingRef.current) {
          autoAdvancingRef.current = false;
          setAutoAdvancing(false);
        }
        return;
      }

      if (!autoAdvancingRef.current) {
        autoAdvancingRef.current = true;
        setAutoAdvancing(true);
      }

      currentPosRef.current += dt / AUTO_ADVANCE_MS;
      paintCards(currentPosRef.current);
    }

    frame = requestAnimationFrame(tick);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [paintCards, reducedMotion]);

  function startGesture(event) {
    if (!event.isPrimary || event.button !== 0) return;
    suppressClickRef.current = false;
    gestureRef.current = {
      id: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      lastX: event.clientX,
      lastTime: event.timeStamp,
      velocity: 0,
      pitch: geometryRef.current.cardWidth * 1.15,
      origin: currentPosRef.current,
      dragging: false,
    };
  }

  function trackGesture(event) {
    const drag = gestureRef.current;
    if (drag?.id !== event.pointerId) return;
    const dx = event.clientX - drag.startX;

    if (!drag.dragging) {
      const dy = event.clientY - drag.startY;
      if (Math.abs(dy) > 8 && Math.abs(dy) > Math.abs(dx)) {
        gestureRef.current = null;
        return;
      }
      if (Math.abs(dx) < 8) return;
      try {
        event.currentTarget.setPointerCapture(event.pointerId);
      } catch {
        // Ignore capture errors on synthetic or cancelled pointers.
      }
      drag.dragging = true;
      targetPosRef.current = null;
      suppressClickRef.current = true;
      if (autoAdvancingRef.current) {
        autoAdvancingRef.current = false;
        setAutoAdvancing(false);
      }
      setDragging(true);
    }

    const elapsed = event.timeStamp - drag.lastTime;
    if (elapsed > 0) {
      const instantVelocity = (event.clientX - drag.lastX) / elapsed;
      // Smooth velocity with a light low-pass filter to eliminate noisy mobile touch spikes.
      drag.velocity = drag.velocity * 0.45 + instantVelocity * 0.55;
    }
    drag.lastX = event.clientX;
    drag.lastTime = event.timeStamp;

    const nextPos = drag.origin - dx / drag.pitch;
    currentPosRef.current = nextPos;
    paintCards(nextPos);
  }

  function endGesture(event) {
    const drag = gestureRef.current;
    if (drag?.id !== event.pointerId) return;
    gestureRef.current = null;
    if (!drag.dragging) return;

    setDragging(false);
    resumeAfterRef.current = performance.now() + 2400;

    const released = event.type === "pointerup";
    const x = released ? event.clientX : drag.lastX;
    const velocity =
      released && event.timeStamp - drag.lastTime < 100 ? drag.velocity : 0;
    const momentum = Math.max(-2, Math.min(2, (velocity * 220) / drag.pitch));
    const nextTarget = Math.round(
      drag.origin - (x - drag.startX) / drag.pitch - momentum,
    );

    if (reducedMotion) {
      currentPosRef.current = nextTarget;
      targetPosRef.current = null;
      paintCards(nextTarget);
    } else {
      targetPosRef.current = nextTarget;
    }
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
          data-dragging={dragging}
          data-auto-advancing={autoAdvancing && !reducedMotion}
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
            if (!gestureRef.current?.dragging) endGesture(event);
          }}
          onClickCapture={(event) => {
            if (suppressClickRef.current && event.detail > 0) {
              event.preventDefault();
              event.stopPropagation();
              suppressClickRef.current = false;
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
                ref={(node) => {
                  cardRefs.current[index] = node;
                }}
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
