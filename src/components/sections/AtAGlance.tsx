import { site } from "@/lib/site";

// "At a glance" — a slim band between "Hi There!" and "Off the Clock".
//
// Added 2026-11-13 after a first-read review of the site as a hiring manager
// would see it: the About page opened with the person and the hobbies and did
// not say, until the Work page or the résumé PDF, what level she worked at or
// what she achieved. This band says both in one glance, in her résumé's own
// words and the same figures as The Results.
//
// It is its own section rather than more copy in "Hi There!" on purpose: that
// section's astronaut photo is sized by the section's height, so extra text
// there makes the photo grow over the copy.

const WONK = { fontVariationSettings: '"SOFT" 0, "WONK" 1' } as const;

export function AtAGlance() {
  const stats = site.stats.filter((s) =>
    (site.proof as readonly string[]).includes(s.value),
  );

  return (
    <section
      aria-label="At a glance"
      className="w-full px-5 py-12 sm:px-10 sm:py-16"
      style={{ backgroundColor: "var(--ejd-marigold)" }}
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <p
          className="max-w-[44ch] text-lg leading-relaxed sm:text-2xl"
          style={{ color: "var(--ejd-ink)", textWrap: "pretty" }}
        >
          {site.scope}
        </p>

        <dl className="grid grid-cols-3 gap-4 sm:gap-8">
          {stats.map((s) => (
            <div key={s.value} className="flex flex-col gap-1">
              <dt
                className="whitespace-nowrap font-display font-black leading-none tracking-[-0.02em] tabular-nums"
                style={{
                  ...WONK,
                  color: "var(--ejd-vermilion)",
                  fontSize: "clamp(1.75rem,3.6vw,3.25rem)",
                }}
              >
                {s.value}
              </dt>
              <dd
                className="text-xs leading-snug sm:text-base"
                style={{ color: "var(--ejd-ink)" }}
              >
                {s.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
