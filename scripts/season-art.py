"""Stage the seasonal band artwork from Ellie's second Canva export.

    python3 scripts/season-art.py ~/Downloads/v.pdf

Page 2 of that PDF is the five seasonal bands, each a 1024 x 1728 Canva page
(three 16:9 pages stacked). This script:

  1. pulls every embedded image on page 2 out with its alpha mask (pdfimages),
  2. converts the page to SVG (pdftocairo) and walks it for the transform each
     image is drawn with — position, scale, rotation, Canva's flip and crop,
  3. names the ones we use, trims them to their alpha, caps each file at 2.5x
     its placed size, writes WebP into public/motifs/seasons/<band>/, and
     emits src/data/seasonArt.ts with the measured box for each.

Needs poppler (pdfimages, pdftocairo) and Pillow. Intermediates go in a work
dir (default: /tmp/season-art) so re-runs are quick.

Units in the output are the deck's: a 1024-wide canvas, y from the top of the
season's band. `rot` is degrees clockwise about the box's centre. `clip` is
[left, top, right, bottom] cut off the box where she cropped the element.
"""
import json, math, os, re, shutil, subprocess, sys
import xml.etree.ElementTree as ET
from collections import defaultdict, deque

from PIL import Image

PDF = sys.argv[1] if len(sys.argv) > 1 else os.path.expanduser("~/Downloads/v.pdf")
WORK = sys.argv[2] if len(sys.argv) > 2 else "/tmp/season-art"
REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PAGE = 2
BANDS = ["valentines", "spring", "summer", "fall", "holiday", "dcc"]
BAND_H = 1728

