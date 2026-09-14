"use client";

import Image from "next/image";
import { useState } from "react";
import type { Collection } from "@/data/campaigns";
import { PostCard, PostPlaceholder } from "@/components/shared/PostCard";
import { InstagramEmbed } from "@/components/shared/InstagramEmbed";
import {
  Nutshell,
  PostGrid,
  WONK,
  outlined,
  withLinks,
} from "./CollectionCopy";
import { RedditEmbed } from "@/components/shared/RedditEmbed";
import { SeasonBand } from "./SeasonBand";

// The Campaigns page and the Collaborations page: one component, two tabs. They
// used to be a light page and a dark one; since 2026-09-11 they share a look, so
// what tells them apart is the work in them.
//
// Cards select; the view box below is the band that collection gets in Ellie's
// deck. The five seasons are rebuilt 1:1 from measurements (SeasonBand). The
// collaboration bands still compose themselves the older way: her ground
// colour, "<NAME> BRIEF" in display caps, "In a nutshell" in script beside it,
// then the labelled rows she actually wrote, with her own illustration floated
// large and low-contrast behind the copy.
//
// One selection at a time, arrow-key navigable — it behaves like a tablist, so
// it is built as one.

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

// Collaborations used to run on its own dark tone, as the inverse of the
// seasonal page. Ellie asked for the two to share a look once Collaborations
// became a tab of its own (2026-09-11), so both pages now take LIGHT_TONE and
// the inverse is gone. The burnt-orange version is in git history if the pages
// ever need telling apart again.

type Props = {
  title: string;
  intro: string;
  items: Collection[];
  tone: Tone;
};

