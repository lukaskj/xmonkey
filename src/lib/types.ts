/* eslint-disable @typescript-eslint/no-explicit-any */
export type Instantiable<T> = { new (...args: any[]): T };

export type AnyType = any | null | undefined;
