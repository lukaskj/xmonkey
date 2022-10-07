import { State } from "../../types";
import { AbstractPersistentState } from "../abstract-persistent-state";

export class NoPersistenceState extends AbstractPersistentState {
  public load(): State {
    return {};
  }
  public save(_state: State): Promise<void> {
    return Promise.resolve();
  }
  public reset(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
