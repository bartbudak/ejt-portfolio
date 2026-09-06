// Recognition — from her copy doc §7, with the links Bart supplied.
//
// Two accuracy notes:
//
// 1. The Webby level is now confirmed: PEOPLE'S VOICE WINNER. That had been an
//    open question since the June research — the winners page is JS-walled, so
//    the level could not be read off it — and it must not be softened to "a
//    Webby" or hardened to an outright "Winner". Agency readers check.
// 2. Her copy doc claims 3 Dieline awards. Earlier web research turned up more
//    placements than that across 2025 and 2026. Hers is the number used here;
//    if she wants the fuller record it needs her confirmation first, not mine.
//
// The Webby is for the Maeve website, which View Source built. Crediting the
// agency is a standing rule on this site (HANDOFF §1): she directed the work,
// they executed it, and the copy has to say so.

export interface Award {
  name: string;
  detail: string;
  /** Preview shown in the card. */
  preview?: { src: string; alt: string };
  /** A second link, where the project has one. */
  extra?: { href: string; label: string };
  /** Who else is on the credit, where it is not hers alone. */
  credit?: string;
  href?: string;
  /** Link text, when the destination is not obvious from the award. */
  linkLabel?: string;
}

export const awards: Award[] = [
  {
    name: "Webby Awards",
    detail: "People's Voice Winner — Food & Drink, for the Maeve website",
    credit: "Built with View Source",
    href: "https://winners.webbyawards.com/2026/websites-and-mobile-sites/general-desktop-mobile-sites/food-drink/364780/maeve-chocolate",
    linkLabel: "See the win",
    // Captured from the live site rather than lifted from anyone's case study:
    // maevechocolate.com is the work itself, and the work is hers.
    preview: {
      src: "/awards/maeve-site.webp",
      alt: "The Maeve website — the Princess Donut lounge scene behind the Maeve wordmark",
    },
    extra: {
      href: "https://view-source.com/work/maeve",
      label: "View Source case study",
    },
  },
  {
    name: "Dieline Awards",
    detail:
      "Three awards — 2nd place for the everyday bar line, plus two for seasonal collections. All three conceived and led personally.",
    href: "https://thedieline.com/occasion-driven-chocolate-packaging-for-everyday-gifting-with-maeve/",
    linkLabel: "Read the feature",
    preview: {
      src: "/awards/dieline-stage.webp",
      alt: "Ellie on the Dieline Awards stage holding the winning packaging",
    },
  },
  {
    name: "Dungeon Crawler Carl",
    detail:
      "The collaboration became the first playable Dungeon Crawler game, covered by IGN.",
    href: "https://www.ign.com/articles/a-free-dungeon-crawler-carl-flash-game-is-now-available-to-play-online",
    linkLabel: "Read on IGN",
    preview: {
      src: "/awards/dcc-princess-donut.webp",
      alt: "Princess Donut, the character at the centre of the playable game",
    },
  },
  {
    name: "NEXTY Awards",
    detail: "Finalist — Natural Products Expo West 2025",
    href: "https://www.newhope.com/nexty-awards/presenting-the-2025-natural-products-expo-west-nexty-awards-finalists",
    linkLabel: "See the finalists",
  },
];
