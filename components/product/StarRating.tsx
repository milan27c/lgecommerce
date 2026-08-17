import { StarIcon } from "@/components/icons";
import { cn } from "@/lib/utils/cn";

export interface StarRatingProps {
  value: number;
  className?: string;
}

const STARS = [1, 2, 3, 4, 5];

/** Five stars, rounded to the nearest whole. The numeric value sits beside it. */
export function StarRating({ value, className }: StarRatingProps) {
  const filled = Math.round(value);

  return (
    <span className={cn("inline-flex items-center gap-0.5", className)} aria-hidden>
      {STARS.map((star) => (
        <StarIcon
          key={star}
          className={cn("size-4", star <= filled ? "text-star" : "text-neutral-300")}
        />
      ))}
    </span>
  );
}
