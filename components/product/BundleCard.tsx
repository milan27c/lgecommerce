import Image from "next/image";
import Link from "next/link";
import { OfferRibbon } from "@/components/product/OfferRibbon";
import { ProductImageMark } from "@/components/product/ProductImageMark";
import type { BundleOffer } from "@/lib/data/bundles";
import { calcDiscount } from "@/lib/utils/calcDiscount";
import { cn } from "@/lib/utils/cn";
import { formatPrice } from "@/lib/utils/formatPrice";

export interface BundleCardProps {
  bundle: BundleOffer;
  href: string;
  sizes?: string;
  className?: string;
}

const DEFAULT_SIZES = "(min-width: 1024px) 22vw, (min-width: 640px) 33vw, 45vw";

/**
 * Bundle-band variant of the canonical card — white ground and rounded
 * corners like DealCard, since it sits on the same kind of dark band. The
 * name carries two product names instead of one, so it gets four lines
 * instead of the sitewide two, and a "Bundle offer" tag sits bottom-right of
 * the price row, opposite the discount ribbon on the image.
 */
export function BundleCard({ bundle, href, sizes, className }: BundleCardProps) {
  const discount = calcDiscount(bundle.price, bundle.originalPrice);

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-card bg-white shadow-md",
        className,
      )}
    >
      <div className="relative aspect-square w-full overflow-hidden bg-white">
        <ProductImageMark />

        <Image
          src={bundle.image}
          alt={bundle.name}
          fill
          sizes={sizes ?? DEFAULT_SIZES}
          className="p-tile object-contain transition-transform dur-slow ease-out group-hover:scale-104"
        />

        {discount > 0 ? (
          <OfferRibbon
            discount={discount}
            gradientClassName="bg-gradient-to-br from-accent-600 to-ink-400"
            className="absolute right-0 top-0 z-10"
          />
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-3">
        <h3 className="line-clamp-4 flex-1 text-body font-medium text-ink-900">
          <Link
            href={href}
            className="rounded-card after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2"
          >
            {bundle.name}
          </Link>
        </h3>

        <div className="flex items-end justify-between gap-2">
          <div className="flex flex-col">
            <p className="text-body-lg font-bold text-ink-900">{formatPrice(bundle.price)}</p>
            <p className="text-sm text-neutral-400 line-through">
              {formatPrice(bundle.originalPrice)}
            </p>
          </div>

          <span className="shrink-0 rounded-control bg-ink-900 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-white">
            Bundle offer
          </span>
        </div>
      </div>
    </article>
  );
}
