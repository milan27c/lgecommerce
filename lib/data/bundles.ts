export interface FeaturedBundle {
  tvSlug: string;
  speakerSlug: string;
  price: number;
  /** Sum of the two products' own prices — never stored as a discount. */
  originalPrice: number;
}

/**
 * Cross-sell bundle for the TV PDP, pairing it with one LG sound system.
 * Scoped to this one product for now rather than modelled as a generic
 * per-product bundle system.
 */
export const tvBundleSlug = "lg-qned65-miniled-43-4k-smart-tv-2026";

export const tvSpeakerBundle: FeaturedBundle = {
  tvSlug: tvBundleSlug,
  speakerSlug: "lg-xboom-go-pk7-portable-speaker",
  price: 192500,
  originalPrice: 213900,
};
