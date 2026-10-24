import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";
import assert from "node:assert/strict";
import { mkdir, writeFile, readFile } from "node:fs/promises";
import { routes } from "../src/config/routes.ts";
const base = process.env.TEST_BASE_URL || "http://localhost:3000";
await mkdir("test-results", { recursive: true });
const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: "reduce",
});
const page = await context.newPage();
const errors: string[] = [];
const csp: string[] = [];
page.on("pageerror", (e) => errors.push(e.message));
page.on("console", (m) => {
  if (m.type() === "error" && !m.text().includes("404 (Not Found)"))
    errors.push(m.text());
});
await page.addInitScript(() =>
  document.addEventListener(
    "securitypolicyviolation",
    (e) =>
      ((window as any).__csp = [
        ...((window as any).__csp || []),
        e.violatedDirective,
      ]),
  ),
);
const response = await page.goto(base, { waitUntil: "networkidle" });
assert.equal(response?.status(), 200);
assert.match(await page.title(), /Boldfuse/);
const headings = [
  "Helping Doctors Build The Best Healthcare",
  "Multiply your strengths, Eliminate your weaknesses.",
  "Make us compatible with you",
  "We partner up with people at the top to make the best out of their extraordinary team.",
  "Dictate the trajectory of your business with our super skills",
  "Our Vision",
  "What client say about us",
  "We invest in your business knowing that we are pretty good at making our investment fruitful.",
  "Keeping Up with Boldfuse",
];
for (const heading of headings)
  assert.equal(
    await page.getByRole("heading", { name: heading, exact: true }).count(),
    1,
    heading,
  );
assert.equal(await page.locator("#clients img").count(), 18);
assert.equal(await page.locator("#clients blockquote").count(), 2);
assert.equal(await page.locator("#services .swipe-mobile > *").count(), 7);
assert.match(await page.locator("#experience").innerText(), /2\+/);
assert.equal(await page.locator('link[rel="canonical"]').count(), 1);
for (const property of ["og:image", "twitter:image"]) {
  const content = await page
    .locator(`meta[property="${property}"],meta[name="${property}"]`)
    .first()
    .getAttribute("content");
  assert.ok(content?.startsWith(base), `${property} must be absolute`);
}
for (const property of ["og:image:width", "og:image:height", "og:image:alt"])
  assert.ok(
    await page
      .locator(`meta[property="${property}"]`)
      .first()
      .getAttribute("content"),
  );
const header = response!.headers();
for (const key of [
  "content-security-policy",
  "strict-transport-security",
  "x-content-type-options",
  "permissions-policy",
  "x-frame-options",
  "cross-origin-opener-policy",
])
  assert.ok(header[key], key);
