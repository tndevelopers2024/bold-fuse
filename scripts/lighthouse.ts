import lighthouse from "lighthouse";
import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import assert from "node:assert/strict";
const browser = await chromium.launch({
  headless: true,
  args: ["--remote-debugging-port=9222"],
});
try {
  const result = await lighthouse(
    process.env.TEST_BASE_URL || "http://localhost:3000",
    {
      port: 9222,
      output: ["json", "html"],
      onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
      logLevel: "error",
    },
  );
  if (!result) throw Error("Lighthouse returned no report");
  await mkdir("test-results", { recursive: true });
  await writeFile("test-results/lighthouse.json", result.report[0]);
  await writeFile("test-results/lighthouse.html", result.report[1]);
  const scores = Object.fromEntries(
    Object.entries(result.lhr.categories).map(([key, value]) => [
      key,
      Math.round((value.score || 0) * 100),
    ]),
  );
  const metrics = {
    lcp: result.lhr.audits["largest-contentful-paint"].numericValue,
    cls: result.lhr.audits["cumulative-layout-shift"].numericValue,
  };
  process.stdout.write(JSON.stringify({ scores, metrics }, null, 2) + "\n");
  assert.ok(scores.performance >= 95, "Performance must be at least 95");
  for (const key of ["accessibility", "best-practices", "seo"])
    assert.equal(scores[key], 100, key);
  assert.ok((metrics.lcp || 0) < 2500, "LCP must be under 2.5 s");
  assert.ok((metrics.cls || 0) < 0.05, "CLS must be under 0.05");
} finally {
  await browser.close();
}
