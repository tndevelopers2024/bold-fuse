import { chromium } from "playwright";
import { readFile, writeFile } from "node:fs/promises";
const file = "content/scraped/site/global.json";
const global = JSON.parse(await readFile(file, "utf8"));
const browser = await chromium.launch();
const page = await browser.newPage({ javaScriptEnabled: false });
await page.route("**/*", (r) => r.abort());
await page.setContent(global.header.html + global.footer.html, {
  waitUntil: "domcontentloaded",
});
const nav = await page.evaluate(() =>
  [...document.querySelectorAll("header nav > ul > li")].map((li) => ({
    label: li.querySelector("a")?.textContent?.trim(),
    href: li.querySelector("a")?.getAttribute("href"),
    children: [...li.querySelectorAll(":scope > ul a")].map((a) => ({
      label: a.textContent?.trim(),
      href: a.getAttribute("href"),
    })),
  })),
);
const clean = (href: string) => {
  const u = new URL(href);
  for (const p of [...u.searchParams.keys()])
    if (p.startsWith("utm_")) u.searchParams.delete(p);
  return u.href;
};
global.navTree = nav;
global.topBar = {
  text: "Need help? Talk to an expert",
  phone: "+91 8341410810",
  href: "tel:+918341410810",
};
global.contact = {
  phone: "+91 8341410810",
  telephone: "+918341410810",
  email: "info@boldfuse.in",
  address: "Lanco hills road, Gachibowli, Hyd 500089",
};
global.socialProfiles = global.footer.links
  .filter((l: { label: string }) =>
    ["Facebook", "Instagram", "Linkedin"].includes(l.label),
  )
  .slice(0, 3)
  .map((l: { label: string; href: string }) => ({ ...l, href: clean(l.href) }));
global.sisterBrands = [
  {
    name: "Marshmellowww",
    social: clean(
      global.footer.links.find((l: { href: string }) =>
        l.href.includes("marshmellowww"),
      ).href,
    ),
  },
  {
    name: "House of Bold",
    social: clean(
      global.footer.links.find((l: { href: string }) =>
        l.href.includes("house_of_bold"),
      ).href,
    ),
  },
];
global.copyright = "Copyright © 2024 Boldfuse.in";
global.legalLinks = global.footer.links.filter((l: { label: string }) =>
  ["Privacy Policy", "Terms & Conditions"].includes(l.label),
);
global.footerColumns = [
  {
    title: "Reach us",
    items: [global.contact.phone, global.contact.email, global.contact.address],
  },
  {
    title: "Quick Links",
    items: global.footer.links.filter((l: { label: string }) =>
      ["Home", "About Us", "Services", "Contact Us"].includes(l.label),
    ),
  },
  { title: "Social Media", items: global.socialProfiles },
  { title: "Our other brands", items: global.sisterBrands },
];
await writeFile(file, JSON.stringify(global, null, 2));
await browser.close();
process.stdout.write(JSON.stringify(nav, null, 2) + "\n");