# (band, pdfimages index) -> (name, kind). kind "art" = flat line art, saved
# lossless; "photo" = product render or photograph, saved lossy.
NAMES = {
    ("valentines", 0): ("rose-spray", "art"),
    ("valentines", 2): ("maeve-books", "art"),
    ("valentines", 4): ("ribbon", "art"),
    ("valentines", 6): ("bar-pb-banana-affair", "photo"),
    ("valentines", 8): ("bar-heat-and-honey", "photo"),
    ("valentines", 10): ("bar-forbidden-fruits", "photo"),
    ("valentines", 12): ("box-bonbons-of-desire", "photo"),
    ("valentines", 14): ("card-bee-mine", "photo"),
    ("valentines", 15): ("card-i-pick-you", "photo"),
    ("valentines", 16): ("card-nuts-bananas", "photo"),
    ("valentines", 21): ("heart-box", "photo"),
    ("valentines", 23): ("heart-my-girlfriend", "art"),
    ("valentines", 25): ("heart-mlady", "art"),
    ("valentines", 38): ("heart-ethically-sourced", "art"),
    ("spring", 42): ("flower", "art"),
    ("spring", 44): ("flower", "art"),
    ("spring", 46): ("flower", "art"),
    ("spring", 40): ("flower-border", "art"),
    ("spring", 50): ("blossom", "art"),
    ("spring", 52): ("bar-dirt-pile", "photo"),
    ("spring", 54): ("bar-mint-green-thumb", "photo"),
    ("spring", 56): ("bar-cherry-bomb", "photo"),
    ("spring", 58): ("spring-mix", "art"),
    ("spring", 60): ("box-spring-mix", "photo"),
    ("spring", 62): ("mirror", "photo"),
    ("spring", 68): ("photo-garden-trio", "photo"),
    ("spring", 67): ("photo-garden-basket", "photo"),
    ("spring", 73): ("photo-garden-cake", "photo"),
    ("spring", 74): ("nice-day", "art"),
    ("summer", 76): ("coaster", "art"),
    ("summer", 78): ("star-green", "art"),
    ("summer", 80): ("photo-sky", "photo"),
    ("summer", 81): ("box-summer-medley", "photo"),
    ("summer", 83): ("marquee", "art"),
    ("summer", 85): ("star-cream", "art"),
    ("summer", 87): ("bar-kettle-chips", "photo"),
    ("summer", 89): ("bar-funnel-cake", "photo"),
    ("summer", 91): ("bar-lemon-twister", "photo"),
    ("summer", 97): ("star-yellow", "art"),
    ("summer", 99): ("fair-food", "art"),
    ("summer", 101): ("flags-left", "art"),
    ("summer", 107): ("flags-right", "art"),
    ("summer", 112): ("booth", "art"),
    ("summer", 105): ("booth", "art"),
    ("summer", 111): ("photo-market", "photo"),
    ("fall", 114): ("apples", "art"),
    ("fall", 116): ("leaves", "art"),
    ("fall", 118): ("lady-right", "art"),
    ("fall", 120): ("lady-left", "art"),
    ("fall", 122): ("box-harvest-bounty", "photo"),
    ("fall", 124): ("wood-frame", "art"),
    ("fall", 126): ("bar-pumpkin-spice-chai", "photo"),
    ("fall", 128): ("bar-maple-bourbon", "photo"),
    ("fall", 130): ("bar-apple-cider-donuts", "photo"),
    ("holiday", 150): ("skewers-left", "art"),
    ("holiday", 152): ("skewers-right", "art"),
    ("holiday", 154): ("reindeer", "art"),
    ("holiday", 156): ("trailer", "photo"),
    ("holiday", 158): ("bar-candy-cane", "photo"),
    ("holiday", 160): ("bar-cozy-cannoli", "photo"),
    ("holiday", 162): ("bar-creme-brulee", "photo"),
    ("holiday", 164): ("snow", "art"),
    ("holiday", 166): ("box-house", "photo"),
    ("holiday", 172): ("rope", "art"),
    ("holiday", 174): ("bird", "art"),
    ("holiday", 176): ("box-a-frame", "photo"),
    ("holiday", 178): ("lady-lights", "art"),
    ("holiday", 180): ("box-orange", "photo"),
    ("holiday", 182): ("garland", "art"),
    ("holiday", 192): ("frog", "art"),
    # Dungeon Crawler Carl (the Collaborations page). The stone border is one
    # tall strip drawn up the sides and, turned, along the top and bottom; the
    # narrower side strips she also used are skipped in favour of it.
    ("dcc", 198): ("stone-v", "art"),
    ("dcc", 202): ("stone-h", "art"),
    ("dcc", 204): ("donut", "art"),
    ("dcc", 206): ("photo-dungeon", "photo"),
    ("dcc", 207): ("photo-book", "photo"),
    ("dcc", 224): ("website", "photo"),
    ("dcc", 233): ("skull", "art"),
    ("dcc", 235): ("eye", "art"),
}

# Crops Canva applied that the seam rule below would otherwise wave through.
HAND_CLIPS = {
    # The sign's crown is hidden so the coaster reads through it; the cut lands
    # exactly on a page seam.
    ("summer", "fair-food"): [264, 577, 725, 700],
    # The mirrored pair of flags carries the same crop as the left pair.
    ("summer", "flags-right"): [758, 1215, 1024, 1332],
}


def run(*cmd):
    subprocess.run(cmd, check=True)


# 1. extract images + masks -----------------------------------------------------
img_dir = os.path.join(WORK, "img")
if not os.path.exists(os.path.join(img_dir, "list.txt")):
    os.makedirs(img_dir, exist_ok=True)
    run("pdfimages", "-png", "-f", str(PAGE), "-l", str(PAGE), PDF, os.path.join(img_dir, "im"))
    with open(os.path.join(img_dir, "list.txt"), "w") as f:
        subprocess.run(["pdfimages", "-list", "-f", str(PAGE), "-l", str(PAGE), PDF], check=True, stdout=f)
rows = [l.split() for l in open(os.path.join(img_dir, "list.txt")).read().splitlines()[2:]]
pimgs = []  # (index, w, h, smask index or None)
i = 0
while i < len(rows):
    r = rows[i]
    if r[2] == "image":
        mask = rows[i + 1] if i + 1 < len(rows) and rows[i + 1][2] == "smask" else None
        pimgs.append((int(r[1]), int(r[3]), int(r[4]), int(mask[1]) if mask else None))
        i += 2 if mask else 1
    else:
        i += 1


