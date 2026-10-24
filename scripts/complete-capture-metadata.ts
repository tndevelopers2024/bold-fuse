import { readFile, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const sharp = createRequire(require.resolve("next/package.json"))("sharp");
const root = "content/scraped/";
const inventory = JSON.parse(await readFile(root + "_inventory.json", "utf8"));
let count = 0;
for (const entry of inventory.filter((r: any) => r.localFolder)) {
  const file = root + entry.localFolder + "/images/images.json";
  const images = JSON.parse(await readFile(file, "utf8"));
  for (const image of images) {
    const meta = await sharp(
      root + entry.localFolder + "/" + image.localFile,
    ).metadata();
    image.width = meta.width;
    image.height = meta.height;
    count++;
  }
  await writeFile(file, JSON.stringify(images, null, 2));
}
const file = root + "site/global.json";
const global = JSON.parse(await readFile(file, "utf8"));
global.footerColumns = [
  {
    title: "Reach us",
    items: [global.contact.phone, global.contact.email, global.contact.address],
  },
  {
    title: "Quick Links",
    items: global.footer.links.filter((l: any) =>
      ["Home", "About Us", "Services", "Contact Us"].includes(l.label),
    ),
  },
  { title: "Social Media", items: global.socialProfiles },
  { title: "Our other brands", items: global.sisterBrands },
];
await writeFile(file, JSON.stringify(global, null, 2));
process.stdout.write(
  `Recorded actual dimensions for ${count} captured images and structured footer columns.\n`,
);