// Her own band artwork, placed where she places it: the rose spray down
// Valentine's right edge, the flower border along Spring's bottom, apples across
// Fall's top, lights strung over Holiday, the coaster and the FAIR FOOD sign
// under Summer. All of it is decorative, so it sits behind the copy and out of
// the accessibility tree. Bands with no artwork of their own fall back to their
// single motif in the top-right corner.
function Frame({ collection }: { collection: Collection }) {
  const pieces = collection.frame ?? [
    {
      src: collection.motif,
      className: "-right-8 -top-8 h-40 rotate-12 sm:h-64 w-auto",
    },
  ];

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

export function Collections({ title, intro, items, tone }: Props) {
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

  // Her third slide: the posts the launch produced, one card each in the
  // chrome the National Launch wall uses (Ellie, 2026-09-11). Where a card
  // goes is the band's call: a season slots them into its composition or grids
  // them under it (SeasonBand); a collaboration grids them. A post with no
  // link yet gets the launch wall's labelled placeholder, so the row holds its
  // shape until the link lands.
  const cards = (current.posts ?? []).map((post) => (
    <PostCard
      key={post.post ?? post.reddit ?? post.placeholder}
      handle={post.handle}
      caption={post.caption}
      href={post.post || post.reddit || undefined}
      linkLabel={post.reddit ? "View on Reddit" : undefined}
      media={
        post.post ? (
          <InstagramEmbed
            post={post.post}
            title={`${post.handle} on Instagram`}
            aspect={post.aspect}
          />
        ) : post.reddit ? (
          <RedditEmbed url={post.reddit} title={`${post.handle} on Reddit`} />
        ) : post.image ? (
          <Image
            src={post.image.src}
            alt={post.image.alt}
            width={900}
            height={1125}
            className="block h-auto w-full"
          />
        ) : (
          <PostPlaceholder label={post.placeholder ?? current.label} />
        )
      }
    />
  ));

  return (
    <section
      id="campaigns"
      className="w-full px-5 py-16 sm:px-10 sm:py-24"
      style={{ backgroundColor: tone.ground }}
    >
      <div className="mx-auto w-full max-w-6xl">
        {/* Centred, as Ellie asked (2026-09-11), so the page opens the way
            every heading on About does rather than ranged left on its own. The
            intro follows it into the centre column; ranged-left copy under a
            centred title reads as two different pages stacked. */}
        <h1
          className="text-center font-display font-black uppercase leading-[0.84] tracking-[-0.03em]"
          style={{
            ...WONK,
            color: tone.display,
            fontSize: "clamp(2.5rem,8vw,6rem)",
          }}
        >
          {title}
        </h1>

        <p
          className="mx-auto mt-6 max-w-[62ch] text-center text-base leading-relaxed sm:text-xl"
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
                className="group flex min-h-[5rem] flex-col items-center justify-center gap-2 p-4 transition-transform hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{
                  // The selected card wears its own collection's colours, so
                  // the row previews the palette the view box is about to open in.
                  backgroundColor: active ? c.ground : tone.card,
                  color: active ? c.body : tone.body,
                  // The same framed treatment as the view box, at card scale:
                  // hairline, ring, hairline. The selected card rings itself in
                  // its collection's display colour.
                  border: `var(--mv-stroke) solid ${tone.line}`,
                  boxShadow: `0 0 0 5px ${active ? c.display : tone.card}, 0 0 0 7px ${tone.line}`,
                  borderRadius: 16,
                }}
              >
                <span
                  className="text-center font-display text-base font-black uppercase leading-[0.95] tracking-[-0.01em] sm:text-xl"
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
          className={`relative isolate ${
            current.art?.stones
              ? "overflow-visible"
              : "overflow-hidden rounded-lg"
          }`}
          style={
            current.art?.stones
              ? {
                  // A band that brings its own frame — DCC's stones — takes
                  // the panel bare: no ring, square corners, the stones flush
                  // to the edge (Bart, 2026-09-13).
                  backgroundColor: current.ground,
                  borderRadius: 0,
                  marginTop:
                    "calc(var(--mv-frame) + var(--mv-stroke) + 1.25rem)",
                }
              : {
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
                  marginTop:
                    "calc(var(--mv-frame) + var(--mv-stroke) + 1.25rem)",
                }
          }
        >
          {current.art ? (
            // The five seasons: her band, measured and rebuilt. See SeasonBand.
            <SeasonBand collection={current} art={current.art} cards={cards} />
          ) : (
            <>
              {/* The brief section. It is the artwork's positioning context, not
              the panel — with a product lineup below, "centred in the panel"
              and "centred in the brief" are very different places, and the deck
              means the second. */}
              <div
                className={`relative ${PANEL_PADDING[current.layout.reserve ?? "none"]} ${
                  current.showcase
                    ? "pb-0"
                    : PANEL_BOTTOM[current.layout.reserve ?? "none"]
                }`}
              >
                <Frame collection={current} />

                <div
                  className={`relative ${current.layout.align === "center" ? "text-center" : ""}`}
                >
                  {/* Holiday hangs the script line ABOVE its heading. */}
                  {current.layout.nutshell === "above" && (
                    <Nutshell collection={current} />
                  )}

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
                      fontSize: "clamp(2.25rem,6vw,4.5rem)",
                    }}
                  >
                    {(() => {
                      const lines = current.layout.headingLines ?? [
                        current.briefTitle,
                      ];
                      return lines.map((line, i) => {
                        const last = i === lines.length - 1;
                        if (last && current.layout.nutshell === "inline") {
                          return (
                            <span
                              key={line}
                              className="flex w-full items-end justify-between gap-8"
                            >
                              <span className="whitespace-nowrap">{line}</span>
                              <Nutshell
                                collection={current}
                                className="shrink-0"
                              />
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

                  {current.layout.nutshell === "below" && (
                    <Nutshell collection={current} />
                  )}
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
                      art.side === "left"
                        ? "float-left mr-6"
                        : "float-right ml-6"
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
                    <div key={row.label} className="text-base leading-relaxed">
                      <dt
                        className="inline font-semibold"
                        style={{ color: current.body }}
                      >
                        {row.label}:{" "}
                      </dt>
                      <dd className="inline" style={{ color: current.body }}>
                        {withLinks(row.body, row.links)}
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
                    style={{
                      ...WONK,
                      color: current.display,
                      fontSize: "clamp(1.75rem,5.4vw,4rem)",
                    }}
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
                  // The crop's real height, so `h-auto` lands on its true shape.
                  height={current.showcase.height ?? 865}
                  loading="eager"
                  className="relative -mb-px block h-auto w-full"
                />
              )}
            </>
          )}

          {!current.art && cards.length > 0 && (
            <PostGrid cards={cards} ground={current.ground} />
          )}
        </div>
      </div>
    </section>
  );
}
