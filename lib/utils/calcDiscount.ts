/** Whole-number discount percentage. Never stored — always derived. */
export function calcDiscount(price: number, originalPrice: number): number {
  if (originalPrice <= 0 || originalPrice <= price) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}
