import { readFile, writeFile, mkdir, copyFile } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
const require = createRequire(import.meta.url);
const sharp = createRequire(require.resolve("next/package.json"))("sharp");
const read = async (p: string) => JSON.parse(await readFile(p, "utf8"));
const base = "content/scraped/pages/home/";
const sections = await read(base + "sections.json");
const global = await read("content/scraped/site/global.json");
const images = await read(base + "images/images.json");
const inventory = await read("content/scraped/_inventory.json");
const sourceMap: Record<string, string> = {};
const imports: string[] = [];
await mkdir("src/assets", { recursive: true });
async function asset(key: string, source: string) {
  const ext = path.extname(source).toLowerCase();
  const dest = `src/assets/${key}${ext}`;
  await copyFile(source, dest);
  imports.push(`import ${key} from './${key}${ext}';`);
  sourceMap[key] = source;
  return `$asset:${key}`;
}
async function local(key: string, url: string) {
  const image = images.find((i: any) => i.originalUrl === url);
  if (!image) throw Error(`Missing source image: ${key}`);
  return asset(key, base + image.localFile);
}
const servicesImages = await read(
  "content/scraped/pages/services/images/images.json",
);
const healthcare = servicesImages.find((i: any) =>
  i.originalUrl.endsWith("Services_-Health-_-wellness-min-scaled.jpg"),
);
await asset("hero", "content/scraped/pages/services/" + healthcare.localFile);
await local(
  "heroLadders",
  images.find((i: any) => i.originalUrl.endsWith("Banner-1-min-1.jpg"))
    .originalUrl,
);
await local(
  "heroGrowth",
  images.find((i: any) =>
    i.originalUrl.endsWith(
      "Get-started-banner-we-grow-when-you-grow-min-scaled.jpg",
    ),
  ).originalUrl,
);
await local(
  "people",
  images.find((i: any) =>
    i.originalUrl.endsWith(
      "zip-03-smiling-business-man-using-digital-tablet-in-the-o-MQF8K3B.png",
    ),
  ).originalUrl,
);
await local(
  "capability",
  images.find(
    (i: any) =>
      i.originalUrl.endsWith("2.-Technology-management-min-scaled.jpg") ||
      i.localFile.includes("2--Technology"),
  ).originalUrl,
);
await local(
  "chess",
  images.find((i: any) => i.originalUrl.endsWith("Chess-image-scaled.jpg"))
    .originalUrl,
);
await local("footerLogo", global.footer.logos[0].src);
const header = images.find(
  (i: any) => i.originalUrl === global.header.logos[0].src,
);
const headerSource = base + header.localFile;
const { data, info } = await sharp(headerSource)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
for (let i = 0; i < data.length; i += 4) {
  data[i] = 3;
  data[i + 1] = 40;
  data[i + 2] = 30;
}
await sharp(data, { raw: info }).png().toFile("src/assets/headerLogo.png");
imports.push("import headerLogo from './headerLogo.png';");
sourceMap.headerLogo = headerSource;
await sharp("brand-assets/boldfuse-badge.webp")
  .png()
  .toFile("brand-assets/boldfuse-badge.png");
await asset("badge", "brand-assets/boldfuse-badge.png");
await sharp(headerSource)
  .extract({ left: 18, top: 5, width: 146, height: 154 })
  .resize(192, 192, { fit: "contain", background: "#03281e" })
  .flatten({ background: "#03281e" })
  .png()
  .toFile("src/app/icon.png");
await sharp("src/app/icon.png")
  .resize(180, 180)
  .png()
  .toFile("src/app/apple-icon.png");
const png = await sharp("src/app/icon.png")
  .resize(32, 32)
  .ensureAlpha()
  .png({ palette: false })
  .toBuffer();
