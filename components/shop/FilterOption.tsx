"use client";

import type { ReactNode } from "react";
import { CheckIcon } from "@/components/icons";
import { cn } from "@/lib/utils/cn";

export interface FilterOptionProps {
  label: ReactNode;
  checked: boolean;
  onChange: () => void;
  /** Matching product count for this option. */
  count?: number;
  /** Radio semantics for single-choice groups such as rating. */
  type?: "checkbox" | "radio";
  name?: string;
  disabled?: boolean;
}

/** One filter row: control, label, and the count it would return. */
export function FilterOption({
  label,
  checked,
  onChange,
  count,
  type = "checkbox",
  name,
  disabled,
}: FilterOptionProps) {
  const rounded = type === "radio" ? "rounded-full" : "rounded-sm";

  return (
    <label
      className={cn(
        "group flex items-center gap-2.5 py-1.5",
        disabled ? "cursor-not-allowed opacity-40" : "cursor-pointer",
      )}
    >
      <input
        type={type}
        name={name}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        className="peer sr-only"
      />
      <span
        aria-hidden
        className={cn(
          "grid size-4.5 shrink-0 place-items-center border transition-colors dur-fast ease-out",
          rounded,
          checked ? "border-accent-500 bg-accent-500 text-white" : "border-neutral-300 bg-white",
          !disabled && !checked && "group-hover:border-neutral-400",
          "peer-focus-visible:ring-2 peer-focus-visible:ring-accent-500 peer-focus-visible:ring-offset-2",
        )}
      >
        {checked ? <CheckIcon className="size-3" /> : null}
      </span>

      <span
        className={cn(
          "flex-1 text-body transition-colors dur-fast ease-out",
          checked ? "text-ink-900" : "text-neutral-600",
          !disabled && "group-hover:text-ink-900",
        )}
      >
        {label}
      </span>

      {typeof count === "number" ? (
        <span className="text-sm tabular-nums text-neutral-400">{count}</span>
      ) : null}
    </label>
  );
}
