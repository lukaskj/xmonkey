import { h, render } from "preact";
import { IUiScript } from "./ui-script.interface.js";
import { ClassConstructor, ScriptInfo } from "../types.js";
import { XMonkeyWindowComponent } from "../x-monkey-window-component.js";

export function UiScript<T extends IUiScript>(_metadata: ScriptInfo) {
  return function (_target: ClassConstructor<T>) {
    const scriptObject = new _target();

    const rootComponent = xMonkeyWrapperElement();
    const renderedScript = scriptObject.render();
    if (renderedScript instanceof Promise) {
      return renderedScript.then((resolved) =>
        render(h(XMonkeyWindowComponent, { title: scriptObject.title ?? "" }, resolved!), rootComponent!),
      );
    }

    return render(
      h(XMonkeyWindowComponent, { title: scriptObject.title ?? "" }, scriptObject.render()),
      rootComponent!,
    );
  };
}

function xMonkeyWrapperElement(): HTMLElement {
  const ID = "__xmwr";
  let div = document.getElementById(ID);
  if (div) return div;

  div = document.createElement("div");
  div.id = ID;
  document.body.appendChild(div);

  return div;
}
