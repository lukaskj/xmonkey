import { State } from "../types";

const STORAGE_KEY = "__XMONKEY_SCRIPTS_GLOBAL_STATE";

export abstract class AbstractPersistentState {
  public storageKey = STORAGE_KEY;
  public abstract load(): State;

  public abstract save(state: State): Promise<void>;

  public abstract reset(): Promise<void>;
}
