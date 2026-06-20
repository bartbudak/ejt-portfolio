import { site } from "@/lib/site";
import { Button } from "@/components/ui/button";

// PLACEHOLDER — replace copy/structure once Ellie's positioning is confirmed.
export function Hero() {
  return (
    <section
      id="top"
      className="mx-auto w-full max-w-5xl px-6 pb-20 pt-20 sm:pt-28"
    >
      <p className="animate-fade-up font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
        {site.role}
      </p>
      <h1 className="animate-fade-up mt-6 max-w-3xl font-heading text-5xl font-medium leading-[1.05] tracking-[-0.02em] sm:text-7xl">
        {site.tagline}
      </h1>
      <p className="animate-fade-up mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
        {/* TODO: 1–2 sentence positioning line from the Q&amp;A. */}
        A short, sharp statement of who Ellie is and the work she does goes
        here — the line that makes the right client lean in.
      </p>
      <div className="animate-fade-up mt-10 flex flex-wrap gap-3">
        <Button nativeButton={false} render={<a href="#work" />}>
          View work
        </Button>
        <Button variant="outline" nativeButton={false} render={<a href="#contact" />}>
          Get in touch
        </Button>
      </div>
    </section>
  );
}
