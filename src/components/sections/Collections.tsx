"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Collection } from "@/data/campaigns";

// The Campaigns page, and its inverse for collaborations — same machinery, two
// palettes.
//
// Cards select; the view box below recreates the band that collection gets in
// Ellie's deck: her ground colour, "<NAME> BRIEF" in display caps, "In a
// nutshell" in script beside it, then the labelled rows she actually wrote. The
// motif is her own illustration, floated large and low-contrast behind the
// copy the way the deck scatters roses, apples and string lights through each
// band.
//
// One selection at a time, arrow-key navigable — it behaves like a tablist, so
// it is built as one.

const WONK = { fontVariationSettings: '"SOFT" 0, "WONK" 1' } as const;

// `paint-order: stroke fill` puts the stroke UNDER the fill, so the letterform
// keeps its full weight and only gains an edge — a plain text-stroke is drawn
// centred and eats into thin strokes like the script face's.
const outlined = (on?: boolean) =>
  on
    ? ({
        WebkitTextStrokeWidth: "clamp(1.5px, 0.035em, 4px)",
        WebkitTextStrokeColor: "var(--ejd-ink)",
        paintOrder: "stroke fill",
      } as const)
    : null;

type Tone = {
  /** Page ground. */
  ground: string;
  /** Display type on that ground. */
  display: string;
  /** Body copy on that ground. */
  body: string;
  /** Face of an unselected card. */
  card: string;
  /**
   * Ring around an UNSELECTED card. It has to differ from `card`, or the
   * frame device (hairline · ring · hairline) collapses into a plain slab —
   * which is exactly why the yellow tabs read as flat. Derived from `card`
   * rather than fixed, so it follows whatever the theme makes of it.
   */
  rest: string;
  /** Rule and card border. */
  line: string;
};

export const LIGHT_TONE: Tone = {
  ground: "var(--mv-paper)",
  display: "var(--ejd-vermilion)",
  body: "var(--ejd-ink)",
  card: "var(--ejd-marigold)",
  rest: "color-mix(in oklab, var(--ejd-marigold) 78%, var(--ejd-ink))",
  line: "var(--ejd-ink)",
};

// The inverse, warm rather than dark. Flipping paper to near-black was a value
// inversion — technically the opposite, but it dropped a hole in the middle of a
// palette that has no black in it. Burnt orange is one of her own deck grounds
// (it carries the Fall band), so the page still reads as the negative of the
// seasonal one — dark ground, light type — without leaving her colour world.
// Alternatives if this is still too much: `--ejd-deep` (#7a1a00, a cocoa that
// sits closer to brown) or `--ejd-vermilion` (louder, but it then collides with
// the Contact band below).
export const DARK_TONE: Tone = {
  ground: "var(--ejd-burnt)",
  display: "var(--ejd-marigold)",
  body: "var(--mv-paper)",
  card: "var(--ejd-deep)",
  rest: "color-mix(in oklab, var(--ejd-deep) 78%, var(--mv-paper))",
  line: "var(--mv-paper)",
};

type Props = {
  title: string;
  intro: string;
  items: Collection[];
  tone: Tone;
  /** The small italic link under the title, pointing at the other page. */
  crossLink: { href: string; label: string };
};

function Nutshell({ collection, className = "" }: { collection: Collection; className?: string }) {
  return (
    <span
      className={`block pb-1 font-script text-sm normal-case tracking-normal sm:pb-2 sm:text-2xl ${className}`}
      style={{ color: collection.display, ...outlined(collection.outlineDisplay) }}
    >
      In a nutshell
    </span>
  );
}

// Her own band artwork, placed where she places it: the rose spray down
// Valentine's right edge, the flower border along Spring's bottom, apples across
// Fall's top, lights strung over Holiday, the coaster and the FAIR FOOD sign
// under Summer. All of it is decorative, so it sits behind the copy and out of
// the accessibility tree. Bands with no artwork of their own fall back to their
// single motif in the top-right corner.
function Frame({ collection }: { collection: Collection }) {
  const pieces =
    collection.frame ??
    [{ src: collection.motif, className: "-right-8 -top-8 h-40 rotate-12 sm:h-64 w-auto" }];

  return (
    <>
      {pieces.map((piece) => (
        <Image
          key={piece.src + piece.className}
          src={piece.src}
          alt=""
          width={1500}
          height={1500}
          aria-hidden
          loading="eager"
          className={`pointer-events-none absolute -z-10 max-w-none object-contain ${piece.className}`}
        />
      ))}
    </>
  );
}

