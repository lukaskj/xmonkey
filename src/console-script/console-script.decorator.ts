import type { IConsoleScript } from "./console-script.interface.js";
import type { ClassConstructor, ScriptInfo } from "../types.js";

export function ConsoleScript<T extends IConsoleScript>(_metadata: ScriptInfo) {
  return function (target: ClassConstructor<T>) {
    if (!target) {
      throw new Error("Script not defined.");
    }

    const scriptObject = new target();

    void scriptObject.execute().catch((error) => {
      console.error("Console script execution failed.", error);
    });
  };
}
