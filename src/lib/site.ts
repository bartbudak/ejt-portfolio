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
    "Seven years growing consumer food brands from the inside out. Most notably, I led the from-scratch reinvention of a 25-year-old chocolate company into Maeve — a brand now winning national design awards and selling out in record time. I'm a psychology grad with a serious design habit, and right now I'm looking for my next brand home in NYC.",
  description:
    "Portfolio of Ellie Thompson — the brand and marketing leader behind Maeve, the reinvention of Seattle Chocolate Company.",
  // While the full site is in progress, render the coming-soon holding page.
  // Flip to false to launch the full multi-section site.
  comingSoon: true,
  // Hero scoreboard. Four, not six — her deck lists 110% / +12% / 4 awards /
  // 36 hrs / 5.5x / 81% IG; the two weakest (+12% B2B, 81% IG) dilute the rest.
  // Swap them back in here if she'd rather lead with breadth than punch.
  stats: [
    { value: "110%", label: "YoY ecommerce growth post-rebrand" },
    { value: "36 hrs", label: "Fastest sellout in company history" },
    { value: "4", label: "National design awards" },
    { value: "5.5x", label: "Email list growth, 10K to 55K" },
  ],
  // The scrolling band under the hero (components/shared/Marquee.tsx). The
  // first two were the title card's corner tags in her deck; the rest keep the
  // loop from reading as a two-word stutter on a wide screen.
  marquee: [
    "Open to Work",
    "Moving to NYC",
    "Brand · Marketing · Creative Strategy",
    "Let's talk",
    "Portfolio 2026",
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
  // Nothing renders these right now — the floating header was removed. Kept as
  // config for whatever navigation comes back; keep the hrefs matching real
  // section ids so it can't drift out of sync again.
  nav: [
    { label: "Results", href: "#results" },
    { label: "Work", href: "#before-after" },
    { label: "Contact", href: "#contact" },
  ],
  social: {
    instagram: "https://instagram.com/elliejthompson",
    linkedin: "https://www.linkedin.com/in/ellie-thompson-aa405116a/",
    behance: "",
    email: "elliejth@gmail.com",
  },
} as const;
