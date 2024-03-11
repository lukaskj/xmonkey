import { ScriptMetadata } from "$lib/types";
import { UiScript } from "$lib/ui/ui-script";
import { ComponentChild } from "preact";
import { useState } from "preact/hooks";

@ScriptMetadata({
  "@name": "Example Ui Script",
  "@namespace": "ui-scripts",
  "@match": "https://stackoverflow.com/*",
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
  // You can also pass a callback to the setter
  const decrement = () => setCount((currentCount) => currentCount - 1);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
}
