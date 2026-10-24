import Image from "next/image";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Cpu,
  Layers3,
  Users,
  ChartNoAxesCombined,
  Megaphone,
  Plus,
  Quote,
  ArrowDownRight,
} from "lucide-react";
import { home } from "@/content/home";
import { site } from "@/content/site";
import { ui } from "@/content/ui";
import {
  AppLink,
  Badge,
  Button,
  Card,
  Container,
  Section,
  SectionHeading,
} from "@/components/ui";
const capabilityIcons = [Cpu, Layers3, Users, ChartNoAxesCombined, Megaphone];
export default function Home() {
  return (
    <main id="main-content">
      <section id="home" className="pt-10 pb-16 md:pt-16 md:pb-24">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <p className="eyebrow text-brand-700">{home.hero.eyebrow}</p>
              <h1 className="max-w-3xl text-5xl leading-[1.08] font-extrabold tracking-tight md:text-7xl">
                {home.hero.title.split(" ").slice(0, 3).join(" ")}{" "}
                <span className="hero-word">
                  {home.hero.title.split(" ").slice(3).join(" ")}
                </span>
              </h1>
              <p className="mt-8 text-sm font-semibold">{home.hero.welcome}</p>
              <p className="body-copy mt-2 max-w-xl text-sage-700">
                {home.hero.body}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button route="about" size="lg">
                  {ui.learnMore}
                  <span className="sr-only"> {site.name}</span>
                </Button>
                <Button
                  href={`tel:${site.telephone}`}
                  size="lg"
                  variant="outline"
                  arrow={false}
                >
                  {ui.talk}
                </Button>
              </div>
            </div>
            <div className="relative lg:col-span-5">
              <div
                className="absolute -top-4 -right-3 h-24 w-24 rounded-tr-3xl border-t border-r border-brand-500 sm:-right-4"
                aria-hidden="true"
              />
              <div className="overflow-hidden rounded-3xl bg-brand-950">
                <Image
                  src={home.hero.image}
                  alt={home.hero.alt}
                  width={1600}
                  height={1029}
                  preload
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="hero-photo aspect-square w-full object-cover lg:aspect-[4/5]"
                />
                <div className="flex items-center justify-between gap-5 px-6 py-5 text-white">
                  <p className="max-w-60 text-base font-medium">
                    {home.experience.vision}
                  </p>
                  <ArrowUpRight
                    className="shrink-0 text-brand-200"
                    size={36}
                    strokeWidth={1.25}
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-14 flex items-center gap-4 border-t border-brand-950/10 pt-6">
            <a
              href="#capabilities"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-950/20"
              aria-label={home.capabilities.eyebrow}
            >
              <ArrowDown size={17} />
            </a>
            <span className="text-sm font-medium text-sage-700">
              {home.capabilities.eyebrow}
            </span>
          </div>
        </Container>
      </section>
      <Section id="capabilities" className="pt-8 md:pt-8">
        <SectionHeading {...home.capabilities} />
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
          {home.capabilities.items.map((item, i) => {
            const Icon = capabilityIcons[i];
            return (
              <Card
                key={item.title}
                className={`reveal flex min-h-64 flex-col justify-between p-7 ${i === 0 ? "bg-brand-950 text-white md:col-span-2 lg:col-span-2" : "bg-white"}`}
              >
                <Icon
                  size={34}
                  strokeWidth={1.4}
                  aria-hidden="true"
                  className={i === 0 ? "text-brand-200" : "text-brand-700"}
                />
                <div className="mt-10">
                  <p
                    className={`mb-3 text-sm font-medium ${i === 0 ? "text-brand-200" : "text-sage-700"}`}
                  >
                    {item.tagline}
                  </p>
                  <h3 className="text-2xl font-semibold tracking-tight">
                    {item.title}
                  </h3>
                </div>
              </Card>
            );
          })}
          <div className="overflow-hidden rounded-3xl md:col-span-1 lg:col-span-2">
            <Image
              src={home.capabilities.image}
              alt={home.capabilities.alt}
              sizes="(min-width:1024px) 50vw, (min-width:768px) 33vw, 100vw"
              className="h-64 w-full object-cover"
            />
          </div>
        </div>
      </Section>
      <Section id="values" className="border-t border-brand-950/10">
        <div className="grid gap-12 lg:grid-cols-12">
          <SectionHeading {...home.values} className="lg:col-span-5" />
          <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:col-span-7">
            {home.values.items.map((item, i) => (
              <div
                key={item.title}
                className="reveal border-t border-brand-950/20 pt-5"
              >
                <span className="font-display text-6xl font-semibold tracking-tight text-brand-700">
                  0{i + 1}
                </span>
                <h3 className="mt-6 mb-4 text-xl font-semibold">
                  {item.title}
                </h3>
                <p className="text-base text-sage-700">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>
      <Section id="process" tone="dark">
        <SectionHeading {...home.process} className="max-w-4xl" />
        <div className="grid gap-10 lg:grid-cols-3 lg:gap-8">
          {home.process.items.map((item, i) => (
            <div key={item.title} className="reveal">
              <div className="mb-8 flex items-center gap-5">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-brand-200/40 text-lg font-medium">
                  0{i + 1}
                </span>
                <span className="h-px w-full bg-brand-200/30" />
                {i < 2 && (
                  <ArrowRight
                    className="shrink-0 text-brand-200"
                    size={20}
                    aria-hidden="true"
                  />
                )}
              </div>
              <h3 className="mb-5 text-3xl font-semibold">{item.title}</h3>
              <p className="text-base leading-relaxed text-brand-200">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </Section>
      <Section id="services">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading {...home.services} />
            <ArrowDownRight
              size={96}
              strokeWidth={1}
              className="hidden text-brand-700 lg:block"
              aria-hidden="true"
            />
          </div>
          <div className="lg:col-span-7">
            {home.services.items.map((item, i) => (
              <details
                open
                key={item.title}
                className="service-row border-t border-brand-950/20 py-7 last:border-b"
              >
                <summary className="flex list-none items-start gap-4">
                  <span className="pt-1 text-sm font-medium text-sage-700">
                    0{i + 1}
                  </span>
                  <h3 className="grow text-xl font-semibold tracking-tight md:text-2xl">
                    {item.title}
                  </h3>
                  <Plus
                    className="service-plus mt-1 shrink-0 text-brand-700 transition-transform"
                    size={22}
                    aria-hidden="true"
                  />
                </summary>
                <div className="pt-5 pl-9">
                  <p className="text-base text-sage-700">{item.text}</p>
                  <AppLink
                    route={item.route}
                    className="mt-5 inline-flex min-h-11 items-center gap-3 text-sm font-semibold text-brand-700"
                  >
                    {ui.learnMore}
                    <span className="sr-only"> {item.title}</span>
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </AppLink>
                </div>
              </details>
            ))}
          </div>
        </div>
      </Section>
      <Section id="experience" tone="dark">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="font-display text-8xl leading-none font-bold tracking-tighter text-brand-200 tabular-nums md:text-9xl">
              {home.experience.number}
            </p>
            <p className="mt-4 text-lg font-medium">{home.experience.label}</p>
          </div>
          <div className="border-brand-200/25 lg:col-span-8 lg:border-l lg:pl-14">
            <div>
              <p className="eyebrow text-brand-200">
                {home.experience.visionTitle}
              </p>
              <h2 className="max-w-xl text-4xl leading-tight font-semibold tracking-tight md:text-5xl">
                {home.experience.vision}
              </h2>
            </div>
            <div className="mt-10 border-t border-brand-200/25 pt-8">
              <h3 className="mb-3 text-xl font-semibold">
                {home.experience.missionTitle}
              </h3>
              <p className="body-copy text-brand-200">
                {home.experience.mission}
              </p>
            </div>
          </div>
        </div>
      </Section>
      <Section id="clients">
        <SectionHeading
          eyebrow={home.clients.eyebrow}
          title={home.clients.title}
        />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {home.clients.items.map((client) => (
            <Card
              key={client.name}
              className="flex h-32 items-center justify-center overflow-hidden rounded-2xl bg-white p-5"
            >
              <Image
                src={client.image}
                alt={client.name}
                width={150}
                height={85}
                sizes="150px"
                className="max-h-22 w-auto max-w-full object-contain"
              />
            </Card>
          ))}
        </div>
        <div className="mt-16 grid gap-12 md:grid-cols-2">
          {home.clients.quotes.map((quote, i) => (
            <figure
              key={quote.name}
              className="reveal border-t border-brand-950/20 pt-8"
            >
              <Quote
                className="mb-6 text-brand-700"
                size={32}
                strokeWidth={1.25}
                aria-hidden="true"
              />
              <blockquote className="font-display text-xl leading-relaxed font-medium md:text-2xl">
                “{quote.text}”
              </blockquote>
              <figcaption className="mt-7 flex items-center gap-3 text-base font-semibold">
                <span className="h-px w-8 bg-brand-700" />
                {quote.name}
              </figcaption>
              <span className="sr-only">{i + 1}</span>
            </figure>
          ))}
        </div>
      </Section>
      <Section id="contact" tone="bright">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <h2 className="max-w-2xl text-5xl leading-tight font-bold tracking-tight md:text-6xl">
              {home.cta.title}
            </h2>
            <p className="body-copy mt-6 max-w-2xl">{home.cta.body}</p>
          </div>
          <div className="flex flex-col items-start gap-6 lg:col-span-4 lg:items-end">
            <Button
              route="contact"
              size="lg"
              className="border-brand-950 bg-brand-950 hover:bg-brand-800"
            >
              {ui.getStarted}
            </Button>
            <div className="flex gap-7 text-base font-semibold">
              <a
                className="flex min-h-11 items-center border-b border-brand-950"
                href={`tel:${site.telephone}`}
              >
                {ui.call}
              </a>
              <a
                className="flex min-h-11 items-center border-b border-brand-950"
                href={`mailto:${site.email}`}
              >
                {ui.email}
              </a>
            </div>
          </div>
        </div>
      </Section>
      <Section id="blog">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading {...home.blog} />
          <AppLink
            route="blogs"
            className="mb-12 inline-flex min-h-11 shrink-0 items-center gap-3 text-base font-semibold text-brand-700"
          >
            {ui.allArticles}
            <ArrowUpRight size={19} aria-hidden="true" />
          </AppLink>
        </div>
        <div className="grid gap-10 md:grid-cols-2">
          {home.blog.items.map((post) => (
            <article key={post.title} className="reveal">
              <AppLink route={post.route} className="group block">
                <div className="overflow-hidden rounded-3xl">
                  <Image
                    src={post.image}
                    alt=""
                    sizes="(min-width:768px) 50vw, 100vw"
                    className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="mt-6">
                  <Badge>{post.category}</Badge>
                  <h3 className="mt-5 text-2xl leading-snug font-semibold tracking-tight md:text-3xl">
                    {post.title}
                  </h3>
                  <p className="mt-4 text-base text-sage-700">{post.excerpt}</p>
                  <span className="mt-6 inline-flex items-center gap-3 text-sm font-semibold text-brand-700">
                    {ui.readArticle}
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </span>
                </div>
              </AppLink>
            </article>
          ))}
        </div>
      </Section>
    </main>
  );
}
