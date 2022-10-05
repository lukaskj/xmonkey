/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { existsSync } from "fs";
import { readFile } from "fs/promises";
import { join, parse } from "path";

export function xMonkeyImportCss(_options = {}) {
  return {
    name: "x-monkey-import-css",
    order: "post",
    async generateBundle(opts, bundle) {
      let allStylesContent = "";
      let GM_addStyle = "";
      for (const key in bundle) {
        const file = bundle[key];
        if (file.fileName.endsWith(".css")) {
          allStylesContent += file.source + "\n";
        }
      }

      // SCSS support fix
      if (!allStylesContent.length) {
        allStylesContent = await getStylesFromDistFolder(opts);
      }

      if (allStylesContent.length > 0) {
        GM_addStyle = `GM.addStyle("\\\n${allStylesContent.trim()}\\\n");`;
        bundle["index.user.js"].code += `\n${GM_addStyle} \n\n`;
      } else {
        console.warn("No CSS content. Try rebuilding again.");
      }
    },
  };
}

async function getStylesFromDistFolder(opts) {
  // get styles.css inside dist folder
  const distParsed = parse(opts.file);
  const dist = distParsed.dir;
  const stylesFile = join(dist, "styles.css");

  if (existsSync(stylesFile)) {
    return (await readFile(stylesFile)).toString();
  }

  return "";
}

export function minifyCSS(content) {
  content = content.replace(/\/\*(?:(?!\*\/)[\s\S])*\*\/|[\r\n\t]+/g, "");
  content = content.replace(/ {2,}/g, " ");
  content = content.replace(/ ([{:}]) /g, "$1");
  content = content.replace(/([{:}]) /g, "$1");
  content = content.replace(/([;,]) /g, "$1");
  content = content.replace(/ !/g, "!");
  return content;
}
