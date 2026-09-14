"use client";

import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import type { Collection } from "@/data/campaigns";
import type { ArtLayer, BandArt, TextLayer } from "@/data/seasonScenes";
import { CARD_FRAME } from "@/components/shared/PostCard";
import {
  Nutshell,
  PostGrid,
  WONK,
  outlined,
  withLinks,
} from "./CollectionCopy";

// One seasonal band, rebuilt 1:1 from her deck (see seasonScenes.ts for the
// model and seasonArt.ts for the measurements).
//
// The whole band is a container, and every measurement is a deck unit turned
// into `cqw` — a hundredth of the band's width. So the composition is the same
// shape at 1100px as at 375px: the friends lean in from Fall's edges by the
// same fraction, the cranberry strings hang the same way, and the products sit
// exactly where she put them. The only thing that reflows is the copy.

/** Deck unit → container width unit. The deck canvas is 1024 wide. */
const u = (v: number) => `${((v / 1024) * 100).toFixed(3)}cqw`;
const pct = (v: number, of: number) => `${((v / of) * 100).toFixed(2)}%`;

/** A deck unit as the card's em, so a card in the stage keeps her proportions. */
const DECK_EM = u(16);

// A placed piece of artwork. Decorative throughout: the products are named in
// the copy and the alt text of the tab, so none of this needs to be read out.
function Art({ layer, origin = 0 }: { layer: ArtLayer; origin?: number }) {
  const box: CSSProperties = {
    left: u(layer.x),
    top: u(layer.y - origin),
    width: u(layer.w),
    height: u(layer.h),
  };

  if (layer.frame) {
    // A photograph in a card's place: the post card's frame around it, the
    // picture filling the frame. The ring is drawn outside the box, so the
    // box stays where she put the picture.
    return (
      <div
        aria-hidden
        className="pointer-events-none absolute overflow-hidden"
        style={{ ...CARD_FRAME, ...box, margin: 0, fontSize: DECK_EM }}
      >
        <Image
          src={layer.src}
          alt=""
          width={layer.px[0]}
          height={layer.px[1]}
          draggable={false}
          className="h-full w-full select-none object-cover"
        />
      </div>
    );
  }

  const style: CSSProperties = {
    ...box,
    transform: layer.rot ? `rotate(${layer.rot}deg)` : undefined,
    // Her crop, as an inset on the box. The box itself is not clipped, so a
    // rotated element keeps its corners.
    clipPath: layer.clip
      ? `inset(${pct(layer.clip[1], layer.h)} ${pct(layer.clip[2], layer.w)} ${pct(layer.clip[3], layer.h)} ${pct(layer.clip[0], layer.w)})`
      : undefined,
  };
  return (
    <Image
      src={layer.src}
      alt=""
      width={layer.px[0]}
      height={layer.px[1]}
      aria-hidden
      draggable={false}
      className="pointer-events-none absolute max-w-none select-none"
      style={style}
    />
  );
}

// A logotype she set as text. Fraunces stands in for her Benguiat, so it is
// wider than her box; the left edge (or centre) is what is held.
function Logotype({ layer, origin }: { layer: TextLayer; origin: number }) {
  return (
    <p
      className="absolute m-0 whitespace-nowrap font-display font-black uppercase leading-none tracking-[-0.02em]"
      style={{
        ...WONK,
        left: u(layer.x),
        top: u(layer.y - origin),
        fontSize: u(layer.size),
        color: layer.color,
        transform: layer.align === "center" ? "translateX(-50%)" : undefined,
      }}
    >
      {layer.text}
    </p>
  );
}

