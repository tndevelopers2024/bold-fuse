import CTA from "@/components/editorial/CTA";
import { pageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

// Parenting images from local assets
import positiveReinforcementImg from "@/assets/services/parenting/positive-reinforcement.jpeg";
import settingClearExpectationsImg from "@/assets/services/parenting/setting-clear-expectations-and-limits.jpeg";
import consistentDisciplineImg from "@/assets/services/parenting/consistent-discipline.jpeg";
import activeListeningImg from "@/assets/services/parenting/active-listening.jpeg";
import modelingBehaviorImg from "@/assets/services/parenting/modeling-behavior.jpeg";
import encouragingIndependenceImg from "@/assets/services/parenting/encouraging-independence.jpeg";
import emotionalSupportImg from "@/assets/services/parenting/emotional-support.jpeg";
import effectiveCommunicationImg from "@/assets/services/parenting/effective-communication.jpeg";
import qualityTimeImg from "@/assets/services/parenting/quality-time-together.jpeg";
import adaptabilityImg from "@/assets/services/parenting/adaptability.jpeg";

export const metadata: Metadata = pageMetadata({
  title: "Parenting",
  description:
    "Parenting techniques are tools and strategies that parents can use to effectively guide, support, and nurture their children’s development.",
  alternates: { canonical: "/parenting/" },
});

const parentingTechniques = [
  {
    title: "Positive Reinforcement",
    description:
      "This technique involves praising or rewarding children for desired behaviors. Positive reinforcement can include verbal praise, stickers, privileges, or other incentives. By rewarding positive behaviors, parents encourage their children to continue behaving in similar ways.",
    image: positiveReinforcementImg,
    imageAlt: "Parent praising and encouraging child with positive reinforcement",
  },
  {
    title: "Setting Clear Expectations and Limits",
    description:
      "Establishing clear expectations and boundaries helps children understand what is expected of them and what behaviors are acceptable. Consistency is key in enforcing these expectations, as it provides children with a sense of structure and predictability.",
    image: settingClearExpectationsImg,
    imageAlt: "Parent setting clear boundaries and positive expectations with child",
  },
  {
    title: "Consistent Discipline",
    description:
      "Discipline involves teaching children appropriate behavior and setting consequences for misbehavior. Effective discipline techniques include time-outs, loss of privileges, logical consequences, and positive reinforcement of desired behaviors. It’s important for parents to remain calm and consistent when enforcing discipline.",
    image: consistentDisciplineImg,
    imageAlt: "Calm and consistent guidance and discipline between parent and child",
  },
  {
    title: "Active Listening",
    description:
      "Active listening involves fully engaging with and understanding what children are saying. Parents can demonstrate active listening by maintaining eye contact, nodding, summarizing what their children have said, and validating their feelings. This technique helps strengthen the parent-child bond and encourages open communication.",
    image: activeListeningImg,
    imageAlt: "Parent actively listening and attentively connecting with child",
  },
  {
    title: "Modeling Behavior",
    description:
      "Parents serve as role models for their children, so it’s important for them to demonstrate the behaviors they want to see in their children. Modeling kindness, empathy, respect, and problem-solving skills teaches children valuable life lessons and encourages them to emulate positive behaviors.",
    image: modelingBehaviorImg,
    imageAlt: "Parent demonstrating positive behavior and empathy as a role model",
  },
  {
    title: "Encouraging Independence",
    description:
      "Encouraging independence helps children develop confidence, problem-solving skills, and a sense of responsibility. Parents can foster independence by allowing their children to make age-appropriate choices, encouraging them to solve their own problems, and providing opportunities for them to learn new skills.",
    image: encouragingIndependenceImg,
    imageAlt: "Child developing confidence and problem-solving independence",
  },
  {
    title: "Emotional Support",
    description:
      "Providing emotional support involves validating children’s feelings, empathizing with their experiences, and offering comfort and reassurance during difficult times. Parents can create a safe and supportive environment where children feel comfortable expressing their emotions and seeking help when needed.",
    image: emotionalSupportImg,
    imageAlt: "Parent comforting child with warmth and empathetic emotional support",
  },
  {
    title: "Effective Communication",
    description:
      "Effective communication involves expressing thoughts, feelings, and expectations clearly and respectfully. Parents can improve communication with their children by using active listening skills, speaking calmly and assertively, and avoiding criticism or judgment.",
    image: effectiveCommunicationImg,
    imageAlt: "Open and respectful communication between parent and child",
  },
  {
    title: "Quality Time Together",
    description:
      "Spending quality time together strengthens the parent-child bond and creates lasting memories. Parents can engage in activities that their children enjoy, such as playing games, reading books, going for walks, or cooking together. Quality time allows parents to connect with their children and show them love and support.",
    image: qualityTimeImg,
    imageAlt: "Parent and child sharing joyful quality time together",
  },
  {
    title: "Adaptability",
    description:
      "Parenting techniques may need to be adjusted based on the individual needs and temperament of each child. Being flexible and adaptable allows parents to tailor their approach to meet their children’s changing developmental stages and challenges.",
    image: adaptabilityImg,
    imageAlt: "Flexible and adaptable parenting approach tailored to child's needs",
  },
];

export default function ParentingPage() {
  return (
    <main id="main-content" className="bg-white">
      {/* ================================================================ */}
      {/* 1. HERO SECTION                                                  */}
      {/* ================================================================ */}
      <section
        aria-labelledby="parenting-hero-heading"
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
                Parenting
              </li>
            </ol>
          </nav>

          <p className="text-xs font-semibold tracking-[0.2em] text-accent-soft uppercase">
            Wellness &amp; Mental Health
          </p>

          <h1
            id="parenting-hero-heading"
            className="mt-5 max-w-3xl font-heading text-4xl leading-tight font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Parenting
          </h1>

          <p className="mt-5 max-w-2xl font-description text-base leading-relaxed font-medium text-white/80 sm:text-lg">
            Parenting techniques are tools and strategies that parents can use to
            effectively guide, support, and nurture their children’s development.
          </p>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 2. PHILOSOPHY & INTRO CONTENT                                    */}
      {/* ================================================================ */}
      <section
        aria-labelledby="parenting-intro-heading"
        className="shell pt-14 pb-0 sm:pt-16 lg:pt-20"
      >
        <div className="max-w-4xl">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold tracking-[0.2em] text-accent-ink uppercase">
              Our Parenting Philosophy
            </span>
            <div className="h-0.5 w-10 bg-accent/40" />
          </div>

          <h2
            id="parenting-intro-heading"
            className="mt-3 font-heading text-2xl font-bold tracking-tight text-forest sm:text-3xl lg:text-4xl"
          >
            From parenting stress to family smiles.
          </h2>

          <div className="mt-6 space-y-4 font-description text-base leading-[1.85] font-medium text-muted sm:text-lg">
            <p>
              By incorporating these parenting techniques into their daily
              interactions with their children, parents can promote positive
              behaviour, foster healthy development, and build strong, trusting
              relationships with their children. Parenting is not about achieving
              perfection; it is about building meaningful connection, offering
              consistent warmth, and providing a secure foundation where children feel
              heard and valued.
            </p>
            <p>
              Every child has a unique personality, emotional pace, and set of
              developmental needs. As children transition through different
              milestones—from early childhood to adolescent self-discovery—parents
              frequently encounter unexpected behavioral challenges, emotional
              storms, and communication hurdles. Having structured, evidence-based
              tools helps parents respond with calm authority rather than reactive
              frustration.
            </p>
            <p>
              Our parenting guidance emphasizes empathetic communication, clear
              boundaries, and emotional regulation. By equipping families with
              practical coping mechanisms and proactive parenting strategies, we
              help create home environments grounded in mutual respect, resilience,
              and lasting family harmony.
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 3. PARENTING TECHNIQUES CARDS GRID                               */}
      {/* ================================================================ */}
      <section
        aria-label="Parenting techniques and guidance"
        className="shell pt-14 pb-16 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-28"
      >
        <div className="border-b border-line pb-6 mb-10">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold tracking-[0.2em] text-accent-ink uppercase">
              Specialized Guidance
            </span>
            <div className="h-0.5 w-10 bg-accent/40" />
          </div>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-forest sm:text-4xl">
            Common Techniques of Parenting
          </h2>
          <p className="mt-2 font-description text-base font-medium text-muted max-w-2xl">
            Practical, evidence-informed strategies to nurture healthy
            development, strengthen bonds, and guide children with confidence
            and care.
          </p>
        </div>

        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {parentingTechniques.map((technique, idx) => (
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

