import Image from "next/image";
import { scope, scopeIntro } from "@/data/scope";

// "So, what exactly did I do?" — her deck scatters the answer around a central
// illustration of her. A scatter does not survive a narrow screen, so the same
// lines run as a two-column list flanking the illustration on desktop and stack
// under it on a phone. The words are hers, verbatim.

const WONK = { fontVariationSettings: '"SOFT" 0, "WONK" 1' } as const;

export function WhatIDid() {
  const half = Math.ceil(scope.length / 2);
  const columns = [scope.slice(0, half), scope.slice(half)];

  return (
    <section
      id="scope"
      className="w-full px-5 py-16 sm:px-10 sm:py-24"
      style={{ backgroundColor: "var(--ejd-marigold)" }}
    >
      <div className="mx-auto w-full max-w-6xl">
        <h2
          className="text-center font-display font-black uppercase leading-[0.84] tracking-[-0.03em]"
          style={{ ...WONK, color: "var(--ejd-vermilion)", fontSize: "clamp(2.6rem,9vw,7rem)" }}
        >
          {scopeIntro}
        </h2>

        <div className="mt-12 grid grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_auto_1fr] lg:gap-10">
          <ul
            className="order-2 space-y-6 text-sm leading-snug sm:text-base lg:order-1 lg:text-right"
            style={{ color: "var(--ejd-ink)" }}
          >
            {columns[0].map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>

          <Image
            src="/awards/what-i-did.webp"
            alt="An illustration of Ellie sitting cross-legged, a whole world of forests, city blocks and ships growing out of her lap"
            width={1100}
            height={707}
            className="order-1 mx-auto block h-auto w-[min(90vw,26rem)] lg:order-2 lg:w-[24rem]"
          />

          <ul
            className="order-3 space-y-6 text-sm leading-snug sm:text-base"
            style={{ color: "var(--ejd-ink)" }}
          >
            {columns[1].map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
