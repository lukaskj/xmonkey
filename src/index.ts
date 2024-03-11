import { XmonkeyApp } from "$lib/xmonkey-app";
import { ExampleUiScript as Script } from "./example-scripts/example-ui-script";

async function main() {
  await XmonkeyApp.run(Script);
}

main();
