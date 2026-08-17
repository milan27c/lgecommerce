import { cn } from "@/lib/utils/cn";

export interface SkeletonProps {
  className?: string;
}

/** Shimmer placeholder — never a spinner. Match the real element's box exactly. */
export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      aria-hidden
      className={cn("relative overflow-hidden rounded-none bg-neutral-100", className)}
    >
      <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white to-transparent" />
    </div>
  );
}
