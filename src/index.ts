import { ExampleScript } from "./example-script/example";

const obj = new ExampleScript();

async function main(): Promise<void> {
  return await obj.execute();
}

main();
