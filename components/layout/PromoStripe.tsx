"use client";

import { useState } from "react";
import { CloseIcon } from "@/components/icons";
import { promoMessages } from "@/lib/data/content";
import { cn } from "@/lib/utils/cn";

/**
 * Four copies of the message list ride in one track, translated -25% on loop —
 * enough width to cover any viewport, so the seam never shows.
 */
const REPEATS = 4;

export function PromoStripe() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="relative h-9 overflow-hidden bg-ink-900">
      <div className="marquee-mask h-full overflow-hidden">
        <div className="marquee-hold flex h-full w-max animate-marquee items-center will-change-transform">
          {Array.from({ length: REPEATS }, (_, copy) => (
            <div
              key={copy}
              aria-hidden={copy > 0}
              className="flex h-full shrink-0 items-center"
            >
              {promoMessages.map((message) => (
                <div key={message} className="flex shrink-0 items-center">
                  <span className="whitespace-nowrap px-6 text-xs uppercase text-white">
                    {message}
                  </span>
                  <span aria-hidden className="size-1 rounded-full bg-white/60" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label="Dismiss announcement"
        className={cn(
          "absolute inset-y-0 right-2 grid w-8 place-items-center text-white/80 transition-colors dur-fast ease-out hover:text-white",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
        )}
      >
        <CloseIcon className="size-4" />
      </button>
    </div>
  );
}
