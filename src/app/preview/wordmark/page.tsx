import type { Metadata } from "next";
import { HeroParticle, WARM_STOPS, ACID_STOPS } from "@/components/shared/HeroParticle";

// Throwaway A/B aid: warm vs acid wordmark gradient on the paper bg.
export const metadata: Metadata = {
  title: "Wordmark A/B",
  robots: { index: false, follow: false },
};

const VARIANTS = [
  { label: "A — warm rose → gold (current)", stops: WARM_STOPS },
  { label: "B — acid Maeve pop", stops: ACID_STOPS },
];

export default function WordmarkCompare() {
  return (
    <div className="bg-background">
      {VARIANTS.map((v) => (
        <section
          key={v.label}
          className="mx-auto w-full max-w-3xl px-6 pt-6 pb-2"
        >
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {v.label}
          </p>
          <div className="relative h-[36vh] w-full">
            <HeroParticle stops={v.stops} />
          </div>
        </section>
      ))}
    </div>
  );
}