def alpha_image(idx):
    for n, w, h, m in pimgs:
        if n == idx:
            im = Image.open(os.path.join(img_dir, f"im-{n:03d}.png")).convert("RGBA")
            if m is not None:
                mk = Image.open(os.path.join(img_dir, f"im-{m:03d}.png")).convert("L")
                im.putalpha(mk.resize(im.size) if mk.size != im.size else mk)
            return im
    raise KeyError(idx)


# 2. where each image is drawn -----------------------------------------------------
svg_path = os.path.join(WORK, f"page{PAGE}.svg")
if not os.path.exists(svg_path):
    run("pdftocairo", "-svg", "-f", str(PAGE), "-l", str(PAGE), PDF, svg_path)
SVG = "{http://www.w3.org/2000/svg}"
XL = "{http://www.w3.org/1999/xlink}href"
root = ET.parse(svg_path).getroot()
byid = {el.get("id"): el for el in root.iter() if el.get("id")}
sources = {im.get("id"): (float(im.get("width")), float(im.get("height"))) for im in root.iter(SVG + "image")}
clips = {}
for cp in root.iter(SVG + "clipPath"):
    nums = []
    for ch in cp:
        if ch.get("d"):
            nums += [float(v) for v in re.findall(r"-?\d+\.?\d*", ch.get("d"))]
        elif ch.tag == SVG + "rect":
            x, y, w, h = [float(ch.get(k, 0)) for k in ("x", "y", "width", "height")]
            nums += [x, y, x + w, y + h]
    if nums:
        clips[cp.get("id")] = (min(nums[0::2]), min(nums[1::2]), max(nums[0::2]), max(nums[1::2]))


def mat(s):
    m = re.match(r"matrix\(([^)]*)\)", s or "")
    return [float(v) for v in m.group(1).replace(",", " ").split()] if m else [1, 0, 0, 1, 0, 0]


def mul(A, B):
    a, b, c, d, e, f = A
    a2, b2, c2, d2, e2, f2 = B
    return [a * a2 + c * b2, b * a2 + d * b2, a * c2 + c * d2, b * c2 + d * d2, a * e2 + c * f2 + e, b * e2 + d * f2 + f]


draws = []


def walk(el, T, clip, in_mask, depth=0):
    tag = el.tag.split("}")[1]
    if tag == "mask":
        in_mask = True
    T2 = mul(T, mat(el.get("transform"))) if el.get("transform") else T
    cp = el.get("clip-path")
    if cp:
        c = clips.get(re.search(r"#([^)]+)", cp).group(1))
        if c:
            clip = c if clip is None else (max(clip[0], c[0]), max(clip[1], c[1]), min(clip[2], c[2]), min(clip[3], c[3]))
    if tag == "use" and not in_mask:
        ref = (el.get(XL) or "").lstrip("#")
        if ref in sources:
            draws.append((sources[ref], T2, clip))
        elif ref in byid and depth < 20:
            # cairo wraps flipped images in a surface group and references it
            walk(byid[ref], T2, clip, in_mask, depth + 1)
            return
    if tag == "defs":
        return
    for ch in el:
        walk(ch, T2, clip, in_mask, depth)


walk(root, [1, 0, 0, 1, 0, 0], None, False)

# pair each draw with its pdfimages entry: same pixel size, in stream order
queue = defaultdict(deque)
for n, w, h, _ in pimgs:
    queue[(w, h)].append(n)
