# ejt-portfolio — Session Handoff

Portfolio for **Ellie J. Thompson** (creative director) → **elliejthompson.com**.
Built by Bart (her husband). This doc captures the direction, research, and
decisions so a fresh session can continue without re-deriving anything.

---

## 1. Goal & positioning

- **Primary goal:** a portfolio to land a **senior Creative Director role at an
  agency** — and to showcase future freelance work.
- **Audience:** agency creative directors / recruiters (US, moving toward
  global). They know this industry — accuracy and credited collaborators matter.
- **Title decision (important):** present her as **"Creative Director"**, framed
  as the **brand-side creative lead / vision owner**. Press consistently titles
  her "Brand Manager" and credits the agencies for execution — but Bart confirms
  Ellie **owned the full creative scope**: concept, art direction, copy, color &
  flavor-character decisions, casting + directing the partners, and on-set
  direction of shoots. **Case-study copy must credit the agencies (Young Jerks,
  View Source, photographer) and frame her as the director — never imply she did
  the design execution herself.** Agency readers will know better.

## 2. Brand voice

Refined / luxury, but **warm, down-to-earth, kind, honest, world-aware**.

---

## 3. Verified research (web, June 2026)

**Maeve = the full rebrand of Seattle Chocolate Company** (a ~30-yr-old brand
renamed, not a spinoff). Announced March 3 2025; trade debut Expo West April
2025. Named after the fierce Irish warrior queen Maeve. A **mother–daughter**
project: CEO/owner **Jean Thompson** (mom) + Ellie. Ellie joined SCC in 2019
(sales → brand/marketing) and **initiated** the rebrand.

**Collaborators she directed**
- **Young Jerks** (Brooklyn) — identity, packaging, brand world. Partners/CDs
  Dan Cassaro & Dan Christofferson.
- **View Source** — the e-commerce website.
- **Valeria Roca** — photography (per Bart; not independently corroborated online).

**Awards**
- **Webby (2026, Food & Drink — Websites)** — CONFIRMED via winners page Bart
  provided: `winners.webbyawards.com/2026/.../food-drink/364780/maeve-chocolate`.
  The page is JS-rendered (not fetchable); **still need the award LEVEL**
  (Winner vs Nominee vs People's Voice) for accurate copy.
- **CSS Design Awards "Website of the Day"** — Oct 23 2025, judge score 8.01,
  credited to View Source. (This is a real, separate award — not the Webby.)
- **Dieline Awards** (credited "Maeve & Young Jerks"):
  - 2026: Celebrations **2nd** & Spring **3rd** (Confectionery, cat 1F);
    Holiday **2nd** & Summer **Merit** (Limited Editions, cat 09).
  - 2025: **2nd** (Confectionery).
- **NEXTY 2025 finalist** — PR-sourced only; treat as "finalist" and verify.

**Press / media**
KING 5 *Evening*, *Seattle Refined*, *Seattle Magazine*, FOX 13, **The Brand
Study** podcast (Sweep Creative), **Dieline** (x2 features), **Brand New /
UnderConsideration** (prestigious in branding), MediaPost, **Transform** (UK
trade), FoodNavigator, New Hope.

**Projects / collaborations**
- **Maeve flagship rebrand** — the anchor case study.
- **Maeve × Dungeon Crawler Carl** — "Virgin Dirty Shirley" bar w/ author Matt
  Dinniman (confirmed; he promoted it himself).
- **Maeve × TALEA** — experiential: "Galentine's Rom-Com Trivia" at TALEA's
  Brooklyn taproom; co-brewed **"Pineapple Coco Cacao Sour"** beer + custom
  glassware + Maeve craft stations; 119 attendees (`luma.com/crgez1nk`).
  This is an **experiential / brand-event** collab, not a product.
- **SCC seasonal artist collections** — global illustrators she art-directed:
  Kendra Dandy, Bodil Jane (Amsterdam), Frida Clements, Esther Loopstra,
  Llewellyn Mejia.

**Quote bank (usable for About / voice)** — examples:
- "The packaging didn't reflect the soul of the company I loved."
- "With Maeve, I want people to feel something the moment they lay eyes on a bar."
- "Maeve isn't just a new name; it's a new energy."
- "When they buy Maeve, they're voting with their dollar to help save cocoa."
- "It was like trying to assemble a 50,000-piece puzzle while blindfolded, while
  juggling, during a global supply chain crisis."

## 4. Still needed from Ellie (Bart to gather)

- Webby **award level** + a screenshot/badge.
- NW Chocolate Festival panels (Climate Crisis; How to Rebrand) — titles/years.
- UW & Seattle U session details (the Seattle U Family Business Exchange fireside
  chat, ~Apr 2026, is confirmed).
- **Ethical Apparel Africa** (2024) — her role/scope/links.
- **Cancer Pathways** fundraiser (2021–24) — her role/scope.
- Valeria Roca photo credit confirmation (which shoots).
- Dieline awards **speech** details (which year, recording?).
- **High-res assets** (packaging, photography, web captures) — drives the visual design.
- **Portrait** of Ellie.
- 3–4 sentences of her **own creative philosophy** for the About page.

Note: sources say she did **not** initially plan to join the family business
(cocoa-farm sourcing trips drew her in) — soften any "always meant to lead it"
framing unless she wants to own it.

---

## 5. Design direction — "Calm craft, with one warm gesture"

Synthesized from Bart's four references (Hello Monday, Monogrid, dgrees,
Beaucoup):

