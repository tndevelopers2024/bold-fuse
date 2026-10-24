import { readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";
const root = "content/scraped/";
const read = async (file: string) =>
  JSON.parse(await readFile(root + file, "utf8"));
const inventory = await read("_inventory.json");
const verification = await read("_verification.json");
const media = await read("site/media-api.json");
let added = 0;
const cache = new Map<string, Buffer>();
for (const entry of inventory.filter((row: any) => row.localFolder)) {
  const file = entry.localFolder + "/images/images.json";
  const images = await read(file);
  for (const item of media.filter(
    (m: any) =>
      m.media_details?.original_image &&
      images.some((i: any) => i.originalUrl === m.source_url),
  )) {
    const url = new URL(item.media_details.original_image, item.source_url)
      .href;
    if (images.some((i: any) => i.originalUrl === url)) continue;
    if (!cache.has(url)) {
      const response = await fetch(url);
      if (!response.ok)
        throw Error(`Original unavailable: ${url}: ${response.status}`);
      cache.set(url, Buffer.from(await response.arrayBuffer()));
    }
    const filename =
      path
        .basename(new URL(url).pathname, path.extname(url))
        .replace(/[^a-zA-Z0-9_-]/g, "-") +
      "-" +
      createHash("sha256").update(url).digest("hex").slice(0, 8) +
      path.extname(url);
    await writeFile(
      root + entry.localFolder + "/images/" + filename,
      cache.get(url)!,
    );
    images.push({
      originalUrl: url,
      localFile: "images/" + filename,
      alt: item.alt_text || "",
      width: 0,
      height: 0,
      section: "media-original",
      status: 200,
    });
    const row = verification.find((r: any) => r.url === entry.url);
    row.images++;
    row.expectedImages++;
    added++;
  }
  await writeFile(root + file, JSON.stringify(images, null, 2));
}
await writeFile(
  root + "_verification.json",
  JSON.stringify(verification, null, 2),
);
process.stdout.write(
  `Added ${added} full-resolution original references (${cache.size} unique files).\n`,
);
