import { h, render } from "preact";
import { IUiScript } from "../interfaces";
import { ClassConstructor, ScriptInfo } from "../types";
import { XMonkeyComponent } from "../ui/xmonkey-component";
import { xMonkeyWrapperElement } from "../ui/xmonkey-wrapper-element";

import "../ui/styles/base.scss";

export function UiScript<T extends IUiScript>(_metadata: ScriptInfo) {
  return function (_target: ClassConstructor<T>) {
    const scriptObject = new _target();

    const rootComponent = xMonkeyWrapperElement();
    render(h(XMonkeyComponent, { title: scriptObject.title ?? "" }, scriptObject.render()), rootComponent!);
  };
}
