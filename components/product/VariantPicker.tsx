"use client";

import { useState } from "react";
import type { VariantGroup } from "@/lib/data/productDetail";
import { cn } from "@/lib/utils/cn";

export interface VariantPickerProps {
  group: VariantGroup;
  className?: string;
}

/** Prototype-only selection — nothing downstream reacts to the choice. */
export function VariantPicker({ group, className }: VariantPickerProps) {
  const [selected, setSelected] = useState(group.selected);
  const groupId = `variant-${group.label.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className={className}>
      <p id={groupId} className="text-xs uppercase text-neutral-500">
        {group.label}
      </p>
      <div role="group" aria-labelledby={groupId} className="mt-2.5 flex flex-wrap gap-2.5">
        {group.options.map((option) => {
          const isSelected = option === selected;
          return (
            <button
              key={option}
              type="button"
              aria-pressed={isSelected}
              onClick={() => setSelected(option)}
              className={cn(
                "rounded-control border px-4 py-2.5 text-sm",
                "transition-colors dur-base ease-out",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2",
                isSelected
                  ? "border-ink-900 bg-white font-medium text-ink-900"
                  : "border-neutral-200 bg-white text-neutral-500 hover:border-neutral-300 hover:text-ink-900",
              )}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
