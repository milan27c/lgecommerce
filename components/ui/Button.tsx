import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export type ButtonVariant = "primary" | "ink" | "secondary" | "ghost" | "inverse" | "eco" | "outline";
export type ButtonSize = "xs" | "sm" | "md" | "lg";

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Renders a Link instead of a button. */
  href?: string;
  className?: string;
}

/* Ring colour lives on the variant: the eco band carries its own, and `cn` is a
   plain join, so a className override could not win reliably. */
const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white";

const accentRing = "focus-visible:ring-accent-500";

const variants: Record<ButtonVariant, string> = {
  primary: `bg-accent-500 text-white hover:bg-accent-600 active:bg-accent-700 ${accentRing}`,
  /** Brand secondary as a fill — quiet next to primary, still a solid button. */
  ink: `bg-ink-900 text-white hover:bg-ink-800 active:bg-ink-700 ${accentRing}`,
  secondary: `bg-white text-ink-900 border border-neutral-200 hover:border-neutral-300 hover:text-accent-600 ${accentRing}`,
  ghost: `bg-transparent text-ink-900 hover:text-accent-600 ${accentRing}`,
  inverse: `bg-white text-ink-900 hover:bg-accent-50 hover:text-accent-700 ${accentRing}`,
  /** Energy savings band only — accent orange fights the mint field it sits on. */
  eco: "bg-eco-600 text-white hover:bg-eco-700 active:bg-eco-800 focus-visible:ring-eco-500",
  /** White outline for CTAs sitting on dark photography (e.g. hero slides). */
  outline: "bg-transparent text-white border border-white hover:bg-white hover:text-ink-900 focus-visible:ring-white",
};

const sizes: Record<ButtonSize, string> = {
  /** Card-level affordances that sit inline with meta text. */
  xs: "h-8 px-3 text-sm",
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-body",
  lg: "h-13 px-7 text-body-lg",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  className,
  ...rest
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-control font-medium transition-colors dur-base ease-out",
    "disabled:cursor-not-allowed disabled:opacity-50",
    focusRing,
    variants[variant],
    sizes[size],
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
