import { XMonkeyScript } from "./lib/xmonkey-script";
import { ExampleScript as UserScript } from "./example-script/example";

async function main(): Promise<void> {
  return await XMonkeyScript.run(UserScript);
}

main();
