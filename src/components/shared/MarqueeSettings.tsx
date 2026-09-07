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
/** The transparent margin above and below it that the wave needs. */
export const bandEdge = (s: MarqueeSettings) => s.amplitude + BAND_FRAME / 2 + BAND_STROKE;

export function MarqueeSettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<MarqueeSettings>(MARQUEE_DEFAULTS);

  // Published on the root so layout elsewhere can reason about the band without
  // guessing at it. --ejt-marquee-h is the height the band CONSUMES IN FLOW,
  // which is the opaque body only: the edge room is pulled back out with
  // negative margins so the band overlaps its neighbours instead of parting
  // them. The hero's first-screen calc subtracts this.
  useEffect(() => {
    const root = document.documentElement.style;
    root.setProperty("--ejt-marquee-h", `${bandHeight(settings)}px`);
    root.setProperty("--ejt-marquee-edge", `${bandEdge(settings)}px`);
  }, [settings]);
  const set = (patch: Partial<MarqueeSettings>) =>
    setSettings((s) => ({ ...s, ...patch }));
  const reset = () => setSettings(MARQUEE_DEFAULTS);
  return (
    <MarqueeCtx.Provider value={{ settings, set, reset }}>{children}</MarqueeCtx.Provider>
  );
}
