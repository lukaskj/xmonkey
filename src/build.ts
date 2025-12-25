#!/usr/bin/env node
import { buildXmonkeyScript } from "./esbuild/build.js";

const entryFile = process.argv[2];

if (!entryFile) {
  console.error("No entryfile specified. Try adding the script to build in the argument.");
  console.error("Example: npx xmonkey src/example-script.ts");
  process.exit(1);
}

buildXmonkeyScript(entryFile);
