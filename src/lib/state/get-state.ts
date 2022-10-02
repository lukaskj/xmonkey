import { XMonkeyScript } from "../xmonkey-script";
import { GetState } from "./types";

export function getState<T>(key: string, initialValue: T | null = null): GetState<T> {
  return XMonkeyScript.getState(key, initialValue);
}
