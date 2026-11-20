"use client";

import { home } from "@/content/home";
import BlogLoop from "./BlogLoop";
import Hero from "./Hero";
import About from "./About";
import Services from "./Services";
import Stats from "./Stats";
import Values from "./Values";
import CTA from "./CTA";
import FAQ from "./FAQ";
import ScrollProgress from "./ScrollProgress";
import SectionHeading from "./SectionHeading";
import ClientLoops from "./ClientLoops";
import Button from "./Button";

export default function EditorialHome() {
  return (
    <main id="main-content">
      <ScrollProgress />
      <Hero />
      <About />
      <Stats />
      <Services background="bg-white" />
      <Values />
      <section id="clients" className="section bg-white">
        <div className="shell">
          <SectionHeading
            prominent
            eyebrow={home.clients.eyebrow}
            title={home.clients.title}
            lede={"Relationships built through collaboration, practical support and shared progress.\nHear from the businesses and teams we have worked alongside."}
          />
          <ClientLoops clients={home.clients.items} quotes={home.clients.quotes} />
        </div>
      </section>
      <section id="blog" className="section bg-white">
        <div className="shell">
          <SectionHeading
            prominent
            eyebrow={home.blog.eyebrow}
            title={home.blog.title}
            lede={"Fresh perspectives on healthcare, leadership and business growth.\nExplore practical ideas to help you take your next step."}
          />
          <BlogLoop />
          <div className="mt-10 flex justify-center">
            <Button to="/blogs/" variant="secondary">
              All Articles
            </Button>
          </div>
        </div>
      </section>
      <FAQ />
      <CTA id="contact" />
    </main>
  );
}
