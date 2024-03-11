import { ExecutableScript } from "$lib/executable-script";
import { ScriptMetadata } from "$lib/types";
import { sleep } from "$lib/utils/sleep";

@ScriptMetadata({
  "@name": "Example Console Script",
  "@namespace": "console-scripts",
  "@match": "https://*.google.com*/*",
  "@version": "1.0",
  "@author": "-",
  "@description": "Example Console Script Description",
  "@grant": ["GM.addStyle"],
})
export class ExampleConsoleScript extends ExecutableScript {
  public async execute(): Promise<void> {
    for (let i = 0; i < 50; i++) {
      console.log("Executing script...", i + 1, location.href);
      await sleep(20);
    }
  }
}
