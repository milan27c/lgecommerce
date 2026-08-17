import { StarRating } from "@/components/product/StarRating";
import { formatCount } from "@/lib/utils/formatCount";
import { cn } from "@/lib/utils/cn";

export interface ReviewSummaryProps {
  rating: number;
  count: number;
  /** Share of reviewers who would recommend the product. */
  recommend: number;
  className?: string;
}

export function ReviewSummary({ rating, count, recommend, className }: ReviewSummaryProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-5 gap-y-3 rounded-none border border-neutral-200 bg-white p-5 sm:p-6",
        className,
      )}
    >
      <p className="text-h1 text-ink-900">{rating.toFixed(1)}</p>
      <div>
        <StarRating value={rating} />
        <p className="mt-1 text-sm text-neutral-500">{formatCount(count)} reviews</p>
      </div>
      <p className="w-full text-sm text-neutral-500 sm:ml-auto sm:w-auto">
        {recommend}% of reviewers recommend this product
      </p>
    </div>
  );
}
