import { VNode, VProps } from "million";
import { getState } from "./state";

export function XMonkeyComponent(props: VProps): VNode {
  const [minimized, _] = getState("minimized", false);
  return (
    <div className="xmwr_c d--f fd--c ai--c jc--sb">
      <div className="xmwr-h w-100 m0 d--f jc--c bg-primary noselect">
        <div className="xmwr-title m0">{props.title}</div>
        <MinimizeButton />
      </div>
      <div className={`xmwr-b` + (minimized ? " b-collapsed" : "")}>{props.children}</div>
    </div>
  );
}

function MinimizeButton(): VNode {
  const [minimized, setMinimize] = getState("minimized", false);

  function minimizeComponent(): void {
    setMinimize(!minimized);
  }

  const minimizeChar = minimized ? "+" : "-";

  return (
    <div className="xmwr-x m0" onclick={minimizeComponent}>
      {minimizeChar}
    </div>
  );
}
