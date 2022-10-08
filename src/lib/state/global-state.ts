import { State } from "./types";

export class GlobalState {
  private static state: State = {};

  public static loadState(newState: State): void {
    this.state = newState || {};
  }
  public static get(): State {
    return this.state;
  }
}
