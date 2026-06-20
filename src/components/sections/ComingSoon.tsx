// Minimal holding page for elliejthompson.com — just the words "coming soon",
// in the warm Fraunces gradient wordmark with the soft drifting blob behind it.
export function ComingSoon() {
  return (
    <div
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-6"
      style={{ backgroundColor: "var(--ej-cream)", color: "var(--ej-cocoa)" }}
    >
      <div
        aria-hidden
        className="cs-blob pointer-events-none absolute left-1/2 top-1/2 h-[60vmin] w-[60vmin] rounded-full"
      />
      <h1 className="cs-name font-display relative z-10 text-balance text-center text-[clamp(3rem,15vw,11rem)] font-semibold lowercase leading-[0.95] tracking-[-0.03em]">
        coming soon
      </h1>
    </div>
  );
}
