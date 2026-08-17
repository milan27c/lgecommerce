import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import { cn } from "@/lib/utils/cn";

export type SectionHeadingTone = "light" | "dark" | "eco" | "eco-dark";

export interface SectionHeadingProps {
  id: string;
  title: string;
  eyebrow?: string;
  copy?: string;
  link?: { label: string; href: string };
  /** `center-mobile` centres title/copy/link below `sm`, reverting to `start`'s row layout at `sm` and up. */
  align?: "start" | "center" | "center-mobile";
  /** `eco` is the energy savings band only — see CLAUDE.md §3.2a. */
  tone?: SectionHeadingTone;
  className?: string;
}

const tones: Record<SectionHeadingTone, { eyebrow: string; title: string; copy: string; link: string }> = {
  light: {
    eyebrow: "text-accent-600",
    title: "text-ink-900",
    copy: "text-neutral-500",
    link: "text-ink-900 hover:text-accent-600",
  },
  dark: {
    eyebrow: "text-accent-300",
    title: "text-white",
    copy: "text-ink-200",
    link: "text-white hover:text-accent-300",
  },
  eco: {
    eyebrow: "text-eco-700",
    title: "text-ink-900",
    copy: "text-neutral-600",
    link: "text-ink-900 hover:text-eco-700",
  },
  /** The eco band's own night ground — see CLAUDE.md §3.3a. */
  "eco-dark": {
    eyebrow: "text-eco-300",
    title: "text-white",
    copy: "text-teal-200",
    link: "text-white hover:text-eco-300",
  },
};

export function SectionHeading({
  id,
  title,
  eyebrow,
  copy,
  link,
  align = "start",
  tone = "light",
  className,
}: SectionHeadingProps) {
  const centred = align === "center";
  const centredMobile = align === "center-mobile";
  const palette = tones[tone];

  return (
    <div
      className={cn(
        "mb-8 flex gap-4 lg:mb-10",
        centred && "flex-col items-center text-center",
        centredMobile &&
          "flex-col items-center text-center sm:flex-row sm:items-end sm:justify-between sm:text-left",
        !centred && !centredMobile && "flex-col items-start sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div
        className={cn(
          "max-w-2xl",
          centred && "flex flex-col items-center",
          centredMobile && "flex flex-col items-center sm:items-start",
        )}
      >
        {eyebrow ? (
          <p className={cn("mb-2 text-xs uppercase", palette.eyebrow)}>{eyebrow}</p>
        ) : null}
        <h2 id={id} className={cn("text-h3 sm:text-h2", palette.title)}>
          {title}
        </h2>
        {copy ? <p className={cn("mt-2 text-body", palette.copy)}>{copy}</p> : null}
      </div>

      {link ? (
        <Link
          href={link.href}
          className={cn(
            "group inline-flex shrink-0 items-center gap-1.5 text-body font-medium transition-colors dur-base ease-out",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 rounded-sm",
            palette.link,
          )}
        >
          {link.label}
          <ArrowRightIcon className="size-4" />
        </Link>
      ) : null}
    </div>
  );
}
