import { AbstractPersistentState, SessionStorageState } from "./state/persistent";
import { ClassType } from "./types";

export class ExecutableScript {
  public title = "User Script";
  public persistenceMethod: ClassType<AbstractPersistentState> = SessionStorageState;

  public static wrapperElement: HTMLElement;

  public async execute(): Promise<void> {
    return;
  }
}
