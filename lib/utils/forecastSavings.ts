import { energyLaneProducts, tariff } from "@/lib/data/energy";
import type { EnergyLaneProduct } from "@/lib/data/energy";

export interface LaneForecast extends EnergyLaneProduct {
  /** Units this upgrade takes off the month, rounded to whole kWh. */
  kwhSaved: number;
}

export interface Forecast {
  usage: number;
  reducedUsage: number;
  billNow: number;
  billAfter: number;
  monthlySaving: number;
  yearlySaving: number;
  /** Percentage off the bill — derived from money, not from units. */
  percentSaved: number;
  lanes: LaneForecast[];
}

/** Monthly bill for a given consumption, walked up the tariff blocks. */
export function billFor(kwh: number): number {
  let remaining = Math.max(0, kwh);
  let floor = 0;
  let total = tariff.fixedCharge;

  for (const tier of tariff.tiers) {
    if (remaining <= 0) break;
    const span = tier.upTo === null ? remaining : tier.upTo - floor;
    const units = Math.min(remaining, span);
    total += units * tier.rate;
    remaining -= units;
    floor = tier.upTo ?? floor;
  }

  return Math.round(total);
}

/**
 * What the low-energy lineup does to a month's usage and bill.
 *
 * Per-lane savings are rounded first and the reduced usage is their sum, so the
 * headline figure always equals the three numbers printed on the cards.
 */
export function forecastSavings(usage: number): Forecast {
  const lanes: LaneForecast[] = energyLaneProducts.map((lane) => ({
    ...lane,
    kwhSaved: Math.round(usage * lane.share * lane.saving),
  }));

  const kwhSaved = lanes.reduce((total, lane) => total + lane.kwhSaved, 0);
  const reducedUsage = Math.max(0, usage - kwhSaved);
  const billNow = billFor(usage);
  const billAfter = billFor(reducedUsage);
  const monthlySaving = Math.max(0, billNow - billAfter);

  return {
    usage,
    reducedUsage,
    billNow,
    billAfter,
    monthlySaving,
    yearlySaving: monthlySaving * 12,
    percentSaved: billNow > 0 ? Math.round((monthlySaving / billNow) * 100) : 0,
    lanes,
  };
}
