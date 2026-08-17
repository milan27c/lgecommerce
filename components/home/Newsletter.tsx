"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CheckIcon, MailIcon } from "@/components/icons";
import { cn } from "@/lib/utils/cn";

export function Newsletter() {
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section aria-labelledby="newsletter-heading" className="section-y bg-neutral-50">
      <Container>
        <div className="relative overflow-hidden rounded-2xl bg-ink-900 px-6 py-14 text-center sm:px-10 lg:py-18">
          <div aria-hidden className="pointer-events-none absolute inset-0 glow-accent" />

          <div className="relative mx-auto flex max-w-xl flex-col items-center">
            <span className="grid size-11 place-items-center rounded-full bg-accent-500 text-white">
              <MailIcon className="size-5" />
            </span>
            <h2 id="newsletter-heading" className="mt-5 text-h3 text-white sm:text-h2">
              Be first to know what&apos;s new
            </h2>
            <p className="mt-3 text-body text-ink-200 sm:text-body-lg">
              New arrivals, price drops and instalment offers. One email a week, no more.
            </p>

            {submitted ? (
              <p
                role="status"
                className="mt-7 inline-flex items-center gap-2 rounded-md border border-success/40 px-4 py-3 text-body text-white"
              >
                <span className="grid size-5 shrink-0 place-items-center rounded-full bg-success text-white">
                  <CheckIcon className="size-3" />
                </span>
                You are on the list. Look out for the next drop.
              </p>
            ) : (
              <form
                onSubmit={onSubmit}
                className="mt-7 flex w-full flex-col gap-3 sm:flex-row sm:items-center"
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
                    "h-11 flex-1 rounded-md border border-ink-700 bg-ink-800 px-4 text-body text-white placeholder:text-ink-400",
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
        </div>
      </Container>
    </section>
  );
}
