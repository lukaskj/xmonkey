/* eslint-disable @typescript-eslint/explicit-function-return-type */

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
      if (allStylesContent.length > 0) {
        GM_addStyle = `GM.addStyle(\`\n${allStylesContent.trim()}\n\`);`;
        bundle["index.user.js"].code += `\n${GM_addStyle} \n\n`;
      }
    },
  };
}
