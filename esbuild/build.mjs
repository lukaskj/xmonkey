import * as esbuild from "esbuild";
import { sassPlugin } from "esbuild-sass-plugin";
import { xMonkeyStripMetadataPlugin } from "./plugins/xmonkey-strip-metadata-plugin.mjs";
import { xMonkeyStylesPlugin } from "./plugins/xmonkey-styles-plugin.mjs";

let entryFile = process.argv[2];

if (!entryFile) {
  entryFile = "src/index.ts";
}
console.info(`Building file: '${entryFile}'`);

await esbuild.build({
  entryPoints: [entryFile],
  outfile: "dist/index.js",
  bundle: true,
  treeShaking: true,
  minify: process.env.DEBUG ? true : true,
  platform: "browser",
  format: "iife",
  // target: "esnext",
  sourcemap: false,
  keepNames: true,
  logLevel: "info",
  metafile: true,
  plugins: [
    xMonkeyStripMetadataPlugin(),
    // xMonkeyDevPlugin(),
    sassPlugin({ style: "compressed" }),
    xMonkeyStylesPlugin(),
  ],
});
