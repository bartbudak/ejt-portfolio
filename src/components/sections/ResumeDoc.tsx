import { resume } from "@/data/resume";

// Ellie's résumé as a document: two US Letter pages, set in the site's own
// type and colours so it reads as part of her brand rather than a template,
// but kept quiet enough to hand to a recruiter. Fraunces for her name and the
// section heads, Hanken for the copy, the mono face for dates and labels, the
// paper and marigold from the deck palette.
//
// Every measurement is in em and the root font-size is set by whoever renders
// it: the print route pins it to 16px, which makes a page exactly 8.5 x 11
// inches at 96dpi (51em x 66em); the Resume page derives it from its
// container's width, so the same document scales to fit the frame it sits
// in. scripts/print-resume.sh prints the print route to the PDF the page
// offers for download, so the two never drift.
//
// Page breaks are set by hand — the Brand Manager bullets split at `SPLIT` —
// because a résumé's second page should start where a reader expects it to,
// not wherever the browser ran out of room.

const WONK = { fontVariationSettings: '"SOFT" 0, "WONK" 1' } as const;

const PAPER = "#fff3e5";
const INK = "#1a1210";
const VERMILION = "#f83e02";
const MARIGOLD = "#feb431";
const BLUSH = "#f2b7b3";

/** How many Brand Manager bullets stay on page one. */
const SPLIT = 5;

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rz-section">
      <h2 className="rz-h2 font-display font-black uppercase" style={WONK}>
        {title}
      </h2>
      {children}
    </section>
  );
}

