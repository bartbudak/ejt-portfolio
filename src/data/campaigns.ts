// Seasonal collections — the Campaigns page.
//
// Copy is Ellie's, from assets/maeve/docs/ellie-thompson-portfolio-copy.md §4.
// `needsReview` marks the briefs she flagged [ELLIE TO REVIEW] there: the theme
// was inferred from the imagery rather than confirmed, so those want her eyes
// before this goes live. Valentine's is the only one written from known detail.
//
// `assets` names the folder under assets/maeve/seasonal/ that holds each
// season's media. Nothing is exported to public/ yet — see ASSETS.md — so the
// reveal drawers carry the brief alone until Ellie picks the selects.

export interface Season {
  slug: string;
  label: string;
  /** Short brief. The visuals are meant to carry the weight, not this. */
  brief: string;
  /** Her wording for the disclosure trigger. */
  revealLabel: string;
  /** Folder under assets/maeve/seasonal/. */
  assets: string;
  /** Theme inferred rather than confirmed — needs Ellie's pass. */
  needsReview?: boolean;
}

export const campaignsIntro =
  "Five times a year, every year, I owned a full seasonal collection start to finish: concept, product development, packaging, photography direction, and the campaign that took it to market. Over four years, that's 30+ limited-time products. Here's a taste of each season.";

export const seasons: Season[] = [
  {
    slug: "valentines",
    label: "Valentine's Day",
    brief:
      "A love story that leaned all the way into camp, with vintage-postcard art direction and a bear-and-bee romance illustrated across the whole collection, plus a printed zine as a leave-behind. We took the season off the shelf entirely for one night with a Valentine's Day activation at Talea Brewery in Brooklyn.",
    revealLabel: "Unwrap Valentine's Day",
    assets: "valentines",
  },
  {
    slug: "spring",
    label: "Spring",
    brief:
      "A collection built around bloom, color, and garden-party excess, styled and shot like a fashion editorial, because chocolate deserves the same level of craft as a runway.",
    revealLabel: "Unwrap Spring",
    assets: "spring",
    needsReview: true,
  },
  {
    slug: "summer",
    label: "Summer",
    brief:
      "Bright, breezy, state-fair energy, built for the season people eat the most chocolate outdoors.",
    revealLabel: "Unwrap Summer",
    assets: "summer",
    needsReview: true,
  },
  {
    slug: "fall",
    label: "Fall",
    brief:
      "Moody, cozy, a little bit mysterious. The season where the brand gets to slow down and get atmospheric.",
    revealLabel: "Unwrap Fall",
    assets: "fall",
    needsReview: true,
  },
  {
    slug: "holiday",
    label: "Holiday",
    brief:
      "The biggest collection of the year, brought to life with press events, a life-sized holiday camper, and a full village build-out.",
    revealLabel: "Unwrap Holiday",
    assets: "holiday",
    needsReview: true,
  },
];
