import { ConsoleScript } from "../decorators/console-script.decorator.js";
import { IConsoleScript } from "../interfaces/console-script.interface.js";
import { sleep } from "../utils/sleep.js";

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
