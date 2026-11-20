import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { routes, indexablePaths, noIndexPaths, serviceNavigation } from "../src/config/routes.ts";
const base = process.env.TEST_BASE_URL || "http://localhost:3000";
await mkdir("test-results", { recursive: true });
const browser = await chromium.launch();
try {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "reduce",
  });
  // Keep external map availability out of application regression checks.
  // The browser still enforces our production CSP before this response is used.
  await context.route(/^https:\/\/(?:www\.google\.com|maps\.google\.com)\/maps(?:\/|\?)/, async (route) => {
    await route.fulfill({ status: 200, contentType: "text/html", body: '<!doctype html><html lang="en"><head><title>Map preview fixture</title></head><body><p>External map preview</p></body></html>' });
  });
  const page = await context.newPage();
  page.setDefaultTimeout(15000);
  const errors: string[] = [];
  const csp: string[] = [];
  page.on("pageerror", (e) => errors.push(`${page.url()}: ${e.message}`));
  page.on("response", (response) => {
    if (
      response.status() >= 400 &&
      response.request().resourceType() !== "document"
    )
      errors.push(`Failed resource: ${response.status()} ${response.url()}`);
  });
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
    "Tough minds who love challenges",
    "Make us compatible with you",
    "Our Superskills for your Business",
    "Our Vision",
    "What client say about us",
    "Build a stronger healthcare business.",
    "Keeping Up with Boldfuse",
  ];
  for (const heading of headings)
    assert.equal(
      await page.getByRole("heading", { name: heading, exact: true }).count(),
      1,
      heading,
    );
  assert.ok((await page.locator("#clients img").count()) >= 18);
  assert.ok((await page.locator("#clients blockquote").count()) >= 2);
  assert.equal(
    await page.locator('#services a[href^="/services/#"]').count(),
    7,
  );
  assert.ok(await page.locator("#experience").isVisible());
  assert.equal(await page.locator('link[rel="canonical"]').count(), 1);
  assert.ok(
    await page.locator('#home a[href="/#services"]').isVisible(),
    "Reduced-motion hero CTA stays visible",
  );
  assert.ok(
    await page.locator("#home .lede").isVisible(),
    "Reduced-motion hero description stays visible",
  );
  assert.ok(
    Number(
      await page
        .locator("#home .lede")
        .evaluate((el) => getComputedStyle(el.parentElement!).opacity),
    ) > 0,
    "Reduced-motion hero copy is not transparent",
  );
  for (const property of ["og:image", "twitter:image"]) {
    const content = await page
      .locator(`meta[property="${property}"],meta[name="${property}"]`)
      .first()
      .getAttribute("content");
    assert.ok(
      content && /^https?:\/\//.test(content),
      `${property} must be absolute`,
    );
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
      /^https:\/\/(www\.)?(facebook\.com|instagram\.com|linkedin\.com|wa\.me)\//,
    );
    assert.equal(link.target, "_blank");
    assert.ok(link.rel?.includes("noopener"));
    assert.ok(link.rel?.includes("noreferrer"));
  }
  const desktopToggle = page.getByRole("button", {
    name: "Toggle services menu",
    exact: true,
  });
  await desktopToggle.focus();
  await page.keyboard.press("Enter");
  assert.equal(await desktopToggle.getAttribute("aria-expanded"), "true");
  await page
    .locator('header nav a[href="/services/#businessautomation"]')
    .first()
    .waitFor({ state: "visible" });
  await page.keyboard.press("Tab");
  assert.equal(
    await page.locator(":focus").getAttribute("href"),
    routes[serviceNavigation[0]].path,
  );
  await page.keyboard.press("Escape");
  assert.equal(await desktopToggle.getAttribute("aria-expanded"), "false");
  const axeResults = [];
  const viewports = (
    process.env.TEST_VIEWPORTS || "360,390,768,1024,1280,1440,1920"
  )
    .split(",")
    .map(Number);
  for (const width of viewports) {
    process.stdout.write(`Checking home at ${width}px\n`);
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
      images.forEach((image) => {
        (image as HTMLImageElement).loading = "eager";
      });
      await Promise.race([
        new Promise((resolve) => setTimeout(resolve, 10000)),
        Promise.all(
          images
            .filter((i) => i.getClientRects().length > 0)
            .map((i) => (i as HTMLImageElement).decode().catch(() => {})),
        ),
      ]);
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
    await page
      .locator("html")
      .evaluate((e) => e.classList.contains("menu-open")),
    true,
  );
  for (let i = 0; i < 14; i++) {
    await page.keyboard.press("Tab");
    assert.equal(
      await page.locator(":focus").evaluate((e) => !!e.closest("dialog")),
      true,
    );
  }
  const mobileToggle = page.getByRole("button", {
    name: "Toggle services list",
  });
  await mobileToggle.focus();
  await page.keyboard.press("Enter");
  assert.ok(
    await page
      .locator('dialog a[href="/services/#businessautomation"]')
      .isVisible(),
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
        .filter(
          (r) =>
            r.status === "planned" && !["/home1/", "/home2/"].includes(r.path),
        )
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
  await page.goto(base + "/missing-production-check/", {
    waitUntil: "networkidle",
  });
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
  const sitemap = await (
    await context.request.get(base + "/sitemap.xml")
  ).text();
  const locations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(
    (m) => new URL(m[1]).pathname,
  );
  assert.deepEqual(locations.sort(), [...indexablePaths].sort());
  for (const legacy of ["/home1/", "/home2/"]) {
    const res = await context.request.get(base + legacy, { maxRedirects: 0 });
    assert.equal(res.status(), 308);
    assert.equal(new URL(res.headers().location, base).pathname, "/");
  }
  const built = [
    ...new Set(
      Object.values(routes)
        .filter((r) => r.status === "built")
        .map((r) => r.path.split("#")[0]),
    ),
  ];
  const internalLinks = new Set<string>();
  const allPageAxe = [];
  for (const path of built) {
    process.stdout.write(`Checking ${path}\n`);
    const res = await page.goto(base + path, { waitUntil: "networkidle" });
    assert.equal(res?.status(), 200, path);
    assert.equal(await page.locator("main#main-content").count(), 1, path);
    assert.equal(await page.locator("h1").count(), 1, path);
    const canonical = await page
      .locator('link[rel="canonical"]')
      .getAttribute("href");
    assert.equal(new URL(canonical!).pathname, path, `Canonical: ${path}`);
    assert.equal(
      (
        await page.locator('meta[property="og:title"]').getAttribute("content")
      )?.replace(/ \| Boldfuse$/, ""),
      (await page.title()).replace(/ \| Boldfuse$/, ""),
      `Sharing title: ${path}`,
    );
    assert.equal(
      new URL(
        (await page
          .locator('meta[property="og:url"]')
          .getAttribute("content"))!,
      ).pathname,
      path,
      `Sharing URL: ${path}`,
    );
    if (noIndexPaths.includes(path))
      assert.match(
        (await page
          .locator('meta[name="robots"]')
          .first()
          .getAttribute("content")) || "",
        /noindex/,
      );
    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      assert.ok(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `Overflow: ${path} at ${width}`,
      );
      if (
        ["/about/", "/services/", "/contact/", "/book-appointment/"].includes(
          path,
        )
      )
        await page.screenshot({
          path: `test-results/${path.slice(1, -1)}-${width}.png`,
          fullPage: true,
        });
    }
    const links = await page
      .locator('a[href^="/"]')
      .evaluateAll((els) => els.map((e) => e.getAttribute("href")!));
    links.forEach((href) => internalLinks.add(href));
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    allPageAxe.push({ path, violations: result.violations });
    csp.push(...(await page.evaluate(() => (window as any).__csp || [])));
  }
  await writeFile(
    "test-results/routes.json",
    JSON.stringify({ built, axe: allPageAxe }, null, 2),
  );
  assert.deepEqual(
    allPageAxe.flatMap(({ path, violations }) =>
      violations
        .filter((v) => ["serious", "critical"].includes(v.impact || ""))
        .map((v) => ({
          path,
          rule: v.id,
          elements: v.nodes.map((node) => node.target),
        })),
    ),
    [],
    "Accessibility across all pages",
  );
  for (const href of internalLinks) {
    const url = new URL(href, base);
    const res = await context.request.get(url.href);
    assert.equal(res.status(), 200, `Broken internal link: ${href}`);
    if (url.hash) {
      const html = await res.text();
      assert.ok(
        html.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`),
        `Missing anchor: ${href}`,
      );
    }
  }
  await page.goto(base + "/book-appointment/?service=Anxiety%20Counselling", {
    waitUntil: "networkidle",
  });
  assert.equal(
    await page.locator("#booking-service").inputValue(),
    "Anxiety Counselling",
  );
  await page.evaluate(() => {
    (window as any).open = (url: string) => {
      (window as any).__handoff = url;
      return null;
    };
  });
  await page.getByRole("button", { name: "Send on WhatsApp" }).click();
  assert.equal(
    await page.evaluate(() => (window as any).__handoff),
    undefined,
    "Required fields prevent submission",
  );
  await page.locator("#booking-name").fill("Production Check");
  await page.locator("#booking-phone").fill("9000000000");
  await page.getByRole("button", { name: "Send on WhatsApp" }).click();
  const handoff = new URL(await page.evaluate(() => (window as any).__handoff));
  assert.equal(handoff.origin, "https://wa.me");
  assert.match(handoff.searchParams.get("text") || "", /Production Check/);
  assert.match(handoff.searchParams.get("text") || "", /Anxiety Counselling/);
  assert.match(
    (await page
      .getByRole("link", { name: "Email us instead" })
      .getAttribute("href")) || "",
    /^mailto:/,
  );
  await page.goto(base + "/contact/", { waitUntil: "networkidle" });
  assert.equal(
    await page
      .getByRole("textbox", { name: "Email address" })
      .getAttribute("required"),
    "",
  );
  assert.match(
    (await page.getByRole("status").textContent()) || "",
    /opens your email app/,
  );
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto(base, { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  assert.ok(
    await page
      .getByRole("heading", { name: headings[0], exact: true })
      .isVisible(),
  );
  csp.push(...(await page.evaluate(() => (window as any).__csp || [])));
  assert.deepEqual(csp, [], "CSP across all routes");
  assert.deepEqual(errors, [], "Browser errors across all routes");
  await writeFile(
    "test-results/routes.json",
    JSON.stringify(
      { built, internalLinks: [...internalLinks], axe: allPageAxe },
      null,
      2,
    ),
  );
  const report = {
    passed: true,
    viewports,
    plannedRoutes: planned.length,
    axe: axeResults,
    notFoundAxe: notFoundAxe.violations,
    consoleErrors: errors,
    cspViolations: csp,
    headers: header,
  };
  await writeFile("test-results/results.json", JSON.stringify(report, null, 2));

  process.stdout.write(
    `PASS: ${viewports.length} viewports, ${built.length} built pages, ${internalLinks.size} internal links, ${planned.length} planned 404 routes, booking validation, keyboard menus, metadata, security headers and axe.\n`,
  );
} finally {
  await browser.close();
}
