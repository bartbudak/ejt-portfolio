"use client";

import { useEffect, useState } from "react";

const ITEMS = [
  { label: "Home", id: "top" },
  { label: "Work", id: "work" },
  { label: "About", id: "about" },
  { label: "Contact", id: "contact" },
];

// Floating right-side nav that highlights the section in view with a thick
// underline (Marimba-style). Scroll-spy via a thin band across the viewport
// middle — whichever section crosses it is active.
export function RightNav() {
  const [active, setActive] = useState("top");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    for (const it of ITEMS) {
      const el = document.getElementById(it.id);
      if (el) obs.observe(el);
    }
    return () => obs.disconnect();
  }, []);

  return (
    <nav className="flex flex-col items-end gap-2 text-right">
      {ITEMS.map((it) => {
        const on = active === it.id;
        return (
          <a
            key={it.id}
            href={`#${it.id}`}
            aria-current={on ? "true" : undefined}
            className={`font-mono text-sm tracking-wide transition-colors ${
              on ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span
              className={`inline-block pb-1 ${
                on ? "border-b-[3px] border-ej-rose" : "border-b-[3px] border-transparent"
              }`}
            >
              {it.label}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
