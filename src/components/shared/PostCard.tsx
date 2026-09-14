import type { ReactNode } from "react";
import { ExternalIcon } from "@/components/shared/ExternalLink";
import { FRAME_ASPECT } from "@/components/shared/InstagramEmbed";

// The post card both launch sections use: our own chrome — avatar, handle, then
// a caption where Instagram puts one — wrapped in the Maeve frame. National
// Launch fills the media slot with a cropped Instagram embed; Local Launch fills
// it with a photograph from her deck. Same card either way, so the two sections
// read as one wall.
//
// Every size in here is in em, so the card scales with whatever font-size its
// wrapper sets: at the default 1rem it is the launch wall's card exactly as it
// was; inside a seasonal band the wrapper's size is a deck unit, so the card
// keeps her deck's proportions at any width (2026-09-13). The frame's hairline
// and ring stay in px — they are the site's frame system, not the card's.

const WONK = { fontVariationSettings: '"SOFT" 0, "WONK" 1' } as const;

/** The Maeve frame: hairline, ring, hairline. Also wraps a bare photograph
 *  where her deck puts one in a card's place (Summer's market shot). */
export const CARD_FRAME: React.CSSProperties = {
  border: "var(--mv-stroke) solid var(--ejd-ink)",
  boxShadow:
    "0 0 0 var(--mv-frame) var(--ejd-vermilion), 0 0 0 calc(var(--mv-frame) + var(--mv-stroke)) var(--ejd-ink)",
  borderRadius: "1.25em",
  margin: "calc(var(--mv-frame) + var(--mv-stroke))",
  backgroundColor: "var(--mv-paper)",
};

export function PostCard({
  handle,
  caption,
  media,
  href,
  linkLabel = "View on Instagram",
}: {
  handle: string;
  /** Optional: a card with only a handle, its media and the link is fine. */
  caption?: ReactNode;
  media: ReactNode;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div style={CARD_FRAME} className="flex h-full flex-col overflow-hidden">
      <div
        className="flex items-center gap-[0.5em] px-[0.75em] py-[0.5em]"
        style={{ borderBottom: "var(--mv-stroke) solid var(--ejd-ink)" }}
      >
        <span
          aria-hidden
          className="grid h-[1.75em] w-[1.75em] flex-none place-items-center rounded-full font-display font-black"
          style={{
            backgroundColor: "var(--ejd-vermilion)",
            color: "var(--ejd-marigold)",
            border: "var(--mv-stroke) solid var(--ejd-ink)",
            ...WONK,
          }}
        >
          <span className="text-[0.75em]">
            {handle
              .replace(/^(@|r\/)/, "")
              .charAt(0)
              .toUpperCase()}
          </span>
        </span>
        <span
          className="min-w-0 flex-1 truncate text-[1em] font-bold"
          style={{ color: "var(--ejd-ink)" }}
        >
          {handle}
        </span>
      </div>

      {media}

      {(caption || href) && (
        <div
          className="flex flex-1 flex-col px-[0.75em] py-[0.75em]"
          style={{
            borderTop: "var(--mv-stroke) solid var(--ejd-ink)",
            color: "var(--ejd-ink)",
          }}
        >
          {caption && (
            <p className="flex-1 text-[1em] leading-snug">{caption}</p>
          )}
          {href && (
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              // Was 0.6rem at 60% opacity — 4.1:1 and a 14px tap target, the
              // smallest on the page. Full ink, bolder, and padded out to a
              // reachable height.
              className="-mx-[0.25em] mt-[0.25em] inline-block px-[0.25em] py-[0.5em] font-mono text-[0.75em] font-bold uppercase tracking-[0.12em] underline underline-offset-4 opacity-80 hover:opacity-100"
            >
              {linkLabel}
              <ExternalIcon className="ml-[0.3em]" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          )}
        </div>
      )}
    </div>
  );
}

// The media slot while a post has no link yet: a labelled frame that holds the
// card's shape, rather than an empty one that reads as broken. National Launch
// has used it since the partner list arrived ahead of the links; the seasonal
// bands used it for every post until Ellie's links landed (2026-09-13).
export function PostPlaceholder({ label }: { label: string }) {
  return (
    <div
      className="flex flex-col justify-between gap-[1.5em] p-[1.25em]"
      style={{ aspectRatio: FRAME_ASPECT, color: "var(--ejd-ink)" }}
    >
      <span
        className="font-display text-[1.25em] font-black uppercase leading-[0.95]"
        style={WONK}
      >
        {label}
      </span>
      <span className="font-mono text-[0.75em] uppercase tracking-[0.14em] opacity-50">
        Awaiting post link
      </span>
    </div>
  );
}
