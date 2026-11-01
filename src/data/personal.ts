// "Off the Clock" and "Beyond the Desk" — new sections added to About in the
// 2026-11-01 restructure, between "Hi There!" and "My Crown Jewel".
//
// Shaped from Ellie's own restructure brief, not invented. Two Off the Clock
// tiles are `drafted: true`: her brief gave the idea (dopamine dressing /
// secondhand; sewing and drawing "badly, joyfully") rather than a finished
// line, so confirm the wording with her before calling this final. Every
// tile's photo is a placeholder until she supplies one, except Cat Parent —
// she sent a photo of both cats together on 2026-11-01
// (public/personal/syl-and-mordecai.jpg).

export interface OffTheClockTile {
  slug: string;
  label: string;
  body: string;
  /** Her brief gave the idea, not finished copy — confirm wording with her. */
  drafted?: boolean;
  /** A real photo, once she's supplied one. Falls back to the placeholder. */
  photo?: { src: string; alt: string };
}

export const offTheClockIntro = "The person behind the pitch decks.";

export const offTheClockTiles: OffTheClockTile[] = [
  {
    slug: "cats",
    label: "Cat Parent",
    // Names confirmed by Ellie, 2026-11-01: Sylphrena (after Stormlight
    // Archive) and Mordecai (after Dungeon Crawler Carl's own cat).
    body: "Sylphrena and Mordecai — named for Stormlight Archive and Dungeon Crawler Carl — have strong opinions and zero respect for my calendar.",
    photo: {
      src: "/personal/syl-and-mordecai.jpg",
      alt: "Mordecai, a long-haired black cat, sitting upright on a kitchen island behind Sylphrena, a white and grey Ragdoll cat, lounging on the dining table",
    },
  },
  {
    slug: "gamer",
    label: "Ranked Gamer",
    body: "Top tier in North America on League of Legends: Wild Rift. That's how I knew PAX West and Dungeon Crawler Carl would land — I'm part of that audience.",
  },
  {
    slug: "reader",
    label: "Epic Fantasy Reader",
    body: "If it has a map in the front, I've probably read it.",
  },
  {
    slug: "dresser",
    label: "Color-on-Color Dresser",
    drafted: true,
    body: "Dopamine dressing, almost entirely secondhand. I'd rather have one great piece than ten fast-fashion ones.",
  },
  {
    slug: "learning",
    label: "Currently Learning",
    drafted: true,
    body: "Sewing and drawing — badly, joyfully.",
  },
];

// Confirmed with Ellie, 2026-11-01: it's the Foundation (EAAF) board she
// served on, not the company (EAA) itself.
export const beyondTheDesk = {
  heading: "I Go To The Source",
  paragraphs: [
    "Maeve's whole reason for being was to do more for cocoa farmers, so I went to meet them. I've traveled to origin in Ghana, Costa Rica, Nicaragua, Ecuador, Peru and Brazil, and trained in bean-to-bar chocolate making so I'd understand the product from the ground up.",
    "Ghana stayed with me. When I came home, I joined the board of the Ethical Apparel Africa Foundation (EAAF), which works to build fair, sustainable garment manufacturing across West Africa. Closer to home, I served on the board of Cancer Pathways and helped plan their annual gala fundraiser.",
    "I'm not a leader who guesses from a distance. I get on the plane.",
  ],
};
