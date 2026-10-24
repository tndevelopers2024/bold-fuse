"use client";
import { home } from "@/content/home";
import { services } from "@/content/editorial/data";
import SectionHeading from "./SectionHeading";
import ServiceCard from "./ServiceCard";
import Button from "./Button";
import Reveal, { RevealGroup, RevealItem } from "./Reveal";
import SwipeArea from "./SwipeArea";

export default function Services({ withCta = true, background = "bg-white" }) {
  return (
    <section
      id="services"
      className={`section relative overflow-hidden ${background}`}
    >
      <div className="mx-auto w-full max-w-[92rem] px-5 sm:px-8 lg:px-12">
        <SectionHeading
          prominent
          title={home.services.eyebrow}
          lede={"Practical expertise to strengthen your people, processes and healthcare business.\nExplore solutions that simplify operations and support lasting growth."}
        />

        <SwipeArea className="mt-8 sm:mt-10 lg:mt-12">
          <RevealGroup
            className="swipe-mobile grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
            stagger={0.08}
            amount={0.12}
          >
            {services.map((service, index) => (
              <RevealItem
                key={service.slug}
                className={
                  index === services.length - 1
                    ? "h-full sm:col-span-2 lg:col-span-3"
                    : "h-full"
                }
                y={32}
                scale={0.97}
              >
                <ServiceCard
                  service={service}
                  featured={index === services.length - 1}
                />
              </RevealItem>
            ))}
          </RevealGroup>
        </SwipeArea>

        {withCta && (
          <Reveal y={16} className="mt-8 flex justify-center sm:mt-10 lg:mt-12">
            <Button to="/services/" variant="secondary" withArrow={false}>
              View All Services
            </Button>
          </Reveal>
        )}
      </div>
    </section>
  );
}
