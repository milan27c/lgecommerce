import Image from "next/image";
import Link from "next/link";
import { OfferRibbon } from "@/components/product/OfferRibbon";
import { PriceBlock } from "@/components/product/PriceBlock";
import { ProductImageMark } from "@/components/product/ProductImageMark";
import type { Product } from "@/lib/data/types";
import { calcDiscount } from "@/lib/utils/calcDiscount";
import { cn } from "@/lib/utils/cn";
import { productHref } from "@/lib/utils/productHref";

export interface ProductCardProps {
  product: Product;
  /** Feeds `sizes` on the product image. */
  sizes?: string;
  /** Set false to price the card at its current price only, with no offer row. */
  showOffer?: boolean;
  className?: string;
}

const DEFAULT_SIZES = "(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw";

/**
 * The canonical card. Image, name, price — nothing else. Hover moves only the
 * image; no card lift, no border, no shadow.
 */
export function ProductCard({ product, sizes, showOffer = true, className }: ProductCardProps) {
  const discount = product.originalPrice
    ? calcDiscount(product.price, product.originalPrice)
    : 0;
  const hasOffer = showOffer && Boolean(product.originalPrice) && discount > 0;

  return (
    <article className={cn("group relative flex h-full flex-col", className)}>
      <div className="relative aspect-square overflow-hidden bg-neutral-100">
        <ProductImageMark />

        {hasOffer ? (
          <OfferRibbon discount={discount} className="absolute right-0 top-0 z-10" />
        ) : null}

        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes={sizes ?? DEFAULT_SIZES}
          className={cn(
            product.imageInset === "roomy" ? "p-tile-roomy" : "p-tile",
            "object-contain transition-transform dur-slow ease-out group-hover:scale-104",
          )}
        />
      </div>

      <div className="flex flex-1 flex-col gap-1.5 pt-3">
        <h3 className="line-clamp-2 flex-1 text-body font-medium text-ink-900">
          <Link
            href={productHref(product)}
            className="rounded-none after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2"
          >
            {product.name}
          </Link>
        </h3>

        <PriceBlock
          price={product.price}
          originalPrice={product.originalPrice}
          showOffer={showOffer}
        />
      </div>
    </article>
  );
}
