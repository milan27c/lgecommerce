import type { Product } from "@/lib/data/types";

export function productHref(product: Product): string {
  return `/p/${product.slug}`;
}
