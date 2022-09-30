import { IExecutableScript } from "../lib/executable-script.interface";
import "./example.css";

export class ExampleScript implements IExecutableScript {
  async execute(): Promise<void> {
    console.log("Example Script");
  }
}
