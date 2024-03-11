import { ExecutableScript } from "$lib/executable-script";
import { xMonkeyWrapperElement } from "$lib/ui/xmonkey-wrapper-element";
import { ComponentChild, h, render } from "preact";

import "./styles/base.scss";
import { XMonkeyComponent } from "./xmonkey-component";

/**
 * Script that renders an overlay
 */
export abstract class UiScript extends ExecutableScript {
  protected title: string = "Script";
  constructor() {
    super();
  }

  public async execute(): Promise<void> {
    const rootComponent = xMonkeyWrapperElement();
    render(h(XMonkeyComponent, { title: this.title }, this.render()), rootComponent!);
  }

  public abstract render(): ComponentChild;
}
