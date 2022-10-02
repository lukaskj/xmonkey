import { VNode } from "million";
import { ExecutableScript } from "../lib/executable-script";
import { getState } from "../lib/state/get-state";
import "./example.css";

export class ExampleScript extends ExecutableScript {
  public override render(): VNode | undefined {
    const [value, setValue] = getState("value", 0);
    const [_text, setText] = getState("text", "");

    function onButtonClick(): void {
      setValue(value + 1);
    }

    return (
      <div className="example-script-wrapper">
        <input
          type="text"
          name="input-name"
          id="input"
          onInput={(e: InputEvent) => {
            setText((e.currentTarget as HTMLInputElement).value);
          }}
        />
        <button className="btn-example" onClick={onButtonClick}>
          OK {value}
        </button>
      </div>
    );
  }
}
