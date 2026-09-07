"use client";

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
type NavItem = {
  label: string;
  href: string;
  external: boolean;
  /** Extra routes that should keep this tab lit. */
  alsoActiveOn?: readonly string[];
};

// next.config sets `trailingSlash: true`, so the live pathname is "/preview/"
// while the config above holds "/preview". Compare them trimmed or the active
// tab never lights up.
const samePath = (a: string, b: string) =>
  a.replace(/\/+$/, "") === b.replace(/\/+$/, "");

// The band takes each page's own ground, so it reads as the top edge of that
// page rather than a fixture bolted over it — the same reason it is blush on
// About, where it disappears into the title card.
const TONES: Record<string, { bg: string; ink: string }> = {
  "/preview": { bg: "var(--ejd-blush)", ink: "var(--ejd-ink)" },
  "/preview/campaigns": { bg: "var(--mv-paper)", ink: "var(--ejd-ink)" },
  "/preview/collabs": { bg: "var(--ejd-burnt)", ink: "var(--mv-paper)" },
};
const DEFAULT_TONE = TONES["/preview"];

// The active tab's rule. Two waves rather than a straight border, drawn as a
// tiled <pattern> rather than one stretched path — with a stretched path the
// wavelength would scale with the label, so "About" and "Campaigns" would get
// different-looking squiggles. userSpaceOnUse tiling keeps every tab on the
// same 12px period.
//
// It sits absolutely under the label, so it costs no layout and the baseline
// does not move between the active tab and the others.
function Squiggle() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-x-0 -bottom-2 h-2 w-full"
      preserveAspectRatio="none"
    >
      <defs>
        <pattern id="ejt-nav-squiggle" width="12" height="8" patternUnits="userSpaceOnUse">
          <path
            d="M0 2.5Q3 0.5 6 2.5T12 2.5M0 6Q3 4 6 6T12 6"
            fill="none"
            stroke="var(--ejd-vermilion)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#ejt-nav-squiggle)" />
    </svg>
  );
}

export function Header() {
  const pathname = usePathname();
  const tone =
    Object.entries(TONES).find(([p]) => samePath(pathname, p))?.[1] ?? DEFAULT_TONE;

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
        backgroundColor: tone.bg,
        color: tone.ink,
        boxShadow: scrolled
          ? "0 1px 2px rgb(26 18 16 / 0.05), 0 10px 24px -14px rgb(26 18 16 / 0.16)"
          : "none",
        transition: "box-shadow 0.25s ease, background-color 0.25s ease",
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
            // Masked, not <img>: the mark is a single-colour shape with an
            // alpha channel, so painting it through a mask lets it take the
            // header's own ink. Tinted into the PNG instead, it would be a
            // near-black monogram sitting invisibly on the dark Collabs band.
            <span
              role="img"
              aria-label={`${site.name} monogram`}
              className="block h-9 w-auto sm:h-10"
              style={{
                aspectRatio: "900 / 801",
                backgroundColor: tone.ink,
                transition: "background-color 0.25s ease",
                WebkitMaskImage: `url(${site.signature})`,
                maskImage: `url(${site.signature})`,
                WebkitMaskSize: "contain",
                maskSize: "contain",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
                maskPosition: "center",
              }}
            />
          ) : (
            // Fallback if the mark is ever cleared: her name in the script face.
            <span
              className="font-script text-xl leading-none sm:text-2xl"
              style={{ color: tone.ink }}
            >
              {site.name}
            </span>
          )}
        </Link>

        <ul
          className="flex items-center justify-center gap-5 font-display uppercase tracking-[0.08em] sm:gap-9"
          style={{ color: tone.ink, fontSize: "clamp(0.75rem,1.15vw,1rem)" }}
        >
          {(site.nav as readonly NavItem[]).map((item) => {
            const active =
              !item.external &&
              !!item.href &&
              (samePath(pathname, item.href) ||
                (item.alsoActiveOn ?? []).some((p) => samePath(pathname, p)));
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
                    // colour alone. The rule is absolutely placed, so both
                    // states keep the same box and nothing shifts on navigation.
                    className={
                      active
                        ? "relative inline-block pb-1 font-bold"
                        : "relative inline-block pb-1 opacity-70 transition-opacity hover:opacity-100"
                    }
                  >
                    {item.label}
                    {active && <Squiggle />}
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
