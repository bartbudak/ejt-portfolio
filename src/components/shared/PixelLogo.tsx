"use client";

import { useEffect, useRef } from "react";

// Small particle wordmark for the navbar — the hero's pixel/dot treatment shrunk
// to a logo. Idles as a static dot render; runs the scatter physics only while
// hovered (rAF stops once it settles) so it costs nothing at rest.
type P = { hx: number; hy: number; x: number; y: number; vx: number; vy: number; c: string };

// Acid gradient — hot pink → red-orange → amber → gold → burnt amber → pink.
// Previously imported from HeroParticle; inlined when that prototype was removed.
const ACID_STOPS: [number, number, number][] = [
  [233, 99, 162],
  [243, 92, 28],
  [233, 150, 22],
  [240, 184, 38],
  [232, 130, 30],
  [233, 99, 162],
];

function colorAt(f: number): string {
  const s = ACID_STOPS;
  const seg = Math.max(0, Math.min(1, f)) * (s.length - 1);
  const i = Math.floor(seg);
  const t = seg - i;
  const a = s[i];
  const b = s[Math.min(i + 1, s.length - 1)];
  return `rgb(${Math.round(a[0] + (b[0] - a[0]) * t)},${Math.round(
    a[1] + (b[1] - a[1]) * t,
  )},${Math.round(a[2] + (b[2] - a[2]) * t)})`;
}

export function PixelLogo({ text = "ejt." }: { text?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const context = el.getContext("2d");
    if (!context) return;
    // Re-bind with explicit non-null types: the nested function declarations
    // below are hoisted, so TS won't carry the narrowing from the guards above
    // into them, and `next build` fails type-checking.
    const canvas: HTMLCanvasElement = el;
    const ctx: CanvasRenderingContext2D = context;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const family = getComputedStyle(canvas).fontFamily || "serif";

    let parts: P[] = [];
    let cw = 0;
    let ch = 0;
    let dotR = 1;
    let raf = 0;
    let running = false;
    let cancelled = false;
    const ptr = { x: -999, y: -999, active: false };
    const R = 34;
    const R2 = R * R;
    const SPRING = 0.12;
    const FRICTION = 0.78;
    const PUSH = 2.6;

    function build() {
      cw = canvas.clientWidth;
      ch = canvas.clientHeight;
      if (!cw || !ch) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(cw * dpr);
      canvas.height = Math.round(ch * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      ctx.font = `700 100px ${family}`;
      const m = ctx.measureText(text).width || 1;
      let main = Math.min((100 * (cw * 0.94)) / m, ch * 0.82);
      main = Math.max(main, 10);
      dotR = Math.max(0.85, main * 0.02);

      const off = document.createElement("canvas");
      off.width = cw;
      off.height = ch;
      const o = off.getContext("2d");
      if (!o) return;
      o.clearRect(0, 0, cw, ch);
      o.fillStyle = "#000";
      o.textAlign = "center";
      o.textBaseline = "middle";
      o.font = `700 ${main}px ${family}`;
      o.fillText(text, cw / 2, ch / 2);
      const d = o.getImageData(0, 0, cw, ch).data;

      const step = 2;
      const next: P[] = [];
      for (let y = 0; y < ch; y += step) {
        for (let x = 0; x < cw; x += step) {
          if (d[(y * cw + x) * 4 + 3] > 140) {
            next.push({ hx: x, hy: y, x, y, vx: 0, vy: 0, c: colorAt(x / cw) });
          }
        }
      }
      parts = next;
      drawStatic();
    }

    function drawStatic() {
      ctx.clearRect(0, 0, cw, ch);
      for (const p of parts) {
        ctx.fillStyle = p.c;
        ctx.fillRect(p.hx - dotR, p.hy - dotR, dotR * 2, dotR * 2);
      }
    }

    function frame() {
      ctx.clearRect(0, 0, cw, ch);
      let moving = false;
      for (const p of parts) {
        let ax = (p.hx - p.x) * SPRING;
        let ay = (p.hy - p.y) * SPRING;
        if (ptr.active) {
          const dx = p.x - ptr.x;
          const dy = p.y - ptr.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < R2 && d2 > 0.01) {
            const dd = Math.sqrt(d2);
            const force = ((R - dd) / R) * PUSH;
            ax += (dx / dd) * force;
            ay += (dy / dd) * force;
          }
        }
        p.vx = (p.vx + ax) * FRICTION;
        p.vy = (p.vy + ay) * FRICTION;
        p.x += p.vx;
        p.y += p.vy;
        if (
          Math.abs(p.vx) > 0.05 ||
          Math.abs(p.vy) > 0.05 ||
          Math.abs(p.hx - p.x) > 0.5 ||
          Math.abs(p.hy - p.y) > 0.5
        )
          moving = true;
        ctx.fillStyle = p.c;
        ctx.fillRect(p.x - dotR, p.y - dotR, dotR * 2, dotR * 2);
      }
      if (moving || ptr.active) {
        raf = requestAnimationFrame(frame);
      } else {
        running = false;
        drawStatic();
      }
    }

    function kick() {
      if (reduce || running) return;
      running = true;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(frame);
    }
    function onMove(e: PointerEvent) {
      const r = canvas.getBoundingClientRect();
      ptr.x = e.clientX - r.left;
      ptr.y = e.clientY - r.top;
      ptr.active = true;
      kick();
    }
    function onLeave() {
      ptr.active = false;
      kick();
    }

    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);

    let t: ReturnType<typeof setTimeout>;
    const ro = new ResizeObserver(() => {
      clearTimeout(t);
      t = setTimeout(build, 100);
    });
    ro.observe(canvas);
    document.fonts?.ready?.then(() => {
      if (!cancelled) build();
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      clearTimeout(t);
      ro.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, [text]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="font-display block h-9 w-24"
      style={{ touchAction: "none" }}
    />
  );
}
