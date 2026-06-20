"use client";

import { useEffect, useRef } from "react";

// The living "whisp" — the pink blotch reimagined as a will-o'-wisp / spren. It
// wanders the hero aimlessly with a fading tail and a slowly drifting hue, and
// chases the pointer while the screen is pressed, drifting off again on release.
export function Whisp() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let cw = 0;
    let ch = 0;
    let raf = 0;
    let t = 0;
    let nextRetarget = 0;
    let lastHue = -99;

    // pre-rendered soft blob sprite, re-tinted only when the hue steps
    const sprite = document.createElement("canvas");
    const sctx = sprite.getContext("2d");
    let spriteR = 120;
    function renderSprite(h: number) {
      const r = spriteR;
      sprite.width = sprite.height = r * 2;
      if (!sctx) return;
      sctx.clearRect(0, 0, r * 2, r * 2);
      const g = sctx.createRadialGradient(r, r, 0, r, r, r);
      g.addColorStop(0, `hsla(${h},90%,73%,0.85)`);
      g.addColorStop(0.4, `hsla(${h},88%,67%,0.38)`);
      g.addColorStop(1, `hsla(${h},88%,67%,0)`);
      sctx.fillStyle = g;
      sctx.fillRect(0, 0, r * 2, r * 2);
    }

    const head = { x: 0, y: 0, vx: 0, vy: 0 };
    const target = { x: 0, y: 0 };
    const ptr = { x: 0, y: 0, active: false };
    const trail: { x: number; y: number }[] = [];

    function resize() {
      cw = canvas.clientWidth;
      ch = canvas.clientHeight;
      if (!cw || !ch) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(cw * dpr);
      canvas.height = Math.round(ch * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      spriteR = Math.round(Math.min(cw, ch) * 0.24);
      lastHue = -99;
      if (head.x === 0 && head.y === 0) {
        head.x = cw * 0.72;
        head.y = ch * 0.4;
        target.x = head.x;
        target.y = head.y;
      }
    }

    function pickTarget() {
      const padX = cw * 0.14;
      const padY = ch * 0.16;
      target.x = padX + Math.random() * (cw - 2 * padX);
      target.y = padY + Math.random() * (ch - 2 * padY);
    }

    function step() {
      t++;
      let tx = target.x;
      let ty = target.y;
      let spring = 0.0022;
      let fr = 0.94;
      let maxv = 2.6;
      if (ptr.active) {
        tx = ptr.x;
        ty = ptr.y;
        spring = 0.014;
        fr = 0.9;
        maxv = 12;
      } else if (t > nextRetarget) {
        pickTarget();
        nextRetarget = t + 150 + ((Math.random() * 180) | 0);
      }
      // gentle organic drift while wandering
      const dx = ptr.active ? 0 : Math.sin(t * 0.013) * 0.3 + Math.cos(t * 0.0171) * 0.22;
      const dy = ptr.active ? 0 : Math.cos(t * 0.011) * 0.3 + Math.sin(t * 0.0193) * 0.22;
      head.vx = (head.vx + (tx - head.x) * spring + dx) * fr;
      head.vy = (head.vy + (ty - head.y) * spring + dy) * fr;
      const sp = Math.hypot(head.vx, head.vy);
      if (sp > maxv) {
        head.vx = (head.vx / sp) * maxv;
        head.vy = (head.vy / sp) * maxv;
      }
      head.x += head.vx;
      head.y += head.vy;

      const hue = 318 + Math.sin(t * 0.004) * 30; // slow drift ~288..348
      if (Math.abs(hue - lastHue) > 2.5) {
        renderSprite(hue);
        lastHue = hue;
      }

      trail.push({ x: head.x, y: head.y });
      if (trail.length > 28) trail.shift();
    }

    function draw() {
      ctx.clearRect(0, 0, cw, ch);
      const n = trail.length;
      for (let i = 0; i < n; i++) {
        const f = n > 1 ? i / (n - 1) : 1; // 0 = tail, 1 = head
        ctx.globalAlpha = f * f * 0.8;
        const s = spriteR * (0.4 + f * 0.6);
        ctx.drawImage(sprite, trail[i].x - s, trail[i].y - s, s * 2, s * 2);
      }
      ctx.globalAlpha = 1;
    }

    function frame() {
      step();
      draw();
      raf = requestAnimationFrame(frame);
    }

    function toLocal(e: PointerEvent) {
      const r = canvas.getBoundingClientRect();
      ptr.x = e.clientX - r.left;
      ptr.y = e.clientY - r.top;
    }
    function onDown(e: PointerEvent) {
      toLocal(e);
      ptr.active = true;
    }
    function onMove(e: PointerEvent) {
      if (ptr.active) toLocal(e);
    }
    function onUp() {
      ptr.active = false;
    }

    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas);

    if (reduce) {
      resize();
      renderSprite(330);
      const s = spriteR;
      ctx.globalAlpha = 0.7;
      ctx.drawImage(sprite, cw * 0.72 - s, ch * 0.4 - s, s * 2, s * 2);
      ctx.globalAlpha = 1;
    } else {
      window.addEventListener("pointerdown", onDown);
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
      window.addEventListener("pointercancel", onUp);
      resize();
      raf = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="absolute inset-0 h-full w-full"
      style={{ pointerEvents: "none" }}
    />
  );
}
