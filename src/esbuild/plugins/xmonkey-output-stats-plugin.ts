import type { Plugin } from "esbuild";

export function xMonkeyOutputStatsPlugin(): Plugin {
  return {
    name: "xmonkey-output-stats-plugin",
    setup(build) {
      build.onEnd(async (result) => {
        // biome-ignore lint/suspicious/noExplicitAny: ?
        const outputs = result.metafile?.outputs as any;
        const outputTotal = Object.keys(outputs).reduce((prev, cur) => prev + outputs[cur].bytes, 0);
        const bundleTotal = humanFileSize(outputTotal);
        console.log("[*] Bundle total:", bundleTotal);
      });
    },
  };
}

function humanFileSize(size: number) {
  const i = size === 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));

  return (size / 1024 ** i).toFixed(1) + "" + ["b", "kB", "MB", "GB", "TB"][i];
}
