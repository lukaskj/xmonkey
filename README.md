# XMonkey TypeScript Lib

Tool for creating [userscripts](https://en.wikipedia.org/wiki/Userscript) with typescript.

With XMonkey there are two ways of creating userscripts:

- [Console Scripts](#console-scripts)
- [UI Scripts](#ui-scripts)

Project with both examples [here](./examples/)

## Console Scripts

A "Console Script" is a simple script that will run in the background.<br>
See a console script example [here](./examples/src/youtube-adblocker.ts).

### Creating an Console Script

- Create an class as entrypoint for your script. Only entry class must be the `default export`.
- The class must be decorated with the `@ConsoleScript()` decorator and be populated with the userscript metadata. See [userscript metadata guide](https://sourceforge.net/p/greasemonkey/wiki/Metadata_Block/).
- Also, the class must implement the `ConsoleScript` interface.

```typescript
// ConsoleScript decorator
@ConsoleScript({
  "@name": "Youtube Adblocker",
  "@namespace": "scripts",
  "@version": "1.0",
  "@description": "Youtube Custom Adblocker",
  "@author": "Lukas",
  "@match": "https://www.youtube.com/*",
})
export default class implements IConsoleScript {
  // Implements IConsoleScript interface
  async execute() {}
}
```

---

## Ui Scripts

"Ui Script" is an userscript with an prebuilt UI.
<br>
It is created using [preact](https://preactjs.com/) and have scss support out of the box.
<br>
See the example code [here](./examples/src/whatsapp-theme/whatsapp-theme.tsx).

### Creating an Ui Script

- Install preact
  `pnpm add preact@^10.19.7`

- Add the following to `tsconfig.json`:

```json
{
  "compilerOptions": {
    ...
    "jsx": "react-jsx", // this
    "jsxImportSource": "preact", // this
    ...
  }
}
```

- Create an class as entrypoint for your script. Only entry class must be the `default export`.
- The class must be decorated with the `@UiScript()` decorator and be populated with the userscript metadata. See [userscript metadata guide](https://sourceforge.net/p/greasemonkey/wiki/Metadata_Block/).
- Also, the class must implement the `UiScript` interface.

```typescript
// UiScript decorator
@UiScript({
  "@name": "WhatsApp Example",
  "@namespace": "example",
  "@match": "https://web.whatsapp.com/",
  "@version": "1.0",
  "@author": "-",
  "@description": "-",
  "@grant": ["GM.addStyle"],
})
export default class WhatsAppExample implements IUiScript {
  // Implements IUiScript interface
  title: string = "Example";

  async render() {}
}
```

## Building

To build the class to an working userscript, run the `xmonkey` binary with the script as argument.

```bash
xmonkey src/example-console-script.ts

#  for Ui Scripts
xmonkey src/example-console-script.tsx
```

---

### Known bugs

- The UiScript render function has a but that it cannot have any hook or it won't work. The workaround is to return a single component in the UiScript that this component can use any preact hook as usual. See example [here](./examples/src/whatsapp-theme/whatsapp-theme.tsx).
