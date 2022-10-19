import { AbstractPersistentState, SessionStorageState } from "./state/persistent";
import { ClassType, ScriptState } from "./types";

export class ExecutableScript {
  public title = "User Script";
  public persistenceMethod: ClassType<AbstractPersistentState> = SessionStorageState;

  private scriptState: ScriptState = ScriptState.STARTED;

  public static wrapperElement: HTMLElement;

  public async execute(): Promise<void> {
    return;
  }

  public setExecuted(): void {
    this.scriptState = ScriptState.FINISHED_EXECUTING;
  }

  public hasExecuted(): boolean {
    return this.scriptState === ScriptState.FINISHED_EXECUTING;
  }
}
