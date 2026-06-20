"use client";

import { useEffect, useRef } from "react";

// Home-hero wordmark. A sibling of ParticleHeadline (which stays frozen on the
// coming-soon page) retargeted to "Welcome, / I'm Ellie".
type Stops = [number, number, number][];

// Warm: Ellie's own rose voice — rose → rose-deep → cocoa → gold-ink → rose,
// from the Atelier Paper brand tokens (all AA-safe on the paper bg).
export const WARM_STOPS: Stops = [
  [162, 58, 106], // --ej-rose      #a23a6a
  [142, 47, 92], //  --ej-rose-deep #8e2f5c
  [74, 59, 51], //   --ej-cocoa     #4a3b33
  [126, 94, 28], //  --ej-gold-ink  #7e5e1c
  [162, 58, 106], // back to rose
];

// Acid: Maeve's own saturated brights — hot pink → magenta → red-orange →
// purple → hot pink. Louder, more SAMSON-style pop.
export const ACID_STOPS: Stops = [
  [239, 111, 188], // hot pink   #ef6fbc
  [196, 46, 122], //  magenta    #c42e7a
  [255, 77, 0], //    red-orange #ff4d00
  [130, 93, 199], //  purple     #825dc7
  [239, 111, 188], // back to hot pink
];

const LINE1 = "WELCOME,";
const LINE2 = "I'M ELLIE";

function colorAt(f: number, stops: Stops): string {
  const seg = Math.max(0, Math.min(1, f)) * (stops.length - 1);
  const i = Math.floor(seg);
  const t = seg - i;
  const a = stops[i];
  const b = stops[Math.min(i + 1, stops.length - 1)];
  const r = Math.round(a[0] + (b[0] - a[0]) * t);
  const g = Math.round(a[1] + (b[1] - a[1]) * t);
  const bl = Math.round(a[2] + (b[2] - a[2]) * t);
  return `rgb(${r},${g},${bl})`;
}

type Particle = {
  hx: number;
  hy: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
};

/**
 * Renders "Welcome, / I'm Ellie" as a field of dots that hold the glyph shapes,
 * scatter fluidly away from the pointer, and spring back. Decorative: the
 * accessible name lives in the sr-only <h1> in HeroCollage.
 */
export function HeroParticle({ stops = WARM_STOPS }: { stops?: Stops }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const node = canvasRef.current;
    if (!node) return;
    const maybeCtx = node.getContext("2d");
    if (!maybeCtx) return;
    const canvas: HTMLCanvasElement = node;
    const ctx: CanvasRenderingContext2D = maybeCtx;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const family = getComputedStyle(canvas).fontFamily || "serif";

    let particles: Particle[] = [];
    let cw = 0;
    let ch = 0;
    let dotR = 1.4;
    let raf = 0;
    let cancelled = false;
    const pointer = { x: -9999, y: -9999, active: false };

    // physics
    const R = 96;
    const R2 = R * R;
    const SPRING = 0.075;
    const FRICTION = 0.8;
    const PUSH = 5.6;

    function build() {
      cw = canvas.clientWidth;
      ch = canvas.clientHeight;
      if (cw === 0 || ch === 0) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(cw * dpr);
      canvas.height = Math.round(ch * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // fit the WIDER of the two lines to ~86% width, capped by height so two
      // stacked lines always clear the box
      ctx.font = `700 100px ${family}`;
      const widest = Math.max(
        ctx.measureText(LINE1).width || 1,
        ctx.measureText(LINE2).width || 1,
      );
      let main = Math.min((100 * (cw * 0.94)) / widest, ch * 0.46, 360);
      main = Math.max(main, 30);
      const gap = main * 0.08;
      const blockH = main * 2 + gap;
      const top = (ch - blockH) / 2;
      const cx = cw / 2;
      const l1Y = top + main * 0.5;
      const l2Y = top + main + gap + main * 0.5;
      // small dots on a fine 1px grid → high-res, reads as text not pixels
      dotR = Math.max(0.5, main * 0.0034);

      // sample glyphs from an offscreen canvas
      const off = document.createElement("canvas");
      off.width = cw;
      off.height = ch;
      const octx = off.getContext("2d");
      if (!octx) return;
      octx.clearRect(0, 0, cw, ch);
      octx.fillStyle = "#000";
      octx.textAlign = "center";
      octx.textBaseline = "middle";
      octx.font = `700 ${main}px ${family}`;
      octx.fillText(LINE1, cx, l1Y);
      octx.fillText(LINE2, cx, l2Y);
      const data = octx.getImageData(0, 0, cw, ch).data;

      const step = 1;
      const spread = main * 1.4;
      const next: Particle[] = [];
      for (let y = 0; y < ch; y += step) {
        for (let x = 0; x < cw; x += step) {
          if (data[(y * cw + x) * 4 + 3] > 140) {
            next.push({
              hx: x,
              hy: y,
              // start in a tight cloud around home so it assembles fast
              x: reduce ? x : x + (Math.random() - 0.5) * spread,
              y: reduce ? y : y + (Math.random() - 0.5) * spread,
              vx: 0,
              vy: 0,
              color: colorAt(x / cw, stops),
            });
          }
        }
      }
      particles = next;
    }

    function frame() {
      ctx.clearRect(0, 0, cw, ch);
      for (const p of particles) {
        let ax = (p.hx - p.x) * SPRING;
        let ay = (p.hy - p.y) * SPRING;
        if (pointer.active) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < R2 && d2 > 0.01) {
            const d = Math.sqrt(d2);
            const force = ((R - d) / R) * PUSH;
            ax += (dx / d) * force;
            ay += (dy / d) * force;
          }
        }
        p.vx = (p.vx + ax) * FRICTION;
        p.vy = (p.vy + ay) * FRICTION;
        p.x += p.vx;
        p.y += p.vy;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x - dotR, p.y - dotR, dotR * 2, dotR * 2);
      }
      raf = requestAnimationFrame(frame);
    }

    function drawStatic() {
      ctx.clearRect(0, 0, cw, ch);
      for (const p of particles) {
        ctx.fillStyle = p.color;
        ctx.fillRect(p.hx - dotR, p.hy - dotR, dotR * 2, dotR * 2);
      }
    }

    function onMove(e: PointerEvent) {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    }
    function onLeave() {
      pointer.active = false;
    }

    function start() {
      build();
      if (reduce) {
        drawStatic();
      } else {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(frame);
      }
    }

    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerdown", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    canvas.addEventListener("pointerup", onLeave);

    let resizeT: ReturnType<typeof setTimeout>;
    const ro = new ResizeObserver(() => {
      clearTimeout(resizeT);
      resizeT = setTimeout(start, 120);
    });
    ro.observe(canvas);

    document.fonts?.ready?.then(() => {
      if (!cancelled) start();
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      clearTimeout(resizeT);
      ro.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerdown", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("pointerup", onLeave);
    };
  }, [stops]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="font-display absolute inset-0 h-full w-full"
      style={{ touchAction: "none" }}
    />
  );
}
