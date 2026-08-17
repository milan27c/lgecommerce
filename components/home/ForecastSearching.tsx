"use client";

import { useEffect, useState } from "react";
import { CheckIcon, SearchIcon } from "@/components/icons";
import { Skeleton } from "@/components/ui/Skeleton";
import { cn } from "@/lib/utils/cn";

export interface ForecastSearchingProps {
  /** Total time the search runs for, in ms. Steps divide it evenly. */
  duration: number;
  /** The usage the search is running against — read back in the status line. */
  usage: number;
}

const steps = [
  "Reading your monthly usage",
  "Matching low energy LG models",
  "Costing the switch",
];

/**
 * The gap between submitting and seeing a forecast. Skeletons hold the exact
 * boxes the real forecast lands in — two bill tiles, the saving line, three
 * upgrade cards — so nothing shifts when the numbers arrive. A sweeping beam
 * and a stepped checklist carry the wait; there is no spinner.
 */
export function ForecastSearching({ duration, usage }: ForecastSearchingProps) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const gap = duration / steps.length;
    const timers = steps
      .slice(1)
      .map((_, index) => window.setTimeout(() => setStep(index + 1), gap * (index + 1)));
    return () => timers.forEach(window.clearTimeout);
  }, [duration]);

  return (
    <div className="relative flex flex-col gap-4 overflow-hidden">
      {/* Search beam. A quarter of the panel tall and travelling in its own
          units, so it crosses the whole placeholder at any height. */}
      <span
        aria-hidden
        className="animate-scan-sweep pointer-events-none absolute inset-x-0 top-0 z-10 h-1/4 bg-gradient-to-b from-transparent via-accent-100 to-transparent mix-blend-multiply"
      />

      <div className="flex items-start gap-3 rounded-none border border-neutral-200 bg-white p-5">
        <span className="relative grid size-9 shrink-0 place-items-center rounded-full bg-accent-50 text-accent-600">
          <span
            aria-hidden
            className="absolute inset-0 animate-soft-pulse rounded-full bg-accent-200"
          />
          <SearchIcon className="relative size-4" />
        </span>

        <div className="min-w-0 flex-1">
          <p role="status" className="text-body font-medium text-ink-900">
            Finding your matches at {usage} kWh a month
          </p>

          <ul className="mt-2 flex list-none flex-col gap-1">
            {steps.map((label, index) => {
              const done = index < step;
              const active = index === step;
              return (
                <li
                  key={label}
                  className={cn(
                    "flex items-center gap-2 text-sm transition-opacity dur-base ease-out",
                    done && "text-neutral-500",
                    active && "text-ink-900",
                    !done && !active && "text-neutral-400 opacity-60",
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "grid size-4 shrink-0 place-items-center rounded-full border",
                      done
                        ? "border-eco-500 bg-eco-500 text-white"
                        : active
                          ? "border-accent-500 bg-accent-500 text-white"
                          : "border-neutral-300",
                    )}
                  >
                    {done ? <CheckIcon className="size-2.5" /> : null}
                  </span>
                  {label}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-none border border-neutral-200 bg-neutral-50 p-5">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="mt-3 h-8 w-40" />
          <Skeleton className="mt-3 h-3 w-32" />
        </div>
        <div className="rounded-none border border-neutral-200 bg-neutral-50 p-5">
          <Skeleton className="h-3 w-28" />
          <Skeleton className="mt-3 h-8 w-40" />
          <Skeleton className="mt-3 h-3 w-32" />
        </div>
      </div>

      {/* Dark tile — plain bars rather than Skeleton, whose shimmer is tuned for
          the light surfaces above. */}
      <div aria-hidden className="rounded-none bg-ink-900 px-5 py-4">
        <div className="flex items-center gap-3">
          <span className="size-8 shrink-0 rounded-full bg-ink-700" />
          <div className="flex-1">
            <span className="block h-3 w-full bg-ink-700" />
            <span className="mt-2 block h-3 w-2/3 bg-ink-700" />
          </div>
        </div>
      </div>

      <div className="mt-1">
        <Skeleton className="h-3 w-56" />

        <ul className="mt-3 grid list-none gap-3 sm:grid-cols-3">
          {steps.map((label, index) => (
            <li
              key={label}
              className={cn(
                "overflow-hidden rounded-none border border-neutral-200 bg-white transition-opacity dur-slow ease-out",
                index <= step ? "opacity-100" : "opacity-40",
              )}
            >
              {/* Same tile the real card uses, so the shot lands in place. */}
              <div aria-hidden className="relative aspect-card overflow-hidden bg-neutral-100">
                <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white to-transparent" />
              </div>
              <div className="flex flex-col gap-2 p-3">
                <Skeleton className="h-2.5 w-20" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-3/4" />
                <Skeleton className="mt-1 h-4 w-28" />
              </div>
            </li>
          ))}
        </ul>
      </div>

      <p className="text-sm text-neutral-500">
        Matching against the low energy LG lineup in Air Conditioners, Refrigerators
        and TVs.
      </p>
    </div>
  );
}
