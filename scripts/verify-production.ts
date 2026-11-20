import { spawn } from "node:child_process";
import { once } from "node:events";
import { setTimeout } from "node:timers/promises";

const port = process.env.TEST_PORT || "3100";
const base = `http://127.0.0.1:${port}`;
const server = spawn(
  process.execPath,
  [
    "node_modules/next/dist/bin/next",
    "start",
    "--hostname",
    "127.0.0.1",
    "--port",
    port,
  ],
  { stdio: "inherit" },
);
const exited = once(server, "exit");
let stopped = false;
server.on("exit", () => {
  stopped = true;
});
try {
  let ready = false;
  for (let attempt = 0; attempt < 120; attempt++) {
    if (stopped)
      throw new Error("Production server exited before becoming ready");
    try {
      const response = await fetch(base, { signal: AbortSignal.timeout(1000) });
      ready = response.ok;
      await response.body?.cancel();
    } catch {
      /* Wait for the server to listen. */
    }
    if (ready) break;
    await setTimeout(500);
  }
  if (!ready) throw new Error("Production server did not become ready");
  const tests = spawn(process.execPath, ["scripts/test.ts"], {
    stdio: "inherit",
    env: { ...process.env, TEST_BASE_URL: base },
  });
  const [code] = await once(tests, "exit");
  if (code !== 0) throw new Error(`Production browser checks failed (${code})`);
} finally {
  if (!stopped) server.kill("SIGTERM");
  await exited;
}
