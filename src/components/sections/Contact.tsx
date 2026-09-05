import { site } from "@/lib/site";

// The page's ending. Peak-End: the showcase is the peak, and a page that stops
// dead after it leaves a reader with nowhere to go. Vermilion so the scroll
// closes with a full stop — the hero and this band bookend the quiet paper
// stretch (results + showcase) between them.

const WONK = { fontVariationSettings: '"SOFT" 0, "WONK" 1' } as const;

const LINKS = [
  { label: "Email", href: `mailto:${site.email}`, text: site.email },
  { label: "LinkedIn", href: site.social.linkedin, text: "in/ellie-thompson" },
  { label: "Instagram", href: site.social.instagram, text: "@elliejthompson" },
];

export function Contact() {
  return (
    <section
      id="contact"
      className="w-full px-5 py-20 sm:px-10 sm:py-28"
      style={{ backgroundColor: "var(--ejd-vermilion)" }}
    >
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-8 text-center">
        <h2
          className="font-display font-black uppercase leading-[0.86] tracking-[-0.03em]"
          style={{ ...WONK, color: "var(--ejd-marigold)", fontSize: "clamp(2.6rem,9vw,6.5rem)" }}
        >
          Let&apos;s talk
        </h2>

        <p
          className="max-w-[46ch] text-base leading-relaxed sm:text-lg"
          style={{ color: "var(--ejd-ink)" }}
        >
          {`I'm based in ${site.location} and looking for my next brand home — in-house building something from the ground up, or agency-side helping other brands find their story. If any of this resonates, I'd love to hear from you.`}
        </p>

        <ul className="flex flex-wrap items-center justify-center gap-3">
          {LINKS.filter((l) => l.href).map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="inline-flex rounded-full px-5 py-3 text-sm font-semibold tracking-[0.02em] transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{ backgroundColor: "var(--ejd-marigold)", color: "var(--ejd-ink)" }}
              >
                <span className="sr-only">{l.label}: </span>
                {l.text}
              </a>
            </li>
          ))}
        </ul>

        <p
          className="font-mono text-xs uppercase tracking-[0.14em]"
          style={{ color: "var(--ejd-ink)" }}
        >
          {site.availability}
        </p>
      </div>
    </section>
  );
}
