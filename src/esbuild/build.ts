import * as esbuild from "esbuild";
import { sassPlugin } from "esbuild-sass-plugin";
import { xMonkeyStripMetadataPlugin } from "./plugins/xmonkey-strip-metadata-plugin.js";
import { xMonkeyStylesPlugin } from "./plugins/xmonkey-styles-plugin.js";
import { xMonkeyOutputStatsPlugin } from "./plugins/xmonkey-output-stats-plugin.js";

export async function buildXmonkeyScript(scriptBasePath: string) {
  const entryFile = scriptBasePath;
  console.info(`Building file: '${entryFile}'`);

  await esbuild.build({
    entryPoints: [entryFile],
    outfile: "dist/index.js",
    bundle: true,
    treeShaking: true,
    minify: process.env.DEBUG ? false : true,
    platform: "browser",
    format: "iife",
    sourcemap: process.env.DEBUG ? "inline" : false,
    keepNames: true,
    logLevel: "info",
    metafile: true,
    plugins: [
      xMonkeyStripMetadataPlugin(),
      sassPlugin({ style: "compressed" }),
      xMonkeyStylesPlugin(),
      xMonkeyOutputStatsPlugin(),
    ],
  });
}
