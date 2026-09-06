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

type Tone = {
  /** Page ground. */
  ground: string;
  /** Display type on that ground. */
  display: string;
  /** Body copy on that ground. */
  body: string;
  /** Face of an unselected card. */
  card: string;
  /** Rule and card border. */
  line: string;
};

export const LIGHT_TONE: Tone = {
  ground: "var(--mv-paper)",
  display: "var(--ejd-vermilion)",
  body: "var(--ejd-ink)",
  card: "var(--ejd-marigold)",
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
      className={`block pb-1 font-script text-xl normal-case tracking-normal sm:pb-2 sm:text-2xl ${className}`}
      style={{ color: collection.display }}
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
  right: "px-6 pb-12 pt-12 sm:px-14 sm:pb-14 sm:pt-16",
  // Her artwork bleeds into these edges, so the band opens up to make room.
  top: "px-6 pb-12 pt-24 sm:px-14 sm:pb-16 sm:pt-32",
  bottom: "px-6 pb-32 pt-12 sm:px-14 sm:pb-44 sm:pt-16",
  none: "px-6 py-12 sm:px-14 sm:py-16",
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
          className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5"
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
                className="group flex min-h-[5rem] flex-col items-center justify-center gap-2 rounded-lg p-4 transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{
                  // The selected card wears its own collection's colours, so
                  // the row previews the palette the view box is about to open in.
                  backgroundColor: active ? c.ground : tone.card,
                  color: active ? c.body : tone.body,
                  border: `var(--mv-stroke) solid ${tone.line}`,
                }}
              >
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
          className={`relative isolate mt-4 overflow-hidden rounded-lg ${
            PANEL_PADDING[current.layout.reserve ?? "none"]
          }`}
          style={{
            backgroundColor: current.ground,
            // The deck frames each brief in its own display colour rather than a
            // neutral rule.
            border: `var(--mv-stroke) solid ${current.display}`,
          }}
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
          <dl
            // Flush with the heading, not indented from it.
            className={`relative mt-10 max-w-[68ch] space-y-4 text-left ${
              RESERVE[current.layout.reserve ?? "none"]
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
              className={`relative mt-14 font-display font-black uppercase leading-none tracking-[-0.02em] ${
                current.layout.align === "center" ? "text-center" : ""
              }`}
              style={{ ...WONK, color: current.display, fontSize: "clamp(1.8rem,5.4vw,4rem)" }}
            >
              {current.wordmark}
            </p>
          )}

          {current.showcase && (
            <Image
              src={current.showcase.src}
              alt={current.showcase.alt}
              width={1700}
              height={701}
              loading="eager"
              className="relative mt-6 block h-auto w-[calc(100%+3rem)] max-w-none -translate-x-6 sm:w-[calc(100%+7rem)] sm:-translate-x-14"
            />
          )}

          {/* Honesty marker: some rows were blank in her deck and are written
              here from the collection's imagery. Say so on the page rather than
              only in the source. */}
          {current.rows.some((r) => r.drafted) && (
            <p
              className="relative mt-8 font-mono text-[0.65rem] uppercase tracking-[0.14em] opacity-60"
              style={{ color: current.body }}
            >
              Draft copy — {current.rows.filter((r) => r.drafted).map((r) => r.label).join(", ")} pending Ellie&apos;s review
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
