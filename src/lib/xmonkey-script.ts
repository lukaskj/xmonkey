import { ExecutableScript } from "./executable-script";
import { ClassType } from "./state/types";
import { renderComponent } from "./ui/render-component";

export class XMonkeyScript {
  public static userScript: ExecutableScript | null = null;

  public static async run(script: ClassType<ExecutableScript>): Promise<void> {
    if (!script) {
      throw new Error("Script not defined.");
    }
    const scriptObject = new script();

    return await XMonkeyScript.runScriptObject(scriptObject);
  }

  public static async runScriptObject(scriptObject: ExecutableScript): Promise<void> {
    if (!scriptObject) {
      throw new Error("Script object not defined.");
    }

    XMonkeyScript.userScript = scriptObject;

    await scriptObject.execute();
    renderComponent(scriptObject);
  }
}
