// Ellie's résumé — the content behind both the page at /preview/resume and the
// PDF it offers, which is printed from the same rendition (scripts/print-resume.sh).
//
// Updated 2026-09-13 from the résumé she supplied in August and the site
// itself, which carries her newer numbers: the scoreboard is `site.stats`
// (her Instagram and email figures supersede the résumé's "5.5x, 10K to 55K"
// line), the brand is "35-year-old" per her 2026-11-01 restructure note
// (standardized site-wide from the deck's "30-year-old"), the seasonal count is
// the 50+ from her own Campaigns intro, the Webby is the People's Voice
// Winner, and the Dungeon Crawler Carl line carries what her collaboration
// copy says: under 36 hours, top three bars by volume in the company's 35-year
// history, and the playable game IGN covered. Nothing here is a claim the site
// does not already make in her words; the drafted collaboration lines that
// still await her copy (Talea, PAX West's card, My Straight Friends' views)
// are left out.

export interface ResumeRole {
  title: string;
  dates: string;
  bullets: string[];
}

export const resume = {
  name: "Ellie Thompson",
  role: "Brand Manager · Marketing Director · Creative Strategist",
  contact: [
    { label: "Seattle, WA" },
    { label: "elliejth@gmail.com", href: "mailto:elliejth@gmail.com" },
    { label: "(425) 785-9919", href: "tel:+14257859919" },
    { label: "elliejthompson.com", href: "https://elliejthompson.com" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/ellie-thompson-aa405116a/",
    },
  ],
  summary:
    "Brand leader with seven years growing consumer food brands from the inside out, and the person behind the reinvention of a 35-year-old company into Maeve Chocolate: a brand now winning national design awards and selling out in record time. Pairs consumer insight with creative direction — sells the vision internally, directs world-class creative partners, and turns concepts into award-winning, record-breaking products.",
  stats: [
    { value: "110%", label: "YoY ecommerce growth post-rebrand" },
    { value: "18%", label: "Company revenue growth" },
    { value: "36 hrs", label: "Fastest sellout in company history: Virgin Dirty Shirley bar" },
    { value: "6", label: "National design awards and placements won by the Maeve project: 5 Dieline, 1 Webby" },
    { value: "82%", label: "Instagram growth, 22K to 40K" },
    { value: "37%", label: "Email growth, 40K to 55K" },
  ],
  employer: {
    name: "Seattle Chocolate Company · Maeve Chocolate & jcoco",
    place: "Seattle, WA",
    dates: "May 2019 – Jun 2026",
    note: "Promoted four times in six years, from Sales Operations to Director of Marketing, at a 75-person national confections company.",
  },
  roles: [
    {
      title: "Director of Marketing",
      dates: "Aug 2025 – Jun 2026",
      bullets: [
        "Led all marketing as the department's voice on the executive leadership team. Led a 6-person in-house team (2 direct reports), directed two creative agencies through briefs and feedback, and helped manage a PR firm.",
        "Conceived, pitched and licensed an official collaboration with Matt Dinniman's bestselling Dungeon Crawler Carl series. The Virgin Dirty Shirley bar sold out in under 36 hours and became one of the top three bars by volume in the company's 35-year history; the tie-in grew into the first playable Dungeon Crawler Carl game (built by web agency View Source, directed by our marketing team), covered by IGN.",
        "Built a national partner strategy on a scrappy budget: rather than pay for dream influencers, went to the stores they shop in. Events and limited-time co-branded products with bookstores, breweries, record stores, vintage stores and museums, including Butterfield Market, Books Are Magic, Su'Juk, Talea Beer Co. and Greenwich Letterpress.",
        "Brought the brand to PAX West, an entirely new audience, where booth demand ran so high the venue stationed permanent security to manage the line.",
        "Secured placement in Pop Up Grocer after years of persistent outreach, expanding the brand's reach with trend-forward retail audiences.",
      ],
    },
    {
      title: "Brand Manager → Senior Brand Manager",
      dates: "Apr 2021 – Aug 2025",
      bullets: [
        "Hired and directed creative agency The Young Jerks after auditioning (and parting with) several others; authored the substance of the brand guidelines and drove detailed creative feedback on every concept for four years.",
        "Partnered with web agency View Source on the Maeve website, a Webby Awards People's Voice Winner for Food & Drink.",
        "Owned the five seasonal collections end to end, from development in 2023 through each launch the year after the rebrand: concept, product development, packaging, photography direction and the campaign that took each to market. 50+ limited-time products, plus email, paid social and search, organic social, PR, influencer and brand collaborations.",
        "Creative-directed 15 photoshoots, growing from on-set assistant to owning concepts, shot lists, prop sourcing, contractor and photographer hiring, and on-set direction.",
        "Reimagined the factory tour and flagship store twice end to end, represented the brands at major trade shows (Expo West, Sweets & Snacks, the NW Chocolate Festival), and partnered with sales daily on collateral across the portfolio.",
        "Grew Instagram from 22K to 40K followers and built the email program that took subscribers from 40K to 55K.",
        "Co-managed sister brand jcoco (craft, culinary-inspired): shaped its 2020 brand refresh, concepted new flavors, and helped create its brand and style guide.",
      ],
    },
    {
      title: "Marketing Coordinator",
      dates: "Dec 2019 – Apr 2021",
      bullets: [
        "Executed digital campaigns, retail collateral and photoshoot production across both brands; earned promotion to Brand Manager within 16 months.",
      ],
    },
    {
      title: "Sales Operations Specialist",
      dates: "May 2019 – Dec 2019",
      bullets: [
        "Joined directly out of college supporting wholesale operations; promoted into marketing within seven months.",
      ],
    },
  ] as ResumeRole[],
  signature: {
    label: "Signature project",
    title: "The Maeve Rebrand",
    body: "Pitched and led the complete reinvention of the company's 35-year-old namesake brand, Seattle Chocolate, into Maeve Chocolate over three years: 100+ products, a new name, and a whole world to put them in, the largest initiative in company history. Owned strategy and final decisions across the reimagined products, packaging, the website, merchandising, trade show booths, sales decks, competitive analysis, launch PR and post-launch campaigns, and served as the rebrand's public face on TV, podcasts and in press interviews. The launch carried the brand into national retail for the first time (including Sprouts, with natural grocery ACV up 3 points) and drove every result in the scoreboard above.",
    link: {
      label: "See the work → maevechocolate.com",
      href: "https://maevechocolate.com",
    },
  },
  beyond: {
    heading: "Beyond the Desk",
    items: [
      "Origin sourcing & storytelling: traveled to cocoa farms in Ghana, Costa Rica, Nicaragua, Ecuador, Peru and Brazil to meet farmers, shape farmer-support initiatives, and capture content for web, social and advertising; trained hands-on in bean-to-bar chocolate making.",
      "Board member, Ethical Apparel Africa Foundation (EAAF) — fair, sustainable garment manufacturing across West Africa.",
      "Board member, Cancer Pathways — helped plan the annual gala fundraiser.",
      "Speaker: industry panels on the climate crisis and its impact on cocoa; guest speaker at the UW Foster School of Business on the Maeve rebrand.",
    ],
  },
  recognition: {
    heading: "Recognition",
    items: [
      {
        name: "Dieline Awards (5)",
        detail:
          "Five placements across 2025 and 2026: 2nd for the everyday line, 2nd for the Celebrations and Holiday collections, 3rd for Spring and a Merit award for Summer. The Young Jerks designed the packaging; I wrote the briefs, managed the agency and went to the press checks.",
      },
      {
        name: "Webby Awards",
        detail:
          "People's Voice Winner, Food & Drink, for the Maeve website, built by agency View Source.",
      },
      {
        name: "NEXTY Awards Finalist",
        detail: "Natural Products Expo West, 2025.",
      },
      {
        name: "IGN",
        detail:
          "Covered the Dungeon Crawler Carl collaboration's playable game, the first of its kind.",
      },
    ],
  },
  expertise: {
    heading: "Expertise",
    items: [
      "Brand strategy & positioning",
      "Creative direction",
      "Product development & LTOs",
      "Licensing & partnerships",
      "Integrated campaigns",
      "Agency & vendor management",
      "Consumer psychology",
      "Retail & experiential",
      "Sales enablement",
      "PR & public speaking",
    ],
  },
  press: {
    heading: "Featured In",
    outlets: [
      "MSNBC",
      "KING 5 News",
      "Evening Magazine",
      "FOX 13 Seattle",
      "Seattle Magazine",
      "Seattle Refined",
      "Bizwomen",
      "Candy & Snack TODAY",
      "The Sweet Life (NCA)",
      "Transform Magazine",
      "Natural Products Insider",
      "Alaska Airlines in-flight media",
    ],
  },
  education: {
    heading: "Education",
    school: "Scripps College · Claremont, CA",
    degree: "BA in Psychology, focus in Media Studies · May 2019",
  },
  // From Kirsty Ellison's reference letter, which runs in full on the site.
  reference: {
    quote:
      "Her innate curiosity, strategic perspective, and genuine kindness make her an inspiring and empathetic leader.",
    name: "Kirsty Ellison",
    title: "VP Marketing, Seattle Chocolate Company",
  },
} as const;
