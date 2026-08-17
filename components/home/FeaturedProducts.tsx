"use client";

import { useState } from "react";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { featuredProductsFor } from "@/lib/data/products";
import { cn } from "@/lib/utils/cn";

const tabs = [
  { id: "tv-audio-video", label: "TV/Audio/Video" },
  { id: "appliances", label: "Appliances" },
  { id: "air-solutions", label: "Air Solutions" },
  { id: "computers", label: "Monitors" },
];

export function FeaturedProducts() {
  const [active, setActive] = useState(tabs[0].id);
  const products = featuredProductsFor(active, 4);

  return (
    <Section labelledBy="featured-products-heading">
      <Container>
        <SectionHeading
          id="featured-products-heading"
          eyebrow="Featured products"
          title="The month's standouts"
          titleClassName="text-section sm:text-section-lg"
          link={{ label: "View all", href: "/best-sellers" }}
          align="center-mobile"
        />

        <div
          role="tablist"
          aria-label="Featured products by category"
          className="mb-6 flex flex-wrap justify-center gap-2 sm:no-scrollbar sm:flex-nowrap sm:justify-start sm:overflow-x-auto"
        >
          {tabs.map((tab) => {
            const selected = tab.id === active;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                id={`featured-tab-${tab.id}`}
                aria-selected={selected}
                aria-controls={`featured-panel-${tab.id}`}
                onClick={() => setActive(tab.id)}
                className={cn(
                  "shrink-0 rounded-none border px-4 py-2 text-sm font-medium transition-colors dur-base ease-out",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2",
                  selected
                    ? "border-accent-500 bg-accent-500 text-white"
                    : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 hover:text-accent-600",
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div
          key={active}
          id={`featured-panel-${active}`}
          role="tabpanel"
          aria-labelledby={`featured-tab-${active}`}
          className="animate-fade-in"
        >
          <ProductGrid products={products} showOffer={false} singleColumnMobile />
        </div>
      </Container>
    </Section>
  );
}
