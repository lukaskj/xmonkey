import { UiScript } from "../lib/decorators/ui-script.decorator";
import { IUiScript } from "../lib/interfaces";

@UiScript({
  "@name": "Example Console Script",
  "@namespace": "console-scripts",
  "@match": "https://en.wikipedia.org/*",
  "@version": "1.0",
  "@author": "-",
  "@description": "Example Console Script Description",
  "@grant": ["GM.addStyle"],
})
export default class implements IUiScript {
  public render() {
    return <>cu</>;
  }
}
