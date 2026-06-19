/** biome-ignore-all lint/suspicious/noExplicitAny: . */
export const isNullOrUndefined = (value: any): value is null | undefined => value === null || value === undefined;

export function isNullOrEmptyOrUndefined(value?: any | null): value is null | undefined {
  return isNullOrUndefined(value) || value === "" || value.toString().trim() === "";
}
