import { ComponentChild } from "preact";

export interface IUiScript {
  render: () => Promise<ComponentChild> | ComponentChild;
}
