"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon, GoogleIcon, InfoIcon, StarIcon } from "@/components/icons";
import { reviews } from "@/lib/data/content";
import { cn } from "@/lib/utils/cn";

const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
const averageRounded = Math.round(averageRating);

const arrow =
  "grid size-10 place-items-center rounded-full border border-neutral-200 bg-white text-ink-900 transition-colors dur-base ease-out hover:border-neutral-300 hover:text-accent-600 disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2";

export function Reviews() {
  const scroller = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const measure = useCallback(() => {
    const node = scroller.current;
    if (!node) return;
    const max = node.scrollWidth - node.clientWidth;
    setAtStart(node.scrollLeft <= 1);
    setAtEnd(max - node.scrollLeft <= 1);
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure, { passive: true });
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const step = (direction: -1 | 1) => {
    const node = scroller.current;
    if (!node) return;
    node.scrollBy({ left: direction * node.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <Section labelledBy="reviews-heading">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[320px_1fr] lg:gap-12">
          <div>
            <h2 id="reviews-heading" className="text-section text-ink-900 sm:text-section-lg">
              Let our customers speak for us
            </h2>

            <div className="mt-10 flex items-center gap-1.5">
              <span className="text-body-lg font-semibold text-ink-900">
                Excellent {averageRating.toFixed(1)} out of 5 stars
              </span>
              <InfoIcon className="size-4 text-neutral-400" />
            </div>

            <div className="mt-3 flex items-center gap-1">
              {Array.from({ length: 5 }, (_, position) => (
                <StarIcon
                  key={position}
                  className={cn("size-5", position < averageRounded ? "text-star" : "text-neutral-200")}
                />
              ))}
            </div>

            <div className="mt-8 flex items-center gap-2">
              <GoogleIcon className="size-6" />
              <span className="text-body font-semibold text-ink-900">Google Reviews</span>
            </div>
          </div>

          <div className="min-w-0">
            <ul
              ref={scroller}
              onScroll={measure}
              className="no-scrollbar -mx-2.5 flex list-none snap-x snap-mandatory gap-4 overflow-x-auto px-2.5 sm:mx-0 sm:px-0 lg:gap-5"
            >
              {reviews.map((review) => (
                <li key={review.id} className="w-full shrink-0 snap-start sm:w-1/2 lg:w-1/3">
                  <figure className="flex h-full flex-col gap-4 rounded-control bg-neutral-100 p-6">
                    <div className="flex items-center gap-0.5" aria-label={`${review.rating} out of 5`}>
                      {Array.from({ length: 5 }, (_, position) => (
                        <StarIcon
                          key={position}
                          className={cn(
                            "size-4",
                            position < review.rating ? "text-ink-900" : "text-neutral-300",
                          )}
                        />
                      ))}
                    </div>
                    <figcaption className="text-body font-semibold text-ink-900">{review.title}</figcaption>
                    <blockquote className="flex-1 text-body text-neutral-600">{review.quote}</blockquote>
                    <div className="flex flex-wrap items-center gap-x-2 text-sm text-neutral-500">
                      <span className="font-medium text-ink-900">{review.name}</span>
                      <span aria-hidden="true">·</span>
                      <span>{review.date}</span>
                    </div>
                  </figure>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex items-center justify-between">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  disabled={atStart}
                  aria-label="Show previous reviews"
                  className={arrow}
                >
                  <ChevronLeftIcon className="size-5" />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  disabled={atEnd}
                  aria-label="Show next reviews"
                  className={arrow}
                >
                  <ChevronRightIcon className="size-5" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => step(1)}
                disabled={atEnd}
                className="group inline-flex shrink-0 items-center gap-1.5 rounded-none text-body font-medium text-ink-900 transition-colors dur-base ease-out hover:text-accent-600 disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2"
              >
                Show more reviews
                <ArrowRightIcon className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
