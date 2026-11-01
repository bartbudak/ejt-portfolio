import { Marquee } from "@/components/shared/Marquee";
import { beyondTheDesk } from "@/data/personal";

// "BEYOND THE DESK" — new section (2026-11-01 restructure), between "Off the
// Clock" and "My Crown Jewel". Paper ground, so it sits calmer than the sage
// of "Off the Clock" above and the blush of "My Crown Jewel" below.
//
// EAA's exact mission wording and whether its official name carries
// "Foundation" (EAAF) still need Ellie's confirmation — see src/data/personal.ts.

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
