import { ExecutableScript } from "./executable-script";
import { GlobalState } from "./state/global-state";
import { PersistentStateFactory } from "./state/persistent/persistent-state-factory";
import { ClassType } from "./types";

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

    const persistentState = PersistentStateFactory.getInstance(scriptObject.persistenceMethod);
    const globalState = persistentState.load();
    GlobalState.loadState(globalState);

    console.log(`[+] Running XMonkey Script: ${scriptObject.title}`);

    await scriptObject.execute();
    scriptObject.setExecuted();
  }
}
