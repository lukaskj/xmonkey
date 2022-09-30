/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
import { join } from "path";

export async function xMonkeyBuildHeaders() {
  const scriptConfig = require(join(__dirname, "../script-config.js")).headers;
  const tag = "// ==UserScript==";
  const tagEnd = "// ==/UserScript==";
  let headersArr = [];

  const spaces = 13;
  for (const key in scriptConfig) {
    if (Array.isArray(scriptConfig[key])) {
      scriptConfig[key].forEach((item) => {
        headersArr.push(`${key.padEnd(spaces, " ")}${item}`);
      });
    } else {
      headersArr.push(`${key.padEnd(spaces, " ")}${scriptConfig[key]}`);
    }
  }

  const headers = headersArr.map((h) => `// ${h}`).join("\n");
  return `${tag}\n${headers}\n${tagEnd}`;
}
