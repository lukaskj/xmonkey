import "@lukaskj/xmonkey/styles";
import { IUiScript, UiScript } from "@lukaskj/xmonkey/ui-script";
import "./styles.scss";
import { useState } from "preact/hooks";

@UiScript({
  "@name": "WhatsApp Example",
  "@namespace": "example",
  "@match": "https://web.whatsapp.com/",
  "@version": "1.0",
  "@author": "-",
  "@description": "-",
  "@grant": ["GM.addStyle"],
})
export default class WhatsAppExample implements IUiScript {
  title: string = "Example";

  async render() {
    return (
      <div id="wp-theme-container">
        <WhatsAppExampleComponent />
      </div>
    );
  }
}

function WhatsAppExampleComponent() {
  const [headerColor, setHeaderColor] = useState("#202c33");
  const [bgColor, setBgColor] = useState("#111b21");
  const [hideSearchbar, setHideSearchbar] = useState(false);
  // console.log("useState");

  function applyHeaderColor(color: string) {
    setHeaderColor(color);
    const header = document.querySelector("header");
    if (header) {
      header.style.backgroundColor = color;
    }
  }

  function applyBgColor(color: string) {
    setBgColor(color);
    const header = document.querySelectorAll<HTMLElement>("._ak72"); // NOTE: wp classes may change
    for (const h of header) {
      h.style.backgroundColor = color;
    }
  }

  function hideSearchBarAction() {
    setHideSearchbar(!hideSearchbar);

    const searchBar = document.querySelector<HTMLElement>("._ai03");

    if (!searchBar) return;

    searchBar.style.height = !hideSearchbar ? "0" : "";
    searchBar.style.overflow = !hideSearchbar ? "hidden" : "inherit";
  }

  return (
    <div className="d-f">
      <div className="d-f fd-r ai-c jc-sb">
        <span>Header color:</span>
        <input type="color" value={headerColor} onInput={(e) => applyHeaderColor(e.currentTarget.value)} />
      </div>
      <div className="d-f fd-r ai-c jc-sb">
        <span>BG color:</span>
        <input type="color" value={bgColor} onInput={(e) => applyBgColor(e.currentTarget.value)} />
      </div>
      <div className="d-f fd-r ai-c jc-sb">
        <span>Hide searchbar:</span>
        <input type="checkbox" onChange={hideSearchBarAction} />
      </div>
    </div>
  );
}
