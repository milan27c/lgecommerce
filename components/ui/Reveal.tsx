"use client";

import type { ElementType, ReactNode } from "react";
import { useReveal } from "@/lib/hooks/useReveal";
import { cn } from "@/lib/utils/cn";

export interface RevealProps {
  children: ReactNode;
  /** Stagger position. 60ms per item, capped at the sixth item. */
  index?: number;
  as?: ElementType;
  className?: string;
}

const delays = [
  "reveal-d0",
  "reveal-d1",
  "reveal-d2",
  "reveal-d3",
  "reveal-d4",
  "reveal-d5",
] as const;

export function Reveal({ children, index = 0, as, className }: RevealProps) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  const Tag = (as ?? "div") as ElementType;
  const delay = delays[Math.min(index, delays.length - 1)];

  return (
    <Tag ref={ref} data-reveal={shown ? "in" : "out"} className={cn(delay, className)}>
      {children}
    </Tag>
  );
}
