// Seasonal collections and collaborations — the Campaigns page.
//
// The briefs are Ellie's, lifted verbatim from page 2 of her Canva deck, which
// sets each season as its own coloured band: "<SEASON> BRIEF" in display caps,
// "In a nutshell" in script beside it, then labelled rows. `palette` and
// `motif` are her values too — the grounds were sampled straight off the deck
// render, and the motifs are her own illustrations, pulled out of the PDF with
// their alpha masks intact.
//
// `drafted: true` marks a row SHE LEFT EMPTY that is written here in her voice
// from the collection's imagery — Fall's brief is blank in the deck apart from
// Audience, and Holiday has no flavour strategy. Those want her eyes before
// this is public; nothing else on the page is invented.

export interface BriefRow {
  label: string;
  body: string;
  /** Written here rather than by Ellie — needs her review. */
  drafted?: boolean;
}

/** How the deck arranges a given band. Each season is laid out differently in
 *  her Canva, so this is per-collection rather than one template. */
export interface BandLayout {
  /** Heading alignment. Fall and Holiday centre theirs; the rest sit left. */
  align: "left" | "center";
  /** Where "In a nutshell" sits relative to the heading. Holiday puts it above. */
  nutshell: "inline" | "below" | "above";
  /** Where the motif art goes. Fall runs apples across the top, Spring borders
   *  the bottom with flowers, Holiday hangs lights from both top corners. */
  motifs: "right" | "top-row" | "bottom-row" | "corners" | "scatter";
  /** The deck breaks the longer headings over two lines. */
  headingLines?: string[];
  /** Which edge the framing art occupies, so the copy column can keep clear of
   *  it instead of running underneath. */
  reserve?: "right" | "top" | "bottom" | "none";
}

/** A piece of the band's framing artwork, lifted from the deck with its alpha
 *  mask and placed where she places it. Purely decorative. */
export interface FramePiece {
  src: string;
  /** Absolute-position classes, relative to the view box. */
  className: string;
}

export interface Collection {
  slug: string;
  /** Card label. */
  label: string;
  /** Heading inside the view box, as the deck sets it. */
  briefTitle: string;
  /** The collection's own logotype in the deck, e.g. "CHOCOLATE IS LOVE". */
  wordmark?: string;
  rows: BriefRow[];
  /** Ground colour of the band — sampled from the deck. */
  ground: string;
  /** Display type over that ground. */
  display: string;
  /** Body copy over that ground. */
  body: string;
  motif: string;
  motifAlt: string;
  layout: BandLayout;
  /** Her own band artwork. Falls back to `motif` when a band has none. */
  frame?: FramePiece[];
  /** The product lineup that runs under the brief in her deck, under the
   *  collection's own logotype. Cropped from the deck at full resolution — the
   *  ground is the same blush/sage/etc. as the band, so it sits seamlessly. */
  showcase?: { src: string; alt: string };
}

const AUDIENCE =
  "Gen Z and Millenial women with enough money to splurge on a special sweet treat. They love design, eating healthy and delicious meals, and signaling their identity through their purchases.";

export const seasonsIntro =
  "Five times a year, every year, I owned a full seasonal collection start to finish: concept, product development, packaging, photography direction, and the campaign that took it to market. Over four years, that's 30+ limited-time products. Here's the brief behind each one.";

