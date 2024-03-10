import * as esbuild from "esbuild";

await esbuild.build({
  entryPoints: ["src/index.ts"],
  outfile: "dist/index.js",
  bundle: true,
  treeShaking: true,
  minify: true,
  platform: "browser",
  format: "iife",
  // target: "esnext",
  sourcemap: false,
  keepNames: false,
  logLevel: "info",
  // banner: {
  //   js: "import { createRequire } from 'module';const require = createRequire(import.meta.url);",
  // },
  // plugins: [esbuildDecorators()],
  // external: Object.keys(packageJson.default.dependencies).concat(
  //   Object.keys(packageJson.default.peerDependencies || {}),
  // ),
});
