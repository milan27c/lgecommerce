import Image from "next/image";
import { cn } from "@/lib/utils/cn";

export interface ProductImageMarkProps {
  className?: string;
}

/**
 * LG wordmark watermark for product image tiles — top-left, per §2 ("the LG
 * logo may be used freely — in the nav, on cards, in copy, in banners").
 * Shared by ProductCard, DealCard, EnergyUpgradeCard and ProductGallery so it
 * reads the same everywhere. Position it from the parent if the default
 * top-left corner is already taken.
 */
export function ProductImageMark({ className }: ProductImageMarkProps) {
  return (
    <Image
      src="/images/lgprimary.svg"
      alt=""
      width={225}
      height={99}
      className={cn("absolute left-2 top-2 z-10 h-4 w-auto opacity-90 sm:h-5", className)}
    />
  );
}
