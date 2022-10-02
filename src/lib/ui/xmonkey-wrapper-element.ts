import "./styles/xmonkey-wrapper.css";

export function xMonkeyWrapperElement(): HTMLDivElement {
  const div = document.createElement("div");
  div.id = "xmonkey-wrapper";
  div.classList.add("xmonkey-wrapper");
  document.body.appendChild(div);
  return div;
}
