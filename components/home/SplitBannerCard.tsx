"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import type { SplitBanner } from "@/lib/data/banners";
import { useParallax } from "@/lib/hooks/useParallax";

export interface SplitBannerCardProps {
  banner: SplitBanner;
  index: number;
}

export function SplitBannerCard({ banner, index }: SplitBannerCardProps) {
  const { ref, offset } = useParallax<HTMLDivElement>(40);

  return (
    <Reveal as="li" index={index}>
      <div className="group relative aspect-hero-mobile overflow-hidden rounded-none bg-neutral-100 transition-transform dur-base ease-out hover:-translate-y-1 md:aspect-video">
        {/* Background only — never text, never product images. */}
        <div
          ref={ref}
          className="absolute inset-x-0 -inset-y-6"
          style={{ transform: `translate3d(0, ${offset}px, 0)` }}
        >
          <Image
            src={banner.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 620px, 100vw"
            className="hidden object-cover transition-transform dur-slow ease-out group-hover:scale-104 md:block"
          />
          <Image
            src={banner.mobileImage ?? banner.image}
            alt=""
            fill
            sizes="100vw"
            className="object-cover transition-transform dur-slow ease-out group-hover:scale-104 md:hidden"
          />
        </div>

        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/25 to-transparent"
        />

        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
          <h3 className="text-h3 text-white">
            <Link
              href={banner.href}
              className="rounded-none after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2"
            >
              {banner.title}
            </Link>
          </h3>
          <p className="mt-1.5 max-w-sm text-body text-ink-100">{banner.copy}</p>
          <Button href={banner.href} variant="inverse" size="sm" className="relative z-10 mt-4">
            View Product
          </Button>
        </div>
      </div>
    </Reveal>
  );
}
