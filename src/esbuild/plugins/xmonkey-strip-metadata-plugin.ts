import { Plugin } from "esbuild";
import { readFile, writeFile } from "fs/promises";
import JSON5 from "json5";

export function xMonkeyStripMetadataPlugin(): Plugin {
  return {
    name: "xmonkey-strip-metadata-plugin",
    setup(build) {
      let foundMetadata = false;
      let metadataContent = "";

      build.onLoad({ filter: /.(ts|tsx)/, namespace: "file" }, async (args) => {
        if (foundMetadata) return;
        const source = await readFile(args.path, "utf8");
        const scriptMetadataIndex = source.match(/@(ConsoleScript|UiScript)\(/)?.index;

        if (!scriptMetadataIndex || scriptMetadataIndex < 0) return;
        foundMetadata = true;
        // eslint-disable-next-line no-useless-escape
        const regex = /\@(ConsoleScript|UiScript)\([^\)]*\)(\.[^\)]*\))?/gi;
        const metadataDecoratorMatcher = source.match(regex);
        if (metadataDecoratorMatcher) {
          metadataContent = metadataDecoratorMatcher.at(0) as string;
          // console.log("metadataContent", metadataContent);
          const startJsonMetadataIndex = metadataContent.indexOf("{");
          const endJsonMetadataIndex = metadataContent.lastIndexOf("}");
          const metadataJsonString = metadataContent.substring(startJsonMetadataIndex, endJsonMetadataIndex + 1);
          const contents = source.replace(metadataJsonString, ""); // remove the json metadata from source
          // const contents = source.replace(regex, ""); // remove @ConsoleScript({....}) from source

          // const contents = source.replace(regex, "");
          const extension = args.path.split(".").pop();

          const loader = extension === "tsx" ? "tsx" : "ts";

          return { contents, loader };
        }

        return;
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

function getScriptMetadataString(scriptMetadataFunctionCallString: string) {
  scriptMetadataFunctionCallString = scriptMetadataFunctionCallString.trim();
  const startJsonMetadataIndex = scriptMetadataFunctionCallString.indexOf("{");
  const endJsonMetadataIndex = scriptMetadataFunctionCallString.lastIndexOf("}");
  if (startJsonMetadataIndex < 0 || endJsonMetadataIndex < 0) {
    return "";
  }

  const aaaa = JSON5.parse(
    scriptMetadataFunctionCallString.substring(startJsonMetadataIndex, endJsonMetadataIndex + 1),
  );

  console.log("AAAAAAAA", aaaa);

  // const jsonMetadataString = scriptMetadataFunctionCallString
  //   .substring(startJsonMetadataIndex, endJsonMetadataIndex + 1)
  //   .replaceAll("\n", "")
  //   .replaceAll(/,\s{1,}\]/g, "]")
  //   .replaceAll(/,\s{1,}\}/g, "}");

  const metadataObject = aaaa;

  const tag = "// ==UserScript==";
  const tagEnd = "// ==/UserScript==";
  const headersArr = [];

  const spaces = 13;
  for (const key in metadataObject) {
    if (Array.isArray(metadataObject[key])) {
      metadataObject[key].forEach((item: unknown) => {
        headersArr.push(`${key.padEnd(spaces, " ")}${item}`);
      });
    } else {
      headersArr.push(`${key.padEnd(spaces, " ")}${metadataObject[key]}`);
    }
  }

  const headers = headersArr.map((h) => `// ${h}`).join("\n");
  return `${tag}\n${headers}\n${tagEnd}`;
}
