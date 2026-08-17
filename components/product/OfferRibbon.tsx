import { cn } from "@/lib/utils/cn";

export interface OfferRibbonProps {
  /** Whole-percent discount. Rendered as `24% OFF`. */
  discount: number;
  className?: string;
}

/**
 * Flat discount tag that sits in the top-right of a product image. Shared by
 * DealCard and ProductCard so the offer reads the same everywhere. Position
 * it from the parent — it ships no placement of its own.
 */
export function OfferRibbon({ discount, className }: OfferRibbonProps) {
  return (
    <span
      className={cn(
        "inline-flex items-baseline gap-1 bg-gradient-to-br from-accent-500 to-ink-700 px-2 py-1 text-xs text-white",
        className,
      )}
    >
      <span className="font-bold">{discount}%</span>
      <span className="uppercase">off</span>
    </span>
  );
}
