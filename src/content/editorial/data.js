import serviceImage0 from "@/assets/services/business-automation-v1.webp";
import serviceImage1 from "@/assets/services/wellness-mental-health-v1.webp";
import serviceImage2 from "@/assets/services/finance-advisory-v1.webp";
import serviceImage3 from "@/assets/services/creative-branding-v1.webp";
import serviceImage4 from "@/assets/services/process-excellence-v1.webp";
import serviceImage5 from "@/assets/services/legal-advisory-v1.webp";
import serviceImage6 from "@/assets/services/people-learning-v1.webp";
import { home } from "@/content/home";
import { site as brand } from "@/content/site";
import { routes } from "@/config/routes";
import banner from "@/assets/banner-healthcare-team-v2.jpg";

// The reference supplies presentation; business content stays Boldfuse's.
export const site = {
  ...brand,
  phoneHref: `tel:${brand.telephone}`,
  phoneDisplay: brand.phone,
};
export const heroBanner = {
  src: banner.src,
  alt: "Two doctors collaborating over a tablet in a modern hospital, with a dark forest-green background",
  eyebrow: home.hero.eyebrow,
  title: home.hero.title,
  description:
    "We help doctors and healthcare leaders build stronger teams, streamline daily operations and grow sustainable practices. From automation and branding to financial and legal advisory, we connect your people, processes and business goals.",
  mobileDescription:
    "Stronger teams. Smarter operations. Sustainable growth. Practical business support for doctors and healthcare leaders.",
  position: "object-[68%_center] lg:object-center",
  primaryCta: {
    to: "/#services",
    label: "Explore Our Services",
    variant: "light",
  },
  secondaryCta: {
    to: "/#contact",
    label: "Let’s Talk",
    variant: "outlineLight",
  },
};
const serviceIcons = [
  "Building2",
  "HeartPulse",
  "Coins",
  "TrendingUp",
  "Landmark",
  "ShieldCheck",
  "Users",
];
const serviceImages = [
  {
    image: serviceImage0,
    imageAlt:
      "Clinic operations colleagues reviewing an automated workflow on a tablet",
  },
  {
    image: serviceImage1,
    imageAlt:
      "A mental wellness counselor listening to a client in a calm consultation room",
  },
  {
    image: serviceImage2,
    imageAlt: "A financial advisor and doctor reviewing a business plan",
  },
  {
    image: serviceImage3,
    imageAlt:
      "Brand strategists developing an emerald and mint visual identity",
  },
  {
    image: serviceImage4,
    imageAlt:
      "A hospital manager and senior nurse reviewing a process checklist",
  },
  {
    image: serviceImage5,
    imageAlt:
      "A legal consultant explaining a contract to a healthcare business owner",
  },
  {
    image: serviceImage6,
    imageAlt:
      "A facilitator leading a collaborative workshop with healthcare professionals",
  },
];
export const services = home.services.items.map((item, i) => ({
  slug: item.route,
  path: routes[item.route].path,
  number: String(i + 1).padStart(2, "0"),
  title: item.title,
  summary: item.text,
  icon: serviceIcons[i],
  ...serviceImages[i],
}));
export const stats = [
  { value: home.experience.number, label: home.experience.label },
  { value: String(home.services.items.length), label: "Services" },
  {
    value: home.clients.number ?? String(home.clients.items.length),
    label: home.clients.label,
  },
  { value: String(home.capabilities.items.length), label: "Capabilities" },
];
export const processSteps = home.process.items.map((item, i) => ({
  number: String(i + 1).padStart(2, "0"),
  title: item.title,
  body: item.text,
  icon: ["Search", "ClipboardList", "Rocket"][i],
}));
export const businessPillars = home.values.items.map((item) => ({
  title: item.title,
  body: item.text,
}));
