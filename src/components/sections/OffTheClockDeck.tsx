"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { CARD_FRAME } from "@/components/shared/PostCard";
import type { OffTheClockTile } from "@/data/personal";

// The "Off the Clock" cards: one large card in the middle, the neighbours a
// little smaller and tucked behind it, and a way to move through them.
//
// Asked for by Ellie (2026-11-13) in place of a plain grid, partly so she can add
// more cards later without the section getting crowded. It loops, so with three
// cards the middle one always has a neighbour on each side, and adding a fourth
// or fifth just lengthens the loop.
//
// Moving: swipe or drag, the two arrow buttons, the dots, the left and right
// arrow keys (when the deck has focus), or tap a card behind the middle one.
// Only the middle card is exposed to assistive technology (the others are
// aria-hidden); a polite live region
// announces which card came forward.
//
// Pictures are short here (they were 4:5 in the old grid): a 4:5 photo made the
// middle card ~700px tall, taller than a laptop screen, so you could not see a
// whole card at once. Each picture has its own shape: landscape for the rank
// card (cropped to its left edge) and the cats, square for the books so their
// titles stay readable.
//
// Every card sits in the SAME grid cell, so the deck is as tall as its tallest
// card and they all stretch to match, with no fixed heights to keep in sync.

const WONK = { fontVariationSettings: '"SOFT" 0, "WONK" 1' } as const;

function PhotoPlaceholder({ label }: { label: string }) {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center"
      style={{ backgroundColor: "var(--mv-paper)" }}
    >
      <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] opacity-50">
        Photo coming soon
      </span>
      <span
        className="font-display text-sm font-black uppercase leading-none opacity-25"
        style={WONK}
      >
        {label}
      </span>
    </div>
  );
}

/** Signed distance of card `i` from the active card, taken the short way round
 *  the loop: with 3 cards that is -1, 0 or 1; with 5 it is -2 to 2. */
function offset(i: number, active: number, n: number) {
  const half = Math.floor(n / 2);
  return ((((i - active + half) % n) + n) % n) - half;
}

function look(d: number) {
  if (d === 0) return { x: 0, scale: 1, z: 30, opacity: 1, dim: 1 };
  if (Math.abs(d) === 1)
    return { x: d * 58, scale: 0.84, z: 20, opacity: 1, dim: 0.9 };
  // Further round the loop: parked out of sight behind the neighbours.
  return { x: d * 40, scale: 0.7, z: 10, opacity: 0, dim: 0.9 };
}

