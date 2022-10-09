import { XMonkeyScript } from "./lib/xmonkey-script";
import { ExampleScriptNoUI as UserScript } from "./example-script-no-ui/example-script-no-ui";

async function main(): Promise<void> {
  return await XMonkeyScript.run(UserScript);
}

main();
