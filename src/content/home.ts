import { assets } from "@/assets";
import airocLogo from "@/assets/clients/Airoc Hospitals.webp";
import hydronLogo from "@/assets/clients/hydron.webp";
import ishaLogo from "@/assets/clients/isha-netralaya.webp";
import jadeLogo from "@/assets/clients/jade-clinics.webp";
import preciseLogo from "@/assets/clients/precise-hospital.webp";
import saanvisLogo from "@/assets/clients/saanvis.webp";
import sindooriLogo from "@/assets/clients/sindoori-management-solutions.webp";
import sakraLogo from "@/assets/clients/Sakra World Hospital.webp";
import skinOriginsLogo from "@/assets/clients/skin-origins.webp";
import smartvisionLogo from "@/assets/clients/smartvision.webp";
import benzeLogo from "@/assets/clients/new/benze-mahaveer.webp";
import drAbilashLogo from "@/assets/clients/new/dr-abilash.webp";
import eyeBoutiqueLogo from "@/assets/clients/new/eye-boutique.webp";
import goutamiLogo from "@/assets/clients/new/goutami-eye-institute.webp";
import hasiniLogo from "@/assets/clients/new/hasini-eye-hospital.webp";
import hiloLogo from "@/assets/clients/new/hilo-design.webp";
import ichorLogo from "@/assets/clients/new/ichor-biologics.webp";
import sreeFertilityLogo from "@/assets/clients/new/sree-fertility.webp";
import sreeSwapnaLogo from "@/assets/clients/new/sree-swapna-fertility.webp";
import yashodaLogo from "@/assets/clients/new/yashoda-hospital.webp";
import type { HomeContent } from "./types";
export const home = {
  hero: {
    eyebrow: "People | Process | Productivity partners",
    title: "Helping Doctors Build The Best Healthcare",
    welcome: "Welcome to Bold Fuse",
    body: "Don’t hesitate to ask us how we are doing because we are pretty cool until your company is running towards growth.",
    image: assets.hero,
    alt: "Wooden blocks showing healthcare symbols",
  },
  capabilities: {
    eyebrow: "Time to thrive",
    title: "Multiply your strengths, Eliminate your weaknesses.",
    image: assets.capability,
    alt: "People working together with technology",
    items: [
      {
        title: "Technology management",
        tagline: "Shake hands with future",
      },
      {
        title: "Product management",
        tagline: "Innovate awesomeness",
      },
      {
        title: "People management",
        tagline: "Nurture your employees",
      },
      {
        title: "Business management",
        tagline: "Defend your dream",
      },
      {
        title: "Brand management",
        tagline: "Showcase your power",
      },
    ],
  },
  values: {
    eyebrow: "Our Values",
    title: "Make us compatible with you",
    items: [
      {
        title: "Every step towards perfection",
        text: "We don't compromise with low or average results, so we constantly push ourselves to achieve excellence.",
      },
      {
        title: "We are secret keepers",
        text: "We understand that your strategy and business model makes you competitive, so we maintain a strict confidentiality policy.",
      },
      {
        title: "Straightforwardness",
        text: "Success doesn't come wrapped in sweet words, so we believe in confronting business leaders with hard truths.",
      },
      {
        title: "Always stay on the leading edge",
        text: "We research, we learn, we experiment, we fail, we try again, we succeed and that's how we keep upgrading our skills.",
      },
    ],
  },
  process: {
    eyebrow: "Our working structure",
    title:
      "We partner up with people at the top to make the best out of their extraordinary team.",
    items: [
      {
        title: "Assess",
        text: "We understand the depth of your current situation before trying to renovate your business strategy. Figuring out the strengths and weaknesses of your framework builds the foundation for our strategy. We talk to your people, we scroll through your documents, we observe your operating model and assess the gap between where you stand right now and where you can be with the right approach.",
      },
      {
        title: "Strategize",
        text: "Once we are well aware of the loopholes in your current operating model, we make strategies to overcome these flaws. Our team utilizes their years of experience and skills to put together a plan of action. Our strategies are based on industry trends, insights derived from your business framework, and tried & tested techniques. We create strategies that make an impact.",
      },
      {
        title: "Execute",
        text: "We start implementing our strategies from day 1. We deploy people and technology to fill gaps and enhance the performance of your resources. We stand by the leaders as they direct our strategies to their team members. It takes time to implement a change throughout the organization but we bring forth consistent and innovative approaches to succeed in that at the earliest.",
      },
    ],
  },
  services: {
    eyebrow: "What we do",
    title: "Our Superskills for your Business",
    items: [
      {
        title: "Business Automation",
        text: "Anticipate and resolve the biggest challenges of your business with automation and AI. Let your business self-evolve and adapt via technology that not only empowers your employees to focus on creative tasks but also helps you to innovate and create a business model that completely suits your organization.",
        route: "service0",
      },
      {
        title: "Wellness and Mental Health",
        text: "We understand that achieving holistic well-being involves nurturing both the mind and body. Our comprehensive range of services is designed to support individuals and organizations in their journey towards optimal mental health and thriving workplaces.",
        route: "service1",
      },
      {
        title: "Finance and Advisory Services",
        text: "A trembling economy doesn’t mean that your business has to go down with it. It just highlights the importance of financial management. Monotony often directs you towards negligence and leaves no room for a new perspective. That’s when you get stuck in a poor financial plan which slowly deteriorates the foundation of your business; hence pushing you towards the sea of losses",
        route: "service2",
      },
      {
        title: "Digital Marketing / Creative Branding and PR",
        text: "Change in lifestyle of your customers needs to be balanced with change in your selling experience too. Take a step forward towards your customers who are not roaming through the market but sitting in their homes and scrolling over their digital devices. Amp up your marketing and sales technique by reaching your customers in the digital world.",
        route: "service3",
      },
      {
        title: "Business Process Excellence",
        text: "Shifting customer demands and fragmented employees need an upgraded operating model. Getting ahead of your competitors even in disruptive times can soon become a reality once you reach your operational excellence. We equip organizations with the capabilities that they need to withstand the new normal.",
        route: "service4",
      },
      {
        title: "Legal and Advisory Services",
        text: "Ready to discuss your legal needs? Contact us today to schedule a consultation with one of our experienced independent legal consultants. Whether you require ongoing advisory services or assistance with a specific legal matter, we are here to help.",
        route: "service5",
      },
      {
        title: "People Management / HR",
        text: "When people behind your business climb the ladder of growth and success, they carry your business with them to those heights. Accelerating the potential of your employees makes your company strong and prepared for anything that comes next. We help to make your employees as invested in your company as you are.",
        route: "service6",
      },
    ],
  },
  experience: {
    number: "5+",
    label: "Years of Experience",
    visionTitle: "Our Vision",
    vision: "To always believe in co-existence",
    missionTitle: "Our Mission",
    mission:
      "To deliver pragmatic diverse solutions with effective restructuring strategies which sustain in the current and challenging environment",
  },
  clients: {
    number: "50+",
    eyebrow: "Testimonials",
    title: "What client say about us",
    label: "Our clients",
    items: [
      {
        name: "Maxivision super speciality eye hospital",
        image: assets.client01,
      },
      {
        name: "Fabience",
        image: assets.client02,
      },
      {
        name: "Vibhuaya technologies",
        image: assets.client03,
      },
      {
        name: "River NIMS hospitals",
        image: assets.client04,
      },
      {
        name: "Sparsh hospitals",
        image: assets.client05,
      },
      {
        name: "Meru international school",
        image: assets.client06,
      },
      {
        name: "Kaa's kirchen",
        image: assets.client07,
      },
      {
        name: "Adika wellness",
        image: assets.client08,
      },
      {
        name: "Shriram universal school - TSUS",
        image: assets.client09,
      },
      {
        name: "Vijaya diagnostic center",
        image: assets.client10,
      },
      {
        name: "Veritas prime",
        image: assets.client11,
      },
      {
        name: "ekincare",
        image: assets.client12,
      },
      {
        name: "Kamineni Hospitals",
        image: assets.client13,
      },
      {
        name: "Best Vision Eye Hospital",
        image: assets.client14,
      },
      {
        name: "Apollo Hospitals",
        image: assets.client15,
      },
      {
        name: "Belief Fertility Center",
        image: assets.client16,
      },
      {
        name: "Lotus Hospital & Institute",
        image: assets.client17,
      },
      {
        name: "SHLOK",
        image: assets.client18,
      },
      { name: "Precise Hospital", image: preciseLogo },
      { name: "Sindoori Management Solutions", image: sindooriLogo },
      { name: "Jade Clinics", image: jadeLogo },
      { name: "Skin Origins Clinic", image: skinOriginsLogo },
      { name: "Saanvi’s Laser Skin and Hair Clinic", image: saanvisLogo },
      { name: "Hydron", image: hydronLogo },
      { name: "SmartVision Eye Hospitals", image: smartvisionLogo },
      { name: "Isha Netralaya", image: ishaLogo },
      { name: "Sakra World Hospital", image: sakraLogo },
      { name: "Airoc Hospitals", image: airocLogo },
      { name: "Benze Mahaveer", image: benzeLogo },
      { name: "Dr. Abhilash's Laparoscopy & Laser Centre", image: drAbilashLogo },
      { name: "Eye Boutique", image: eyeBoutiqueLogo },
      { name: "Goutami Eye Institute", image: goutamiLogo },
      { name: "Hasini Eye Hospital", image: hasiniLogo },
      { name: "Hilo Design", image: hiloLogo },
      { name: "Ichor Biologics", image: ichorLogo },
      { name: "Sree Fertility Centre", image: sreeFertilityLogo },
      { name: "Sree Swapna Fertility", image: sreeSwapnaLogo },
      { name: "Yashoda Hospitals", image: yashodaLogo },
    ],
    quotes: [
      {
        name: "Warrior garage",
        text: "Bold Fuse simplified our work to a great extent. With automation and technology roaming around our operation model, we are more free to focus on technical work and customer satisfaction. Really happy with their services.",
      },
      {
        name: "Ambus",
        text: "Raising a startup became so easy for us with the help of the Bold Fuse team. They strategized every move and within days we were up and running at full pace. Thanks for giving us this amazing kickstart.",
      },
      {
        name: "James Anderson",
        text: "Bold Fuse helped us streamline our business operations and improve the way our team works. Their innovative approach and continuous support made our digital transformation much easier. Truly appreciate their dedication and expertise.",
      },
      {
        name: "Emily Thompson",
        text: "Working with Bold Fuse has been a great experience. Their team understood our business needs and delivered practical solutions that improved our efficiency. Their professionalism, creativity, and commitment are truly impressive.",
      },
    ],
  },
  cta: {
    title: "We grow when you grow",
    body: "Build a stronger healthcare business.",
  },
  blog: {
    eyebrow: "From our blog",
    title: "Keeping Up with Boldfuse",
    items: [
      {
        title: "Mental health of Entrepreneurs: Tips to hold on",
        category: "Mental Health",
        excerpt:
          "The first wave of the pandemic had struck the economy with a devastating impact. While everyone was expecting a great rebound in …",
        route: "mentalHealth",
        image: assets.blog0,
      },
      {
        title:
          "Why do performing and outstanding employees leave the system sooner than the others?",
        category: "Workplace culture",
        excerpt:
          "“Those who know their worth would never compromise with the less.” The brightest gem of the company can soon become the asset …",
        route: "workplace",
        image: assets.blog1,
      },
    ],
  },
} as const satisfies HomeContent;
