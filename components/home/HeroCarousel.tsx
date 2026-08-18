"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ChevronRightIcon, PauseIcon, PlayIcon } from "@/components/icons";
import { heroBanners } from "@/lib/data/banners";
import { cn } from "@/lib/utils/cn";

const AUTOPLAY_MS = 6000;
const SWIPE_THRESHOLD = 48;

export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [hoverPaused, setHoverPaused] = useState(false);
  const [manualPaused, setManualPaused] = useState(false);
  const touchStart = useRef(0);
  const paused = hoverPaused || manualPaused;

  const goTo = useCallback((next: number) => {
    setIndex((next + heroBanners.length) % heroBanners.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = window.setTimeout(() => goTo(index + 1), AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [index, paused, goTo]);

  const control =
    "grid size-8 place-items-center rounded-full border border-ink-900/10 bg-white/70 text-ink-900 backdrop-blur-sm transition-colors dur-base ease-out hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500";

  return (
    <>
      <div
        className="group relative aspect-hero-mobile overflow-hidden bg-neutral-100 md:aspect-hero"
        onMouseEnter={() => setHoverPaused(true)}
        onMouseLeave={() => setHoverPaused(false)}
        onFocus={() => setHoverPaused(true)}
        onBlur={() => setHoverPaused(false)}
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
          const light = banner.tone === "light";
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

              {!banner.hideText ? (
                <>
                  {/* Legibility scrim — light-toned slides sit on dark artwork, so the
                      wash goes dark; dark-toned slides sit on light artwork, so it's white.
                      Both run up from the base on mobile, in from the left on desktop. */}
                  <div
                    aria-hidden
                    style={banner.scrimOpacity != null ? { opacity: banner.scrimOpacity } : undefined}
                    className={cn(
                      "absolute inset-0",
                      light
                        ? "bg-gradient-to-t from-black/40 via-black/15 to-transparent md:bg-gradient-to-r md:from-black/35 md:via-black/15"
                        : "bg-gradient-to-t from-white/45 via-white/20 to-transparent md:bg-gradient-to-r md:from-white/40 md:via-white/20",
                    )}
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
                      <h2
                        className={cn(
                          "whitespace-pre-line text-h3 font-semibold sm:text-h2 lg:text-h1",
                          light ? "text-white" : "text-ink-900",
                        )}
                      >
                        {banner.headline}
                      </h2>
                      <Button
                        href={banner.cta.href}
                        size="md"
                        variant={light ? "outline" : "primary"}
                        className="mt-5"
                      >
                        {banner.cta.label}
                      </Button>
                    </div>
                  </Container>
                </>
              ) : null}
            </div>
          );
        })}

        {/* Compact controls — advance and play/pause, bottom-right */}
        <div className="absolute bottom-4 right-3 z-10 flex items-center gap-2 sm:right-5 lg:bottom-6 lg:right-8">
          <button
            type="button"
            onClick={() => setManualPaused((value) => !value)}
            aria-label={manualPaused ? "Play slideshow" : "Pause slideshow"}
            aria-pressed={manualPaused}
            className={control}
          >
            {manualPaused ? <PlayIcon className="size-4" /> : <PauseIcon className="size-4" />}
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label="Next slide"
            className={control}
          >
            <ChevronRightIcon className="size-4" />
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
