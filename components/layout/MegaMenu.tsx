"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRightIcon } from "@/components/icons";
import { categories } from "@/lib/data/categories";
import { cn } from "@/lib/utils/cn";

const OPEN_DELAY = 120;
const CLOSE_DELAY = 200;

export interface MegaMenuProps {
  href: string;
  label: string;
  active: boolean;
  /** Shared nav-link classes so the trigger sits flush with its siblings. */
  linkClassName: string;
}

/**
 * The "Shop" primary-nav link doubles as the trigger for a full-width,
 * Apple-style catalogue panel: every top-level category shown at once as a
 * flat column of links, no rail, no single active selection. Hover-opens on
 * desktop with a deliberate open/close delay so diagonal mouse travel toward
 * the panel doesn't dismiss it. Click still navigates to /shop; Enter/Space
 * work for keyboard, Esc closes and returns focus to the trigger.
 */
export function MegaMenu({ href, label, active, linkClassName }: MegaMenuProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLAnchorElement>(null);
  const openTimer = useRef(0);
  const closeTimer = useRef(0);

  const clearTimers = () => {
    window.clearTimeout(openTimer.current);
    window.clearTimeout(closeTimer.current);
  };

  const scheduleOpen = () => {
    clearTimers();
    openTimer.current = window.setTimeout(() => setOpen(true), OPEN_DELAY);
  };

  const scheduleClose = () => {
    clearTimers();
    closeTimer.current = window.setTimeout(() => setOpen(false), CLOSE_DELAY);
  };

  useEffect(() => () => clearTimers(), []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      triggerRef.current?.focus();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div
      className="contents"
      onMouseEnter={scheduleOpen}
      onMouseLeave={scheduleClose}
      // No `onFocus` opener: returning focus to the trigger after Esc would
      // bubble back here and immediately reopen the panel. Keyboard opens with
      // Enter/Space on the trigger instead.
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <Link
        ref={triggerRef}
        href={href}
        aria-expanded={open}
        aria-haspopup="true"
        aria-current={active ? "page" : undefined}
        onClick={() => setOpen(false)}
        className={linkClassName}
      >
        {label}
        {active ? (
          <span aria-hidden className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-accent-500" />
        ) : null}
      </Link>

      {/* Full-bleed panel — absolutely positioned against the sticky header
          itself (not the padded Container it's nested in), so it spans edge
          to edge and sits flush under the header regardless of whether the
          header is pinned at the viewport top or still below the promo
          stripe. */}
      <div
        hidden={!open}
        className={cn(
          "absolute inset-x-0 top-full z-50 border-t border-b border-neutral-200 bg-white/97 backdrop-blur-md shadow-lg",
          "transition-[opacity,transform] dur-base ease-out",
          open ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0",
        )}
      >
        <div className="mx-auto grid w-full max-w-site grid-cols-5 gap-10 px-2.5 py-10 sm:px-3.5 lg:px-3">
          {categories.map((category) => (
            <div key={category.slug} className="flex flex-col">
              <Link
                href={`/c/${category.slug}`}
                onClick={() => setOpen(false)}
                className="mb-4 text-body font-semibold text-ink-900 transition-colors dur-fast ease-out hover:text-accent-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
              >
                {category.name}
              </Link>
              <ul className="flex flex-col gap-3">
                {category.groups.map((group) => (
                  <li key={group.slug}>
                    <Link
                      href={`/c/${category.slug}/${group.slug}`}
                      onClick={() => setOpen(false)}
                      className="text-sm text-neutral-500 transition-colors dur-fast ease-out hover:text-accent-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
                    >
                      {group.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href={`/c/${category.slug}`}
                onClick={() => setOpen(false)}
                className="group mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
              >
                Shop all
                <ArrowRightIcon className="size-3.5 transition-transform dur-fast ease-out group-hover:translate-x-0.5" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
