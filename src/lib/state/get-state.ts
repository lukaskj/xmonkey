import { ExecutableScript } from "../executable-script";
import { renderComponent } from "../ui/render-component";
import { XMonkeyScript } from "../xmonkey-script";
import { SessionStorageState } from "./persistent";
import { PersistentStateFactory } from "./persistent/persistent-state-factory";
import { GetState, State } from "./types";

const persistentState = PersistentStateFactory.getInstance(SessionStorageState);

const globalState: State = persistentState.load();

export function getState<T>(key: string, initialValue: T | null = null): GetState<T> {
  const state = globalState;

  if (!(key in state)) {
    state[key] = initialValue;
  }

  const script = XMonkeyScript.userScript as ExecutableScript;

  return [
    state[key],
    (v: T): T => {
      state[key] = v;
      persistentState.save(state); // without await to not lock on every setState, just persist on storage
      renderComponent(script);
      return v;
    },
  ];
}
