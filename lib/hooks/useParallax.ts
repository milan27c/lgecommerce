"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Background-only parallax. Total travel is capped at `distance` (max 40px per
 * CLAUDE.md §4.5) and driven by a throttled rAF scroll handler.
 */
export function useParallax<T extends HTMLElement>(distance = 40) {
  const ref = useRef<T>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const travel = Math.min(distance, 40);
    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      if (rect.bottom < 0 || rect.top > viewport) return;

      // -1 (element below the fold) → 1 (element above it)
      const progress = 1 - (rect.top + rect.height / 2) / (viewport / 2 + rect.height / 2);
      setOffset(Math.max(-1, Math.min(1, progress)) * (travel / 2));
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [distance]);

  return { ref, offset };
}
