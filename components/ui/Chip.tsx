import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export type ChipTone = "neutral" | "accent" | "ink" | "success" | "eco";

export interface ChipProps {
  children: ReactNode;
  tone?: ChipTone;
  className?: string;
}

const tones: Record<ChipTone, string> = {
  neutral: "border-neutral-200 text-neutral-600 bg-white",
  accent: "border-accent-200 text-accent-700 bg-accent-50",
  ink: "border-ink-200 text-ink-800 bg-ink-50",
  success: "border-success/30 text-success bg-white",
  eco: "border-eco/30 text-eco bg-white",
};

export function Chip({ children, tone = "neutral", className }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs uppercase",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
