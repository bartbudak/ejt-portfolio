"use client";

import { createContext, useContext, useEffect, useState } from "react";

// PREVIEW TOOL. The knobs behind the wavy band, so Ellie can dial the wave in
// rather than describing it and waiting for a build. Delete the provider and
// the tuner to ship a fixed set of numbers.
//
// These live in React state rather than CSS custom properties because the wave
// is SVG geometry: the path data has to be recomputed in JS when a number
// changes, and CSS variables cannot reach into a `d` attribute.

export type MarqueeSettings = {
  /** Peak-to-centre height of the wave, in px. 0 renders the old flat band. */
  amplitude: number;
  /** Distance between crests, in px. Smaller = more ripples. */
  wavelength: number;
  /** Band type size, in px. */
  fontSize: number;
  /** Seconds for one full pass. Larger = slower. */
  speed: number;
  /** Clear space above and below the type, in px. Sets the band's depth. */
  padding: number;
};

export const MARQUEE_DEFAULTS: MarqueeSettings = {
  amplitude: 7,
  wavelength: 190,
  fontSize: 26,
  speed: 75,
  padding: 6,
};

type Ctx = {
  settings: MarqueeSettings;
  set: (patch: Partial<MarqueeSettings>) => void;
  reset: () => void;
};

const MarqueeCtx = createContext<Ctx>({
  settings: MARQUEE_DEFAULTS,
  set: () => {},
  reset: () => {},
});

export const useMarqueeSettings = () => useContext(MarqueeCtx);

/** The band's stroke furniture, shared with Marquee.tsx. */
export const BAND_STROKE = 2;
export const BAND_FRAME = 7;

/** Height of the opaque band itself, ignoring the room the wave swings in. */
export const bandHeight = (s: MarqueeSettings) => s.fontSize * 1.1 + s.padding * 2;
/**
 * The strip that is opaque at EVERY x, which is the body minus the wave's
 * swing at both edges. This is what the band occupies in flow, so that two
 * sections meeting under a band are always covered: at a trough the body's top
 * edge dips by the amplitude, and anything relying on the full body height
 * would show the page through that dip.
 */
export const bandFlow = (s: MarqueeSettings) =>
  Math.max(0, bandHeight(s) - s.amplitude * 2);
/**
 * The transparent margin above and below the body that the wave needs.
 *
 * The edge is one path stroked twice, so its outermost ink reaches
 * (BAND_FRAME + 2 x BAND_STROKE) / 2 beyond the centreline, and the centreline
 * itself swings by the amplitude. The old figure used BAND_FRAME / 2 + STROKE,
 * which is exactly that half-width, so at a crest the stroke's outer edge
 * landed precisely on the SVG's boundary and antialiasing shaved the top of
 * the ring off (Ellie: "still clipped", 2026-09-07). The +2 is headroom.
 */
export const bandEdge = (s: MarqueeSettings) =>
  s.amplitude + (BAND_FRAME + BAND_STROKE * 2) / 2 + 2;

export function MarqueeSettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<MarqueeSettings>(MARQUEE_DEFAULTS);

  // Published on the root so layout elsewhere can reason about the band without
  // guessing at it. --ejt-marquee-h is the height the band CONSUMES IN FLOW,
  // which is the opaque body only: the edge room is pulled back out with
  // negative margins so the band overlaps its neighbours instead of parting
  // them. The hero's first-screen calc subtracts this.
  useEffect(() => {
    const root = document.documentElement.style;
    root.setProperty("--ejt-marquee-h", `${bandFlow(settings)}px`);
    root.setProperty("--ejt-marquee-edge", `${bandEdge(settings)}px`);
    // Where a pinned band's sticky top goes. Offsetting by twice the amplitude
    // puts the wave's CRESTS on the header's bottom edge rather than above it:
    // pinned at the header line the whole wave hid behind the header and the
    // band's top read as a flat clipped rule (Ellie, 2026-09-07). The scallops
    // between the crests are painted in the header's own colour, so the two
    // still read as one piece rather than as a gap.
    root.setProperty(
      "--ejt-band-top",
      `calc(var(--ejt-header) + ${settings.amplitude * 2}px)`,
    );
  }, [settings]);
  const set = (patch: Partial<MarqueeSettings>) =>
    setSettings((s) => ({ ...s, ...patch }));
  const reset = () => setSettings(MARQUEE_DEFAULTS);
  return (
    <MarqueeCtx.Provider value={{ settings, set, reset }}>{children}</MarqueeCtx.Provider>
  );
}
