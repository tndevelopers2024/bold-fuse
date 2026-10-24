import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";
import assert from "node:assert/strict";
const browser = await chromium.launch();
try {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(process.env.TEST_BASE_URL || "http://localhost:3000", {
    waitUntil: "networkidle",
  });
  const hero = page.locator("#home");
  const choose = (n: number) =>
    hero.getByRole("button", { name: `Go to slide ${n}`, exact: true });
  const active = () =>
    hero.locator('button[aria-current="true"]').getAttribute("aria-label");
  assert.equal(
    await hero.getByRole("button", { name: /Go to slide/ }).count(),
    3,
  );
  const height = await hero.evaluate((el) => el.getBoundingClientRect().height);
  assert.equal(await active(), "Go to slide 1");
  await hero.getByRole("button", { name: "Next slide", exact: true }).click();
  assert.equal(await active(), "Go to slide 2");
  assert.equal(
    await hero
      .getByRole("link", { name: /Learn more Services/ })
      .getAttribute("href"),
    "/services/",
  );
  await page.keyboard.press("ArrowRight");
  assert.equal(await active(), "Go to slide 3");
  assert.equal(
    await hero
      .getByRole("link", { name: /Get Started Contact/ })
      .getAttribute("href"),
    "/contact/",
  );
  await hero.getByRole("button", { name: "Next slide", exact: true }).click();
  assert.equal(await active(), "Go to slide 1");
  await hero
    .getByRole("button", { name: "Previous slide", exact: true })
    .click();
  assert.equal(await active(), "Go to slide 3");
  await choose(1).click();
  assert.equal(
    await hero.evaluate((el) => el.getBoundingClientRect().height),
    height,
  );
  for (const width of [360, 390, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    const stable = await hero.evaluate(
      (el) => el.getBoundingClientRect().height,
    );
    for (let n = 1; n <= 3; n++) {
      await choose(n).click();
      assert.equal(await active(), `Go to slide ${n}`);
      assert.equal(
        await hero.evaluate((el) => el.getBoundingClientRect().height),
        stable,
      );
      assert.ok(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      );
      assert.equal(await hero.getByRole("link").count(), 2);
      const axe = await new AxeBuilder({ page })
        .include("#home")
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      assert.deepEqual(
        axe.violations.filter((v) =>
          ["serious", "critical"].includes(v.impact || ""),
        ),
        [],
      );
      await hero
        .locator("img")
        .evaluateAll(async (images) =>
          Promise.all(images.map((i) => i.decode())),
        );
      if (width !== 360)
        await hero.screenshot({
          path: `test-results/carousel-${width}-slide-${n}.png`,
        });
    }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await choose(1).click();
  await hero.evaluate((el) => {
    const start = new Touch({
      identifier: 1,
      target: el,
      clientX: 300,
      clientY: 400,
    });
    const end = new Touch({
      identifier: 1,
      target: el,
      clientX: 100,
      clientY: 405,
    });
    el.dispatchEvent(
      new TouchEvent("touchstart", { touches: [start], bubbles: true }),
    );
    el.dispatchEvent(
      new TouchEvent("touchend", { changedTouches: [end], bubbles: true }),
    );
  });
  assert.equal(await active(), "Go to slide 2");
  assert.deepEqual(errors, []);
  process.stdout.write(
    "PASS: three slides, arrows, wraparound, indicators, keyboard, swipe, stable heights, responsive layouts and axe.\n",
  );
} finally {
  await browser.close();
}
