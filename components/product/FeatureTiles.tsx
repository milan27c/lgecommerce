import { Reveal } from "@/components/ui/Reveal";
import type { FeatureTile } from "@/lib/data/productDetail";
import { cn } from "@/lib/utils/cn";

export interface FeatureTilesProps {
  tiles: FeatureTile[];
  /** `lg` sets the headline stat in h3; `sm` keeps it at body weight. */
  size?: "lg" | "sm";
  className?: string;
}

/**
 * Column count matches the tile count (clamped to the usual max per
 * breakpoint) so a row that doesn't fill out — e.g. 5 key features — spans
 * the full width evenly instead of leaving a dead gap on the right.
 */
const BASE_COLS = ["grid-cols-1", "grid-cols-1", "grid-cols-2"];
const SM_COLS = ["sm:grid-cols-1", "sm:grid-cols-1", "sm:grid-cols-2", "sm:grid-cols-3"];
const LG_COLS = [
  "lg:grid-cols-1",
  "lg:grid-cols-1",
  "lg:grid-cols-2",
  "lg:grid-cols-3",
  "lg:grid-cols-4",
  "lg:grid-cols-5",
  "lg:grid-cols-6",
];

export function FeatureTiles({ tiles, size = "lg", className }: FeatureTilesProps) {
  const count = tiles.length;

  return (
    <ul
      className={cn(
        "grid items-stretch gap-3 lg:gap-5",
        BASE_COLS[Math.min(count, 2)],
        SM_COLS[Math.min(count, 3)],
        LG_COLS[Math.min(count, 6)],
        className,
      )}
    >
      {tiles.map((tile, index) => (
        <Reveal key={tile.label} as="li" index={index} className="h-full">
          <div className="flex h-full flex-col justify-between rounded-lg border border-neutral-200 bg-white p-4 text-center">
            <p className="text-xs uppercase text-neutral-500">{tile.label}</p>
            <p
              className={cn(
                "my-3 text-ink-900",
                size === "lg" ? "text-h3" : "text-body font-semibold",
              )}
            >
              {tile.value}
            </p>
            <p className="text-sm text-neutral-500">{tile.note}</p>
          </div>
        </Reveal>
      ))}
    </ul>
  );
}
