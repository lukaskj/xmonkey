import * as esbuild from "esbuild";
import { xMonkeyStripMetadataPlugin } from "./plugins/xmonkey-strip-metadata-plugin.mjs";
import { sassPlugin } from "esbuild-sass-plugin";

await esbuild.build({
  entryPoints: ["src/index.ts"],
  outfile: "dist/index.js",
  bundle: true,
  treeShaking: true,
  minify: process.env.DEBUG ? false : true,
  platform: "browser",
  format: "iife",
  // target: "esnext",
  sourcemap: false,
  keepNames: true,
  logLevel: "info",
  metafile: true,
  // banner: {
  //   js: "import { createRequire } from 'module';const require = createRequire(import.meta.url);",
  // },
  plugins: [xMonkeyStripMetadataPlugin(), sassPlugin()],
  // external: Object.keys(packageJson.default.dependencies).concat(
  //   Object.keys(packageJson.default.peerDependencies || {}),
  // ),
});
