"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";
import {
  BAND_FRAME,
  BAND_STROKE,
  bandEdge,
  bandFlow,
  bandHeight,
  useMarqueeSettings,
} from "@/components/shared/MarqueeSettings";

// The scrolling band, now riding a wave.
//
// Ellie sent a flag illustration (stacked wavy stripes with dark outlines) and
// asked for the band's borders AND its text to follow that curve. HTML cannot
// do the second part, so the band is SVG: two wavy edges stroked hairline ·
// ring · hairline, the field between them filled, and the type set on a
// <textPath> running down the middle of the same wave.
//
// HOW THE LOOP STAYS SEAMLESS
// The whole group translates left by exactly N wavelengths. Because the path
// repeats every wavelength, the wave lands back on itself at the end of every
// cycle, so the crests appear to stand still while the type travels along them.
// That is why the travel distance is quantised to the wavelength instead of
// being the pixel width of one copy: any other distance makes the wave jump.
//
// WHY IT MEASURES ITSELF
// The viewBox is 1:1 with CSS pixels, so glyphs are not stretched. That means
// knowing the real width, which means a client component and a ResizeObserver.
// `preserveAspectRatio="none"` would have avoided the measuring and distorted
// every letter, which is the one thing a wordmark cannot survive.

type MarqueeProps = {
  /** Defaults to `site.marquee`. */
  items?: readonly string[];
  /** Ground colour of the band. */
  background?: string;
  /** The ring drawn outside the hairline border. */
  ring?: string;
  /** Extra positioning classes — used to pin a band under the sticky header. */
  className?: string;
};

type Seg = { c1: [number, number]; c2: [number, number]; to: [number, number] };

/**
 * A sine drawn as cubic segments, half a wavelength each. Returns the segments
 * rather than a string so the same wave can be emitted forwards (for the
 * stroked edges) and backwards (to close the filled field between two edges).
 * 0.3642 is the control-point offset that puts a cubic closest to a true sine.
 */
function waveSegs(y: number, width: number, amp: number, len: number): Seg[] {
  const half = len / 2;
  const k = half * 0.3642;
  const segs: Seg[] = [];
  let x = 0;
  let up = true;
  while (x < width) {
    const to = x + half;
    segs.push({
      c1: [x + k, up ? y + amp : y - amp],
      c2: [to - k, up ? y - amp : y + amp],
      to: [to, up ? y - amp : y + amp],
    });
    x = to;
    up = !up;
  }
  return segs;
}

const fwd = (y: number, segs: Seg[]) =>
  `M0 ${y}` + segs.map((s) => `C${s.c1[0]} ${s.c1[1]},${s.c2[0]} ${s.c2[1]},${s.to[0]} ${s.to[1]}`).join("");

/** The same curve traced right to left, so it can close a filled shape. */
function rev(y: number, segs: Seg[]) {
  let d = "";
  for (let i = segs.length - 1; i >= 0; i--) {
    const s = segs[i];
    const start: [number, number] = i === 0 ? [0, y] : segs[i - 1].to;
    d += `C${s.c2[0]} ${s.c2[1]},${s.c1[0]} ${s.c1[1]},${start[0]} ${start[1]}`;
  }
  return d;
}

