"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { formatPrice } from "@/lib/utils/formatPrice";
import { cn } from "@/lib/utils/cn";

export interface StickySection {
  id: string;
  label: string;
}

export interface ProductStickyBarProps {
  name: string;
  price: number;
  sections: StickySection[];
  className?: string;
}

/**
 * Sits directly under the sticky header once the buy box scrolls away. Row one
 * repeats the name, price and CTA; row two is the in-page tab nav with a
 * scroll-spy underline.
 */
export function ProductStickyBar({ name, price, sections, className }: ProductStickyBarProps) {
  const [active, setActive] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const nodes = sections
      .map((section) => document.getElementById(section.id))
      .filter((node): node is HTMLElement => node !== null);
    if (nodes.length === 0) return;

    // The observer only reports sections whose state changed, so the running
    // set is kept here and the topmost one in document order wins.
    const visible = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        const current = sections.find((section) => visible.has(section.id));
        if (current) setActive(current.id);
      },
      // Top edge sits just below the header + this bar, so a section counts as
      // current from the moment its heading clears the chrome.
      { rootMargin: "-200px 0px -55% 0px", threshold: 0 },
    );

    for (const node of nodes) observer.observe(node);
    return () => observer.disconnect();
  }, [sections]);

  return (
    <div
      className={cn(
        // The header is a single 56px row by the time this bar can stick, so the
        // offset is the same at every breakpoint.
        "sticky top-14 z-30 border-y border-neutral-200 bg-white/95 backdrop-blur-md",
        className,
      )}
    >
      <Container>
        <div className="flex h-14 items-center gap-4">
          <p className="min-w-0 flex-1 truncate text-sm font-medium text-ink-900 sm:text-body">
            {name}
          </p>
          <div className="flex shrink-0 items-center gap-4">
            <span className="hidden text-body font-bold text-ink-900 sm:inline">
              {formatPrice(price)}
            </span>
            <Button type="button" size="sm">
              Where to Buy
            </Button>
          </div>
        </div>
      </Container>

      <Container>
        <nav aria-label="Product sections" className="no-scrollbar flex gap-7 overflow-x-auto">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              aria-current={active === section.id ? "true" : undefined}
              className={cn(
                "relative shrink-0 whitespace-nowrap py-3 text-sm font-medium",
                "transition-colors dur-fast ease-out",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500",
                active === section.id
                  ? "text-ink-900"
                  : "text-neutral-500 hover:text-ink-900",
              )}
            >
              {section.label}
              <span
                aria-hidden
                className={cn(
                  "absolute inset-x-0 bottom-0 h-0.5 origin-left bg-accent-500",
                  "transition-transform dur-base ease-out",
                  active === section.id ? "scale-x-100" : "scale-x-0",
                )}
              />
            </a>
          ))}
        </nav>
      </Container>
    </div>
  );
}
