import { VNode, VProps } from "million";

export function XMonkeyComponent(props: VProps): VNode {
  return (
    <div className="__xmwr_c d--f fd--c ai--c jc--sb">
      <div className="xmwr-h">
        <div className="xmwr-title">{props.title}</div>
      </div>
      <div className="xmwr-b">{props.children}</div>
    </div>
  );
}
