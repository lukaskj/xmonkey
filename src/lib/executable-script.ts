import { render, VNode, DOMNode } from "million";
import { xMonkeyWrapperElement } from "./ui/xmonkey-wrapper-element";

export class ExecutableScript {
  public hasUI = false;
  public static wrapperElement: HTMLElement;

  public buildUI(): VNode | undefined {
    return undefined;
  }

  public async execute(): Promise<void> {
    throw new Error("Not implemented");
  }

  public render(): DOMNode {
    if (!ExecutableScript.wrapperElement) {
      ExecutableScript.wrapperElement = xMonkeyWrapperElement();
    }

    return render(ExecutableScript.wrapperElement, this.buildUI());
  }
}
