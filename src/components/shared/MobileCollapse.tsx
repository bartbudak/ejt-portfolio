"use client";

import { useRef, useState, type ReactNode } from "react";

// On a phone, a card folds down to one row — a tiny preview, its title and a
// line of its copy — and opens on a tap (Bart, 2026-09-15). From the small
// breakpoint up the full card renders as it always did and the row is not
// there at all.
//
// One DOM for both: the row is `sm:hidden`, the full card `max-sm:hidden`
// until opened. Nothing is rendered twice, and because the full card sits in
// display:none until it is opened, its lazy media (the Instagram embeds, the
// award pictures) is not fetched for cards nobody opens.

const WONK = { fontVariationSettings: '"SOFT" 0, "WONK" 1' } as const;

export function MobileCollapse({
  thumb,
  title,
  blurb,
  framed = true,
  children,
}: {
  /** What sits in the 3.5rem square at the left: a picture, a letter, a number. */
  thumb: ReactNode;
  title: string;
  blurb?: string;
  /** The row draws its own small frame unless the card around it already has one. */
  framed?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const rowRef = useRef<HTMLButtonElement>(null);

  // An opened card is taller than the screen, so by the time someone has
  // read it the row that opened it is off the top. A close control sits under
  // the card too, and closing brings the row back into view so the page does
  // not appear to jump to nowhere (Bart, 2026-09-15).
  const close = () => {
    setOpen(false);
    requestAnimationFrame(() =>
      rowRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" }),
    );
  };

  return (
    <div>
      <button
        ref={rowRef}
        type="button"
        aria-expanded={open}
        onClick={() => (open ? close() : setOpen(true))}
        className={`flex w-full items-center gap-3 text-left sm:hidden ${
          framed ? "rounded-[14px] p-2.5" : ""
        }`}
        style={
          framed
            ? {
                backgroundColor: "var(--mv-paper)",
                border: "var(--mv-stroke) solid var(--ejd-ink)",
                color: "var(--ejd-ink)",
              }
            : { color: "var(--ejd-ink)" }
        }
      >
        <span
          className="relative grid h-14 w-14 flex-none place-items-center overflow-hidden rounded-[10px]"
          style={{
            backgroundColor: "var(--ejd-blush)",
            border: "var(--mv-stroke) solid var(--ejd-ink)",
          }}
        >
          {thumb}
        </span>
        <span className="min-w-0 flex-1">
          <span
            // A long single word — an Instagram handle — drops a size so it
            // fits the column whole instead of breaking mid-word.
            className={`block break-words font-display font-black uppercase leading-[0.95] tracking-[-0.01em] ${
              title.length > 14
                ? "text-xs"
                : title.length > 12
                  ? "text-sm"
                  : "text-base"
            }`}
            style={{ ...WONK, color: "var(--ejd-vermilion)" }}
          >
            {title}
          </span>
          {blurb && (
            // On a bare card the row is the head and the body follows it,
            // so the teaser goes once the body is showing.
            <span
              className={`mt-1 line-clamp-2 block text-sm leading-snug opacity-80 ${
                !framed && open ? "hidden" : ""
              }`}
            >
              {blurb}
            </span>
          )}
        </span>
        <svg
          aria-hidden
          viewBox="0 0 20 20"
          className={`h-5 w-5 flex-none transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 8l5 5 5-5" />
        </svg>
      </button>

      <div className={open ? "mt-3" : "max-sm:hidden"}>{children}</div>

      {open && (
        <button
          type="button"
          onClick={close}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-[14px] py-2.5 font-mono text-xs font-bold uppercase tracking-[0.14em] sm:hidden"
          style={{
            backgroundColor: "var(--mv-paper)",
            border: "var(--mv-stroke) solid var(--ejd-ink)",
            color: "var(--ejd-ink)",
          }}
        >
          Close
          <svg
            aria-hidden
            viewBox="0 0 20 20"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12l5-5 5 5" />
          </svg>
        </button>
      )}
    </div>
  );
}
