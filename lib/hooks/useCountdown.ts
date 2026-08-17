"use client";

import { useSyncExternalStore } from "react";

export interface Countdown {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  /** False on the server and during hydration, so both renders agree. */
  ready: boolean;
}

const ROLL_FORWARD_MS = 48 * 60 * 60 * 1000;
const NOT_READY = 0;

const IDLE: Countdown = {
  days: "00",
  hours: "00",
  minutes: "00",
  seconds: "00",
  ready: false,
};

function pad(value: number): string {
  return value.toString().padStart(2, "0");
}

/** One shared second-resolution clock, so the snapshot stays referentially stable. */
let currentSecond = NOT_READY;

function subscribe(onStoreChange: () => void) {
  const id = window.setInterval(onStoreChange, 1000);
  return () => window.clearInterval(id);
}

function getSnapshot(): number {
  const second = Math.floor(Date.now() / 1000);
  if (second !== currentSecond) currentSecond = second;
  return currentSecond;
}

function remaining(targetIso: string, now: number): Countdown {
  let target = new Date(targetIso).getTime();
  if (Number.isNaN(target)) return { ...IDLE, ready: true };

  // The prototype never shows a dead timer — roll forward in 48h steps.
  if (target <= now) {
    target += Math.ceil((now - target) / ROLL_FORWARD_MS) * ROLL_FORWARD_MS;
  }

  const totalSeconds = Math.floor(Math.max(0, target - now) / 1000);

  return {
    days: pad(Math.floor(totalSeconds / 86400)),
    hours: pad(Math.floor((totalSeconds % 86400) / 3600)),
    minutes: pad(Math.floor((totalSeconds % 3600) / 60)),
    seconds: pad(totalSeconds % 60),
    ready: true,
  };
}

export function useCountdown(targetIso: string): Countdown {
  const second = useSyncExternalStore(subscribe, getSnapshot, () => NOT_READY);
  return second === NOT_READY ? IDLE : remaining(targetIso, second * 1000);
}
