"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { site } from "@/lib/site";
import { ExternalIcon } from "@/components/shared/ExternalLink";

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
  // Collabs used to run on burnt orange as the inverse of Campaigns. Ellie
  // asked for the two to share a look now that Collaborations is its own tab
  // (2026-09-11), so the band takes the same paper ground.
  "/preview/collabs": { bg: "var(--mv-paper)", ink: "var(--ejd-ink)" },
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
        <pattern
          id="ejt-nav-squiggle"
          width="12"
          height="8"
          patternUnits="userSpaceOnUse"
        >
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
    Object.entries(TONES).find(([p]) => samePath(pathname, p))?.[1] ??
    DEFAULT_TONE;

  // Published on <html> so a pinned band can paint the slot between itself and
  // the header in the header's own colour (Ellie, 2026-09-07). It has to go on
  // the root: the bands are siblings of the header, not descendants, so a
  // variable set on <header> would never reach them.
  useEffect(() => {
    document.documentElement.style.setProperty("--ejt-header-bg", tone.bg);
  }, [tone.bg]);

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{
        height: "var(--ejt-header)",
        backgroundColor: tone.bg,
        color: tone.ink,
        // No shadow at all (Ellie, 2026-09-07). The band pinned underneath now
        // carries the header's own colour up into its scallops, so the two read
        // as one piece of furniture; a shadow cast across that join broke it.
        transition: "background-color 0.25s ease",
      }}
    >
      <nav
        aria-label="Primary"
        // Three tracks, not flex space-between: the outer two are equal `1fr`,
        // so the tabs in the middle sit on the page's true centre line no
        // matter how wide the monogram is. With space-between they would only
        // look centred by coincidence.
        className="mx-auto grid h-full w-full max-w-[1600px] grid-cols-[1fr_auto_1fr] items-center gap-2 px-3 sm:gap-4 sm:px-8"
      >
        <Link
          href="/preview"
          aria-label={`${site.name}, home`}
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
              className="block h-7 w-auto sm:h-10"
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
          // Four tabs have to fit beside the monogram on a 375px phone, where
          // "Resume" used to run off the edge (Bart, 2026-09-15): tighter
          // gaps and tracking and a hard 0.66rem under the small breakpoint.
          className="flex items-center justify-center gap-2 font-display uppercase tracking-[0.03em] sm:gap-7 sm:tracking-[0.08em]"
          style={{ color: tone.ink, fontSize: "clamp(0.66rem,2.4vw,1rem)" }}
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
                    <ExternalIcon />
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
