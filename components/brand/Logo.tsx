import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

export type LogoSize = "sm" | "md" | "lg";

export interface LogoProps {
  size?: LogoSize;
  /** Renders the white wordmark cut for a dark surface. */
  tone?: "light" | "dark";
  className?: string;
}

/** Source art is 2172×724 (3:1) — only height is set per size, width tracks via `w-auto`. */
const heightClasses: Record<LogoSize, string> = {
  sm: "h-5",
  md: "h-6 sm:h-8",
  lg: "h-8 sm:h-10",
};

/** Wordmark image — swap the files at `public/images/logo.png` / `logow.png` to rebrand. */
export function Logo({ size = "md", tone = "light", className }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="Living Just Right — home"
      className={cn(
        "inline-flex items-center rounded-none",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2",
        className,
      )}
    >
      <Image
        src={tone === "dark" ? "/images/logow.png" : "/images/logo.png"}
        alt="Living Just Right"
        width={2172}
        height={724}
        priority
        className={cn("w-auto", heightClasses[size])}
      />
    </Link>
  );
}
