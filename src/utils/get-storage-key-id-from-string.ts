export function getStorageKeyIdFromString(data: string): string {
  return "xmonkey-" + data.replace(/[^a-zA-Z0-9.-]/g, "").toLowerCase();
}
