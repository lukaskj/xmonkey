export function xMonkeyWrapperElement(): HTMLElement {
  const ID = "__xmwr";
  let div = document.getElementById(ID);
  if (!div) {
    div = document.createElement("div");
    div.id = ID;
  }
  document.body.appendChild(div);
  return div;
}
