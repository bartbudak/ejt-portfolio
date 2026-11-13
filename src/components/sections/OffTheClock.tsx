import Image from "next/image";
import { CARD_FRAME } from "@/components/shared/PostCard";
import { Marquee } from "@/components/shared/Marquee";
import { offTheClockIntro, offTheClockTiles } from "@/data/personal";

// "OFF THE CLOCK" — new section (2026-11-01 restructure), between "Hi There!"
// and "Beyond the Desk": the person behind the pitch decks.
//
// Sage ground, deep-vermilion display — a break from the vermilion of
// "Hi There!" above it and the paper of "Beyond the Desk" below, so the three
// panels step rather than collide.
//
// Every tile's photo is a placeholder (below) until Ellie supplies one; the
// Color-on-Color Dresser tile is still `drafted: true` in
// src/data/personal.ts — confirm that wording with her before calling this
// section final.

const WONK = { fontVariationSettings: '"SOFT" 0, "WONK" 1' } as const;

function PhotoPlaceholder({ label }: { label: string }) {
  return (
    <div
      className="flex aspect-[4/5] flex-col items-center justify-center gap-2 p-4 text-center"
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

export function OffTheClock() {
  return (
    <section
      id="off-the-clock"
      className="relative w-full"
      style={{ backgroundColor: "var(--ejd-sage)" }}
    >
      <Marquee
        items={["Off The Clock"]}
        background="var(--ejd-deep)"
        ring="var(--ejd-sage)"
        className="sticky top-[var(--ejt-band-top,var(--ejt-header))] z-30"
      />

      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-10 sm:py-24">
        <h2
          className="text-center font-display font-black uppercase leading-[0.84] tracking-[-0.03em]"
          style={{ ...WONK, color: "var(--ejd-deep)", fontSize: "clamp(3rem,10vw,6rem)" }}
        >
          Off The Clock
        </h2>
        <p
          className="mx-auto mt-3 max-w-[42ch] text-center text-lg sm:text-xl"
          style={{ color: "var(--ejd-ink)" }}
        >
          {offTheClockIntro}
        </p>

        <ul className="mt-12 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {offTheClockTiles.map((tile) => (
            <li key={tile.slug}>
              <div style={CARD_FRAME} className="overflow-hidden">
                {tile.photo ? (
                  <Image
                    src={tile.photo.src}
                    alt={tile.photo.alt}
                    width={900}
                    height={1125}
                    className={`aspect-[4/5] h-auto w-full ${
                      tile.photo.fit === "contain"
                        ? "object-contain"
                        : "object-cover"
                    }`}
                    style={
                      tile.photo.fit === "contain"
                        ? { backgroundColor: "var(--mv-paper)" }
                        : undefined
                    }
                  />
                ) : (
                  <PhotoPlaceholder label={tile.label} />
                )}
              </div>
              <h3
                className="mt-4 font-display text-lg font-black uppercase tracking-[0.01em]"
                style={{ ...WONK, color: "var(--ejd-deep)" }}
              >
                {tile.label}
              </h3>
              <p
                className="mt-1 text-base leading-relaxed"
                style={{ color: "var(--ejd-ink)" }}
              >
                {tile.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
