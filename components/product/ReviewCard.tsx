import { StarRating } from "@/components/product/StarRating";
import type { ProductReview } from "@/lib/data/productDetail";
import { cn } from "@/lib/utils/cn";

export interface ReviewCardProps {
  review: ProductReview;
  className?: string;
}

export function ReviewCard({ review, className }: ReviewCardProps) {
  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-lg border border-neutral-200 bg-white p-5 sm:p-6",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <p className="text-body font-medium text-ink-900">{review.author}</p>
        <p className="text-sm text-neutral-400">{review.date}</p>
      </div>
      <StarRating value={review.rating} className="mt-1.5" />
      <p className="sr-only">{review.rating} out of 5 stars</p>
      <p className="mt-3 text-body text-neutral-600">{review.body}</p>
    </article>
  );
}