- **Governing layer = restraint (Beaucoup):** generous negative space, tight
  editorial type system, slow honest scroll reveals, no effect-for-its-own-sake.
- **One signature whimsy (Hello Monday):** a single playful **chocolate-drop /
  wax-seal "blob"** motif that doubles as menu + back-to-top and morphs on
  interaction. Exactly one such element so the luxury read survives.
- **Motion vocabulary (Monogrid) minus its problem:** a crafted intro loader,
  scroll-linked transitions between case studies, subtle mouse-reactive texture
  — but reject the cold electric `#0000ff`; use warm edible neutrals and
  **viscous "poured-chocolate" easing** (heavy, smooth, unhurried).
- **Structure (dgrees):** a hero pairing one motion centerpiece with a plain,
  human thesis line; a manifesto-as-numbered-values section; a **stepped,
  conversational contact form**.
- Human footer with real collaborator names, locations, and real awards.
- **Honesty caveat:** rendered animations can't be judged from fetched HTML —
  final motion must be evaluated live in a browser.

## 6. Brand system (already implemented)

- **Palette "Atelier Paper" — APPLIED to `globals.css` (light + dark).**
  Workflow-synthesized warm paper/ink gallery neutrals + ONE tamed-rose accent
  (Maeve's hot pink `#EF6FBC` disciplined into a text-safe berry-rose).
  Light: bg `#F2EAD9` · ink `#2A2521` · rose `#A23A6A`. Dark: bg `#1E1A19` ·
  bone `#ECE3D2` · blush `#E79CBF`. Brand accents: `--ej-rose / -rose-deep /
  -blush / -gold / -gold-ink / -cocoa`. WCAG AA in both themes; rose is
  text-safe. **Guard rails:** `--ej-gold` is hairline/decoration-only on light
  (use `--ej-gold-ink` for gold text); cards need `--shadow-card` (bg→surface
  is subtle by design). Rose is routed via `--ring` + `--ej-*`; shadcn
  `--accent` kept a neutral hover bg. **Runner-up "Deep Atelier"** (dark
  espresso/oxblood) kept in pocket as the optional dark case-study stage.
- **Coming-soon is FROZEN** — its colors are hardcoded (decoupled from the
  theme tokens) per Ellie's approval. Do NOT restyle it when iterating the
  palette.
- **Type system "Tempered"** (all Google Fonts):
  - Display — **Fraunces** (chunky, high-contrast; SOFT/WONK axes for character)
  - Headings — **Gabarito** (rounded)
  - Body — **Hanken Grotesk**
  - Labels — **JetBrains Mono**
  - Alternates explored: "Carnival" (Syne / Zodiak) and "Atelier"
    (Instrument Serif / Cabinet Grotesk).

---

## 7. IA — LOCKED (Bart confirmed)

**Structure: hybrid** — a work-forward single-scroll home funneling into
dedicated case-study pages.

**Sitemap**
```
/                  Home (scroll)
/work/maeve        ★ Maeve flagship rebrand        (full case study)
/work/maeve-dcc    Maeve × Dungeon Crawler Carl     (full case study)
/work/seasonal     Seasonal collections / system    (full case study)
/about             Full bio / philosophy / recognition
```
- **Full case studies:** Maeve (flagship), Maeve × DCC, Seasonal collections.
- **Selected projects (mentions, not full pages):** Maeve × TALEA (experiential
  Galentine's event + co-brewed beer), Ethical Apparel Africa, Cancer Pathways
  — pending details.
- **Home scroll:** Hero · Selected Work (tiles) · About teaser · Recognition
  strip (Webby · Dieline ×5 · CSS Design Award · press) · Contact · footer.
- **Hero = evolve the particle wordmark** (the dot-scatter "ejt." concept) into
  the live homepage hero as the signature motion moment.
- **Case-study template:** header (title/client/year/HER ROLE/disciplines) →
  hero visual → challenge → insight → **creative direction (what she directed)**
  → the work (gallery) → outcome (awards/press) → **credits (agencies)** → next.
- **Data model:** typed `projects` array in `src/data/projects.ts`
  (`slug, title, client, year, role, disciplines[], summary, hero, sections[],
  gallery[], credits[], awards[], press[]`); home tiles + case-study pages both
  render from it.
- **Contact:** section on home + footer → `elliejth@gmail.com`; socials
  (IG @elliejthompson, LinkedIn `in/ellie-thompson-aa405116a`).

**Asset mapping (from `assets/`):** Maeve flagship draws on Primary/Vertical
logos, the seasonal logo systems, characters (Greg, Gretchen, Froggy Bottom),
product elements (Forbidden Fruits, Heat & Honey, PB Banana Affair), and the
Young Jerks Decks (process). DCC → `Logos/DCC Logo`. Seasonal → the five seasonal
systems. **Asset GAP:** kit is vectors/logos/elements — still need lifestyle/
packaging **photography** (Valeria Roca) and **website captures** (View Source)
to make case studies feel real.

---

## 8. Repo / build / deploy state

- **Repo:** `github.com/divs-are-aligned/ejt-portfolio` (private).
- **Local:** `/Users/scclt_mb002/Documents/GitHub/ejt-portfolio`
- **Stack:** Next.js 16 (static export) · pnpm · shadcn/ui · Tailwind v4 ·
  Firebase Hosting. Same deploy flow as `bb-portfolio`. (See `AGENTS.md`: this
  Next.js has breaking changes — read `node_modules/next/dist/docs/` before
  writing framework code.)
- **Coming-soon page is built and verified** — an interactive **particle
  wordmark**: "ejt." over "coming soon" sampled into a field of warm gradient
  dots that scatter from the pointer/touch and spring back (Canvas 2D + a small
  rAF physics loop; `prefers-reduced-motion` → static). Gated by the
  `comingSoon: true` flag in `src/lib/site.ts`.
- **Firebase project `ejt-folio` is created** (empty). **NOT yet deployed.**
  Bart verbally OK'd deploying the holding page but it hasn't shipped.
  - Deploy: `pnpm run deploy` (builds + `firebase deploy --only hosting`) →
    `ejt-folio.web.app`.
  - Custom domain `elliejthompson.com`: add in Firebase Console → Hosting after
    first deploy (needs Bart's DNS records at the registrar).
- **Full site sections** (`Hero/Work/About/Contact`) are placeholders behind the
  `comingSoon` flag — flip to `false` to launch the full site.

### Key files
- `src/lib/site.ts` — identity + `comingSoon` flag (single source of truth).
- `src/components/sections/ComingSoon.tsx` — holding page.
- `src/components/shared/ParticleHeadline.tsx` — particle wordmark (tunable:
  `R`, `PUSH`, `SPRING`, `FRICTION`, `step`, `dotR`).
- `src/app/globals.css` — palette + type tokens.
- `functions/index.js` — contact-form email Function (recipient is a TODO).

## 9. Next steps

1. Finalize the **IA** (section 7) and confirm single-scroll-vs-multi-page.
2. Get Ellie's missing details + **high-res assets** (section 4).
3. Draft the **Maeve flagship case study** copy from the verified material.
4. Apply the **design direction** (section 5) section by section.
5. Deploy the holding page when Bart says go; wire the custom domain.

## 10. Working preferences (Bart)

- Committing/pushing is fine — no need to ask each time.
- **Be efficient with UI verification.** The preview-screenshot loop is the main
  time sink — verify once when a change is settled; don't chase animation frames
  or restart-and-re-screenshot. Trust the build for correctness.

## 11. Hero / visual direction — "loud hero, quiet work" (prototype built)

Bart's refined brief (referencing the SAMSON site, danilodemarco.com, and a grainy
"color-blotch" Behance portfolio): a **maximalist collage hero**. Decision **LOCKED**:
**loud hero, quiet work** — the home hero is a maximalist Maeve-character collage
framing the edges, with the pixel/particle wordmark reading **"Welcome, I'm Ellie"**
as the bright centerpiece; case-study pages stay calm/editorial so the work reads
clean. Positioning safeguard: the Maeve cast = "the world she directed" at the
EDGES; Ellie's OWN identity (the rose wordmark, grain, warm palette) owns the
refined center and stays distinct from the saturated cartoon characters.

**Built (v1 prototype, behind `/preview` — live coming-soon page untouched):**
- `src/components/sections/HeroCollage.tsx` — full-bleed hero. CSS-only background
  (paper + 4 soft radial-gradient brand-tone blotches + a tiling feTurbulence grain
  at ~9% soft-light). Edge **cutout frame** of 9 transparent cutouts (vw-sized,
  rotated, denser toward the bottom), isolated below the centered copy.
- `src/components/shared/HeroParticle.tsx` — a **separate** instance of the particle
  wordmark (frozen `ComingSoon` mount left alone), retargeted to "Welcome," /
  "I'm Ellie". Gradient is a `stops` prop: `WARM_STOPS` (rose→gold) and `ACID_STOPS`
  (hot pink→magenta→red-orange→purple). **Bart picked ACID** (the louder Maeve pop)
  — the hero passes `stops={ACID_STOPS}`. Center box has an explicit clamp height so
  the canvas always paints.
- `src/app/preview/page.tsx` — renders a local `<Navbar/>` + `<HeroCollage/>` + the
  existing sections; `noindex`. Preview at `pnpm exec next dev --port 3100` → `/preview`.
- `public/hero/` — the only shipped derivatives: `greg-rocket.png` (1800px),
  `greg-stars.png` (1280px), and 6 vector SVGs (froggy-trench, pineapple, roses,
  heart-arrow, heart-red, heart-yellow). Raw `/assets/` kit stays gitignored/local.

**Hero cast (from the Maeve kit):** Greg on Rocket (bottom-right anchor), Trench-coat
Froggy (bottom-left), Greg with Stars (top-right), pineapple, 2 roses, pink
heart-arrow, red + yellow hearts (scatter). Greg PNGs confirmed true-alpha (bg
palette index has alpha 0 — not a baked rectangle). Gretchen is a 7-pose **sheet**
that still needs slicing if used.

**Responsive:** cutout size/position/visibility are Tailwind responsive classes.
Mobile (`<sm`) shows 4 bold pieces (Greg-rocket, Froggy, Greg-stars, heart-arrow,
all larger-vw and bleeding off-edge); the 6 scatter-decor pieces are `hidden sm:block`
so the smaller wordmark stays uncrowded. Verified desktop (1440) + mobile (375).

**⚠️ Deploy caution (verified):** `firebase deploy` (main channel) would ship
`/preview/` + `public/hero/` to live elliejthompson.com despite `comingSoon=true`
(Firebase serves `out/`, robots `Allow: /`). Iterate **locally only**; use the
ephemeral `pnpm deploy:preview` channel for sharing, never the main channel.

**Update — Valentin-Gassend restructure (Bart's ref):** the hero moved to a
type-forward framed layout: **UPPERCASE** wordmark "WELCOME, I'M ELLIE" (acid), a
faint gold structural **grid**, and **corner micro-labels** (role top-left,
"Portfolio 2026" / "Based in {location}" bottom corners) wrapping the center. The
Maeve cast is now **wrapped IN around the wordmark** (behind the dots), with a
fresh cast: Portal Froggy + Greg-cartwheel up top, Greg-with-hearts + Greg-rocket
below, pineapple + hearts woven in (`public/hero/greg-cartwheel.png`,
`greg-hearts.png`, `froggy-portal.svg` added). The **nav logo is now a pixel
"ejt."** — `src/components/shared/PixelLogo.tsx`, a small particle wordmark that
idles static and runs the scatter physics only on hover; mounted in `Navbar.tsx`.
Hero section height is `calc(100svh-4rem)` to sit under the sticky nav.

**Update — Marimba nav + Faizan field + living whisp (Bart's refs):**
- **Floating nav** — `Navbar.tsx` is now a `fixed`, fully transparent header (no
  bg/border/blur → no seam between header and page; `pointer-events-none` so presses
  pass through to the whisp). Pixel "ejt." logo left; **`RightNav.tsx`** (new) is a
  floating right-side vertical nav (Home/Work/About/Contact) with **scroll-spy** via
  IntersectionObserver (`-45% 0px` band) that marks the in-view section by **bolding**
  it (700-weight mono — the underline was dropped per Bart). Hero is `min-h-[100svh]`.
- **Background** — lighter Faizan-style field: base `#ecebe4`, heavier grain
  (opacity 0.18), static pink washes removed (the whisp supplies the pink).
- **Living whisp** — `src/components/shared/Whisp.tsx` (new): a canvas blob that
  wanders with a fading tail and slow hue drift (~288–348°, pink↔purple), and chases
  the pointer while pressed (window `pointerdown`→follow, `pointerup`→wander). Sits
  at z3 (behind the cast + wordmark); respects `prefers-reduced-motion` (static blob).
  Greg-cartwheel is desktop-only now (the mobile nav owns the top-right corner).

**Update — fully bare Faizan-minimal + whisp retune (Bart):** the hero is now just
the **wordmark + living whisp + floating nav** on the grainy field — **no cutouts at
all**. Removed in two passes: the SVG cutouts (frog/pineapple/hearts), then the Greg
astronaut PNGs too; also the CTA buttons and the corner micro-labels. `public/hero/`
is now empty (all derivatives pruned; raw kit still in gitignored `/assets/` if cast
art is wanted again). Whisp retuned: slower drift, longer **dragging tail** (60-pt
trail, gentle falloff), lower opacity (~0.34), and an **amorphous** per-point squash
(±15%) so it stays roughly circular without going chaotic.

**Update — animated whisp DROPPED (Bart couldn't settle its design).** `Whisp.tsx`
removed entirely; replaced with a **soft static pink blotch** (Faizan-style) in the
`BLOTCHES` washes behind the wordmark. Nav active state is now **bold** (not the
underline). Wordmark made higher-res (1px sampling, smaller dots, bigger font in a
`max-w-4xl` / `56vh` box → reads as crisp text, ~80fps). **Current hero = grainy
`#ecebe4` field + static pink blotch + faint grid + two-tone wordmark + floating
nav.** The wordmark is now **big acid "WELCOME"** (comma dropped) with **"I'M ELLIE"
smaller (0.4x) and black, right-aligned under WELCOME's right edge** for contrast
(`HeroParticle` samples both lines into one canvas; per-particle color + radius).
(Whisp is recoverable from git history if its design ever clicks.)

**Still to do / deferred:** **motion** — a danilo-style scroll that clears the hero
into the quiet Work/About sections (install the Claude-in-Chrome plugin to study
danilo's motion live). Also deferred: theme toggle dropped from the floating nav
(re-add when needed); dark-mode tuning (bg + wordmark STOPS are light-only); and the
real Work/About/Contact section content + case studies.
