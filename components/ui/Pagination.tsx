"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";
import { cn } from "@/lib/utils/cn";

export interface PaginationProps {
  page: number;
  pageCount: number;
  onChange: (page: number) => void;
  className?: string;
}

/** Windowed page list: first, last, and the two pages either side of current. */
function pageItems(page: number, pageCount: number): (number | "gap")[] {
  if (pageCount <= 7) return Array.from({ length: pageCount }, (_, index) => index + 1);

  const window = new Set([1, pageCount, page, page - 1, page + 1]);
  if (page <= 3) [2, 3, 4].forEach((value) => window.add(value));
  if (page >= pageCount - 2) [pageCount - 3, pageCount - 2, pageCount - 1].forEach((v) => window.add(v));

  const pages = [...window].filter((value) => value >= 1 && value <= pageCount).sort((a, b) => a - b);

  return pages.flatMap((value, index) =>
    index > 0 && value - pages[index - 1] > 1 ? ["gap" as const, value] : [value],
  );
}

const cell =
  "grid h-10 min-w-10 place-items-center rounded-md border px-3 text-body transition-colors dur-fast ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2";

export function Pagination({ page, pageCount, onChange, className }: PaginationProps) {
  if (pageCount <= 1) return null;

  const items = pageItems(page, pageCount);

  return (
    <nav aria-label="Pagination" className={cn("flex justify-center", className)}>
      <ul className="flex list-none items-center gap-1.5">
        <li>
          <button
            type="button"
            onClick={() => onChange(page - 1)}
            disabled={page === 1}
            aria-label="Previous page"
            className={cn(
              cell,
              "border-neutral-200 bg-white text-neutral-600",
              page === 1
                ? "cursor-not-allowed opacity-40"
                : "hover:border-neutral-300 hover:text-ink-900",
            )}
          >
            <ChevronLeftIcon className="size-4" />
          </button>
        </li>

        {items.map((item, index) =>
          item === "gap" ? (
            <li key={`gap-${index}`} aria-hidden className="px-1 text-neutral-400">
              …
            </li>
          ) : (
            <li key={item}>
              <button
                type="button"
                onClick={() => onChange(item)}
                aria-label={`Page ${item}`}
                aria-current={item === page ? "page" : undefined}
                className={cn(
                  cell,
                  "tabular-nums",
                  item === page
                    ? "border-ink-900 bg-ink-900 font-semibold text-white"
                    : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 hover:text-ink-900",
                )}
              >
                {item}
              </button>
            </li>
          ),
        )}

        <li>
          <button
            type="button"
            onClick={() => onChange(page + 1)}
            disabled={page === pageCount}
            aria-label="Next page"
            className={cn(
              cell,
              "border-neutral-200 bg-white text-neutral-600",
              page === pageCount
                ? "cursor-not-allowed opacity-40"
                : "hover:border-neutral-300 hover:text-ink-900",
            )}
          >
            <ChevronRightIcon className="size-4" />
          </button>
        </li>
      </ul>
    </nav>
  );
}
