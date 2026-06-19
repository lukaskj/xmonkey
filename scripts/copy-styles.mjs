import { cp, mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const sourceDir = path.join(rootDir, "src", "styles");
const destinationDir = path.join(rootDir, "dist", "styles");

try {
  await mkdir(path.dirname(destinationDir), { recursive: true });
  await rm(destinationDir, { recursive: true, force: true });
  await cp(sourceDir, destinationDir, { recursive: true });
} catch (error) {
  console.error("Failed to copy styles.", error);
  process.exit(1);
}
