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
  location: "New York",
  availability: "Open to Brand & Marketing roles in NYC",
  intro:
    "Seven years growing consumer food brands from the inside out. Most notably, I led the from-scratch reinvention of a 30-year-old chocolate company into Maeve, a brand now winning national design awards and selling out in record time. I'm a psychology grad with a serious design habit, and right now I'm looking for my next brand home in NYC.",
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
    { value: "18%", label: "Overall growth" },
    { value: "36 hrs", label: "Fastest sellout in company history" },
    { value: "4", label: "National design awards" },
    { value: "82%", label: "Increase in followers on Instagram. 22k to 40k." },
    { value: "37%", label: "Increase in email subscribers. 40k to 55k" },
  ],
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
    "Moving to NYC",
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
    paragraphs: [
      "My name is Ellie, I am a brand manager and marketing strategist looking to devote myself to a new team.",
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
    { label: "Campaigns", href: "/preview/campaigns", external: false },
    // Its own tab since 2026-09-11, at Ellie's request: it used to be reached
    // only by a cross-link under the Campaigns title, which made half the body
    // of work invisible to anyone who did not scroll to find it. It sits
    // between Campaigns and Resume because that is where she put it.
    { label: "Collaborations", href: "/preview/collabs", external: false },
    // Self-hosted rather than a Drive link: no sign-in wall, no sharing
    // settings to get wrong, and it ships with the site. `external: true` still
    // opens it in a new tab so the portfolio stays put behind it.
    { label: "Resume", href: "/ellie-thompson-resume.pdf", external: true },
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
