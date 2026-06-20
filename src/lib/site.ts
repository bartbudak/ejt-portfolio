// Single source of truth for site-wide identity. Update these as Ellie's
// details get confirmed, and the metadata / nav / footer follow automatically.
export const site = {
  name: "Ellie J. Thompson",
  shortName: "EJT",
  // TODO: confirm exact title/positioning with Ellie.
  role: "Creative Director",
  tagline: "Creative direction, brand, and art direction.",
  url: "https://elliejthompson.com",
  // TODO: confirm the public contact address.
  email: "hello@elliejthompson.com",
  location: "", // TODO
  description:
    "Portfolio of Ellie J. Thompson — creative director and art director crafting brand worlds, campaigns, and visual systems.",
  nav: [
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
  // TODO: fill in real handles, or remove the ones that don't apply.
  social: {
    instagram: "", // e.g. "https://instagram.com/elliejthompson"
    linkedin: "", // e.g. "https://linkedin.com/in/elliejthompson"
    behance: "",
    email: "hello@elliejthompson.com",
  },
} as const;
