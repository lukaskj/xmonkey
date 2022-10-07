import { batch, render } from "million";
import { ExecutableScript } from "../executable-script";
import { xMonkeyWrapperElement } from "../ui/xmonkey-wrapper-element";
import { XMonkeyComponent } from "../xmonkey-component";

const queueRender = batch();
export function renderComponent(executableScript: ExecutableScript): void {
  if (!ExecutableScript.wrapperElement) {
    ExecutableScript.wrapperElement = xMonkeyWrapperElement();
  }

  const script = executableScript;

  const ui = script.render();
  if (ui) {
    queueRender(() =>
      render(ExecutableScript.wrapperElement, <XMonkeyComponent title={script.title}>{ui}</XMonkeyComponent>),
    );
  }
}
