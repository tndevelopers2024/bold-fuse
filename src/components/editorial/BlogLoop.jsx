import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { home } from "@/content/home";
import { routes } from "@/config/routes";
import automationImage from "@/assets/services/business-automation-v1.webp";
import peopleImage from "@/assets/services/people-learning-v1.webp";

const posts = [
  ...home.blog.items.map((post) => ({ ...post, href: routes[post.route].path, action: "Read Article" })),
  {
    title: "Give your team more time for patient care",
    category: "Business insight",
    excerpt: "Start with repetitive administrative tasks. Clear workflows and thoughtful automation can help your team spend less time on manual coordination.",
    image: automationImage,
    href: "/#services",
    action: "Explore our services",
  },
  {
    title: "Build a stronger healthcare team",
    category: "People insight",
    excerpt: "Clear roles, regular feedback and practical learning help teams work together. Make staff development part of your everyday operations.",
    image: peopleImage,
    href: "/#services",
    action: "Explore our services",
  },
];

export default function BlogLoop() {
  return (
    <div className="client-loop mt-8 sm:mt-10" aria-label="Articles and business insights">
      <div className="client-loop-track blog-loop-track">
        {[0, 1].map((copy) => (
          <div className="client-loop-group" key={copy} aria-hidden={copy === 1 ? true : undefined} inert={copy === 1 ? true : undefined}>
            {posts.map((post) => (
              <article key={post.title} className="blog-loop-card overflow-hidden rounded-2xl border border-line bg-white">
                <Link href={post.href} className="flex h-full flex-col">
                  <Image src={post.image} alt="" sizes="(min-width: 640px) 340px, 82vw" className="aspect-[16/10] w-full object-cover" />
                  <div className="flex flex-1 flex-col p-5">
                    <p className="eyebrow">{post.category}</p>
                    <h3 className="mt-3 text-lg leading-snug">{post.title}</h3>
                    <p className="mt-3 font-description text-sm leading-relaxed text-muted">{post.excerpt}</p>
                    <span className="mt-auto inline-flex items-center gap-2 pt-5 text-xs font-medium text-forest">{post.action}<ArrowUpRight size={16} aria-hidden="true" /></span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
