// "So, what exactly did I do?" — her deck's own answer, page 1. Every line is
// hers, transcribed verbatim; the deck scatters them around a central
// illustration of her, which is why they read as fragments rather than
// sentences.
export const scopeIntro = "So, what exactly did I do?";

export const scope: string[] = [
  "Creative briefs, feedback and final approvals for all everyday bars and bonbons + 5 seasonal collections + flagship store and factory tour refresh + merch + POS displays and shippers + collateral.",
  "Annual marketing plan including briefs for all digital marketing (Klaviyo, Meta and Google ads, socials, influencers and PR).",
  "Led outreach on brand collaborations and secured unique opportunities that increased brand awareness.",
  "Flavor ideation for R&D.",
  "Collaboration with the sales team on tradeshow booths and activations, sales decks and collateral.",
  "Acted as the face of the rebrand in press interviews, podcasts, panels and TV news segments.",
  "Managed website, branding, PR agencies and the marketing team of 6, acting as the liaison between these groups and the leadership team.",
  "Planned launch campaigns and executed them for the rebrand and all seasonal collections.",
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
