import { site } from "@/lib/site";

// Deployable holding page for elliejthompson.com.
// Type system "Tempered": Fraunces (display) · Gabarito (headings) · Hanken (body).
// Self-contained warm palette so it renders identically regardless of theme.
export function ComingSoon() {
  return (
    <div
      className="relative flex min-h-screen w-full flex-col overflow-hidden"
      style={{ backgroundColor: "var(--ej-cream)", color: "var(--ej-cocoa)" }}
    >
      {/* the one warm gesture — a soft drifting blob behind the wordmark */}
      <div
        aria-hidden
        className="cs-blob pointer-events-none absolute left-1/2 top-[44%] h-[60vmin] w-[60vmin] rounded-full"
      />

      <header className="relative z-10 flex items-center justify-between px-6 py-6 sm:px-10">
        <span className="font-mono text-xs uppercase tracking-[0.25em]">
          {site.shortName}
        </span>
        <span className="font-mono text-xs uppercase tracking-[0.25em]">
          {site.location} · 2026
        </span>
      </header>

      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center">
        <p
          className="animate-fade-up font-mono text-xs uppercase tracking-[0.3em]"
          style={{ color: "var(--ej-ember)" }}
        >
          Portfolio — Coming Soon
        </p>

        <h1 className="cs-name font-display mt-6 max-w-[12ch] text-balance text-[clamp(2.75rem,10vw,7.5rem)] font-semibold leading-[0.95] tracking-[-0.02em]">
          {site.name}
        </h1>

        <p className="font-heading mt-6 text-xl tracking-tight sm:text-2xl">
          {site.role}
        </p>

        <p
          className="mt-6 max-w-md text-base leading-relaxed"
          style={{ color: "color-mix(in oklab, var(--ej-cocoa) 72%, transparent)" }}
        >
          Brand worlds, art direction, and the occasional warrior queen. A new
          portfolio is being poured. Until then, let&apos;s talk.
        </p>

        <a
          href={`mailto:${site.email}`}
          className="mt-9 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-transform hover:-translate-y-0.5"
          style={{ backgroundColor: "var(--ej-cocoa)", color: "var(--ej-cream)" }}
        >
          {site.email}
        </a>
      </main>

      <footer
        className="relative z-10 flex items-center justify-between px-6 py-6 font-mono text-[0.7rem] uppercase tracking-[0.2em] sm:px-10"
        style={{ color: "color-mix(in oklab, var(--ej-cocoa) 55%, transparent)" }}
      >
        <span>© 2026 {site.name}</span>
        <span>elliejthompson.com</span>
      </footer>
    </div>
  );
}
