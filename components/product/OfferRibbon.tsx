import { cn } from "@/lib/utils/cn";

export interface OfferRibbonProps {
  /** Whole-percent discount. Rendered as `24% OFF`. */
  discount: number;
  className?: string;
}

/**
 * The raised discount pennant that sits in the top-right of a product image.
 * Shared by DealCard and ProductCard so the offer reads the same everywhere.
 * Position it from the parent — it ships no placement of its own.
 */
export function OfferRibbon({ discount, className }: OfferRibbonProps) {
  return (
    <p className={cn("ribbon-lift", className)}>
      <span className="ribbon-notch ribbon-face flex items-baseline gap-1 bg-accent-500 px-2 pb-3 pt-1 text-xs text-white">
        <span className="font-bold">{discount}%</span>
        <span className="uppercase">off</span>
      </span>
    </p>
  );
}
