import Link from "next/link";
import { cn } from "@/lib/utils/cn";

export type LogoSize = "sm" | "md" | "lg";

export interface LogoProps {
  size?: LogoSize;
  /** Renders the wordmark for a dark surface. */
  tone?: "light" | "dark";
  className?: string;
}

/**
 * `md` steps up at `sm` so the header can use a single instance — swapping two
 * Logos with `hidden`/`sm:inline-flex` cannot work, because the root's own
 * `inline-flex` ties on specificity and wins on stylesheet order.
 */
const wordSizes: Record<LogoSize, string> = {
  sm: "text-body",
  md: "text-body sm:text-h3",
  lg: "text-h3 sm:text-h2",
};

/**
 * Placeholder mark — swap-in ready. The wordmark is never hardcoded elsewhere.
 */
export function Logo({ size = "md", tone = "light", className }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="Living Just Right — home"
      className={cn(
        "inline-flex items-center rounded-md",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2",
        className,
      )}
    >
      <span className={cn("font-bold tracking-tight", wordSizes[size])}>
        <span className={tone === "dark" ? "text-white" : "text-ink-900"}>Living</span>
        <span className="text-accent-500"> Just Right</span>
      </span>
    </Link>
  );
}
