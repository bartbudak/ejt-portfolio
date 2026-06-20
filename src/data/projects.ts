// Single source of truth for Ellie's work. Home tiles and case-study pages both
// render from this. Facts here are corroborated by research (see HANDOFF.md);
// anything still needing Ellie's confirmation is marked TODO.
//
// IMPORTANT framing: Ellie was the brand-side CREATIVE DIRECTOR — she owned the
// vision and directed the agencies. Always credit the agencies (Young Jerks,
// View Source, etc.) in `credits`; never imply she did the design execution.

export interface GalleryItem {
  /** Path under /public once assets are selected + optimized. TODO: export from /assets. */
  src: string;
  alt: string;
  caption?: string;
  /** Rough aspect for layout before images exist. */
  ratio?: "portrait" | "landscape" | "square";
}

export interface Credit {
  role: string;
  name: string;
  url?: string;
}

export interface Award {
  name: string;
  detail: string;
  url?: string;
  /** false = still needs confirmation (e.g. Webby level, NEXTY result). */
  verified?: boolean;
}

export interface PressItem {
  outlet: string;
  title?: string;
  url: string;
  /** tv | print | digital | podcast | trade | design */
  kind?: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  year: string;
  /** Ellie's role — the CD framing. */
  role: string;
  disciplines: string[];
  /** One-liner for the home tile + case-study header. */
  summary: string;
  featured?: boolean;
  hero?: string; // TODO: hero image path under /public
  challenge: string;
  insight: string;
  /** What SHE directed — the heart of the CD story. */
  creativeDirection: string;
  outcome?: string;
  gallery: GalleryItem[];
  awards: Award[];
  press: PressItem[];
  credits: Credit[];
}

export interface SelectedProject {
  title: string;
  client: string;
  year: string;
  role: string;
  blurb: string;
}

// ─── Shared credits (Maeve work) ─────────────────────────────────────────────
const MAEVE_CREDITS: Credit[] = [
  {
    role: "Brand identity & packaging",
    name: "Young Jerks — Dan Cassaro & Dan Christofferson",
    url: "https://youngjerks.com",
  },
  { role: "Website", name: "View Source", url: "https://view-source.com" },
  // TODO: confirm Valeria Roca's photography credit + which shoots.
  { role: "Photography", name: "Valeria Roca" },
  {
    role: "Owner & CEO (co-vision)",
    name: "Jean Thompson, Seattle Chocolate / Maeve",
  },
];

