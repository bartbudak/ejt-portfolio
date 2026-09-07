"use client";

import { useEffect, useState } from "react";

// PREVIEW TOOLS, not part of the site. Each picker writes one data attribute on
// <html>, which selects a set of CSS custom properties defined in globals.css.
// Every section paints from those tokens, so nothing else knows a picker exists.
//
// Delete the mount to remove it.

export type Option = { id: string; name: string; note: string };

function Picker({
  options,
  attr,
  storageKey,
  label,
  swatches,
  offsetClass,
}: {
  options: readonly Option[];
  /** The data attribute this picker owns on <html>. */
  attr: string;
  storageKey: string;
  label: string;
  /** Tokens shown as chips for each option. */
  swatches: readonly string[];
  offsetClass: string;
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  const apply = (id: string) => {
    if (id) document.documentElement.setAttribute(attr, id);
    else document.documentElement.removeAttribute(attr);
  };

  useEffect(() => {
    const saved = localStorage.getItem(storageKey) ?? "";
    setActive(saved);
    apply(saved);
    // `attr` and `storageKey` are fixed per mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function pick(id: string) {
    setActive(id);
    apply(id);
    try {
      localStorage.setItem(storageKey, id);
    } catch {
      // Private windows refuse storage; the choice still applies for the session.
    }
  }

  const current = options.find((o) => o.id === active) ?? options[0];

  return (
    <div className={`fixed z-[60] font-sans print:hidden ${offsetClass}`}>
      {open && (
        <div
          className="mb-2 max-h-[60vh] w-64 overflow-y-auto rounded-xl p-2 shadow-xl"
          style={{ backgroundColor: "#fffdf8", border: "2px solid #1a1210" }}
        >
          {options.map((o) => {
            const on = o.id === active;
            return (
              <button
                key={o.id || "default"}
                type="button"
                onClick={() => pick(o.id)}
                aria-pressed={on}
                {...(swatches.length === 0 ? { [attr]: o.id || undefined } : {})}
                className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left transition-colors hover:bg-black/5"
              >
                {/* The chips carry the option's own attribute, so each row
                    previews its palette without applying it to the page. */}
                {swatches.length > 0 && (
                  <span
                    aria-hidden
                    {...{ [attr]: o.id || undefined }}
                    className="flex flex-none gap-1 rounded-md p-1"
                    style={{ border: "1.5px solid #1a1210" }}
                  >
                    {swatches.map((v) => (
                      <i key={v} className="h-4 w-3 rounded-[2px]" style={{ background: `var(${v})` }} />
                    ))}
                  </span>
                )}
                <span className="min-w-0 flex-1">
                  <span
                    className={`block text-xs leading-tight ${on ? "font-bold" : "font-medium"}`}
                    style={{ color: "#1a1210" }}
                  >
                    {o.name}
                    {on && " ✓"}
                  </span>
                  <span className="block text-xs leading-tight opacity-60" style={{ color: "#1a1210" }}>
                    {o.note}
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
        className="flex items-center gap-2 rounded-full px-3 py-2 text-xs font-bold shadow-lg"
        style={{ backgroundColor: "#fffdf8", color: "#1a1210", border: "2px solid #1a1210" }}
      >
        {swatches.length > 0 && (
          <span aria-hidden className="flex gap-1">
            {swatches.map((v) => (
              <i key={v} className="h-3 w-3 rounded-full" style={{ background: `var(${v})` }} />
            ))}
          </span>
        )}
        {label}: {current.name}
      </button>
    </div>
  );
}

const THEMES: readonly Option[] = [
  { id: "", name: "Bubblegum", note: "The default" },
  // Between Meadow and Bubblegum, Meadow-most first.
  { id: "orchard", name: "Orchard", note: "Meadow's ground, Bubblegum's pink" },
  { id: "watermelon", name: "Watermelon", note: "Pink ground, forest display" },
  { id: "peony", name: "Peony", note: "Warm oat, pink, green ink" },
  { id: "rhubarb", name: "Rhubarb", note: "Soft pink, deep berry, olive ink" },
  { id: "clover", name: "Clover", note: "Green ground, berry pink" },
  { id: "seaglass", name: "Seaglass", note: "Pale aqua, deep teal, citrus" },
  { id: "meadow", name: "Meadow", note: "Pale green, forest, butter" },
  { id: "cornflower", name: "Cornflower", note: "Periwinkle, indigo, marigold" },
  { id: "citron", name: "Citron", note: "Lemon, olive, orange" },
  { id: "lagoon", name: "Lagoon", note: "Turquoise, cobalt, coral" },
  { id: "moss", name: "Moss", note: "Oat green, deep moss, gold" },
  { id: "sky", name: "Sky", note: "Sky blue, navy, sunshine" },
  { id: "pistachio", name: "Pistachio", note: "Pistachio, pine, apricot" },
  { id: "butter", name: "Butter", note: "Butter, teal, tomato" },
  { id: "glacier", name: "Glacier", note: "Ice blue, slate, chartreuse" },
  { id: "deck", name: "Deck", note: "Her Canva palette, kept whole" },
  { id: "maeve-live", name: "Maeve Live", note: "What the shipped site runs on" },
];


const CURSORS: readonly Option[] = [
  { id: "", name: "Off", note: "The system arrow" },
  { id: "marigold-green", name: "Marigold & green", note: "Her original flower" },
  { id: "vermilion-gold", name: "Vermilion & gold", note: "" },
  { id: "blush-vermilion", name: "Blush & vermilion", note: "" },
  { id: "ice-violet", name: "Ice & violet", note: "" },
  { id: "sage-gold", name: "Sage & gold", note: "" },
  { id: "red-ice", name: "Red & ice", note: "" },
  { id: "violet-gold", name: "Violet & gold", note: "" },
  { id: "paper-burnt", name: "Daisy", note: "White petals, burnt centre" },
  { id: "gold-vermilion", name: "Gold & vermilion", note: "" },
  { id: "teal-blush", name: "Teal & blush", note: "" },
];

export function CursorPicker() {
  return (
    <Picker
      options={CURSORS}
      attr="data-cursor"
      storageKey="ejt-cursor-preview"
      label="Cursor"
      // The row's own attribute makes each chip show that colourway's cursor on
      // hover, so the list previews itself.
      swatches={[]}
      offsetClass="bottom-28 left-4"
    />
  );
}

export function ThemeSwitcher() {
  return (
    <Picker
      options={THEMES}
      attr="data-theme"
      storageKey="ejt-theme-preview"
      label="Theme"
      swatches={["--ejd-blush", "--ejd-vermilion", "--ejd-marigold"]}
      offsetClass="bottom-4 left-4"
    />
  );
}

