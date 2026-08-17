"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CheckIcon, FacebookIcon, InstagramIcon, MailIcon, YoutubeIcon } from "@/components/icons";
import { footerColumns } from "@/lib/data/content";
import { cn } from "@/lib/utils/cn";

const socials = [
  { label: "Facebook", href: "/contact", Icon: FacebookIcon },
  { label: "Instagram", href: "/contact", Icon: InstagramIcon },
  { label: "YouTube", href: "/contact", Icon: YoutubeIcon },
];

const paymentMethods = ["Visa", "Mastercard", "Amex", "PayPal", "Instalments"];

const linkClass =
  "text-sm text-ink-200 transition-colors dur-fast ease-out hover:text-accent-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 rounded-none";

export function Footer() {
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <footer className="bg-ink-900 text-ink-200">
      <Container>
        <div className="flex flex-col items-center gap-6 border-b border-ink-800 py-10 text-center lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:py-12 lg:text-left">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center lg:items-center">
            <span className="hidden shrink-0 place-items-center rounded-full bg-accent-500 text-white sm:grid sm:size-11">
              <MailIcon className="size-5" />
            </span>
            <div>
              <h2 className="text-h3 text-white">Be first to know what&apos;s new</h2>
              <p className="mt-1.5 max-w-sm text-body text-ink-300">
                New arrivals, price drops and instalment offers. One email a week, no more.
              </p>
            </div>
          </div>

          {submitted ? (
            <p
              role="status"
              className="inline-flex shrink-0 items-center gap-2 rounded-control border border-success/40 px-4 py-3 text-body text-white"
            >
              <span className="grid size-5 shrink-0 place-items-center rounded-full bg-success text-white">
                <CheckIcon className="size-3" />
              </span>
              You are on the list. Look out for the next drop.
            </p>
          ) : (
            <form
              onSubmit={onSubmit}
              className="flex w-full flex-col gap-3 sm:flex-row sm:items-center lg:w-auto lg:shrink-0"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className={cn(
                  "h-11 flex-1 rounded-control border border-ink-700 bg-ink-800 px-4 text-body text-white placeholder:text-ink-400 sm:w-64",
                  "transition-colors dur-base ease-out hover:border-ink-600",
                  "focus:border-accent-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500",
                )}
              />
              <Button type="submit" size="md" className="sm:w-auto">
                Subscribe
              </Button>
            </form>
          )}
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-14 sm:grid-cols-3 lg:grid-cols-5 lg:py-18">
          <div className="col-span-2 flex flex-col items-center text-center sm:col-span-3 sm:items-start sm:text-left lg:col-span-1">
            <Logo size="lg" tone="dark" />
            <p className="mt-4 max-w-xs text-sm text-ink-300">
              Thoughtfully curated home electronics and appliances, chosen for quality and
              finished with a calm, considered design in every room.
            </p>
            <ul className="mt-5 flex items-center gap-2">
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <Link
                    href={href}
                    aria-label={label}
                    className="grid size-9 place-items-center rounded-control border border-ink-700 text-ink-200 transition-colors dur-fast ease-out hover:border-accent-400 hover:text-accent-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
                  >
                    <Icon className="size-4.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {footerColumns.map((column) => (
            <nav
              key={column.title}
              aria-label={column.title}
              className="flex flex-col items-center text-center sm:items-start sm:text-left"
            >
              <h2 className="mb-4 text-xs uppercase text-white">{column.title}</h2>
              <ul className="flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className={linkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex flex-col items-center gap-4 border-t border-ink-800 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
            <span className="mr-2 text-xs uppercase text-ink-400">We accept</span>
            {paymentMethods.map((method) => (
              <span
                key={method}
                className="rounded-control border border-ink-700 px-2.5 py-1 text-sm text-ink-200"
              >
                {method}
              </span>
            ))}
          </div>
          <p className="text-sm text-ink-400">
            © {new Date().getFullYear()} Living Just Right. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
