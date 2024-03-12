class CScript {}

export interface IConsoleScript extends CScript {
  execute: () => Promise<void>;
}
