import { ExecutableScript } from "../executable-script";
import { XMonkeyScript } from "../xmonkey-script";
import { GlobalState } from "./global-state";
import { PersistentStateFactory } from "./persistent/persistent-state-factory";
import { GetState } from "./types";

export function getState<T>(key: string, initialValue: T | null = null): GetState<T> {
  const state = GlobalState.get();

  if (!(key in state)) {
    state[key] = initialValue;
  }

  const script = XMonkeyScript.userScript as ExecutableScript;

  return [
    state[key],
    (v: T): T => {
      state[key] = v;
      const persistentState = PersistentStateFactory.getInstance(script.persistenceMethod);
      persistentState.save(state); // without await to not lock on every setState, just persist on storage

      return v;
    },
  ];
}
