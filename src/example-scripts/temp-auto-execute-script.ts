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
export default class implements IConsoleScript {
  public async execute(): Promise<void> {
    console.log("cu3s");
  }
}
