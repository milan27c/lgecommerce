import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/product/Badge";
import { OfferRibbon } from "@/components/product/OfferRibbon";
import { PriceBlock } from "@/components/product/PriceBlock";
import { Rating } from "@/components/product/Rating";
import { Button } from "@/components/ui/Button";
import type { Product } from "@/lib/data/types";
import { calcDiscount } from "@/lib/utils/calcDiscount";
import { cn } from "@/lib/utils/cn";
import { productHref } from "@/lib/utils/productHref";

export interface ProductCardProps {
  product: Product;
  /** Renders the ink rank badge. Ranked rails only. */
  rank?: number;
  /** Feeds `sizes` on the product image. */
  sizes?: string;
  /** Set false to price the card at its current price only, with no offer row. */
  showOffer?: boolean;
  className?: string;
}

const DEFAULT_SIZES = "(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw";

/**
 * The canonical card. Hover changes image scale, card lift, border colour and
 * shadow, and fades the Where to Buy link in. Nothing moves that wasn't moving.
 */
export function ProductCard({
  product,
  rank,
  sizes,
  showOffer = true,
  className,
}: ProductCardProps) {
  const discount = product.originalPrice
    ? calcDiscount(product.price, product.originalPrice)
    : 0;
  const hasOffer = showOffer && Boolean(product.originalPrice) && discount > 0;

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white",
        "transition-[transform,border-color,box-shadow] dur-base ease-out",
        "hover:-translate-y-1 hover:border-neutral-300 hover:shadow-md",
        className,
      )}
    >
      <div className="relative aspect-card overflow-hidden bg-white">
        {/* The ribbon takes the flush top-right corner; the rank/badge stack
            sits inset in the top-left, so the two never collide. */}
        {hasOffer ? (
          <OfferRibbon discount={discount} className="absolute right-0 top-0 z-10" />
        ) : null}

        <div className="absolute left-2 top-2 z-10 flex flex-col items-start gap-1.5">
          {typeof rank === "number" ? (
            <span className="grid size-8 place-items-center rounded-md bg-ink-900 text-body font-bold text-white">
              {rank}
            </span>
          ) : null}
          {product.badge ? <Badge variant={product.badge} /> : null}
        </div>

        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes={sizes ?? DEFAULT_SIZES}
          className="p-tile-deal object-contain transition-transform dur-slow ease-out group-hover:scale-104"
        />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-3 pt-0">
        <h3 className="line-clamp-2 flex-1 text-body font-medium text-ink-900">
          <Link
            href={productHref(product)}
            className="rounded-sm after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2"
          >
            {product.name}
          </Link>
        </h3>

        <PriceBlock
          price={product.price}
          originalPrice={product.originalPrice}
          showOffer={showOffer}
        />

        <div className="flex items-center justify-between gap-2">
          {typeof product.rating === "number" ? <Rating value={product.rating} /> : null}

          {/* Fades in on hover, stays put on touch. The wrapper owns the opacity
              so the button keeps its own colour transition, and the row keeps
              its height either way so nothing shifts. */}
          <div
            className={cn(
              "ml-auto transition-opacity dur-base ease-out",
              "pointer-fine:pointer-events-none pointer-fine:opacity-0",
              "pointer-fine:group-hover:pointer-events-auto pointer-fine:group-hover:opacity-100",
              "pointer-fine:group-focus-within:pointer-events-auto pointer-fine:group-focus-within:opacity-100",
            )}
          >
            <Button href={productHref(product)} variant="ink" size="xs">
              Where to Buy
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
