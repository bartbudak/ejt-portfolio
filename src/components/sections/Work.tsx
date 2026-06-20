import { SectionWrapper, SectionHeading } from "@/components/shared/SectionWrapper";

// PLACEHOLDER — the case-study grid gets built from real projects after the Q&A.
const placeholders = [
  { title: "Case study 01", meta: "Brand · Campaign" },
  { title: "Case study 02", meta: "Art direction" },
  { title: "Case study 03", meta: "Visual system" },
];

export function Work() {
  return (
    <SectionWrapper id="work">
      <SectionHeading>Selected work</SectionHeading>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {placeholders.map((p) => (
          <div
            key={p.title}
            className="group flex aspect-[4/5] flex-col justify-end rounded-lg border border-border bg-muted/40 p-6 transition-colors hover:bg-muted"
          >
            <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
              {p.meta}
            </p>
            <p className="mt-2 font-heading text-2xl font-medium">{p.title}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
