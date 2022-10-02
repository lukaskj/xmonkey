import { ExecutableScript } from "./executable-script";
import { GetState, State } from "./state/types";

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

    console.log("renderAndExecuteScriptObject", scriptObject);

    XMonkeyScript.userScript = scriptObject;

    if (scriptObject.hasUI) {
      scriptObject.render();
    }

    return await scriptObject.execute();
  }

  public static getState<T>(key: string, initialValue: T | null = null): GetState<T> {
    const state = XMonkeyScript.state;
    const script = XMonkeyScript.userScript as ExecutableScript;
    if (!(key in state)) {
      state[key] = initialValue;
    }

    return [
      state[key],
      (v: T): T => {
        state[key] = v;
        if (script.hasUI) {
          script.render();
        }
        return v;
      },
    ];
  }
}
