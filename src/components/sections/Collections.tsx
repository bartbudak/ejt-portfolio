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

function Nutshell({ collection }: { collection: Collection }) {
  return (
    <p
      className="font-script text-xl sm:text-2xl"
      style={{ color: collection.display }}
    >
      In a nutshell
    </p>
  );
}

// Her motif art, placed the way each band places it: Fall runs apples across
// the top, Spring borders the bottom with flowers, Holiday hangs lights from
// both top corners, Summer scatters stars. Decorative — behind the copy and out
// of the accessibility tree.
function Motifs({ collection }: { collection: Collection }) {
  const { motif, layout } = collection;
  const img = (className: string, key: string, flip = false) => (
    <Image
      key={key}
      src={motif}
      alt=""
      width={360}
      height={400}
      aria-hidden
      loading="eager"
      className={`pointer-events-none absolute -z-10 w-auto object-contain ${className}`}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    />
  );

  switch (layout.motifs) {
    case "top-row":
      return (
        <>
          {img("-top-6 left-[6%] h-16 -rotate-12 sm:h-24", "a")}
          {img("-top-8 left-[38%] h-20 rotate-6 sm:h-28", "b")}
          {img("-top-5 right-[10%] h-16 rotate-12 sm:h-24", "c", true)}
        </>
      );
    case "bottom-row":
      return (
        <>
          {img("-bottom-8 left-[4%] h-20 -rotate-6 sm:h-28", "a")}
          {img("-bottom-10 left-[36%] h-24 rotate-3 sm:h-32", "b")}
          {img("-bottom-8 right-[6%] h-20 rotate-12 sm:h-28", "c", true)}
        </>
      );
    case "corners":
      return (
        <>
          {img("-left-6 -top-6 h-24 -rotate-12 sm:h-36", "a")}
          {img("-right-6 -top-6 h-24 rotate-12 sm:h-36", "b", true)}
        </>
      );
    case "scatter":
      return (
        <>
          {img("-right-6 top-6 h-24 rotate-12 opacity-95 sm:h-36", "a")}
          {img("bottom-8 left-[2%] h-16 -rotate-12 opacity-80 sm:h-24", "b")}
          {img("right-[18%] -bottom-6 h-14 rotate-6 opacity-70 sm:h-20", "c")}
        </>
      );
    case "right":
    default:
      return img("-right-8 -top-8 h-40 rotate-12 sm:h-64", "a");
  }
}

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
          className="relative isolate mt-4 overflow-hidden rounded-lg px-6 py-12 sm:px-14 sm:py-16"
          style={{
            backgroundColor: current.ground,
            border: `var(--mv-stroke) solid ${tone.line}`,
          }}
        >
          <Motifs collection={current} />

          <div
            className={`relative ${current.layout.align === "center" ? "text-center" : ""}`}
          >
            {/* Holiday hangs the script line ABOVE its heading. */}
            {current.layout.nutshell === "above" && <Nutshell collection={current} />}

            <div
              className={`flex flex-wrap items-baseline gap-x-8 gap-y-1 ${
                current.layout.align === "center" ? "justify-center" : ""
              }`}
            >
              <h2
                className="font-display font-black uppercase leading-[0.86] tracking-[-0.02em]"
                style={{
                  ...WONK,
                  color: current.display,
                  fontSize: "clamp(1.9rem,5vw,3.6rem)",
                }}
              >
                {/* The deck breaks the long ones over two lines. */}
                {(current.layout.headingLines ?? [current.briefTitle]).map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h2>
              {current.layout.nutshell === "inline" && <Nutshell collection={current} />}
            </div>

            {current.layout.nutshell === "below" && <Nutshell collection={current} />}
          </div>

          {/* She indents the body block well in from the heading on every band,
              and never runs it the full width of the panel. */}
          <dl className="relative mt-10 max-w-[68ch] space-y-4 text-left sm:ml-[8%]">
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

          {current.wordmark && (
            <p
              className={`relative mt-12 font-display font-black uppercase leading-none tracking-[-0.02em] ${
                current.layout.align === "center" ? "text-center" : ""
              }`}
              style={{ ...WONK, color: current.display, fontSize: "clamp(1.6rem,4.5vw,3rem)" }}
            >
              {current.wordmark}
            </p>
          )}

          {/* Honesty marker: some rows were blank in her deck and are written
              here from the collection's imagery. Say so on the page rather than
              only in the source. */}
          {current.rows.some((r) => r.drafted) && (
            <p
              className="relative mt-8 font-mono text-[0.65rem] uppercase tracking-[0.14em] opacity-60 sm:ml-[8%]"
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
