# Assets

Ellie's MAEVE drop lives at `assets/maeve/` — **274 entries, 1.6 GB** — filed by the
site section that will consume it. Every filename is slugified (lowercase, kebab-case,
no spaces, emoji or export UUIDs), so paths are safe to use verbatim.

**Source of truth is `~/Downloads/MAEVE`,** not the iCloud copy. The iCloud folder was
still syncing every file over ~8 MB on the first pass, which silently hid 50 entries —
including the brand guidelines, the whole Spring shoot, all the video, and two of the
four Ellie portraits. Rebuild with the organizer rather than copying by hand.

`/assets/` is gitignored (same rule that keeps the 8 GB brand kit out). Export optimized
derivatives into `public/` once Ellie picks the selects.

Copy source of truth: `assets/maeve/docs/ellie-thompson-portfolio-copy.md` — hers,
section by section, with `[ELLIE TO REVIEW]` flags. **Where it and the Canva deck
disagree with `HANDOFF.md`, they win** (Bart, 2026-09-04).

## Layout

```
assets/maeve/
  ellie/              4 portraits + ellie-choc.mp4 + blackberry video
    cutouts/          transparent PNGs lifted from the Canva deck (see below)
    origin/           Peru
  rebrand/
    before/           old Seattle Chocolate line — the "before" half
    everyday/         everyday bars, sketches → world building → press check
    world/            world map, banner, brand drawing
  seasonal/
    valentines/       81 items, incl. the DSC* 2026 studio shoot
    spring/  summer/  fall/  holiday/
  collabs/            dcc · talea · pax-west · books-are-magic ·
                      my-straight-friends · influencer
  launch/             outdoor · retail · store · press · tradeshow · merch
  recognition/        Dieline award stage shots + video
  elements/           transparent cutouts; characters/ = Greg poses
  docs/               brand guidelines, copy deck, shot list, zines
  _unsorted/          pride.mp4 — her copy doc flags it as unplaced
```

## Cut-outs of Ellie

**There is no transparent cut-out of Ellie in the MAEVE folder** — only flat photos.
Canva did the knockout inside the deck, so the cut-outs were extracted from
`Ellie Thompson Portfolio.pdf` instead and saved to `ellie/cutouts/`:

| File | Source | Notes |
| --- | --- | --- |
| `ellie-hero-cutout.png` | deck p1 | 1033×1549, real alpha (58% clear, feathered edge). The deck's hero image. |
| `ellie-astronaut-cutout.png` | deck p1 | 1053×1520, confetti/space-suit shot from "Hi There!" |

The un-knocked-out original of the hero shot is `ellie/ellie-face-headshot.jpg`
(shot on flat pink). `ellie/ellie-headshot.jpg` is the clean professional portrait —
yellow blazer on cyan.

## Matched before/after pairs

One clean pair for a side-by-side or wipe — same flavour, same front-on framing:

| Before | After |
| --- | --- |
| `rebrand/before/meltaway-mint-bar.jpg` | `rebrand/everyday/maeve-magicalmintfront-transp-091824.png` |

`rebrand/before/old-scc-products.jpg` and `old-scc-bars.jpg` are styled group shots with
no Maeve equivalent. More pairs need a shoot or matched crops.

## Known gaps

- **Fall's brief is blank** in the deck — Theme and Flavor Strategy are empty headings.
  Fall has 18 image assets and no story.
- **Fourth Wing** — no assets, though the copy leans on it as proof the DCC playbook repeats.
- **Origin trips** — still one Peru photo for the section meant to differentiate her.
- **Website captures** from the View Source build; the Webby is for the site.
- **Webby level** (Winner / Nominee / People's Voice) still unconfirmed.
- **Video is heavy** — `press-king-5.mov` is 134 MB and `everyday-bar-launch.mov` is
  191 MB. Transcode to web MP4/WebM before anything ships.
