"use client";

import { CloseIcon } from "@/components/icons";
import { categoryFacets, offerFacets, priceBounds } from "@/lib/data/catalog";
import { cn } from "@/lib/utils/cn";
import { formatPrice } from "@/lib/utils/formatPrice";
import { isPriceFiltered, type CatalogFilters } from "@/lib/utils/filterCatalog";

export interface ActiveFiltersProps {
  filters: CatalogFilters;
  onChange: (filters: CatalogFilters) => void;
  onClear: () => void;
  className?: string;
}

interface Pill {
  id: string;
  label: string;
  remove: () => void;
}

export function ActiveFilters({ filters, onChange, onClear, className }: ActiveFiltersProps) {
  const pills: Pill[] = [];

  for (const slug of filters.categories) {
    const facet = categoryFacets.find((entry) => entry.slug === slug);
    if (!facet) continue;
    pills.push({
      id: `category-${slug}`,
      label: facet.name,
      remove: () =>
        onChange({
          ...filters,
          categories: filters.categories.filter((entry) => entry !== slug),
        }),
    });
  }

  if (isPriceFiltered(filters)) {
    pills.push({
      id: "price",
      label: `${formatPrice(filters.price[0])} – ${formatPrice(filters.price[1])}`,
      remove: () => onChange({ ...filters, price: [priceBounds.min, priceBounds.max] }),
    });
  }

  if (filters.rating > 0) {
    pills.push({
      id: "rating",
      label: `${filters.rating.toFixed(1)} stars and up`,
      remove: () => onChange({ ...filters, rating: 0 }),
    });
  }

  for (const key of filters.offers) {
    const facet = offerFacets.find((entry) => entry.key === key);
    if (!facet) continue;
    pills.push({
      id: `offer-${key}`,
      label: facet.name,
      remove: () =>
        onChange({ ...filters, offers: filters.offers.filter((entry) => entry !== key) }),
    });
  }

  if (filters.inStockOnly) {
    pills.push({
      id: "stock",
      label: "In stock only",
      remove: () => onChange({ ...filters, inStockOnly: false }),
    });
  }

  if (pills.length === 0) return null;

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <h2 className="text-xs uppercase text-neutral-500">Filtering by</h2>
      <ul className="flex list-none flex-wrap gap-2">
        {pills.map((pill) => (
          <li key={pill.id}>
            <button
              type="button"
              onClick={pill.remove}
              className={cn(
                "group inline-flex items-center gap-1.5 rounded-control border border-neutral-200 bg-white py-1.5 pl-3 pr-2 text-sm text-ink-900",
                "transition-colors dur-fast ease-out hover:border-neutral-300 hover:text-accent-600",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2",
              )}
            >
              {pill.label}
              <span className="sr-only">— remove filter</span>
              <CloseIcon className="size-3.5 text-neutral-400 transition-colors dur-fast ease-out group-hover:text-accent-600" />
            </button>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={onClear}
        className="rounded-none text-sm font-medium text-accent-600 transition-colors dur-fast ease-out hover:text-accent-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2"
      >
        Clear all
      </button>
    </div>
  );
}
