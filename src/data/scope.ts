// "So, what exactly did I do?" — her deck's own answer, page 1. Every line is
// hers, transcribed verbatim; the deck scatters them around a central
// illustration of her, which is why they read as fragments rather than
// sentences.
export const scopeIntro = "So, what exactly did I do?";

export interface Competency {
  heading: string;
  body: string;
}

// Her deck lists these as eight fragments scattered around the illustration.
// Grouped and given a heading here, with the wording tightened so each reads as
// a sentence rather than a caption — the substance is hers, unchanged.
export const scope: Competency[] = [
  {
    heading: "Creative Direction",
    body: "Briefs, feedback and final approvals across everyday bars and bonbons, five seasonal collections, the flagship store and factory tour refresh, merch, POS displays and shippers, and collateral.",
  },
  {
    heading: "Marketing Plan",
    body: "The annual plan, and the briefs behind every piece of digital that came out of it — Klaviyo, Meta and Google ads, social, influencers and PR.",
  },
  {
    heading: "Partnerships",
    body: "Outreach on brand collaborations, and the unusual opportunities they opened up for the brand.",
  },
  {
    heading: "Flavor",
    body: "Ideation with R&D, down to which flavors made the line.",
  },
  {
    heading: "Sales Support",
    body: "Tradeshow booths and activations, sales decks and collateral, built alongside the sales team.",
  },
  {
    heading: "Press",
    body: "The face of the rebrand in press interviews, podcasts, panels and TV news segments.",
  },
  {
    heading: "Team & Agencies",
    body: "Website, branding and PR agencies plus a marketing team of six — and the liaison between all of them and the leadership team.",
  },
  {
    heading: "Launches",
    body: "Campaigns planned and executed for the rebrand and every seasonal collection.",
  },
];

// ── Everyday Launch ──────────────────────────────────────────────────────────
// Neither of these renders any more — the section is the display heading and the
// wall of posts, with "Everyday Launch · Maeve" running in the marquee above it.
// Kept because they are her deck's own framing of the two-pronged launch.
export const everydayIntro =
  "We had a two-pronged approach to Maeve's launch; one campaign focused on converting local Seattle Chocolate fans into Maevens, and one aimed at capturing new members of our target audience across the country.";

export const localIntro =
  "Billboards, wheatpasting, local news, local collaborations, local events and tradeshows, merch, and the flagship store and factory tour refresh — introducing people to the Magical World of Maeve.";

export interface LocalPost {
  slug: string;
  label: string;
  caption: string;
  image: string;
  alt: string;
}

// The six pieces of her Local Launch board. The photographs are her ORIGINALS
// out of assets/maeve/launch/ — 3000-5700px sources rather than crops off the
// deck render, which is what these were at first and why they were soft.
//
// One swap: the deck's board includes a painted Maeve mural, and there is no
// mural photograph anywhere in her drop. Tradeshow takes that slot instead —
// it is on her own list of what the local campaign consisted of, and the
// original is there. Worth chasing the mural shot from her separately.
//
// Captions are her list of what the local campaign consisted of, not invented
// post copy.
export const localPosts: LocalPost[] = [
  {
    slug: "storefront",
    label: "Flagship store",
    caption: "The flagship store and factory tour, reimagined — concept, script, run of show and the physical build-out.",
    image: "/local/storefront.webp",
    alt: "The Maeve flagship store, its product wall stacked behind",
  },
  {
    slug: "billboard",
    label: "Billboard",
    caption: "Seattle Chocolate is now Maeve — announced on a city billboard, with Gretchen the Blackberry Bear fronting it.",
    image: "/local/billboard.webp",
    alt: "A Maeve bar held up in front of the pink city billboard announcing the rebrand",
  },
  {
    slug: "tradeshow",
    label: "Tradeshow",
    caption: "Booths and activations built with the sales team — the brand out in front of buyers, not just shoppers.",
    image: "/local/tradeshow.webp",
    alt: "Ellie at a Maeve tradeshow booth, product wall behind her",
  },
  {
    slug: "wheatpaste",
    label: "Wheatpasting",
    caption: "Guerrilla posters across the city, announcing the change before most people knew one was coming.",
    image: "/local/wheatpaste.webp",
    alt: "A wall of wheatpasted Maeve posters",
  },
  {
    slug: "press",
    label: "Local news",
    caption: "The rebrand in print, with Ellie as the face of it — one of the interviews, podcasts and TV segments she fronted.",
    image: "/local/press.webp",
    alt: "A newspaper spread about Maeve Chocolate",
  },
  {
    slug: "merch",
    label: "Merch",
    caption: "Wearable world-building — the brand off the shelf and out on the street.",
    image: "/local/merch.webp",
    alt: "A Maeve embroidered jacket photographed from behind",
  },
];
