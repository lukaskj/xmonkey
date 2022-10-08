import { ExecutableScript } from "../lib/executable-script";

export class ExampleScriptNoUI extends ExecutableScript {
  public override title = "Example component without UI";

  public override async execute(): Promise<void> {
    console.log("Executing script");
  }
}
