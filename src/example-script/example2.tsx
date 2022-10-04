import { VNode } from "million";

export function Example2Component(props: { value: number }): VNode {
  return <div>Component 2 example {props.value}</div>;
}
