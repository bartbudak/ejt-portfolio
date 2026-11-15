import { site } from "@/lib/site";

// "At a glance" — a slim band between "Hi There!" and "Off the Clock".
//
// Added 2026-11-13 after a first-read review of the site as a hiring manager
// would see it: the About page opened with the person and the hobbies and did
// not say, until the Work page or the résumé PDF, what level she worked at.
//
// It is its own section rather than more copy in "Hi There!" on purpose: that
// section's astronaut photo is sized by the section's height, so extra text
// there makes the photo grow over the copy.
//
// The three-number scoreboard (110% / 36 hrs / 6) that used to sit beside the
// scope copy was cut 2026-11-15, Ellie's own call: it repeated The Results on
// the Work page verbatim rather than saying anything new about the role, and
// she wanted this band to earn its place rather than pad it with a rerun.

export function AtAGlance() {
  return (
    <section
      aria-label="At a glance"
      // An ombre at the top: "Hi There!" above is vermilion, and a hard edge into
      // yellow felt abrupt (Ellie, 2026-11-13). The first 8rem fade from that
      // vermilion into the marigold, the padding keeps the copy below the fade
      // (so the vermilion numbers never sit on pink), and the band is still its
      // own yellow section from there down.
      className="w-full px-5 pb-10 pt-24 sm:px-10 sm:pb-12 sm:pt-32"
      style={{
        // The plain marigold is the fallback for a browser without `color-mix`.
        backgroundColor: "var(--ejd-marigold)",
        // Lightened 2026-11-13 (Ellie: "a bit lighter, similar in lightness to the
        // pink in Off the Clock"): 75% white over the page's marigold, a soft butter
        // yellow, ~90% lightness against that pink's 94%. Taken from the token, not
        // a hex, so it still follows whichever palette is active.
        backgroundImage:
          "linear-gradient(to bottom, var(--ejd-vermilion) 0, color-mix(in srgb, var(--ejd-marigold) 25%, white) 8rem)",
      }}
    >
      <div className="mx-auto w-full max-w-3xl">
        <p
          className="text-center text-lg leading-relaxed sm:text-2xl"
          style={{ color: "var(--ejd-ink)", textWrap: "pretty" }}
        >
          {site.scope}
        </p>
      </div>
    </section>
  );
}
