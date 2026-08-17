/**
 * Renders a price as `LKR 569,700`. Every price on the site goes through this.
 *
 * Rupee retail pricing is quoted in whole rupees, so cents are rounded away.
 * The locale is pinned so server and client render the same grouping.
 */
export function formatPrice(value: number): string {
  return `LKR ${Math.round(value).toLocaleString("en-US")}`;
}
