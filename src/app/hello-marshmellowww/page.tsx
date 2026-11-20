import { pageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import {
  BookOpen,
  Coins,
  Compass,
  HeartPulse,
  Mic,
  Quote,
  Rocket,
  Scale,
  TrendingUp,
} from "lucide-react";
import BrandPage from "@/components/editorial/BrandPage";
import heroImage from "@/assets/brands/marshmellowww-talking.png";
import { routes } from "@/config/routes";

export const metadata: Metadata = pageMetadata({
  title: "Hello @ Marshmellowww",
  description:
    "Hello @ Marshmellowww is Boldfuse's podcast and channel for women — interviews, personal growth, career guidance, entrepreneurship, wellness and financial literacy.",
  alternates: { canonical: routes["hello-marshmellowww"].path },
});

export default function Page() {
  return (
    <BrandPage
      eyebrow="Our other brands"
      title="Hello @ Marshmellowww"
      heroText="Boldfuse's podcast and channel for women — honest conversations about careers, money, health and everything it takes to live on your own terms."
      image={heroImage}
      imageAlt="Hello @ Marshmellowww podcast conversation"
      introHeading="About Hello @ Marshmellowww"
      intro={[
        "Hello @ Marshmellowww is Boldfuse's podcast and channel series created by and for women. Every episode is a practical, uplifting conversation with the women building their own paths — and with the ideas that help the rest of us do the same.",
        "From leadership and negotiation to money, health and self-care, we talk about the topics women are often told not to bring up — openly, practically and with zero judgement.",
      ]}
      sections={[
        {
          heading: "What we talk about",
          intro:
            "Episodes span the full landscape of a woman's personal and professional life.",
          items: [
            {
              title: "Interviews with inspirational women",
              text: "Women from various industries share their stories, the challenges they've overcome and their advice for aspiring leaders.",
              Icon: Mic,
            },
            {
              title: "Personal development and growth strategies",
              text: "Practical tips for leadership skills, negotiation techniques, time management and confidence-building.",
              Icon: TrendingUp,
            },
            {
              title: "Career guidance and mentorship",
              text: "Navigating career paths, advancing in male-dominated industries, finding mentors and balancing work and life.",
              Icon: Compass,
            },
            {
              title: "Entrepreneurship and business insights",
              text: "Starting a business, funding opportunities, marketing strategies and scaling a company.",
              Icon: Rocket,
            },
            {
              title: "Health and wellness",
              text: "Physical and mental health, self-care practices, stress management and a healthy work-life balance.",
              Icon: HeartPulse,
            },
            {
              title: "Financial literacy and independence",
              text: "Financial planning, investing, budgeting, negotiating salaries and breaking the taboo around money.",
              Icon: Coins,
            },
            {
              title: "Empowering stories and testimonials",
              text: "Stories of resilience, courage and empowerment from women who have overcome adversity.",
              Icon: Quote,
            },
            {
              title: "Intersectional feminism and inclusivity",
              text: "Diversity, equity and inclusion — intersectional feminism, allyship and amplifying marginalised voices.",
              Icon: Scale,
            },
            {
              title: "Book reviews and recommendations",
              text: "Books written by and for women on leadership, personal development, career advancement and empowerment.",
              Icon: BookOpen,
            },
          ],
        },
      ]}
    />
  );
}
