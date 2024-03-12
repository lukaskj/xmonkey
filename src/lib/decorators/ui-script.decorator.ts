import { h, render } from "preact";
import { ClassConstructor } from "../../types";
import { IUiScript } from "../interfaces";
import { ScriptInfo } from "../types";
import "../ui/styles/base.scss";
import { XMonkeyComponent } from "../ui/xmonkey-component";
import { xMonkeyWrapperElement } from "../ui/xmonkey-wrapper-element";

export function UiScript<T extends IUiScript>(_metadata: ScriptInfo) {
  return function (_target: ClassConstructor<T>) {
    const scriptObject = new _target();

    const rootComponent = xMonkeyWrapperElement();
    render(h(XMonkeyComponent, { title: scriptObject.constructor.name }, scriptObject.render()), rootComponent!);
  };
}
