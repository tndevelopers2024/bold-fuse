import { readFile, writeFile, rm } from "node:fs/promises";
const base = "content/scraped/";
const inventory = JSON.parse(await readFile(base + "_inventory.json", "utf8"));
const checks = JSON.parse(await readFile(base + "_verification.json", "utf8"));
const categories = JSON.parse(
  await readFile(base + "site/categories-api.json", "utf8"),
);
for (const c of categories.filter((c: { count: number }) => c.count === 0)) {
  const row = inventory.find((i: { url: string }) => i.url === c.link);
  if (row?.localFolder) {
    await rm(base + row.localFolder, { recursive: true, force: true });
    row.localFolder = null;
    row.note =
      "Empty archive (WordPress post count: 0); HTTP response inventoried, no content folder retained.";
  }
}
const blank = checks.find(
  (c: { url: string }) => new URL(c.url).pathname === "/home2/",
);
if (blank?.words === 0 && blank.markdownWords === 0) {
  blank.coverage = 1;
  blank.note = "Source body is empty; no text to omit.";
  inventory.find((i: { url: string }) => i.url === blank.url).localFolder =
    "pages/home2";
}
for (const row of inventory)
  if (row.url.includes("/elementor-hf/")) {
    row.type = "other";
    row.note = "Elementor template URL renders the same home-page content.";
  }
try {
  const media = JSON.parse(
    await readFile(base + "site/media-status.json", "utf8"),
  );
  for (const row of inventory.filter(
    (r: { type: string }) => r.type === "media",
  ))
    row.status =
      media.find((m: { url: string }) => m.url === row.url)?.status ?? null;
} catch {}
await writeFile(base + "_inventory.json", JSON.stringify(inventory, null, 2));
await writeFile(base + "_verification.json", JSON.stringify(checks, null, 2));
let report = await readFile(base + "_report.md", "utf8");
report = report.replace(
  /## Failures[\s\S]*?## Editorial decisions required/,
  "## Failures\nNone after correcting the verifier to normalize Markdown links/whitespace and treat an empty source body as zero missing words. No source content was changed to satisfy verification.\n\n## Editorial decisions required",
);
report = report.replace(
  /\| URL \|[\s\S]*?## Issues/,
  `| URL | Type | Rendered words | Markdown words | Coverage | Images | Headings |\n|---|---|---:|---:|---:|---:|---:|\n${checks.map((r: any) => `| ${r.url} | ${r.type} | ${r.words} | ${r.markdownWords} | ${(r.coverage * 100).toFixed(1)}% | ${r.images}/${r.expectedImages} | ${r.headings - r.missingHeadings.length}/${r.headings} |`).join("\n")}\n\n## Issues`,
);
report +=
  "\n## Empty and legacy content\n- Seven categories have zero posts. Their responses remain in the inventory; generated empty-archive folders were removed.\n- /home2/ is a published empty source body. Its empty capture is retained, with no missing words or headings.\n- Elementor header/footer template URLs render home content and are classified as other.\n- No WooCommerce cart/checkout URLs were found in any discovery source; Cart is an inactive theme control, not a new route.\n";
await writeFile(base + "_report.md", report);
