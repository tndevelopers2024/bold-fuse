import CTA from "@/components/editorial/CTA";
import { pageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

// Therapy images from local assets
import cbtImg from "@/assets/services/therapy/cognitive-behavioral-therapy-(CBT).jpeg";
import dbtImg from "@/assets/services/therapy/dialectical-behavior-therapy-(DBT).jpeg";
import mbsrImg from "@/assets/services/therapy/mindfulness-based-stress-reduction-(MBSR).jpeg";
import actImg from "@/assets/services/therapy/acceptance-and-commitment-therapy-(ACT).jpeg";
import psychodynamicImg from "@/assets/services/therapy/psychodynamic-therapy.jpeg";
import iptImg from "@/assets/services/therapy/interpersonal-therapy-(IPT).jpeg";
import familyImg from "@/assets/services/therapy/family-therapy.jpeg";
import groupImg from "@/assets/services/therapy/group-therapy.jpeg";
import artImg from "@/assets/services/therapy/art-therapy.jpeg";
import musicImg from "@/assets/services/therapy/music-therapy.jpeg";
import animalImg from "@/assets/services/therapy/animal-assisted-therapy.jpeg";
import experientialImg from "@/assets/services/therapy/experiential-therapy.jpeg";

export const metadata: Metadata = pageMetadata({
  title: "Therapy",
  description:
    "Therapy techniques are tools and strategies that parents can use to effectively guide, support, and nurture their children’s development.",
  alternates: { canonical: "/therapy/" },
});

const therapyTechniques = [
  {
    title: "Cognitive Behavioral Therapy (CBT)",
    description:
      "CBT is a widely used therapeutic approach that focuses on identifying and changing negative thought patterns and behaviors to promote mental well-being.",
    image: cbtImg,
    imageAlt: "Cognitive Behavioral Therapy (CBT) session exploring thought patterns",
  },
  {
    title: "Dialectical Behavior Therapy (DBT)",
    description:
      "DBT combines cognitive and behavioral therapies with mindfulness techniques. It’s particularly effective for individuals struggling with emotion regulation and interpersonal difficulties.",
    image: dbtImg,
    imageAlt: "Dialectical Behavior Therapy (DBT) guidance with mindfulness",
  },
  {
    title: "Mindfulness-Based Stress Reduction (MBSR)",
    description:
      "MBSR incorporates mindfulness meditation and yoga to help individuals manage stress, pain, and improve overall well-being.",
    image: mbsrImg,
    imageAlt: "Mindfulness-Based Stress Reduction (MBSR) meditation and stress management",
  },
  {
    title: "Acceptance and Commitment Therapy (ACT)",
    description:
      "ACT encourages individuals to accept their thoughts and feelings while committing to actions aligned with their values, aiming to foster psychological flexibility.",
    image: actImg,
    imageAlt: "Acceptance and Commitment Therapy fostering psychological flexibility",
  },
  {
    title: "Psychodynamic Therapy",
    description:
      "This therapy focuses on exploring unconscious processes and unresolved conflicts that may be contributing to a person’s current difficulties. It often involves examining past experiences and relationships to gain insight into present behaviors and emotions.",
    image: psychodynamicImg,
    imageAlt: "Psychodynamic Therapy examining unresolved conflicts and experiences",
  },
  {
    title: "Interpersonal Therapy (IPT)",
    description:
      "IPT focuses on improving interpersonal relationships and communication skills to alleviate symptoms of mental illness, particularly depression.",
    image: iptImg,
    imageAlt: "Interpersonal Therapy improving relationship and communication skills",
  },
  {
    title: "Family Therapy",
    description:
      "Family therapy involves working with individuals and their families to address relational dynamics, communication patterns, and conflicts that may be impacting mental health.",
    image: familyImg,
    imageAlt: "Family Therapy session addressing family dynamics and communication",
  },
  {
    title: "Group Therapy",
    description:
      "Group therapy provides a supportive environment for individuals to share experiences, receive feedback, and learn coping skills from one another under the guidance of a therapist.",
    image: groupImg,
    imageAlt: "Supportive Group Therapy session under professional guidance",
  },
  {
    title: "Art Therapy",
    description:
      "Art therapy utilizes creative processes such as drawing, painting, or sculpting to help individuals explore emotions, reduce stress, and improve self-awareness.",
    image: artImg,
    imageAlt: "Art Therapy creative exploration for emotional expression and healing",
  },
  {
    title: "Music Therapy",
    description:
      "Music therapy involves using music interventions such as listening, creating, or discussing music to address emotional, cognitive, or social needs.",
    image: musicImg,
    imageAlt: "Music Therapy intervention addressing emotional and cognitive needs",
  },
  {
    title: "Animal-Assisted Therapy",
    description:
      "Animal-assisted therapy involves interactions with animals, such as therapy dogs or horses, to promote emotional well-being and improve social skills.",
    image: animalImg,
    imageAlt: "Animal-Assisted Therapy promoting emotional well-being and connection",
  },
  {
    title: "Experiential Therapies",
    description:
      "These therapies include activities such as role-playing, outdoor activities, or adventure therapy to promote personal growth and self-discovery.",
    image: experientialImg,
    imageAlt: "Experiential Therapies fostering personal growth and self-discovery",
  },
];

export default function TherapyPage() {
  return (
    <main id="main-content" className="bg-white">
      {/* ================================================================ */}
      {/* 1. HERO SECTION                                                  */}
      {/* ================================================================ */}
      <section
        aria-labelledby="therapy-hero-heading"
        className="shell pt-8 pb-0 sm:pt-12"
      >
        <div className="page-hero relative isolate overflow-hidden rounded-3xl bg-forest-surface px-6 text-white sm:px-12 lg:px-16">
          {/* Subtle flowing SVG background decoration - approved site direction */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_0%_0%,rgba(2,170,119,0.28),transparent_55%),radial-gradient(ellipse_at_100%_100%,rgba(97,198,168,0.18),transparent_50%)]"
          >
            <svg
              viewBox="0 0 1200 400"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full text-accent-soft"
              fill="none"
            >
              <path
                d="M620 440C830 400 800 230 1000 255S1170 110 1260 50M710 440C900 410 850 295 1050 315S1210 180 1260 140"
                stroke="currentColor"
                strokeWidth="1"
                opacity=".16"
              />
            </svg>
          </div>

          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-white/60">
              <li>
                <Link
                  href="/"
                  className="transition-colors hover:text-white"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-white/40">
                ›
              </li>
              <li>
                <Link
                  href="/services/"
                  className="transition-colors hover:text-white"
                >
                  Services
                </Link>
              </li>
              <li aria-hidden="true" className="text-white/40">
                ›
              </li>
              <li>
                <Link
                  href="/services/#healthwellness"
                  className="transition-colors hover:text-white"
                >
                  Wellness and Mental Health
                </Link>
              </li>
              <li aria-hidden="true" className="text-white/40">
                ›
              </li>
              <li className="text-white/90 font-semibold" aria-current="page">
                Therapy
              </li>
            </ol>
          </nav>

          <p className="text-xs font-semibold tracking-[0.2em] text-accent-soft uppercase">
            Wellness &amp; Mental Health
          </p>

          <h1
            id="therapy-hero-heading"
            className="mt-5 max-w-3xl font-heading text-4xl leading-tight font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Therapy
          </h1>

          <p className="mt-5 max-w-2xl font-description text-base leading-relaxed font-medium text-white/80 sm:text-lg">
            Therapy techniques are tools and strategies that parents can use to
            effectively guide, support, and nurture their children’s development.
          </p>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 2. THERAPY TECHNIQUES CARDS GRID                                 */}
      {/* ================================================================ */}
      <section
        aria-label="Therapy techniques and modalities"
        className="shell pt-14 pb-16 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-28"
      >
        <div className="border-b border-line pb-6 mb-10">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold tracking-[0.2em] text-accent-ink uppercase">
              Common Techniques of Therapy
            </span>
            <div className="h-0.5 w-10 bg-accent/40" />
          </div>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-forest sm:text-4xl">
            Therapeutic Approaches &amp; Modalities
          </h2>
          <p className="mt-2 font-description text-base font-medium text-muted max-w-2xl">
            Explore evidence-based therapy methods tailored to empower
            individuals, children, and families with lasting coping skills.
          </p>
        </div>

        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {therapyTechniques.map((technique, idx) => (
            <article
              key={idx}
              className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-[0_2px_8px_rgba(23,63,53,0.04),0_12px_24px_-16px_rgba(23,63,53,0.1)] transition-all duration-300 hover:shadow-[0_16px_36px_-12px_rgba(23,63,53,0.18)] hover:border-accent/40"
            >
              {/* Image Frame */}
              <div className="border-b border-line rounded-b-3xl p-3.5 sm:p-4">
                <Image
                  src={technique.image}
                  alt={technique.imageAlt}
                  sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 92vw"
                  className="aspect-[16/10] w-full rounded-2xl object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <h3 className="font-heading text-xl font-bold text-forest transition-colors group-hover:text-accent-ink">
                  {technique.title}
                </h3>

                <p className="mt-3 font-description text-sm leading-relaxed font-medium text-muted flex-1">
                  {technique.description}
                </p>

                <div className="mt-6 pt-5 border-t border-line/60 flex items-center justify-between">
                  <Link
                    href={`/contact/?service=${encodeURIComponent(technique.title)}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-forest uppercase tracking-wider transition-colors hover:text-accent-ink group-hover:text-accent-ink"
                  >
                    Book Session
                    <ArrowUpRight
                      size={15}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ================================================================ */}
      {/* 3. CALL TO ACTION SECTION (FROM REFERENCE WEBSITE)               */}
      {/* ================================================================ */}
      <CTA />
    </main>
  );
}

