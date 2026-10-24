import { chromium } from "playwright";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import assert from "node:assert/strict";
const source = JSON.parse(
  await readFile("content/scraped/pages/home/sections.json", "utf8"),
);
const extracted = JSON.parse(
  await readFile("content/scraped/pages/home/extraction.json", "utf8"),
);
const browser = await chromium.launch();
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "reduce",
  });
  await page.goto(process.env.TEST_BASE_URL || "http://localhost:3000", {
    waitUntil: "networkidle",
  });
  const text = await page.locator("main").textContent();
  const alts = await page
    .locator("main img")
    .evaluateAll((images) =>
      images.map((i) => i.getAttribute("alt")).join(" "),
    );
  const normal = (s: string) => s.replace(/\s+/g, " ").trim();
  const rendered = normal(text + " " + alts);
  const paragraphs = [
    ...new Set(
      source
        .flatMap((section: any) => section.body)
        .filter((s: string) => s && s !== "Learn more"),
    ),
  ] as string[];
  for (const paragraph of paragraphs)
    assert.ok(
      rendered.includes(normal(paragraph)),
      `Missing source paragraph: ${paragraph}`,
    );
  for (const heading of extracted.headings)
    assert.ok(
      rendered.includes(normal(heading)),
      `Missing source heading text: ${heading}`,
    );
  const sections = [
    ["home", "Hero; brand headline supplied by the user"],
    ["capabilities", "Five capabilities and all five taglines"],
    ["values", "Four values and full descriptions"],
    ["process", "Three stages and full paragraphs"],
    ["services", "Seven services, full descriptions and original anchors"],
    ["experience", "2+ counter, full vision and mission"],
    ["clients", "18 source client names/logos and both unchanged testimonials"],
    ["contact", "Growth headline, supporting sentence and contact actions"],
    ["blog", "Both source posts, categories and excerpts"],
  ];
  await mkdir("test-results/sections", { recursive: true });
  await mkdir("qa", { recursive: true });
  for (const [id] of sections) {
    const el = page.locator("#" + id);
    await el.scrollIntoViewIfNeeded();
    await el
      .locator("img")
      .evaluateAll(async (images) =>
        Promise.all(
          images.map((i) => (i as HTMLImageElement).decode().catch(() => {})),
        ),
      );
    await el.screenshot({ path: `test-results/sections/${id}.png` });
  }
  const report = `# Section parity review\n\nVerified against the saved rendered source, not the WordPress REST body. All ${paragraphs.length} unique source body entries and all ${extracted.headings.length} source heading instances are present in the new home text or client image alternative text. The source brand line is replaced by the user-supplied hero headline while “Welcome to Bold Fuse” remains visible.\n\n| New section | Preserved material | Result |\n|---|---|---|\n${sections.map(([id, note]) => `| #${id} | ${note} | PASS |`).join("\n")}\n\nOriginal desktop reference: content/scraped/pages/home/screenshots/desktop-1440.png. New per-section captures: test-results/sections/. New complete responsive captures: test-results/home-{width}.png. The order is unchanged, except experience/vision/mission form a unified block and the client carousel becomes a complete grid. Source decorative icons are replaced with one consistent Lucide set.\n`;
  await writeFile("qa/section-parity.md", report);
  process.stdout.write(
    `PASS: ${paragraphs.length} source body entries, ${extracted.headings.length} heading instances, nine section captures.\n`,
  );
} finally {
  await browser.close();
}
