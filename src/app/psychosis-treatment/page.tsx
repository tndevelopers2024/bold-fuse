import CTA from "@/components/editorial/CTA";
import { pageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

// Psychosis treatment images from local assets
import medicationImg from "@/assets/services/psychosis-treatment/medication.jpeg";
import psychotherapyImg from "@/assets/services/psychosis-treatment/psychotherapy.jpeg";
import cognitiveImg from "@/assets/services/psychosis-treatment/cognitive-remediation.jpeg";
import socialSupportImg from "@/assets/services/psychosis-treatment/social-support-and-rehabilitation-1.jpeg";
import peerSupportImg from "@/assets/services/psychosis-treatment/peer-support-groups.jpeg";
import lifestyleImg from "@/assets/services/psychosis-treatment/lifestyle-changes.jpeg";
import holisticImg from "@/assets/services/psychosis-treatment/holistic-approaches.jpeg";

export const metadata: Metadata = pageMetadata({
  title: "Psychosis Treatment",
  description:
    "Comprehensive, compassionate treatments and interventions for psychosis, tailored to each individual's needs in consultation with qualified healthcare professionals.",
  alternates: { canonical: "/psychosis-treatment/" },
});

const psychosisTreatments = [
  {
    title: "Medication",
    description:
      "Antipsychotic medications are often prescribed to manage symptoms of psychosis. There are different types of antipsychotic medications, including typical (first-generation) and atypical (second-generation) antipsychotics. Each has its own benefits and side effects, so the choice of medication should be made based on individual needs and response to treatment.",
    image: medicationImg,
    imageAlt: "Medication management and psychiatric evaluation for psychosis treatment",
  },
  {
    title: "Psychotherapy",
    description:
      "Various forms of psychotherapy can be helpful for individuals with psychosis, such as cognitive-behavioral therapy (CBT), supportive therapy, and family therapy. These approaches can help individuals manage symptoms, cope with stress, improve communication skills, and address underlying issues contributing to psychosis.",
    image: psychotherapyImg,
    imageAlt: "Compassionate psychotherapy and cognitive-behavioral therapy session for psychosis",
  },
  {
    title: "Cognitive Remediation",
    description:
      "This is a specialized form of therapy aimed at improving cognitive functioning in areas such as attention, memory, and problem-solving, which may be impaired in individuals with psychosis.",
    image: cognitiveImg,
    imageAlt: "Cognitive remediation therapy supporting memory, focus, and problem-solving skills",
  },
  {
    title: "Social Support and Rehabilitation",
    description:
      "Psychosis can have significant impacts on social and occupational functioning. Supportive services such as vocational rehabilitation, housing assistance, and social skills training can help individuals with psychosis reintegrate into the community and improve their quality of life.",
    image: socialSupportImg,
    imageAlt: "Social support, vocational rehabilitation, and community reintegration services",
  },
  {
    title: "Peer Support Groups",
    description:
      "Engaging in peer support groups or support networks with others who have experienced psychosis can provide valuable emotional support, validation, and practical coping strategies.",
    image: peerSupportImg,
    imageAlt: "Supportive peer support group providing mutual validation and coping strategies",
  },
  {
    title: "Lifestyle Changes",
    description:
      "Encouraging clients to adopt healthy lifestyle habits such as regular exercise, balanced nutrition, adequate sleep, and stress management techniques can support overall mental well-being and may complement other treatment approaches.",
    image: lifestyleImg,
    imageAlt: "Encouraging healthy lifestyle habits, balanced nutrition, and restorative sleep",
  },
  {
    title: "Holistic Approaches",
    description:
      "Some individuals may benefit from complementary and alternative therapies such as mindfulness meditation, yoga, art therapy, or music therapy as adjuncts to traditional treatments for psychosis. However, these should be used in conjunction with evidence-based interventions and under the guidance of a qualified professional.",
    image: holisticImg,
    imageAlt: "Holistic, complementary approaches including mindfulness, yoga, and expressive arts therapy",
  },
];

export default function PsychosisTreatmentPage() {
  return (
    <main id="main-content" className="bg-white">
      {/* ================================================================ */}
      {/* 1. HERO SECTION                                                  */}
      {/* ================================================================ */}
      <section
        aria-labelledby="psychosis-hero-heading"
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
                Psychosis Treatment
              </li>
            </ol>
          </nav>

          <p className="text-xs font-semibold tracking-[0.2em] text-accent-soft uppercase">
            Wellness &amp; Mental Health
          </p>

          <h1
            id="psychosis-hero-heading"
            className="mt-5 max-w-3xl font-heading text-4xl leading-tight font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Psychosis Treatment
          </h1>

          <p className="mt-5 max-w-2xl font-description text-base leading-relaxed font-medium text-white/80 sm:text-lg">
            Suggesting treatments for psychosis should be approached with caution
            and should ideally be tailored to each individual client&apos;s needs in
            consultation with a qualified psychiatrist or psychologist.
          </p>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 2. PHILOSOPHY & INTRO CONTENT                                    */}
      {/* ================================================================ */}
      <section
        aria-labelledby="psychosis-intro-heading"
        className="shell pt-14 pb-0 sm:pt-16 lg:pt-20"
      >
        <div className="max-w-4xl">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold tracking-[0.2em] text-accent-ink uppercase">
              Our Treatment Philosophy
            </span>
            <div className="h-0.5 w-10 bg-accent/40" />
          </div>

          <h2
            id="psychosis-intro-heading"
            className="mt-3 font-heading text-2xl font-bold tracking-tight text-forest sm:text-3xl lg:text-4xl"
          >
            Compassionate, personalized care for complex mental health needs.
          </h2>

          <div className="mt-6 space-y-4 font-description text-base leading-[1.85] font-medium text-muted sm:text-lg">
            <p>
              Suggesting treatments for psychosis should be approached with
              caution and should ideally be tailored to each individual client&apos;s
              needs in consultation with a qualified psychiatrist or
              psychologist. Psychosis affects how a person processes information
              and experiences reality, but with comprehensive assessment,
              early intervention, and supportive clinical care, individuals can
              achieve meaningful stability and lead fulfilling lives.
            </p>
            <p>
              We at Boldfuse emphasize the importance of ongoing assessment,
              monitoring, and collaboration with other healthcare providers to
              ensure that treatment approaches are effective and appropriate for
              each individual&apos;s unique needs. Additionally, we support a
              non-judgmental environment in our mental health studio to help
              clients feel comfortable seeking and engaging in treatment.
            </p>
            <p>
              Recovery is often most successful when multimodal approaches are
              combined—pairing appropriate medical management with psychotherapeutic
              strategies, cognitive remediation, and strong community and family
              support. Our goal is to empower each client with the tools,
              resilience, and compassionate care necessary for long-term well-being.
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 3. PSYCHOSIS TREATMENTS CARDS GRID                               */}
      {/* ================================================================ */}
      <section
        aria-label="Psychosis treatments and interventions"
        className="shell pt-14 pb-16 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-28"
      >
        <div className="border-b border-line pb-6 mb-10">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold tracking-[0.2em] text-accent-ink uppercase">
              Specialized Modalities
            </span>
            <div className="h-0.5 w-10 bg-accent/40" />
          </div>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-forest sm:text-4xl">
            Common Treatments and Interventions for Psychosis
          </h2>
          <p className="mt-2 font-description text-base font-medium text-muted max-w-2xl">
            Evidence-informed medical, psychological, and lifestyle approaches
            tailored to manage symptoms, foster cognitive health, and support
            recovery.
          </p>
        </div>

        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {psychosisTreatments.map((treatment, idx) => (
            <article
              key={idx}
              className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-[0_2px_8px_rgba(23,63,53,0.04),0_12px_24px_-16px_rgba(23,63,53,0.1)] transition-all duration-300 hover:shadow-[0_16px_36px_-12px_rgba(23,63,53,0.18)] hover:border-accent/40"
            >
              {/* Image Frame */}
              <div className="border-b border-line rounded-b-3xl p-3.5 sm:p-4">
                <Image
                  src={treatment.image}
                  alt={treatment.imageAlt}
                  sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 92vw"
                  className="aspect-[16/10] w-full rounded-2xl object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <h3 className="font-heading text-xl font-bold text-forest transition-colors group-hover:text-accent-ink">
                  {treatment.title}
                </h3>

                <p className="mt-3 font-description text-sm leading-relaxed font-medium text-muted flex-1">
                  {treatment.description}
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
