import { VNode, VProps } from "million";

export function XMonkeyComponent(props: VProps): VNode {
  return (
    <div className="xmwr_c d--f fd--c ai--c jc--sb">
      <div className="xmwr-h w-100 m0 d--f jc--c bg-primary noselect">
        <div className="xmwr-title m0">{props.title}</div>
      </div>
      <div className="xmwr-b">{props.children}</div>
    </div>
  );
}
