import { pageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import {
  Gem,
  HeartHandshake,
  Megaphone,
  Shield,
  Sparkles,
  Sprout,
  Users,
} from "lucide-react";
import BrandPage from "@/components/editorial/BrandPage";
import heroImage from "@/assets/brands/house-of-bold-hero.png";
import { routes } from "@/config/routes";

export const metadata: Metadata = pageMetadata({
  title: "House of Bold",
  description:
    "House of Bold is Boldfuse's women's development club — workshops, community, mentorship and advocacy to empower women to pursue their dreams boldly.",
  alternates: { canonical: routes["house-of-bold"].path },
});

export default function Page() {
  return (
    <BrandPage
      eyebrow="Our other brands"
      title="House of Bold"
      heroText="A women's development club built on community, education and advocacy — where women unlock their full potential and boldly pursue their dreams."
      image={heroImage}
      imageAlt="House of Bold women's community working together"
      introHeading="About House of Bold"
      intro={[
        "“House of Bold” focuses on women's development — a women's club, workshops and awareness. At Boldfuse, innovation meets human potential.",
        "We blend cutting-edge expertise with a deep understanding of human behaviour and organisational dynamics to drive transformative change. With a diverse background spanning multiple disciplines, our founder brings a unique blend of skills and knowledge to every project.",
      ]}
      sections={[
        {
          heading: "Mission & Vision",
          intro: "The purpose that guides everything House of Bold does.",
          items: [
            {
              title: "Mission statement",
              text: "To empower women from all walks of life to unlock their full potential, embrace their unique strengths and boldly pursue their dreams. Through community, education and advocacy, we strive to create a world where every woman feels supported, respected and empowered to lead.",
            },
            {
              title: "Vision statement",
              text: "To build a global sisterhood of empowered women who inspire and uplift each other, catalysing positive change in their communities and beyond. We envision a future where gender equality is a reality and every woman has the opportunity to thrive on her own terms.",
            },
          ],
        },
        {
          heading: "Core values",
          intro:
            "The principles that shape how the club thinks, acts and grows.",
          items: [
            {
              title: "Empowerment",
              text: "We believe in empowering women to take charge of their lives, careers and futures.",
              Icon: Sparkles,
            },
            {
              title: "Inclusivity",
              text: "We embrace diversity and create an inclusive environment where all women feel welcomed and valued.",
              Icon: HeartHandshake,
            },
            {
              title: "Courage",
              text: "We encourage women to step out of their comfort zones, embrace risk and pursue their passions boldly.",
              Icon: Shield,
            },
            {
              title: "Collaboration",
              text: "We foster cooperation and mutual support among women, recognising that we are stronger together.",
              Icon: Users,
            },
            {
              title: "Resilience",
              text: "We inspire perseverance, helping women overcome obstacles and setbacks on their journey to success.",
              Icon: Sprout,
            },
            {
              title: "Authenticity",
              text: "We celebrate individuality and encourage women to embrace their authentic selves, free from stereotypes.",
              Icon: Gem,
            },
            {
              title: "Advocacy",
              text: "We advocate for gender equality, social justice and women's rights for a more equitable world.",
              Icon: Megaphone,
            },
          ],
        },
        {
          heading: "What we offer",
          intro:
            "Programs and experiences designed around the interests of our members.",
          items: [
            {
              title: "Supportive community",
              text: "A welcoming environment where women connect, share experiences and support each other in every aspect of life.",
            },
            {
              title: "Educational workshops",
              text: "Seminars on personal development, career advancement, health and wellness, financial literacy and more.",
            },
            {
              title: "Networking opportunities",
              text: "Networking events, mentorship programs and professional development sessions to empower careers.",
            },
            {
              title: "Creative expression",
              text: "Art exhibitions, writing workshops and creative projects that encourage self-expression and creativity.",
            },
            {
              title: "Wellness programs",
              text: "Fitness classes, yoga, meditation workshops and mental health support groups for holistic well-being.",
            },
            {
              title: "Advocacy and activism",
              text: "Efforts to address women's rights issues, promote gender equality and support relevant social causes.",
            },
            {
              title: "Community outreach",
              text: "Collaboration with local organisations and charities through volunteering and philanthropic initiatives.",
            },
            {
              title: "Exclusive events",
              text: "Special events, themed gatherings and social activities tailored to members' interests.",
            },
            {
              title: "Awareness campaigns",
              text: "Campaigns highlighting issues affecting women's rights and gender equality.",
            },
          ],
        },
      ]}
    />
  );
}
