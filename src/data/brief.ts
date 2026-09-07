// "THE IDEA" (was "The Brief") — the section between "Hi There!" and the
// numbers. It answers the question the results raise: what was the plan that
// produced them.
//
// ⚠️ COPY RULES, from Ellie's first round of feedback (2026-09-07):
//   1. First person, always.
//   2. Her words wherever they exist. Every `body` below is hers verbatim,
//      pasted from her feedback doc. Do not tighten, re-order or "improve"
//      them — ask her first.
//   3. No em dashes anywhere in rendered copy. Where one was doing real work
//      it becomes a colon or a full stop, never a silent deletion.
export const briefIntro = "The Idea";
export const briefScript = "in a nutshell";

/** Sits between the lead and the five strategies, as she asked. */
export const briefTurn = "So what exactly did I do?";

export interface BriefLine {
  heading: string;
  body: string;
  /** The long ones span the grid rather than squeezing into a column. */
  wide?: boolean;
}

// The first two paragraphs are her deck's "WHY DID I PITCH THE REBRAND?" page,
// verbatim. The third is the one line of mine she has kept through two rounds
// (she quoted its ending back when asking for the sub-heading), with its em
// dash turned into a colon.
export const briefLead = [
  "Seattle Chocolate had a fantastic product with a built-in giveback to cocoa farmers around the world. In order to have a bigger impact on the farmers lives, they needed to appeal to consumers in markets outside of Seattle.",
  "I saw many chocolate brands on shelf that were either very serious with health-forward messaging or colorful, clownish, sugary candy brands. I wondered why a chocolate brand couldn't be somewhere in the middle; fun while still having depth.",
  "So I pitched the reinvention of a 30-year-old chocolate company, and then led it: 100+ products in three years, a new name, and a whole world to put them in.",
];

export const brief: BriefLine[] = [
  {
    heading: "Flavor Strategy",
    body: "I knew our audience wanted delicious, mouthwatering flavors without compromising the ingredient label. I kept the staples and worked with R&D on many new flavors the consumers couldn't get from any other chocolate brand. I studied successful brands in other categories for inspiration.",
  },
  {
    heading: "Design Strategy",
    body: "I wanted something that would pop on the shelf - something bold, readable, that wouldn't get stale in a few years. This was our chance to break the “fun OR healthful” rule of the category. We leaned into colorful, maximalist, fantastical designs with a subtle nod to American traditional tattoo style. I acted as the liaison between the design agencies and the business, leading all calls and briefings.",
    wide: true,
  },
  {
    heading: "Name Strategy",
    body: "It is a woman-owned business so I felt it was important that the name sounded feminine. It needed to be an open-vessel name that could be filled with meaning over time without limiting our expansion. Lastly, I kept the old name on the packaging, bar caddies, shipping boxes and displays to ease the transition.",
  },
  {
    heading: "Launch Campaign",
    body: "Chocolate is an emotional food that acts as a small escape from the monotonies of the day. We leaned into this feeling of escapism and created a fantasy world, bringing the characters on the packaging to life with world maps, narrative lore, unique merchandise, unexpected collaborations, and more. I created the marketing plan and launch plans by channel, including the e-commerce website, email, socials, ads, PR, influencers, collaborations and refreshing brick & mortar stores.",
    wide: true,
  },
  {
    heading: "Seasonal Strategy",
    body: "In addition to the 50+ everyday products, we created 5 seasonal collections - Valentine's Day, Spring, Summer, Fall and Holiday, with over 50 more products (see Campaigns tab for a deeper dive.) These lines allowed us to expand on the everyday launch campaign and world building, while introducing exciting, new limited-edition products on a regular basis.",
    wide: true,
  },
];
