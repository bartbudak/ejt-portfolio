"use client";

import { useEffect, useRef } from "react";

// The coming-soon page's fluid pixel field, pointed at the hero's own wordmark.
// Same physics as ParticleHeadline — dots hold the glyph shapes, scatter away
// from the pointer and spring home — but this one takes its text, colour and
// typography from props so it can wear the title card's settings, and it sizes
// its own grid so the dots stay tight without the particle count running away.
//
// ParticleHeadline is deliberately left alone: it is the frozen coming-soon
// mount, and its palette and copy are approved.

type Props = {
  /** One entry per rendered line. */
  lines: string[];
  /** Fill for every dot. */
  color: string;
  /** Horizontal squeeze, matching the CSS wordmark's scaleX. */
  scaleX?: number;
  /** Fraction of the canvas width the longest line fills. */
  fill?: number;
  className?: string;
};

type P = { hx: number; hy: number; x: number; y: number; vx: number; vy: number };

// Physics, carried over from the holding page so the two feel like one hand.
const R = 92;
const R2 = R * R;
const SPRING = 0.075;
const FRICTION = 0.8;
const PUSH = 5.4;

// A tight grid is the point — 2px puts dots close enough that the wordmark
// still reads as type rather than as a halftone. But cell count grows with the
// SQUARE of the canvas, so a wide desktop hero would sample hundreds of
// thousands of cells and animate tens of thousands of dots. The step opens up
// only as far as it must to stay under the cap, so small screens keep the
// tightest grid and large ones degrade by a single pixel at a time.
// The grid is measured in DEVICE pixels, not CSS pixels. Fraunces' flat serifs
// and the hairline down the M are about one CSS pixel wide at display size, so
// a grid rasterised and sampled at 1x cannot see them at all — they fall between
// samples. Rasterising at device resolution and stepping in device pixels puts
// the grid at half a CSS pixel on a 2x screen, which is what finally resolves
// the serif brackets and the thin stems.
const MIN_STEP = 2;
const MAX_STEP = 6;
const MAX_PARTICLES = 34000;

// Fraunces at display size has hairline serifs and thin stems. Sampled at a
// high alpha cut they simply vanish, because an antialiased 1px stroke never
// reaches full opacity at a sample point — which is what left gaps in the
// letterforms. A low cut keeps them.
const ALPHA_CUT = 70;

