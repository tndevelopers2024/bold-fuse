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
    { label: "Capabilities", id: "capabilities" },
    { label: "Our values", id: "values" },
    { label: "Our process", id: "process" },
    { label: "Vision & mission", id: "experience" },
    { label: "Our clients", id: "clients" },
    { label: "Testimonials", id: "testimonials" },
    { label: "Latest articles", id: "blog" },
    { label: "FAQs", id: "faq" },
  ],
  articles: ["mentalHealth", "workplace"],
  brands: [
    { label: site.brands[0], route: "hello-marshmellowww" },
    { label: site.brands[1], route: "house-of-bold" },
  ],
} as const satisfies {
  company: string;
  services: string;
  explore: string;
  resources: string;
  legal: string;
  backToTop: string;
  sections: readonly { label: string; id: string }[];
  articles: readonly RouteKey[];
  brands: readonly { label: string; route: RouteKey }[];
};
