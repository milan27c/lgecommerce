"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ArrowRightIcon, ChatIcon, CloseIcon } from "@/components/icons";
import { cn } from "@/lib/utils/cn";

interface ChatMessage {
  id: string;
  role: "bot" | "user";
  text: string;
}

let messageId = 0;
const nextId = () => `msg-${++messageId}`;

const seedMessages: ChatMessage[] = [
  {
    id: nextId(),
    role: "bot",
    text: "Hi, I'm the Living Just Right assistant. Ask me about LG TVs, appliances, delivery or your order.",
  },
  {
    id: nextId(),
    role: "user",
    text: "Does the OLED evo C4 come with the manufacturer warranty?",
  },
  {
    id: nextId(),
    role: "bot",
    text: "Yes — Living Just Right is an authorised LG stockist, so every OLED evo C4 ships with the full LG manufacturer warranty.",
  },
  {
    id: nextId(),
    role: "user",
    text: "Good. Is the QNED MiniLED bundle deal still running?",
  },
  {
    id: nextId(),
    role: "bot",
    text: "It is — the QNED65 MiniLED 4K Smart TV bundle is LKR 60,000 off this week. You'll find it on the Deals page.",
  },
];

/** Keyword-matched canned replies — no backend, this is a static prototype. */
const cannedReplies: { keywords: string[]; reply: string }[] = [
  {
    keywords: ["deliver", "shipping", "ship"],
    reply:
      "Islandwide delivery runs three to five working days. Large appliances are scheduled with you by phone before dispatch.",
  },
  {
    keywords: ["warrant", "guarantee"],
    reply:
      "Every unit we sell carries the full LG manufacturer warranty — we're an authorised LG stockist.",
  },
  {
    keywords: ["return", "refund", "exchange"],
    reply: "Returns are accepted within 7 days in original packaging — see the Returns policy in the footer for details.",
  },
  {
    keywords: ["deal", "offer", "discount", "sale", "price", "bundle"],
    reply: "Our current offers are on the Deals page — bundle savings and countdown deals refresh weekly.",
  },
  {
    keywords: ["ac", "air condition", "dualcool", "inverter"],
    reply: "DUALCOOL inverter ACs are in stock across all capacities, with the 12000 BTU model shipping fastest.",
  },
  {
    keywords: ["tv", "oled", "qned", "screen"],
    reply: "Our TV range spans OLED evo and QNED MiniLED, from 43\" up to 77\" — all with webOS and ThinQ built in.",
  },
  {
    keywords: ["order", "track"],
    reply: "You can track a placed order any time from My Account → Orders once it ships.",
  },
  {
    keywords: ["stock", "available"],
    reply: "Stock status shows live on every product page — if it says In Stock, it's ready to ship.",
  },
];

const fallbackReply =
  "Thanks for your message — our team typically replies within a few minutes. In the meantime, feel free to browse the Shop or Deals page.";

function replyFor(text: string): string {
  const lower = text.toLowerCase();
  const match = cannedReplies.find((entry) => entry.keywords.some((word) => lower.includes(word)));
  return match ? match.reply : fallbackReply;
}

/** Floating chat entry point, bottom-right on every page. Client-only, dummy data. */
export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(seedMessages);
  const [value, setValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const replyTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (panelRef.current?.contains(target)) return;
      if ((target as HTMLElement).closest?.("[data-chat-trigger]")) return;
      setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [open]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [messages, isTyping]);

  useEffect(() => {
    return () => {
      if (replyTimeout.current) clearTimeout(replyTimeout.current);
    };
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const text = value.trim();
    if (!text) return;

    setMessages((prev) => [...prev, { id: nextId(), role: "user", text }]);
    setValue("");
    setIsTyping(true);

    replyTimeout.current = setTimeout(() => {
      setMessages((prev) => [...prev, { id: nextId(), role: "bot", text: replyFor(text) }]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <>
      <button
        type="button"
        data-chat-trigger
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "fixed bottom-5 right-5 z-50 flex size-14 items-center justify-center rounded-full bg-accent-500 text-white shadow-lg transition-colors dur-base ease-out hover:bg-accent-600 active:bg-accent-700",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2",
          "sm:bottom-6 sm:right-6",
        )}
      >
        {open ? <CloseIcon className="size-6" /> : <ChatIcon className="size-6" />}
        <span className="sr-only">{open ? "Close chat" : "Chat with us"}</span>
      </button>

      <div
        id={panelId}
        ref={panelRef}
        role="dialog"
        aria-label="Living Just Right assistant"
        hidden={!open}
        aria-hidden={!open}
        className={cn(
          "fixed inset-x-4 bottom-24 z-50 flex h-120 flex-col overflow-hidden rounded-card border border-neutral-200 bg-white shadow-lg",
          "transition-[opacity,transform] dur-base ease-out",
          open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
          "sm:inset-x-auto sm:right-6 sm:w-96",
        )}
      >
        <div className="flex items-center gap-3 bg-ink-900 px-4 py-3.5 text-white">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/15">
            <ChatIcon className="size-5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold">Living Just Right Assistant</p>
            <p className="flex items-center gap-1.5 text-xs text-white/70">
              <span className="size-1.5 shrink-0 rounded-full bg-success" />
              Typically replies in a few minutes
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className={cn(
              "shrink-0 rounded-none p-1 text-white/70 transition-colors dur-fast ease-out hover:text-white",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink-900",
            )}
          >
            <CloseIcon className="size-5" />
            <span className="sr-only">Close chat</span>
          </button>
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto bg-neutral-50 px-4 py-4">
          {messages.map((message) => (
            <div key={message.id} className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}>
              <p
                className={cn(
                  "max-w-xs rounded-card px-3.5 py-2.5 text-sm leading-snug",
                  message.role === "user"
                    ? "bg-accent-500 text-white"
                    : "border border-neutral-200 bg-white text-ink-900",
                )}
              >
                {message.text}
              </p>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-center gap-1 rounded-card border border-neutral-200 bg-white px-3.5 py-3">
                <span className="size-1.5 rounded-full bg-neutral-400 animate-typing-bounce typing-dot-delay-1" />
                <span className="size-1.5 rounded-full bg-neutral-400 animate-typing-bounce typing-dot-delay-2" />
                <span className="size-1.5 rounded-full bg-neutral-400 animate-typing-bounce typing-dot-delay-3" />
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-neutral-200 p-3">
          <label htmlFor={`${panelId}-input`} className="sr-only">
            Type a message
          </label>
          <input
            id={`${panelId}-input`}
            type="text"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder="Ask about LG products, delivery, warranty…"
            className={cn(
              "h-10 flex-1 rounded-control border border-neutral-200 bg-white px-3.5 text-sm text-ink-900 placeholder:text-neutral-400",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500",
            )}
          />
          <button
            type="submit"
            disabled={value.trim().length === 0}
            className={cn(
              "flex size-10 shrink-0 items-center justify-center rounded-control bg-accent-500 text-white transition-colors dur-base ease-out hover:bg-accent-600 active:bg-accent-700",
              "disabled:cursor-not-allowed disabled:opacity-50",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2",
            )}
          >
            <ArrowRightIcon className="size-4" />
            <span className="sr-only">Send message</span>
          </button>
        </form>
      </div>
    </>
  );
}
