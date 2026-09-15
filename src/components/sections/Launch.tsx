import Image from "next/image";
import { PostCard, PostPlaceholder } from "@/components/shared/PostCard";
import { InstagramEmbed } from "@/components/shared/InstagramEmbed";
import { MobileCollapse } from "@/components/shared/MobileCollapse";
import { launchIntro, launchPosts } from "@/data/launch";

// "NATIONAL LAUNCH" — the partner campaign, shown through the posts it produced.
//
// The posts are live Instagram embeds cropped down to their media; the crop and
// the reasoning behind it live in <InstagramEmbed/>. The card around each one is
// <PostCard/>, the same one the local wall uses, so the two sections stay one
// system.

const WONK = { fontVariationSettings: '"SOFT" 0, "WONK" 1' } as const;

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
          style={{
            ...WONK,
            color: "var(--ejd-vermilion)",
            fontSize: "clamp(3.75rem,13vw,8rem)",
          }}
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
          {launchPosts.map((p) => (
            <li key={p.partner}>
              <MobileCollapse
                title={p.partner}
                blurb={p.what}
                thumb={
                  p.still ? (
                    <Image
                      src={p.still}
                      alt=""
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  ) : (
                    <span
                      className="font-display text-xl font-black"
                      style={{ ...WONK, color: "var(--ejd-vermilion)" }}
                    >
                      {(p.handle ?? p.partner)
                        .replace(/^@/, "")
                        .charAt(0)
                        .toUpperCase()}
                    </span>
                  )
                }
              >
                <PostCard
                  handle={p.handle ?? p.partner}
                  caption={
                    <>
                      <span className="font-bold">{p.partner}</span> {p.what}.
                    </>
                  }
                  href={p.post || undefined}
                  media={
                    p.post ? (
                      <InstagramEmbed
                        post={p.post}
                        title={`${p.partner} on Instagram`}
                        aspect={p.aspect}
                      />
                    ) : (
                      // No link yet: a labelled placeholder holds the shape
                      // rather than an empty frame that reads as broken.
                      <PostPlaceholder label={p.partner} />
                    )
                  }
                />
              </MobileCollapse>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
