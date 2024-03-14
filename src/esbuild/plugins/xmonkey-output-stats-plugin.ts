// statSync("./dist/index.js").size / 1024

import { Plugin } from "esbuild";

export function xMonkeyOutputStatsPlugin(): Plugin {
  return {
    name: "xmonkey-output-stats-plugin",
    setup(build) {
      build.onEnd(async (result) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const outputs = result.metafile?.outputs as any;
        const outputTotal = Object.keys(outputs).reduce((prev, cur) => prev + outputs[cur].bytes, 0);
        const bundleTotal = humanFileSize(outputTotal);
        console.log("[*] Bundle total:", bundleTotal);
      });
    },
  };
}

function humanFileSize(size: number) {
  const i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
  return (size / Math.pow(1024, i)).toFixed(1) + "" + ["b", "kB", "MB", "GB", "TB"][i];
}
