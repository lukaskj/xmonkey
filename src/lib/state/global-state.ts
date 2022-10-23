import { ExecutableScript } from "../executable-script";
import { AnyType } from "../types";
import { renderComponent } from "../ui/render-component";
import { XMonkeyScript } from "../xmonkey-script";
import { PersistentStateFactory } from "./persistent/persistent-state-factory";
import { State } from "./types";

const stateObj: State = {};

const isProxy = Symbol("isProxy");

const proxyHandler = {
  set(target: State, key: string | symbol, newValue: AnyType): boolean {
    const script = XMonkeyScript.userScript as ExecutableScript;

    target[key] = newValue;
    if (script) {
      const persistentState = PersistentStateFactory.getInstance(script.persistenceMethod);
      persistentState.save(target); // without await to not lock on every setState, just persist on storage
      renderComponent(script);
    }
    return true;
  },
  get: (target: State, key: string | symbol): AnyType => {
    if (key === isProxy) {
      return true;
    }
    const prop = target[key];
    if (typeof prop === "undefined") {
      return;
    }

    if (!prop[isProxy] && typeof prop === "object") {
      target[key] = new Proxy(prop, proxyHandler);
    }

    return target[key];
  },
};

const globalState = new Proxy(stateObj, proxyHandler);

function getState<T>(): T {
  return globalState as T;
}

const loadState = (): void => {
  const script = XMonkeyScript.userScript as ExecutableScript;
  const persistentState = PersistentStateFactory.getInstance(script.persistenceMethod);
  const loadedState = persistentState.load();
  for (const key in loadedState) {
    globalState[key] = loadedState[key];
  }
};

export { getState, loadState };
