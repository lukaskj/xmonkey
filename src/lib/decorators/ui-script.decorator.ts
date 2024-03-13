import { h, render } from "preact";
import { IUiScript } from "../interfaces";
import { ClassConstructor, ScriptInfo } from "../types";
import { XMonkeyWindowComponent } from "../ui/x-monkey-window-component";

import "../ui/styles/base.scss";

export function UiScript<T extends IUiScript>(_metadata: ScriptInfo) {
  return function (_target: ClassConstructor<T>) {
    const scriptObject = new _target();

    const rootComponent = xMonkeyWrapperElement();
    render(h(XMonkeyWindowComponent, { title: scriptObject.title ?? "" }, scriptObject.render()), rootComponent!);
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
