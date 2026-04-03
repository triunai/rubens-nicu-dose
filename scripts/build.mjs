import { copyFileSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { join } from "node:path";

const ROOT = process.cwd();
const DIST = join(ROOT, "dist");
const TSC_BIN = join(ROOT, "node_modules", "typescript", "bin", "tsc");

rmSync(DIST, { recursive: true, force: true });
mkdirSync(DIST, { recursive: true });

if (!existsSync(TSC_BIN)) {
  console.error("TypeScript compiler not found. Run `npm install` first.");
  process.exit(1);
}

const tscResult = spawnSync(process.execPath, [TSC_BIN, "-p", "tsconfig.json"], {
  cwd: ROOT,
  stdio: "inherit"
});

if (tscResult.status !== 0) {
  process.exit(tscResult.status ?? 1);
}

copyFileSync(join(ROOT, "index.html"), join(DIST, "index.html"));
copyFileSync(join(ROOT, "styles.css"), join(DIST, "styles.css"));

console.log("Static site built in ./dist");
