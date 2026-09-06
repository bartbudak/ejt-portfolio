// "National Launch" — from page 1 of Ellie's deck, where she lists the partners
// the national campaign ran with and shows the posts that came out of it.
//
// ⚠️ On pulling these automatically: you cannot. Instagram's Basic Display API
// was retired in December 2024, and the Graph API only returns media for
// accounts that have authorised the app — which these partner accounts never
// will, since they belong to other businesses. Scraping breaks Instagram's ToS
// and breaks in practice. Embedding a specific post by URL is the public,
// sanctioned route, so each entry carries a `post` and the section renders
// Instagram's own embed for it.
//
// `post` takes either a full post/reel URL or a bare shortcode.

export interface LaunchPost {
  /** Partner or collaborator, in Ellie's words. */
  partner: string;
  /** What the collaboration actually was. */
  what: string;
  /** Instagram post URL or shortcode. Empty until the link is supplied. */
  post: string;
  /** Handle, shown while a post link is still missing. */
  handle?: string;
}

// Not rendered — the section is the heading and the posts alone. Kept because
// it is her deck's own framing of the campaign.
export const launchIntro =
  "We had a two-pronged approach to Maeve's launch; one campaign focused on converting local Seattle Chocolate fans into Maevens, and one aimed at capturing new members of our target audience across the country.";

export const launchPosts: LaunchPost[] = [
  {
    partner: "Butterfield Market",
    what: "Frozen yogurt s'mores using Maeve's chocolate",
    handle: "@butterfieldnyc",
    post: "https://www.instagram.com/p/Db3cky_R3vJ/",
  },
  {
    partner: "Books Are Magic",
    what: "Chocolate and book pairings in all their stores",
    handle: "@booksaremagicbk",
    post: "https://www.instagram.com/p/DcCPZcUGruv/?img_index=1",
  },
  {
    partner: "Valheria Rocha",
    what: "Artist collaboration — Maeve, Certified Magic",
    handle: "@maevechocolate",
    post: "https://www.instagram.com/p/DcJ2qYnSO68/",
  },
  {
    partner: "Soundbooth Theater",
    what: "Mama's Night Off — the Dungeon Crawler Carl webgame",
    handle: "@maevechocolate",
    post: "https://www.instagram.com/p/Da0cujESC6-/",
  },
];

/** The rest of the national list, from her deck — no post links attached yet. */
export const launchAlsoRan = [
  "Talea Brewery — Valentine's party in their Williamsburg taproom, with an LTO chocolate stout",
  "Su'Juk — multiple snack + thrift events",
  "Greenwich Letterpress — chocolate next to their sticker wall",
  "Dungeon Crawler Carl × Maeve bar",
  "My Straight Friends — comedy duo sponsorship",
];

/** Pulls the shortcode out of a post URL, or passes a bare shortcode through. */
export function embedUrl(post: string): string | null {
  if (!post) return null;
  const match = post.match(/instagram\.com\/(?:p|reel|reels|tv)\/([A-Za-z0-9_-]+)/);
  const code = match ? match[1] : /^[A-Za-z0-9_-]+$/.test(post) ? post : null;
  // Plain `/embed/`, not `/embed/captioned/` — the caption is rebuilt in our
  // own chrome, and the shorter the embed's own furniture the less of it has
  // to be cropped away.
  return code ? `https://www.instagram.com/p/${code}/embed/` : null;
}
