import { caseStudies, selectedProjects } from "@/data/projects";

// "Quiet work" — a calm editorial index of the real case studies (the loud hero
// gives way to clean type that lets the work breathe). Image-forward case-study
// pages come later once assets are exported; for now this is the typographic index.
export function Work() {
  return (
    <section
      id="work"
      className="mx-auto w-full max-w-5xl scroll-mt-28 px-6 py-24 sm:py-32"
    >
      <div className="mb-14 flex items-baseline justify-between gap-4">
        <h2 className="font-display text-4xl font-medium tracking-[-0.01em] sm:text-5xl">
          Selected work
        </h2>
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
          {caseStudies.length} case studies
        </p>
      </div>

      <ul className="border-t border-border/70">
        {caseStudies.map((c, i) => (
          <li
            key={c.slug}
            className="grid grid-cols-1 gap-3 border-b border-border/70 py-9 sm:grid-cols-[2.5rem_1fr_auto] sm:items-baseline sm:gap-8"
          >
            <span className="font-mono text-xs text-muted-foreground sm:pt-2">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="font-display text-3xl font-medium leading-tight sm:text-4xl">
                {c.title}
              </h3>
              <p className="mt-2 max-w-xl leading-relaxed text-muted-foreground">
                {c.summary}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {c.disciplines.map((d) => (
                  <span
                    key={d}
                    className="rounded-full border border-border/70 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>
            <div className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground sm:pt-2 sm:text-right">
              <div className="text-foreground">{c.year}</div>
              <div className="mt-1">{c.client}</div>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-16">
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Also
        </p>
        <ul>
          {selectedProjects.map((p) => {
            const meta = p.role.startsWith("TODO") ? p.client : p.role;
            return (
              <li
                key={p.title}
                className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-border/50 py-4"
              >
                <span className="font-heading text-lg font-medium">{p.title}</span>
                <span className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
                  {meta} · {p.year}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
