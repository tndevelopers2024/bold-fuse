import { chromium } from "playwright";
import { readFile, writeFile } from "node:fs/promises";
const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 1,
});
await page.route("**/*", (route) => route.abort());
const badge = (await readFile("brand-assets/boldfuse-badge.png")).toString(
  "base64",
);
await page.setContent(
  `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><style>*{box-sizing:border-box}body{margin:0;width:1200px;height:630px;background:#ffffff;color:#03281e;font-family:Arial,sans-serif}.content{display:flex;align-items:center;gap:40px;height:608px;padding:64px}h1{font-size:64px;line-height:1.08;letter-spacing:-2.5px;margin:26px 0;font-weight:800}p{font-size:20px;line-height:1.5;color:#026b4d;margin:0;font-weight:600}.text{width:670px}img{width:350px;height:347px;object-fit:contain}.bar{height:22px;background:#02aa77}</style></head><body><div class="content"><div class="text"><p>People | Process | Productivity partners</p><h1>Helping Doctors Build The Best Healthcare</h1><p>Boldfuse</p></div><img alt="Boldfuse" src="data:image/png;base64,${badge}"></div><div class="bar"></div></body></html>`,
);
await page.screenshot({
  path: "src/app/opengraph-image.jpg",
  type: "jpeg",
  quality: 88,
});
const image = await readFile("src/app/opengraph-image.jpg");
if (image.byteLength >= 300000) throw Error("Share image exceeds 300 KB");
await writeFile("src/app/twitter-image.jpg", image);
for (const name of ["opengraph-image", "twitter-image"])
  await writeFile(
    `src/app/${name}.alt.txt`,
    "Boldfuse — Helping Doctors Build The Best Healthcare. People | Process | Productivity partners.\n",
  );
await browser.close();
process.stdout.write(
  `Generated 1200×630 share images (${image.byteLength} bytes each).\n`,
);
