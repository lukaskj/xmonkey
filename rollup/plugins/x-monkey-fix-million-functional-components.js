/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { createFilter } from "rollup-pluginutils";

export function xMonkeyFixMillionFunctionalComponents(options = {}) {
  const filter = createFilter(options.include, options.exclude);
  return {
    name: "x-monkey-fix-million-functional-components",
    order: "pre",
    async transform(code, id) {
      if (!filter(id)) {
        return;
      }
      if (id.endsWith("scheduler.mjs")) {
        const stringToRemove = "tag[this.field] = true;\n";
        return code.replaceAll(stringToRemove, "");
      }
    },
  };
}