function Role({
  role,
  bullets,
  continued,
}: {
  role: (typeof resume.roles)[number];
  bullets: readonly string[];
  continued?: boolean;
}) {
  return (
    <div className="rz-role">
      <div className="rz-row">
        <h3 className="rz-h3">
          {role.title}
          {continued && <span className="rz-continued">, continued</span>}
        </h3>
        <span className="rz-dates font-mono">{role.dates}</span>
      </div>
      <ul className="rz-bullets">
        {bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
    </div>
  );
}

function Footer({ page }: { page: number }) {
  return (
    <div className="rz-footer font-mono">
      <span>{resume.name}</span>
      <span>Page {page} of 2</span>
    </div>
  );
}

export function ResumeDoc({ print = false }: { print?: boolean }) {
  const [director, brand, coordinator, sales] = resume.roles;

  return (
    <div
      className={`rz ${print ? "rz-print" : ""}`}
      style={{ fontSize: print ? "16px" : "calc(100cqw / 51)" }}
    >
      <style>{`
        .rz { color: ${INK}; font-family: var(--font-sans); line-height: 1.4; }
        .rz-page { position: relative; width: 51em; height: 66em; padding: 2.6em 3em 2.4em; background: ${PAPER}; overflow: hidden; box-sizing: border-box; }
        .rz:not(.rz-print) .rz-page + .rz-page { margin-top: 1.5em; }
        .rz-print .rz-page { break-after: page; }
        .rz-print .rz-page:last-child { break-after: auto; }
        .rz-name { font-size: 2.35em; line-height: 0.9; letter-spacing: -0.02em; color: ${VERMILION}; margin: 0; }
        .rz-role-line { margin-top: 0.55em; font-size: 0.58em; letter-spacing: 0.16em; text-transform: uppercase; }
        .rz-contact { margin-top: 0.45em; font-size: 0.68em; display: flex; flex-wrap: wrap; gap: 0 0.9em; }
        .rz-contact a { color: inherit; text-decoration: underline; text-underline-offset: 0.2em; text-decoration-color: ${VERMILION}; }
        .rz-contact li + li::before { content: "·"; margin-right: 0.9em; color: ${VERMILION}; }
        .rz-rule { height: 0.14em; background: ${INK}; margin: 1.1em 0 1em; border-radius: 1em; }
        .rz-summary { font-size: 0.72em; line-height: 1.5; margin: 0; text-wrap: pretty; }
        .rz-stats { display: grid; grid-template-columns: repeat(6, 1fr); gap: 0.55em; margin: 1.1em 0 0; padding: 0; list-style: none; }
        .rz-stat { background: ${MARIGOLD}; border: 0.1em solid ${INK}; border-radius: 0.7em; padding: 0.55em 0.5em 0.5em; text-align: center; }
        .rz-stat b { display: block; font-family: var(--font-display); font-weight: 900; font-size: 1.25em; line-height: 1; letter-spacing: -0.02em; }
        .rz-stat span { display: block; margin-top: 0.4em; font-family: var(--font-mono); font-size: 0.46em; line-height: 1.3; letter-spacing: 0.08em; text-transform: uppercase; }
        .rz-section { margin-top: 1.25em; }
        .rz-h2 { font-size: 0.95em; letter-spacing: 0.02em; color: ${VERMILION}; margin: 0 0 0.55em; padding-bottom: 0.25em; border-bottom: 0.1em solid ${INK}; }
        .rz-employer { display: flex; justify-content: space-between; align-items: baseline; gap: 1em; font-size: 0.78em; font-weight: 700; }
        .rz-employer-note { margin: 0.2em 0 0; font-size: 0.7em; font-style: italic; }
        .rz-role { margin-top: 0.75em; }
        .rz-row { display: flex; justify-content: space-between; align-items: baseline; gap: 1em; }
        .rz-h3 { margin: 0; font-size: 0.78em; font-weight: 700; }
        .rz-continued { font-weight: 400; font-style: italic; }
        .rz-dates { font-size: 0.56em; letter-spacing: 0.1em; text-transform: uppercase; white-space: nowrap; }
        .rz-bullets { margin: 0.3em 0 0; padding-left: 1.1em; font-size: 0.7em; line-height: 1.42; }
        .rz-bullets li { margin-top: 0.22em; padding-left: 0.15em; text-wrap: pretty; }
        .rz-bullets li::marker { color: ${VERMILION}; }
        .rz-signature { margin-top: 0.8em; background: ${BLUSH}; border: 0.1em solid ${INK}; border-radius: 0.8em; padding: 0.8em 0.95em 0.85em; }
        .rz-signature-label { margin: 0; font-family: var(--font-mono); font-size: 0.52em; letter-spacing: 0.16em; text-transform: uppercase; }
        .rz-signature-title { margin: 0.25em 0 0; font-family: var(--font-display); font-weight: 900; font-size: 1.05em; line-height: 1; color: ${VERMILION}; }
        .rz-signature-body { margin: 0.5em 0 0; font-size: 0.7em; line-height: 1.45; text-wrap: pretty; }
        .rz-signature-link { display: inline-block; margin-top: 0.5em; font-family: var(--font-mono); font-size: 0.56em; letter-spacing: 0.1em; text-transform: uppercase; color: ${INK}; text-decoration: underline; text-underline-offset: 0.25em; text-decoration-color: ${VERMILION}; }
        .rz-list { margin: 0; padding-left: 1.1em; font-size: 0.7em; line-height: 1.42; }
        .rz-list li { margin-top: 0.22em; text-wrap: pretty; }
        .rz-list li::marker { color: ${VERMILION}; }
        .rz-cols { display: grid; grid-template-columns: 1.35fr 1fr; gap: 1.4em; }
        .rz-awards { margin: 0; padding: 0; list-style: none; font-size: 0.7em; line-height: 1.42; }
        .rz-awards li { margin-top: 0.35em; padding-left: 1.2em; position: relative; text-wrap: pretty; }
        .rz-awards li::before { content: "★"; position: absolute; left: 0; color: ${VERMILION}; }
        .rz-awards b { display: block; }
        .rz-chips { margin: 0; padding: 0; list-style: none; display: flex; flex-wrap: wrap; gap: 0.35em; }
        .rz-chips li { font-size: 0.6em; font-weight: 600; padding: 0.3em 0.7em; border: 0.1em solid ${INK}; border-radius: 2em; background: ${MARIGOLD}; }
        .rz-press { margin: 0; padding: 0; list-style: none; display: flex; flex-wrap: wrap; gap: 0.25em 0; font-size: 0.7em; font-weight: 600; }
        .rz-press li + li::before { content: "·"; margin: 0 0.6em; color: ${VERMILION}; font-weight: 400; }
        .rz-press-note { margin: 0.45em 0 0; font-size: 0.68em; font-style: italic; }
        .rz-edu { margin: 0; font-size: 0.74em; }
        .rz-edu b { display: block; }
        .rz-quote { margin: 1.3em 0 0; padding: 0.9em 1em 0.85em 1.05em; border-left: 0.35em solid ${MARIGOLD}; font-size: 0.74em; line-height: 1.45; }
        .rz-quote p { margin: 0; font-style: italic; }
        .rz-quote footer { margin-top: 0.45em; font-family: var(--font-mono); font-size: 0.78em; letter-spacing: 0.1em; text-transform: uppercase; font-style: normal; }
        .rz-footer { position: absolute; left: 3em; right: 3em; bottom: 1.1em; display: flex; justify-content: space-between; font-size: 0.5em; letter-spacing: 0.16em; text-transform: uppercase; opacity: 0.6; }
        @media print { .rz-page { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
      `}</style>

      {/* ── Page 1 ─────────────────────────────────────────────────────── */}
      <div className="rz-page">
        <header>
          <h1
            className="rz-name font-display font-black uppercase"
            style={WONK}
          >
            {resume.name}
          </h1>
          <p className="rz-role-line font-mono">{resume.role}</p>
          <ul className="rz-contact">
            {resume.contact.map((c) => (
              <li key={c.label}>
                {"href" in c ? (
                  <a href={c.href} target="_blank" rel="noreferrer">
                    {c.label}
                  </a>
                ) : (
                  c.label
                )}
              </li>
            ))}
          </ul>
        </header>

        <div className="rz-rule" />

        <p className="rz-summary">{resume.summary}</p>

        <ul className="rz-stats">
          {resume.stats.map((s) => (
            <li key={s.label} className="rz-stat">
              <b style={WONK}>{s.value}</b>
              <span>{s.label}</span>
            </li>
          ))}
        </ul>

        <Section title="Experience">
          <div className="rz-employer">
            <span>{resume.employer.name}</span>
            <span className="rz-dates font-mono">
              {resume.employer.place} · {resume.employer.dates}
            </span>
          </div>
          <p className="rz-employer-note">{resume.employer.note}</p>

          <Role role={director} bullets={director.bullets} />

          <div className="rz-role">
            <div className="rz-row">
              <h3 className="rz-h3">{brand.title}</h3>
              <span className="rz-dates font-mono">{brand.dates}</span>
            </div>
            <div className="rz-signature">
              <p className="rz-signature-label">{resume.signature.label}</p>
              <p className="rz-signature-title" style={WONK}>
                {resume.signature.title}
              </p>
              <p className="rz-signature-body">{resume.signature.body}</p>
              <a
                className="rz-signature-link"
                href={resume.signature.link.href}
                target="_blank"
                rel="noreferrer"
              >
                {resume.signature.link.label}
              </a>
            </div>
            <ul className="rz-bullets">
              {brand.bullets.slice(0, SPLIT).map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        </Section>

        <Footer page={1} />
      </div>

      {/* ── Page 2 ─────────────────────────────────────────────────────── */}
      <div className="rz-page">
        <Section title="Experience, continued">
          <Role role={brand} bullets={brand.bullets.slice(SPLIT)} continued />
          <Role role={coordinator} bullets={coordinator.bullets} />
          <Role role={sales} bullets={sales.bullets} />
        </Section>

        <Section title={resume.beyond.heading}>
          <ul className="rz-list">
            {resume.beyond.items.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </Section>

        <div className="rz-cols">
          <Section title={resume.recognition.heading}>
            <ul className="rz-awards">
              {resume.recognition.items.map((a) => (
                <li key={a.name}>
                  <b>{a.name}</b>
                  {a.detail}
                </li>
              ))}
            </ul>
          </Section>
          <Section title={resume.expertise.heading}>
            <ul className="rz-chips">
              {resume.expertise.items.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </Section>
        </div>

        <Section title={resume.press.heading}>
          <ul className="rz-press">
            {resume.press.outlets.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>
          <p className="rz-press-note">{resume.press.note}</p>
        </Section>

        <Section title={resume.education.heading}>
          <p className="rz-edu">
            <b>{resume.education.school}</b>
            {resume.education.degree}
          </p>
        </Section>

        <blockquote className="rz-quote">
          <p>“{resume.reference.quote}”</p>
          <footer>
            {resume.reference.name}, {resume.reference.title}
          </footer>
        </blockquote>

        <Footer page={2} />
      </div>
    </div>
  );
}
