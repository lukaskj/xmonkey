import { AnyObject } from "../types";

export type State = AnyObject;
export type GetState<T> = [T, (v: T) => T];