export function ParticleWordmark({
  lines,
  color,
  scaleX = 1,
  fill = 0.97,
  className = "",
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const node = canvasRef.current;
    if (!node) return;
    const maybe = node.getContext("2d");
    if (!maybe) return;
    // Explicit non-null bindings so the closures below don't re-widen to null.
    const canvas: HTMLCanvasElement = node;
    const ctx: CanvasRenderingContext2D = maybe;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cs = getComputedStyle(canvas);
    const family = cs.fontFamily || "serif";
    // Canvas cannot resolve a CSS custom property, so the palette token is
    // resolved here — the component is handed `var(--ejd-vermilion)` and paints
    // the value that actually computes to.
    const ink = color.startsWith("var(")
      ? cs.getPropertyValue(color.slice(4, -1).trim()).trim() || "#000"
      : color;

    let particles: P[] = [];
    let cw = 0;
    let ch = 0;
    let dotR = 1.2;
    let raf = 0;
    let cancelled = false;
    // The field is static unless the pointer is disturbing it, so the loop
    // parks itself once everything is home and is kicked awake by the next
    // pointer move. Without this a 30k-dot canvas repaints an identical image
    // sixty times a second for the whole visit.
    let settled = false;
    const pointer = { x: -9999, y: -9999, active: false };

    // Paint the lines once into an offscreen canvas, then read back the alpha:
    // whatever the font actually rendered is what gets sampled, so the dots
    // follow the real letterforms rather than an approximation of them.
    function sampleAt(stepPx: number, size: number, dpr: number) {
      const W = Math.round(cw * dpr);
      const H = Math.round(ch * dpr);
      const off = document.createElement("canvas");
      off.width = W;
      off.height = H;
      const octx = off.getContext("2d", { willReadFrequently: true });
      if (!octx) return [];
      octx.setTransform(dpr, 0, 0, dpr, 0, 0);
      octx.clearRect(0, 0, cw, ch);
      octx.fillStyle = "#000";
      octx.textAlign = "center";
      octx.textBaseline = "middle";
      octx.font = `900 ${size}px ${family}`;
      octx.transform(scaleX, 0, 0, 1, (cw * (1 - scaleX)) / 2, 0);

      const lineH = size * 1.02;
      const top = (ch - lineH * lines.length) / 2 + lineH / 2;
      lines.forEach((line, i) => octx.fillText(line, cw / 2, top + lineH * i));

      const data = octx.getImageData(0, 0, W, H).data;
      const out: P[] = [];
      for (let y = 0; y < H; y += stepPx) {
        for (let x = 0; x < W; x += stepPx) {
          // Max-pool the cell rather than probing its corner: a stroke thinner
          // than the step would otherwise be missed whenever it happened to
          // fall between sample points, which is what broke the serifs up.
          let a = 0;
          const yEnd = Math.min(y + stepPx, H);
          const xEnd = Math.min(x + stepPx, W);
          for (let yy = y; yy < yEnd && a <= ALPHA_CUT; yy++) {
            for (let xx = x; xx < xEnd; xx++) {
              const v = data[(yy * W + xx) * 4 + 3];
              if (v > a) a = v;
              if (a > ALPHA_CUT) break;
            }
          }
          if (a > ALPHA_CUT) {
            // Homes are stored in CSS pixels — the physics and the pointer both
            // work in that space.
            const hx = x / dpr;
            const hy = y / dpr;
            out.push({ hx, hy, x: hx, y: hy, vx: 0, vy: 0 });
          }
        }
      }
      return out;
    }

    function build() {
      cw = canvas.clientWidth;
      ch = canvas.clientHeight;
      if (cw === 0 || ch === 0) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(cw * dpr);
      canvas.height = Math.round(ch * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Fit the longest line to the canvas, then let the line count cap it by
      // height — the same fit the CSS wordmark does, done in canvas units.
      ctx.font = `900 100px ${family}`;
      const widest = Math.max(
        ...lines.map((l) => ctx.measureText(l).width || 1),
      );
      const byWidth = (100 * (cw * fill)) / (widest * scaleX);
      const size = Math.max(18, Math.min(byWidth, (ch / lines.length) * 0.94));

      let step = MIN_STEP;
      let next = sampleAt(step, size, dpr);
      while (next.length > MAX_PARTICLES && step < MAX_STEP) {
        step += 1;
        next = sampleAt(step, size, dpr);
      }
      particles = next;
      // Keep the dot at least as wide as the gap between samples, or thin
      // strokes break into a dotted line instead of reading as a stroke.
      // Slightly wider than half the step, so neighbouring dots just touch and
      // a one-dot-wide stroke still reads as a line rather than a dotted rule.
      // Back into CSS pixels, and a shade wider than half the gap so adjacent
      // dots just touch and a one-dot stroke reads as a line.
      dotR = Math.max((step / dpr) * 0.72, 0.6);
    }

    function frame() {
      ctx.clearRect(0, 0, cw, ch);
      ctx.fillStyle = ink;
      ctx.beginPath();
      let moving = false;
      for (const p of particles) {
        let ax = (p.hx - p.x) * SPRING;
        let ay = (p.hy - p.y) * SPRING;
        if (pointer.active) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < R2 && d2 > 0.01) {
            const d = Math.sqrt(d2);
            const f = ((R - d) / R) * PUSH;
            ax += (dx / d) * f;
            ay += (dy / d) * f;
          }
        }
        p.vx = (p.vx + ax) * FRICTION;
        p.vy = (p.vy + ay) * FRICTION;
        p.x += p.vx;
        p.y += p.vy;
        // One path for every dot: a fill per particle would be thousands of
        // draw calls a frame.
        ctx.moveTo(p.x + dotR, p.y);
        ctx.arc(p.x, p.y, dotR, 0, Math.PI * 2);
        const rest = Math.abs(p.vx) + Math.abs(p.vy)
          + Math.abs(p.hx - p.x) + Math.abs(p.hy - p.y);
        if (rest > 0.08) moving = true;
      }
      ctx.fill();
      if (cancelled) return;
      if (!moving && !pointer.active) {
        settled = true;
        return;
      }
      raf = requestAnimationFrame(frame);
    }

    function paintStatic() {
      ctx.clearRect(0, 0, cw, ch);
      ctx.fillStyle = ink;
      ctx.beginPath();
      for (const p of particles) {
        ctx.moveTo(p.hx + dotR, p.hy);
        ctx.arc(p.hx, p.hy, dotR, 0, Math.PI * 2);
      }
      ctx.fill();
    }

    function start() {
      build();
      if (reduce) {
        paintStatic();
        return;
      }
      cancelled = false;
      settled = false;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(frame);
    }

    const onPointer = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
      pointer.active = true;
      if (settled && !reduce) {
        settled = false;
        raf = requestAnimationFrame(frame);
      }
    };
    const onLeave = () => {
      pointer.active = false;
      pointer.x = pointer.y = -9999;
    };

    // The canvas is pointer-transparent so it never blocks the page; listening
    // on the window keeps the scatter responsive anyway.
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("pointerleave", onLeave);

    const ro = new ResizeObserver(() => start());
    ro.observe(canvas);

    // Sampling before the webfont lands would trace the fallback's shapes.
    let alive = true;
    document.fonts.ready.then(() => {
      if (alive) start();
    });
    start();

    return () => {
      alive = false;
      cancelled = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [lines, color, scaleX, fill]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none block h-full w-full font-display ${className}`}
    />
  );
}
