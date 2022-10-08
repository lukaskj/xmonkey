import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import { xMonkeyBuildHeaders } from "./plugins/x-monkey-build-headers";

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
  ],
};
