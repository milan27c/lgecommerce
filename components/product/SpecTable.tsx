import type { ProductSpec } from "@/lib/data/types";
import { cn } from "@/lib/utils/cn";

export interface SpecTableProps {
  specs: ProductSpec[];
  className?: string;
}

export function SpecTable({ specs, className }: SpecTableProps) {
  return (
    <dl
      className={cn(
        "divide-y divide-neutral-200 overflow-hidden rounded-lg border border-neutral-200 bg-white",
        className,
      )}
    >
      {specs.map((spec) => (
        <div
          key={spec.label}
          className="flex items-baseline justify-between gap-4 px-4 py-4 sm:px-5"
        >
          <dt className="text-sm text-neutral-500">{spec.label}</dt>
          <dd className="text-right text-sm font-medium text-ink-900">{spec.value}</dd>
        </div>
      ))}
    </dl>
  );
}
