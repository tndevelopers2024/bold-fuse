import { readFile, writeFile } from "node:fs/promises";
const media = JSON.parse(
  await readFile("content/scraped/site/media-api.json", "utf8"),
);
const results = [];
for (let i = 0; i < media.length; i += 2) {
  results.push(
    ...(await Promise.all(
      media.slice(i, i + 2).map(async (m: { source_url: string }) => {
        try {
          const r = await fetch(m.source_url, {
            method: "HEAD",
            signal: AbortSignal.timeout(30000),
          });
          return { url: m.source_url, status: r.status };
        } catch {
          return { url: m.source_url, status: 0 };
        }
      }),
    )),
  );
  await new Promise((r) => setTimeout(r, 500));
}
await writeFile(
  "content/scraped/site/media-status.json",
  JSON.stringify(results, null, 2),
);
process.stdout.write(
  `Checked ${results.length} uploaded media URLs; ${results.filter((r) => r.status !== 200).length} non-200 responses.\n`,
);