export const seasons: Collection[] = [
  {
    slug: "valentines",
    label: "Valentine's Day",
    briefTitle: "Valentine's Day Brief",
    wordmark: "Chocolate is Love",
    ground: "var(--ejd-blush)",
    display: "var(--ejd-violet)",
    body: "var(--ejd-ink)",
    motif: "/motifs/valentines-heart.png",
    motifAlt: "A purple candy heart reading “M'Lady (Tips Fedora)”",
    layout: { align: "left", nutshell: "inline", motifs: "right", reserve: "right", headingLines: ["Valentine's Day", "Brief"] },
    showcase: {
      src: "/motifs/valentines-lineup.webp",
      alt: "The Valentine's collection: the Bonbons of Desire box, the Forbidden Fruits, Peanut Butter Banana Affair and Heat & Honey bars, three romance-postcard cards, a rose-covered heart box, candy hearts and the Maeve Books mark",
    },
    frame: [
      // The rose spray descends the right edge and bleeds off the top, with her
      // scattered purple hearts already part of the same artwork.
      {
        // Sized by WIDTH, not panel height: the panel grew a whole product
        // lineup underneath, and a percentage height scaled the rose with it.
        // In the deck the spray covers about 28% of the band's width.
        //
        // Flush right, not bled past it — the artwork's own black hatch lines
        // are its right boundary, so aligning that edge to the panel's is what
        // stops them being sliced. Bigger on a phone, where 30% of a narrow
        // column left it as a smudge. Centred on the BRIEF section rather than
        // pinned to its top, which is where the deck sits it.
        //
        // It bleeds rather than sitting flush because the asset's right 30% is
        // nearly empty — sampling its alpha finds only scattered hearts out
        // there, so a flush right edge parked the petals and stem well inside
        // the panel. Letting the sparse edge run off brings the flower to the
        // border, which is where the deck has it.
        src: "/motifs/valentines-roses.png",
        className: "top-1/2 -translate-y-1/2 -right-[10%] sm:-right-[5%] w-[52%] sm:w-[30%] h-auto",
      },
    ],
    rows: [
      {
        label: "Theme",
        body: "your favorite romance novel or clinch cover wrapped up in a humorous and delicious treat.",
      },
      {
        label: "Flavor Strategy",
        body: "evocative of popular tropes within the romance genre, adding depth to the visual storytelling.",
      },
      {
        label: "Audience",
        body: "Gen Z and Millenial women with enough money to splurge on a special treat. They love design, reading, tongue-in-cheek humor, and signaling their taste and identity through their purchases.",
      },
      {
        label: "Launch Campaign",
        body: "Pop up in multiple book stores across the country and host events where our audience can gather, read, play games and eat delicious treats. Create short romance stories based off the bar wraps and launch microcampaigns on social and email teasing out the stories. Collaborate with influential artist, Valheria Rocha, to create bespoke Valentine cards. Influencer and PR send includes these cards, stickers, a unique bookmark, zines with the romance stories, a postcard so they can send a love letter of their own, and product, of course. Host a “Key To Your Heart” event at the flagship store where pairs can come solve puzzle boxes while they snack on chocolate.",
      },
    ],
  },
  {
    slug: "spring",
    label: "Spring",
    briefTitle: "Spring Brief",
    ground: "var(--ejd-sage)",
    display: "var(--mv-paper)",
    body: "var(--ejd-ink)",
    motif: "/motifs/spring-daffodil.png",
    motifAlt: "An illustrated yellow daffodil",
    showcase: {
      src: "/motifs/spring-lineup.webp",
      alt: "The Spring Mix collection: her flower border, the Spring Mix logotype, three bars, and the garden-party editorial shoot",
    },
    // Her flower border / coaster live in the showcase crop below, and her brief
    // band carries no decoration of its own — so no frame art, rather than
    // falling back to a motif she never put there.
    frame: [],
    layout: { align: "left", nutshell: "inline", motifs: "bottom-row", reserve: "none" },
    rows: [
      {
        label: "Theme",
        body: "After a long, dark Seattle winter, the sun finally comes out and color rematerializes. This line is for the sun-worshipping, flower-loving divas who aren't afraid to get their hands in the dirt and who know exactly how to look chic in a garden.",
      },
      {
        label: "Launch Campaign",
        body: "We brought Gretchen the Bear — from our Hungry Blackberry world — in as the season's main character. The story: a delicious smell wakes her from hibernation, she wanders out of her cave, and stumbles straight into a glamorous garden party. We shot the whole thing Alice in Wonderland–style: girls in ball gowns paired with rubber boots and garden tools, tipped just far enough into absurd and whimsical to feel like Maeve's world rather than a stock garden shoot. On Instagram, Gretchen followed it up with her own guide to recycling and composting, which we then built into the influencer PR box — cards, product, and a mini compost bin for the bonbon wrappers.",
      },
    ],
  },
  {
    slug: "summer",
    label: "Summer",
    briefTitle: "Summer Brief",
    ground: "var(--ejd-ice)",
    display: "var(--mv-paper)",
    body: "var(--ejd-ink)",
    motif: "/motifs/summer-star.png",
    motifAlt: "An illustrated yellow star",
    showcase: {
      src: "/motifs/summer-lineup.webp",
      alt: "The Fair Food collection: the rollercoaster, the Fair Food sign, three bars and the Summer Medley bonbon box",
    },
    // Her flower border / coaster live in the showcase crop below, and her brief
    // band carries no decoration of its own — so no frame art, rather than
    // falling back to a motif she never put there.
    frame: [],
    layout: { align: "left", nutshell: "inline", motifs: "scatter" },
    rows: [
      {
        label: "Theme",
        body: "walking down the food aisle at the state fair but in Maeve's World, with magical rides and zany characters serving you up plates of yum.",
      },
      {
        label: "Flavor Strategy",
        body: "nostalgic and delicious flavors that take you back to the feeling you got as a kid eating fair food for the first time.",
      },
      {
        label: "Flavor names",
        body: "keep it clear and easy to understand; let the design do the storytelling.",
      },
      { label: "Audience", body: AUDIENCE },
    ],
  },
  {
    slug: "fall",
    label: "Fall",
    briefTitle: "Fall Brief",
    ground: "var(--ejd-burnt)",
    display: "var(--mv-paper)",
    body: "var(--ejd-ink)",
    motif: "/motifs/fall-leaf.png",
    motifAlt: "An illustrated orange maple leaf",
    showcase: {
      src: "/motifs/fall-lineup.webp",
      alt: "The Fall Friends-y collection: the logotype, three bars, the Harvest Kounty box and the countryside shoot",
    },
    layout: { align: "center", nutshell: "below", motifs: "top-row", reserve: "none" },
    frame: [
      { src: "/motifs/fall-apples.png", className: "-top-[3%] left-0 w-full max-w-none h-auto" },
    ],
    rows: [
      {
        label: "Theme",
        drafted: true,
        body: "the long weekend at somebody's family place, where the drive out is half the point. Borrowed sweaters, a tractor nobody can start, chickens underfoot, and a table that keeps getting longer as more people turn up. Friendsgiving in Maeve's World, where the countryside is a few shades louder than the one you left.",
      },
      {
        label: "Flavor Strategy",
        drafted: true,
        body: "the flavors you only bother with when there's a crowd to feed — orchard fruit, warm spice, and a splash of something off the top shelf.",
      },
      { label: "Audience", body: AUDIENCE },
      {
        label: "Campaign",
        drafted: true,
        body: "The Friendsy: an invitation rather than an ad. We shot the whole season as one long weekend away — arrivals, the field, the table, the walk back in the dark — and released it in that order so the feed played like somebody's camera roll. The PR send went out as a packing list: product, a card with the invitation, and the sense that the party had already started without you.",
      },
    ],
  },
  {
    slug: "holiday",
    label: "Holiday",
    briefTitle: "Holiday Brief",
    ground: "var(--ejd-red)",
    display: "var(--mv-paper)",
    body: "var(--ejd-ink)",
    motif: "/motifs/holiday-bird.png",
    motifAlt: "An illustrated bird wearing a santa hat",
    showcase: {
      src: "/motifs/holiday-lineup.webp",
      alt: "The Happy Holidays collection: the logotype, three bars, the advent calendar and the night-sky film still",
    },
    layout: { align: "center", nutshell: "above", motifs: "corners", reserve: "top" },
    frame: [
      { src: "/motifs/holiday-lights.png", className: "-top-[2%] left-0 w-full max-w-none h-auto" },
    ],
    rows: [
      {
        label: "Theme",
        body: "Baby, it's warm in here! A nostalgic line reminiscent of walking down a cold city street and looking into cozy, glowing windows filled with loved ones and fond traditions.",
      },
      {
        label: "Flavor Strategy",
        drafted: true,
        body: "the dessert course, borrowed from the traditions people already keep — the thing that only comes out of the oven once a year, made small enough to give away.",
      },
      {
        label: "Flavor names",
        body: "keep it clear and easy to understand; let the design do the storytelling.",
      },
      { label: "Audience", body: AUDIENCE },
    ],
  },
];

