"use client";

import { useEffect, useMemo, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { EnergyForecast, type ForecastStatus } from "@/components/home/EnergyForecast";
import { UsageSplit } from "@/components/home/UsageSplit";
import { ArrowRightIcon, BoltIcon, LeafIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { usageRange } from "@/lib/data/energy";
import { cn } from "@/lib/utils/cn";
import { forecastSavings } from "@/lib/utils/forecastSavings";

const { min, max, step, initial } = usageRange;

/** How long the match runs for before the forecast lands. */
const SEARCH_MS = 1800;

const clamp = (value: number) => Math.min(max, Math.max(min, value));

function reducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Household savings forecast. The band sits on a deep teal-to-green night
 * ground with blurred orbs drifting and swelling over it, and the white
 * forecast card lifts out of the middle of it. Green marks the section itself —
 * eyebrows, the CTA, the lower bill — while the load split and the upgrade
 * chips run a mixed set (blue, green, ink) so the card never reads as one flat
 * wall of green. The usage scale runs green to red, so where the thumb sits
 * says something before any number does.
 *
 * Background is a set of heavily blurred orbs on transform + opacity. No
 * background-position is animated anywhere here, so this band costs nothing
 * against the promo stripe's animated-gradient budget.
 */
export function EnergySavings() {
  const [usage, setUsage] = useState<number>(initial);
  const [draft, setDraft] = useState(String(initial));
  /** Bumped on every completed search — the figures roll up again, but only then. */
  const [run, setRun] = useState(0);
  const [status, setStatus] = useState<ForecastStatus>("idle");
  const searchTimer = useRef<number | null>(null);

  const forecast = useMemo(() => forecastSavings(usage), [usage]);
  /** Floored, not 0 — the gradient inside the fill counter-scales by 1/fill, and
      the floor keeps that factor sane at the bottom of the range. The sliver it
      leaves at `min` sits under the thumb. */
  const fill = Math.max(0.02, (usage - min) / (max - min));
  /** The thumb picks up the stretch of scale it is standing on. */
  const thumbTone = fill < 0.34 ? "text-eco-600" : fill < 0.67 ? "text-warning" : "text-sale";

  useEffect(
    () => () => {
      if (searchTimer.current) window.clearTimeout(searchTimer.current);
    },
    [],
  );

  const commit = (value: number) => {
    const next = clamp(value);
    setUsage(next);
    setDraft(String(next));
  };

  const onType = (event: ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    setDraft(text);
    const parsed = Number.parseInt(text, 10);
    if (Number.isFinite(parsed) && parsed >= min && parsed <= max) setUsage(parsed);
  };

  /** An out-of-range or half-typed number snaps back to what the slider shows. */
  const onBlur = () => setDraft(String(usage));

  const settle = () => {
    setStatus("ready");
    setRun((value) => value + 1);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    commit(Number.parseInt(draft, 10) || usage);

    if (searchTimer.current) window.clearTimeout(searchTimer.current);

    /* Nobody who has asked for less motion should be made to sit through a
       staged search — they get the forecast on the spot. */
    if (reducedMotion()) {
      settle();
      return;
    }

    setStatus("searching");
    searchTimer.current = window.setTimeout(settle, SEARCH_MS);
  };

  const searching = status === "searching";

  return (
    <section
      aria-labelledby="energy-savings-heading"
      className="section-y relative isolate overflow-hidden bg-eco-night"
    >
      {/* The ground is repeated on this layer rather than left to the section,
          so the orbs above it screen against it inside one stacking context. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-eco-night">
        <span className="eco-orb animate-eco-drift-a absolute -left-32 -top-40 size-120 bg-teal-500 mix-blend-screen" />
        <span className="eco-orb animate-eco-breathe-a absolute -right-40 top-0 size-120 bg-eco-500 mix-blend-screen" />
        <span className="eco-orb animate-eco-drift-b absolute -bottom-40 left-1/4 size-104 bg-teal-400 mix-blend-screen" />
        <span className="eco-orb-sm animate-eco-drift-c absolute -bottom-24 right-1/5 size-80 bg-eco-400 mix-blend-screen" />
        <span className="eco-orb-sm animate-eco-breathe-b absolute left-1/2 top-1/3 size-72 bg-teal-300 mix-blend-screen" />

        <LeafIcon className="eco-mote eco-mote-a absolute bottom-24 left-8 size-5 lg:left-24" />
        <LeafIcon className="eco-mote eco-mote-b absolute bottom-16 left-1/3 size-4" />
        <LeafIcon className="eco-mote eco-mote-c absolute bottom-32 right-1/4 size-4" />
        <LeafIcon className="eco-mote eco-mote-d absolute bottom-20 right-10 size-5 lg:right-28" />

        <span className="absolute inset-0 bg-eco-vignette" />
      </div>

      <Container>
        <SectionHeading
          id="energy-savings-heading"
          eyebrow="Energy savings"
          title="See what LG efficiency saves you"
          copy="Tell us roughly what you use in a month and we will forecast what moving to the low energy LG lineup does to the bill."
          align="center"
          tone="eco-dark"
        />

        <Reveal className="overflow-hidden rounded-2xl border border-white/12 bg-white shadow-lg">
          <div className="grid lg:grid-cols-5">
            <form
              onSubmit={onSubmit}
              className="border-b border-neutral-200 p-6 sm:p-8 lg:col-span-2 lg:border-b-0 lg:border-r"
            >
              <p className="flex items-center gap-2 text-xs uppercase text-eco-700">
                <BoltIcon className="size-4" />
                Your household
              </p>

              <h3 className="mt-2 text-h3 text-ink-900">
                <label htmlFor="energy-usage">Average monthly electricity usage</label>
              </h3>

              <div className="mt-6 flex items-center gap-3">
                <input
                  id="energy-usage"
                  name="usage"
                  type="number"
                  inputMode="numeric"
                  min={min}
                  max={max}
                  step={1}
                  value={draft}
                  onChange={onType}
                  onBlur={onBlur}
                  className={cn(
                    "h-14 w-32 rounded-md border border-neutral-200 bg-neutral-50 px-4 text-h3 tabular-nums text-ink-900",
                    "dur-base ease-out transition-colors hover:border-neutral-300",
                    "focus:border-eco-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-eco-500 focus-visible:ring-offset-2",
                  )}
                />
                <span className="text-body text-neutral-600">kWh / month</span>
              </div>

              <div className="relative mt-6 flex h-6 items-center">
                <span
                  aria-hidden
                  className="absolute inset-x-0 h-1.5 overflow-hidden rounded-full bg-neutral-200"
                >
                  {/* Dynamic transform rather than a width, so the fill never
                      animates a geometric property. The inner span counter-
                      scales, holding the gradient at full track width — so a
                      given usage always sits on the same colour instead of the
                      scale squashing into whatever is filled. */}
                  <span
                    className="block h-full w-full origin-left overflow-hidden"
                    style={{ transform: `scaleX(${fill})` }}
                  >
                    <span
                      className="block h-full w-full origin-left bg-usage-scale"
                      style={{ transform: `scaleX(${1 / fill})` }}
                    />
                  </span>
                </span>
                <input
                  type="range"
                  min={min}
                  max={max}
                  step={step}
                  value={usage}
                  onChange={(event) => commit(Number(event.target.value))}
                  aria-label="Average monthly electricity usage"
                  aria-valuetext={`${usage} kilowatt hours a month`}
                  className={cn("range-usage relative", thumbTone)}
                />
              </div>

              <div className="mt-2 flex justify-between text-sm text-neutral-400">
                <span>{min} kWh</span>
                <span>{max} kWh</span>
              </div>

              <p className="mt-6 text-body text-neutral-500">
                A typical home runs about 150 kWh a month. Take the number off a recent
                bill, or drag to estimate.
              </p>

              <div className="mt-7 border-t border-neutral-200 pt-6">
                <UsageSplit />
              </div>

              <Button
                type="submit"
                variant="eco"
                size="lg"
                disabled={searching}
                className="mt-7 w-full sm:w-auto"
              >
                {searching ? "Matching products" : "Forecast my savings"}
                <ArrowRightIcon className="size-4" />
              </Button>
            </form>

            <div className="flex flex-col p-6 sm:p-8 lg:col-span-3">
              <EnergyForecast
                forecast={status === "ready" ? forecast : null}
                run={run}
                status={status}
                searchDuration={SEARCH_MS}
                usage={usage}
              />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
