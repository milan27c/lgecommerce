"use client";

import { useEffect } from "react";
import { CloseIcon } from "@/components/icons";
import { FilterPanel } from "@/components/shop/FilterPanel";
import { cn } from "@/lib/utils/cn";
import type { CatalogFilters } from "@/lib/utils/filterCatalog";

export interface FilterDrawerProps {
  open: boolean;
  onClose: () => void;
  filters: CatalogFilters;
  onChange: (filters: CatalogFilters) => void;
  onClear: () => void;
  resultCount: number;
}

/** The same panel as the desktop rail, carried in a slide-in sheet below lg. */
export function FilterDrawer({
  open,
  onClose,
  filters,
  onChange,
  onClear,
  resultCount,
}: FilterDrawerProps) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    // `inert` keeps the closed sheet out of the tab order as well as the a11y tree.
    <div className={cn("lg:hidden", !open && "pointer-events-none")} inert={!open}>
      <div
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-50 bg-ink-950/40 transition-opacity dur-base ease-out",
          open ? "opacity-100" : "opacity-0",
        )}
      />

      <div
        role="dialog"
        aria-label="Filters"
        aria-modal={open}
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-11/12 max-w-sm flex-col bg-white shadow-lg",
          "transition-transform dur-base ease-out",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-neutral-200 px-4">
          <h2 className="text-h3 text-ink-900">Filters</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close filters"
            className="grid size-9 place-items-center rounded-md text-neutral-500 transition-colors dur-fast ease-out hover:text-accent-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
          >
            <CloseIcon className="size-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain px-4">
          <FilterPanel filters={filters} onChange={onChange} onClear={onClear} showHeader={false} />
        </div>

        <div className="flex shrink-0 items-center gap-3 border-t border-neutral-200 px-4 py-3">
          <button
            type="button"
            onClick={onClear}
            className="h-11 rounded-md border border-neutral-200 px-4 text-body font-medium text-ink-900 transition-colors dur-fast ease-out hover:border-neutral-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2"
          >
            Clear all
          </button>
          <button
            type="button"
            onClick={onClose}
            className="h-11 flex-1 rounded-md bg-accent-500 px-4 text-body font-medium text-white shadow-accent transition-colors dur-fast ease-out hover:bg-accent-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2"
          >
            Show {resultCount} {resultCount === 1 ? "product" : "products"}
          </button>
        </div>
      </div>
    </div>
  );
}