// ── Collaborations ────────────────────────────────────────────────────────────
// The same machinery, inverted: the seasonal page is light, this one is dark.
// DCC is the one with published detail (copy doc §5); the rest are written from
// what the momentum section and the asset folders actually evidence, so they are
// all marked drafted.

export const collabsIntro =
  "The other half of the calendar. Partnerships I conceived, pitched and licensed myself — bringing worlds our audience was already obsessed with into ours, and finding out that a fanbase notices everything.";

export const collabs: Collection[] = [
  {
    slug: "dcc",
    label: "Dungeon Crawler Carl",
    briefTitle: "DCC × Maeve",
    wordmark: "Virgin Dirty Shirley",
    ground: "var(--ejd-marigold)",
    display: "var(--ejd-vermilion)",
    body: "var(--ejd-ink)",
    motif: "/motifs/dcc-donut.png",
    motifAlt: "Princess Donut, an illustrated cat in a crown holding a drink",
    layout: { align: "left", nutshell: "inline", motifs: "right", reserve: "right" },
    rows: [
      {
        label: "Theme",
        body: "Some of the best ideas come from paying attention to what people are already obsessed with. Dungeon Crawler Carl is a bestselling, rabidly-loved book series, and I saw an opening to bring its world into ours.",
      },
      {
        label: "What I did",
        body: "I conceived, pitched, and licensed an official collaboration bar, working directly with the author's team to get the details right for a fanbase that notices everything.",
      },
      {
        label: "Result",
        body: "The bar became the fastest sellout in company history and landed in the top 5 highest-volume products we've ever made, within weeks of launch.",
      },
      {
        label: "It wasn't a one-off",
        body: "I later licensed a second partnership with the bestselling novel Fourth Wing, proving the same playbook works twice.",
      },
    ],
  },
  {
    slug: "talea",
    label: "Talea",
    briefTitle: "Talea × Maeve",
    wordmark: "Pineapple Coco Cacao",
    ground: "var(--ejd-blush)",
    display: "var(--ejd-violet)",
    body: "var(--ejd-ink)",
    motif: "/motifs/valentines-heart.png",
    motifAlt: "A purple candy heart",
    layout: { align: "left", nutshell: "inline", motifs: "right" },
    rows: [
      {
        label: "Theme",
        drafted: true,
        body: "Take the Valentine's collection off the shelf for one night. Talea is a Brooklyn brewery with the same audience and the same refusal to be serious about a serious craft, so we co-brewed rather than co-branded.",
      },
      {
        label: "What I did",
        drafted: true,
        body: "A Galentine's rom-com trivia night with a co-brewed Pineapple Coco Cacao sour, craft stations, and the collection as the prize table.",
      },
      { label: "Result", drafted: true, body: "119 attendees, and a chocolate brand in a room full of people who came for beer." },
    ],
  },
  {
    slug: "pax-west",
    label: "PAX West",
    briefTitle: "PAX West",
    wordmark: "Gretchen, Collectible",
    ground: "var(--ejd-sage)",
    display: "var(--mv-paper)",
    body: "var(--ejd-ink)",
    motif: "/motifs/summer-star.png",
    motifAlt: "An illustrated star",
    layout: { align: "left", nutshell: "inline", motifs: "scatter" },
    rows: [
      {
        label: "Theme",
        drafted: true,
        body: "An audience we'd never touched before, at a show where nobody was expecting chocolate.",
      },
      {
        label: "What I did",
        drafted: true,
        body: "Gave away a limited-edition Gretchen the Blackberry Bear collectible card, trading-card style with its own flavor text, so the booth had something to collect rather than something to sample.",
      },
      {
        label: "Result",
        drafted: true,
        body: "Booth demand ran high enough that the venue stationed permanent security to manage the line. The card disappeared fast.",
      },
    ],
  },
  {
    slug: "my-straight-friends",
    label: "My Straight Friends",
    briefTitle: "My Straight Friends",
    wordmark: "800K Views",
    ground: "var(--ejd-ice)",
    display: "var(--ejd-deep)",
    body: "var(--ejd-ink)",
    motif: "/motifs/holiday-bird.png",
    motifAlt: "An illustrated bird",
    layout: { align: "left", nutshell: "inline", motifs: "right" },
    rows: [
      {
        label: "Theme",
        drafted: true,
        body: "Comedy duos have what brands keep trying to buy: an audience that trusts the joke. So we sponsored the joke instead of interrupting it.",
      },
      {
        label: "What I did",
        drafted: true,
        body: "Sponsored their shows over several months and produced branded video content with them rather than around them.",
      },
      { label: "Result", drafted: true, body: "One video hit 800K views." },
    ],
  },
];
