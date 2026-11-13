import { site } from "@/lib/site";

// Fine print at the foot of every page that ends in Contact.
//
// Added 2026-11-13 at Ellie's request: the images, packaging and campaigns on
// this site belong to Seattle Chocolate Company and its creative partners, who
// let her show them to document her work. She does not claim the IP, and she
// did not design the packaging or build the website. Saying so plainly protects
// her as much as it credits them. The wording lives in `site.credits`.

export function Credits() {
  return (
    <aside
      aria-label="Credits"
      className="w-full px-5 py-8 sm:px-10"
      style={{ backgroundColor: "var(--ejd-ink)", color: "var(--mv-paper)" }}
    >
      <p className="mx-auto max-w-[78ch] text-center font-mono text-xs leading-relaxed opacity-90 sm:text-[0.8125rem]">
        {site.credits}
      </p>
    </aside>
  );
}
