import { awards } from "@/data/awards";

// "AWARDS" — her deck sets this on marigold, but National Launch immediately
// above it already is, so the two would run together as one field. Vermilion
// keeps them apart and gives the brag its own beat.

const WONK = { fontVariationSettings: '"SOFT" 0, "WONK" 1' } as const;

const FRAME: React.CSSProperties = {
  border: "var(--mv-stroke) solid var(--ejd-ink)",
  boxShadow:
    "0 0 0 var(--mv-frame) var(--ejd-marigold), 0 0 0 calc(var(--mv-frame) + var(--mv-stroke)) var(--ejd-ink)",
  borderRadius: 20,
  margin: "calc(var(--mv-frame) + var(--mv-stroke))",
  backgroundColor: "var(--ejd-blush)",
};

export function Awards() {
  return (
    <section
      id="awards"
      className="w-full px-5 py-16 sm:px-10 sm:py-24"
      style={{ backgroundColor: "var(--ejd-vermilion)" }}
    >
      <div className="mx-auto w-full max-w-6xl">
        <h2
          className="text-center font-display font-black uppercase leading-[0.84] tracking-[-0.03em]"
          style={{ ...WONK, color: "var(--ejd-marigold)", fontSize: "clamp(3rem,10.5vw,8rem)" }}
        >
          Awards
        </h2>

        <ul className="mt-14 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {awards.map((a) => (
            <li key={a.name}>
              <div
                style={FRAME}
                className="flex h-full flex-col gap-3 p-5"
              >
                <h3
                  className="font-display text-xl font-black uppercase leading-[0.95] tracking-[-0.01em]"
                  style={{ ...WONK, color: "var(--ejd-vermilion)" }}
                >
                  {a.name}
                </h3>
                <p className="flex-1 text-sm leading-snug" style={{ color: "var(--ejd-ink)" }}>
                  {a.detail}
                </p>
                {/* She directed the work; the agencies executed it. The credit
                    stays on the card rather than in a footnote. */}
                {a.credit && (
                  <p
                    className="font-mono text-[0.6rem] uppercase tracking-[0.14em] opacity-60"
                    style={{ color: "var(--ejd-ink)" }}
                  >
                    {a.credit}
                  </p>
                )}
                {a.href && (
                  <a
                    href={a.href}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-[0.62rem] uppercase tracking-[0.14em] underline-offset-4 hover:underline"
                    style={{ color: "var(--ejd-vermilion)" }}
                  >
                    {a.linkLabel ?? "Read more"} ↗
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
