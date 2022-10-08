import { VNode } from "million";

export class ExecutableScript {
  public title = "User Script";
  public static wrapperElement: HTMLElement;

  public render(): VNode | undefined {
    throw new Error("Not implemented.");
  }

  public async execute(): Promise<void> {
    return;
  }
}
