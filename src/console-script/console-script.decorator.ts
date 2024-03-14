import { IConsoleScript } from "./console-script.interface.js";
import { ClassConstructor, ScriptInfo } from "../types.js";

export function ConsoleScript<T extends IConsoleScript>(_metadata: ScriptInfo) {
  return function (target: ClassConstructor<T>) {
    if (!target) {
      throw new Error("Script not defined.");
    }

    const scriptObject = new target();

    scriptObject.execute();
  };
}
