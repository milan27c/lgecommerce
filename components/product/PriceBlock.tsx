import { calcDiscount } from "@/lib/utils/calcDiscount";
import { formatPrice } from "@/lib/utils/formatPrice";
import { cn } from "@/lib/utils/cn";

export interface PriceBlockProps {
  price: number;
  originalPrice?: number;
  /** Set false to suppress the struck original — current price only. */
  showOffer?: boolean;
  className?: string;
}

/**
 * One row: the current price leads, the struck original follows at meta size.
 * The discount percentage is not shown here — it rides the OfferRibbon on the
 * image. A single row means offer and non-offer cards are the same height with
 * nothing reserved, so a mixed grid still lines up.
 */
export function PriceBlock({
  price,
  originalPrice,
  showOffer = true,
  className,
}: PriceBlockProps) {
  const hasOffer =
    showOffer && Boolean(originalPrice) && calcDiscount(price, originalPrice ?? price) > 0;

  return (
    <p className={cn("flex flex-wrap items-baseline gap-x-2", className)}>
      <span className="text-price text-ink-900">{formatPrice(price)}</span>
      {hasOffer ? (
        <span className="text-sm text-neutral-400 line-through">
          {formatPrice(originalPrice ?? price)}
        </span>
      ) : null}
    </p>
  );
}
