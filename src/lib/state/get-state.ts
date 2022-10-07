import { ExecutableScript } from "../executable-script";
import { renderComponent } from "../ui/render-component";
import { XMonkeyScript } from "../xmonkey-script";
import { GetState, State } from "./types";

const globalState: State = {};

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

      renderComponent(script);
      return v;
    },
  ];
}
