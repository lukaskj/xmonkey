import { XmonkeyApp } from "$lib/xmonkey-app";
import { ExampleConsoleScript } from "src/example-scripts/example-console-script";

async function main() {
  await XmonkeyApp.run(ExampleConsoleScript);
}

main();
