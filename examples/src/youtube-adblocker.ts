/* eslint-disable no-constant-condition */
import { ConsoleScript, IConsoleScript } from "@lukaskj/xmonkey/console-script";
import { sleep } from "./utils/sleep";

@ConsoleScript({
  "@name": "Youtube Adblocker",
  "@namespace": "scripts",
  "@version": "1.0",
  "@description": "Youtube Custom Adblocker",
  "@author": "Lukas",
  "@match": "https://www.youtube.com/*",
})
export default class implements IConsoleScript {
  async execute() {
    while (true) {
      await Promise.all([___removeBannerAds(), ___removeTileAds()]);
      await sleep(25);
    }
  }
}

function hideElement(el: HTMLElement) {
  el.style.overflow = "hidden";
  el.style.height = "0px";
  el.style.width = "0px";
  el.style.maxHeight = "0px";
}

async function ___removeBannerAds() {
  const banners = document.querySelectorAll<HTMLElement>("#masthead-ad");
  for (const banner of banners) {
    if (banner.style.height === "0px") continue;
    // banner.remove(); // youtube changed this method
    hideElement(banner);
  }
}

async function ___removeTileAds() {
  const tiles = document.querySelectorAll<HTMLElement>("ytd-ad-slot-renderer");
  for (const tile of tiles) {
    const parent = tile.closest<HTMLElement>("ytd-rich-item-renderer");
    if (parent) {
      hideElement(parent);
    }
    hideElement(tile);
  }
}
