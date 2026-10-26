import type { StaticImageData } from "next/image";
import type { RouteKey } from "@/config/routes";
type Heading = { eyebrow: string; title: string };
type Item = { title: string; text: string };
export interface HomeContent {
  hero: Heading & {
    welcome: string;
    body: string;
    image: StaticImageData;
    alt: string;
  };
  capabilities: Heading & {
    image: StaticImageData;
    alt: string;
    items: readonly { title: string; tagline: string }[];
  };
  values: Heading & { items: readonly Item[] };
  process: Heading & { items: readonly Item[] };
  services: Heading & { items: readonly (Item & { route: RouteKey })[] };
  experience: {
    number: string;
    label: string;
    visionTitle: string;
    vision: string;
    missionTitle: string;
    mission: string;
  };
  clients: Heading & {
    label: string;
    number?: string;
    items: readonly { name: string; image: StaticImageData }[];
    quotes: readonly { name: string; text: string }[];
  };
  cta: { title: string; body: string };
  blog: Heading & {
    items: readonly {
      title: string;
      category: string;
      excerpt: string;
      route: RouteKey;
      image: StaticImageData;
    }[];
  };
}
