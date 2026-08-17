import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export interface SectionProps {
  /** Id of the heading that labels this landmark. */
  labelledBy: string;
  children: ReactNode;
  className?: string;
  /** Drop the standard 64/88px vertical rhythm. */
  flush?: boolean;
}

export function Section({ labelledBy, children, className, flush }: SectionProps) {
  return (
    <section aria-labelledby={labelledBy} className={cn(!flush && "section-y", className)}>
      {children}
    </section>
  );
}
