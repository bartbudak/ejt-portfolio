import { embedUrl, launchAlsoRan, launchIntro, launchPosts } from "@/data/launch";

// "NATIONAL LAUNCH" — the partner campaign, shown through the posts it produced.
//
// Each card is Instagram's own embed iframe, which is the only route that works
// here: the site is a static export with no server to hold an API token, and the
// partner accounts are other businesses' and will never authorise an app. The
// iframe form is used rather than Instagram's embed.js — it needs no
// third-party script, survives a static build, and can be lazy-loaded, so four
// embeds cost nothing until they scroll into view.
//
// Every card wears the Maeve frame, matching the compare section and the
// campaign panels.

const WONK = { fontVariationSettings: '"SOFT" 0, "WONK" 1' } as const;

const FRAME: React.CSSProperties = {
  border: "var(--mv-stroke) solid var(--ejd-ink)",
  boxShadow:
    "0 0 0 var(--mv-frame) var(--ejd-vermilion), 0 0 0 calc(var(--mv-frame) + var(--mv-stroke)) var(--ejd-ink)",
  borderRadius: 20,
  margin: "calc(var(--mv-frame) + var(--mv-stroke))",
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
          className="text-center font-display font-black uppercase leading-[0.86] tracking-[-0.03em]"
          style={{ ...WONK, color: "var(--ejd-vermilion)", fontSize: "clamp(2.4rem,8vw,5.5rem)" }}
        >
          National Launch
        </h2>

        <p
          className="mx-auto mt-8 max-w-[64ch] text-center text-base leading-relaxed sm:text-lg"
          style={{ color: "var(--ejd-ink)" }}
        >
          {launchIntro}
        </p>

        <ul className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2">
          {launchPosts.map((p) => {
            const src = embedUrl(p.post);
            return (
              <li key={p.partner} className="flex flex-col">
                <div
                  style={{ ...FRAME, backgroundColor: "var(--mv-paper)" }}
                  className="flex-1 overflow-hidden"
                >
                  {src ? (
                    // Instagram sizes its own chrome; the aspect keeps the row
                    // even before any of them have loaded.
                    <iframe
                      src={src}
                      title={`${p.partner} on Instagram`}
                      loading="lazy"
                      scrolling="no"
                      allow="encrypted-media"
                      className="block h-full w-full"
                      style={{ aspectRatio: "0.62", border: 0 }}
                    />
                  ) : (
                    // No link yet. A labelled placeholder holds the layout and
                    // says what belongs here, rather than an empty frame that
                    // reads as a broken embed.
                    <div
                      className="flex h-full flex-col justify-between gap-6 p-5"
                      style={{ aspectRatio: "0.62", color: "var(--ejd-ink)" }}
                    >
                      <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] opacity-60">
                        {p.handle}
                      </span>
                      <span className="font-display text-lg font-black uppercase leading-[0.95]" style={WONK}>
                        {p.partner}
                      </span>
                      <span className="text-sm leading-snug opacity-80">{p.what}</span>
                      <span className="font-mono text-[0.6rem] uppercase tracking-[0.14em] opacity-50">
                        Awaiting post link
                      </span>
                    </div>
                  )}
                </div>
                {src && (
                  // A caption block in Instagram's shape — avatar, handle, then
                  // the description — but the words are ours: the partner and
                  // what the collaboration actually was, from her deck. The real
                  // post's own caption is inside the embed above; nothing here
                  // is put in these brands' mouths.
                  <div className="mt-5 px-3" style={{ color: "var(--ejd-ink)" }}>
                    <div className="flex items-center gap-2">
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
                      <a
                        href={p.post}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm font-bold underline-offset-2 hover:underline"
                      >
                        {p.handle}
                      </a>
                    </div>
                    <p className="mt-2 text-sm leading-snug">
                      <span className="font-bold">{p.partner}</span> {p.what}.
                    </p>
                    <a
                      href={p.post}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 inline-block font-mono text-[0.65rem] uppercase tracking-[0.14em] opacity-60 hover:opacity-100"
                    >
                      View on Instagram ↗
                    </a>
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        {/* The rest of her national list, which has no post attached. */}
        <ul
          className="mx-auto mt-12 flex max-w-[70ch] flex-wrap justify-center gap-x-6 gap-y-2 text-center text-sm sm:text-base"
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
