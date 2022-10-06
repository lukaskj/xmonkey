import { ExecutableScript } from "./executable-script";
import { GetState, State } from "./state/types";
import { renderComponent } from "./ui/render-component";

export class XMonkeyScript {
  private static state: State = {};
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

  public static getState<T>(key: string, initialValue: T | null = null): GetState<T> {
    const state = XMonkeyScript.state;

    if (!(key in state)) {
      state[key] = initialValue;
    }

    const script = XMonkeyScript.userScript as ExecutableScript;

    return [
      state[key],
      (v: T): T => {
        state[key] = v;

        renderComponent(script);
        return v;
      },
    ];
  }
}
