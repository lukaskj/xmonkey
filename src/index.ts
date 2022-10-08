import { ExampleScript } from "./example-script/example";
import { XMonkeyScript } from "./lib/xmonkey-script";

async function main(): Promise<void> {
  return await XMonkeyScript.run(ExampleScript);
}

main();
