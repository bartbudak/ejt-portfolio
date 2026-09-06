import { embedUrl, launchAlsoRan, launchIntro, launchPosts } from "@/data/launch";

// "NATIONAL LAUNCH" — the partner campaign, shown through the posts it produced.
//
// Instagram's embed is a cross-origin iframe: its header ("handle · View
// profile") and its footer ("View more on Instagram", the like row) cannot be
// hidden or restyled from out here — same-origin policy — and no parameter
// returns the media on its own.
//
// So the embed is CROPPED rather than styled. The iframe is made taller than its
// window and pulled up by the height of Instagram's header, leaving only the
// media band visible; the footer falls past the bottom edge and
// `overflow: hidden` does the rest. The post card around it — avatar, handle,
// caption — is then entirely ours, in the Maeve frame the rest of the site uses.

const WONK = { fontVariationSettings: '"SOFT" 0, "WONK" 1' } as const;

// The tuning for that crop. Instagram's chrome is a fixed pixel height rather
// than a proportion of the width, so these are absolute values — and they are
// the two numbers to move if Instagram ever restyles the embed.
const IG_HEADER = 54;
const IG_FOOTER = 210;
// The embed presents media in a 4:5 window whatever shape the post itself is.
const MEDIA_ASPECT = "4 / 5";

const FRAME: React.CSSProperties = {
  border: "var(--mv-stroke) solid var(--ejd-ink)",
  boxShadow:
    "0 0 0 var(--mv-frame) var(--ejd-vermilion), 0 0 0 calc(var(--mv-frame) + var(--mv-stroke)) var(--ejd-ink)",
  borderRadius: 20,
  margin: "calc(var(--mv-frame) + var(--mv-stroke))",
  backgroundColor: "var(--mv-paper)",
};

export function Launch() {
  return (
    <section
      id="launch"
      className="w-full px-5 py-16 sm:px-10 sm:py-24"
      style={{ backgroundColor: "var(--ejd-marigold)" }}
    >
      <div className="mx-auto w-full max-w-6xl">
        <h2
          className="text-center font-display font-black uppercase leading-[0.84] tracking-[-0.03em]"
          style={{ ...WONK, color: "var(--ejd-vermilion)", fontSize: "clamp(3rem,10.5vw,8rem)" }}
        >
          National Launch
        </h2>

        <p
          className="mx-auto mt-8 max-w-[60ch] text-center text-base leading-relaxed sm:text-lg"
          style={{ color: "var(--ejd-ink)" }}
        >
          {launchIntro}
        </p>

        <ul className="mt-14 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {launchPosts.map((p) => {
            const src = embedUrl(p.post);
            return (
              <li key={p.partner}>
                <div style={FRAME} className="overflow-hidden">
                  {/* Our header, in place of Instagram's. */}
                  <div
                    className="flex items-center gap-2 px-3 py-2"
                    style={{ borderBottom: "var(--mv-stroke) solid var(--ejd-ink)" }}
                  >
                    <span
                      aria-hidden
                      className="grid h-7 w-7 flex-none place-items-center rounded-full font-display text-xs font-black"
                      style={{
                        backgroundColor: "var(--ejd-vermilion)",
                        color: "var(--ejd-marigold)",
                        border: "var(--mv-stroke) solid var(--ejd-ink)",
                        ...WONK,
                      }}
                    >
                      {p.partner.charAt(0)}
                    </span>
                    <span
                      className="min-w-0 flex-1 truncate text-sm font-bold"
                      style={{ color: "var(--ejd-ink)" }}
                    >
                      {p.handle}
                    </span>
                  </div>

                  {src ? (
                    <div
                      className="relative w-full overflow-hidden"
                      style={{ aspectRatio: MEDIA_ASPECT, backgroundColor: "var(--ejd-ink)" }}
                    >
                      <iframe
                        src={src}
                        title={`${p.partner} on Instagram`}
                        loading="lazy"
                        scrolling="no"
                        allow="encrypted-media"
                        className="absolute left-0 w-full"
                        style={{
                          top: `-${IG_HEADER}px`,
                          height: `calc(100% + ${IG_HEADER + IG_FOOTER}px)`,
                          border: 0,
                        }}
                      />
                    </div>
                  ) : (
                    // No link yet: a labelled placeholder holds the shape rather
                    // than an empty frame that reads as a broken embed.
                    <div
                      className="flex flex-col justify-between gap-6 p-5"
                      style={{ aspectRatio: MEDIA_ASPECT, color: "var(--ejd-ink)" }}
                    >
                      <span
                        className="font-display text-lg font-black uppercase leading-[0.95]"
                        style={WONK}
                      >
                        {p.partner}
                      </span>
                      <span className="text-sm leading-snug opacity-80">{p.what}</span>
                      <span className="font-mono text-[0.6rem] uppercase tracking-[0.14em] opacity-50">
                        Awaiting post link
                      </span>
                    </div>
                  )}

                  {/* The description, where Instagram puts a caption. The words
                      are ours — the partner and what the collaboration was, from
                      her deck — never an invented version of what these brands
                      actually posted. */}
                  <div
                    className="px-3 py-3"
                    style={{
                      borderTop: "var(--mv-stroke) solid var(--ejd-ink)",
                      color: "var(--ejd-ink)",
                    }}
                  >
                    <p className="text-sm leading-snug">
                      <span className="font-bold">{p.handle}</span> {p.what}.
                    </p>
                    {src && (
                      <a
                        href={p.post}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 inline-block font-mono text-[0.6rem] uppercase tracking-[0.14em] opacity-60 hover:opacity-100"
                      >
                        View on Instagram ↗
                      </a>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        {/* The rest of her national list, which has no post attached. */}
        <ul
          className="mx-auto mt-14 flex max-w-[70ch] flex-wrap justify-center gap-x-6 gap-y-2 text-center text-sm sm:text-base"
          style={{ color: "var(--ejd-ink)" }}
        >
          {launchAlsoRan.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
