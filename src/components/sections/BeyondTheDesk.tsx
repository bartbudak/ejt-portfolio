import Image from "next/image";
import { Marquee } from "@/components/shared/Marquee";
import { CARD_FRAME } from "@/components/shared/PostCard";
import { beyondTheDesk } from "@/data/personal";

// "BEYOND THE DESK" — new section (2026-11-01 restructure), between "Off the
// Clock" and "My Crown Jewel". Paper ground, so it sits calmer than the sage
// of "Off the Clock" above and the blush of "My Crown Jewel" below.
//
// Copy is hers; see src/data/personal.ts for the board-affiliation note.

const WONK = { fontVariationSettings: '"SOFT" 0, "WONK" 1' } as const;

export function BeyondTheDesk() {
  return (
    <section
      id="beyond-the-desk"
      className="relative w-full"
      style={{ backgroundColor: "var(--mv-paper)" }}
    >
      <Marquee
        items={["Beyond The Desk"]}
        className="sticky top-[var(--ejt-band-top,var(--ejt-header))] z-30"
      />

      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-5 py-16 sm:px-10 sm:py-24">
        <h2
          className="text-center font-display font-black uppercase leading-[0.84] tracking-[-0.03em]"
          style={{ ...WONK, color: "var(--ejd-vermilion)", fontSize: "clamp(2.5rem,8vw,5rem)" }}
        >
          I Go To The Source
        </h2>

        {/* Where she went: a still or a silent loop, framed like the Off the
            Clock photos. Two 3:4 portraits side by side. A video plays only for
            people who have not asked for reduced motion; everyone else sees its
            poster. */}
        <ul className="mx-auto grid w-full max-w-xl grid-cols-2 gap-5 sm:gap-8">
          {beyondTheDesk.media.map((m) => (
            <li key={m.src}>
              <div
                style={CARD_FRAME}
                className="relative aspect-[3/4] overflow-hidden"
              >
                {m.video ? (
                  <>
                    <video
                      className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
                      style={{ objectPosition: m.position }}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      poster={m.src}
                      aria-label={m.alt}
                    >
                      <source src={m.video} type="video/mp4" />
                    </video>
                    <Image
                      src={m.src}
                      alt={m.alt}
                      fill
                      sizes="(min-width: 640px) 280px, 45vw"
                      className="hidden object-cover motion-reduce:block"
                      style={{ objectPosition: m.position }}
                    />
                  </>
                ) : (
                  <Image
                    src={m.src}
                    alt={m.alt}
                    fill
                    sizes="(min-width: 640px) 280px, 45vw"
                    className="object-cover"
                    style={{ objectPosition: m.position }}
                  />
                )}
              </div>
            </li>
          ))}
        </ul>

        <div
          className="space-y-5 text-left text-lg leading-relaxed sm:text-xl"
          style={{ color: "var(--ejd-ink)" }}
        >
          {beyondTheDesk.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
