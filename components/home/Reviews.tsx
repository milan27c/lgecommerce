"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Chip } from "@/components/ui/Chip";
import { CheckIcon, StarIcon } from "@/components/icons";
import { reviews } from "@/lib/data/content";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { cn } from "@/lib/utils/cn";

const ADVANCE_MS = 5000;

export function Reviews() {
  const scroller = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const isCarousel = useMediaQuery("(max-width: 1023px)");

  useEffect(() => {
    if (!isCarousel) return;
    const id = window.setInterval(
      () => setIndex((current) => (current + 1) % reviews.length),
      ADVANCE_MS,
    );
    return () => window.clearInterval(id);
  }, [isCarousel]);

  useEffect(() => {
    if (!isCarousel) return;
    const node = scroller.current;
    if (!node) return;
    node.scrollTo({ left: index * node.clientWidth, behavior: "smooth" });
  }, [index, isCarousel]);

  return (
    <Section labelledBy="reviews-heading" className="bg-tint">
      <Container>
        <SectionHeading
          id="reviews-heading"
          eyebrow="Verified buyers"
          title="What customers say"
          align="center"
        />

        <ul
          ref={scroller}
          className="no-scrollbar -mx-4 flex list-none snap-x snap-mandatory gap-4 overflow-x-auto px-4 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-5 lg:overflow-visible lg:px-0"
        >
          {reviews.map((review) => (
            <li key={review.id} className="w-full shrink-0 snap-center lg:w-auto">
              <figure className="flex h-full flex-col gap-4 rounded-lg border border-neutral-200 bg-white p-6">
                <div className="flex items-center gap-0.5" aria-label={`${review.rating} out of 5`}>
                  {Array.from({ length: 5 }, (_, position) => (
                    <StarIcon
                      key={position}
                      className={cn(
                        "size-4",
                        position < review.rating ? "text-star" : "text-neutral-200",
                      )}
                    />
                  ))}
                </div>
                <blockquote className="flex-1 text-body text-neutral-600">
                  “{review.quote}”
                </blockquote>
                <figcaption className="flex flex-wrap items-center gap-2">
                  <span className="text-body font-medium text-ink-900">{review.name}</span>
                  <Chip tone="success">
                    <CheckIcon className="size-3" />
                    Verified purchase
                  </Chip>
                  <span className="w-full text-sm text-neutral-400">{review.product}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex justify-center gap-2 lg:hidden">
          {reviews.map((review, position) => (
            <button
              key={review.id}
              type="button"
              onClick={() => setIndex(position)}
              aria-label={`Show review ${position + 1}`}
              aria-current={position === index}
              className={cn(
                "h-1.5 rounded-full transition-colors dur-base ease-out",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2",
                position === index ? "w-8 bg-accent-500" : "w-1.5 bg-neutral-300",
              )}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
