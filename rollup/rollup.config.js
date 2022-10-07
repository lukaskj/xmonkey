import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import scss from "rollup-plugin-scss";
import { terser } from "rollup-plugin-terser";
import { xMonkeyBuildHeaders } from "./plugins/x-monkey-build-headers";
import { xMonkeyFixMillionFunctionalComponents } from "./plugins/x-monkey-fix-million-functional-components";
import { minifyCSS, xMonkeyImportCss } from "./plugins/x-monkey-import-css";

export default {
  input: "src/index.ts",
  output: {
    name: "xscript",
    file: "dist/index.user.js",
    format: "iife",
    // sourcemap: "inline",
    sourcemap: false,
    banner: xMonkeyBuildHeaders(),
  },
  plugins: [
    json(),
    commonjs(),
    typescript({ module: "esNext", tsconfig: "tsconfig.build.json", outputToFilesystem: true }),
    resolve(),
    scss({
      output: "dist/styles.css",
      outputStyle: "compressed",
      prefix: `@use "src/lib/ui/styles/base.scss";`,
      watch: ["src/lib/ui/styles/"],
      processor: (css, map) => ({
        css: minifyCSS(css),
        map,
      }),
    }),
    terser({
      // mangle: false,
      // compress: false,
      format: {
        comments: function (node, comment) {
          const text = comment.value;
          return /@.+$/gi.test(text) || /UserScript==/gi.test(text);
        },
      },
    }),
    xMonkeyImportCss(),
    xMonkeyFixMillionFunctionalComponents(),
  ],
};
