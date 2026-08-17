"use client";

import { useRef, useState } from "react";
import { ProductRail, type ProductRailHandle } from "@/components/product/ProductRail";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { newArrivalsShowcase } from "@/lib/data/products";

const arrow =
  "grid size-10 place-items-center rounded-full border border-neutral-200 bg-white text-ink-900 shadow-sm transition-colors dur-base ease-out hover:border-neutral-300 hover:text-accent-600 disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2";

export function NewArrivals() {
  const rail = useRef<ProductRailHandle>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  return (
    <Section labelledBy="new-arrivals-heading">
      <Container>
        <SectionHeading
          id="new-arrivals-heading"
          title="New arrivals"
          titleClassName="text-section sm:text-section-lg"
          align="center-mobile"
          action={
            <div className="hidden gap-2 lg:flex">
              <button
                type="button"
                onClick={() => rail.current?.scrollLeft()}
                disabled={atStart}
                aria-label="Scroll left"
                className={arrow}
              >
                <ChevronLeftIcon className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => rail.current?.scrollRight()}
                disabled={atEnd}
                aria-label="Scroll right"
                className={arrow}
              >
                <ChevronRightIcon className="size-5" />
              </button>
            </div>
          }
        />
      </Container>

      {/* Outside the Container so the track can run to the right edge — the
          rail aligns its own left gutter and re-centres its controls. */}
      <ProductRail
        ref={rail}
        products={newArrivalsShowcase}
        label="New arrivals"
        perView={5}
        bleedRight
        progress={false}
        arrows={false}
        onEdgeChange={({ atStart: start, atEnd: end }) => {
          setAtStart(start);
          setAtEnd(end);
        }}
      />
    </Section>
  );
}
