import { render, VNode, DOMNode } from "million";
import { xMonkeyWrapperElement } from "./ui/xmonkey-wrapper-element";

export class ExecutableScript {
  public static wrapperElement: HTMLElement;

  public render(): VNode | undefined {
    throw new Error("Not implemented.");
  }

  public async execute(): Promise<DOMNode | null> {
    if (!ExecutableScript.wrapperElement) {
      ExecutableScript.wrapperElement = xMonkeyWrapperElement();
    }

    const ui = this.render();

    if (ui) {
      return render(ExecutableScript.wrapperElement, ui);
    }
    return null;
  }
}
