import { ComponentChild } from "preact";

export interface IUiScript {
  title: string;
  render: () => Promise<ComponentChild> | ComponentChild;
}
