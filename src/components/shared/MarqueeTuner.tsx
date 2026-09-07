"use client";

import { useState } from "react";
import { MARQUEE_DEFAULTS, useMarqueeSettings, type MarqueeSettings } from "@/components/shared/MarqueeSettings";

// PREVIEW TOOL, next to the theme picker. Every band on the page reads the same
// settings, so a change here shows up in all of them at once.

type Knob = {
  key: keyof MarqueeSettings;
  label: string;
  hint: string;
  min: number;
  max: number;
  step: number;
  unit: string;
};

const KNOBS: Knob[] = [
  { key: "amplitude", label: "Wave depth", hint: "0 is the old flat band", min: 0, max: 24, step: 1, unit: "px" },
  { key: "wavelength", label: "Wave length", hint: "shorter = more ripples", min: 60, max: 480, step: 10, unit: "px" },
  { key: "fontSize", label: "Type size", hint: "", min: 14, max: 48, step: 1, unit: "px" },
  { key: "padding", label: "Band depth", hint: "space above and below the type", min: 0, max: 28, step: 1, unit: "px" },
  { key: "speed", label: "Pass time", hint: "bigger = slower", min: 20, max: 200, step: 5, unit: "s" },
];

export function MarqueeTuner() {
  const { settings, set, reset } = useMarqueeSettings();
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-16 left-4 z-[60] font-sans print:hidden">
      {open && (
        <div
          className="mb-2 w-72 rounded-xl p-4 shadow-xl"
          style={{ backgroundColor: "#fffdf8", border: "2px solid #1a1210", color: "#1a1210" }}
        >
          {KNOBS.map((k) => (
            <label key={k.key} className="mb-4 block last:mb-0">
              <span className="flex items-baseline justify-between">
                <span className="text-xs font-bold">{k.label}</span>
                <span className="font-mono text-xs tabular-nums opacity-70">
                  {settings[k.key]}
                  {k.unit}
                </span>
              </span>
              {k.hint && <span className="block text-xs opacity-55">{k.hint}</span>}
              <input
                type="range"
                min={k.min}
                max={k.max}
                step={k.step}
                value={settings[k.key]}
                onChange={(e) => set({ [k.key]: Number(e.target.value) })}
                className="mt-2 w-full"
              />
            </label>
          ))}

          <div className="mt-2 flex gap-2">
            <button
              type="button"
              onClick={reset}
              className="flex-1 rounded-full px-3 py-2 text-xs font-bold"
              style={{ border: "2px solid #1a1210" }}
            >
              Reset
            </button>
            <button
              type="button"
              onClick={() => set({ amplitude: 0 })}
              className="flex-1 rounded-full px-3 py-2 text-xs font-bold"
              style={{ border: "2px solid #1a1210" }}
            >
              Flat
            </button>
          </div>

          {/* So a setting she likes can be handed back as numbers. */}
          <p className="mt-3 select-all font-mono text-xs leading-snug opacity-70">
            {(Object.keys(MARQUEE_DEFAULTS) as (keyof MarqueeSettings)[])
              .map((k) => `${k}: ${settings[k]}`)
              .join(", ")}
          </p>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex items-center gap-2 rounded-full px-3 py-2 text-xs font-bold shadow-lg"
        style={{ backgroundColor: "#fffdf8", color: "#1a1210", border: "2px solid #1a1210" }}
      >
        <svg viewBox="0 0 40 12" aria-hidden className="h-3 w-10">
          <path
            d="M0 6C3 0 7 0 10 6S17 12 20 6s7-6 10 0 7 6 10 0"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          />
        </svg>
        Marquee
      </button>
    </div>
  );
}
