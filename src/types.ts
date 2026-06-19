/** biome-ignore-all lint/suspicious/noExplicitAny: ? */
/** biome-ignore-all lint/complexity/noBannedTypes: ? */

/**
Documentation links:
- https://violentmonkey.github.io/api/metadata-block/
- https://www.tampermonkey.net/documentation.php
- https://wiki.greasespot.net/Metadata_Block
*/

type Grants = `GM.${keyof typeof GM}` | `GM_${keyof typeof GM}` | (string & {});

export type ScriptInfo = {
  "@name": string;
  "@namespace": string;
  "@match": string | string[];
  "@version": string;
  "@author": string;
  "@description": string;
  "@grant"?: Grants[];
  [k: string]: unknown;
};

export type NonFunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? never : K }[keyof T];
export type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;
export type FunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? K : never }[keyof T];

export type ClassConstructor<T> = { new (..._: any[]): T };
export type Self<T> = ClassConstructor<T>;

export type AnyObject = { [key: string]: any };
export type AnyType = string | number | boolean | AnyObject;

export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };
export type Complete<T> = {
  [P in keyof Required<T>]: Pick<T, P> extends Required<Pick<T, P>> ? T[P] : T[P] | undefined;
};
