"use client";

import { useEffect, useState } from "react";

// A PREVIEW TOOL, not part of the site. It sets `data-theme` on <html>, which
// swaps the `--ejd-*` token values defined in globals.css — every section paints
// from those tokens, so no component knows a theme exists and nothing had to be
// touched to make this work.
//
// Delete this component and its mount to remove the whole feature; the deck
// palette in :root is the default and is never written by it.

export const THEMES = [
  { id: "", name: "Deck", note: "Her Canva palette — the default" },
  { id: "maeve-live", name: "Maeve Live", note: "What the shipped site runs on" },
  { id: "arcade", name: "Arcade", note: "Princess Donut's midnight lounge" },
  { id: "cocoa", name: "Cocoa", note: "Chocolate first — bitter, cream, gold" },
  { id: "chartreuse", name: "Chartreuse", note: "Acid green and ink" },
  { id: "ultraviolet", name: "Ultraviolet", note: "Violet, lemon, cold white" },
  { id: "seafoam", name: "Seafoam", note: "The mural — mint and coral" },
  { id: "neon-noir", name: "Neon Noir", note: "Near-black, pink, cyan" },
  { id: "terracotta", name: "Terracotta", note: "Clay, sand, forest" },
  { id: "bubblegum", name: "Bubblegum", note: "Pink, baby blue, lemon" },
  { id: "newsprint", name: "Newsprint", note: "Ink on paper, one red" },
] as const;

const KEY = "ejt-theme-preview";

export function ThemeSwitcher() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(KEY) ?? "";
    setActive(saved);
    apply(saved);
  }, []);

  function apply(id: string) {
    if (id) document.documentElement.setAttribute("data-theme", id);
    else document.documentElement.removeAttribute("data-theme");
  }

  function pick(id: string) {
    setActive(id);
    apply(id);
    try {
      localStorage.setItem(KEY, id);
    } catch {
      // Private windows can refuse storage; the theme still applies for the session.
    }
  }

  const current = THEMES.find((t) => t.id === active) ?? THEMES[0];

  return (
    <div className="fixed bottom-4 left-4 z-[60] font-sans print:hidden">
      {open && (
        <div
          className="mb-2 max-h-[70vh] w-64 overflow-y-auto rounded-xl p-2 shadow-xl"
          style={{ backgroundColor: "#fffdf8", border: "2px solid #1a1210" }}
        >
          {THEMES.map((t) => {
            const on = t.id === active;
            return (
              <button
                key={t.id || "default"}
                type="button"
                onClick={() => pick(t.id)}
                aria-pressed={on}
                className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left transition-colors hover:bg-black/5"
              >
                {/* Three chips: the ground, the display colour, the accent —
                    enough to recognise a palette without applying it. */}
                <span
                  aria-hidden
                  data-theme={t.id || undefined}
                  className="flex flex-none gap-[3px] rounded-md p-[3px]"
                  style={{ border: "1.5px solid #1a1210" }}
                >
                  <i className="h-4 w-3 rounded-[2px]" style={{ background: "var(--ejd-blush)" }} />
                  <i className="h-4 w-3 rounded-[2px]" style={{ background: "var(--ejd-vermilion)" }} />
                  <i className="h-4 w-3 rounded-[2px]" style={{ background: "var(--ejd-marigold)" }} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className={`block text-[13px] leading-tight ${on ? "font-bold" : "font-medium"}`} style={{ color: "#1a1210" }}>
                    {t.name}
                    {on && " ✓"}
                  </span>
                  <span className="block text-[11px] leading-tight opacity-60" style={{ color: "#1a1210" }}>
                    {t.note}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex items-center gap-2 rounded-full px-3 py-2 text-[12px] font-bold shadow-lg"
        style={{ backgroundColor: "#fffdf8", color: "#1a1210", border: "2px solid #1a1210" }}
      >
        <span aria-hidden className="flex gap-[3px]">
          <i className="h-3 w-3 rounded-full" style={{ background: "var(--ejd-blush)" }} />
          <i className="h-3 w-3 rounded-full" style={{ background: "var(--ejd-vermilion)" }} />
          <i className="h-3 w-3 rounded-full" style={{ background: "var(--ejd-marigold)" }} />
        </span>
        Theme: {current.name}
      </button>
    </div>
  );
}
