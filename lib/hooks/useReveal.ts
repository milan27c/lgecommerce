"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fires once at 15% visibility. Elements never re-hide on scroll up.
 *
 * Under `prefers-reduced-motion: reduce` the observer is never attached — the
 * media query in `globals.css` renders `[data-reveal]` visible immediately.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || shown) return;
    if (typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [shown]);

  return { ref, shown };
}
