import Image from "next/image";
import Link from "next/link";
import { OfferRibbon } from "@/components/product/OfferRibbon";
import { calcDiscount } from "@/lib/utils/calcDiscount";
import { formatPrice } from "@/lib/utils/formatPrice";
import type { Product } from "@/lib/data/types";
import { cn } from "@/lib/utils/cn";
import { productHref } from "@/lib/utils/productHref";

export interface DealCardProps {
  product: Product;
  /** Feeds `sizes` on the product image. */
  sizes?: string;
  className?: string;
}

const DEFAULT_SIZES = "(min-width: 1024px) 22vw, (min-width: 640px) 33vw, 45vw";

/**
 * The deals-band variant of the canonical card. Sits on the dark deal band,
 * so it keeps a plain white ground for legibility, and rounds its corners
 * (--radius-deal) to match the rest of that band's Apple-style treatment —
 * a scoped exception to the sitewide sharp-corner rule (see globals.css).
 * Image tile is white rather than the canonical neutral-100, deal-band only.
 * Hover moves only the image.
 */
export function DealCard({ product, sizes, className }: DealCardProps) {
  const discount = product.originalPrice
    ? calcDiscount(product.price, product.originalPrice)
    : 0;
  const hasOffer = Boolean(product.originalPrice) && discount > 0;

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-deal bg-white shadow-md",
        className,
      )}
    >
      <div className="relative aspect-square w-full overflow-hidden bg-white">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes={sizes ?? DEFAULT_SIZES}
          className="p-tile object-contain transition-transform dur-slow ease-out group-hover:scale-104"
        />

        {hasOffer ? (
          <OfferRibbon
            discount={discount}
            gradientClassName="bg-gradient-to-br from-accent-600 to-ink-400"
            className="absolute right-0 top-0 z-10"
          />
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-3">
        <h3 className="line-clamp-2 flex-1 text-body font-medium text-ink-900">
          <Link
            href={productHref(product)}
            className="rounded-none after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2"
          >
            {product.name}
          </Link>
        </h3>

        {/* Two fixed rows — the struck row is reserved even without an offer,
            so every card in the row lines up. */}
        <div className="flex flex-col">
          <p className="text-body-lg font-bold text-ink-900">{formatPrice(product.price)}</p>
          <p
            className={cn("text-sm text-neutral-400 line-through", !hasOffer && "invisible")}
            aria-hidden={!hasOffer}
          >
            {formatPrice(product.originalPrice ?? product.price)}
          </p>
        </div>
      </div>
    </article>
  );
}
