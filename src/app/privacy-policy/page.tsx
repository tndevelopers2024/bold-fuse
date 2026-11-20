import CTA from "@/components/editorial/CTA";
import { pageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Lock, FileText, UserCheck, Eye, Cookie, ExternalLink, Clock, Scale, Baby, RefreshCw, Mail, Phone, MapPin, Globe, CheckCircle2, Calendar } from "lucide-react";
import { site } from "@/content/site";
import { siteUrl } from "@/config/site";
import { routes } from "@/config/routes";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "Learn how Boldfuse collects, uses, and safeguards personal data in strict compliance with the Digital Personal Data Protection Act, 2023 (DPDP Act) and applicable Indian regulations.",
  alternates: { canonical: "/privacy-policy/" },
  openGraph: {
    title: "Privacy Policy | Boldfuse",
    description:
      "Our commitment to privacy, data security, and confidentiality in healthcare consulting and counselling services.",
    url: new URL("/privacy-policy/", siteUrl).href,
    siteName: site.name,
    locale: "en_IN",
    type: "website",
  },
});

const sections = [
  { id: "introduction", label: "1. Introduction" },
  { id: "information-we-collect", label: "2. Information We Collect" },
  { id: "how-we-use-information", label: "3. How We Use Information" },
  { id: "information-sharing", label: "4. Sharing & Disclosure" },
  { id: "data-protection", label: "5. Security & Protection" },
  { id: "cookies-tracking", label: "6. Cookies & Technologies" },
  { id: "third-party-links", label: "7. Third-Party Links" },
  { id: "data-retention", label: "8. Data Retention" },
  { id: "your-privacy-rights", label: "9. Your Privacy Rights" },
  { id: "childrens-privacy", label: "10. Children's Privacy" },
  { id: "policy-changes", label: "11. Policy Changes" },
  { id: "contact-us", label: "12. Contact & Grievance" },
];

