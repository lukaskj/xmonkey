import { ClassConstructor } from "../../types";
import { IConsoleScript } from "../interfaces";
import { ScriptInfo } from "../types";

export function ConsoleScript<T extends IConsoleScript>(_metadata: ScriptInfo) {
  return function (target: ClassConstructor<T>) {
    if (!target) {
      throw new Error("Script not defined.");
    }

    const scriptObject = new target();

    scriptObject.execute();
  };
}
