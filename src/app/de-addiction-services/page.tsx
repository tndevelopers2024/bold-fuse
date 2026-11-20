import CTA from "@/components/editorial/CTA";
import { pageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

// De-addiction images from local assets
import inpatientImg from "@/assets/services/de-addiction-services/inpatient-rehabilitation-centres.png";
import outpatientImg from "@/assets/services/de-addiction-services/outpatient-rehabilitation-programs.png";
import detoxImg from "@/assets/services/de-addiction-services/detoxification-programs.png";
import individualImg from "@/assets/services/de-addiction-services/individual-counselling-and-therapy.png";
import groupImg from "@/assets/services/de-addiction-services/group-therapy-and-support-groups.png";
import matImg from "@/assets/services/de-addiction-services/medication-assisted-treatment-(MAT).png";
import dualImg from "@/assets/services/de-addiction-services/dual-diagnosis-treatment.png";
import familyImg from "@/assets/services/de-addiction-services/family-therapy-and-education.png";
import aftercareImg from "@/assets/services/de-addiction-services/aftercare-planning-and-support.png";
import holisticImg from "@/assets/services/de-addiction-services/holistic-therapies.png";
import telemedicineImg from "@/assets/services/de-addiction-services/telemedicine-and-digital-health-solutions.png";
import peerImg from "@/assets/services/de-addiction-services/peer-recovery-support-services.png";
import mindfulnessImg from "@/assets/services/de-addiction-services/mindfulness-based-therapies.png";
import nutritionalImg from "@/assets/services/de-addiction-services/nutritional-therapy.png";
import traumaImg from "@/assets/services/de-addiction-services/trauma-informed-care.png";
import medicationDevImg from "@/assets/services/de-addiction-services/medication-development-and-personalized-treatment.png";
import culturalImg from "@/assets/services/de-addiction-services/culturally-tailored-interventions.png";

export const metadata: Metadata = pageMetadata({
  title: "De-addiction Services",
  description:
    "De-addiction services help individuals overcome substance and behavioural addictions through treatment and support.",
  alternates: { canonical: "/de-addiction-services/" },
});

const deAddictionServices = [
  {
    title: "Inpatient Rehabilitation Centres",
    description:
      "These facilities provide a structured environment where individuals live onsite for a period of time, typically ranging from a few weeks to several months. They offer intensive therapy, medical supervision, detoxification if necessary, and support groups.",
    image: inpatientImg,
    imageAlt: "Inpatient rehabilitation centre providing structured recovery care",
  },
  {
    title: "Outpatient Rehabilitation Programs",
    description:
      "Outpatient programs allow individuals to attend therapy sessions and receive support while still living at home. These programs are often more flexible and less intensive than inpatient programs but can still provide valuable support and resources for recovery.",
    image: outpatientImg,
    imageAlt: "Outpatient rehabilitation program session supporting flexible recovery",
  },
  {
    title: "Detoxification Programs",
    description:
      "Detox programs help individuals safely withdraw from addictive substances under medical supervision. These programs may be offered as part of inpatient or outpatient rehabilitation centres or as standalone services.",
    image: detoxImg,
    imageAlt: "Medically supervised detoxification program for safe withdrawal",
  },
  {
    title: "Individual Counselling and Therapy",
    description:
      "Therapy sessions with trained counsellors or therapists can help individuals address the underlying issues contributing to their addiction, develop coping strategies, and learn healthier ways of managing stress and emotions.",
    image: individualImg,
    imageAlt: "One-on-one therapy session addressing underlying causes of addiction",
  },
  {
    title: "Group Therapy and Support Groups",
    description:
      "Group therapy sessions, such as 12-step programs like Alcoholics Anonymous (AA) or Narcotics Anonymous (NA), provide opportunities for individuals to share experiences, receive support from peers, and work through challenges together.",
    image: groupImg,
    imageAlt: "Supportive group therapy and peer recovery circle",
  },
  {
    title: "Medication-Assisted Treatment (MAT)",
    description:
      "MAT involves the use of medications, in combination with counselling and behavioural therapies, to treat substance use disorders. These medications can help reduce cravings, manage withdrawal symptoms, and support long-term recovery.",
    image: matImg,
    imageAlt: "Medication-assisted treatment consultation for substance use recovery",
  },
  {
    title: "Dual Diagnosis Treatment",
    description:
      "Many individuals struggling with addiction also have co-occurring mental health disorders such as depression, anxiety, or bipolar disorder. Dual diagnosis treatment programs address both addiction and mental health issues simultaneously to improve overall outcomes.",
    image: dualImg,
    imageAlt: "Dual diagnosis treatment addressing co-occurring mental health conditions",
  },
  {
    title: "Family Therapy and Education",
    description:
      "Addiction can have a significant impact on family dynamics and relationships. Family therapy helps involve loved ones in the recovery process, improve communication, and address issues that may contribute to addiction.",
    image: familyImg,
    imageAlt: "Family therapy session helping rebuild trust and communication",
  },
  {
    title: "Aftercare Planning and Support",
    description:
      "After completing a formal treatment program, individuals often benefit from ongoing support and resources to help maintain sobriety. Aftercare services may include continued therapy, support groups, sober living arrangements, and assistance with transitioning back into daily life.",
    image: aftercareImg,
    imageAlt: "Aftercare planning and relapse prevention support session",
  },
  {
    title: "Holistic Therapies",
    description:
      "Some de-addiction programs incorporate holistic approaches such as yoga, meditation, acupuncture, art therapy, or equine therapy to address the physical, emotional, and spiritual aspects of recovery.",
    image: holisticImg,
    imageAlt: "Holistic therapy and mindfulness practice supporting whole-person healing",
  },
  {
    title: "Telemedicine and Digital Health Solutions",
    description:
      "With advancements in technology, telemedicine platforms and mobile apps are increasingly being used to provide remote counseling, support groups, and even medication management for individuals in recovery. These digital solutions can improve access to care, particularly for those in rural or underserved areas.",
    image: telemedicineImg,
    imageAlt: "Telemedicine and digital health consultation for remote recovery care",
  },
  {
    title: "Peer Recovery Support Services",
    description:
      "Peer support programs involve individuals who are in recovery themselves, known as peer supporters or recovery coaches, providing guidance, encouragement, and practical assistance to others seeking to overcome addiction. Peer support has been shown to be effective in reducing relapse rates and promoting long-term recovery.",
    image: peerImg,
    imageAlt: "Peer recovery coach providing guidance and encouragement",
  },
  {
    title: "Mindfulness-Based Therapies",
    description:
      "Mindfulness practices, such as mindfulness-based relapse prevention (MBRP) and mindfulness-based stress reduction (MBSR), are increasingly being integrated into addiction treatment programs. These approaches help individuals develop greater awareness of their thoughts, emotions, and cravings, and learn healthier ways of responding to them.",
    image: mindfulnessImg,
    imageAlt: "Mindfulness-based therapy session building emotional awareness",
  },
  {
    title: "Nutritional Therapy",
    description:
      "Nutrition plays a crucial role in overall health and well-being, including during the recovery process. Some de-addiction programs now incorporate nutritional counselling and education to help individuals restore physical health, balance neurotransmitter levels, and reduce cravings.",
    image: nutritionalImg,
    imageAlt: "Nutritional therapy guidance supporting physical health restoration",
  },
  {
    title: "Trauma-Informed Care",
    description:
      "Many individuals struggling with addiction have experienced trauma in their lives, which can contribute to the development of substance use disorders. Trauma-informed care approaches recognize the impact of trauma on addiction and emphasize creating a safe, supportive, and empowering environment for healing.",
    image: traumaImg,
    imageAlt: "Trauma-informed care and compassionate healing in a safe environment",
  },
  {
    title: "Medication Development and Personalized Treatment",
    description:
      "Ongoing research into pharmacological treatments for addiction is leading to the development of new medications and personalized treatment approaches tailored to individual needs and genetic factors. This includes medications targeting specific neurotransmitter systems involved in addiction, as well as genetic testing to inform treatment decisions.",
    image: medicationDevImg,
    imageAlt: "Personalized medicine and pharmacological treatment for addiction recovery",
  },
  {
    title: "Culturally Tailored Interventions",
    description:
      "Recognizing the importance of cultural factors in addiction treatment, there is a growing emphasis on developing interventions that are culturally sensitive and relevant to diverse populations. This includes incorporating cultural traditions, beliefs, and values into treatment approaches to better engage and support individuals from different backgrounds.",
    image: culturalImg,
    imageAlt: "Culturally tailored addiction intervention respecting diverse traditions",
  },
];

export default function DeAddictionServicesPage() {
  return (
    <main id="main-content" className="bg-white">
      {/* ================================================================ */}
      {/* 1. HERO SECTION                                                  */}
      {/* ================================================================ */}
      <section
        aria-labelledby="deaddiction-hero-heading"
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
                De-addiction Services
              </li>
            </ol>
          </nav>

          <p className="text-xs font-semibold tracking-[0.2em] text-accent-soft uppercase">
            Wellness &amp; Mental Health
          </p>

          <h1
            id="deaddiction-hero-heading"
            className="mt-5 max-w-3xl font-heading text-4xl leading-tight font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            De-addiction Services
          </h1>

          <p className="mt-5 max-w-2xl font-description text-base leading-relaxed font-medium text-white/80 sm:text-lg">
            De-addiction services help individuals overcome substance and
            behavioural addictions through treatment and support.
          </p>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 2. PHILOSOPHY & INTRO CONTENT                                    */}
      {/* ================================================================ */}
      <section
        aria-labelledby="deaddiction-intro-heading"
        className="shell pt-14 pb-0 sm:pt-16 lg:pt-20"
      >
        <div className="max-w-4xl">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold tracking-[0.2em] text-accent-ink uppercase">
              Our Recovery Philosophy
            </span>
            <div className="h-0.5 w-10 bg-accent/40" />
          </div>

          <h2
            id="deaddiction-intro-heading"
            className="mt-3 font-heading text-2xl font-bold tracking-tight text-forest sm:text-3xl lg:text-4xl"
          >
            Compassionate, evidence-based paths to lasting recovery.
          </h2>

          <div className="mt-6 space-y-4 font-description text-base leading-[1.85] font-medium text-muted sm:text-lg">
            <p>
              De-addiction services encompass a range of treatments and support
              systems aimed at helping individuals overcome addiction to substances
              such as drugs or alcohol, as well as behavioural addictions like
              gambling or internet addiction. Here are some common types of
              de-addiction services. These services can be tailored to meet the
              individual needs of each person seeking help for addiction, and a
              combination of approaches is often most effective in supporting
              long-term recovery.
            </p>
            <p>
              In recent years, there has been a growing recognition of the need
              for innovative and comprehensive approaches to addiction treatment.
              Overall, the field of addiction treatment continues to evolve,
              with an increasing focus on holistic, evidence-based, and
              personalized approaches to support recovery and improve outcomes
              for individuals struggling with addiction.
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 3. DE-ADDICTION SERVICES CARDS GRID                              */}
      {/* ================================================================ */}
      <section
        aria-label="De-addiction services and treatment modalities"
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
            Comprehensive De-addiction &amp; Recovery Services
          </h2>
          <p className="mt-2 font-description text-base font-medium text-muted max-w-2xl">
            Evidence-based medical, psychological, and holistic approaches
            tailored to support individuals and families through every stage of
            recovery.
          </p>
        </div>

        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {deAddictionServices.map((service, idx) => (
            <article
              key={idx}
              className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-[0_2px_8px_rgba(23,63,53,0.04),0_12px_24px_-16px_rgba(23,63,53,0.1)] transition-all duration-300 hover:shadow-[0_16px_36px_-12px_rgba(23,63,53,0.18)] hover:border-accent/40"
            >
              {/* Image Frame */}
              <div className="border-b border-line rounded-b-3xl p-3.5 sm:p-4">
                <Image
                  src={service.image}
                  alt={service.imageAlt}
                  sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 92vw"
                  className="aspect-[16/10] w-full rounded-2xl object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <h3 className="font-heading text-xl font-bold text-forest transition-colors group-hover:text-accent-ink">
                  {service.title}
                </h3>

                <p className="mt-3 font-description text-sm leading-relaxed font-medium text-muted flex-1">
                  {service.description}
                </p>

                <div className="mt-6 pt-5 border-t border-line/60 flex items-center justify-between">
                  <Link
                    href={`/contact/?service=${encodeURIComponent(service.title)}`}
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
      {/* 4. CALL TO ACTION SECTION (FROM REFERENCE WEBSITE)               */}
      {/* ================================================================ */}
      <CTA />
    </main>
  );
}

