import Image from "next/image";
import { MobileCollapse } from "@/components/shared/MobileCollapse";
import { ExternalIcon } from "@/components/shared/ExternalLink";
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
      className="relative w-full"
      style={{ backgroundColor: "var(--ejd-vermilion)" }}
    >
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-10 sm:py-24">
        <h2
          className="text-center font-display font-black uppercase leading-[0.84] tracking-[-0.03em]"
          style={{
            ...WONK,
            color: "var(--ejd-marigold)",
            fontSize: "clamp(3.75rem,13vw,8rem)",
          }}
        >
          Awards
        </h2>

        <ul className="mt-14 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {awards.map((a) => (
            <li key={a.name}>
              <MobileCollapse
                title={a.name}
                blurb={a.detail}
                thumb={
                  a.preview ? (
                    <Image
                      src={a.preview.src}
                      alt=""
                      fill
                      sizes="56px"
                      className={
                        a.preview.contain
                          ? "object-contain p-1"
                          : "object-cover"
                      }
                    />
                  ) : (
                    <span className="font-display text-xl font-black">★</span>
                  )
                }
              >
                <div
                  style={FRAME}
                  className="flex h-full flex-col overflow-hidden"
                >
                  {a.preview && (
                    // The preview is the work, not the article: her site for the
                    // Webby, her on the Dieline stage, the game's own character
                    // for the IGN piece. Screenshots of other people's pages would
                    // put their layouts on her portfolio to no purpose.
                    //
                    // One fixed 4:3 well for all four, rather than each image
                    // setting its own height off its intrinsic ratio. Three of the
                    // sources are 720x540 and fill it exactly; the NEXTY badge is
                    // 958x630, and used to make its card's picture visibly
                    // shallower than the rest of the row (Ellie, 2026-09-11). It
                    // now sits `contain` inside the same well, padded, on its own
                    // white ground.
                    <div
                      className="relative w-full"
                      style={{
                        aspectRatio: "4 / 3",
                        backgroundColor: a.preview.bg ?? "var(--ejd-blush)",
                        borderBottom: "var(--mv-stroke) solid var(--ejd-ink)",
                      }}
                    >
                      <Image
                        src={a.preview.src}
                        alt={a.preview.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                        className={
                          a.preview.contain
                            ? "object-contain p-5"
                            : "object-cover"
                        }
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col gap-3 p-5">
                    <h3
                      className="font-display text-xl font-black uppercase leading-[0.95] tracking-[-0.01em]"
                      style={{ ...WONK, color: "var(--ejd-vermilion)" }}
                    >
                      {a.name}
                    </h3>
                    <p
                      className="flex-1 text-base leading-snug"
                      style={{ color: "var(--ejd-ink)" }}
                    >
                      {a.detail}
                    </p>
                    {/* She directed the work; the agencies executed it. The credit
                    stays on the card rather than in a footnote. */}
                    {a.credit && (
                      <p
                        className="font-mono text-xs uppercase tracking-[0.14em] opacity-60"
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
                        // Ink, not the display colour: at this size the display
                        // token measured 2.27:1 on the card, where 4.5 is the bar.
                        // Ink is the one token guaranteed readable on the ground in
                        // every theme, so this holds whichever palette is on.
                        className="-mx-1 inline-block px-1 py-2 font-mono text-xs font-bold uppercase tracking-[0.12em] underline underline-offset-4"
                        style={{ color: "var(--ejd-ink)" }}
                      >
                        {a.linkLabel ?? "Read more"}
                        <ExternalIcon className="ml-[0.3em]" />
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    )}
                    {a.extra && (
                      <a
                        href={a.extra.href}
                        target="_blank"
                        rel="noreferrer"
                        className="-mx-1 inline-block px-1 py-2 font-mono text-xs font-bold uppercase tracking-[0.12em] underline underline-offset-4 opacity-80 hover:opacity-100"
                        style={{ color: "var(--ejd-ink)" }}
                      >
                        {a.extra.label}
                        <ExternalIcon className="ml-[0.3em]" />
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    )}
                  </div>
                </div>
              </MobileCollapse>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
