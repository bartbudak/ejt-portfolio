import Image from "next/image";
import { Marquee } from "@/components/shared/Marquee";
import { PostCard } from "@/components/shared/PostCard";
import { localPosts } from "@/data/scope";

// "LOCAL LAUNCH" — the local half of her launch, shown the way the national half
// is: as a wall of posts. The framing copy that used to sit here now runs in the
// marquee above the section instead, so the display type gets the band to
// itself.
//
// The photographs are her originals; the captions are her own list of what the
// local campaign consisted of, not invented post copy.

const WONK = { fontVariationSettings: '"SOFT" 0, "WONK" 1' } as const;

export function LocalLaunch() {
  return (
    <section
      id="local-launch"
      className="relative w-full"
      style={{ backgroundColor: "var(--ejd-blush)" }}
    >
      {/* The section's own name, pinned under the header for as long as the
          section is on screen. Sticky resolves against this section, so when it
          scrolls away the band goes with it and the next section's band takes
          the slot. */}
      <Marquee
        items={["Local Launch", "Maeve"]}
        background="var(--ejd-marigold)"
        ring="var(--ejd-vermilion)"
        className="sticky top-[var(--ejt-header)] z-30"
      />

      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-10 sm:py-24">
        <h2
          className="text-center font-display font-black uppercase leading-[0.84] tracking-[-0.03em]"
          style={{ ...WONK, color: "var(--ejd-vermilion)", fontSize: "clamp(3.75rem,13vw,8rem)" }}
        >
          Local Launch
        </h2>

        <ul className="mt-14 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {localPosts.map((p) => (
            <li key={p.slug}>
              <PostCard
                handle={p.label}
                caption={p.caption}
                media={
                  <Image
                    src={p.image}
                    alt={p.alt}
                    width={900}
                    height={1125}
                    className="block h-auto w-full"
                  />
                }
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
