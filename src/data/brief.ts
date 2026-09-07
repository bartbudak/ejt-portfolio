// "THE BRIEF · In a nutshell" — her deck's own page, the one that sits between
// why she pitched the rebrand and what it earned. Five strategies, transcribed
// from the deck; the only edits are a fixed typo ("tatttoos"), sentence casing,
// and em dashes where the deck used plus signs, so each reads as prose.
//
// This is the setup for THE RESULTS directly below it: the brief, then the
// receipts.
export const briefIntro = "The Brief";
export const briefScript = "in a nutshell";

// The setup, from her deck's "WHY DID I PITCH THE REBRAND?" page, condensed
// into her own voice. It has to run before the five strategies, because the
// strategies are answers and this is the question.
//
// ⚠️ The company's age: her deck says 30-year-old here and her copy doc says 25
// elsewhere. 30 is what she said last (Bart, 2026-09-06) and it is the number
// this page uses — THE RESULTS below no longer repeats it, so there is one
// claim on the page rather than two that disagree.
export const briefLead = [
  "Seattle Chocolate had a genuinely great product, with a giveback to cocoa farmers built into it. To make a bigger difference in those farmers' lives, it had to win people well outside Seattle — and the shelf it needed to win was split in two. Serious, health-forward brands on one side. Colorful, clownish, sugary candy on the other. Nobody was in the middle.",
  "I wondered why a chocolate brand couldn't be both: fun, and still with depth. So I pitched the reinvention of a 30-year-old chocolate company, and then led it — 100+ products in three years, a new name, and a whole world to put them in.",
];

export interface BriefLine {
  heading: string;
  body: string;
  /** The long one spans the grid rather than squeezing into a column. */
  wide?: boolean;
}

export const brief: BriefLine[] = [
  {
    heading: "Flavor strategy",
    body: "Delicious, mouthwatering flavors without any garbage ingredients.",
  },
  {
    heading: "Design strategy",
    body: "Colorful, maximalist, and akin to American traditional tattoos — bold, readable, and it won't get stale in a few years.",
  },
  {
    heading: "Name strategy",
    body: "A feminine-sounding name to hint at the company being woman owned and powered, and an open-vessel name that could be filled with meaning over time — followers call themselves Maevens now. Then carry the old name in several places at once: locked up with the logo, on the sides of the bars, and in full on the front of the bar caddy, to ease the transition.",
    wide: true,
  },
  {
    heading: "World building",
    body: "Lean into fantasy escapism and create a few magical characters that evoke a feeling and act as a story waiting to be unwrapped.",
  },
  {
    heading: "Seasonal strategy",
    body: "All five lines tie into what folks love most about a season while feeling like a natural extension of The Magical World of Maeve, the evergreen campaign.",
  },
];
