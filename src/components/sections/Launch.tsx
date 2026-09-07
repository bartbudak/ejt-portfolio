import { PostCard } from "@/components/shared/PostCard";
import { embedUrl, launchIntro, launchPosts } from "@/data/launch";

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
// `overflow: hidden` does the rest. The card around it is <PostCard/>, the same
// one the local wall uses, so the two sections stay one system.

const WONK = { fontVariationSettings: '"SOFT" 0, "WONK" 1' } as const;

// The tuning for that crop. Instagram's chrome is a fixed pixel height rather
// than a proportion of the width, so these are absolute values — and they are
// the two numbers to move if Instagram ever restyles the embed.
const IG_HEADER = 54;
const IG_FOOTER = 210;
// The embed presents media in a 4:5 window whatever shape the post itself is.
const MEDIA_ASPECT = "4 / 5";

export function Launch() {
  return (
    <section
      id="launch"
      className="relative w-full"
      style={{ backgroundColor: "var(--ejd-marigold)" }}
    >

      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-10 sm:py-24">
        <h2
          className="text-center font-display font-black uppercase leading-[0.84] tracking-[-0.03em]"
          style={{ ...WONK, color: "var(--ejd-vermilion)", fontSize: "clamp(3.75rem,13vw,8rem)" }}
        >
          National Launch
        </h2>

        {/* Her framing of the national strategy, which she asked to sit between
            the heading and the posts. */}
        <p
          className="mx-auto mt-8 max-w-[62ch] text-base leading-relaxed sm:text-xl"
          style={{ color: "var(--ejd-ink)" }}
        >
          {launchIntro}
        </p>

        <ul className="mt-14 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {launchPosts.map((p) => {
            const src = embedUrl(p.post);
            return (
              <li key={p.partner}>
                <PostCard
                  handle={p.handle ?? p.partner}
                  caption={
                    <>
                      <span className="font-bold">{p.partner}</span> {p.what}.
                    </>
                  }
                  href={src ? p.post : undefined}
                  media={
                    src ? (
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
                      // No link yet: a labelled placeholder holds the shape
                      // rather than an empty frame that reads as broken.
                      <div
                        className="flex flex-col justify-between gap-6 p-5"
                        style={{ aspectRatio: MEDIA_ASPECT, color: "var(--ejd-ink)" }}
                      >
                        <span
                          className="font-display text-xl font-black uppercase leading-[0.95]"
                          style={WONK}
                        >
                          {p.partner}
                        </span>
                        <span className="font-mono text-xs uppercase tracking-[0.14em] opacity-50">
                          Awaiting post link
                        </span>
                      </div>
                    )
                  }
                />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
