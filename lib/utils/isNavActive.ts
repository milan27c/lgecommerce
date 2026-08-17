/**
 * Whether a nav link's href matches the current route. Home only matches the
 * exact root; every other link also matches its own subpaths (e.g. `/shop`
 * stays active on `/shop/refrigerators`).
 */
export function isNavActive(pathname: string | null, href: string): boolean {
  if (!pathname) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
