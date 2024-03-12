import { readFile, writeFile } from "fs/promises";

export function xMonkeyStripMetadataPlugin() {
  return {
    name: "xmonkey-strip-metadata-plugin",
    setup(build) {
      let foundMetadata = false;
      let metadataContent = "";

      build.onLoad({ filter: /.(ts|tsx)/, namespace: "file" }, async (args) => {
        if (foundMetadata) return;
        const source = await readFile(args.path, "utf8");
        const scriptMetadataIndex = source.match(/@(ConsoleScript|UiScript)\(/).index;

        if (!scriptMetadataIndex || scriptMetadataIndex < 0) return;
        foundMetadata = true;
        // eslint-disable-next-line no-useless-escape
        const regex = /\@(ConsoleScript|UiScript)\([^\)]*\)(\.[^\)]*\))?/gi;
        const metadataDecoratorMatcher = source.match(regex);
        if (metadataDecoratorMatcher) {
          metadataContent = metadataDecoratorMatcher.at(0);
          //console.log("metadataContent", metadataContent);
          // const contents = source.replace(regex, ""); // remove @ConsoleScript({....}) from source
          // const contents = source.replace(regex, "");
          // const extension = args.path.split(".").pop();

          // const loader = extension === "tsx" ? "tsx" : "ts";

          // return { contents, loader };
        }
      });

      build.onEnd(async (result) => {
        if (!build.initialOptions?.outfile || !build.initialOptions?.bundle) {
          console.error("Wrong build configuration. Options 'bundle' must be enabled and 'outfile' must be set.");
          return;
        }

        if (!foundMetadata) {
          console.error("ScriptMetadata decorator not found.");
          return;
        }

        if (result.errors.length) {
          console.error("Error building. Script Metadata cannot be added to final script.");
          return;
        }

        const fileContents = await readFile(build.initialOptions.outfile);
        const scriptMetadataString = getScriptMetadataString(metadataContent);
        await writeFile(build.initialOptions.outfile, `${scriptMetadataString}\n\n${fileContents.toString()}`);
      });
    },
  };
}

function getScriptMetadataString(scriptMetadataFunctionCallString) {
  scriptMetadataFunctionCallString = scriptMetadataFunctionCallString.trim();
  const startJsonMetadataIndex = scriptMetadataFunctionCallString.indexOf("{");
  const endJsonMetadataIndex = scriptMetadataFunctionCallString.lastIndexOf("}");
  if (startJsonMetadataIndex < 0 || endJsonMetadataIndex < 0) {
    return "";
  }

  const metadataObject = JSON.parse(
    scriptMetadataFunctionCallString
      .substring(startJsonMetadataIndex, endJsonMetadataIndex + 1)
      .replaceAll("\n", "")
      .replaceAll(",}", "}"),
  );

  const tag = "// ==UserScript==";
  const tagEnd = "// ==/UserScript==";
  let headersArr = [];

  const spaces = 13;
  for (const key in metadataObject) {
    if (Array.isArray(metadataObject[key])) {
      metadataObject[key].forEach((item) => {
        headersArr.push(`${key.padEnd(spaces, " ")}${item}`);
      });
    } else {
      headersArr.push(`${key.padEnd(spaces, " ")}${metadataObject[key]}`);
    }
  }

  const headers = headersArr.map((h) => `// ${h}`).join("\n");
  return `${tag}\n${headers}\n${tagEnd}`;
}