assert.equal(header["x-powered-by"], undefined);
const external = await page.locator('a[href^="http"]').evaluateAll((els) =>
  els.map((e) => ({
    href: (e as HTMLAnchorElement).href,
    target: e.getAttribute("target"),
    rel: e.getAttribute("rel"),
  })),
);
for (const link of external) {
  assert.match(
    link.href,
    /^https:\/\/(www\.)?(facebook\.com|instagram\.com|linkedin\.com)\//,
  );
  assert.equal(link.target, "_blank");
  assert.ok(link.rel?.includes("noopener"));
  assert.ok(link.rel?.includes("noreferrer"));
}
const desktopSummary = page.locator("header > div nav details > summary");
await desktopSummary.focus();
await page.keyboard.press("Enter");
assert.ok(
  (await page.locator("header > div nav details").getAttribute("open")) !==
    null,
);
await page.keyboard.press("Tab");
assert.equal(await page.locator(":focus").textContent(), "Services");
await page.keyboard.press("Escape");
assert.equal(
  await page.locator("header > div nav details").getAttribute("open"),
  null,
);
const axeResults = [];
for (const width of [360, 390, 768, 1024, 1280, 1440, 1920]) {
  await page.setViewportSize({ width, height: 1000 });
  for (
    let y = 0;
    y < (await page.evaluate(() => document.documentElement.scrollHeight));
    y += 850
  ) {
    await page.evaluate((y) => window.scrollTo(0, y), y);
    await page.waitForTimeout(70);
  }
  await page.locator("img").evaluateAll(async (images) => {
    await Promise.all(
      images
        .filter((i) => i.getClientRects().length > 0)
        .map((i) => (i as HTMLImageElement).decode().catch(() => {})),
    );
  });
  assert.deepEqual(
    await page
      .locator("img")
      .evaluateAll((images) =>
        images
          .filter(
            (i) =>
              i.getClientRects().length > 0 &&
              !(i as HTMLImageElement).naturalWidth,
          )
          .map((i) => i.getAttribute("alt")),
      ),
    [],
    "Every local image must load",
  );
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(150);
  const size = await page.evaluate(() => ({
    scroll: document.documentElement.scrollWidth,
    width: innerWidth,
  }));
  assert.ok(
    size.scroll <= size.width,
    `Horizontal overflow at ${width}: ${size.scroll}`,
  );
  const small = await page
    .locator(
      "main p.lede, #services .swipe-mobile p, #process article > p:not(:first-child)",
    )
    .evaluateAll((elements) =>
      elements
        .filter(
          (el) =>
            el.getClientRects().length &&
            parseFloat(getComputedStyle(el).fontSize) < 14,
        )
        .map((el) => el.textContent),
    );
  assert.deepEqual(small, [], `Body copy under 14px at ${width}`);
  await page.screenshot({
    path: `test-results/home-${width}.png`,
    fullPage: true,
  });
  if ([390, 1440].includes(width))
    await page.screenshot({ path: `test-results/hero-${width}.png` });
  if ([390, 1440].includes(width)) {
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    axeResults.push({ width, violations: result.violations });
    assert.deepEqual(
      result.violations.filter((v) =>
        ["serious", "critical"].includes(v.impact || ""),
      ),
      [],
      `Axe ${width}`,
    );
  }
}
await page.setViewportSize({ width: 390, height: 844 });
await page.getByRole("button", { name: "Open menu" }).focus();
await page.keyboard.press("Enter");
assert.equal(
  await page.locator("dialog").evaluate((e: HTMLDialogElement) => e.open),
  true,
);
assert.equal(
  await page.locator("html").evaluate((e) => e.classList.contains("menu-open")),
  true,
);
for (let i = 0; i < 14; i++) {
  await page.keyboard.press("Tab");
  assert.equal(
    await page.locator(":focus").evaluate((e) => !!e.closest("dialog")),
    true,
  );
}
await page.locator("dialog summary").focus();
await page.keyboard.press("Enter");
assert.equal(
  (await page.locator("dialog details").getAttribute("open")) !== null,
  true,
);
await page.keyboard.press("Escape");
assert.equal(
  await page.locator("dialog").evaluate((e: HTMLDialogElement) => e.open),
  false,
);
assert.equal(
  await page.locator(":focus").getAttribute("aria-label"),
  "Open menu",
);
const planned = [
  ...new Set(
    Object.values(routes)
      .filter((r) => r.status === "planned")
      .map((r) => r.path.split("#")[0]),
  ),
];
for (const route of planned) {
  const res = await context.request.get(base + route);
  assert.equal(res.status(), 404, route);
  const body = await res.text();
  assert.ok(
    body.includes("Let’s get you back on track.") ||
      body.includes("Let&#x27;s get you back on track.") ||
      body.includes("Let’s get you back on track"),
    route,
  );
  assert.match(body, /noindex/);
  assert.match(body, /Page not found \| Boldfuse/);
}
await page.goto(base + "/about/", { waitUntil: "networkidle" });
await page.screenshot({
  path: "test-results/not-found-390.png",
  fullPage: true,
});
const notFoundAxe = await new AxeBuilder({ page })
  .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
  .analyze();
assert.deepEqual(
  notFoundAxe.violations.filter((v) =>
    ["serious", "critical"].includes(v.impact || ""),
  ),
  [],
);
await page.getByRole("link", { name: "Our services", exact: true }).click();
await page.waitForURL("**/#services");
assert.equal(await page.locator("#services").count(), 1);
csp.push(...(await page.evaluate(() => (window as any).__csp || [])));
assert.deepEqual(csp, []);
assert.deepEqual(errors, []);
const sitemap = await (await context.request.get(base + "/sitemap.xml")).text();
assert.equal((sitemap.match(/<loc>/g) || []).length, 1);
const report = {
  passed: true,
  viewports: [360, 390, 768, 1024, 1280, 1440, 1920],
  plannedRoutes: planned.length,
  axe: axeResults,
  notFoundAxe: notFoundAxe.violations,
  consoleErrors: errors,
  cspViolations: csp,
  headers: header,
};
await writeFile("test-results/results.json", JSON.stringify(report, null, 2));
await browser.close();
process.stdout.write(
  `PASS: seven viewports, ${planned.length} planned 404 routes, keyboard menus, source content, metadata, security headers and axe.\n`,
);
