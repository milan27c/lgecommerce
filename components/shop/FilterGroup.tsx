"use client";

import { useId, useState, type ReactNode } from "react";
import { ChevronDownIcon } from "@/components/icons";
import { cn } from "@/lib/utils/cn";

export interface FilterGroupProps {
  title: string;
  children: ReactNode;
  /** Collapsed groups still render their contents — only the panel is hidden. */
  defaultOpen?: boolean;
  /** Small accent count shown next to the title when the group is in use. */
  activeCount?: number;
  className?: string;
}

export function FilterGroup({
  title,
  children,
  defaultOpen = true,
  activeCount = 0,
  className,
}: FilterGroupProps) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();

  return (
    <div className={cn("border-b border-neutral-200 py-3 last:border-b-0", className)}>
      <h3>
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls={panelId}
          className={cn(
            "flex w-full items-center justify-between gap-2 rounded-none text-left",
            "text-body font-medium text-ink-900 transition-colors dur-fast ease-out hover:text-accent-600",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2",
          )}
        >
          <span className="flex items-center gap-2">
            {title}
            {activeCount > 0 ? (
              <span className="grid size-5 place-items-center rounded-full bg-accent-500 text-xs font-bold text-white">
                {activeCount}
              </span>
            ) : null}
          </span>
          <ChevronDownIcon
            className={cn(
              "size-4 shrink-0 text-neutral-400 transition-transform dur-base ease-out",
              open && "rotate-180",
            )}
          />
        </button>
      </h3>

      {open ? (
        <div id={panelId} className="mt-2.5">
          {children}
        </div>
      ) : null}
    </div>
  );
}
