import { energyLanes, type LaneTone } from "@/lib/data/energy";
import { cn } from "@/lib/utils/cn";

const upgraded = energyLanes.reduce((total, lane) => total + lane.share, 0);

/** The lane tones as chart fills. Each lane keeps this colour on its upgrade
 *  card too, so the split and the cards read as one set. */
const tones: Record<LaneTone | "other", string> = {
  cool: "bg-info",
  eco: "bg-eco-500",
  ink: "bg-ink-500",
  other: "bg-neutral-300",
};

const segments = [
  ...energyLanes.map((lane) => ({
    id: lane.id,
    label: lane.label,
    share: lane.share,
    tone: lane.tone as LaneTone | "other",
  })),
  { id: "other", label: "Everything else", share: Math.max(0, 1 - upgraded), tone: "other" as const },
];

/**
 * Where a household's units usually go, and how much of that the three upgrades
 * reach. Static — it describes a typical split, not the number in the field, so
 * the heading and the note under it both say estimate rather than reading as a
 * measurement of this household.
 */
export function UsageSplit() {
  return (
    <div>
      <p className="text-xs uppercase text-neutral-500">Where power usually goes</p>

      <div aria-hidden className="usage-split mt-3 h-2.5">
        {segments.map((segment) => (
          <span key={segment.id} className={tones[segment.tone]} />
        ))}
      </div>

      <ul className="mt-3 flex list-none flex-wrap gap-x-4 gap-y-1.5">
        {segments.map((segment) => (
          <li key={segment.id} className="flex items-center gap-1.5 text-sm text-neutral-600">
            <span className={cn("size-2 shrink-0 rounded-full", tones[segment.tone])} />
            {segment.label}
            <span className="text-neutral-400">{Math.round(segment.share * 100)}%</span>
          </li>
        ))}
      </ul>

      <p className="mt-3 text-sm text-neutral-400">
        A typical household average. Your own split depends on what you run and how
        often.
      </p>
    </div>
  );
}
