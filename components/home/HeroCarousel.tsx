"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";
import { heroBanners } from "@/lib/data/banners";
import { cn } from "@/lib/utils/cn";

const AUTOPLAY_MS = 6000;
const SWIPE_THRESHOLD = 48;

export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStart = useRef(0);

  const goTo = useCallback((next: number) => {
    setIndex((next + heroBanners.length) % heroBanners.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = window.setTimeout(() => goTo(index + 1), AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [index, paused, goTo]);

  const arrow =
    "grid size-10 place-items-center rounded-full border border-ink-900/10 bg-white/70 text-ink-900 backdrop-blur-sm transition-opacity dur-base ease-out hover:bg-white focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500";

  return (
    <>
      <div
        className="group relative aspect-hero-mobile overflow-hidden bg-neutral-100 md:aspect-hero"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        onTouchStart={(event) => {
          touchStart.current = event.touches[0].clientX;
        }}
        onTouchEnd={(event) => {
          const delta = event.changedTouches[0].clientX - touchStart.current;
          if (Math.abs(delta) > SWIPE_THRESHOLD) goTo(index + (delta < 0 ? 1 : -1));
        }}
        aria-roledescription="carousel"
        aria-label="Featured offers"
      >
        {heroBanners.map((banner, position) => {
          const active = position === index;
          return (
            <div
              key={banner.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${position + 1} of ${heroBanners.length}`}
              aria-hidden={!active}
              className={cn(
                "absolute inset-0 transition-opacity dur-hero ease-out",
                active ? "opacity-100" : "pointer-events-none opacity-0",
              )}
            >
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src={banner.image}
                  alt=""
                  fill
                  sizes="100vw"
                  loading={position === 0 ? "eager" : "lazy"}
                  className={cn(
                    "hidden object-cover md:block",
                    active && "animate-ken-burns",
                  )}
                />
                <Image
                  src={banner.mobileImage ?? banner.image}
                  alt=""
                  fill
                  sizes="100vw"
                  loading={position === 0 ? "eager" : "lazy"}
                  className={cn("object-cover md:hidden", active && "animate-ken-burns")}
                />
              </div>

              {/* Legibility scrim — the artwork is light, so the wash is white:
                  up from the base on mobile, in from the left on desktop. */}
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/45 to-transparent md:bg-gradient-to-r md:from-white/85 md:via-white/45"
              />

              <Container className="relative flex h-full items-end justify-center pb-16 text-center md:items-center md:justify-start md:pb-0 md:text-left">
                <div
                  className={cn(
                    "max-w-sm transition-transform dur-hero ease-out md:max-w-lg",
                    active
                      ? "translate-y-0 md:translate-x-0"
                      : "translate-y-4 md:translate-x-6 md:translate-y-0",
                  )}
                >
                  <h2 className="text-h3 font-semibold text-ink-900 sm:text-h2 lg:text-h1">
                    {banner.headline}
                  </h2>
                  <p className="mt-3 text-body text-ink-600 sm:text-body-lg">{banner.copy}</p>
                  <Button href={banner.cta.href} size="md" className="mt-5">
                    {banner.cta.label}
                  </Button>
                </div>
              </Container>
            </div>
          );
        })}

        {/* Arrows — always visible on touch, on hover for pointer devices */}
        <div className="pointer-events-none absolute inset-x-3 top-1/2 flex -translate-y-1/2 justify-between sm:inset-x-5 lg:inset-x-8">
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label="Previous slide"
            className={cn(arrow, "pointer-events-auto lg:opacity-0 lg:group-hover:opacity-100")}
          >
            <ChevronLeftIcon className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label="Next slide"
            className={cn(arrow, "pointer-events-auto lg:opacity-0 lg:group-hover:opacity-100")}
          >
            <ChevronRightIcon className="size-5" />
          </button>
        </div>

        {/* Dots with a progress fill on the active one. */}
        <div className="absolute inset-x-0 bottom-4 flex items-center justify-center gap-2 lg:bottom-6">
          {heroBanners.map((banner, position) => {
            const active = position === index;
            return (
              <button
                key={banner.id}
                type="button"
                onClick={() => goTo(position)}
                aria-label={`Go to slide ${position + 1}`}
                aria-current={active}
                className={cn(
                  "h-1.5 overflow-hidden rounded-full transition-colors dur-base ease-out",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500",
                  active ? "w-10 bg-ink-900/20" : "w-1.5 bg-ink-900/25 hover:bg-ink-900/50",
                )}
              >
                {active ? (
                  <span
                    key={`${banner.id}-${index}`}
                    className={cn(
                      "block h-full w-full origin-left rounded-full bg-ink-900",
                      paused ? "scale-x-100" : "animate-dot-progress",
                    )}
                  />
                ) : null}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
