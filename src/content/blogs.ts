import type { StaticImageData } from "next/image";
import { assets } from "@/assets";
import type { RouteKey } from "@/config/routes";

export type BlogSection = {
  heading?: string;
  paragraphs: readonly string[];
};

export type BlogArticle = {
  slug: string;
  route: RouteKey;
  title: string;
  category: string;
  published: string;
  publishedISO: string;
  author: string;
  excerpt: string;
  leadQuote?: string;
  image: StaticImageData;
  imageAlt: string;
  sections: readonly BlogSection[];
};

export const blogArticles: readonly BlogArticle[] = [
  {
    slug: "why-do-performing-and-outstanding-employees-leave-the-system-sooner-than-the-others",
    route: "workplace",
    title:
      "Why do performing and outstanding employees leave the system sooner than the others?",
    category: "Workplace culture",
    published: "September 4, 2021",
    publishedISO: "2021-09-04",
    author: "BoldFuse Team",
    excerpt:
      "“Those who know their worth would never compromise with the less.” The brightest gem of the company can soon become the asset of its competitor if they fail to serve value on time.",
    leadQuote:
      "“Those who know their worth would never compromise with the less.”",
    image: assets.blog1,
    imageAlt:
      "High-performing professionals collaborating in a modern workplace",
    sections: [
      {
        paragraphs: [
          "The brightest gem of the company can soon become the asset of its competitor if they fail to serve value on time. Talented employees have more tendency to shift to new employers mainly because they are well aware of their worth and are intelligent enough to estimate when the company has nothing left to give them. Out of the many reasons because of which a company can lose their valuable asset, these are the most common ones:",
        ],
      },
      {
        heading: "Limited opportunities to grow",
        paragraphs: [
          "Top talents look for improvement and a better day tomorrow. But most of the organizations try to maintain a balance giving no space for change and innovation. Growth doesn’t come from monotony and high performers understand it very well.",
          "Having the same responsibilities and repeating the day over and over with nothing challenging or new is always the biggest cause for the dissatisfaction of the high-performing employees.",
          "Whether you make a fair compensation or not, and whether your employees are happy with their duties or not, they would probably get attracted to other companies if they won’t be able to see scope for their personal growth in your organization. There are always brighter opportunities waiting for the top performers to gravitate them to other organizations.",
        ],
      },
      {
        heading: "Not being appreciative",
        paragraphs: [
          "Top employees are full of ideas and creativity. They try to involve themselves as much as they can and would love to give some suggestions even if they are not allotted that particular project. Ignoring their inputs just for the sake of egoism is yet another reason which makes them feel not valued. Also, those who have spent late nights working hard to ace above the others, feel the urge to be appreciated for their efforts. A paycheck at the beginning of the month can’t subside their desire to seek acknowledgment.",
        ],
      },
      {
        heading: "A stingy boss",
        paragraphs: [
          "Although compensation is not the only motivator for the high performers, the paycheck does play its role in the overall satisfaction of the employees. Not paying enough is like inviting your top employees to attend an interview session in your competitor’s company.",
        ],
      },
      {
        heading: "Insecure managers",
        paragraphs: [
          "Companies with lots of internal drama amongst the employees are yet another pool where talented employees don’t want to dive for longer and waste their time. Being better than everybody else, even your managers and seniors come with some enviousness and resentment. Insecurity of losing power or position might make the managers act out aggressively and undermine the efforts of high performers. And like they say, a poor manager can never handle the talent of excellent employees.",
        ],
      },
      {
        heading: "Toxic workplace",
        paragraphs: [
          "The best and brightest are always kept as target behaviors by the managers for the other employees. This often creates negative competition, as the high-performing employees expose the incompetence of average employees. Hate builds up as top employees are considered as “rate busters” and “not team players”. Peer pressure might force them to underperform which is not accepted by the hard workers.",
        ],
      },
      {
        heading: "Impractical expectations",
        paragraphs: [
          "Always performing well leads to expectations and sometimes they are quite unrealistic to achieve. Such a situation ends up with one of the two consequences- either it breaks the confidence of employees and they lose the charm of high performers or they understand the twisted scenario and decide to choose the exit door. Anyhow, the void for a top employee is already created in the organization.",
        ],
      },
      {
        heading: "The bottom line",
        paragraphs: [
          "Top employees are perfectionists and if they feel you aren’t, then there’s nothing stopping them from carrying their perfection to another spot. For keeping them, you have to become worthy, listen to their voice, and appreciate their talent.",
        ],
      },
    ],
  },
  {
    slug: "mental-health-of-entrepreneurs",
    route: "mentalHealth",
    title: "Mental health of Entrepreneurs: Tips to hold on",
    category: "Mental Health",
    published: "August 31, 2021",
    publishedISO: "2021-08-31",
    author: "BoldFuse Team",
    excerpt:
      "The first wave of the pandemic had struck the economy with a devastating impact. While everyone was expecting a great rebound in 2021, the corona virus has been planning its own war with the entrepreneurs.",
    image: assets.blog0,
    imageAlt: "An entrepreneur taking a mindful pause while planning ahead",
    sections: [
      {
        paragraphs: [
          "The first wave of the pandemic had struck the economy with a devastating impact. While everyone was expecting a great rebound in 2021, the corona virus has been planning it’s own war with the entrepreneurs.",
          "A business is not just a source of livelihood for an entrepreneur but a sense of identity. Losing this identity tremendously impacts their minds planting the seeds of stress and depression. While there is no single way that can tackle your troubles with a magical wand but taking care of your mental health can help to restart your brain and business with full vigour. Here are some tips that can help you be on the brighter side of this downfall:",
        ],
      },
      {
        heading: "Rethink your business model",
        paragraphs: [
          "You don’t always have to part the sea and make your own way out of it. Sometimes you can just bend, take a step back, reevaluate, possibly change your direction and adjust to the tidal waves. Look for a plan B to run your business.",
        ],
      },
      {
        heading: "Focus on survival",
        paragraphs: [
          "“Taking big steps to achieve glory” days are relics of the past. Right now you need to take baby steps. Financial worries have been winning the list of troubles for business owners nowadays. So, you need to forget luxury for one year and focus on necessities. Bargain on your benefits but don’t abandon your quality.",
        ],
      },
      {
        heading: "Detachment is the key",
        paragraphs: [
          "Business runs on tough decisions. As difficult as it can get, be ready to exit on your employees. Leaving someone in trouble might seem rude at first but in the long run you are saving the livelihoods of many other employees by keeping your business from shutting down.",
        ],
      },
      {
        heading: "Make amends in your workforce",
        paragraphs: [
          "It’s time to amplify productivity of existing assets. Encourage work from home and try to convert them into freelancers. Let your employees procure for themselves. At this moment, you certainly don’t want to drop down performance because of delays in salary. So, pre-plan for your near future and manage your employees’ three month salary in advance.",
        ],
      },
      {
        heading: "Plan for employees' health & welfare",
        paragraphs: [
          "Your employees are as overwhelmed with insecurities as you are. You need to express your care for each individual by offering them health and wellness programs. While this may seem an additional investment, happy employees will not even just cover up for it but will bring back twice of it.",
        ],
      },
      {
        heading: "Share your burden with your team",
        paragraphs: [
          "If you consider your team your family, then they ought to be with you in your disappointment just as in your prosperity. Tell them where the company stands and ensure your employees share the same feeling as you about your business.",
        ],
      },
      {
        heading: "Look out for your personal health",
        paragraphs: [
          "Stress is constantly clouding your judgement but you need to unwrap your bubble. Take one hour walk daily and try not to carry your cell phone with you. Allow your brain to wander in solitude, analyse what’s happening and explore solutions. Enhance your knowledge intake by investing some energy with books. Stop cribbing as it won’t bring any peace of mind.",
        ],
      },
      {
        heading: "Try not to forfeit your personal finance for your business",
        paragraphs: [
          "Boundaries are important. They shield you from falling down and squashing either your personal or professional life. With limited funds, you may get enticed to invest every last penny to save your business but remember your business can be rebuilt if you can sustain your personal life for now.",
          "Running business in these tough times might get on your nerves but think of the light ahead of all this darkness. Business challenges make you nothing but stronger, they drive you to adapt and discover groundbreaking ideas. So, don’t fear it, deal with it head-on and we will meet evolved & high-powered on the other side.",
        ],
      },
    ],
  },
];

export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return blogArticles.find((article) => article.slug === slug);
}

const WORDS_PER_MINUTE = 220;

/** Estimated reading time in whole minutes, rounded up. */
export function getReadingTime(article: BlogArticle): number {
  const text = [
    article.excerpt,
    article.leadQuote,
    ...article.sections.flatMap((section) => section.paragraphs),
  ]
    .filter(Boolean)
    .join(" ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}