export function OffTheClockDeck({ tiles }: { tiles: OffTheClockTile[] }) {
  const n = tiles.length;
  const [active, setActive] = useState(0);
  const [hover, setHover] = useState<number | null>(null);
  const startX = useRef<number | null>(null);
  const dragged = useRef(false);

  const go = (i: number) => setActive(((i % n) + n) % n);
  const next = () => go(active + 1);
  const prev = () => go(active - 1);

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="Off the clock"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          next();
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          prev();
        }
      }}
      // Negative margins cancel the section's side padding, so on a phone the cards
      // behind the middle one run off the edge of the screen instead of being cut
      // at the content margin.
      className="-mx-5 mt-10 rounded-3xl focus-visible:outline-2 focus-visible:outline-offset-4 sm:-mx-10"
      style={{ ["--deck-w" as string]: "min(74vw, 18rem)" }}
    >
      <div
        // `pan-y` leaves vertical scrolling to the browser and takes sideways
        // swipes for the deck.
        className="grid w-full touch-pan-y select-none justify-items-center overflow-x-clip py-3"
        onPointerDown={(e) => {
          startX.current = e.clientX;
          dragged.current = false;
        }}
        onPointerUp={(e) => {
          if (startX.current === null) return;
          const dx = e.clientX - startX.current;
          startX.current = null;
          if (Math.abs(dx) > 40) {
            dragged.current = true;
            if (dx < 0) next();
            else prev();
          }
        }}
        onPointerCancel={() => {
          startX.current = null;
        }}
      >
        {tiles.map((tile, i) => {
          const d = offset(i, active, n);
          const isActive = d === 0;
          const s = look(d);
          // A card behind the middle one lifts and brightens under the pointer,
          // so it reads as something you can click to bring forward.
          const lifted = !isActive && Math.abs(d) === 1 && hover === i;
          if (lifted) {
            s.dim = 1;
            s.scale = 0.87;
          }
          return (
            <article
              key={tile.slug}
              // `aria-hidden`, not `inert`: inert would also stop a tap on a card
              // behind the middle one from bringing it forward. These cards have
              // nothing focusable in them, so there is nothing to trap.
              aria-hidden={!isActive}
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${n}: ${tile.label}`}
              onPointerEnter={() => setHover(i)}
              onPointerLeave={() => setHover((h) => (h === i ? null : h))}
              onClick={() => {
                // A card behind the middle one comes forward when tapped, unless
                // the tap was the end of a swipe.
                if (!isActive && !dragged.current && Math.abs(d) === 1) go(i);
              }}
              className={`flex h-full w-[var(--deck-w)] flex-col overflow-hidden motion-reduce:transition-none ${
                !isActive && Math.abs(d) === 1 ? "cursor-pointer" : ""
              }`}
              style={{
                ...CARD_FRAME,
                gridArea: "1 / 1",
                transform: `translateX(${s.x}%) scale(${s.scale})`,
                zIndex: s.z,
                opacity: s.opacity,
                filter: `brightness(${s.dim})`,
                pointerEvents: s.opacity === 0 ? "none" : undefined,
                transition:
                  "transform 500ms cubic-bezier(0.22, 0.8, 0.3, 1), opacity 300ms ease, filter 300ms ease",
              }}
            >
              {/* The picture keeps its own shape (landscape for the rank card and
                  the cats, square for the books) as a minimum, and grows to take up
                  any height the tallest card leaves spare, so the cards stay level
                  without every picture having to be tall. */}
              <div
                className="relative grow overflow-hidden"
                style={{ aspectRatio: tile.photo?.aspect ?? "1 / 1" }}
              >
                {tile.photo ? (
                  <Image
                    src={tile.photo.src}
                    alt={isActive ? tile.photo.alt : ""}
                    fill
                    sizes="(min-width: 640px) 288px, 74vw"
                    draggable={false}
                    className={
                      tile.photo.fit === "contain"
                        ? "object-contain"
                        : "object-cover"
                    }
                    style={{
                      ...(tile.photo.fit === "contain"
                        ? { backgroundColor: "var(--mv-paper)" }
                        : null),
                      ...(tile.photo.position
                        ? { objectPosition: tile.photo.position }
                        : null),
                      // A transparent image: the theme supplies the colour.
                      ...(tile.photo.background
                        ? { backgroundColor: tile.photo.background }
                        : null),
                    }}
                  />
                ) : (
                  <PhotoPlaceholder label={tile.label} />
                )}
              </div>
              <div
                className="flex flex-none flex-col px-4 pb-4 pt-3"
                style={{
                  borderTop: "var(--mv-stroke) solid var(--ejd-ink)",
                  color: "var(--ejd-ink)",
                }}
              >
                <h3
                  className="font-display text-base font-black uppercase tracking-[0.01em] sm:text-lg"
                  style={{ ...WONK, color: "var(--ejd-deep)" }}
                >
                  {tile.label}
                </h3>
                <p className="mt-1 text-[0.9rem] leading-[1.4]">
                  {tile.body}
                </p>
              </div>
            </article>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        {`${active + 1} of ${n}: ${tiles[active].label}`}
      </p>

      <div className="mt-3 flex items-center justify-center gap-5">
        <DeckButton label="Previous card" onClick={prev}>
          <span aria-hidden>←</span>
        </DeckButton>

        <div className="flex items-center">
          {tiles.map((tile, i) => (
            <button
              key={tile.slug}
              type="button"
              onClick={() => go(i)}
              aria-label={`Show ${tile.label}`}
              aria-current={i === active ? "true" : undefined}
              // A 44px tap area around a 12px dot.
              className="grid h-11 w-8 place-items-center focus-visible:outline-2 focus-visible:outline-offset-[-4px]"
            >
              <span
                className="block h-3 rounded-full transition-all duration-300 motion-reduce:transition-none"
                style={{
                  width: i === active ? "1.5rem" : "0.75rem",
                  backgroundColor:
                    i === active ? "var(--ejd-vermilion)" : "var(--ejd-ink)",
                  opacity: i === active ? 1 : 0.3,
                }}
              />
            </button>
          ))}
        </div>

        <DeckButton label="Next card" onClick={next}>
          <span aria-hidden>→</span>
        </DeckButton>
      </div>
    </div>
  );
}

function DeckButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid h-12 w-12 place-items-center rounded-full text-xl font-bold transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transition-none"
      style={{
        backgroundColor: "var(--ejd-marigold)",
        color: "var(--ejd-ink)",
        border: "var(--mv-stroke) solid var(--ejd-ink)",
        boxShadow: "0 0 0 4px var(--ejd-vermilion), 0 0 0 6px var(--ejd-ink)",
        margin: 6,
      }}
    >
      {children}
    </button>
  );
}