placed = []
for (w, h), T, clip in draws:
    idx = queue[(int(w), int(h))].popleft() if queue[(int(w), int(h))] else None
    a, b, c, d, e, f = T
    cx, cy = a * w / 2 + c * h / 2 + e, b * w / 2 + d * h / 2 + f
    band = BANDS[min(5, int(cy // BAND_H))]
    placed.append(dict(pdf=idx, band=band, w=w, h=h, T=T, clip=clip, cx=cx, cy=cy - BANDS.index(band) * BAND_H))

# 3. stage -----------------------------------------------------------------------
elements = []
for d in placed:
    key = (d["band"], d["pdf"])
    if key not in NAMES:
        continue
    name, kind = NAMES[key]
    # the same element drawn twice within a few px = split across a page seam
    dup = next((e for e in elements if e["band"] == d["band"] and e["name"] == name and abs(e["cx"] - d["cx"]) < 6 and abs(e["cy"] - d["cy"]) < 6), None)
    if dup:
        if d["clip"] and dup["clip"]:
            c, n = dup["clip"], d["clip"]
            dup["clip"] = (min(c[0], n[0]), min(c[1], n[1]), max(c[2], n[2]), max(c[3], n[3]))
        elif not d["clip"]:
            dup["clip"] = None
        continue
    elements.append(dict(d, name=name, kind=kind))

# Wholly generated: anything hand-added here is lost on the next run. Hand-drawn
# extras (the Holiday frogs) live one level up in public/motifs/.
out_dir = os.path.join(REPO, "public", "motifs", "seasons")
shutil.rmtree(out_dir, ignore_errors=True)
written = {}
layers = defaultdict(list)


def seam(v):
    return any(abs(v - s) < 4 for s in (0, 576, 1152, 1728, 578, 1154, 1730))


for e in elements:
    band, name = e["band"], e["name"]
    im = alpha_image(e["pdf"])
    a, b, c, d_, tx, ty = e["T"]
    sx, sy = math.hypot(a, b), math.hypot(c, d_)
    rot = math.degrees(math.atan2(b, a))
    flip = a * d_ - b * c < 0
    bi = BANDS.index(band)
    u0, v0, u1, v1 = im.getbbox() or (0, 0, im.width, im.height)
    uc, vc = (u0 + u1) / 2, (v0 + v1) / 2
    cx = a * uc + c * vc + tx
    cy = b * uc + d_ * vc + ty - bi * BAND_H
    W, H = (u1 - u0) * sx, (v1 - v0) * sy
    art = im.crop((u0, v0, u1, v1))
    clip = list(e["clip"]) if e["clip"] else None
    if clip:
        clip = [clip[0], clip[1] - bi * BAND_H, clip[2], clip[3] - bi * BAND_H]
    if flip:
        # Canva's "flip horizontal": mirror the file; what is left of the
        # rotation is the x-axis angle less a half turn.
        art = art.transpose(Image.FLIP_LEFT_RIGHT)
        rot = ((rot - 180) + 180) % 360 - 180
        clip = None  # the clip came through the group's own space; not usable
    shared = sum(1 for v in NAMES.values() if v[0] == name) > 1
    if abs(abs(rot) - 90) < 1 and not shared:
        # a quarter turn is baked into the file so the layer stays upright —
        # unless the file is shared by several placements, which keep it as CSS
        art = art.rotate(90 if rot < 0 else -90, expand=True)
        W, H = H, W
        rot = 0
    if (band, name) in HAND_CLIPS:
        clip = HAND_CLIPS[(band, name)]
    # cap at 2.5x the placed size: a deck unit is ~1.1 css px at the panel's
    # widest, times two for retina
    tw, th = art.size
    scale = min(1.0, W * 2.5 / tw, H * 2.5 / th)
    if scale < 1:
        art = art.resize((max(1, round(tw * scale)), max(1, round(th * scale))), Image.LANCZOS)
    fname = f"{band}/{name}.webp"
    if fname not in written:
        os.makedirs(os.path.join(out_dir, band), exist_ok=True)
        if e["kind"] == "art":
            art.save(os.path.join(out_dir, fname), "WEBP", lossless=True, quality=100, method=6)
        else:
            art.save(os.path.join(out_dir, fname), "WEBP", quality=90, method=6)
        written[fname] = art.size
    # a crop is a clip edge that cuts into the trimmed content, unless it is just
    # the canvas edge or a page seam (the panel's own overflow does those)
    inset = None
    if clip and abs(rot) < 0.5:
        x0, y0, x1, y1 = cx - W / 2, cy - H / 2, cx + W / 2, cy + H / 2
        k0, k1, k2, k3 = clip
        ins = [max(0, k0 - x0), max(0, k1 - y0), max(0, x1 - k2), max(0, y1 - k3)]
        hand = (band, name) in HAND_CLIPS
        if k0 <= 0.5: ins[0] = 0
        if k2 >= 1023.5: ins[2] = 0
        if k1 <= 0.5 or (seam(k1) and not hand): ins[1] = 0
        if k3 >= BAND_H - 0.5 or (seam(k3) and not hand): ins[3] = 0
        ins = [v if v >= 5 else 0 for v in ins]
        if max(ins) > 0:
            inset = [round(v, 1) for v in ins]
    layers[band].append(dict(
        name=name, src=f"/motifs/seasons/{fname}", px=list(written[fname]),
        x=round(cx - W / 2, 1), y=round(cy - H / 2, 1), w=round(W, 1), h=round(H, 1),
        rot=round(rot, 2) if abs(rot) > 0.05 else 0, clip=inset,
    ))

# 4. emit ---------------------------------------------------------------------------
lines = [
    "// GENERATED by scripts/season-art.py — do not edit by hand.",
    "//",
    "// Every piece of artwork on the five seasonal bands and the Dungeon Crawler",
    "// Carl band of Ellie's second Canva export (Downloads/v.pdf, page 2), with",
    "// the exact box Canva placed it in.",
    "// Units are the deck's: a 1024-wide canvas, y measured from the top of that",
    "// season's band (each band is 1024 x 1728). `rot` is degrees clockwise about",
    "// the box's centre; `clip` is [left, top, right, bottom] cut off the box, in",
    "// the same units, where she cropped an element rather than placed it whole.",
    "// Files are trimmed to their alpha and capped at 2.5x their placed size.",
    "",
    'import type { ArtLayer } from "./seasonScenes";',
    "",
]
for band in BANDS:
    lines.append(f"export const {band}Art: ArtLayer[] = [")
    for l in layers[band]:
        if l["name"] == "ribbon":
            continue
        parts = [f'name: "{l["name"]}"', f'src: "{l["src"]}"', f"px: [{l['px'][0]}, {l['px'][1]}]", f"x: {l['x']}", f"y: {l['y']}", f"w: {l['w']}", f"h: {l['h']}"]
        if l["rot"]:
            parts.append(f"rot: {l['rot']}")
        if l["clip"]:
            parts.append(f"clip: [{', '.join(str(v) for v in l['clip'])}]")
        lines.append("  { " + ", ".join(parts) + " },")
    lines.append("];\n")
ribbon = next(l for l in layers["valentines"] if l["name"] == "ribbon")
# The book's binding, as a tile: a slice of the ribbon file from below the
# purple bookmark, where it is only vertical lines, so it repeats without a seam
# and the bookmark is drawn once at the top rather than at every repeat.
rib = Image.open(os.path.join(out_dir, "valentines", "ribbon.webp"))
tile = rib.crop((0, int(rib.height * 0.52), rib.width, int(rib.height * 0.66)))
tile.save(os.path.join(out_dir, "valentines", "ribbon-tile.webp"), "WEBP", lossless=True, quality=100, method=6)
lines.append("/** The bookmark ribbon down the Valentine's band's left edge, drawn once at")
lines.append(f" *  the top, {ribbon['w']} deck units wide; `tile` is its binding, repeated below it. */")
lines.append(f'export const valentinesRibbon = {{ src: "{ribbon["src"]}", tile: "/motifs/seasons/valentines/ribbon-tile.webp", px: [{ribbon["px"][0]}, {ribbon["px"][1]}] as [number, number], w: {ribbon["w"]}, h: {ribbon["h"]} }};')
# The DCC stone border: her narrow side strip, square blocks at both ends, as
# one asset. Where each copy goes is composed by hand in seasonScenes.ts.
strip = alpha_image(200)
strip = strip.crop(strip.getbbox())
strip.save(os.path.join(out_dir, "dcc", "stone-strip.webp"), "WEBP", lossless=True, quality=100, method=6)
# the gaps between its bricks, top to bottom, as [start, end] in deck units at
# width 51 — the band chains copies of the strip and only ever cuts on a gap
sw, sh = strip.size
unit = 51 / sw
# a boundary is where the light fill stops: a transparent gap or two outlines
# meeting (the bottom two bricks touch, so alpha alone misses that seam)
px = strip.load()
def fill_frac(y):
    n = 0
    for x in range(sw):
        r, g, b, a = px[x, y]
        if a > 128 and b > 150 and b > r + 20:
            n += 1
    return n / sw
fills = [fill_frac(y) for y in range(sh)]
gaps, run = [], None
for y, f in enumerate(fills + [1.0]):
    if f < 0.3 and run is None:
        run = y
    elif f >= 0.3 and run is not None:
        if run > 0 and y < sh:  # not the strip's own edges
            gaps.append((round(run * unit, 1), round(y * unit, 1)))
        run = None
lines.append("/** Her narrow stone strip, square bricks at both ends: its width on the")
lines.append(" *  canvas, the height that gives it, and the gaps between its bricks from")
lines.append(" *  the top, in the same units. The first gap follows the top square brick")
lines.append(" *  and the last precedes the bottom one. */")
lines.append("export const dccStoneStrip = {")
lines.append('  src: "/motifs/seasons/dcc/stone-strip.webp",')
lines.append(f"  px: [{sw}, {sh}] as [number, number],")
lines.append("  w: 51,")
lines.append(f"  h: {round(sh * unit, 1)},")
lines.append("  gaps: [" + ", ".join(f"[{a}, {b}]" for a, b in gaps) + "] as [number, number][],")
lines.append("};")
# the same strip with both square bricks cut off and turned on its side, for
# the runs along the top and bottom; its gaps run left to right
cut0, cut1 = round(gaps[0][1] / unit), round(gaps[-1][0] / unit)
run = strip.crop((0, cut0, sw, cut1)).rotate(90, expand=True)
run.save(os.path.join(out_dir, "dcc", "stone-run.webp"), "WEBP", lossless=True, quality=100, method=6)
run_gaps = [(round(a - gaps[0][1], 1), round(b - gaps[0][1], 1)) for a, b in gaps[1:-1]]
lines.append("/** The same strip with both square bricks cut off and turned on its side,")
lines.append(" *  for the runs along the top and bottom: its length on the canvas at the")
lines.append(" *  strip's width, and the gaps between its bricks from the left. */")
lines.append("export const dccStoneRun = {")
lines.append('  src: "/motifs/seasons/dcc/stone-run.webp",')
lines.append(f"  px: [{run.width}, {run.height}] as [number, number],")
lines.append("  w: 51,")
lines.append(f"  len: {round((cut1 - cut0) * unit, 1)},")
lines.append("  gaps: [" + ", ".join(f"[{a}, {b}]" for a, b in run_gaps) + "] as [number, number][],")
lines.append("};")

with open(os.path.join(REPO, "src", "data", "seasonArt.ts"), "w") as f:
    f.write("\n".join(lines) + "\n")

n = sum(len(v) for v in layers.values())
size = sum(os.path.getsize(os.path.join(d, f)) for d, _, fs in os.walk(out_dir) for f in fs)
print(f"{n} placements, {len(written)} files, {size / 1e6:.1f} MB -> {out_dir}")
missing = [k for k in NAMES if not any(e["band"] == k[0] and e["pdf"] == k[1] for e in elements)]
if missing:
    print("named but not found:", missing)
