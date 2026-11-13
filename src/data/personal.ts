// "Off the Clock" and "Beyond the Desk" — new sections added to About in the
// 2026-11-01 restructure, between "Hi There!" and "My Crown Jewel".
//
// Reworded 2026-11-13 at Ellie's request: the first version "read like AI", so
// every tile and the Beyond the Desk copy were rewritten in her voice, using
// only facts she gave (how she and her husband met on Wild Rift, their guild,
// the cats' names) and what is already in her résumé and briefs. The tiles are
// marked `drafted` until she has read them. The guild is "the guild we helped
// lead", not "founded" (Ellie, 2026-11-13); the ARAM / Samira / Jinx sentence
// was cut the same day to shorten the card.
// The Color-on-Color Dresser and Currently Learning tiles were cut the same day.
//
// Tile order is deliberate: Cat Parent comes AFTER the book tile because the
// cats are named for two of those series.
//
// Photos supplied by Ellie: the League of Legends rank card
// (public/personal/ranked-gamer.jpg) and the cats together
// (public/personal/syl-and-mordecai.jpg). The reader tile is a composite of five
// cover images (public/personal/epic-fantasy-books.webp, transparent so the
// page colours it).

export interface OffTheClockTile {
  slug: string;
  label: string;
  body: string;
  /** Her brief gave the idea, not finished copy — confirm wording with her. */
  drafted?: boolean;
  /** A real photo, once she's supplied one. Falls back to the placeholder. */
  photo?: {
    src: string;
    alt: string;
    /** "contain" for a screenshot that shouldn't be edge-cropped. Default "cover". */
    fit?: "cover" | "contain";
    /** CSS object-position for a "cover" crop, e.g. "left center". Default is
     *  the middle of the image. */
    position?: string;
    /** A CSS colour (a theme token works) painted behind a transparent image. */
    background?: string;
    /** Shape of the picture in the Off the Clock deck, as a CSS aspect ratio.
     *  Default "1 / 1". Landscape ones keep the deck's cards short; the books
     *  need to stay square or their titles get too small to read. */
    aspect?: string;
    /** A picture made of two photos side by side: draws a thin divider down the
     *  middle, in the page's ink colour (so it follows the theme). */
    divider?: boolean;
  };
}

// Ellie's own wording (2026-11-13), replacing "Here's what I'm up to when I'm not
// working." with something that sets the cards up.
export const offTheClockIntro =
  "When I'm not working on a new product, I love diving deep into my hobbies. Here are a few of my favorite things!";

export const offTheClockTiles: OffTheClockTile[] = [
  {
    slug: "gamer",
    label: "Ranked Gamer",
    drafted: true,
    // The "I play mostly ARAM, but I main Samira and Jinx in the duo lane"
    // sentence was cut at Ellie's request (2026-11-13) so the card is shorter.
    body: "My husband and I met playing League of Legends: Wild Rift, and the guild we helped lead is ranked top 10 in North America. I'm part of the gaming audience myself, which is how I knew PAX West and Dungeon Crawler Carl would be a hit.",
    photo: {
      src: "/personal/ranked-gamer.jpg",
      alt: "Ellie's League of Legends: Wild Rift rank card: Grandmaster III, 'MØL's #1 fan'",
      // Her rank card is a wide (1392x808) UI screenshot and the tile is a
      // 4:5 portrait. It used to be shown whole ("contain"), which left it
      // small inside the frame; Ellie asked for it cropped to fill (2026-11-13).
      // A 4:5 window is ~646px of its 1392, so we keep the LEFT edge: the
      // avatar, "MØL's #1 fan", "Grandmaster III" and the champion badges —
      // the rank is the point. The character art on the right is what's lost.
      fit: "cover",
      position: "left center",
      aspect: "4 / 3",
    },
  },
  {
    slug: "reader",
    label: "Epic Fantasy Reader",
    drafted: true,
    body: "I read a lot of epic fantasy, and these are a few of my all-time favorites!",
    // Made 2026-11-13 from Ellie's five picks, in the order she sent them, laid
    // out flat (a fan hid every title but one): the retailers' own cover images,
    // arranged with a soft shadow. Nothing is hand-drawn. The file is
    // transparent and the theme's marigold sits behind it, so the tile follows
    // whichever palette is active instead of a baked-in cream (Ellie found the
    // cream "stark" against the theme, 2026-11-13).
    photo: {
      src: "/personal/epic-fantasy-books.webp",
      alt: "Five fantasy book covers laid out together: The Way of Kings by Brandon Sanderson, The Name of the Wind by Patrick Rothfuss, Mistborn by Brandon Sanderson, Throne of Glass by Sarah J. Maas, and The Hobbit by J.R.R. Tolkien",
      background: "var(--ejd-marigold)",
      // Square on purpose, and `contain`: five covers have to stay big enough to
      // read, and the marigold behind the transparent file fills any spare room.
      fit: "contain",
      aspect: "1 / 1",
    },
  },
  {
    slug: "cats",
    label: "Cat Parent",
    drafted: true,
    // Names confirmed by Ellie, 2026-11-01: Sylphrena (after Stormlight
    // Archive) and Mordecai (after Dungeon Crawler Carl's own cat). The
    // sentence is built from her own wording (2026-11-13).
    body: "My husband and I are proud cat parents to Syl and Mordecai, named after two beloved characters from two of our favorite book series: The Stormlight Archive and Dungeon Crawler Carl.",
    // Replaced 2026-11-13 with Ellie's two favourite photos, one per cat, set side
    // by side in a single picture (public/personal/cats.webp, 1200x1050): Sylphrena
    // on the left getting a boop, Mordecai on the right, so they face each other.
    // The divider is drawn over the join (`divider`), not baked in, so it takes the
    // theme's ink colour and there is no dark flash while the image loads. The old
    // shared photo, syl-and-mordecai.jpg, is unused.
    photo: {
      src: "/personal/cats.webp",
      alt: "Two photos side by side. On the left, Sylphrena, a white and grey long-haired cat, closes her eyes as a finger boops her nose. On the right, Mordecai, a long-haired black and grey cat with yellow eyes, sits upright on the dining table.",
      fit: "cover",
      position: "center",
      aspect: "8 / 7",
      divider: true,
    },
  },
];

