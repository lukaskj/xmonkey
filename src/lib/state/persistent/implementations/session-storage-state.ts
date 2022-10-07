import { State } from "../../types";
import { AbstractPersistentState } from "../abstract-persistent-state";

export class SessionStorageState extends AbstractPersistentState {
  public load(): State {
    let rawState = sessionStorage.getItem(this.storageKey);
    if (!rawState) {
      rawState = "{}";
      this.save({});
    }

    return JSON.parse(rawState);
  }

  public async save(state: State): Promise<void> {
    return new Promise((resolve) => {
      const stateJson = JSON.stringify(state || {});
      sessionStorage.setItem(this.storageKey, stateJson);
      resolve();
    });
  }

  public override async reset(): Promise<void> {
    return await this.save({});
  }
}
