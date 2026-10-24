import { chromium, type Page } from "playwright";
import TurndownService from "turndown";
import { mkdir, writeFile, readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { createRequire } from "node:module";
import path from "node:path";

const require = createRequire(import.meta.url);
const sharp = createRequire(require.resolve("next/package.json"))("sharp");

const example = await readFile(".env.example", "utf8");
const origin =
  process.env.SCRAPE_ORIGIN ||
  example.match(/^NEXT_PUBLIC_SITE_URL=(.+)$/m)?.[1];
if (!origin)
  throw new Error("Set SCRAPE_ORIGIN or NEXT_PUBLIC_SITE_URL in .env.example.");
const root = path.resolve("content/scraped");
const required = [
  "/",
  "/about/",
  "/services/",
  "/blogs/",
  "/contact/",
  "/why-do-performing-and-outstanding-employees-leave-the-system-sooner-than-the-others/",
  "/mental-health-of-entrepreneurs/",
];
const inventory: Record<string, unknown>[] = [];
const issues: string[] = [];
const failures: string[] = [];
const queue = new Set(required.map((p) => new URL(p, origin).href));
const visited = new Set<string>();
const api: Record<string, Record<string, any>[]> = {};
const json = async (file: string, data: unknown) =>
  writeFile(file, JSON.stringify(data, null, 2));
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
async function retry<T>(fn: () => Promise<T>): Promise<T> {
  for (let attempt = 0; ; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt >= 2) throw error;
      await delay(1000 * 2 ** attempt);
    }
  }
}
function normalize(raw: string) {
  try {
    const u = new URL(raw, origin);
    if (
      u.hostname !== new URL(origin).hostname ||
      !/^https?:$/.test(u.protocol)
    )
      return null;
    if (
      /\.(?:jpg|jpeg|png|webp|gif|svg|pdf|zip|xml|mp4|ico|woff2?)(?:$)/i.test(
        u.pathname,
      ) ||
      /\/wp-(?:content|includes|json)\//.test(u.pathname)
    )
      return null;
    u.hash = "";
    for (const key of [...u.searchParams.keys()])
      if (key.startsWith("utm_")) u.searchParams.delete(key);
    if (u.search && !u.searchParams.has("page") && !u.searchParams.has("paged"))
      return null;
    return u.href;
  } catch {
    return null;
  }
}
await mkdir(path.join(root, "site"), { recursive: true });
async function discoverXml(url: string, seen = new Set<string>()) {
  if (seen.has(url)) return;
  seen.add(url);
  try {
    const res = await retry(() => fetch(url));
    const body = await res.text();
    await writeFile(
      path.join(
        root,
        "site",
        new URL(url).pathname.replaceAll("/", "_") || "index",
      ),
      body,
    );
    if (!res.ok) {
      issues.push(`Discovery ${url}: HTTP ${res.status}`);
      return;
    }
    for (const m of body.matchAll(/<loc>\s*(.*?)\s*<\/loc>/g)) {
      const loc = m[1].replaceAll("&amp;", "&");
      if (loc.endsWith(".xml")) await discoverXml(loc, seen);
      else {
        const u = normalize(loc);
        if (u) queue.add(u);
      }
    }
    for (const m of body.matchAll(/^Sitemap:\s*(\S+)/gim))
      await discoverXml(m[1], seen);
  } catch (e) {
    issues.push(`Discovery ${url}: ${String(e)}`);
  }
}
await Promise.all([
  discoverXml(`${origin}/wp-sitemap.xml`),
  discoverXml(`${origin}/sitemap_index.xml`),
  discoverXml(`${origin}/robots.txt`),
]);
for (const kind of ["pages", "posts", "categories", "media"]) {
  api[kind] = [];
  try {
    let pages = 1;
    for (let page = 1; page <= pages; page++) {
      const res = await retry(() =>
        fetch(`${origin}/wp-json/wp/v2/${kind}?per_page=100&page=${page}`),
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      pages = Number(res.headers.get("x-wp-totalpages") || 1);
      const rows = await res.json();
      api[kind].push(...rows);
      for (const row of rows) {
        if (kind === "media")
          inventory.push({
            url: row.source_url,
            type: "media",
            status: null,
            title: row.title?.rendered,
            localFolder: null,
            discovery: "WordPress media API",
          });
        else {
          const u = normalize(row.link);
          if (u) queue.add(u);
        }
      }
      await delay(500);
    }
  } catch (e) {
    issues.push(`REST ${kind}: ${String(e)}`);
  }
  await json(path.join(root, "site", `${kind}-api.json`), api[kind]);
}
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  deviceScaleFactor: 1,
});
async function prepare(page: Page) {
  await page.waitForLoadState("networkidle", { timeout: 30000 });
  for (
    let y = 0;
    y < (await page.evaluate(() => document.documentElement.scrollHeight));
    y += 650
  ) {
    await page.evaluate((y) => window.scrollTo(0, y), y);
    await page.waitForTimeout(120);
  }
  await page.evaluate(() => {
    document.querySelectorAll("details").forEach((el) => (el.open = true));
    document
      .querySelectorAll<HTMLElement>(
        '.elementor-tab-title,[role="tab"],[data-toggle="collapse"],.elementor-accordion-title,.elementor-toggle-title',
      )
      .forEach((el) => el.click());
    document
      .querySelectorAll<HTMLElement>("[data-to-value]")
      .forEach((el) => (el.textContent = el.getAttribute("data-to-value")));
    document.querySelectorAll("[data-swiper-slide-index]").forEach((el) => {
      const index = el.getAttribute("data-swiper-slide-index");
      if (
        el.classList.contains("swiper-slide-duplicate") &&
        el.parentElement?.querySelector(
          `[data-swiper-slide-index="${index}"]:not(.swiper-slide-duplicate)`,
        )
      )
        el.remove();
    });
  });
  await page.waitForTimeout(600);
}
const td = new TurndownService({ headingStyle: "atx", bulletListMarker: "-" });
td.remove(["script", "style", "noscript"]);
const results: Record<string, any>[] = [];
async function scrape(url: string) {
  const page = await context.newPage();
  try {
    const response = await retry(() =>
      page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 }),
    );
    const status = response?.status() || 0;
    if (status >= 400) throw new Error(`HTTP ${status}`);
    await prepare(page);
    const data = await page.evaluate(() => {
      const main =
        document.querySelector("main") ||
        document.querySelector('[data-elementor-type="wp-page"]') ||
        document.querySelector("article") ||
        document.body;
      const clean = (s: string) => s.replace(/\[\w+[^\]]*\]/g, "").trim();
      const links = (el: Element) =>
        [...el.querySelectorAll<HTMLAnchorElement>("a[href]")].map((a) => ({
          label: a.textContent?.trim() || a.getAttribute("aria-label") || "",
          href: a.href,
        }));
      const imgs: {
        url: string;
        alt: string;
        width: number;
        height: number;
        section: string;
      }[] = [];
      function add(raw: string | null, el: Element) {
        if (!raw || raw.startsWith("data:") || raw.startsWith("blob:")) return;
        try {
          const url = new URL(raw, location.href).href;
          imgs.push({
            url,
            alt: el.getAttribute("alt") || "",
            width: (el as HTMLImageElement).naturalWidth || 0,
            height: (el as HTMLImageElement).naturalHeight || 0,
            section:
              el.closest("section,[data-id]")?.getAttribute("data-id") || "",
          });
        } catch {}
      }
      document.querySelectorAll("img,source").forEach((el) => {
        for (const attr of [
          "src",
          "data-src",
          "data-lazy-src",
          "data-original",
        ])
          add(el.getAttribute(attr), el);
        for (const attr of ["srcset", "data-srcset", "data-lazy-srcset"])
          for (const candidate of (el.getAttribute(attr) || "").split(","))
            add(candidate.trim().split(/\s+/)[0], el);
      });
      document.querySelectorAll("*").forEach((el) => {
        for (const match of getComputedStyle(el).backgroundImage.matchAll(
          /url\(["']?(.*?)["']?\)/g,
        ))
          add(match[1], el);
      });
      document
        .querySelectorAll('link[rel*="icon"]')
        .forEach((el) => add(el.getAttribute("href"), el));
      const topSections = [
        ...main.querySelectorAll<HTMLElement>(
          ":scope > section,:scope > div > section, :scope > .e-con",
        ),
      ];
      const sections = (
        topSections.length ? topSections : [main as HTMLElement]
      ).map((el, order) => ({
        order,
        id: el.id || el.getAttribute("data-id") || `section-${order}`,
        eyebrow: el.querySelector("h6,h5")?.textContent?.trim() || "",
        heading: el.querySelector("h1,h2,h3")?.textContent?.trim() || "",
        subheading: el.querySelector("h4")?.textContent?.trim() || "",
        body: [...el.querySelectorAll("p")]
          .map((p) => clean(p.textContent || ""))
          .filter(Boolean),
        items: [
          ...el.querySelectorAll(
            ".elementor-icon-box-wrapper,.elementor-image-box-wrapper,.elementor-testimonial-wrapper,.elementor-widget-counter",
          ),
        ].map((i) => ({
          title:
            i
              .querySelector(
                "h3,h4,.elementor-counter-number,.elementor-testimonial-name",
              )
              ?.textContent?.trim() || "",
          subtitle: "",
          text: clean(i.textContent || ""),
          image: i.querySelector("img")?.src || "",
          link: i.querySelector("a")?.href || "",
        })),
        ctas: links(el),
        images: [...el.querySelectorAll("img")].map(
          (i) => i.currentSrc || i.src,
        ),
        background: getComputedStyle(el).backgroundImage,
      }));
      const meta = Object.fromEntries(
        [...document.querySelectorAll("meta")]
          .map((m) => [m.getAttribute("property") || m.name, m.content])
          .filter(([k]) => k),
      );
      const header = document.querySelector(
        'header,[data-elementor-type="header"]',
      );
      const footer = document.querySelector(
        'footer,[data-elementor-type="footer"]',
      );
      return {
        html: main.innerHTML,
        text: clean((main as HTMLElement).innerText),
        headings: [...main.querySelectorAll("h1,h2,h3,h4,h5,h6")].map(
          (h) => h.textContent?.trim() || "",
        ),
        links: links(document.body),
        images: imgs,
        sections,
        shortcodes: (main.textContent || "").match(/\[\w+[^\]]*\]/g) || [],
        meta: {
          url: location.href,
          title: document.title,
          description: meta.description || "",
          canonical: document.querySelector<HTMLLinkElement>(
            'link[rel="canonical"]',
          )?.href,
          robots: meta.robots,
          tags: meta,
          jsonLd: [
            ...document.querySelectorAll('script[type="application/ld+json"]'),
          ].map((s) => s.textContent),
          h1: [...document.querySelectorAll("h1")].map((h) => h.textContent),
          dates: [...document.querySelectorAll("time")].map((t) => t.dateTime),
          category: links(main).filter((l) => l.href.includes("/category/")),
          author: document.querySelector('[rel="author"]')?.textContent,
        },
        global: {
          header: header
            ? {
                text: (header as HTMLElement).innerText,
                links: links(header),
                html: header.outerHTML,
                logos: [...header.querySelectorAll("img")].map((i) => ({
                  src: i.src,
                  alt: i.alt,
                })),
              }
            : null,
          footer: footer
            ? {
                text: (footer as HTMLElement).innerText,
                links: links(footer),
                html: footer.outerHTML,
                logos: [...footer.querySelectorAll("img")].map((i) => ({
                  src: i.src,
                  alt: i.alt,
                })),
              }
            : null,
          icons: [
            ...document.querySelectorAll<HTMLLinkElement>('link[rel*="icon"]'),
          ].map((i) => i.href),
        },
      };
    });
    for (const l of data.links) {
      const next = normalize(l.href);
      if (next) queue.add(next);
    }
    const pathname = new URL(url).pathname;
    const slug = pathname.split("/").filter(Boolean).join("--") || "home";
    const isPost =
      api.posts.some((p) => p.link === url) ||
      required.slice(5).some((p) => new URL(p, origin).href === url);
    const archive = /\/(?:category|author|tag|page)\//.test(pathname);
    const other = /\/(?:cart|checkout|my-account|shop)\//.test(pathname);
    const type = archive
      ? "archive"
      : other
        ? "other"
        : isPost
          ? "post"
          : "page";
    const folder = `${isPost ? "posts" : archive ? "archives" : other ? "other" : "pages"}/${slug}`;
    inventory.push({
      url,
      type,
      status,
      title: data.meta.title,
      localFolder: data.text ? folder : null,
    });
    if (
      archive &&
      (!data.text ||
        api.categories.some((c) => c.link === url && c.count === 0))
    ) {
      inventory[inventory.length - 1].localFolder = null;
      return;
    }
    const dir = path.join(root, folder);
    await mkdir(path.join(dir, "images"), { recursive: true });
    await mkdir(path.join(dir, "screenshots"), { recursive: true });
    const markdown = data.shortcodes.reduce(
      (text, code) => text.replaceAll(td.turndown(code), ""),
      td.turndown(data.html),
    );
    await writeFile(path.join(dir, "content.md"), markdown);
    await writeFile(path.join(dir, "rendered.html"), await page.content());
    await json(path.join(dir, "sections.json"), data.sections);
    await json(path.join(dir, "meta.json"), data.meta);
    await json(path.join(dir, "extraction.json"), {
      text: data.text,
      headings: data.headings,
      links: data.links,
    });
    if (pathname === "/")
      await json(path.join(root, "site", "global.json"), data.global);
    const imageMap = new Map(data.images.map((i) => [i.url, i]));
    for (const i of [...imageMap.values()]) {
      const match = api.media.find(
        (m) =>
          m.source_url === i.url ||
          Object.values(m.media_details?.sizes || {}).some(
            (s: any) => s.source_url === i.url,
          ),
      );
      if (match?.source_url && !imageMap.has(match.source_url))
        imageMap.set(match.source_url, { ...i, url: match.source_url });
      if (match?.media_details?.original_image) {
        const original = new URL(
          match.media_details.original_image,
          match.source_url,
        ).href;
        imageMap.set(original, { ...i, url: original });
      }
    }
    const saved = [];
    for (const image of imageMap.values()) {
      const ext = path.extname(new URL(image.url).pathname) || ".bin";
      const file = `${path
        .basename(new URL(image.url).pathname, ext)
        .replace(/[^a-zA-Z0-9_-]/g, "-")
        .slice(
          0,
          90,
        )}-${createHash("sha256").update(image.url).digest("hex").slice(0, 8)}${ext}`;
      try {
        const res = await retry(async () => {
          const r = await context.request.get(image.url);
          if (!r.ok()) throw new Error(`HTTP ${r.status()}`);
          return r;
        });
        const bytes = await res.body();
        const dimensions = await sharp(bytes).metadata();
        await writeFile(path.join(dir, "images", file), bytes);
        saved.push({
          originalUrl: image.url,
          localFile: `images/${file}`,
          alt: image.alt,
          width: dimensions.width,
          height: dimensions.height,
          section: image.section,
          status: res.status(),
        });
      } catch (e) {
        failures.push(`${url}: missing image ${image.url}: ${String(e)}`);
      }
    }
    await json(path.join(dir, "images", "images.json"), saved);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({
      path: path.join(dir, "screenshots", "desktop-1440.png"),
      fullPage: true,
    });
    await page.setViewportSize({ width: 390, height: 844 });
    await prepare(page);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({
      path: path.join(dir, "screenshots", "mobile-390.png"),
      fullPage: true,
    });
    const words = (s: string) => s.split(/\s+/).filter(Boolean).length;
    const ratio =
      words(data.text) === 0 ? 1 : words(markdown) / words(data.text);
    const normalizeText = (text: string) =>
      text
        .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
        .replace(/\s+/g, " ")
        .trim();
    const missingHeadings = data.headings.filter(
      (h) => h && !normalizeText(markdown).includes(normalizeText(h)),
    );
    if (ratio < 0.98)
      failures.push(`${url}: word coverage ${(ratio * 100).toFixed(1)}%`);
    if (missingHeadings.length)
      failures.push(`${url}: headings missing: ${missingHeadings.join("; ")}`);
    for (const shortcode of data.shortcodes)
      issues.push(`${url}: removed raw shortcode ${shortcode}`);
    results.push({
      url,
      type,
      words: words(data.text),
      markdownWords: words(markdown),
      coverage: ratio,
      images: saved.length,
      expectedImages: imageMap.size,
      headings: data.headings.length,
      missingHeadings,
    });
    process.stdout.write(
      `Captured ${url}: ${words(data.text)} rendered words, ${saved.length} images\n`,
    );
  } catch (e) {
    failures.push(`${url}: ${String(e)}`);
    inventory.push({
      url,
      type: "other",
      status: 0,
      title: "Capture failed",
      localFolder: null,
    });
  } finally {
    await page.close();
  }
}
while ([...queue].some((u) => !visited.has(u))) {
  const batch = [...queue].filter((u) => !visited.has(u)).slice(0, 2);
  batch.forEach((u) => visited.add(u));
  await Promise.all(batch.map(scrape));
  await delay(500);
}
await browser.close();
for (const p of required)
  if (!results.some((r) => new URL(r.url).pathname === p))
    failures.push(`Required inventory missing: ${p}`);
