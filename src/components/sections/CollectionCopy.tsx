import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import type { BriefLink, Collection } from "@/data/campaigns";
import type { Perch } from "@/data/seasonScenes";
import { ExternalIcon } from "@/components/shared/ExternalLink";

// The pieces of a brief that every band shares, whichever way the band around
// them is built: the display face settings, the outline that white type on a
// pale ground needs, the script line, and the copy with her hyperlinks spliced
// back in. Collections (the tab strip and the collaboration bands) and
// SeasonBand (the 1:1 seasonal rebuilds) both draw from here.

export const WONK = { fontVariationSettings: '"SOFT" 0, "WONK" 1' } as const;

// `paint-order: stroke fill` puts the stroke UNDER the fill, so the letterform
// keeps its full weight and only gains an edge — a plain text-stroke is drawn
// centred and eats into thin strokes like the script face's.
export const outlined = (on?: boolean) =>
  on
    ? ({
        WebkitTextStrokeWidth: "clamp(1.5px, 0.035em, 4px)",
        WebkitTextStrokeColor: "var(--ejd-ink)",
        paintOrder: "stroke fill",
      } as const)
    : null;

// A brief row's copy, with the names her deck hyperlinks turned into links.
//
// The copy stays ONE plain string in the data so it can be diffed against her
// deck word for word; the links are declared beside it and spliced in here.
// Each `text` must appear exactly once — if it does not, the row renders as
// plain copy rather than guessing, because a wrong split would mangle her
// sentence.
export function withLinks(body: string, links?: readonly BriefLink[]) {
  if (!links?.length) return body;

  let parts: (string | BriefLink)[] = [body];
  for (const link of links) {
    const next: (string | BriefLink)[] = [];
    for (const part of parts) {
      if (typeof part !== "string") {
        next.push(part);
        continue;
      }
      const at = part.indexOf(link.text);
      if (at < 0) {
        next.push(part);
        continue;
      }
      next.push(part.slice(0, at), link, part.slice(at + link.text.length));
    }
    parts = next;
  }

  return parts.map((part, i) =>
    typeof part === "string" ? (
      part
    ) : (
      <a
        key={part.href + i}
        href={part.href}
        target="_blank"
        rel="noreferrer"
        className="font-semibold underline underline-offset-4"
      >
        {part.text}
        <ExternalIcon className="ml-[0.25em]" />
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    ),
  );
}

export function Nutshell({
  collection,
  className = "",
  style,
}: {
  collection: Collection;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span
      className={`block pb-1 font-script text-base normal-case tracking-normal sm:pb-2 sm:text-2xl ${className}`}
      style={{
        color: collection.display,
        ...outlined(collection.outlineDisplay),
        ...style,
      }}
    >
      In a nutshell
    </span>
  );
}

// Her third slide: the posts the launch produced, in the same card chrome the
// National Launch wall uses (Ellie, 2026-09-11). It sits inside the panel, on
// the collection's own ground, so it reads as the last part of that band
// rather than a separate section. A `perch` is something drawn to sit on a
// card's rim — the two frogs on Holiday's frames (Bart, 2026-09-13).
export function PostGrid({
  cards,
  ground,
  perches,
  phoneOnlyBefore = 0,
}: {
  cards: ReactNode[];
  ground: string;
  perches?: Perch[];
  /** The first N cards show only on a phone — wider, the band seats them in
   *  its own composition instead. */
  phoneOnlyBefore?: number;
}) {
  return (
    <ul
      className="grid grid-cols-1 gap-6 px-6 pb-12 pt-12 sm:grid-cols-3 sm:px-14 sm:pb-16"
      style={{ backgroundColor: ground }}
    >
      {cards.map((card, i) => (
        <li
          key={i}
          className={`relative ${i < phoneOnlyBefore ? "sm:hidden" : ""}`}
        >
          {card}
          {perches
            ?.filter((perch) => perch.post === i)
            .map((perch) => (
              // Feet on the frame's outer edge, which is the li's own top —
              // the card's margin is exactly its ring. `hang` drops it in.
              <Image
                key={perch.src}
                src={perch.src}
                alt=""
                width={perch.px[0]}
                height={perch.px[1]}
                aria-hidden
                draggable={false}
                className="pointer-events-none absolute z-10 h-auto max-w-none select-none"
                style={{
                  left: `${perch.x}%`,
                  bottom: "100%",
                  width: `${perch.w}%`,
                  transform: `translateY(${perch.hang * 100}%)${perch.flip ? " scaleX(-1)" : ""}`,
                }}
              />
            ))}
        </li>
      ))}
    </ul>
  );
}
