import { site } from "@/lib/site";
import { SectionWrapper, SectionHeading } from "@/components/shared/SectionWrapper";
import { Button } from "@/components/ui/button";

// PLACEHOLDER — wire up the Firestore-backed contact form here later if wanted;
// for now a direct email CTA keeps the scaffold functional.
export function Contact() {
  return (
    <SectionWrapper id="contact">
      <SectionHeading>Let&apos;s work together</SectionHeading>
      <div className="max-w-2xl space-y-8">
        <p className="text-lg leading-relaxed text-muted-foreground">
          For new projects, collaborations, and speaking — the best way to reach
          Ellie is by email.
        </p>
        <Button
          size="lg"
          nativeButton={false}
          render={<a href={`mailto:${site.email}`} />}
        >
          {site.email}
        </Button>
      </div>
    </SectionWrapper>
  );
}
