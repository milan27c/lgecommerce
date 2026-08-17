import type { ProductBadge } from "@/lib/data/types";
import { cn } from "@/lib/utils/cn";

export interface BadgeProps {
  variant: ProductBadge;
  className?: string;
}

const variants: Record<ProductBadge, string> = {
  Best: "border-accent-500 text-accent-500",
  New: "border-ink-900 text-ink-900",
  Sale: "border-sale text-sale",
  "Energy A+++": "border-eco text-eco",
};

/** 1px border, transparent fill, xs uppercase. */
export function Badge({ variant, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border bg-transparent px-2 py-0.5 text-xs uppercase",
        variants[variant],
        className,
      )}
    >
      {variant}
    </span>
  );
}
