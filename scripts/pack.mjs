import { mkdir, rm, readFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = resolve(root, "dist");
const releaseDir = resolve(root, "release");

const pkg = JSON.parse(await readFile(resolve(root, "package.json"), "utf8"));

// Firefox Load Temporary Add-on only accepts a folder (manifest.json) or a .zip/.xpi package.
const fileName = `ai-chat-rtl-${pkg.version}.zip`;
const outPath = resolve(releaseDir, fileName);

await rm(releaseDir, { recursive: true, force: true });
await mkdir(releaseDir, { recursive: true });

execFileSync("zip", ["-r", "-FS", outPath, "."], {
  cwd: dist,
  stdio: "inherit",
});

console.log(`\nPacked: release/${fileName}`);
