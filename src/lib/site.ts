// Single source of truth for site-wide identity.
//
// POSITIONING (confirmed by Bart, 2026-09-04): Ellie's own Canva deck and her
// copy doc (assets/maeve/docs/ellie-thompson-portfolio-copy.md) win wherever
// they contradict HANDOFF.md. That means she is presented as a BRAND /
// MARKETING leader looking for a role in NYC — results-first — not as an
// agency-side Creative Director. See ASSETS.md.
export const site = {
  name: "Ellie Thompson",
  shortName: "EJT",
  role: "Brand Manager · Marketing Director · Creative Strategist",
  // Deck order — "Creative Strategist" sits centre, where the cut-out
  // overlaps it.
  roles: ["Brand Manager", "Creative Strategist", "Marketing Director"],
  // Short form for <title> / OG — the full `role` string is too long there.
  metaRole: "Brand & Marketing Director",
  headline: "I make brands people wait in line for.",
  url: "https://elliejthompson.com",
  email: "elliejth@gmail.com",
  // Ellie is based in Seattle (2026-11-13: she is not moving to New York, so every
  // "New York" / "NYC" line was changed to Seattle).
  location: "Seattle, WA",
  availability: "Open to Brand & Marketing roles",
  intro:
    "Seven years growing consumer food brands from the inside out. Most notably, I led the from-scratch reinvention of a 35-year-old chocolate company into Maeve, a brand now winning national design awards and selling out in record time. I'm a psychology grad with a serious design habit, and right now I'm looking for my next brand home.",
  description:
    "I'm Ellie Thompson, the brand and marketing leader behind Maeve, the reinvention of Seattle Chocolate Company.",
  // While the full site is in progress, render the coming-soon holding page.
  // Flip to false to launch the full multi-section site.
  comingSoon: true,
  // Hero scoreboard. Four, not six — her deck lists 110% / +12% / 4 awards /
  // 36 hrs / 5.5x / 81% IG; the two weakest (+12% B2B, 81% IG) dilute the rest.
  // Swap them back in here if she'd rather lead with breadth than punch.
  // Seven, not four. She asked for overall growth, Instagram and email
  // subscribers to be added; her Instagram and email numbers supersede the
  // older "5.5x / 10K to 55K" line, which disagreed with them.
  stats: [
    { value: "110%", label: "YoY ecommerce growth post-rebrand" },
    { value: "18%", label: "Company revenue growth" },
    { value: "36 hrs", label: "Fastest sellout in company history: our Virgin Dirty Shirley bar" },
    // 6 = 5 Dieline placements (verified against Dieline's own 2025 and 2026
    // winners pages, 2026-11-13) + 1 Webby. NEXTY is a finalist, so it is not counted.
    { value: "6", label: "National design awards and placements won by the Maeve project" },
    { value: "82%", label: "Increase in followers on Instagram. 22k to 40k." },
    { value: "37%", label: "Increase in email subscribers. 40k to 55k." },
  ],
  // What the Director role covered: her résumé's own wording, in the first
  // person. Shown in the "at a glance" band under "Hi There!".
  scope:
    "As Marketing Director, I led all marketing as the department's voice on the executive leadership team, managing a 6-person in-house team plus 10 agency partners across two creative agencies.",
  // The three numbers shown under "Hi There!" so results come before the
  // personal sections (a reviewer's first-read feedback, 2026-11-13). They are
  // looked up in `stats` by value, so the wording stays in one place.
  proof: ["110%", "36 hrs", "6"],
  // Under the Results grid. From her résumé's Maeve Rebrand entry: "carried the
  // brand into national retail for the first time (including Sprouts, with
  // natural grocery ACV up 3 points)". ACV is spelled out for non-CPG readers.
  // Wholesale added 2026-11-13 from Ellie: it grew 12% year over year, after
  // under 5% a year before Maeve. Her note also said wholesale is "roughly 70%"
  // of the company's income; that share is NOT published here because she says
  // company financials are off limits. Say "largest channel" instead.
  resultsNote:
    "Wholesale, our largest sales channel, grew 12% year over year, after growing less than 5% a year before Maeve. The launch also took Maeve into national retail for the first time, including Sprouts, where our natural grocery distribution (ACV) rose 3 points.",
  // Fine print shown at the foot of every page (components/shared/Credits).
  credits:
    "Maeve, Seattle Chocolate Company and the packaging, artwork, photography and campaigns shown on this site belong to Seattle Chocolate Company and its creative partners, and are shown here with their permission to document my work. The Young Jerks designed the packaging and View Source built the website; I led the marketing work around them, and I do not claim ownership of any of this IP. Instagram posts belong to the accounts that published them.",
  // The scrolling band under the hero (components/shared/Marquee.tsx). The
  // first two were the title card's corner tags in her deck. Keep this list
  // short — the component repeats it to fill the loop, so length here is about
  // what the band says, not whether it scrolls cleanly.
  // One item per phrase. They used to be three phrases plus a fourth that
  // packed three MORE phrases behind interpuncts of its own, which is why the
  // separators looked mismatched: the band's own dots sat between items, and
  // those inner ones were plain text at a different size. Splitting them out
  // means every gap in the band is the same dot (Ellie, 2026-09-07). The full
  // role names are hers too.
  marquee: [
    "Open to Work",
    "Based in Seattle, WA",
    "Brand Management",
    "Marketing Directing",
    "Creative Strategy",
  ],
  // "HI THERE!" — her deck's own introduction, verbatim. Deliberately hers and
  // not the longer About in assets/maeve/docs/ellie-thompson-portfolio-copy.md;
  // that fuller history (psychology degree, four promotions, the jcoco refresh,
  // the exec team) is still unused and wants a section of its own.
  about: {
    heading: "Hi There!",
    script: "Hello",
    // Her deck's introduction stays exactly as the deck has it. The scope of the
    // Director role (below) used to be added here; it made the section taller,
    // and the astronaut photo is sized by the section's height, so it grew over
    // the copy. It lives in its own band now (components/sections/AtAGlance).
    paragraphs: [
      "My name is Ellie, and I am a brand manager and marketing strategist looking to devote myself to a new team.",
      "I led the rebrand of Seattle Chocolate into Maeve and spent 7 years at the business on the marketing team, most recently as the Marketing Director and before that as the Brand Manager.",
      "I love color on color, refined absurdity and attempting to create original experiences for myself and others.",
    ],
  },
  // Sticky top nav (components/layout/Header.tsx). These are ROUTES, not
  // anchors — the tabs switch pages, and the header derives the active tab from
  // the pathname, so these strings must stay exact.
  //
  // ⚠️ They point into /preview because that is where the site is being built
  // while the live domain still serves the coming-soon page. At launch they
  // become "/" and "/campaigns".
  nav: [
    { label: "About", href: "/preview", external: false },
    // New tab (2026-11-01 restructure): everything from "The Idea" through
    // Kirsty's letter, moved off About, which now teases this page instead.
    { label: "Work", href: "/preview/work", external: false },
    // Campaigns and Collaborations merged into one tab (2026-11-01
    // restructure): Seasonal Collections first, then the partnerships, on one
    // page. The two old routes now redirect here (firebase.json).
    {
      label: "Campaigns & Collabs",
      href: "/preview/campaigns-and-collabs",
      external: false,
    },
    // Its own page since 2026-09-13 (Bart): the résumé rendered in the site's
    // own type inside the frame, with the PDF — printed from that same
    // rendition — offered for download at the top.
    { label: "Resume", href: "/preview/resume", external: false },
  ],
  // Her hand-drawn "ejt" monogram, used as the logo in the header. Extracted
  // from the Procreate PDF she supplied: a 2388x1668 JPEG of black ink on
  // white, knocked out to alpha off its own luminance and tinted to --ejd-ink.
  // Set to "" to fall back to her name in the script face.
  signature: "/brand/ellie-signature.png",
  social: {
    instagram: "https://instagram.com/elliejthompson",
    linkedin: "https://www.linkedin.com/in/ellie-thompson-aa405116a/",
    behance: "",
    email: "elliejth@gmail.com",
  },
} as const;
