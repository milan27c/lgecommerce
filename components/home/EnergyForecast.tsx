import { EnergyUpgradeCard } from "@/components/home/EnergyUpgradeCard";
import { ForecastSearching } from "@/components/home/ForecastSearching";
import { GaugeIcon, LeafIcon, TrendDownIcon } from "@/components/icons";
import { CountUp } from "@/components/ui/CountUp";
import type { Forecast } from "@/lib/utils/forecastSavings";
import { formatPrice } from "@/lib/utils/formatPrice";

export type ForecastStatus = "idle" | "searching" | "ready";

export interface EnergyForecastProps {
  /** `null` until the first forecast is run. */
  forecast: Forecast | null;
  /** Bumped on each submit — rolls every figure up again. */
  run: number;
  status: ForecastStatus;
  /** How long the search runs for, in ms — the placeholder paces itself to it. */
  searchDuration: number;
  /** Usage the search is running against. */
  usage: number;
}

const whole = (value: number) => String(Math.round(value));
const units = (value: number) => `${Math.round(value)} kWh`;

export function EnergyForecast({
  forecast,
  run,
  status,
  searchDuration,
  usage,
}: EnergyForecastProps) {
  if (status === "searching") {
    return <ForecastSearching duration={searchDuration} usage={usage} />;
  }

  if (!forecast) {
    return (
      <div className="flex min-h-90 flex-1 flex-col items-center justify-center rounded-none border border-dashed border-neutral-300 bg-neutral-50 px-6 py-14 text-center">
        <span className="relative grid size-14 place-items-center rounded-full bg-white text-accent-600 shadow-sm">
          <span
            aria-hidden
            className="absolute inset-0 animate-soft-pulse rounded-full bg-accent-200"
          />
          <GaugeIcon className="relative size-6" />
        </span>
        <p className="mt-5 max-w-xs text-body text-neutral-600">
          Set your usage and forecast your savings to see a bill comparison and the
          low energy LG upgrades behind it.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-none border border-neutral-200 bg-neutral-50 p-5">
          <p className="text-xs uppercase text-neutral-500">Your bill today</p>
          <p className="mt-2 text-h3 text-ink-900 sm:text-h2">
            <CountUp value={forecast.billNow} format={formatPrice} run={run} />
          </p>
          <p className="mt-1 text-sm text-neutral-500">
            At <CountUp value={forecast.usage} format={units} run={run} /> a month
          </p>
        </div>

        {/* The one tile that earns the eco ramp — it is the lower bill. */}
        <div className="rounded-none border border-eco-200 bg-eco-50 p-5">
          <p className="text-xs uppercase text-eco-700">With low energy LG</p>
          <p className="mt-2 text-h3 text-eco-900 sm:text-h2">
            <CountUp value={forecast.billAfter} format={formatPrice} run={run} />
          </p>
          <p className="mt-1 text-sm text-eco-700">
            About <CountUp value={forecast.reducedUsage} format={units} run={run} /> a month
          </p>
        </div>
      </div>

      <p
        role="status"
        className="flex items-start gap-3 rounded-none bg-ink-900 px-5 py-4 text-body text-ink-100 sm:items-center"
      >
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-eco-600 text-white">
          <TrendDownIcon className="size-4" />
        </span>
        <span>
          Forecast to save{" "}
          <strong className="font-semibold text-white">
            <CountUp value={forecast.monthlySaving} format={formatPrice} run={run} />
          </strong>{" "}
          a month — about{" "}
          <strong className="font-semibold text-eco-300">
            <CountUp value={forecast.percentSaved} format={whole} run={run} />%
          </strong>{" "}
          less than today, or{" "}
          <strong className="font-semibold text-white">
            <CountUp value={forecast.yearlySaving} format={formatPrice} run={run} />
          </strong>{" "}
          over a year.
        </span>
      </p>

      <div className="mt-1">
        <p className="flex items-center gap-2 text-xs uppercase text-neutral-500">
          <LeafIcon className="size-4 text-eco-600" />
          Low energy upgrades behind this forecast
        </p>

        <ul className="mt-3 grid list-none gap-3 sm:grid-cols-3">
          {forecast.lanes.map((lane) => (
            <li key={lane.id} className="flex">
              <EnergyUpgradeCard lane={lane} />
            </li>
          ))}
        </ul>
      </div>

      <p className="text-sm text-neutral-500">
        Estimate only. Based on typical household usage, a tiered domestic tariff and
        the average efficiency gain of each LG category. Your bill depends on your
        home, your habits and your tariff.
      </p>
    </div>
  );
}
