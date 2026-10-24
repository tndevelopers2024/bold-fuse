import { readFile, writeFile, access } from "node:fs/promises";
import path from "node:path";
const root = path.resolve("content/scraped");
const inventory = JSON.parse(
  await readFile(path.join(root, "_inventory.json"), "utf8"),
);
const results = JSON.parse(
  await readFile(path.join(root, "_verification.json"), "utf8"),
);
const plain = (s: string) =>
  s
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
const failures: string[] = [];
for (const entry of inventory.filter(
  (i: { localFolder: string }) => i.localFolder,
)) {
  const dir = path.join(root, entry.localFolder);
  const data = JSON.parse(
    await readFile(path.join(dir, "extraction.json"), "utf8"),
  );
  const md = await readFile(path.join(dir, "content.md"), "utf8");
  const missing = data.headings.filter(
    (h: string) => h && !plain(md).includes(plain(h)),
  );
  const result = results.find((r: { url: string }) => r.url === entry.url);
  if (result) {
    result.missingHeadings = missing;
    result.markdownWords = md.split(/\s+/).filter(Boolean).length;
    result.coverage = result.words ? result.markdownWords / result.words : 1;
  }
  if (missing.length)
    failures.push(`${entry.url}: missing headings ${missing.join("; ")}`);
  if (result?.coverage < 0.98)
    failures.push(`${entry.url}: word coverage below 98%`);
  if (result && result.images !== result.expectedImages)
    failures.push(`${entry.url}: image downloads incomplete`);
  const images = JSON.parse(
    await readFile(path.join(dir, "images/images.json"), "utf8"),
  );
  for (const image of images) await access(path.join(dir, image.localFile));
  for (const file of [
    "rendered.html",
    "sections.json",
    "meta.json",
    "screenshots/desktop-1440.png",
    "screenshots/mobile-390.png",
  ])
    await access(path.join(dir, file));
}
await writeFile(
  path.join(root, "_verification.json"),
  JSON.stringify(results, null, 2),
);
let report = await readFile(path.join(root, "_report.md"), "utf8");
report = report.replace(/- .*?: headings missing: .*\n/g, "");
report += `\n## Independent saved-capture verification\n\n${failures.length ? failures.map((s) => "- " + s).join("\n") : "PASS: All saved content folders meet 98% word coverage, preserve every heading (normalizing Markdown links and whitespace), contain every discovered image variant, and include both viewport screenshots."}\n`;
await writeFile(path.join(root, "_report.md"), report);
if (failures.length) throw new Error(failures.join("\n"));
process.stdout.write(`Verified ${results.length} rendered captures.\n`);