await json(path.join(root, "_inventory.json"), inventory);
await json(path.join(root, "_verification.json"), results);
await writeFile(
  path.join(root, "_report.md"),
  `# Source capture report\n\nCaptured ${new Date().toISOString()}. Discovery: both sitemap endpoints, robots.txt, paginated WordPress pages/posts/categories/media, and rendered breadth-first internal links. Chromium rendering, two workers, 500 ms batch delay, exponential retries.\n\n| URL | Type | Rendered words | Markdown words | Coverage | Images | Headings |\n|---|---|---:|---:|---:|---:|---:|\n${results.map((r) => `| ${r.url} | ${r.type} | ${r.words} | ${r.markdownWords} | ${(r.coverage * 100).toFixed(1)}% | ${r.images}/${r.expectedImages} | ${r.headings - r.missingHeadings.length}/${r.headings} |`).join("\n")}\n\n## Issues\n${issues.map((s) => `- ${s}`).join("\n") || "None."}\n\n## Failures\n${failures.map((s) => `- ${s}`).join("\n") || "None."}\n\n## Editorial decisions required\n- Nav “Brand/Digital Management” vs card “Creative Branding and PR”.\n- Nav “Operational Excellence” vs card “Business Process Excellence”.\n- “Bold Fuse” vs “Boldfuse”.\n- Suspected name typo “Kaa’s kirchen”: preserve the source spelling pending confirmation.\n- Footer Privacy/Terms point to home in the source; future routes follow the explicit brief.\n\n## Scope notes\n- Source HTML and all source captures remain outside public/.\n- Archive and WooCommerce URLs are inventoried; empty archives have no content folder.\n- Carousels are read in DOM order with cloned slides removed. Tabs/disclosures are opened before extraction. Popup markup is retained in rendered.html; no arbitrary external actions are submitted.\n`,
);
if (failures.length)
  throw new Error(
    `Capture failed verification (${failures.length} failures). See content/scraped/_report.md.`,
  );
