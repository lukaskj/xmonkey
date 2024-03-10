import { ExecutableScript } from "$lib/executable-script";
import { ClassConstructor } from "src/types";

export class XmonkeyApp {
  public static async run(script: ClassConstructor<ExecutableScript>): Promise<void> {
    if (!script) {
      throw new Error("Script not defined.");
    }

    const scriptObject = new script();

    return await scriptObject.execute();
  }
}
