// The mark that says a link leaves the site. The header's Resume tab already
// carried a bare "↗"; Ellie asked for the same signal on outbound links in the
// body copy, starting with Maeve (2026-09-07).
//
// Drawn rather than typed. The arrow character's weight and baseline come from
// whatever font happens to have that glyph, which made it sit differently in
// the display face than in body copy. A stroked SVG inherits the text colour,
// scales with `em`, and looks the same everywhere.
//
// It is decorative: the "(opens in a new tab)" text beside it is what a screen
// reader announces, so the icon stays out of the tree.
export function ExternalIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      className={`inline-block h-[0.72em] w-[0.72em] shrink-0 align-baseline ${className}`}
    >
      <path
        d="M9 5h10v10M19 5 6.5 17.5"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Wraps a label so the icon can never wrap onto a line of its own. */
export function ExternalLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="whitespace-nowrap">
      {children}
      <ExternalIcon className="ml-[0.15em]" />
      <span className="sr-only"> (opens in a new tab)</span>
    </span>
  );
}
