import { ExecutableScript } from "../executable-script";
import { AnyType } from "../types";
import { renderComponent } from "../ui/render-component";
import { XMonkeyScript } from "../xmonkey-script";
import { PersistentStateFactory } from "./persistent/persistent-state-factory";
import { State } from "./types";

const stateObj: State = {};

const state = new Proxy(stateObj, {
  set(target: State, key: string | symbol, newValue: AnyType): boolean {
    const script = XMonkeyScript.userScript as ExecutableScript;
    target[key] = newValue;
    if (script && script.hasExecuted()) {
      const persistentState = PersistentStateFactory.getInstance(script.persistenceMethod);
      persistentState.save(target); // without await to not lock on every setState, just persist on storage
      renderComponent(script);
    }
    return true;
  },
  get: (target: State, key): AnyType => target[key as string],
});

function getState<T>(): T {
  return state as T;
}

const loadState = (): void => {
  const script = XMonkeyScript.userScript as ExecutableScript;
  const persistentState = PersistentStateFactory.getInstance(script.persistenceMethod);
  const loadedState = persistentState.load();
  for (const key in loadedState) {
    state[key] = loadedState[key];
  }
};

export { getState, loadState };
