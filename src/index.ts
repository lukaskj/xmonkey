import { ExampleScriptNoUI } from "./example-script-no-ui/example-script-no-ui";
import { XMonkeyScript } from "./lib/xmonkey-script";

async function main(): Promise<void> {
  return await XMonkeyScript.run(ExampleScriptNoUI);
}

main();
