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

// Rendered under the heading, at her request (2026-09-07). Her words, verbatim.
export const launchIntro =
  "We had to be scrappy with our national strategy since we invested so much into the brand itself. It cost too much to work with some of our dream influencers, but I knew that if I could find the stores the influencers shop in, they could be influenced naturally. We partnered with stores in key locations around the country and created opportunities for our audience to discover Maeve in their own environment. We targeted stores that were not typically associated with chocolate brands, like bookstores, breweries, record stores, vintage stores, and museums. We held events and/or created LTO dual-branded products with them.";

export const launchPosts: LaunchPost[] = [
  // Partners and captions are Ellie's, from her 2026-09-07 feedback. Two of the
  // four were swapped out wholesale (Valheria Rocha for Su'Juk, Soundbooth for
  // Talea), so the old entries are gone rather than reordered.
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
    post: "https://www.instagram.com/p/DOg4VVbEaLd/?img_index=1",
  },
  {
    partner: "Su'Juk",
    what: "Multiple ship and shop experiences",
    handle: "@sujukbrooklyn",
    post: "https://www.instagram.com/p/DUvxx9aEYum/",
  },
  {
    partner: "Talea Beer Co.",
    what: "Romance trivia night with a LTO Pineapple Cacao Sour cobranded beverage",
    handle: "@taleabeer",
    post: "https://www.instagram.com/p/DUletwej_--/",
  },
];

/** The rest of the national list, from her deck — no post links attached yet. */
export const launchAlsoRan = [
  "Talea Brewery, a Valentine's party in their Williamsburg taproom with an LTO chocolate stout",
  "Su'Juk, multiple snack and thrift events",
  "Greenwich Letterpress, chocolate next to their sticker wall",
  "Dungeon Crawler Carl x Maeve bar",
  "My Straight Friends, comedy duo sponsorship",
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
