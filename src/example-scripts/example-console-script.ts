import { ExecutableScript } from "$lib/executable-script";

export class ExampleConsoleScript extends ExecutableScript {
  public async execute(): Promise<void> {
    console.log("Executing example script");
  }
}
