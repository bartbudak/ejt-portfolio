# ejt-portfolio

Portfolio site for **Ellie J. Thompson** — [elliejthompson.com](https://elliejthompson.com).

Scaffolded from `bb-portfolio`: Next.js 16 (static export) · pnpm · shadcn/ui ·
Tailwind v4 · Firebase Hosting.

> ⚠️ This is the **scaffold**. Copy is placeholder; the real sections and visual
> design land after the content Q&A. Search the source for `TODO` and
> `PLACEHOLDER` to find what still needs filling in.

## Getting started

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

## Project shape

- `src/lib/site.ts` — single source of truth for name, role, URL, email, nav,
  and social links. **Start here.**
- `src/app/` — routes, metadata, manifest, sitemap, robots, global theme.
- `src/components/sections/` — `Hero`, `Work`, `About`, `Contact` (placeholders).
- `src/components/layout/` — `Navbar`, `Footer`.
- `src/components/ui/` — shadcn primitives.
- `functions/` — Firebase Function that emails contact-form submissions.

## Before first deploy — setup checklist

1. **Create a Firebase project** (suggested id `ejt-folio`).
2. Update the project id in `.firebaserc` and the config in `src/lib/firebase.ts`.
3. Fill real values into `.env.local` (Firebase web app config).
4. Set the contact-form recipient in `functions/index.js` (`FROM_EMAIL` /
   `TO_EMAIL`) and add the Gmail secret:
   `firebase functions:secrets:set GMAIL_APP_PASSWORD`
5. Add the custom domain `elliejthompson.com` in Firebase Hosting.

## Deploy

Same flow as `bb-portfolio`:

```bash
pnpm build                     # static export to ./out
firebase deploy --only hosting # or: pnpm deploy
```

`pnpm deploy:preview` pushes a temporary preview channel.
