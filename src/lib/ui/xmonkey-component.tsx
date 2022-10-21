import { VNode, VProps } from "million";
import { getState } from "../state";

interface XMonkeyComponentState {
  minimized: boolean;
}

export function XMonkeyComponent(props: VProps): VNode {
  const state = getState<XMonkeyComponentState>();

  return (
    <div className="xmwr_c d--f fd--c ai--c jc--sb">
      <div className="xmwr-h w-100 m0 d--f jc--c bg-primary noselect">
        <div className="xmwr-title m0">{props.title}</div>
        <MinimizeButton />
      </div>
      <div className={`xmwr-b` + (state.minimized ? " b-collapsed" : "")}>{props.children}</div>
    </div>
  );
}

function MinimizeButton(): VNode {
  const state = getState<XMonkeyComponentState>();

  function minimizeComponent(): void {
    state.minimized = !state.minimized;
  }

  const minimizeChar = state.minimized ? "+" : "-";

  return (
    <div className="xmwr-x m0" onclick={minimizeComponent}>
      {minimizeChar}
    </div>
  );
}
