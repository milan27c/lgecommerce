"use client";

import { SparkIcon, StarIcon, TagIcon } from "@/components/icons";
import { FilterGroup } from "@/components/shop/FilterGroup";
import { FilterOption } from "@/components/shop/FilterOption";
import { PriceFilter } from "@/components/shop/PriceFilter";
import { categoryFacets, offerFacets, ratingFacets, type OfferKey } from "@/lib/data/catalog";
import { products } from "@/lib/data/products";
import type { Product } from "@/lib/data/types";
import { cn } from "@/lib/utils/cn";
import {
  countActiveFilters,
  filterProducts,
  isPriceFiltered,
  toggleValue,
  type CatalogFilters,
} from "@/lib/utils/filterCatalog";

/** Icon per offer facet — "new" stays plain text, the other two get a mark. */
const offerIcons: Partial<Record<OfferKey, typeof TagIcon>> = {
  sale: TagIcon,
  best: SparkIcon,
};

export interface FilterPanelProps {
  filters: CatalogFilters;
  onChange: (filters: CatalogFilters) => void;
  onClear: () => void;
  /** The drawer supplies its own header, so it turns this one off. */
  showHeader?: boolean;
  className?: string;
}

export function FilterPanel({
  filters,
  onChange,
  onClear,
  showHeader = true,
  className,
}: FilterPanelProps) {
  // Each group counts against everything except itself, so its own options
  // never collapse to zero the moment one of them is ticked.
  const forCategory = filterProducts(products, filters, "category");
  const forRating = filterProducts(products, filters, "rating");
  const forOffers = filterProducts(products, filters, "offers");
  const forAvailability = filterProducts(products, filters, "availability");

  const countIn = (items: Product[], predicate: (product: Product) => boolean) =>
    items.filter(predicate).length;

  const toggleCategory = (slug: string) => {
    onChange({ ...filters, categories: toggleValue(filters.categories, slug) });
  };

  const activeCount = countActiveFilters(filters);

  return (
    <div className={cn("flex flex-col", className)}>
      {showHeader ? (
        <div className="flex items-center justify-between gap-3 pb-1">
          <h2 className="text-h3 text-ink-900">Filters</h2>
          {activeCount > 0 ? (
            <button
              type="button"
              onClick={onClear}
              className="rounded-none text-sm font-medium text-accent-600 transition-colors dur-fast ease-out hover:text-accent-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2"
            >
              Clear all
            </button>
          ) : null}
        </div>
      ) : null}

      <FilterGroup title="Category" activeCount={filters.categories.length}>
        <ul className="list-none">
          {categoryFacets.map((facet) => {
            const count = countIn(forCategory, (product) => product.category === facet.slug);
            return (
              <li key={facet.slug}>
                <FilterOption
                  label={facet.name}
                  count={count}
                  checked={filters.categories.includes(facet.slug)}
                  disabled={count === 0 && !filters.categories.includes(facet.slug)}
                  onChange={() => toggleCategory(facet.slug)}
                />
              </li>
            );
          })}
        </ul>
      </FilterGroup>

      <FilterGroup title="Price (LKR)" activeCount={isPriceFiltered(filters) ? 1 : 0}>
        <PriceFilter value={filters.price} onChange={(price) => onChange({ ...filters, price })} />
      </FilterGroup>

      <FilterGroup title="Customer rating" activeCount={filters.rating > 0 ? 1 : 0}>
        <ul className="list-none">
          <li>
            <FilterOption
              type="radio"
              name="rating"
              label="Any rating"
              checked={filters.rating === 0}
              onChange={() => onChange({ ...filters, rating: 0 })}
            />
          </li>
          {ratingFacets.map((floor) => (
            <li key={floor}>
              <FilterOption
                type="radio"
                name="rating"
                checked={filters.rating === floor}
                count={countIn(forRating, (product) => (product.rating ?? 0) >= floor)}
                onChange={() => onChange({ ...filters, rating: floor })}
                label={
                  <span className="flex items-center gap-1.5">
                    <StarIcon className="size-4 text-star" />
                    {floor.toFixed(1)} and up
                  </span>
                }
              />
            </li>
          ))}
        </ul>
      </FilterGroup>

      <FilterGroup title="Offers" activeCount={filters.offers.length}>
        <ul className="list-none">
          {offerFacets.map((facet) => {
            const Icon = offerIcons[facet.key];
            return (
              <li key={facet.key}>
                <FilterOption
                  label={
                    Icon ? (
                      <span className="flex items-center gap-1.5">
                        <Icon className="size-4 text-accent-500" />
                        {facet.name}
                      </span>
                    ) : (
                      facet.name
                    )
                  }
                  count={countIn(forOffers, (product) => {
                    if (facet.key === "sale") return typeof product.originalPrice === "number";
                    if (facet.key === "new") return Boolean(product.isNew);
                    return typeof product.rank === "number";
                  })}
                  checked={filters.offers.includes(facet.key)}
                  onChange={() =>
                    onChange({
                      ...filters,
                      offers: toggleValue<OfferKey>(filters.offers, facet.key),
                    })
                  }
                />
              </li>
            );
          })}
        </ul>
      </FilterGroup>

      <FilterGroup title="Availability" activeCount={filters.inStockOnly ? 1 : 0}>
        <FilterOption
          label="In stock only"
          count={countIn(forAvailability, (product) => product.inStock)}
          checked={filters.inStockOnly}
          onChange={() => onChange({ ...filters, inStockOnly: !filters.inStockOnly })}
        />
      </FilterGroup>
    </div>
  );
}
