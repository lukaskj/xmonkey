import { XmonkeyApp } from "$lib/xmonkey-app";
// import { ExampleConsoleScript as Script } from "./example-scripts/example-console-script";
import { ExampleUiScript as Script } from "./example-scripts/example-ui-script";

async function main() {
  await XmonkeyApp.run(Script);
}

main();
