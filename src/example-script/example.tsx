import { VNode } from "million";
import { ExecutableScript } from "../lib/executable-script";
import { getState } from "../lib/state";
import { Example2Component } from "./example2";

import "./example.scss";

export class ExampleScript extends ExecutableScript {
  public override render(): VNode | undefined {
    const [value, setValue] = getState("value", 0);
    const [_text, _setText] = getState("text", "");

    function onButtonClick(): void {
      setValue(value + 1);
    }

    return (
      <div className="example-script-wrapper d--f fd--c ai--c jc--c">
        <Example2Component value={value} />
        <div class="row">
          <div class="">
            Email
            <input class="card w-100" type="email" placeholder="opensource@mail.com" />
          </div>
          <div class="">
            Additional Info
            <select class="card w-100">
              <option value="Option 1">Question</option>
              <option value="Option 2">Compliment</option>
              <option value="Option 3">Problem</option>
            </select>
          </div>
        </div>
        <div class="row">
          Message
          <textarea class="card w-100" placeholder="Some information here"></textarea>
          <input type="checkbox" id="__check" />
          <label for="__check">I am not a robot</label>
        </div>
        <hr className="w-100" />
        <div className="row w-100 d--f jc--c">
          <button class="btn small primary" onclick={onButtonClick}>
            Primary
          </button>
          <button class="btn small secondary" onclick={onButtonClick}>
            Secondary
          </button>
          <button class="btn small success" onclick={onButtonClick}>
            Success
          </button>
          <button class="btn small error" onclick={onButtonClick}>
            Error
          </button>
          <button class="btn small info" onclick={onButtonClick}>
            Info
          </button>
          <button class="btn small" onclick={onButtonClick}>
            Info
          </button>
        </div>
      </div>
    );
  }
}
