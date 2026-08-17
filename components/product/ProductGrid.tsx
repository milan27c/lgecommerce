import { ProductCard } from "@/components/product/ProductCard";
import { Reveal } from "@/components/ui/Reveal";
import type { Product } from "@/lib/data/types";
import { cn } from "@/lib/utils/cn";

export interface ProductGridProps {
  products: Product[];
  /** Fade + rise each card in with a 60ms stagger. */
  reveal?: boolean;
  /** Set false to price every card at its current price only, with no offer row. */
  showOffer?: boolean;
  className?: string;
}

export function ProductGrid({
  products,
  reveal = true,
  showOffer = true,
  className,
}: ProductGridProps) {
  return (
    <ul
      className={cn(
        "grid list-none grid-cols-2 items-stretch gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5",
        className,
      )}
    >
      {products.map((product, index) =>
        reveal ? (
          <Reveal key={product.slug} as="li" index={index} className="h-full">
            <ProductCard product={product} showOffer={showOffer} />
          </Reveal>
        ) : (
          <li key={product.slug} className="h-full">
            <ProductCard product={product} showOffer={showOffer} />
          </li>
        ),
      )}
    </ul>
  );
}
