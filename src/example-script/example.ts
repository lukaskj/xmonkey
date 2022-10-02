import { VNode } from "million";
import { div, input, button } from "million/html";
import { ExecutableScript } from "../lib/executable-script";
import { getState } from "../lib/state/get-state";
import "./example.css";

export class ExampleScript extends ExecutableScript {
  public hasUI = true;

  public buildUI(): VNode {
    const [value, setValue] = getState("value", 0);
    const [text, setText] = getState("text", "");

    function onButtonClick(): void {
      console.log("ASDASDASD", this);
      setValue(value + 1);
    }
    onButtonClick.bind(this);
    const btn = button(
      {
        class: "btn-ok",
        onclick: onButtonClick,
      },
      ["OK " + value],
    );

    const _input = input(
      {
        name: "xinput",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onkeydown: (_event: any) => {
          setText("asd");
        },
      },
      [text],
    );

    console.log("RENDER");

    const node = div({ className: "enis" }, [_input, btn]);
    return node;
  }

  async execute(): Promise<void> {
    console.log("Example Script");
  }
}
