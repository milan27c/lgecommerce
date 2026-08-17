type ClassValue = string | number | false | null | undefined;

/** Join class names, dropping anything falsy. */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}
