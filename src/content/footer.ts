import type { RouteKey } from "@/config/routes";
import { site } from "./site";

export const footerContent = {
  company: site.quickLinks,
  services: "Our services",
  explore: "Explore Boldfuse",
  resources: "From our blog",
  legal: "Legal",
  backToTop: "Back to top",
  sections: [
    { label: "About us", id: "about" },
    { label: "Our values", id: "values" },
    { label: "Vision & mission", id: "experience" },
    { label: "Our clients", id: "clients" },
    { label: "Testimonials", id: "testimonials" },
    { label: "Latest articles", id: "blog" },
    { label: "FAQs", id: "faq" },
  ],
  articles: ["mentalHealth", "workplace"],
} as const satisfies {
  company: string;
  services: string;
  explore: string;
  resources: string;
  legal: string;
  backToTop: string;
  sections: readonly { label: string; id: string }[];
  articles: readonly RouteKey[];
};
