import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  id: string;
  className?: string;
  children: React.ReactNode;
}

export function SectionWrapper({ id, className, children }: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        "mx-auto w-full max-w-5xl px-6 py-20 scroll-mt-16",
        className
      )}
    >
      {children}
    </section>
  );
}

export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      data-animate="section-heading"
      className="mb-12 font-heading text-4xl font-medium leading-snug tracking-[-0.01em]"
    >
      {children}
    </h2>
  );
}
