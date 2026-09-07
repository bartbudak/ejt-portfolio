"use client";

import { createContext, useContext, useState } from "react";

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

export function MarqueeSettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<MarqueeSettings>(MARQUEE_DEFAULTS);
  const set = (patch: Partial<MarqueeSettings>) =>
    setSettings((s) => ({ ...s, ...patch }));
  const reset = () => setSettings(MARQUEE_DEFAULTS);
  return (
    <MarqueeCtx.Provider value={{ settings, set, reset }}>{children}</MarqueeCtx.Provider>
  );
}
