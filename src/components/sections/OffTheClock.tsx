import { Marquee } from "@/components/shared/Marquee";
import { offTheClockIntro, offTheClockTiles } from "@/data/personal";
import { OffTheClockDeck } from "./OffTheClockDeck";

// "OFF THE CLOCK" — new section (2026-11-01 restructure), between "Hi There!"
// and "Beyond the Desk": the person behind the pitch decks.
//
// 2026-11-13, at Ellie's request:
//  - The tiles are a deck of cards (OffTheClockDeck): one large in the middle,
//    the others behind it, swipeable, so more can be added without crowding.
//  - The ground is the soft blush of the page's pinks and yellows. It used to be
//    sage green, which was the one cool colour on About and read as a different
//    page. It is still its own section: a blush field with a vermilion title,
//    set between the yellow "at a glance" band above and the paper of "Beyond
//    the Desk" below.
//
// A card without a photo shows the placeholder until Ellie supplies one. The
// Color-on-Color Dresser and Currently Learning cards were cut (2026-11-13).

const WONK = { fontVariationSettings: '"SOFT" 0, "WONK" 1' } as const;

export function OffTheClock() {
  return (
    <section
      id="off-the-clock"
      className="relative w-full"
      style={{ backgroundColor: "var(--ejd-blush)" }}
    >
      <Marquee
        items={["Off The Clock"]}
        background="var(--ejd-vermilion)"
        ring="var(--ejd-marigold)"
        className="sticky top-[var(--ejt-band-top,var(--ejt-header))] z-30"
      />

      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-10 sm:py-24">
        <h2
          className="text-center font-display font-black uppercase leading-[0.84] tracking-[-0.03em]"
          style={{
            ...WONK,
            color: "var(--ejd-vermilion)",
            fontSize: "clamp(3rem,10vw,6rem)",
          }}
        >
          Off The Clock
        </h2>
        <p
          className="mx-auto mt-3 max-w-[48ch] text-center text-lg sm:text-xl"
          // `balance` evens out the lines so the last one is not a single word.
          style={{ color: "var(--ejd-ink)", textWrap: "balance" }}
        >
          {offTheClockIntro}
        </p>

        <OffTheClockDeck tiles={offTheClockTiles} />
      </div>
    </section>
  );
}
