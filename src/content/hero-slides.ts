import bannerHealthcare from "@/assets/banner-healthcare-light-v3.png";
import bannerStrategy from "@/assets/banner-strategy-light-v3.png";
import bannerGrowth from "@/assets/banner-growth-light-v3.png";
import { home } from "./home";
import type { HeroSlide } from "./types";

export const heroSlides = [
  {
    ...home.hero,
    image: bannerHealthcare,
    alt: "Illustrative light healthcare desk with a stethoscope and tablet on the right",
    route: "about",
    action: "learnMore",
  },
  {
    eyebrow: home.capabilities.eyebrow,
    title: home.capabilities.title,
    welcome: "Customized solutions",
    body: "Let us highlight your opportunities, address your challenges and power your growth.",
    image: bannerStrategy,
    alt: "Illustrative bright strategy workspace with a notebook on the right",
    route: "services",
    action: "learnMore",
  },
  {
    eyebrow: home.hero.eyebrow,
    title: home.cta.title,
    welcome: home.hero.welcome,
    body: home.cta.body,
    image: bannerGrowth,
    alt: "Illustrative growing plants arranged on the right",
    route: "contact",
    action: "getStarted",
  },
] as const satisfies readonly HeroSlide[];
