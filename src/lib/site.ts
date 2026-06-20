// Single source of truth for site-wide identity. Update these as Ellie's
// details get confirmed, and the metadata / nav / footer follow automatically.
export const site = {
  name: "Ellie J. Thompson",
  shortName: "EJT",
  role: "Creative Director",
  tagline: "Creative direction, brand, and art direction.",
  url: "https://elliejthompson.com",
  email: "elliejth@gmail.com",
  location: "Seattle",
  description:
    "Portfolio of Ellie J. Thompson — creative director and art director crafting brand worlds, campaigns, and visual systems.",
  // While the full site is in progress, render the coming-soon holding page.
  // Flip to false to launch the full multi-section site.
  comingSoon: true,
  nav: [
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
  social: {
    instagram: "https://instagram.com/elliejthompson",
    linkedin: "https://www.linkedin.com/in/ellie-thompson-aa405116a/",
    behance: "",
    email: "elliejth@gmail.com",
  },
} as const;
