import { ExecutableScript } from "$lib/executable-script";
import { xMonkeyWrapperElement } from "$lib/ui/xmonkey-wrapper-element";
import { ComponentChild, render } from "preact";

import "./styles/base.scss";

/**
 * Script that renders an overlay
 */
export abstract class UiScript extends ExecutableScript {
  constructor() {
    super();
  }

  public async execute(): Promise<void> {
    const rootComponent = xMonkeyWrapperElement();
    render(this.render(), rootComponent!);
  }

  public abstract render(): ComponentChild;
}
