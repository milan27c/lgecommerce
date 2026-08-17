"use client";

import { priceBounds, pricePresets } from "@/lib/data/catalog";
import { cn } from "@/lib/utils/cn";

export interface PriceFilterProps {
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

const { min: MIN, max: MAX, step: STEP } = priceBounds;

const percentOf = (value: number) => ((value - MIN) / (MAX - MIN)) * 100;

/**
 * Two range inputs stacked on one track. The fill is positioned with a dynamic
 * transform so no geometry property is ever animated or written inline.
 */
export function PriceFilter({ value, onChange }: PriceFilterProps) {
  const [low, high] = value;
  const lowPercent = percentOf(low);
  const highPercent = percentOf(high);

  const setLow = (next: number) => onChange([Math.min(next, high - STEP), high]);
  const setHigh = (next: number) => onChange([low, Math.max(next, low + STEP)]);

  const isPreset = (range: [number, number]) => low === range[0] && high === range[1];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <p className="flex-1 rounded-md border border-neutral-200 bg-white px-3 py-2 text-right text-sm tabular-nums text-ink-900">
          <span className="sr-only">Minimum price </span>
          {low.toLocaleString("en-US")}
        </p>
        <span aria-hidden className="text-sm text-neutral-400">
          —
        </span>
        <p className="flex-1 rounded-md border border-neutral-200 bg-white px-3 py-2 text-right text-sm tabular-nums text-ink-900">
          <span className="sr-only">Maximum price </span>
          {high.toLocaleString("en-US")}
        </p>
      </div>

      {/* Track sits inset by half a thumb so its ends line up with thumb centres. */}
      <div className="relative h-5">
        <span
          aria-hidden
          className="absolute inset-x-2 top-1/2 h-1 -translate-y-1/2 rounded-full bg-neutral-200"
        />
        <span
          aria-hidden
          className="absolute inset-x-2 top-1/2 h-1 origin-left rounded-full bg-accent-500"
          style={{
            transform: `translateY(-50%) translateX(${lowPercent}%) scaleX(${
              (highPercent - lowPercent) / 100
            })`,
          }}
        />

        <input
          type="range"
          min={MIN}
          max={MAX}
          step={STEP}
          value={low}
          onChange={(event) => setLow(Number(event.target.value))}
          aria-label="Minimum price"
          className={cn("range-input absolute inset-x-0 top-0", lowPercent > 55 ? "z-20" : "z-10")}
        />
        <input
          type="range"
          min={MIN}
          max={MAX}
          step={STEP}
          value={high}
          onChange={(event) => setHigh(Number(event.target.value))}
          aria-label="Maximum price"
          className="range-input absolute inset-x-0 top-0 z-10"
        />
      </div>

      <ul className="flex list-none flex-wrap gap-1.5">
        {pricePresets.map((preset) => {
          const active = isPreset(preset.range);
          return (
            <li key={preset.id}>
              <button
                type="button"
                aria-pressed={active}
                onClick={() => onChange(active ? [MIN, MAX] : preset.range)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-sm transition-colors dur-fast ease-out",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2",
                  active
                    ? "border-accent-500 bg-accent-50 text-accent-700"
                    : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 hover:text-ink-900",
                )}
              >
                {preset.label}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
