import { UiScript } from "$lib/decorators/ui-script.decorator";
import { IUiScript } from "$lib/interfaces";
import { useState } from "preact/hooks";
import "./example-scss.scss";

@UiScript({
  "@name": "Example Console Script",
  "@namespace": "console-scripts",
  "@match": "https://en.wikipedia.org/*",
  "@version": "1.0",
  "@author": "-",
  "@description": "Example Console Script Description",
  "@grant": ["GM.addStyle"],
})
export class ExampleUiScript implements IUiScript {
  public render() {
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