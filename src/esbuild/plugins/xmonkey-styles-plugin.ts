import { Plugin } from "esbuild";
import { appendFile, readFile } from "fs/promises";

export function xMonkeyStylesPlugin(): Plugin {
  return {
    name: "xmonkey-styles-plugin",
    setup(build) {
      build.onEnd(async (result) => {
        if (!build.initialOptions?.outfile || !build.initialOptions?.bundle) {
          console.error("Wrong build configuration. Options 'bundle' must be enabled and 'outfile' must be set.");
          return;
        }

        if (!result.metafile) {
          console.warn("ESBuild metafile not enabled. Style bundle skipped.");
          return;
        }
        const outputs = result.metafile.outputs;
        let cssFilePath = "";
        for (const file in outputs) {
          const ext = file.split(".").pop();
          if (ext === "css") {
            cssFilePath = file;
            break;
          }
        }

        if (!cssFilePath.length) {
          console.warn("CSS output not generated. Style bundle skipped.");
          return;
        }

        const jsOutFile = build.initialOptions.outfile;

        const cssContents = (await readFile(cssFilePath)).toString();
        appendFile(jsOutFile, `\nGM.addStyle("\\\n${cssContents.trim()}\\\n");`);
      });
    },
  };
}
