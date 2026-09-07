import type { ReactNode } from "react";

// The post card both launch sections use: our own chrome — avatar, handle, then
// a caption where Instagram puts one — wrapped in the Maeve frame. National
// Launch fills the media slot with a cropped Instagram embed; Local Launch fills
// it with a photograph from her deck. Same card either way, so the two sections
// read as one wall.

const WONK = { fontVariationSettings: '"SOFT" 0, "WONK" 1' } as const;

const FRAME: React.CSSProperties = {
  border: "var(--mv-stroke) solid var(--ejd-ink)",
  boxShadow:
    "0 0 0 var(--mv-frame) var(--ejd-vermilion), 0 0 0 calc(var(--mv-frame) + var(--mv-stroke)) var(--ejd-ink)",
  borderRadius: 20,
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
  caption: ReactNode;
  media: ReactNode;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div style={FRAME} className="flex h-full flex-col overflow-hidden">
      <div
        className="flex items-center gap-2 px-3 py-2"
        style={{ borderBottom: "var(--mv-stroke) solid var(--ejd-ink)" }}
      >
        <span
          aria-hidden
          className="grid h-7 w-7 flex-none place-items-center rounded-full font-display text-xs font-black"
          style={{
            backgroundColor: "var(--ejd-vermilion)",
            color: "var(--ejd-marigold)",
            border: "var(--mv-stroke) solid var(--ejd-ink)",
            ...WONK,
          }}
        >
          {handle.replace(/^@/, "").charAt(0).toUpperCase()}
        </span>
        <span
          className="min-w-0 flex-1 truncate text-base font-bold"
          style={{ color: "var(--ejd-ink)" }}
        >
          {handle}
        </span>
      </div>

      {media}

      <div
        className="flex flex-1 flex-col px-3 py-3"
        style={{
          borderTop: "var(--mv-stroke) solid var(--ejd-ink)",
          color: "var(--ejd-ink)",
        }}
      >
        <p className="flex-1 text-base leading-snug">{caption}</p>
        {href && (
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            // Was 0.6rem at 60% opacity — 4.1:1 and a 14px tap target, the
            // smallest on the page. Full ink, bolder, and padded out to a
            // reachable height.
            className="-mx-1 mt-1 inline-block px-1 py-2 font-mono text-xs font-bold uppercase tracking-[0.12em] underline underline-offset-4 opacity-80 hover:opacity-100"
          >
            {linkLabel} ↗
          </a>
        )}
      </div>
    </div>
  );
}
