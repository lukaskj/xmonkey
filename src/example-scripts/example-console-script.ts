import { sleep } from "$lib/utils/sleep";
import { ConsoleScript } from "../lib/decorators/console-script.decorator";
import { IConsoleScript } from "../lib/interfaces";

@ConsoleScript({
  "@name": "Example Console Script",
  "@namespace": "console-scripts",
  "@match": "https://en.wikipedia.org/*",
  "@version": "1.0",
  "@author": "-",
  "@description": "Example Console Script Description",
  "@grant": ["GM.addStyle"],
})
export class ExampleConsoleScript implements IConsoleScript {
  public async execute(): Promise<void> {
    for (let i = 0; i < 50; i++) {
      console.log("Executing script...", i + 1, location.href);
      await sleep(20);
    }
  }
}
