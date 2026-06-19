import { type ComponentChild, h, render } from "preact";
import { useEffect, useState } from "preact/hooks";
import type { IUiScript } from "./ui-script.interface.js";
import type { ClassConstructor, ScriptInfo } from "../types.js";
import { XMonkeyWindowComponent } from "../x-monkey-window-component.js";

export function UiScript<T extends IUiScript>(_metadata: ScriptInfo) {
  return function (_target: ClassConstructor<T>) {
    const scriptObject = new _target();

    const rootComponent = xMonkeyWrapperElement();
    render(
      h(XMonkeyWindowComponent, { title: scriptObject.title ?? "" }, h(UiScriptRenderer, { scriptObject })),
      rootComponent,
    );
  };
}

function UiScriptRenderer({ scriptObject }: { scriptObject: IUiScript }) {
  const renderedScript = scriptObject.render();

  if (renderedScript instanceof Promise) {
    return h(AsyncUiScriptRenderer, { renderedScript });
  }

  return renderedScript;
}

function AsyncUiScriptRenderer({ renderedScript }: { renderedScript: Promise<ComponentChild> }) {
  const [content, setContent] = useState<ComponentChild>(null);

  useEffect(() => {
    let isMounted = true;

    void renderedScript
      .then((resolvedContent) => {
        if (isMounted) {
          setContent(resolvedContent);
        }
      })
      .catch((error) => {
        console.error("UiScript render failed.", error);
      });

    return () => {
      isMounted = false;
    };
  }, [renderedScript]);

  return content;
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
