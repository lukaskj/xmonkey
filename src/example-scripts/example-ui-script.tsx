import { ScriptMetadata } from "$lib/types";
import { UiScript } from "$lib/ui/ui-script";
import { ComponentChild } from "preact";
import { useState } from "preact/hooks";
import "./example-scss.scss";

@ScriptMetadata({
  "@name": "Example Ui Script",
  "@namespace": "ui-scripts",
  "@match": "https://www.google.com/",
  "@version": "1.0",
  "@author": "-",
  "@description": "Example Ui Script Description",
  "@grant": ["GM.addStyle"],
})
export class ExampleUiScript extends UiScript {
  public render(): ComponentChild {
    return <JsxUiExample />;
  }
}

function JsxUiExample() {
  const [count, setCount] = useState(0);
  const increment = () => setCount(count + 1);

  const decrement = () => setCount((currentCount) => currentCount - 1);

  return (
    <>
      <p>Count: {count}</p>
      <div class="row w-100 d--f jc--c">
        <button class="btn small primary" onClick={increment}>
          Increment
        </button>
        <button class="btn small primary" onClick={decrement}>
          Decrement
        </button>
      </div>
    </>
  );
}