// ─── Full case studies ───────────────────────────────────────────────────────
export const caseStudies: CaseStudy[] = [
  {
    slug: "maeve",
    title: "Maeve",
    client: "Seattle Chocolate Company",
    year: "2025",
    role: "Creative Director — brand vision, art direction, agency direction",
    disciplines: ["Brand strategy", "Identity", "Packaging", "Art direction"],
    summary:
      "Reinventing a 30-year-old chocolate company as Maeve — a bold, character-driven brand named for an Irish warrior queen.",
    featured: true,
    hero: "", // TODO
    challenge:
      "After 30+ years, Seattle Chocolate Company had a loyal following but packaging that no longer matched its spirit — and a regional name capping national growth. The everyday line read subdued and a little serious, even as the seasonal collections were wild and joyful.",
    insight:
      'A non-regional, unapologetically feminine brand built around a fierce namesake — the Irish warrior queen Maeve — and a maximalist, character-driven world that makes "ethical indulgence" feel like fun rather than a lecture.',
    creativeDirection:
      "Ellie initiated the rebrand and owned the creative vision end to end: the warrior-queen concept and brand world, the personified flavor characters, color and flavor-character decisions across the line, the verbal tone, and the direction of the partners she chose — Young Jerks on identity & packaging, View Source on the site — plus on-set direction of the photography. (She co-led with owner/CEO Jean Thompson.)",
    outcome:
      "A full corporate rebrand launched March 2025 and debuted at Expo West; award-winning packaging and website, and a national press wave.",
    gallery: [
      // TODO: select + optimize from assets/Logos/Primary Logos with R, the
      // seasonal systems, characters (Greg, Gretchen, Froggy Bottom), and
      // product elements (Forbidden Fruits, Heat & Honey, PB Banana Affair).
      { src: "", alt: "Maeve primary logo", ratio: "landscape" },
      { src: "", alt: "Maeve packaging system", ratio: "portrait" },
      { src: "", alt: "Maeve flavor characters", ratio: "square" },
    ],
    awards: [
      {
        name: "Webby Award",
        detail: "2026 — Food & Drink, Websites (level TODO: Winner/Nominee/People's Voice)",
        url: "https://winners.webbyawards.com/2026/websites-and-mobile-sites/general-desktop-mobile-sites/food-drink/364780/maeve-chocolate",
        verified: false,
      },
      {
        name: "CSS Design Awards — Website of the Day",
        detail: "Oct 23 2025 · score 8.01 (site by View Source)",
        url: "https://www.cssdesignawards.com/sites/maeve-chocolate/48262/",
        verified: true,
      },
      {
        name: "DIELINE Awards 2026",
        detail:
          "Celebrations — 2nd & Spring — 3rd (Confectionery); Holiday — 2nd & Summer — Merit (Limited Editions)",
        url: "https://dielineawards.com/winners-gallery.html",
        verified: true,
      },
      {
        name: "DIELINE Awards 2025",
        detail: "2nd place — Confectionery",
        url: "https://thedieline.com/the-best-in-packaging-2025-dieline-awards-winners-revealed/",
        verified: true,
      },
      {
        name: "NEXTY Awards 2025",
        detail: "Finalist (TODO: confirm)",
        verified: false,
      },
    ],
    press: [
      {
        outlet: "KING 5 — Evening",
        title: "Mother-daughter duo rebrands Seattle Chocolate with a nod to Irish lore",
        url: "https://www.king5.com/article/entertainment/television/programs/evening/seattle-chocolate-rebrand-maeve-mother-daughter-team-woman-owned-ethically-sourced-candy/281-703b4d44-8c3d-4668-ab8a-0ad9997dc8a2",
        kind: "tv",
      },
      {
        outlet: "Seattle Refined",
        title: "From Seattle Chocolate to Maeve",
        url: "https://seattlerefined.com/eat-drink/from-seattle-chocolate-to-maeve-how-a-beloved-local-brand-got-a-mythical-makeover-mother-daughter-team-rebranded-their-beloved-bars",
        kind: "digital",
      },
      {
        outlet: "The Dieline",
        title: "Young Jerks Helps Rebrand Seattle Chocolate into Warrior Queen-Inspired Maeve",
        url: "https://thedieline.com/young-jerks-helps-rebrand-seattle-chocolate-into-warrior-queen-inspired-maeve/",
        kind: "design",
      },
      {
        outlet: "Brand New (UnderConsideration)",
        title: "New Logo, Identity, and Packaging for Maeve",
        url: "https://www.underconsideration.com/brandnew/archives/new_logo_identity_and_packaging_for_maeve_by_the_young_jerks.php",
        kind: "design",
      },
      {
        outlet: "The Brand Study (podcast)",
        title: "Maeve Chocolate: A New Era Beyond Seattle Chocolate Co",
        url: "https://www.sweepcreative.com/the-brand-study/maeve-chocolate",
        kind: "podcast",
      },
      {
        outlet: "Transform Magazine (UK)",
        title: "Seattle Chocolate rebranded as Maeve",
        url: "https://www.transformmagazine.net/articles/2025/seattle-chocolate-rebranded-as-maeve-in-bid-to-expand-beyond-us-city/",
        kind: "trade",
      },
    ],
    credits: MAEVE_CREDITS,
  },
  {
    slug: "maeve-dcc",
    title: "Maeve × Dungeon Crawler Carl",
    client: "Maeve / Matt Dinniman",
    year: "2025",
    role: "Creative Director — collaboration concept & art direction",
    disciplines: ["Brand collaboration", "Packaging", "Art direction"],
    summary:
      'A limited-edition "Virgin Dirty Shirley" bar with NYT-bestselling author Matt Dinniman, bringing the Dungeon Crawler Carl universe to chocolate.',
    challenge:
      "Translate a beloved fantasy book series (and Princess Donut's signature drink) into a collectible chocolate product that lands with a passionate fandom.", // TODO refine with Ellie
    insight:
      "Lean fully into the characters and lore — a dark chocolate truffle bar with cherries, white-chocolate center and popping candy that 'crackles with fizzy magic.'",
    creativeDirection:
      "TODO: Ellie's specific role on the collaboration (concept, packaging direction, author/partner liaison). The bar sold out and was restocked.",
    gallery: [
      // TODO: assets/Logos/DCC Logo + product packaging
      { src: "", alt: "Maeve × DCC Virgin Dirty Shirley packaging", ratio: "portrait" },
    ],
    awards: [],
    press: [
      {
        outlet: "Matt Dinniman",
        title: "The official Princess Donut chocolate truffle bar exists",
        url: "https://mattdinniman.com/the-official-princess-donut-chocolate-truffle-bar-exists-and-its-just-as-perfect-as-our-favorite-grand-champion/",
        kind: "digital",
      },
    ],
    credits: MAEVE_CREDITS,
  },
  {
    slug: "seasonal",
    title: "Seasonal Collections",
    client: "Maeve / Seattle Chocolate Company",
    year: "2023–2025",
    role: "Creative Director — art direction across a seasonal system",
    disciplines: ["Art direction", "Packaging", "Illustration direction"],
    summary:
      "Directing one cohesive yet ever-changing brand world across five seasons — and a roster of illustrators around the world.",
    challenge:
      "Keep a single brand instantly recognizable while reinventing it every season (Spring, Summer, Fall, Holiday, Valentine) — without diluting the system.",
    insight:
      "A flexible character-and-world framework that lets each season feel like a fresh story while sharing one wordmark, voice and craft standard.",
    creativeDirection:
      "Art-directing the seasonal systems and commissioning/directing illustrators worldwide (e.g. Kendra Dandy, Bodil Jane, Frida Clements, Esther Loopstra, Llewellyn Mejia). TODO: confirm the exact six collections, artists + countries, and Ellie's brief for each.",
    gallery: [
      // TODO: the five seasonal logo systems + characters from assets/Logos/*
      { src: "", alt: "Spring collection", ratio: "square" },
      { src: "", alt: "Summer 'Fantastical Fair Foods' collection", ratio: "square" },
      { src: "", alt: "Holiday collection", ratio: "square" },
    ],
    awards: [
      {
        name: "DIELINE Awards 2026",
        detail: "Seasonal collections among the wins (Celebrations, Spring, Holiday, Summer)",
        url: "https://dielineawards.com/winners-gallery.html",
        verified: true,
      },
    ],
    press: [
      {
        outlet: "The Dieline",
        title: "The Fair Comes To The Candy Aisle With Maeve",
        url: "https://thedieline.com/the-fair-comes-to-the-candy-aisle-with-maeve/",
        kind: "design",
      },
    ],
    credits: MAEVE_CREDITS,
  },
];

// ─── Selected projects (mentions, not full pages) ────────────────────────────
export const selectedProjects: SelectedProject[] = [
  {
    title: "Maeve × TALEA — Galentine's",
    client: "Maeve / TALEA Beer Co.",
    year: "2025",
    role: "Creative Director — experiential",
    blurb:
      "An experiential Valentine's collab at TALEA's Brooklyn taproom: a co-brewed 'Pineapple Coco Cacao Sour,' custom glassware, trivia and craft stations (119 guests).",
  },
  {
    title: "Ethical Apparel Africa",
    client: "Ethical Apparel Africa",
    year: "2024",
    role: "TODO",
    blurb: "TODO — Ellie's role, scope, deliverables, links.",
  },
  {
    title: "Cancer Pathways — fundraiser",
    client: "Cancer Pathways",
    year: "2021–2024",
    role: "TODO",
    blurb: "TODO — what she planned/produced, scope, any collateral.",
  },
];

export const featuredCaseStudy = caseStudies.find((c) => c.featured) ?? caseStudies[0];
