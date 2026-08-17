"use client";

import { useMemo, useRef, useState } from "react";
import { ChevronDownIcon, FilterIcon } from "@/components/icons";
import { ProductCard } from "@/components/product/ProductCard";
import { ActiveFilters } from "@/components/shop/ActiveFilters";
import { FilterDrawer } from "@/components/shop/FilterDrawer";
import { FilterPanel } from "@/components/shop/FilterPanel";
import { Container } from "@/components/ui/Container";
import { Pagination } from "@/components/ui/Pagination";
import { categoryFacets, PAGE_SIZE } from "@/lib/data/catalog";
import { products } from "@/lib/data/products";
import { cn } from "@/lib/utils/cn";
import {
  countActiveFilters,
  defaultFilters,
  filterProducts,
  sortOptions,
  sortProducts,
  toggleValue,
  type CatalogFilters,
  type SortKey,
} from "@/lib/utils/filterCatalog";

const CARD_SIZES = "(min-width: 1280px) 20vw, (min-width: 640px) 30vw, 45vw";

export function ShopCatalog() {
  const [filters, setFilters] = useState<CatalogFilters>(defaultFilters);
  const [sort, setSort] = useState<SortKey>("featured");
  const [page, setPage] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const results = useMemo(
    () => sortProducts(filterProducts(products, filters), sort),
    [filters, sort],
  );

  const pageCount = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const current = Math.min(page, pageCount);
  const start = (current - 1) * PAGE_SIZE;
  const visible = results.slice(start, start + PAGE_SIZE);
  const activeCount = countActiveFilters(filters);

  /** Any change to the result set sends the reader back to the first page. */
  const updateFilters = (next: CatalogFilters) => {
    setFilters(next);
    setPage(1);
  };

  const clearFilters = () => updateFilters(defaultFilters);

  const changePage = (next: number) => {
    setPage(Math.min(Math.max(next, 1), pageCount));
    // Scroll behaviour comes from CSS, so reduced motion turns it into a jump.
    resultsRef.current?.scrollIntoView({ block: "start" });
  };

  return (
    <Container className="flex flex-col gap-6 pb-16 pt-8 lg:flex-row lg:gap-6 lg:pb-24">
      <aside
        aria-label="Product filters"
        className="hidden w-52 shrink-0 self-start lg:sticky lg:top-28 lg:block xl:w-56"
      >
        <FilterPanel filters={filters} onChange={updateFilters} onClear={clearFilters} />
      </aside>

      <div ref={resultsRef} className="min-w-0 flex-1 scroll-mt-28">
        {/* Quick category switch — the same values as the Category group. */}
        <ul className="no-scrollbar -mx-4 flex list-none gap-2 overflow-x-auto px-4 pb-4 sm:mx-0 sm:flex-wrap sm:px-0">
          <li>
            <button
              type="button"
              aria-pressed={filters.categories.length === 0}
              onClick={() => updateFilters({ ...filters, categories: [] })}
              className={cn(
                "whitespace-nowrap rounded-full border px-4 py-2 text-sm transition-colors dur-fast ease-out",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2",
                filters.categories.length === 0
                  ? "border-ink-900 bg-ink-900 font-medium text-white"
                  : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 hover:text-ink-900",
              )}
            >
              All products
            </button>
          </li>
          {categoryFacets.map((facet) => {
            const active = filters.categories.includes(facet.slug);
            return (
              <li key={facet.slug}>
                <button
                  type="button"
                  aria-pressed={active}
                  onClick={() =>
                    updateFilters({
                      ...filters,
                      categories: toggleValue(filters.categories, facet.slug),
                    })
                  }
                  className={cn(
                    "whitespace-nowrap rounded-full border px-4 py-2 text-sm transition-colors dur-fast ease-out",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2",
                    active
                      ? "border-ink-900 bg-ink-900 font-medium text-white"
                      : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 hover:text-ink-900",
                  )}
                >
                  {facet.name}
                </button>
              </li>
            );
          })}
        </ul>

        <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-neutral-200 bg-white px-4 py-3">
          <p className="text-sm text-neutral-500">
            {results.length === 0 ? (
              "No products match these filters"
            ) : (
              <>
                Showing{" "}
                <span className="font-medium tabular-nums text-ink-900">
                  {start + 1}–{start + visible.length}
                </span>{" "}
                of <span className="font-medium tabular-nums text-ink-900">{results.length}</span>{" "}
                products
              </>
            )}
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className={cn(
                "inline-flex h-10 items-center gap-2 rounded-md border border-neutral-200 bg-white px-3.5 text-body font-medium text-ink-900",
                "transition-colors dur-fast ease-out hover:border-neutral-300 hover:text-accent-600 lg:hidden",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2",
              )}
            >
              <FilterIcon className="size-4.5" />
              Filters
              {activeCount > 0 ? (
                <span className="grid size-5 place-items-center rounded-full bg-accent-500 text-xs font-bold text-white">
                  {activeCount}
                </span>
              ) : null}
            </button>

            <label className="flex items-center gap-2">
              <span className="hidden text-sm text-neutral-500 sm:inline">Sort by</span>
              <span className="relative">
                <select
                  value={sort}
                  onChange={(event) => {
                    setSort(event.target.value as SortKey);
                    setPage(1);
                  }}
                  className={cn(
                    "h-10 appearance-none rounded-md border border-neutral-200 bg-white pl-3.5 pr-9 text-body text-ink-900",
                    "transition-colors dur-fast ease-out hover:border-neutral-300",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2",
                  )}
                >
                  {sortOptions.map((option) => (
                    <option key={option.key} value={option.key}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDownIcon
                  aria-hidden
                  className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400"
                />
              </span>
            </label>
          </div>
        </div>

        <ActiveFilters
          filters={filters}
          onChange={updateFilters}
          onClear={clearFilters}
          className="mt-4"
        />

        {visible.length > 0 ? (
          <ul
            // Remounting per page cross-fades the new set in; filter changes
            // reconcile in place so dragging the price slider stays smooth.
            key={current}
            className="mt-5 grid list-none animate-fade-in grid-cols-2 items-stretch gap-3 sm:grid-cols-3 lg:gap-5 xl:grid-cols-4"
          >
            {visible.map((product) => (
              <li key={product.slug} className="h-full">
                <ProductCard product={product} sizes={CARD_SIZES} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-5 rounded-lg border border-neutral-200 bg-white px-6 py-16 text-center">
            <h2 className="text-h3 text-ink-900">Nothing matches yet</h2>
            <p className="mx-auto mt-2 max-w-md text-body text-neutral-500">
              Try widening the price range or removing a filter to see more of the catalogue.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-6 inline-flex h-11 items-center rounded-md bg-accent-500 px-5 text-body font-medium text-white shadow-accent transition-colors dur-base ease-out hover:bg-accent-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2"
            >
              Clear all filters
            </button>
          </div>
        )}

        <Pagination
          page={current}
          pageCount={pageCount}
          onChange={changePage}
          className="mt-10"
        />
      </div>

      <FilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        filters={filters}
        onChange={updateFilters}
        onClear={clearFilters}
        resultCount={results.length}
      />
    </Container>
  );
}