export default function PrivacyPolicyPage() {
  return (
    <main id="main-content" className="bg-white">
      {/* ================================================================ */}
      {/* 1. HERO SECTION                                                  */}
      {/* ================================================================ */}
      <section
        aria-labelledby="privacy-hero-heading"
        className="shell pt-8 pb-0 sm:pt-12"
      >
        <div className="page-hero relative isolate overflow-hidden rounded-3xl bg-forest-surface px-6 text-white sm:px-12 lg:px-16">
          {/* Subtle flowing SVG decoration — approved site direction */}
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
                  href={routes.home.path}
                  className="transition-colors hover:text-white"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-white/40">
                ›
              </li>
              <li className="font-semibold text-white/95" aria-current="page">
                Privacy Policy
              </li>
            </ol>
          </nav>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold tracking-[0.2em] text-accent-soft uppercase">
              Legal, Compliance & Trust
            </span>
            <div className="h-0.5 w-10 bg-accent-soft/40" />
          </div>

          <h1
            id="privacy-hero-heading"
            className="mt-4 font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            Privacy Policy
          </h1>

          <p className="mt-4 max-w-3xl font-description text-base leading-relaxed font-medium text-white/80 sm:text-lg">
            At Boldfuse, trust, confidentiality, and data protection are fundamental
            to how we partner with leaders, healthcare professionals, and
            individuals. This policy explains transparently how your personal
            information is collected, processed, and safeguarded.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3 text-xs font-medium text-white/75 sm:gap-6">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-accent-soft">
              <Calendar size={14} aria-hidden="true" />
              Last Updated: November 10, 2026
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Scale size={14} className="text-accent-soft" aria-hidden="true" />
              Compliant with the Digital Personal Data Protection Act, 2023 (India)
            </span>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 2. MAIN POLICY CONTENT LAYOUT                                     */}
      {/* ================================================================ */}
      <section className="shell pt-12 pb-20 sm:pt-16 sm:pb-28">
        <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-14">
          {/* Sticky Table of Contents Sidebar (Desktop) */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-4">
              <div className="rounded-2xl border border-line bg-white p-5 shadow-xs">
                <p className="text-xs font-bold tracking-wider text-forest uppercase">
                  Table of Contents
                </p>
                <div className="mt-1 h-0.5 w-8 bg-accent/40" />
                <nav
                  aria-label="Table of contents"
                  className="mt-4 flex flex-col space-y-1.5 text-sm"
                >
                  {sections.map((sec) => (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      className="rounded-lg px-2.5 py-1.5 font-description text-xs font-medium text-muted transition-colors hover:bg-cream hover:text-forest"
                    >
                      {sec.label}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Quick Contact Badge */}
              <div className="rounded-2xl border border-line bg-cream/40 p-5 text-xs text-muted">
                <p className="font-bold text-forest">Need Privacy Assistance?</p>
                <p className="mt-1.5 leading-relaxed font-medium">
                  Direct questions regarding your personal data to our privacy team.
                </p>
                <a
                  href={`mailto:${site.email}`}
                  className="mt-3 inline-flex items-center gap-1.5 font-bold text-accent-ink hover:underline"
                >
                  <Mail size={13} aria-hidden="true" />
                  {site.email}
                </a>
              </div>
            </div>
          </aside>

          {/* Policy Text Articles */}
          <div className="space-y-14">
            {/* 1. Introduction */}
            <article id="introduction" className="scroll-mt-28 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent-ink">
                  <FileText size={18} aria-hidden="true" />
                </div>
                <h2 className="font-heading text-2xl font-bold tracking-tight text-forest sm:text-3xl">
                  1. Introduction
                </h2>
              </div>

              <div className="space-y-4 font-description text-base leading-relaxed font-medium text-muted">
                <p>
                  Welcome to <strong>Boldfuse</strong> (&ldquo;we,&rdquo; &ldquo;our,&rdquo;
                  or &ldquo;us&rdquo;), accessible online via{" "}
                  <a
                    href="https://bold-fuse.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-accent-ink hover:underline"
                  >
                    https://bold-fuse.vercel.app/
                  </a>{" "}
                  and{" "}
                  <span className="font-semibold text-forest">boldfuse.in</span>.
                  Boldfuse operates as a dedicated partner in healthcare
                  leadership, hospital process excellence, people learning
                  management, and specialized psychological counselling and testing
                  services across India.
                </p>
                <p>
                  We recognize that whether you are an individual consulting us for
                  mental wellness or a healthcare executive exploring organizational
                  productivity, the privacy and confidentiality of your personal
                  data are of the utmost significance. This Privacy Policy outlines
                  our practices regarding the collection, processing, storage, and
                  safeguarding of personal data provided through our digital
                  interfaces, online forms, booking mechanisms, and general website
                  interactions.
                </p>
                <p>
                  This policy has been designed in strict accordance with applicable
                  Indian data protection legislations, including the{" "}
                  <strong>Digital Personal Data Protection Act, 2023 (DPDP Act)</strong>,
                  the Information Technology Act, 2000, and the Information
                  Technology (Reasonable Security Practices and Procedures and
                  Sensitive Personal Data or Information) Rules, 2011.
                </p>
              </div>
            </article>

            {/* 2. Information We Collect */}
            <article id="information-we-collect" className="scroll-mt-28 space-y-4 border-t border-line/80 pt-10">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent-ink">
                  <UserCheck size={18} aria-hidden="true" />
                </div>
                <h2 className="font-heading text-2xl font-bold tracking-tight text-forest sm:text-3xl">
                  2. Information We Collect
                </h2>
              </div>

              <div className="space-y-4 font-description text-base leading-relaxed font-medium text-muted">
                <p>
                  We believe in the principle of <em>data minimization</em>. We
                  only collect personal data that is strictly relevant and necessary
                  to provide our services, respond to inquiries, and ensure seamless
                  technical functionality.
                </p>

                <h3 className="font-heading text-lg font-bold text-forest">
                  A. Information You Voluntarily Provide to Us
                </h3>
                <p>
                  When you interact with our website forms—such as the &ldquo;Let&apos;s
                  Talk&rdquo; inquiry modal, the contact page form, appointment
                  booking forms, or when you reach out directly via telephone,
                  email, or WhatsApp—we may collect:
                </p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    <strong>Identity Details:</strong> Your full name, preferred
                    salutation, or organizational affiliation.
                  </li>
                  <li>
                    <strong>Contact Details:</strong> Your email address, telephone
                    or mobile phone number (including country code), and general
                    geographic location.
                  </li>
                  <li>
                    <strong>Inquiry & Message Content:</strong> Specific details,
                    questions, requirements, or context that you include in your
                    message or booking request.
                  </li>
                  <li>
                    <strong>Appointment Preferences:</strong> Selected service
                    category (e.g., Anxiety Counselling, Therapy, Psychological
                    Testing, Healthcare Process Excellence), preferred consultation
                    dates, and times.
                  </li>
                </ul>

                <div className="rounded-2xl border border-line bg-cream/30 p-5">
                  <p className="font-heading text-sm font-bold text-forest">
                    Clarification on Clinical & Medical Data
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed">
                    Our public website inquiry forms collect preliminary contact and
                    scheduling details only. In-depth clinical assessments, patient
                    case histories, and psychological evaluation notes are gathered
                    solely during formal, private consultations with our licensed
                    mental health professionals under strict practitioner-client
                    confidentiality and medical professional ethics.
                  </p>
                </div>

                <h3 className="pt-2 font-heading text-lg font-bold text-forest">
                  B. Technical & Browsing Data (Collected Automatically)
                </h3>
                <p>
                  When you visit and navigate our website, our hosting
                  infrastructure (Vercel) automatically logs standard, non-personally
                  identifying technical data necessary for transmitting web pages:
                </p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>Internet Protocol (IP) address.</li>
                  <li>Browser type, engine version, and device operating system.</li>
                  <li>Date, time, and duration of page requests.</li>
                  <li>Uniform Resource Locators (URLs) requested and referring web pages.</li>
                </ul>

                <h3 className="pt-2 font-heading text-lg font-bold text-forest">
                  C. Information We Do Not Collect
                </h3>
                <p>
                  We do not collect financial account numbers, credit/debit card
                  numbers, or biometric information through this website. We do
                  not execute online financial transactions directly on this
                  informational platform.
                </p>
              </div>
            </article>

            {/* 3. How We Use Your Information */}
            <article id="how-we-use-information" className="scroll-mt-28 space-y-4 border-t border-line/80 pt-10">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent-ink">
                  <Eye size={18} aria-hidden="true" />
                </div>
                <h2 className="font-heading text-2xl font-bold tracking-tight text-forest sm:text-3xl">
                  3. How We Use Your Information
                </h2>
              </div>

              <div className="space-y-4 font-description text-base leading-relaxed font-medium text-muted">
                <p>
                  We process personal data only for lawful, transparent, and defined
                  purposes. Specifically, your data is used for:
                </p>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-line/80 bg-white p-4">
                    <p className="font-heading text-sm font-bold text-forest">
                      Responding to Enquiries
                    </p>
                    <p className="mt-1 text-xs leading-relaxed">
                      Reviewing your questions and contacting you via phone, email,
                      or WhatsApp with pertinent information and answers.
                    </p>
                  </div>
                  <div className="rounded-xl border border-line/80 bg-white p-4">
                    <p className="font-heading text-sm font-bold text-forest">
                      Service Provision & Scheduling
                    </p>
                    <p className="mt-1 text-xs leading-relaxed">
                      Coordinating and confirming clinical appointments, workshops,
                      hospital advisory sessions, and leadership programs.
                    </p>
                  </div>
                  <div className="rounded-xl border border-line/80 bg-white p-4">
                    <p className="font-heading text-sm font-bold text-forest">
                      Website Operations & Safety
                    </p>
                    <p className="mt-1 text-xs leading-relaxed">
                      Maintaining website uptime, monitoring performance, mitigating
                      spam, and preventing cyber intrusions or DDoS attacks.
                    </p>
                  </div>
                  <div className="rounded-xl border border-line/80 bg-white p-4">
                    <p className="font-heading text-sm font-bold text-forest">
                      Statutory Compliance
                    </p>
                    <p className="mt-1 text-xs leading-relaxed">
                      Fulfilling regulatory, statutory, and legal obligations
                      established under applicable laws of the Republic of India.
                    </p>
                  </div>
                </div>

                <p>
                  We do not use your personal information for automated
                  decision-making, behavioral profiling, or unsolicited third-party
                  telemarketing.
                </p>
              </div>
            </article>

            {/* 4. Information Sharing and Disclosure */}
            <article id="information-sharing" className="scroll-mt-28 space-y-4 border-t border-line/80 pt-10">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent-ink">
                  <Lock size={18} aria-hidden="true" />
                </div>
                <h2 className="font-heading text-2xl font-bold tracking-tight text-forest sm:text-3xl">
                  4. Information Sharing and Disclosure
                </h2>
              </div>

              <div className="space-y-4 font-description text-base leading-relaxed font-medium text-muted">
                <div className="rounded-2xl border border-accent/30 bg-accent/5 p-4 text-forest">
                  <p className="font-heading text-sm font-bold text-accent-ink">
                    Our Unconditional Promise: We Never Sell Your Data
                  </p>
                  <p className="mt-1 text-sm font-medium">
                    Boldfuse has never sold, rented, leased, traded, or commercialized
                    personal data to data brokers, advertising networks, or any
                    third-party entities. We never will.
                  </p>
                </div>

                <p>
                  Your information is disclosed strictly on a limited, need-to-know
                  basis under the following defined circumstances:
                </p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    <strong>Internal Professional Staff:</strong> Authorized
                    clinicians, therapists, consultants, and administrative staff
                    who require access to respond to your inquiry or fulfill your
                    engagement, all bound by strict non-disclosure obligations.
                  </li>
                  <li>
                    <strong>Vetted Infrastructure Providers:</strong> Trusted technical
                    service providers (such as Vercel for website hosting and secure
                    corporate email providers) who process data strictly under our
                    direction and subject to confidentiality agreements.
                  </li>
                  <li>
                    <strong>Legal & Law Enforcement Obligations:</strong> If
                    compelled by a valid judicial court order, subpoena, law
                    enforcement request, or statutory mandate under Indian law.
                  </li>
                  <li>
                    <strong>Protection of Vital Interests:</strong> In grave
                    emergency circumstances to prevent physical harm, safeguard the
                    safety of an individual, or protect the integrity and security
                    of our website and services.
                  </li>
                </ul>
              </div>
            </article>

            {/* 5. Data Protection and Security */}
            <article id="data-protection" className="scroll-mt-28 space-y-4 border-t border-line/80 pt-10">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent-ink">
                  <ShieldCheck size={18} aria-hidden="true" />
                </div>
                <h2 className="font-heading text-2xl font-bold tracking-tight text-forest sm:text-3xl">
                  5. Data Protection and Security
                </h2>
              </div>

              <div className="space-y-4 font-description text-base leading-relaxed font-medium text-muted">
                <p>
                  We implement robust technical and organizational security measures
                  designed to safeguard your personal data against unauthorized
                  access, accidental loss, destruction, alteration, or disclosure.
                </p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    <strong>End-to-End Encryption in Transit:</strong> All web
                    traffic between your browser and our servers is secured using
                    industry-standard 256-bit Transport Layer Security (TLS/HTTPS).
                  </li>
                  <li>
                    <strong>Hardened HTTP Security Headers:</strong> Our production
                    deployment enforces HTTP Strict Transport Security (HSTS),
                    X-Content-Type-Options: nosniff, X-Frame-Options: DENY, and
                    strict Content Security Policies (CSP).
                  </li>
                  <li>
                    <strong>Access Control & Least Privilege:</strong> Administrative
                    access to server logs, email systems, and inquiries is restricted
                    strictly to authenticated personnel via multi-factor
                    authentication (MFA).
                  </li>
                </ul>
                <p className="text-sm italic">
                  Please note that while we adhere to recognized industry standards,
                  no method of electronic transmission over the internet or method
                  of electronic storage is completely infallible. We encourage users
                  to maintain discretion when transmitting sensitive personal
                  information online.
                </p>
              </div>
            </article>

            {/* 6. Cookies and Tracking Technologies */}
            <article id="cookies-tracking" className="scroll-mt-28 space-y-4 border-t border-line/80 pt-10">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent-ink">
                  <Cookie size={18} aria-hidden="true" />
                </div>
                <h2 className="font-heading text-2xl font-bold tracking-tight text-forest sm:text-3xl">
                  6. Cookies and Tracking Technologies
                </h2>
              </div>

              <div className="space-y-4 font-description text-base leading-relaxed font-medium text-muted">
                <p>
                  We take pride in maintaining a clean, privacy-first web
                  experience:
                </p>
                <div className="rounded-2xl border border-line bg-white p-5">
                  <ul className="space-y-2.5">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2
                        size={18}
                        className="mt-0.5 shrink-0 text-accent-ink"
                        aria-hidden="true"
                      />
                      <span>
                        <strong>No Advertising or Tracking Cookies:</strong> We do
                        not use third-party advertising cookies, cross-site trackers,
                        or retargeting pixels (e.g., Meta Pixel, Google Ads).
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2
                        size={18}
                        className="mt-0.5 shrink-0 text-accent-ink"
                        aria-hidden="true"
                      />
                      <span>
                        <strong>Essential Technical Cookies Only:</strong> Transient
                        session cookies or edge cache tokens may be set by our hosting
                        platform (Vercel) solely to ensure proper page routing, load
                        balancing, and network reliability.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2
                        size={18}
                        className="mt-0.5 shrink-0 text-accent-ink"
                        aria-hidden="true"
                      />
                      <span>
                        <strong>Full User Control:</strong> You can configure your
                        browser to refuse cookies or alert you when cookies are being
                        sent. Disabling essential cookies may impact technical
                        navigation.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </article>

            {/* 7. Third-Party Links */}
            <article id="third-party-links" className="scroll-mt-28 space-y-4 border-t border-line/80 pt-10">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent-ink">
                  <ExternalLink size={18} aria-hidden="true" />
                </div>
                <h2 className="font-heading text-2xl font-bold tracking-tight text-forest sm:text-3xl">
                  7. Third-Party Links & External Platforms
                </h2>
              </div>

              <div className="space-y-4 font-description text-base leading-relaxed font-medium text-muted">
                <p>
                  Our website may feature links to external third-party services and
                  communication channels, including:
                </p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>WhatsApp (wa.me) for instant appointment scheduling.</li>
                  <li>Social media profiles (LinkedIn, Facebook, Instagram).</li>
                  <li>External email clients (mailto:) and telephonic links (tel:).</li>
                  <li>Map directions for visiting our Hyderabad physical office.</li>
                </ul>
                <p>
                  When you click on an external link or leave our website, you are
                  governed by the privacy practices and terms of service of those
                  third-party platforms. Boldfuse exercises no control over, and
                  assumes no responsibility for, the content, privacy policies, or
                  practices of any third-party websites or services. We encourage
                  you to inspect the respective policies of those platforms.
                </p>
              </div>
            </article>

            {/* 8. Data Retention */}
            <article id="data-retention" className="scroll-mt-28 space-y-4 border-t border-line/80 pt-10">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent-ink">
                  <Clock size={18} aria-hidden="true" />
                </div>
                <h2 className="font-heading text-2xl font-bold tracking-tight text-forest sm:text-3xl">
                  8. Data Retention
                </h2>
              </div>

              <div className="space-y-4 font-description text-base leading-relaxed font-medium text-muted">
                <p>
                  We retain personal data only for as long as is necessary to
                  satisfy the specific purposes for which it was gathered:
                </p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    <strong>General Inquiries:</strong> Contact messages and
                    inquiries submitted via forms are typically retained for 12 to
                    24 months to address ongoing communications, after which they
                    are purged or permanently anonymized.
                  </li>
                  <li>
                    <strong>Client & Consultation Records:</strong> Data relating to
                    established professional consulting or psychological counselling
                    engagements is retained in accordance with applicable medical
                    council guidelines, clinical standards, and statutory limitation
                    periods under Indian law.
                  </li>
                  <li>
                    <strong>Server Logs:</strong> Routine access logs generated by
                    our hosting provider are systematically rotated and erased
                    periodically (typically within 30 to 90 days).
                  </li>
                </ul>
                <p>
                  When personal data reaches the end of its retention lifecycle or
                  is no longer needed, it is deleted through secure digital erasure
                  or irreversible anonymization.
                </p>
              </div>
            </article>

            {/* 9. Your Privacy Rights */}
            <article id="your-privacy-rights" className="scroll-mt-28 space-y-4 border-t border-line/80 pt-10">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent-ink">
                  <Scale size={18} aria-hidden="true" />
                </div>
                <h2 className="font-heading text-2xl font-bold tracking-tight text-forest sm:text-3xl">
                  9. Your Privacy Rights (DPDP Act, 2023)
                </h2>
              </div>

              <div className="space-y-4 font-description text-base leading-relaxed font-medium text-muted">
                <p>
                  As a Data Principal under the{" "}
                  <strong>Digital Personal Data Protection Act, 2023 (India)</strong>,
                  you possess statutory rights concerning your personal information:
                </p>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-line bg-white p-4">
                    <p className="font-heading text-sm font-bold text-forest">
                      Right to Access
                    </p>
                    <p className="mt-1 text-xs leading-relaxed">
                      You have the right to request a summary of the personal data
                      being processed by Boldfuse and the identities of any entities
                      with whom it has been shared.
                    </p>
                  </div>

                  <div className="rounded-xl border border-line bg-white p-4">
                    <p className="font-heading text-sm font-bold text-forest">
                      Right to Correction & Update
                    </p>
                    <p className="mt-1 text-xs leading-relaxed">
                      You have the right to request the correction, completion, or
                      updating of inaccurate or incomplete personal data.
                    </p>
                  </div>

                  <div className="rounded-xl border border-line bg-white p-4">
                    <p className="font-heading text-sm font-bold text-forest">
                      Right to Erasure (Deletion)
                    </p>
                    <p className="mt-1 text-xs leading-relaxed">
                      You have the right to request the erasure of personal data that
                      is no longer necessary for the purpose for which it was
                      collected, unless retention is legally mandated.
                    </p>
                  </div>

                  <div className="rounded-xl border border-line bg-white p-4">
                    <p className="font-heading text-sm font-bold text-forest">
                      Right of Grievance Redressal
                    </p>
                    <p className="mt-1 text-xs leading-relaxed">
                      You have the right to readily access grievance redressal
                      mechanisms provided by Boldfuse regarding any data privacy
                      concern.
                    </p>
                  </div>

                  <div className="rounded-xl border border-line bg-white p-4">
                    <p className="font-heading text-sm font-bold text-forest">
                      Right to Withdraw Consent
                    </p>
                    <p className="mt-1 text-xs leading-relaxed">
                      Where processing is founded on your consent, you have the right
                      to withdraw that consent at any time without retroactive
                      penalty.
                    </p>
                  </div>

                  <div className="rounded-xl border border-line bg-white p-4">
                    <p className="font-heading text-sm font-bold text-forest">
                      Right to Nominate
                    </p>
                    <p className="mt-1 text-xs leading-relaxed">
                      You have the right to nominate an individual who, in the event
                      of your death or incapacity, shall exercise your privacy
                      rights.
                    </p>
                  </div>
                </div>

                <p className="pt-2">
                  <strong>How to Exercise Your Rights:</strong> To submit a formal
                  request, please email us at{" "}
                  <a
                    href={`mailto:${site.email}?subject=${encodeURIComponent("Data Privacy Request - DPDP Act")}`}
                    className="font-bold text-accent-ink hover:underline"
                  >
                    {site.email}
                  </a>{" "}
                  with the subject &ldquo;Data Privacy Request.&rdquo; We will review,
                  verify, and process your request within the statutory timeline
                  prescribed under Indian law (within 30 days).
                </p>
              </div>
            </article>

            {/* 10. Children's Privacy */}
            <article id="childrens-privacy" className="scroll-mt-28 space-y-4 border-t border-line/80 pt-10">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent-ink">
                  <Baby size={18} aria-hidden="true" />
                </div>
                <h2 className="font-heading text-2xl font-bold tracking-tight text-forest sm:text-3xl">
                  10. Children&apos;s Privacy
                </h2>
              </div>

              <div className="space-y-4 font-description text-base leading-relaxed font-medium text-muted">
                <p>
                  Boldfuse provides dedicated child, adolescent, and parenting
                  counselling services. However, our digital website and online
                  forms are strictly intended for adults and parents or legal
                  guardians.
                </p>
                <p>
                  In compliance with Section 9 of the DPDP Act, 2023, we do not
                  knowingly collect or process personal data from individuals under
                  the age of 18 without verifiable parental or guardian consent. All
                  consultations and booking inquiries for minors must be initiated,
                  consented to, and accompanied by a parent or legal guardian.
                </p>
                <p>
                  If you believe that a minor has provided us with personal data
                  without verifiable parental consent, please contact us immediately
                  at{" "}
                  <a
                    href={`mailto:${site.email}`}
                    className="font-semibold text-accent-ink hover:underline"
                  >
                    {site.email}
                  </a>
                  , and we will take immediate steps to delete such information from
                  our records.
                </p>
              </div>
            </article>

            {/* 11. Changes to This Privacy Policy */}
            <article id="policy-changes" className="scroll-mt-28 space-y-4 border-t border-line/80 pt-10">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent-ink">
                  <RefreshCw size={18} aria-hidden="true" />
                </div>
                <h2 className="font-heading text-2xl font-bold tracking-tight text-forest sm:text-3xl">
                  11. Changes to This Privacy Policy
                </h2>
              </div>

              <div className="space-y-4 font-description text-base leading-relaxed font-medium text-muted">
                <p>
                  We may periodically revise or update this Privacy Policy to
                  reflect technological updates, operational adjustments, or
                  evolving legal standards under Indian jurisprudence.
                </p>
                <p>
                  When amendments occur, we will revise the &ldquo;Last Updated&rdquo;
                  date at the top of this page. Material revisions will be highlighted
                  prominently on the website. We advise checking this page
                  periodically. Continued use of our website following the posting
                  of updates constitutes acceptance of the amended policy.
                </p>
              </div>
            </article>

            {/* 12. Contact Us & Grievance Officer */}
            <article id="contact-us" className="scroll-mt-28 space-y-4 border-t border-line/80 pt-10">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent-ink">
                  <Mail size={18} aria-hidden="true" />
                </div>
                <h2 className="font-heading text-2xl font-bold tracking-tight text-forest sm:text-3xl">
                  12. Contact Us & Grievance Redressal
                </h2>
              </div>

              <div className="space-y-4 font-description text-base leading-relaxed font-medium text-muted">
                <p>
                  If you have any questions, feedback, or concerns regarding this
                  Privacy Policy, or if you wish to exercise your statutory rights as
                  a Data Principal, please connect with us using the official
                  details below:
                </p>

                <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-xs">
                  <div className="border-b border-line bg-cream/40 p-6 sm:p-7">
                    <p className="text-xs font-bold tracking-widest text-accent-ink uppercase">
                      Official Contact Information
                    </p>
                    <h3 className="mt-1 font-heading text-xl font-bold text-forest">
                      {site.name} — Data Privacy & Compliance
                    </h3>
                  </div>

                  <div className="grid gap-6 p-6 sm:grid-cols-2 sm:p-8">
                    <div className="flex items-start gap-3.5">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-cream text-forest">
                        <Globe size={18} aria-hidden="true" />
                      </div>
                      <div>
                        <span className="block text-xs font-bold tracking-wider text-muted uppercase">
                          Website
                        </span>
                        <a
                          href="https://bold-fuse.vercel.app/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 block font-description font-semibold text-forest hover:text-accent-ink"
                        >
                          https://bold-fuse.vercel.app/
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-cream text-forest">
                        <Mail size={18} aria-hidden="true" />
                      </div>
                      <div>
                        <span className="block text-xs font-bold tracking-wider text-muted uppercase">
                          Email
                        </span>
                        <a
                          href={`mailto:${site.email}`}
                          className="mt-1 block font-description font-semibold text-forest hover:text-accent-ink"
                        >
                          {site.email}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-cream text-forest">
                        <Phone size={18} aria-hidden="true" />
                      </div>
                      <div>
                        <span className="block text-xs font-bold tracking-wider text-muted uppercase">
                          Telephone
                        </span>
                        <a
                          href={`tel:${site.telephone}`}
                          className="mt-1 block font-description font-semibold text-forest hover:text-accent-ink"
                        >
                          {site.phone}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-cream text-forest">
                        <MapPin size={18} aria-hidden="true" />
                      </div>
                      <div>
                        <span className="block text-xs font-bold tracking-wider text-muted uppercase">
                          Office Address
                        </span>
                        <address className="mt-1 font-description font-medium text-forest not-italic leading-relaxed">
                          Lanco Hills Road, Gachibowli,
                          <br />
                          Hyderabad – 500089, India
                        </address>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-line bg-cream/20 p-6 text-xs text-muted sm:px-8">
                    <p>
                      <strong>Designated Grievance Redressal:</strong> In
                      accordance with the Digital Personal Data Protection Act,
                      2023, you may escalate unresolved privacy concerns to our
                      Grievance Officer by marking your email to{" "}
                      <a
                        href={`mailto:${site.email}?subject=${encodeURIComponent("Attn: Grievance Officer - Data Privacy")}`}
                        className="font-bold text-accent-ink hover:underline"
                      >
                        {site.email}
                      </a>{" "}
                      with the subject line &ldquo;Attn: Grievance Officer.&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
      <CTA opensContactModal actionLabel="Get in Touch" secondaryHref={routes.home.path} secondaryLabel="Back to Home" />
    </main>
  );
}
