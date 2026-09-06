import Image from "next/image";
import { PostCard } from "@/components/shared/PostCard";
import { everydayIntro, localIntro, localPosts } from "@/data/scope";

// "Everyday Launch" — her two-pronged launch, and the local half of it shown the
// way the national half is: as a wall of posts. The photographs come off her
// own Local Launch board in the deck; the captions are her list of what the
// local campaign consisted of, not invented post copy.

const WONK = { fontVariationSettings: '"SOFT" 0, "WONK" 1' } as const;

export function EverydayLaunch() {
  return (
    <section
      id="everyday-launch"
      className="w-full px-5 py-16 sm:px-10 sm:py-24"
      style={{ backgroundColor: "var(--ejd-blush)" }}
    >
      <div className="mx-auto w-full max-w-6xl">
        <h2
          className="text-center font-display font-black uppercase leading-[0.84] tracking-[-0.03em]"
          style={{ ...WONK, color: "var(--ejd-vermilion)", fontSize: "clamp(2.8rem,10vw,7.5rem)" }}
        >
          Everyday Launch
        </h2>

        <p
          className="mx-auto mt-8 max-w-[62ch] text-center text-base leading-relaxed sm:text-lg"
          style={{ color: "var(--ejd-ink)" }}
        >
          {everydayIntro}
        </p>

        <h3
          className="mt-16 text-center font-display font-black uppercase leading-[0.9] tracking-[-0.02em]"
          style={{ ...WONK, color: "var(--ejd-vermilion)", fontSize: "clamp(1.8rem,5vw,3.4rem)" }}
        >
          Local
        </h3>
        <p
          className="mx-auto mt-4 max-w-[62ch] text-center text-sm leading-relaxed sm:text-base"
          style={{ color: "var(--ejd-ink)" }}
        >
          {localIntro}
        </p>

        <ul className="mt-12 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {localPosts.map((p) => (
            <li key={p.slug}>
              <PostCard
                handle={p.label}
                caption={p.caption}
                media={
                  <Image
                    src={p.image}
                    alt={p.alt}
                    width={720}
                    height={900}
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