function Brief({ collection, art }: { collection: Collection; art: BandArt }) {
  const g = art.brief;
  const centered = g.headingX === undefined;

  const heading = (
    <h2
      className={`m-0 whitespace-nowrap font-display font-black uppercase leading-[0.86] tracking-[-0.02em] ${
        centered ? "text-center" : ""
      }`}
      style={{
        ...WONK,
        ...outlined(collection.outlineDisplay),
        color: collection.display,
        fontSize: u(g.headingSize),
        marginLeft: centered ? undefined : u(g.headingX!),
        marginTop: g.nutshell.at === "above" ? u(g.nutshell.gap) : undefined,
      }}
    >
      {collection.briefTitle}
    </h2>
  );

  // Her script on the canvas sits in a 44pt box; Beth Ellen runs wide, so it
  // comes down a step to hold her line length and clear the corner flowers.
  const script = (extra: CSSProperties = {}) => (
    <Nutshell
      collection={collection}
      className="whitespace-nowrap pb-0 sm:pb-0"
      style={{ fontSize: u(40), lineHeight: 1, ...extra }}
    />
  );

  return (
    <div
      className="relative"
      style={{ paddingTop: u(g.top), paddingBottom: u(g.stageGap) }}
    >
      {art.edges?.map((layer, i) => (
        <Art key={layer.name + i} layer={layer} />
      ))}

      <div className="relative">
        {g.nutshell.at === "above" && script({ textAlign: "center" })}

        {g.nutshell.at === "inline" ? (
          // Beside the heading, at her x, centred on the heading's height.
          <div className="relative">
            {heading}
            <div
              className="absolute top-1/2 -translate-y-1/2"
              style={{ left: u(g.nutshell.x!) }}
            >
              {script()}
            </div>
          </div>
        ) : (
          heading
        )}

        {g.nutshell.at === "below" &&
          script({
            marginTop: u(g.nutshell.gap),
            marginLeft:
              g.nutshell.x !== undefined ? u(g.nutshell.x) : undefined,
            textAlign: g.nutshell.x === undefined ? "center" : undefined,
          })}
      </div>

      <dl
        className="relative m-0"
        style={{
          paddingLeft: u(g.copy.left),
          paddingRight: u(g.copy.right),
          marginTop: u(g.copy.gap),
          // Her 16pt Futura on the 1024 canvas, held between readable bounds so
          // a phone does not get 6px copy and a wide panel does not get 20px.
          fontSize: `clamp(0.9375rem, ${u(16)}, 1.125rem)`,
          lineHeight: 1.36,
          color: collection.body,
        }}
      >
        {collection.rows.map((row, i) => (
          <div
            key={row.label}
            style={{
              marginTop: i > 0 && g.copy.paragraphGap ? "1.36em" : undefined,
            }}
          >
            <dt className="inline font-semibold">{row.label}: </dt>
            <dd className="m-0 inline">{withLinks(row.body, row.links)}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function SeasonBand({
  collection,
  art,
  cards,
}: {
  collection: Collection;
  art: BandArt;
  /** The band's post cards, in order. Slotted into the stage where her deck
   *  puts them, otherwise gridded beneath it with the frogs on their rims. */
  cards: ReactNode[];
}) {
  const { stage, strip } = art;

  // Art that reaches above the stage's origin — the tips of Fall's leaves, the
  // reindeer's antlers — must not be cut, so the stage box starts as high as
  // its highest layer and holds its layers where they were.
  const reach = Math.max(0, ...stage.layers.map((l) => stage.origin - l.y));
  const origin = stage.origin - reach;

  const slots = stage.posts ?? [];
  const slotted = cards.slice(0, slots.length);
  const gridded = cards.slice(slots.length);

  return (
    <div className="@container relative">
      {strip && (
        // Her bookmark ribbon at the top, then the book's binding tiled the
        // rest of the way down — the deck runs the binding the full page.
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0"
          style={{
            width: u(strip.w),
            backgroundImage: `url(${strip.tile})`,
            backgroundSize: "100% auto",
            backgroundRepeat: "repeat-y",
          }}
        >
          <Image
            src={strip.src}
            alt=""
            width={strip.px[0]}
            height={strip.px[1]}
            draggable={false}
            className="absolute left-0 max-w-none select-none"
            style={{ top: u(-9), width: u(strip.w), height: u(strip.h) }}
          />
        </div>
      )}

      <Brief collection={collection} art={art} />

      <div
        className="relative overflow-hidden"
        style={{ height: u(stage.height + reach), marginTop: u(-reach) }}
      >
        {stage.layers.map((layer, i) => (
          <Art key={layer.name + i} layer={layer} origin={origin} />
        ))}
        {stage.text?.map((layer) => (
          <Logotype key={layer.text} layer={layer} origin={origin} />
        ))}
        {slotted.map((card, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: u(slots[i].x),
              top: u(slots[i].y - origin),
              width: u(slots[i].w),
              fontSize: DECK_EM,
            }}
          >
            {card}
          </div>
        ))}
      </div>

      {gridded.length > 0 && (
        // The grid clears the strip; in her deck the first card starts just
        // past the ribbon's edge.
        <div
          className="relative"
          style={strip ? { paddingLeft: u(strip.w) } : undefined}
        >
          <PostGrid
            cards={gridded}
            ground={collection.ground}
            perches={art.perches}
          />
        </div>
      )}
    </div>
  );
}
