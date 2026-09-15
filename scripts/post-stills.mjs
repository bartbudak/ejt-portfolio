// Capture a still of each post's media for the folded card on a phone.
//
//   node scripts/post-stills.mjs <instagram shortcode | reddit url> ...
//
// Opens each post's own embed page in Playwright's Chromium, screenshots the
// largest picture or video on it, crops it square and writes
// public/posts/<code>.webp (a Reddit thread is keyed by its id). Not live,
// and does not need to be: the card opens the real embed on a tap.
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { execFileSync } from "node:child_process";

const targets = process.argv.slice(2);
mkdirSync("public/posts", { recursive: true });
const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 540, height: 1400 }, deviceScaleFactor: 2 });

for (const t of targets) {
  const reddit = /reddit\.com/.test(t);
  const key = reddit ? `reddit-${t.match(/comments\/([a-z0-9]+)/)?.[1]}` : t;
  const url = reddit
    ? t.replace(/^https?:\/\/(www\.|old\.)?reddit\.com/, "https://embed.reddit.com").replace(/\/?(\?.*)?$/, "/") +
      "?ref_source=embed&ref=share&embed=true&showmedia=true&theme=light"
    : `https://www.instagram.com/p/${t}/embed/`;
  const page = await context.newPage();
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForTimeout(6000);
    const box = await page.evaluate(() => {
      const els = [...document.querySelectorAll("img, video")]
        .map((e) => e.getBoundingClientRect())
        .filter((r) => r.width > 200 && r.height > 100 && r.y < 1400);
      els.sort((a, b) => b.width * b.height - a.width * a.height);
      const r = els[0];
      return r ? { x: Math.max(0, r.x), y: Math.max(0, r.y), width: Math.min(r.width, 540), height: Math.min(r.height, 1400 - Math.max(0, r.y)) } : null;
    });
    const png = `public/posts/${key}.png`;
    if (box) await page.screenshot({ path: png, clip: box });
    else await page.screenshot({ path: png, clip: { x: 0, y: 0, width: 540, height: 540 } });
    // square crop from the centre, 320px, for a 56px thumbnail at any DPR
    execFileSync("python3", ["-c", `
from PIL import Image
im=Image.open("${png}").convert("RGB"); w,h=im.size; s=min(w,h)
im.crop(((w-s)//2,(h-s)//2,(w-s)//2+s,(h-s)//2+s)).resize((320,320), Image.LANCZOS).save("public/posts/${key}.webp","WEBP",quality=82,method=6)
import os; os.remove("${png}")`]);
    console.log(key, box ? "ok" : "fallback");
  } catch (e) {
    console.log(key, "failed:", e.message.split("\n")[0].slice(0, 100));
  }
  await page.close();
}
await browser.close();