const ico = Buffer.alloc(22);
ico.writeUInt16LE(1, 2);
ico.writeUInt16LE(1, 4);
ico[6] = 32;
ico[7] = 32;
ico.writeUInt16LE(1, 10);
ico.writeUInt16LE(32, 12);
ico.writeUInt32LE(png.length, 14);
ico.writeUInt32LE(22, 18);
await writeFile("src/app/favicon.ico", Buffer.concat([ico, png]));
const clean = (s: string) => s.replace(/\s+/g, " ").trim();
const clients = [];
for (let i = 0; i < 18; i++) {
  clients.push({
    name: sections[9].body[i + 2],
    image: await local(
      `client${String(i + 1).padStart(2, "0")}`,
      sections[9].images[i],
    ),
  });
}
const titles = [
  "Business Automation",
  "Wellness and Mental Health",
  "Finance and Advisory Services",
  "Creative Branding and PR",
  "Business Process Excellence",
  "Legal and Advisory Services",
  "People/Learning Management",
];
const serviceBody = sections[7].body.filter((s: string) => s !== "Learn more");
const services = titles.map((title, i) => ({
  title,
  text: serviceBody[i],
  route: `service${i}`,
}));
const valueTitles = [
  "Every step towards perfection",
  "We are secret keepers",
  "Straightforwardness",
  "Always stay on the leading edge",
];
const blog = [];
for (let i = 0; i < 2; i++) {
  const url = sections[11].ctas[i * 3 + 1].href;
  blog.push({
    title: clean(sections[11].ctas[i * 3 + 1].label),
    category: sections[11].ctas[i * 3 + 2].label,
    excerpt: sections[11].body[i],
    route: i === 0 ? "mentalHealth" : "workplace",
    image: await local(`blog${i}`, sections[11].images[i]),
  });
}
const home = {
  hero: {
    eyebrow: "People | Process | Productivity partners",
    title: "Helping Doctors Build The Best Healthcare",
    welcome: "Welcome to Bold Fuse",
    body: sections[1].body[0],
    image: "$asset:hero",
    alt: "Wooden blocks showing healthcare symbols",
  },
  capabilities: {
    eyebrow: "Time to thrive",
    title: clean(sections[2].heading),
    image: "$asset:capability",
    alt: "People working together with technology",
    items: [
      { title: "Technology management", tagline: "Shake hands with future" },
      { title: "Product management", tagline: "Innovate awesomeness" },
      { title: "People management", tagline: "Nurture your employees" },
      { title: "Business management", tagline: "Defend your dream" },
      { title: "Brand management", tagline: "Showcase your power" },
    ],
  },
  values: {
    eyebrow: "Our Values",
    title: clean(sections[5].heading),
    items: valueTitles.map((title, i) => ({
      title,
      text: sections[5].body[i],
    })),
  },
  process: {
    eyebrow: "Our working structure",
    title: clean(sections[6].heading),
    items: ["Assess", "Strategize", "Execute"].map((title, i) => ({
      title,
      text: sections[6].body[i],
    })),
  },
  services: {
    eyebrow: "What we do",
    title: clean(sections[7].heading),
    items: services,
  },
  experience: {
    number: sections[7].items[0].title + "+",
    label: "Years of Experience",
    visionTitle: "Our Vision",
    vision: sections[8].body[0],
    missionTitle: "Our Mission",
    mission: sections[8].body[1],
  },
  clients: {
    eyebrow: "Testimonials",
    title: sections[9].heading,
    label: "Our clients",
    items: clients,
    quotes: [
      { name: "Warrior garage", text: sections[9].body[0] },
      { name: "Ambus", text: sections[9].body[1] },
    ],
  },
  cta: { title: "We grow when you grow", body: sections[10].heading },
  blog: { eyebrow: "From our blog", title: sections[11].heading, items: blog },
};
const routes: Record<string, any> = {};
const primary: Record<string, string> = {
  "/": "home",
  "/about/": "about",
  "/services/": "services",
  "/blogs/": "blogs",
  "/contact/": "contact",
  "/mental-health-of-entrepreneurs/": "mentalHealth",
  "/why-do-performing-and-outstanding-employees-leave-the-system-sooner-than-the-others/":
    "workplace",
};
for (const row of inventory.filter((r: any) => r.type !== "media")) {
  const p = new URL(row.url).pathname;
  const key = primary[p] || p.split("/").filter(Boolean).join("_");
  routes[key] = {
    label:
      global.navTree.find((n: any) => new URL(n.href).pathname === p)?.label ||
      row.title.replace(/\s*[-–|]\s*Boldfuse.*$/i, "") ||
      p,
    path: p,
    status: p === "/" ? "built" : "planned",
  };
}
for (const [i, entry] of global.navTree
  .find((n: any) => n.label === "Services")
  .children.entries())
  routes[`service${i}`] = {
    label: entry.label,
    path: new URL(entry.href).pathname + new URL(entry.href).hash,
    status: "planned",
  };
routes.privacy = {
  label: "Privacy Policy",
  path: "/privacy-policy/",
  status: "planned",
};
routes.terms = {
  label: "Terms & Conditions",
  path: "/terms-and-conditions/",
  status: "planned",
};
await writeFile(
  "src/config/routes.ts",
  `export type Route = { label: string; path: string; status: 'built' | 'planned' };\nexport const routes = ${JSON.stringify(routes, null, 2)} as const satisfies Record<string, Route>;\nexport type RouteKey = keyof typeof routes;\nexport const navigation: RouteKey[] = ['home','about','services','blogs','contact'];\nexport const serviceNavigation: RouteKey[] = ['service0','service1','service2','service3','service4','service5','service6'];\n`,
);
await writeFile(
  "src/assets/index.ts",
  imports.join("\n") +
    "\nexport const assets = { " +
    imports.map((s) => s.match(/import (\w+)/)![1]).join(", ") +
    " };\n",
);
const homeSource = JSON.stringify(home, null, 2).replace(
  /"\$asset:(\w+)"/g,
  "assets.$1",
);
await writeFile(
  "src/content/home.ts",
  `import { assets } from '@/assets';\nimport type { HomeContent } from './types';\nexport const home = ${homeSource} as const satisfies HomeContent;\n`,
);
const shell = {
  name: "Boldfuse",
  tagline: home.hero.title,
  phone: global.contact.phone,
  telephone: global.contact.telephone,
  email: global.contact.email,
  address: global.contact.address,
  socials: global.socialProfiles,
  brands: global.sisterBrands.map((b: any) => b.name),
  reach: "Reach us",
  quickLinks: "Quick Links",
  otherBrands: "Our other brands",
  socialTitle: "Social Media",
};
await writeFile(
  "src/content/site.ts",
  `export const site = ${JSON.stringify(shell, null, 2)} as const;\n`,
);
await writeFile("content/asset-map.json", JSON.stringify(sourceMap, null, 2));
process.stdout.write(
  "Generated typed source content, route registry, local assets and cropped icons.\n",
);
