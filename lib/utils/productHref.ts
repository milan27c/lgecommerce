import type { Product } from "@/lib/data/types";

/**
 * Only one PDP has real photography and hand-written copy right now
 * (see lib/data/productDetail.ts). Every product card routes there for now
 * until the rest of the catalogue gets the same treatment.
 */
const PLACEHOLDER_PDP_SLUG = "lg-qned65-miniled-43-4k-smart-tv-2026";

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- kept for a quick revert once every PDP has real content
export function productHref(product: Product): string {
  return `/p/${PLACEHOLDER_PDP_SLUG}`;
}
