"use client";

import { useEffect, useRef } from "react";

// Warm gradient stops (ember → berry → cocoa → amber → ember) as RGB triples.
const STOPS: [number, number, number][] = [
  [192, 83, 42],
  [154, 58, 89],
  [42, 27, 18],
  [217, 150, 58],
  [192, 83, 42],
];

function colorAt(f: number): string {
  const seg = Math.max(0, Math.min(1, f)) * (STOPS.length - 1);
  const i = Math.floor(seg);
  const t = seg - i;
  const a = STOPS[i];
  const b = STOPS[Math.min(i + 1, STOPS.length - 1)];
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
 * Renders "ejt." over "coming soon" as a field of dots that hold the glyph
 * shapes, then scatter fluidly away from the pointer and spring back.
 */
export function ParticleHeadline() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const node = canvasRef.current;
    if (!node) return;
    const maybeCtx = node.getContext("2d");
    if (!maybeCtx) return;
    // explicit non-null types so the closures below don't re-widen to null
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
    const R = 92;
    const R2 = R * R;
    const SPRING = 0.06;
    const FRICTION = 0.82;
    const PUSH = 5.4;

    function build() {
      cw = canvas.clientWidth;
      ch = canvas.clientHeight;
      if (cw === 0 || ch === 0) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(cw * dpr);
      canvas.height = Math.round(ch * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // fit "coming soon" to ~82% of width, capped by height
      ctx.font = `700 100px ${family}`;
      const measured = ctx.measureText("coming soon").width || 1;
      let main = Math.min((100 * (cw * 0.82)) / measured, ch * 0.32, 190);
      main = Math.max(main, 34);
      const small = main * 0.34;
      const gap = main * 0.26;
      const blockH = small + gap + main;
      const top = (ch - blockH) / 2;
      const cx = cw / 2;
      const ejtY = top + small * 0.5;
      const csY = top + small + gap + main * 0.5;
      dotR = Math.max(1.1, main * 0.013);

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
      octx.font = `700 ${small}px ${family}`;
      octx.fillText("ejt.", cx, ejtY);
      octx.font = `700 ${main}px ${family}`;
      octx.fillText("coming soon", cx, csY);
      const data = octx.getImageData(0, 0, cw, ch).data;

      const step = 4;
      const next: Particle[] = [];
      for (let y = 0; y < ch; y += step) {
        for (let x = 0; x < cw; x += step) {
          if (data[(y * cw + x) * 4 + 3] > 140) {
            next.push({
              hx: x,
              hy: y,
              x: reduce ? x : Math.random() * cw,
              y: reduce ? y : Math.random() * ch,
              vx: 0,
              vy: 0,
              color: colorAt(x / cw),
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
        ctx.beginPath();
        ctx.arc(p.x, p.y, dotR, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(frame);
    }

    function drawStatic() {
      ctx.clearRect(0, 0, cw, ch);
      for (const p of particles) {
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.hx, p.hy, dotR, 0, Math.PI * 2);
        ctx.fill();
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

    start();

    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerdown", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    canvas.addEventListener("pointerup", onLeave);

    let resizeT: ReturnType<typeof setTimeout>;
    function onResize() {
      clearTimeout(resizeT);
      resizeT = setTimeout(start, 180);
    }
    window.addEventListener("resize", onResize);

    // Re-sample once the Fraunces webfont is guaranteed loaded.
    document.fonts?.ready?.then(() => {
      if (!cancelled) start();
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      clearTimeout(resizeT);
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerdown", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("pointerup", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="font-display absolute inset-0 h-full w-full"
      style={{ touchAction: "none" }}
    />
  );
}
