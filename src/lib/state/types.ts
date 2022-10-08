import { AnyNullableType } from "../types";

export type State = { [k: string]: AnyNullableType };
export type GetState<T> = [T, (v: T) => T];