export function Marquee({
  items = site.marquee,
  background = "var(--ejd-marigold)",
  ring = "var(--ejd-vermilion)",
  className = "",
}: MarqueeProps) {
  const { settings } = useMarqueeSettings();
  const { amplitude, wavelength, fontSize, speed, padding } = settings;

  const hostRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(1280);
  const [reduced, setReduced] = useState(false);
  // Whether this band is currently pinned under the header. Only then does the
  // slot above its wave need painting; unpinned, that sliver should show the
  // section behind it as before.
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const w = Math.ceil(entry.contentRect.width);
      if (w > 0) setWidth(w);
    });
    ro.observe(el);
    // Pinned means "its top has reached the header line". An IntersectionObserver
    // was the obvious tool and the wrong one: a band sitting at the BOTTOM of
    // the viewport is also partially out of view, so it reported as pinned and
    // painted the header colour over itself at rest. Position is the actual
    // question, so ask it directly.
    // Read directly rather than through requestAnimationFrame. A rAF throttle
    // looks tidier but leaves the band permanently wrong anywhere frames are
    // not being produced (a background tab, a hidden pane): the pending flag
    // never clears, so no further check ever runs. One getBoundingClientRect
    // during an event that has already forced layout is not worth that risk.
    const check = () => setStuck(el.getBoundingClientRect().top <= HEADER_PX + 1);
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
      mq.removeEventListener("change", onChange);
    };
  }, []);

  const STROKE = BAND_STROKE;
  const FRAME = BAND_FRAME;
  // Matches --ejt-header in globals.css (4rem).
  const HEADER_PX = 64;
  // The band's own depth, plus the room the wave needs to swing in.
  const bandH = bandHeight(settings);
  const edgeRoom = bandEdge(settings);
  // What the band takes in flow: the strip that is opaque whatever the wave is
  // doing. The crests and troughs hang outside it, over the neighbours.
  const flowH = bandFlow(settings);
  const height = bandH + edgeRoom * 2;
  const midY = height / 2;
  const topY = midY - bandH / 2;
  const bottomY = midY + bandH / 2;

  // Estimated width of one pass of the list. Measuring would need a layout
  // pass; over-estimating only costs a little unused path.
  const perPass = items.reduce((w, i) => w + i.length * fontSize * 0.62 + fontSize * 1.6, 0);
  // Travel is a whole number of wavelengths, and at least one screen wide.
  const cycles = Math.max(1, Math.ceil(Math.max(width, perPass) / wavelength));
  const travel = cycles * wavelength;
  // Enough repeats of the list to cover the travel distance twice over.
  const passes = Math.max(1, Math.ceil((travel * 2) / Math.max(perPass, 1)));
  const pathWidth = travel * 2 + wavelength;

  const topSegs = waveSegs(topY, pathWidth, amplitude, wavelength);
  const botSegs = waveSegs(bottomY, pathWidth, amplitude, wavelength);
  const textSegs = waveSegs(midY + fontSize * 0.34, pathWidth, amplitude, wavelength);

  const topPath = fwd(topY, topSegs);
  const bottomPath = fwd(bottomY, botSegs);
  const textPath = fwd(midY + fontSize * 0.34, textSegs);
  // Top edge left to right, down the right end, bottom edge back again, close.
  const lastTop = topSegs[topSegs.length - 1].to;
  const lastBot = botSegs[botSegs.length - 1].to;
  const fieldPath = `${topPath}L${lastBot[0]} ${lastBot[1]}${rev(bottomY, botSegs)}L0 ${topY}Z`;
  // Everything above the top wave, so the fill meets the curve rather than
  // stopping at a straight line and leaving the troughs see-through.
  const skyPath = `M0 0H${pathWidth}L${lastTop[0]} ${lastTop[1]}${rev(topY, topSegs)}L0 0Z`;

  const id = `mq-${Math.abs(
    [...items.join("|")].reduce((h, c) => (h * 31 + c.charCodeAt(0)) | 0, 7),
  )}`;

  const line = Array.from({ length: passes }, () => items.join("  •  ")).join("  •  ");

  return (
    <div
      ref={hostRef}
      className={`z-10 w-full flex-none ${className}`}
      // The band occupies only its opaque body in flow; the wave's swing room
      // hangs outside that box so the sections either side meet underneath it
      // rather than being parted by it.
      //
      // This was negative margins first, and that was wrong in a way worth
      // recording: a negative margin-top on the FIRST CHILD of a section with
      // no padding or border collapses THROUGH the section, so the section
      // itself moved up and took its background with it. On the marigold bands
      // that painted a strip of yellow over the beige above them. Positioning
      // the drawing out of flow instead cannot collapse with anything.
      style={{ height: flowH }}
    >
      <div className="relative h-full w-full">
      <svg
        width={width}
        height={height}
        style={{ position: "absolute", top: -(edgeRoom + amplitude), left: 0 }}
        viewBox={`0 0 ${width} ${height}`}
        // 1:1 with CSS pixels, so nothing is stretched.
        className="block"
        role="img"
        aria-label={items.join(", ")}
      >
        <defs>
          <path id={`${id}-text`} d={textPath} />
        </defs>

        <g
          style={
            reduced
              ? undefined
              : {
                  animation: `ejt-wave-marquee ${speed}s linear infinite`,
                  // The distance is handed to the keyframes, which live in
                  // globals.css and cannot know it.
                  ["--ejt-travel" as string]: `-${travel}px`,
                }
          }
        >
          {/* Painted only while pinned: the slot between the header and the
              wave takes the header's own colour instead of letting the page
              scroll through it (Ellie, 2026-09-07). */}
          {stuck && <path d={skyPath} fill="var(--ejt-header-bg, transparent)" />}
          <path d={fieldPath} fill={background} />
          {[topPath, bottomPath].map((d, i) => (
            <g key={i} fill="none" strokeLinecap="round">
              {/* One path stroked twice: the wider ink pass leaves a hairline
                  either side of the narrower ring pass, which is the
                  hairline · ring · hairline frame the flat band had. */}
              <path d={d} stroke="var(--ejd-ink)" strokeWidth={FRAME + STROKE * 2} />
              <path d={d} stroke={ring} strokeWidth={FRAME} />
            </g>
          ))}
          <text
            fontSize={fontSize}
            fontWeight={400}
            className="font-display uppercase"
            fill="var(--ejd-ink)"
            style={{ letterSpacing: "0.02em" }}
          >
            <textPath href={`#${id}-text`} startOffset="0">
              {line}
            </textPath>
          </text>
        </g>
      </svg>
      </div>
    </div>
  );
}
