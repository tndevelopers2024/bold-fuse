import CTA from "@/components/editorial/CTA";
import { pageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

// Psychological testing images from local assets
import personalityImg from "@/assets/services/psychological-testing/personality-assessments.jpeg";
import cognitiveImg from "@/assets/services/psychological-testing/cognitive-assessments-2.jpeg";
import moodEmotionalImg from "@/assets/services/psychological-testing/mood-emotional-assessments-2.jpeg";
import behavioralClinicalImg from "@/assets/services/psychological-testing/behavioral-clinical-assessments-1.jpeg";
import neuropsychologicalImg from "@/assets/services/psychological-testing/neuropsychological-assessments-1.jpeg";

export const metadata: Metadata = pageMetadata({
  title: "Psychological Testing",
  description:
    "Comprehensive, standardized psychological assessments administered by qualified therapists to provide diagnostic clarity and personalized guidance.",
  alternates: { canonical: "/psychological-testing/" },
});

const psychologicalAssessments = [
  {
    title: "Personality Assessments",
    description:
      "Comprehensive evaluations designed to understand personality structures, emotional patterns, behavioral tendencies, and relational dynamics. These assessments offer valuable self-awareness and help therapists tailor individual or interpersonal interventions.",
    image: personalityImg,
    imageAlt: "Personality assessment session exploring emotional patterns and behavioral tendencies",
  },
  {
    title: "Cognitive Assessments",
    description:
      "Structured evaluations measuring intellectual functioning, executive functioning, problem-solving, attention, and memory. These assessments help identify cognitive strengths, learning difficulties, or processing challenges.",
    image: cognitiveImg,
    imageAlt: "Cognitive assessment evaluating intellectual functioning, memory, and executive skills",
  },
  {
    title: "Mood and Emotional State Assessments",
    description:
      "Standardized clinical tools assessing emotional well-being, symptoms of depression, anxiety, mood fluctuations, and stress levels. These help clinicians accurately diagnose affective conditions and track therapeutic progress over time.",
    image: moodEmotionalImg,
    imageAlt: "Clinician administering mood and emotional state assessment for diagnostic clarity",
  },
  {
    title: "Behavioral and Clinical Assessments",
    description:
      "Diagnostic assessments identifying behavioral patterns, symptoms of mental health conditions, coping mechanisms, and functional challenges. These provide clear diagnostic clarity to guide personalized clinical treatment plans.",
    image: behavioralClinicalImg,
    imageAlt: "Behavioral and clinical assessment evaluating symptoms and functional coping mechanisms",
  },
  {
    title: "Neuropsychological Assessments",
    description:
      "In-depth assessments evaluating the relationship between brain functioning and behavior, examining domains like working memory, motor speed, perception, and attention to evaluate cognitive impairment or neurological conditions.",
    image: neuropsychologicalImg,
    imageAlt: "Neuropsychological assessment measuring brain functioning, attention, and processing speed",
  },
];

export default function PsychologicalTestingPage() {
  return (
    <main id="main-content" className="bg-white">
      {/* ================================================================ */}
      {/* 1. HERO SECTION                                                  */}
      {/* ================================================================ */}
      <section
        aria-labelledby="psychological-testing-hero-heading"
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
                Psychological Testing
              </li>
            </ol>
          </nav>

          <p className="text-xs font-semibold tracking-[0.2em] text-accent-soft uppercase">
            Wellness &amp; Mental Health
          </p>

          <h1
            id="psychological-testing-hero-heading"
            className="mt-5 max-w-3xl font-heading text-4xl leading-tight font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Psychological Testing
          </h1>

          <p className="mt-5 max-w-2xl font-description text-base leading-relaxed font-medium text-white/80 sm:text-lg">
            Comprehensive, standardized psychological assessments administered
            by qualified therapists to provide deep insights, diagnostic
            clarity, and individualized care.
          </p>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 2. PHILOSOPHY & INTRO CONTENT                                    */}
      {/* ================================================================ */}
      <section
        aria-labelledby="psychological-testing-intro-heading"
        className="shell pt-14 pb-0 sm:pt-16 lg:pt-20"
      >
        <div className="max-w-4xl">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold tracking-[0.2em] text-accent-ink uppercase">
              Our Assessment Philosophy
            </span>
            <div className="h-0.5 w-10 bg-accent/40" />
          </div>

          <h2
            id="psychological-testing-intro-heading"
            className="mt-3 font-heading text-2xl font-bold tracking-tight text-forest sm:text-3xl lg:text-4xl"
          >
            Ethical, insightful assessments grounded in clinical expertise.
          </h2>

          <div className="mt-6 space-y-4 font-description text-base leading-[1.85] font-medium text-muted sm:text-lg">
            <p>
              We at Boldfuse ensure that before administering any psychological
              test, a qualified therapist conducts the evaluation and possesses the
              necessary training to interpret the results accurately and
              sensitively.
            </p>
            <p>
              Additionally, we carefully consider the ethical implications and
              confidentiality standards associated with psychological testing, and
              obtain informed consent from our clients. We also consult our
              multidisciplinary team of professionals and psychologists, who
              provide valuable insights and clinical guidance in selecting,
              administering, and analyzing appropriate tests.
            </p>
            <p>
              Psychological testing provides an objective, evidence-based lens
              into emotional functioning, cognitive capabilities, personality
              structures, and behavioral patterns. Whether identifying specific
              learning profiles, evaluating emotional health, or gaining deeper
              self-awareness, our assessments form a dependable foundation for
              effective intervention and personal growth.
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 3. PSYCHOLOGICAL ASSESSMENTS CARDS GRID                          */}
      {/* ================================================================ */}
      <section
        aria-label="Psychological assessment categories and evaluations"
        className="shell pt-14 pb-16 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-28"
      >
        <div className="border-b border-line pb-6 mb-10">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold tracking-[0.2em] text-accent-ink uppercase">
              Specialized Assessments
            </span>
            <div className="h-0.5 w-10 bg-accent/40" />
          </div>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-forest sm:text-4xl">
            Comprehensive Psychological Assessments
          </h2>
          <p className="mt-2 font-description text-base font-medium text-muted max-w-2xl">
            Standardized evaluation tools administered by experienced clinicians
            to clarify diagnoses, highlight strengths, and inform effective
            therapeutic pathways.
          </p>
        </div>

        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {psychologicalAssessments.map((assessment, idx) => (
            <article
              key={idx}
              className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-[0_2px_8px_rgba(23,63,53,0.04),0_12px_24px_-16px_rgba(23,63,53,0.1)] transition-all duration-300 hover:shadow-[0_16px_36px_-12px_rgba(23,63,53,0.18)] hover:border-accent/40"
            >
              {/* Image Frame */}
              <div className="border-b border-line rounded-b-3xl p-3.5 sm:p-4">
                <Image
                  src={assessment.image}
                  alt={assessment.imageAlt}
                  sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 92vw"
                  className="aspect-[16/10] w-full rounded-2xl object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <h3 className="font-heading text-xl font-bold text-forest transition-colors group-hover:text-accent-ink">
                  {assessment.title}
                </h3>

                <p className="mt-3 font-description text-sm leading-relaxed font-medium text-muted flex-1">
                  {assessment.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ================================================================ */}
      {/* 4. CALL TO ACTION SECTION                                        */}
      {/* ================================================================ */}
      <CTA />
    </main>
  );
}
