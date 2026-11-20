import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";

const require = createRequire(import.meta.url);
const nextDirectory = dirname(require.resolve("next/package.json"));
const source = dirname(require.resolve("@next/swc-wasm-nodejs/package.json"));
const nextVersion = JSON.parse(
  readFileSync(join(nextDirectory, "package.json"), "utf8"),
).version;
const wasmVersion = JSON.parse(
  readFileSync(join(source, "package.json"), "utf8"),
).version;
if (wasmVersion !== nextVersion) {
  throw new Error(`SWC WASM ${wasmVersion} must match Next.js ${nextVersion}`);
}
// Next 16.4.3's fallback loader expects an exact file under this directory.
// Stage the locked package there instead of downloading it during the build.
const destination = join(nextDirectory, "wasm", "@next", "swc-wasm-nodejs");
mkdirSync(destination, { recursive: true });
for (const file of ["wasm.js", "wasm_bg.wasm", "package.json"]) {
  copyFileSync(join(source, file), join(destination, file));
}
console.log(`Prepared Next.js WASM fallback ${wasmVersion}`);
