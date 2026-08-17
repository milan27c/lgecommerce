"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRightIcon, GridIcon } from "@/components/icons";
import { categories } from "@/lib/data/categories";
import { cn } from "@/lib/utils/cn";

const OPEN_DELAY = 120;
const CLOSE_DELAY = 200;

/**
 * Hover-opens on desktop with a deliberate open/close delay so diagonal mouse
 * travel toward the panel doesn't dismiss it. Click and Enter work for keyboard
 * and touch. Esc closes and returns focus to the trigger.
 */
export function MegaMenu() {
  const [open, setOpen] = useState(false);
  const [activeSlug, setActiveSlug] = useState(categories[0].slug);
  const triggerRef = useRef<HTMLButtonElement>(null);
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

  const active = categories.find((category) => category.slug === activeSlug) ?? categories[0];

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
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "inline-flex h-10 shrink-0 items-center gap-2 rounded-md px-2.5 font-medium transition-colors dur-base ease-out",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2",
          open ? "text-accent-600" : "text-ink-900 hover:text-accent-600",
        )}
      >
        <GridIcon className="size-5" />
        Categories
      </button>

      <div
        hidden={!open}
        className={cn(
          "absolute left-0 right-0 top-full z-50 mt-3 origin-top rounded-xl border border-neutral-200 bg-white p-6 shadow-lg",
          "transition-[opacity,transform] dur-base ease-out",
          open ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0",
        )}
      >
        <div className="grid grid-cols-[180px_1fr_260px] gap-6">
          {/* Top-level rail */}
          <ul className="flex flex-col gap-1 border-r border-neutral-200 pr-4">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/c/${category.slug}`}
                  onMouseEnter={() => setActiveSlug(category.slug)}
                  onFocus={() => setActiveSlug(category.slug)}
                  className={cn(
                    "block rounded-md px-3 py-2 text-body font-medium transition-colors dur-fast ease-out",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500",
                    category.slug === activeSlug
                      ? "bg-accent-50 text-accent-700"
                      : "text-ink-900 hover:bg-neutral-50 hover:text-accent-600",
                  )}
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Group → link lists. Multi-column flow rather than a grid, so a
              fifth group packs under the shortest column instead of starting a
              new row below the tallest one. */}
          <div className="columns-4 gap-6">
            {active.groups.map((group) => (
              <div key={group.slug} className="mb-7 break-inside-avoid">
                <Link
                  href={`/c/${active.slug}/${group.slug}`}
                  className="mb-2.5 block text-body font-semibold text-ink-900 transition-colors dur-fast ease-out hover:text-accent-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
                >
                  {group.name}
                </Link>
                <ul className="flex flex-col gap-1.5">
                  {group.items.map((item) => (
                    <li key={item.slug}>
                      <Link
                        href={`/c/${active.slug}/${item.slug}`}
                        className="block translate-x-0 text-sm text-neutral-600 transition-[color,transform] dur-fast ease-out hover:translate-x-0.5 hover:text-accent-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Promo column, swaps with the hovered top-level category */}
          {active.promo ? (
            <Link
              href={active.promo.href}
              className="group flex flex-col overflow-hidden rounded-lg border border-neutral-200 transition-colors dur-base ease-out hover:border-neutral-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
            >
              <div className="relative aspect-video overflow-hidden bg-neutral-100">
                <Image
                  src={active.promo.image}
                  alt=""
                  fill
                  sizes="260px"
                  className="scale-100 object-cover transition-transform dur-slow ease-out group-hover:scale-104"
                />
              </div>
              <div className="flex flex-1 flex-col gap-1.5 p-4">
                <p className="text-body font-semibold text-ink-900">{active.promo.title}</p>
                <p className="text-sm text-neutral-500">{active.promo.copy}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-sm font-medium text-accent-600">
                  Shop now
                  <ArrowRightIcon className="size-4" />
                </span>
              </div>
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}
