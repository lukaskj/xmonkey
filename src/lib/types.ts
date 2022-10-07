/* eslint-disable @typescript-eslint/no-explicit-any */
export type Instantiable<T> = { new (...args: any[]): T };

export type AnyType = any;
export type AnyNullableType = AnyType | null | undefined;
