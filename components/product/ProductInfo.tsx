import { HeartIcon } from "@/components/icons";
import { StarRating } from "@/components/product/StarRating";
import { VariantPicker } from "@/components/product/VariantPicker";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import type { ProductDetail } from "@/lib/data/productDetail";
import type { Product } from "@/lib/data/types";
import { formatCount } from "@/lib/utils/formatCount";
import { formatPrice } from "@/lib/utils/formatPrice";
import { cn } from "@/lib/utils/cn";

export interface ProductInfoProps {
  product: Product;
  detail: ProductDetail;
  className?: string;
}

/** The buy box: tags, title, price, variant, CTA, then the summary copy. */
export function ProductInfo({ product, detail, className }: ProductInfoProps) {
  const saving = product.originalPrice ? product.originalPrice - product.price : 0;

  return (
    <div className={className}>
      <div className="flex flex-wrap gap-2">
        {detail.tags.map((tag) => (
          <Chip key={tag} tone="accent">
            {tag}
          </Chip>
        ))}
      </div>

      <h1 className="mt-4 text-h3 text-ink-900 sm:text-h2 lg:text-h1">{product.name}</h1>

      <p className="mt-2 text-sm text-neutral-500">SKU {detail.sku}</p>

      {typeof product.rating === "number" ? (
        <a
          href="#reviews"
          className="mt-3 inline-flex items-center gap-2 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2"
        >
          <StarRating value={product.rating} />
          <span className="text-sm text-neutral-500">
            {product.rating.toFixed(1)}
            {typeof product.reviewCount === "number"
              ? ` · ${formatCount(product.reviewCount)} reviews`
              : null}
          </span>
        </a>
      ) : null}

      <div className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-y border-neutral-200 py-5">
        <p className="text-h2 text-ink-900">{formatPrice(product.price)}</p>
        {product.originalPrice ? (
          <>
            <p className="text-body-lg text-neutral-400 line-through">
              {formatPrice(product.originalPrice)}
            </p>
            <p className="text-sm font-semibold text-accent-600">
              Save {formatPrice(saving)}
            </p>
          </>
        ) : null}
      </div>

      <VariantPicker group={detail.variants} className="mt-6" />

      <div className="mt-6 flex items-center gap-3">
        <Button size="lg" className="flex-1 sm:flex-none sm:px-10">
          Where to Buy
        </Button>
        <button
          type="button"
          aria-label={`Add ${product.name} to wishlist`}
          className={cn(
            "grid size-13 shrink-0 place-items-center rounded-md border border-neutral-200 bg-white text-neutral-500",
            "transition-colors dur-base ease-out hover:border-neutral-300 hover:text-accent-600",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2",
          )}
        >
          <HeartIcon className="size-5" />
        </button>
      </div>

      <p className="mt-6 text-body text-neutral-600">{detail.description}</p>

      <ul className="mt-6 space-y-2.5">
        {detail.highlights.map((highlight) => (
          <li key={highlight} className="flex gap-2.5 text-body text-neutral-700">
            <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent-500" />
            {highlight}
          </li>
        ))}
      </ul>
    </div>
  );
}
