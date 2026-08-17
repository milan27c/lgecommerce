/** `2043` → `2,043`. Used for review counts. */
export function formatCount(value: number): string {
  return value.toLocaleString("en-US");
}
