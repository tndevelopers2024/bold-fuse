import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

// Reuse the encoder installed by Next.js; the original photo stays untouched.
const requireNext = createRequire(import.meta.resolve("next"));
const sharp = requireNext("sharp");
const source = fileURLToPath(
  new URL("../src/assets/banner-healthcare-team-v2.jpg", import.meta.url),
);
const output = fileURLToPath(
  new URL("../src/assets/banner-healthcare-team-v2.avif", import.meta.url),
);
await sharp(source).avif({ quality: 40, effort: 7 }).toFile(output);
process.stdout.write("Encoded the production hero AVIF.\n");
