import { categories } from "@/lib/data/categories";
import { products } from "@/lib/data/products";

/** One selectable row in the filter rail. */
export interface FacetOption {
  slug: string;
  name: string;
  count: number;
}

const shoppable = categories.filter((category) => !category.editorial);

export const categoryFacets: FacetOption[] = shoppable
  .map((category) => ({
    slug: category.slug,
    name: category.name,
    count: products.filter((product) => product.category === category.slug).length,
  }))
  .filter((facet) => facet.count > 0);

/** Ratings are offered as floors — "4.5 and up". */
export const ratingFacets = [4.8, 4.5, 4] as const;

export type OfferKey = "sale" | "new" | "best";

export const offerFacets: { key: OfferKey; name: string }[] = [
  { key: "sale", name: "On sale" },
  { key: "new", name: "New arrivals" },
  { key: "best", name: "Best sellers" },
];

const PRICE_STEP = 15000;

const prices = products.map((product) => product.price);

/** Slider bounds, rounded outward to the step so the handles sit on ticks. */
export const priceBounds = {
  min: Math.floor(Math.min(...prices) / PRICE_STEP) * PRICE_STEP,
  max: Math.ceil(Math.max(...prices) / PRICE_STEP) * PRICE_STEP,
  step: PRICE_STEP,
};

export interface PricePreset {
  id: string;
  label: string;
  range: [number, number];
}

export const pricePresets: PricePreset[] = [
  { id: "under-150k", label: "Under LKR 150,000", range: [priceBounds.min, 150000] },
  { id: "150k-300k", label: "LKR 150,000 – 300,000", range: [150000, 300000] },
  { id: "300k-600k", label: "LKR 300,000 – 600,000", range: [300000, 600000] },
  { id: "over-600k", label: "Over LKR 600,000", range: [600000, priceBounds.max] },
];

export const PAGE_SIZE = 20;
