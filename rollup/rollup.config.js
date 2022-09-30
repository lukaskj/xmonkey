import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import css from "rollup-plugin-import-css";
import { terser } from "rollup-plugin-terser";
import { xMonkeyBuildHeaders } from "./plugins/x-monkey-build-headers";
import { xMonkeyImportCss } from "./plugins/x-monkey-import-css";

export default {
  input: "src/index.ts",
  output: {
    name: "xscript",
    dir: "dist",
    format: "iife",
    sourcemap: "inline",
    banner: xMonkeyBuildHeaders(),
  },
  plugins: [
    json(),
    commonjs(),
    typescript({ module: "esNext", tsconfig: "tsconfig.build.json" }),
    resolve(),
    css({
      output: "styles.css",
      minify: true,
    }),
    terser({
      format: {
        comments: function (node, comment) {
          const text = comment.value;
          return /@.+$/gi.test(text) || /UserScript==/gi.test(text);
        },
      },
    }),
    xMonkeyImportCss(),
  ],
};
