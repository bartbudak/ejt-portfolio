"use client";

import { useEffect, useRef } from "react";

// Home-hero wordmark. A sibling of ParticleHeadline (which stays frozen on the
// coming-soon page). Big acid "WELCOME" with the name "I'M ELLIE" smaller and
// black, right-aligned under WELCOME for contrast.
type Stops = [number, number, number][];

// Warm: Ellie's own rose voice — rose → rose-deep → cocoa → gold-ink → rose.
export const WARM_STOPS: Stops = [
  [162, 58, 106],
  [142, 47, 92],
  [74, 59, 51],
  [126, 94, 28],
  [162, 58, 106],
];

// Acid, warm-forward: hot pink → red-orange → amber → gold → burnt amber → pink.
// Yellows/ambers carry the centre; pink anchors the ends.
export const ACID_STOPS: Stops = [
  [233, 99, 162], // hot pink
  [243, 92, 28], //  red-orange
  [233, 150, 22], // amber
  [240, 184, 38], // gold
  [232, 130, 30], // burnt amber
  [233, 99, 162], // hot pink
];

const INK: [number, number, number] = [28, 25, 23]; // near-black for "I'M ELLIE"

const LINE1 = "WELCOME";
const LINE2 = "i'm ellie";

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
  r: number;
};

export function HeroParticle({ stops = WARM_STOPS }: { stops?: Stops }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const node = canvasRef.current;
    if (!node) return;
    const maybeCtx = node.getContext("2d");
    if (!maybeCtx) return;
    const canvas: HTMLCanvasElement = node;
    const ctx: CanvasRenderingContext2D = maybeCtx;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const family = getComputedStyle(canvas).fontFamily || "serif";

    let particles: Particle[] = [];
    let cw = 0;
    let ch = 0;
    let raf = 0;
    let cancelled = false;
    const pointer = { x: -9999, y: -9999, active: false };

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

      // WELCOME fills ~92% width; "I'M ELLIE" is 0.4x and right-aligned under it
      ctx.font = `700 100px ${family}`;
      const w1at100 = ctx.measureText(LINE1).width || 1;
      const w2at100 = ctx.measureText(LINE2).width || 1;
      let main = Math.min((100 * (cw * 0.92)) / w1at100, ch * 0.6, 400);
      main = Math.max(main, 30);
      const sub = main * 0.4;
      const gap = main * 0.03;
      const w1 = w1at100 * (main / 100);
      const w2 = w2at100 * (sub / 100);

      const blockH = main + gap + sub;
      const top = (ch - blockH) / 2;
      const cx = cw / 2;
      const l1Y = top + main * 0.5;
      const l2Y = top + main + gap + sub * 0.5;
      const l1Right = cx + w1 / 2;
      const l2cx = l1Right - w2 / 2; // right-align "I'M ELLIE" to WELCOME's right edge
      const boundaryY = top + main + gap * 0.5;

      const dotMain = Math.max(0.5, main * 0.0034);
      const dotSub = Math.max(0.4, sub * 0.0034);

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
      octx.font = `700 ${sub}px ${family}`;
      octx.fillText(LINE2, l2cx, l2Y);
      const data = octx.getImageData(0, 0, cw, ch).data;

      const step = 1;
      const spread = main * 1.4;
      const inkColor = `rgb(${INK[0]},${INK[1]},${INK[2]})`;
      const next: Particle[] = [];
      for (let y = 0; y < ch; y += step) {
        for (let x = 0; x < cw; x += step) {
          if (data[(y * cw + x) * 4 + 3] > 140) {
            const isMain = y < boundaryY;
            next.push({
              hx: x,
              hy: y,
              x: reduce ? x : x + (Math.random() - 0.5) * spread,
              y: reduce ? y : y + (Math.random() - 0.5) * spread,
              vx: 0,
              vy: 0,
              color: isMain ? colorAt(x / cw, stops) : inkColor,
              r: isMain ? dotMain : dotSub,
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
        ctx.fillRect(p.x - p.r, p.y - p.r, p.r * 2, p.r * 2);
      }
      raf = requestAnimationFrame(frame);
    }

    function drawStatic() {
      ctx.clearRect(0, 0, cw, ch);
      for (const p of particles) {
        ctx.fillStyle = p.color;
        ctx.fillRect(p.hx - p.r, p.hy - p.r, p.r * 2, p.r * 2);
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
