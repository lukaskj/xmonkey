import { ComponentChildren } from "preact";
import { useState } from "preact/hooks";

type VProps = {
  title: string;
  children?: ComponentChildren;
};

export function XMonkeyComponent(props: VProps) {
  const [minimized, setMinimized] = useState(false);

  function toggleMinimize() {
    setMinimized(!minimized);
  }

  return (
    <div className="xmwr_c d--f fd--c ai--c jc--sb">
      <div className="xmwr-h w-100 m0 d--f jc--c bg-primary noselect">
        <div className="xmwr-title m0">{props.title}</div>
        <MinimizeButton toggleMinimize={toggleMinimize} minimized={minimized} />
      </div>
      <div className={`xmwr-b w-100 ` + (minimized ? "b-collapsed" : "")}>{props.children}</div>
    </div>
  );
}

function MinimizeButton({ minimized, toggleMinimize }: { minimized: boolean; toggleMinimize: CallableFunction }) {
  const minimizeChar = minimized ? "+" : "-";

  return (
    <div className="xmwr-x m0" onClick={() => toggleMinimize()}>
      {minimizeChar}
    </div>
  );
}
