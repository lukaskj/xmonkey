import { ExecutableScript } from "./executable-script";
import { renderComponent } from "./ui/render-component";

export class XMonkeyScript {
  public static userScript: ExecutableScript | null = null;

  public static async renderAndExecute(script: typeof ExecutableScript): Promise<void> {
    if (!script) {
      throw new Error("Script not defined.");
    }
    const scriptObject = new script();

    return await XMonkeyScript.renderAndExecuteScriptObject(scriptObject);
  }

  public static async renderAndExecuteScriptObject(scriptObject: ExecutableScript): Promise<void> {
    if (!scriptObject) {
      throw new Error("Script object not defined.");
    }

    XMonkeyScript.userScript = scriptObject;

    await scriptObject.execute();
    renderComponent(scriptObject);
  }
}
