"use client";

import { useCountdown } from "@/lib/hooks/useCountdown";
import { cn } from "@/lib/utils/cn";

export interface CountdownTimerProps {
  endsAt: string;
  className?: string;
}

/* Glass, not solid ink — the deals band behind it is a lit gradient.
   Rounded corners are a deal-band-only exception (--radius-deal, see
   globals.css) to match the rest of this section's Apple-style treatment. */
const boxClass =
  "grid min-w-14 place-items-center rounded-deal border border-white/15 bg-white/10 px-3 py-2 text-center backdrop-blur-sm";

/** Only the seconds box re-renders each tick, so the row doesn't jitter. */
export function CountdownTimer({ endsAt, className }: CountdownTimerProps) {
  const { days, hours, minutes, seconds, ready } = useCountdown(endsAt);

  const units = [
    { label: "Days", value: days },
    { label: "Hours", value: hours },
    { label: "Mins", value: minutes },
    { label: "Secs", value: seconds },
  ];

  return (
    <div
      className={cn("flex items-center gap-2 sm:gap-3", className)}
      role="timer"
      aria-label="Time remaining on these offers"
    >
      {units.map((unit) => (
        <div key={unit.label} className={boxClass}>
          <span className="text-h3 font-bold tabular-nums text-white">
            {ready ? unit.value : "--"}
          </span>
          <span className="text-xs uppercase text-ink-200">{unit.label}</span>
        </div>
      ))}
    </div>
  );
}
