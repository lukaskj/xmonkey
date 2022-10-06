export function xMonkeyWrapperElement(): HTMLDivElement {
  const div = document.createElement("div");
  div.id = "__xmwr";
  div.classList.add("__xmwr");
  div.classList.add("d--f");
  div.classList.add("fd--c");
  div.classList.add("ai--c");
  div.classList.add("jc--sb");
  document.body.appendChild(div);
  return div;
}
