import Image from "next/image";
import Link from "next/link";
import { ProductImageMark } from "@/components/product/ProductImageMark";
import type { LaneTone } from "@/lib/data/energy";
import { cn } from "@/lib/utils/cn";
import type { LaneForecast } from "@/lib/utils/forecastSavings";
import { formatPrice } from "@/lib/utils/formatPrice";
import { productHref } from "@/lib/utils/productHref";

/** The lane's tone as a chip fill — same colour it holds in the load split. */
const chips: Record<LaneTone, string> = {
  cool: "bg-info",
  eco: "bg-eco-600",
  ink: "bg-ink-900",
};

export interface EnergyUpgradeCardProps {
  lane: LaneForecast;
}

/**
 * One upgrade behind the forecast. Not a ProductCard — it leads with the energy
 * the lane gives back rather than with the offer, and the eco ramp is confined
 * to that one chip. Card and image tile share one background; hover only zooms
 * the image, matching the canonical card (§5).
 */
export function EnergyUpgradeCard({ lane }: EnergyUpgradeCardProps) {
  const { product } = lane;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-eco bg-neutral-100">
      <div className="relative aspect-card overflow-hidden bg-neutral-100">
        {/* Top-left is already the energy chip here, so the mark moves right. */}
        <ProductImageMark className="left-auto right-2" />

        <span
          className={cn(
            "absolute left-2 top-2 z-10 inline-flex items-center rounded-control px-2.5 py-1 text-xs text-white",
            chips[lane.tone],
          )}
        >
          {Math.round(lane.saving * 100)}% less energy
        </span>

        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 20vw, (min-width: 640px) 30vw, 80vw"
          className="p-tile-deal object-contain transition-transform dur-slow ease-out group-hover:scale-104"
        />
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-3">
        <p className="text-xs uppercase text-neutral-500">{lane.label}</p>

        <h4 className="line-clamp-2 flex-1 text-body font-medium text-ink-900">
          <Link
            href={productHref(product)}
            className="rounded-eco after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-eco-500 focus-visible:ring-offset-2"
          >
            {product.name}
          </Link>
        </h4>

        <p className="text-price text-ink-900">{formatPrice(product.price)}</p>
      </div>
    </article>
  );
}
