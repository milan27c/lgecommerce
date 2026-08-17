"use client";

import { useEffect, useRef, useState } from "react";

export interface CountUpProps {
  value: number;
  /** How the number renders — formatPrice, a unit suffix, a bare integer. */
  format: (value: number) => string;
  /**
   * Change this to roll the number up again. While it stays the same, a new
   * `value` lands instantly — a figure tracking a dragged slider has to keep
   * up with the drag, not chase it.
   */
  run?: number;
  className?: string;
}

const DURATION = 600;

function reducedMotion() {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Eases the roll out so it lands softly rather than stopping dead. */
function easeOut(t: number) {
  return 1 - (1 - t) ** 3;
}

export function CountUp({ value, format, run = 0, className }: CountUpProps) {
  const [display, setDisplay] = useState(() => (reducedMotion() ? value : 0));
  /** Mirrors `display` so a roll can start from wherever the last one stopped. */
  const displayRef = useRef(display);
  const runRef = useRef<number | null>(null);

  useEffect(() => {
    const show = (next: number) => {
      displayRef.current = next;
      setDisplay(next);
    };

    const rolling = runRef.current !== run;
    runRef.current = run;

    if (!rolling || reducedMotion()) {
      show(value);
      return;
    }

    const from = displayRef.current;
    const start = performance.now();
    let frame = requestAnimationFrame(function step(now: number) {
      const t = Math.min(1, (now - start) / DURATION);
      show(from + (value - from) * easeOut(t));
      if (t < 1) frame = requestAnimationFrame(step);
    });

    return () => cancelAnimationFrame(frame);
  }, [value, run]);

  return (
    <span className={className}>{format(display)}</span>
  );
}