// How much room the copy has to leave for that artwork.
const RESERVE: Record<string, string> = {
  right: "lg:max-w-[70%]",
  top: "",
  bottom: "",
  none: "",
};

// The heading row stops further short of the artwork than the copy does — in
// the deck the script line clears the roses by a wide margin while the body text
// runs almost up to the stem.
const HEADING_RESERVE: Record<string, string> = {
  right: "lg:max-w-[62%]",
  top: "",
  bottom: "",
  none: "",
};

const PANEL_PADDING: Record<string, string> = {
  right: "px-6 pt-12 sm:px-14 sm:pt-16",
  // Her artwork bleeds into these edges, so the band opens up to make room.
  top: "px-6 pt-24 sm:px-14 sm:pt-32",
  bottom: "px-6 pt-12 sm:px-14 sm:pt-16",
  none: "px-6 pt-12 sm:px-14 sm:pt-16",
};

const PANEL_BOTTOM: Record<string, string> = {
  right: "pb-12 sm:pb-14",
  top: "pb-12 sm:pb-16",
  bottom: "pb-32 sm:pb-44",
  none: "pb-12 sm:pb-16",
};

export function Collections({ title, intro, items, tone, crossLink }: Props) {
  const [open, setOpen] = useState(items[0].slug);
  const current = items.find((c) => c.slug === open) ?? items[0];

  const onKeyDown = (e: React.KeyboardEvent) => {
    const delta = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    const i = items.findIndex((c) => c.slug === open);
    const next = items[(i + delta + items.length) % items.length];
    setOpen(next.slug);
    document.getElementById(`collection-tab-${next.slug}`)?.focus();
  };

  return (
    <section
      id="campaigns"
      className="w-full px-5 py-16 sm:px-10 sm:py-24"
      style={{ backgroundColor: tone.ground }}
    >
      <div className="mx-auto w-full max-w-6xl">
        <h1
          className="font-display font-black uppercase leading-[0.84] tracking-[-0.03em]"
          style={{ ...WONK, color: tone.display, fontSize: "clamp(2.6rem,8vw,6rem)" }}
        >
          {title}
        </h1>

        {/* Sits directly under the title, deliberately quiet — it is a way
            across to the other half of the work, not a second heading. */}
        <Link
          href={crossLink.href}
          className="mt-3 inline-block text-sm italic underline underline-offset-4 opacity-80 transition-opacity hover:opacity-100 sm:text-base"
          style={{ color: tone.body }}
        >
          {crossLink.label}
        </Link>

        <p
          className="mt-6 max-w-[62ch] text-base leading-relaxed sm:text-lg"
          style={{ color: tone.body }}
        >
          {intro}
        </p>

        <div
          role="tablist"
          aria-label={title}
          onKeyDown={onKeyDown}
          className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3 sm:gap-6 lg:grid-cols-5"
        >
          {items.map((c) => {
            const active = c.slug === open;
            return (
              <button
                key={c.slug}
                id={`collection-tab-${c.slug}`}
                role="tab"
                type="button"
                aria-selected={active}
                aria-controls="collection-panel"
                tabIndex={active ? 0 : -1}
                onClick={() => setOpen(c.slug)}
                className={`group flex min-h-[5rem] flex-col items-center justify-center gap-2 p-4 transition-transform focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  active ? "-translate-y-1" : "hover:-translate-y-0.5"
                }`}
                style={{
                  // The selected card wears its own collection's colours, so
                  // the row previews the palette the view box is about to open in.
                  backgroundColor: active ? c.ground : tone.card,
                  color: active ? c.body : tone.body,
                  // The same framed treatment as the view box, at card scale:
                  // hairline, ring, hairline. The selected card rings itself in
                  // its collection's display colour; an unselected one rings
                  // itself in a shaded version of its own face, so the frame
                  // still reads as a frame instead of vanishing into the fill.
                  border: `var(--mv-stroke) solid ${tone.line}`,
                  boxShadow: [
                    `0 0 0 5px ${active ? c.display : tone.rest}`,
                    `0 0 0 7px ${tone.line}`,
                    // Selected sits proud and casts; unselected is pressed into
                    // the page. That is the depth cue doing the work of saying
                    // "on" and "off", so neither state has to go flat or grey.
                    active
                      ? `0 6px 0 -1px ${tone.line}`
                      : `inset 0 -4px 0 0 color-mix(in oklab, ${tone.line} 14%, transparent)`,
                  ].join(", "),
                  borderRadius: 14,
                }}
              >
                {/* Every card carries its collection's colour as a swatch, so
                    an unselected one still has an identity rather than being an
                    anonymous yellow box. On selection the swatch flips to the
                    display colour — the ground it was showing has become the
                    whole card, so the chip shows the other half of the pair. */}
                <span
                  aria-hidden
                  className="block h-2 w-8 rounded-full"
                  style={{
                    backgroundColor: active ? c.display : c.ground,
                    border: `1.5px solid ${tone.line}`,
                  }}
                />
                <span
                  className="text-center font-display text-base font-black uppercase leading-[0.95] tracking-[-0.01em] sm:text-lg"
                  style={WONK}
                >
                  {c.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* The view box — one of her deck's bands, rebuilt. Each band is
            arranged differently in her Canva, so the heading alignment, the
            place "In a nutshell" sits, and the motif treatment all come from
            the collection's own `layout` rather than a shared template. */}
        <div
          id="collection-panel"
          role="tabpanel"
          aria-labelledby={`collection-tab-${current.slug}`}
          // The panel is a bare frame; the brief section inside it carries the
          // padding and the product lineup runs full-bleed beneath it.
          className="relative isolate mt-4 overflow-hidden rounded-lg"
          style={{
            backgroundColor: current.ground,
            // The Maeve frame from the compare section — soft-black hairline, a
            // 7px ring, then a second hairline outside it — but ringed in the
            // collection's own display colour rather than Maeve's red, so each
            // band is framed in its own palette.
            border: "var(--mv-stroke) solid var(--ejd-ink)",
            boxShadow: `0 0 0 var(--mv-frame) ${current.display}, 0 0 0 calc(var(--mv-frame) + var(--mv-stroke)) var(--ejd-ink)`,
            borderRadius: 28,
            // The ring is drawn outside the border box, so the panel has to hold
            // it off its neighbours itself.
            margin: "calc(var(--mv-frame) + var(--mv-stroke))",
            marginTop: "calc(var(--mv-frame) + var(--mv-stroke) + 1.25rem)",
          }}
        >
          {/* The brief section. It is the artwork's positioning context, not
              the panel — with a product lineup below, "centred in the panel"
              and "centred in the brief" are very different places, and the deck
              means the second. */}
          <div
            className={`relative ${PANEL_PADDING[current.layout.reserve ?? "none"]} ${
              current.showcase ? "pb-0" : PANEL_BOTTOM[current.layout.reserve ?? "none"]
            }`}
          >
            <Frame collection={current} />

          <div
            className={`relative ${current.layout.align === "center" ? "text-center" : ""}`}
          >
            {/* Holiday hangs the script line ABOVE its heading. */}
            {current.layout.nutshell === "above" && <Nutshell collection={current} />}

            {/* The heading carries the same width limit as the copy, so neither
                runs under the framing artwork. The script line rides on the LAST
                heading line and is pushed to that column's right edge — in the
                deck it sits beside the short second word ("BRIEF"), not out past
                the longest line. */}
            <h2
              className={`font-display font-black uppercase leading-[0.86] tracking-[-0.02em] ${
                HEADING_RESERVE[current.layout.reserve ?? "none"]
              } ${current.layout.align === "center" ? "mx-auto" : ""}`}
              style={{
                ...WONK,
                ...outlined(current.outlineDisplay),
                color: current.display,
                fontSize: "clamp(2.2rem,6vw,4.6rem)",
              }}
            >
              {(() => {
                const lines = current.layout.headingLines ?? [current.briefTitle];
                return lines.map((line, i) => {
                  const last = i === lines.length - 1;
                  if (last && current.layout.nutshell === "inline") {
                    return (
                      <span key={line} className="flex w-full items-end justify-between gap-8">
                        <span className="whitespace-nowrap">{line}</span>
                        <Nutshell collection={current} className="shrink-0" />
                      </span>
                    );
                  }
                  return (
                    <span key={line} className="block whitespace-nowrap">
                      {line}
                    </span>
                  );
                });
              })()}
            </h2>

            {current.layout.nutshell === "below" && <Nutshell collection={current} />}
          </div>

          {/* She indents the body block well in from the heading on every band,
              and never runs it the full width of the panel. */}
          {/* In the flow, not behind it: floating the artwork with
              `shape-outside` pointed at the same PNG makes the copy wrap to the
              petals and the stem rather than stopping at a rectangular column.
              The browser reads the alpha channel, so the silhouette is exact and
              costs no script. */}
          {current.floatArt?.map((art) => (
            <Image
              key={art.src}
              src={art.src}
              alt=""
              width={760}
              height={1312}
              aria-hidden
              loading="eager"
              className={`relative h-auto max-w-none ${
                art.side === "left" ? "float-left mr-6" : "float-right ml-6"
              } ${art.className}`}
              style={{
                shapeOutside: `url(${art.src})`,
                shapeImageThreshold: 0.5,
                shapeMargin: art.shapeMargin,
              }}
            />
          ))}

          <dl
            // Flush with the heading, not indented from it. A band whose artwork
            // floats needs no column limit — the shape does that job, and a
            // max-width would just stop the text short of the silhouette.
            className={`relative mt-10 space-y-4 text-left ${
              current.floatArt
                ? // No measure cap when the artwork floats. The cap was the
                  // reason the wrap looked inert: at 68ch the copy stopped well
                  // short of the float and never met its shape at all. The
                  // float itself sets the measure here, and it runs the full
                  // height of the copy, so no line escapes it.
                  "max-w-none"
                : `max-w-[68ch] ${RESERVE[current.layout.reserve ?? "none"]}`
            }`}
          >
            {current.rows.map((row) => (
              <div key={row.label} className="text-sm leading-relaxed sm:text-base">
                <dt className="inline font-semibold" style={{ color: current.body }}>
                  {row.label}:{" "}
                </dt>
                <dd className="inline" style={{ color: current.body }}>
                  {row.body}
                </dd>
              </div>
            ))}
          </dl>

          {/* The collection's own logotype, then its product lineup — the half
              of the band that sits under the brief in her deck. The lineup is
              cropped from the deck itself and carries the same ground colour as
              the panel, so it reads as part of the band rather than a pasted-in
              picture. It is full-bleed because that is how she runs it. */}
          {current.wordmark && (
            <p
              // `clear-both` keeps the floated artwork contained to the brief:
              // a float does not extend its parent, so without this the rose ran
              // on past this logotype and into the lineup below.
              className={`relative clear-both mt-14 font-display font-black uppercase leading-none tracking-[-0.02em] ${
                current.layout.align === "center" ? "text-center" : ""
              }`}
              style={{ ...WONK, color: current.display, fontSize: "clamp(1.8rem,5.4vw,4rem)" }}
            >
              {current.wordmark}
            </p>
          )}

          </div>

          {/* Full-bleed and flush with the panel's floor, so the book down its
              left edge frames the scene the way it does in the deck. */}
          {current.showcase && (
            <Image
              src={current.showcase.src}
              alt={current.showcase.alt}
              width={1700}
              height={865}
              loading="eager"
              className="relative -mb-px block h-auto w-full"
            />
          )}
        </div>
      </div>
    </section>
  );
}
