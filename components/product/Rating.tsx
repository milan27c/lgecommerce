import { StarIcon } from "@/components/icons";
import { cn } from "@/lib/utils/cn";

export interface RatingProps {
  value: number;
  className?: string;
}

export function Rating({ value, className }: RatingProps) {
  return (
    <p className={cn("flex items-center gap-1 text-sm text-neutral-500", className)}>
      <StarIcon className="size-4 text-star" />
      <span className="font-medium text-ink-900">{value.toFixed(1)}</span>
    </p>
  );
}
