import { ClassType } from "../types";
import { AbstractPersistentState } from "./abstract-persistent-state";

const states = new Map<ClassType<AbstractPersistentState>, AbstractPersistentState>();

export class PersistentStateFactory {
  public static getInstance(className: ClassType<AbstractPersistentState>): AbstractPersistentState {
    if (!states.has(className)) {
      states.set(className, new className());
    }
    return states.get(className) as AbstractPersistentState;
  }
}
