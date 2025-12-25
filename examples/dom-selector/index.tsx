import "../../src/styles/_base.scss";
import "./styles.scss";

import { type IUiScript, UiScript } from "../../src/ui-script";
import { DomSelector } from "../../src/utils/dom-selector";

@UiScript({
  "@name": "DOM Selector Example",
  "@namespace": "examples",
  "@match": "https://github.com/*",
  "@version": "1.0",
  "@author": "-",
  "@description": "-",
  "@grant": ["GM.addStyle"],
})
export default class DOMSelector implements IUiScript {
  title: string = "DOM Selector Examples";

  async render() {
    return (
      <div id="wp-theme-container">
        <DOMSelectorExampleComponent />
      </div>
    );
  }
}

function DOMSelectorExampleComponent() {
  function selectElement() {
    DomSelector.getInstance()
      .selectElementWithMouse()
      .then((element) => {
        console.log("Selected element: ", element);
      });
  }

  return (
    <div className="d-f">
      <button type="button" class="btn small primary" onClick={selectElement}>
        Select DOM Element
      </button>
    </div>
  );
}
