import { ExecutableScript } from "../executable-script";
import { renderComponent } from "../ui/render-component";
import { XMonkeyScript } from "../xmonkey-script";
import { GlobalState } from "./global-state";
import { PersistentStateFactory } from "./persistent/persistent-state-factory";
import { GetState } from "./types";

export function getState<T>(key: string, initialValue: T | null = null): GetState<T> {
  const state = GlobalState.get();

  if (!(key in state)) {
    state[key] = initialValue;
  }

  return [
    state[key],
    (v: T): T => {
      state[key] = v;
      const script = XMonkeyScript.userScript as ExecutableScript;
      if (script && script.hasExecuted()) {
        const persistentState = PersistentStateFactory.getInstance(script.persistenceMethod);
        persistentState.save(state); // without await to not lock on every setState, just persist on storage
        renderComponent(script);
      }
      return v;
    },
  ];
}
