/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
import { dirname, join } from "path";
import { fileURLToPath } from "url";

function fileDirName(meta) {
  const __filename = fileURLToPath(meta.url);

  const __dirname = dirname(__filename);

  return { __dirname, __filename };
}

export async function xMonkeyBuildHeaders() {
  const { __dirname } = fileDirName(import.meta);
  const importScriptConfig = await import("file://" + join(__dirname, "../../script-config.cjs"));
  const scriptConfig = importScriptConfig.headers;
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