// Confirmed with Ellie, 2026-11-01: it's the Foundation (EAAF) board she
// served on, not the company (EAA) itself.
//
// Reworded 2026-11-13 (see the note at the top of this file). The facts are the
// same; the sentences now follow her résumé's own wording where it covers them.
// Dropped: the closing "I'm not a leader who guesses from a distance. I get on
// the plane." — it was written for her, not by her.
export interface BeyondMedia {
  /** A still. When `video` is set it becomes the poster (and the picture shown
   *  to anyone who has asked their device for reduced motion). */
  src: string;
  alt: string;
  /** CSS object-position for the 3:4 crop. */
  position?: string;
  /** A short silent loop. Add it here when the file is in public/personal/. */
  video?: string;
}

export const beyondTheDesk = {
  heading: "I Go To The Source",
  // Added 2026-11-13. The first is Ellie's video of a walk with a group in Ghana,
  // played as a silent loop; the still is its poster. The file is a CUT of her
  // 10-second original, 7.5 s of the two stretches that show only adults (the
  // group walking away from the camera, then her selfie with them). The rest has
  // children in frame, one looking into the camera, and was left out so no child
  // is published on a public page without a decision from Ellie. Shrunk from 4K
  // with sound (21 MB) to 540x960, no audio track, 1.3 MB.
  media: [
    {
      src: "/personal/ghana-walk.webp",
      alt: "A group of people walking together down a dirt road past banana trees in Ghana, several in green shirts that read: Organic, impactful, clean cocoa, healthy communities, ethical value chain",
      position: "center 60%",
      video: "/personal/ghana-walk.mp4",
    },
    {
      src: "/personal/cacao-field.webp",
      alt: "Ellie standing among cacao trees with a camera around her neck, red cacao pods hanging from the branches behind her",
      position: "center 40%",
    },
  ] as BeyondMedia[],
  paragraphs: [
    "Maeve has a built-in giveback to cocoa farmers, so I wanted to meet them in person. I've traveled to cocoa farms in Ghana, Costa Rica, Nicaragua, Ecuador, Peru and Brazil to meet farmers, help shape our farmer-support initiatives and capture content for web, social and ads. I also trained hands-on in bean-to-bar chocolate making so I understand our product from the ground up.",
    "After my trip to Ghana, I joined the board of the Ethical Apparel Africa Foundation (EAAF), which works to build fair, sustainable garment manufacturing across West Africa. Closer to home, I served on the board of Cancer Pathways and helped plan their annual gala fundraiser.",
  ],
};
