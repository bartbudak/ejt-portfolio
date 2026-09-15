// Screenshot a page at phone size in WebKit (what every iPhone browser runs,
// Chrome included) or Chromium, past the preview gate.
//
//   node scripts/shoot.mjs <url> <webkit|chromium> <outDir> [selector ...]
//
// Writes <engine>-top.png, one <engine>-<n>.png per selector scrolled to the
// top of the viewport, and <engine>-full.png. Device is the iPhone 16 Pro
// profile; pass DEVICE=... to change it, or DEVICE=desktop for a 1280-wide
// window. Needs the dev server up.
import { chromium, webkit, devices } from "playwright";
import { mkdirSync } from "node:fs";

const [url, engineName = "webkit", outDir = "shots", ...selectors] =
  process.argv.slice(2);
const engine = engineName === "chromium" ? chromium : webkit;
// DEVICE=desktop for a 1280-wide window instead of a phone profile.
const device =
  process.env.DEVICE === "desktop"
    ? { viewport: { width: Number(process.env.WIDTH ?? 1280), height: 900 } }
    : devices[process.env.DEVICE ?? "iPhone 16 Pro"];
mkdirSync(outDir, { recursive: true });

const browser = await engine.launch();
const context = await browser.newContext({ ...device });
await context.addInitScript(() => {
  // The preview gate's own token — the salted hash of the password.
  localStorage.setItem(
    "ejt-preview-unlocked",
    "2492638b0557142a5f0bb50658d2c61db5895685b4f2c1fc62b8e0549c92b300",
  );
});
const page = await context.newPage();
// Anything the page complains about, once each, so a phone-only error does
// not go unseen just because no phone is plugged in.
const seen = new Set();
page.on("console", (m) => {
  if ((m.type() === "error" || m.type() === "warning") && !seen.has(m.text())) {
    seen.add(m.text());
    console.log(`[${m.type()}] ${m.text().slice(0, 300)}`);
  }
});
page.on("pageerror", (e) =>
  console.log(`[pageerror] ${e.message.slice(0, 300)}`),
);
await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(2500);
await page.screenshot({ path: `${outDir}/${engineName}-top.png` });
let n = 0;
for (const sel of selectors) {
  n += 1;
  await page.evaluate((s) => {
    const el = document.querySelector(s);
    if (el)
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - 80,
      });
  }, sel);
  await page.waitForTimeout(1200);
  const headerTop = await page.evaluate(() =>
    Math.round(
      document.querySelector("header")?.getBoundingClientRect().top ?? -1,
    ),
  );
  if (headerTop !== 0)
    console.log(`header top after scrolling to ${sel}: ${headerTop}px`);
  await page.screenshot({ path: `${outDir}/${engineName}-${n}.png` });
}
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(500);
await page.screenshot({
  path: `${outDir}/${engineName}-full.png`,
  fullPage: true,
});
await browser.close();
console.log(`${engineName}: ${2 + n} shots in ${outDir}`);
