"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ProductCard } from "@/components/product/ProductCard";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";
import { Container } from "@/components/ui/Container";
import type { Product } from "@/lib/data/types";
import { cn } from "@/lib/utils/cn";

export interface ProductRailProps {
  products: Product[];
  label: string;
  /** Renders the numbered rank badge from each product's `rank`. */
  ranked?: boolean;
  /** Cards visible on large screens. */
  perView?: 4 | 5;
  /**
   * Runs the track to the viewport's right edge on desktop instead of stopping
   * at the container gutter. Render the rail outside a Container when set — it
   * aligns its own left edge and keeps the controls container-aligned.
   */
  bleedRight?: boolean;
  /** Set false to drop the scroll-progress bar and leave the arrows alone. */
  progress?: boolean;
  className?: string;
}

const widths: Record<4 | 5, string> = {
  4: "w-2/5 sm:w-1/3 lg:w-1/4",
  5: "w-2/5 sm:w-1/3 lg:w-1/5",
};

export function ProductRail({
  products,
  label,
  ranked = false,
  perView = 5,
  bleedRight = false,
  progress: showProgress = true,
  className,
}: ProductRailProps) {
  const scroller = useRef<HTMLUListElement>(null);
  const [progress, setProgress] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const measure = useCallback(() => {
    const node = scroller.current;
    if (!node) return;
    const max = node.scrollWidth - node.clientWidth;
    const ratio = max > 0 ? node.scrollLeft / max : 1;
    setProgress(ratio);
    setAtStart(node.scrollLeft <= 1);
    setAtEnd(max - node.scrollLeft <= 1);
  }, []);

  useEffect(() => {
    measure();
    const node = scroller.current;
    if (!node) return;
    window.addEventListener("resize", measure, { passive: true });
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const step = (direction: -1 | 1) => {
    const node = scroller.current;
    if (!node) return;
    node.scrollBy({ left: direction * node.clientWidth * 0.8, behavior: "smooth" });
  };

  const arrow =
    "grid size-10 place-items-center rounded-full border border-neutral-200 bg-white text-ink-900 shadow-sm transition-colors dur-base ease-out hover:border-neutral-300 hover:text-accent-600 disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2";

  const controls = (
    <>
      {/* Scroll progress */}
      {showProgress ? (
        <div className="mt-4 h-0.5 w-full overflow-hidden rounded-full bg-neutral-200">
          <div
            className="h-full w-full origin-left rounded-full bg-accent-500"
            style={{ transform: `scaleX(${Math.max(0.12, progress || 0.12)})` }}
          />
        </div>
      ) : null}

      <div className="mt-4 hidden justify-end gap-2 lg:flex">
        <button type="button" onClick={() => step(-1)} disabled={atStart} aria-label="Scroll left" className={arrow}>
          <ChevronLeftIcon className="size-5" />
        </button>
        <button type="button" onClick={() => step(1)} disabled={atEnd} aria-label="Scroll right" className={arrow}>
          <ChevronRightIcon className="size-5" />
        </button>
      </div>
    </>
  );

  return (
    <div className={cn("relative", className)}>
      <ul
        ref={scroller}
        onScroll={measure}
        aria-label={label}
        className={cn(
          "no-scrollbar flex snap-x snap-mandatory list-none gap-3 overflow-x-auto scroll-smooth pb-1 lg:gap-5",
          bleedRight
            ? "rail-bleed-right"
            : "-mx-4 px-4 scroll-pl-4 sm:mx-0 sm:px-0 sm:scroll-pl-0",
        )}
      >
        {products.map((product) => (
          <li
            key={product.slug}
            className={cn("shrink-0 snap-start", widths[perView])}
          >
            <ProductCard
              product={product}
              rank={ranked ? product.rank : undefined}
              sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 40vw"
            />
          </li>
        ))}
      </ul>

      {bleedRight ? <Container>{controls}</Container> : controls}
    </div>
  );
}
