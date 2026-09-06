"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

// Sticky top navigation: Ellie's hand-drawn "ejt" monogram on the left, the
// section tabs on the right.
//
// The band is blush, the hero's own colour, so it disappears into the title
// card at the top of the page and stays legible once it rides over the
// vermilion and paper panels below. No rule underneath — a soft shadow instead,
// so the header reads as floating above the page rather than ruled off from it.
//
// The tabs are pages, not anchors: this page is About, and Campaigns is its own
// route. `usePathname` drives the active state so it cannot fall out of sync
// with wherever the reader actually is.

// `site` is `as const`, so each nav entry carries literal types, and TS will
// prove branches unreachable from today's config values alone — with the Resume
// href still empty it decided the external branch was `never`. Widening here
// keeps the config frozen while letting the component handle any entry.
type NavItem = { label: string; href: string; external: boolean };

// next.config sets `trailingSlash: true`, so the live pathname is "/preview/"
// while the config above holds "/preview". Compare them trimmed or the active
// tab never lights up.
const samePath = (a: string, b: string) =>
  a.replace(/\/+$/, "") === b.replace(/\/+$/, "");

export function Header() {
  const pathname = usePathname();

  // The shadow is the cue that the page has moved under the header, so it has
  // nothing to say while the header is still sitting on the hero. It fades in
  // on the first pixel of scroll and fades back out at the top.
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{
        height: "var(--ejt-header)",
        backgroundColor: "var(--ejd-blush)",
        boxShadow: scrolled
          ? "0 1px 2px rgb(26 18 16 / 0.05), 0 10px 24px -14px rgb(26 18 16 / 0.16)"
          : "none",
        transition: "box-shadow 0.25s ease",
      }}
    >
      <nav
        aria-label="Primary"
        // Three tracks, not flex space-between: the outer two are equal `1fr`,
        // so the tabs in the middle sit on the page's true centre line no
        // matter how wide the monogram is. With space-between they would only
        // look centred by coincidence.
        className="mx-auto grid h-full w-full max-w-[1600px] grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 sm:px-8"
      >
        <Link
          href="/preview"
          aria-label={`${site.name} — home`}
          className="inline-flex shrink-0 items-center justify-self-start"
        >
          {site.signature ? (
            <Image
              src={site.signature}
              alt=""
              width={900}
              height={801}
              // An explicit height, NOT h-full: the grid centres its items
              // rather than stretching them, so a percentage height has no
              // definite parent to resolve against and the mark falls back to
              // its intrinsic 900px, which tears the header open. The gap to
              // 4rem is the mark's breathing room — it is cropped tight to its
              // ink, so without it the ascenders and the j's descender sit
              // right on the band's edges.
              className="h-9 w-auto object-contain sm:h-10"
              // Next 16 deprecated `priority` in favour of `preload`.
              preload
            />
          ) : (
            // Fallback if the mark is ever cleared: her name in the script face.
            <span
              className="font-script text-xl leading-none sm:text-2xl"
              style={{ color: "var(--ejd-ink)" }}
            >
              {site.name}
            </span>
          )}
        </Link>

        <ul
          className="flex items-center justify-center gap-5 font-display uppercase tracking-[0.08em] sm:gap-9"
          style={{ color: "var(--ejd-ink)", fontSize: "clamp(0.72rem,1.15vw,0.95rem)" }}
        >
          {(site.nav as readonly NavItem[]).map((item) => {
            const active = !item.external && !!item.href && samePath(pathname, item.href);
            return (
              <li key={item.label}>
                {!item.href ? (
                  // Resume has no destination yet (the Drive link is still to
                  // come). Render the label so the nav reads complete, but not
                  // as a link — `href=""` would quietly reload the page.
                  <span aria-disabled className="opacity-45">
                    {item.label}
                  </span>
                ) : item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-baseline gap-1 underline-offset-4 hover:underline"
                  >
                    {item.label}
                    <span aria-hidden>↗</span>
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    // The active tab carries weight and a rule under it, not
                    // colour alone.
                    className={
                      active
                        ? "border-b-2 pb-0.5 font-bold"
                        : "border-b-2 border-transparent pb-0.5 opacity-70 transition-opacity hover:opacity-100"
                    }
                    style={active ? { borderColor: "var(--ejd-vermilion)" } : undefined}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
