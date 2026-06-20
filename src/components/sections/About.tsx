import { SectionWrapper, SectionHeading } from "@/components/shared/SectionWrapper";

// PLACEHOLDER — bio, clients, and recognition come from the Q&A.
export function About() {
  return (
    <SectionWrapper id="about">
      <SectionHeading>About</SectionHeading>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.4fr_1fr]">
        <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">
          <p>
            Ellie&apos;s bio goes here — a couple of paragraphs on her practice,
            the kind of problems she takes on, and the through-line in her work.
          </p>
          <p>
            Keep it human and specific. This is where a prospective client
            decides she&apos;s the right person for their brand.
          </p>
        </div>
        <dl className="space-y-6 text-sm">
          <div>
            <dt className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
              Focus
            </dt>
            <dd className="mt-1">Creative direction · Brand · Art direction</dd>
          </div>
          <div>
            <dt className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
              Clients
            </dt>
            <dd className="mt-1">TODO — selected client list</dd>
          </div>
          <div>
            <dt className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
              Recognition
            </dt>
            <dd className="mt-1">TODO — awards &amp; press</dd>
          </div>
        </dl>
      </div>
    </SectionWrapper>
  );
}
