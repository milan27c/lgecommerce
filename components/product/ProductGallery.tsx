"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils/cn";

export interface ProductGalleryProps {
  images: string[];
  name: string;
  className?: string;
}

/** Square hero tile plus a thumbnail strip. Only opacity changes on swap. */
export function ProductGallery({ images, name, className }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const shots = images.length > 0 ? images : [];

  return (
    <div className={className}>
      <div className="relative aspect-square overflow-hidden rounded-2xl border border-neutral-200 bg-white">
        {shots.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt={index === 0 ? name : `${name} — view ${index + 1}`}
            fill
            priority={index === 0}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className={cn(
              "p-tile object-contain transition-opacity dur-base ease-out",
              index === active ? "opacity-100" : "opacity-0",
            )}
          />
        ))}
      </div>

      {shots.length > 1 ? (
        <ul className="no-scrollbar -mx-1 mt-3 flex gap-3 overflow-x-auto p-1">
          {shots.map((src, index) => (
            <li key={src} className="shrink-0">
              <button
                type="button"
                onClick={() => setActive(index)}
                aria-label={`Show view ${index + 1} of ${shots.length}`}
                aria-pressed={index === active}
                className={cn(
                  "relative block size-20 overflow-hidden rounded-lg border bg-white",
                  "transition-[border-color,opacity] dur-base ease-out",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2",
                  index === active
                    ? "border-accent-500 opacity-100"
                    : "border-neutral-200 opacity-60 hover:border-neutral-300 hover:opacity-100",
                )}
              >
                <Image src={src} alt="" fill sizes="80px" className="object-contain p-2" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
