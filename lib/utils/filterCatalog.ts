import { priceBounds, type OfferKey } from "@/lib/data/catalog";
import type { Product } from "@/lib/data/types";
import { calcDiscount } from "@/lib/utils/calcDiscount";

export type SortKey = "featured" | "price-asc" | "price-desc" | "discount" | "rating" | "newest";

export const sortOptions: { key: SortKey; label: string }[] = [
  { key: "featured", label: "Featured" },
  { key: "price-asc", label: "Price: low to high" },
  { key: "price-desc", label: "Price: high to low" },
  { key: "discount", label: "Biggest discount" },
  { key: "rating", label: "Top rated" },
  { key: "newest", label: "Newest" },
];

export interface CatalogFilters {
  categories: string[];
  price: [number, number];
  /** Rating floor. 0 means any. */
  rating: number;
  offers: OfferKey[];
  inStockOnly: boolean;
}

/** Facet to leave out when counting, so a group keeps showing its own options. */
export type FacetKey = "category" | "price" | "rating" | "offers" | "availability";

export const defaultFilters: CatalogFilters = {
  categories: [],
  price: [priceBounds.min, priceBounds.max],
  rating: 0,
  offers: [],
  inStockOnly: false,
};

const matchesOffer = (product: Product, offer: OfferKey) => {
  if (offer === "sale") return typeof product.originalPrice === "number";
  if (offer === "new") return Boolean(product.isNew);
  return typeof product.rank === "number";
};

export function isPriceFiltered(filters: CatalogFilters): boolean {
  return filters.price[0] > priceBounds.min || filters.price[1] < priceBounds.max;
}

/**
 * Every filter is an AND across groups and an OR within a group. `skip` drops
 * one group so facet counts stay meaningful for the group being rendered.
 */
export function filterProducts(
  items: Product[],
  filters: CatalogFilters,
  skip?: FacetKey,
): Product[] {
  return items.filter((product) => {
    if (skip !== "category" && filters.categories.length > 0) {
      if (!filters.categories.includes(product.category)) return false;
    }

    if (skip !== "price") {
      if (product.price < filters.price[0] || product.price > filters.price[1]) return false;
    }

    if (skip !== "rating" && filters.rating > 0) {
      if ((product.rating ?? 0) < filters.rating) return false;
    }

    if (skip !== "offers" && filters.offers.length > 0) {
      if (!filters.offers.some((offer) => matchesOffer(product, offer))) return false;
    }

    if (skip !== "availability" && filters.inStockOnly && !product.inStock) return false;

    return true;
  });
}

const discountOf = (product: Product) =>
  product.originalPrice ? calcDiscount(product.price, product.originalPrice) : 0;

export function sortProducts(items: Product[], sort: SortKey): Product[] {
  const sorted = [...items];

  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "discount":
      return sorted.sort((a, b) => discountOf(b) - discountOf(a));
    case "rating":
      return sorted.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    case "newest":
      return sorted.sort((a, b) => Number(Boolean(b.isNew)) - Number(Boolean(a.isNew)));
    default:
      return sorted.sort(
        (a, b) =>
          Number(Boolean(b.isFeatured)) - Number(Boolean(a.isFeatured)) ||
          (a.rank ?? 99) - (b.rank ?? 99) ||
          (b.rating ?? 0) - (a.rating ?? 0),
      );
  }
}

export function countActiveFilters(filters: CatalogFilters): number {
  return (
    filters.categories.length +
    filters.offers.length +
    (isPriceFiltered(filters) ? 1 : 0) +
    (filters.rating > 0 ? 1 : 0) +
    (filters.inStockOnly ? 1 : 0)
  );
}

/** Add or remove one value from a multi-select group. */
export function toggleValue<T>(values: T[], value: T): T[] {
  return values.includes(value) ? values.filter((entry) => entry !== value) : [...values, value];
}
