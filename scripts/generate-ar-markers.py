#!/usr/bin/env python3
"""Generate printable Encantar.js-friendly AR markers into public/markers/.

Run from repo root:
  python3 scripts/generate-ar-markers.py
"""

from __future__ import annotations

import math
import random
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "markers"
SIZE = 1400


def font(size: int, bold: bool = False) -> ImageFont.ImageFont:
    candidates = [
        (
            "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
            if bold
            else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
        ),
        (
            "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf"
            if bold
            else "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf"
        ),
    ]
    for path in candidates:
        try:
            return ImageFont.truetype(path, size)
        except OSError:
            continue
    return ImageFont.load_default()


def new_canvas(bg=(255, 255, 255)):
    img = Image.new("RGB", (SIZE, SIZE), bg)
    return img, ImageDraw.Draw(img)


def rect(draw, x0, y0, x1, y1, **kw):
    draw.rectangle([min(x0, x1), min(y0, y1), max(x0, x1), max(y0, y1)], **kw)


def text_size(draw: ImageDraw.ImageDraw, text: str, fnt: ImageFont.ImageFont):
    box = draw.textbbox((0, 0), text, font=fnt)
    return box[2] - box[0], box[3] - box[1]


def frame(draw, label: str, code: str, accent=(20, 20, 20)):
    """Outer border, corner marks, and a roomy footer so labels never collide."""
    draw.rectangle([12, 12, SIZE - 13, SIZE - 13], outline=accent, width=8)
    draw.rectangle([28, 28, SIZE - 29, SIZE - 29], outline=(40, 40, 40), width=2)
    for x, y, dx, dy in [
        (40, 40, 1, 1),
        (SIZE - 40, 40, -1, 1),
        (40, SIZE - 40, 1, -1),
        (SIZE - 40, SIZE - 40, -1, -1),
    ]:
        rect(draw, x, y, x + dx * 48, y + dy * 12, fill=accent)
        rect(draw, x, y, x + dx * 12, y + dy * 48, fill=accent)

    # Footer band tall enough for title + code + WVSU with clear gaps
    band_top = SIZE - 168
    band_bottom = SIZE - 36
    pad_x = 56
    draw.rectangle(
        [40, band_top, SIZE - 40, band_bottom],
        fill=(245, 245, 245),
        outline=accent,
        width=2,
    )

    title_font = font(28, bold=True)
    code_font = font(20)
    footer_font = font(20, bold=True)

    # Shrink title if it would crowd the WVSU badge on the right
    max_title_w = SIZE - pad_x - 200
    title = label
    while text_size(draw, title, title_font)[0] > max_title_w and len(title) > 12:
        title = title[:-2].rstrip(" ·-") + "…"

    title_h = text_size(draw, title, title_font)[1]
    code_h = text_size(draw, code, code_font)[1]
    gap = 10
    # Vertical stack: title, then code, evenly padded inside band
    content_h = title_h + gap + code_h
    y0 = band_top + max(14, (band_bottom - band_top - content_h) // 2)

    draw.text((pad_x, y0), title, fill=accent, font=title_font)
    draw.text((pad_x, y0 + title_h + gap), code, fill=(70, 70, 70), font=code_font)

    # WVSU footer badge — right side, vertically centered in band
    badge = "WVSU"
    bw, bh = text_size(draw, badge, footer_font)
    badge_pad_x, badge_pad_y = 14, 8
    bx1 = SIZE - 56
    bx0 = bx1 - bw - badge_pad_x * 2
    by0 = band_top + (band_bottom - band_top - bh - badge_pad_y * 2) // 2
    by1 = by0 + bh + badge_pad_y * 2
    draw.rounded_rectangle(
        [bx0, by0, bx1, by1],
        radius=8,
        fill=(20, 20, 20),
        outline=(20, 20, 20),
    )
    draw.text(
        (bx0 + badge_pad_x, by0 + badge_pad_y - 1),
        badge,
        fill=(255, 255, 255),
        font=footer_font,
    )


def hash_noise(draw, seed, box, density=180, color=(30, 30, 30)):
    rng = random.Random(seed)
    x0, y0, x1, y1 = box
    for _ in range(density):
        x = rng.randint(x0, x1)
        y = rng.randint(y0, y1)
        r = rng.randint(1, 4)
        if rng.random() < 0.5:
            draw.ellipse([x - r, y - r, x + r, y + r], fill=color)
        else:
            draw.line(
                [x, y, x + rng.randint(-12, 12), y + rng.randint(-12, 12)],
                fill=color,
                width=1,
            )


def draw_veins(draw, cx, cy, length, angle, depth, color=(25, 90, 40)):
    if depth <= 0 or length < 18:
        return
    x2 = cx + length * math.cos(angle)
    y2 = cy + length * math.sin(angle)
    draw.line([cx, cy, x2, y2], fill=color, width=max(1, depth))
    draw_veins(draw, x2, y2, length * 0.62, angle - 0.55, depth - 1, color)
    draw_veins(draw, x2, y2, length * 0.55, angle + 0.7, depth - 1, color)


def plant_leaf():
    img, d = new_canvas()
    cx, cy = SIZE // 2, SIZE // 2 - 40
    pts = []
    for i in range(36):
        a = -math.pi / 2 + i * (2 * math.pi / 36)
        r = 280 + 90 * math.sin(3 * a) + 40 * math.cos(5 * a + 0.4)
        if i > 18:
            r *= 0.92
        pts.append((cx + r * math.cos(a) * 0.85, cy + r * math.sin(a) * 1.15))
    d.polygon(pts, fill=(198, 230, 170), outline=(20, 70, 30))
    d.line([cx, cy + 300, cx - 20, cy - 310], fill=(20, 70, 30), width=6)
    for i in range(9):
        t = i / 8
        x = cx - 20 * t
        y = cy + 300 - 610 * t
        side = 1 if i % 2 == 0 else -1
        draw_veins(d, x, y, 90 + 20 * (i % 3), -math.pi / 2 + side * 0.9, 4)
    ix, iy = 160, 180
    d.rounded_rectangle(
        [ix, iy, ix + 320, iy + 260],
        radius=16,
        fill=(255, 255, 255),
        outline=(20, 20, 20),
        width=3,
    )
    d.text((ix + 16, iy + 12), "Cross-section cue", fill=(20, 20, 20), font=font(22, True))
    d.rectangle([ix + 20, iy + 50, ix + 300, iy + 80], fill=(90, 160, 70))
    d.rectangle([ix + 20, iy + 80, ix + 300, iy + 150], fill=(60, 120, 50))
    for j in range(10):
        d.ellipse(
            [ix + 30 + j * 26, iy + 88, ix + 50 + j * 26, iy + 140],
            outline=(20, 60, 30),
            width=2,
        )
    d.rectangle([ix + 20, iy + 150, ix + 300, iy + 200], fill=(150, 200, 100))
    d.rectangle([ix + 20, iy + 200, ix + 300, iy + 230], fill=(220, 230, 180))
    d.text((ix + 20, iy + 232), "Palisade · spongy · epidermis", fill=(40, 40, 40), font=font(18))
    hash_noise(d, 11, [120, 420, 1280, 1100], density=120, color=(40, 90, 40))
    frame(d, "Plant 01 · Leaf (structure–function)", "scan-plant-parts · marker 1/4")
    img.save(OUT / "plant-01-leaf.png", optimize=True)


def plant_stem():
    img, d = new_canvas()
    cx, cy = SIZE // 2, SIZE // 2 - 30
    d.ellipse([cx - 340, cy - 340, cx + 340, cy + 340], fill=(235, 245, 220), outline=(20, 20, 20), width=5)
    d.ellipse([cx - 300, cy - 300, cx + 300, cy + 300], outline=(40, 90, 40), width=3)
    for i in range(14):
        a = i * (2 * math.pi / 14) + 0.2
        r = 210 + (i % 3) * 12
        bx = cx + r * math.cos(a)
        by = cy + r * math.sin(a)
        w = 28 + (i % 4) * 6
        h = 42 + (i % 3) * 8
        d.ellipse([bx - w, by - h, bx + w, by + h], fill=(90, 70, 40), outline=(20, 20, 20), width=2)
        d.ellipse(
            [bx - w * 0.55, by - h * 0.55, bx + w * 0.55, by + h * 0.55],
            fill=(200, 180, 120),
        )
    d.ellipse([cx - 90, cy - 90, cx + 90, cy + 90], fill=(250, 240, 200), outline=(80, 60, 30), width=2)
    d.text((cx - 40, cy - 12), "Pith", fill=(40, 30, 20), font=font(28, True))
    d.rounded_rectangle([90, 160, 420, 360], radius=14, fill=(255, 255, 255), outline=(20, 20, 20), width=3)
    d.text((110, 180), "Stem cross-section", fill=(20, 20, 20), font=font(24, True))
    d.text((110, 220), "• Vascular bundles", fill=(40, 40, 40), font=font(22))
    d.text((110, 255), "• Xylem (inner support)", fill=(40, 40, 40), font=font(22))
    d.text((110, 290), "• Phloem (outer transport)", fill=(40, 40, 40), font=font(22))
    d.text((110, 325), "Asymmetric bundle sizes", fill=(80, 80, 80), font=font(18))
    for i in range(48):
        a = i * (2 * math.pi / 48)
        r1, r2 = 320, 340 if i % 3 else 355
        d.line(
            [
                cx + r1 * math.cos(a),
                cy + r1 * math.sin(a),
                cx + r2 * math.cos(a),
                cy + r2 * math.sin(a),
            ],
            fill=(20, 20, 20),
            width=2,
        )
    frame(d, "Plant 02 · Stem vascular ring", "scan-plant-parts · marker 2/4")
    img.save(OUT / "plant-02-stem.png", optimize=True)


def plant_root():
    img, d = new_canvas()
    for y in range(120, 1180):
        t = (y - 120) / 1060
        c = int(240 - 40 * t)
        d.line([(80, y), (SIZE - 80, y)], fill=(c, max(c - 10, 0), max(c - 30, 0)))
    d.polygon([(700, 180), (760, 180), (820, 1000), (640, 1000)], fill=(150, 100, 50), outline=(40, 25, 10))
    for x, y, length, ang in [
        (720, 320, 180, 0.9),
        (740, 420, 220, -1.1),
        (750, 520, 160, 1.3),
        (760, 640, 250, -0.7),
        (770, 760, 190, 1.0),
        (780, 860, 140, -1.4),
    ]:
        x2 = x + length * math.cos(ang)
        y2 = y + length * math.sin(0.3 + abs(ang) * 0.2)
        d.line([x, y, x2, y2], fill=(120, 80, 40), width=10)
        rng = random.Random(int(x + y))
        for _ in range(18):
            d.line(
                [x2, y2, x2 + rng.randint(-30, 30), y2 + rng.randint(-20, 40)],
                fill=(90, 60, 30),
                width=1,
            )
    d.rounded_rectangle([100, 200, 520, 520], radius=14, fill=(255, 255, 255), outline=(20, 20, 20), width=3)
    d.text((120, 220), "Root zone cues", fill=(20, 20, 20), font=font(26, True))
    d.ellipse([160, 280, 280, 400], outline=(20, 20, 20), width=3)
    d.ellipse([190, 310, 250, 370], fill=(180, 140, 80))
    d.text((300, 300), "Root hair zone", fill=(40, 40, 40), font=font(22))
    d.text((300, 335), "↑ surface area", fill=(40, 40, 40), font=font(22))
    d.text((300, 370), "for water uptake", fill=(40, 40, 40), font=font(22))
    frame(d, "Plant 03 · Root & root hairs", "scan-plant-parts · marker 3/4")
    img.save(OUT / "plant-03-root.png", optimize=True)


def plant_flower():
    img, d = new_canvas((250, 245, 255))
    cx, cy = SIZE // 2, SIZE // 2 - 20
    for i in range(7):
        a = i * (2 * math.pi / 7) + 0.15
        pr = 220 + (i % 3) * 35
        px = cx + pr * 0.55 * math.cos(a)
        py = cy + pr * 0.55 * math.sin(a)
        w = 90 + (i % 4) * 18
        h = 160 + (i % 3) * 20
        pts = []
        for k in range(20):
            t = k * 2 * math.pi / 20
            lx, ly = w * math.cos(t), h * math.sin(t)
            pts.append((px + lx * math.cos(a) - ly * math.sin(a), py + lx * math.sin(a) + ly * math.cos(a)))
        col = [(230, 120, 160), (240, 150, 180), (210, 100, 140)][i % 3]
        d.polygon(pts, fill=col, outline=(80, 20, 40))
    d.ellipse([cx - 70, cy - 70, cx + 70, cy + 70], fill=(250, 220, 60), outline=(80, 60, 10), width=3)
    for i in range(12):
        a = i * (2 * math.pi / 12)
        d.line([cx, cy, cx + 50 * math.cos(a), cy + 50 * math.sin(a)], fill=(120, 80, 20), width=2)
    d.rounded_rectangle([90, 900, 700, 1120], radius=12, fill=(255, 255, 255), outline=(20, 20, 20), width=3)
    d.text((110, 920), "Flower structures to analyze", fill=(20, 20, 20), font=font(24, True))
    d.text((110, 965), "Petals · stamen · pistil · symmetry", fill=(40, 40, 40), font=font(22))
    d.ellipse([180, 280, 280, 400], fill=(70, 140, 60), outline=(20, 60, 20), width=2)
    frame(d, "Plant 04 · Flower structure", "scan-plant-parts · marker 4/4")
    img.save(OUT / "plant-04-flower.png", optimize=True)


def history_marker(idx, title, motif, seed, colors):
    img, d = new_canvas((250, 248, 240))
    rng = random.Random(seed)
    for i in range(8):
        d.line([100 + i * 150, 100, 100 + i * 150, 1180], fill=(210, 200, 180), width=1)
        d.line([100, 100 + i * 150, 1300, 100 + i * 150], fill=(210, 200, 180), width=1)
    pts = [
        (
            120 + i * 55 + rng.randint(-20, 20),
            200 + int(400 * math.sin(i / 3 + seed)) + rng.randint(-30, 30),
        )
        for i in range(20)
    ]
    d.line(pts, fill=colors[0], width=10)
    if motif == "plaza":
        d.ellipse([480, 420, 920, 860], outline=(20, 20, 20), width=6)
        d.ellipse([560, 500, 840, 780], outline=(20, 20, 20), width=3)
        for i in range(8):
            a = i * math.pi / 4
            d.line([700, 640, 700 + 200 * math.cos(a), 640 + 200 * math.sin(a)], fill=(40, 40, 40), width=3)
        d.rectangle([640, 580, 760, 700], fill=colors[1], outline=(20, 20, 20), width=3)
    elif motif == "bridge":
        d.arc([300, 500, 1100, 1000], 200, 340, fill=(20, 20, 20), width=8)
        for x in range(380, 1020, 80):
            d.line([x, 720, x, 900], fill=(60, 60, 60), width=3)
        d.polygon([(280, 900), (360, 720), (420, 900)], fill=colors[1], outline=(20, 20, 20))
        d.polygon([(980, 900), (1040, 720), (1120, 900)], fill=colors[1], outline=(20, 20, 20))
        d.rectangle([200, 880, 1200, 920], fill=(100, 140, 180))
    elif motif == "gate":
        d.rectangle([450, 380, 950, 1000], outline=(20, 20, 20), width=6)
        d.rectangle([520, 480, 880, 1000], fill=colors[1], outline=(20, 20, 20), width=3)
        d.polygon([(450, 380), (700, 220), (950, 380)], fill=colors[2], outline=(20, 20, 20), width=3)
        d.ellipse([640, 700, 760, 820], outline=(20, 20, 20), width=4)
        d.rectangle([680, 760, 720, 1000], fill=(20, 20, 20))
    else:
        for i, x in enumerate([320, 520, 720, 920]):
            h = 280 + (i * 37) % 120
            d.rectangle(
                [x, 900 - h, x + 140, 900],
                fill=colors[1] if i % 2 == 0 else colors[2],
                outline=(20, 20, 20),
                width=3,
            )
            d.polygon(
                [(x - 10, 900 - h), (x + 70, 900 - h - 60), (x + 150, 900 - h)],
                fill=(120, 40, 40),
                outline=(20, 20, 20),
            )
    cx, cy = 220, 220
    for i in range(8):
        a = i * math.pi / 4
        r = 60 if i % 2 == 0 else 35
        d.polygon(
            [
                (cx, cy),
                (cx + r * math.cos(a - 0.2), cy + r * math.sin(a - 0.2)),
                (cx + (r + 20) * math.cos(a), cy + (r + 20) * math.sin(a)),
                (cx + r * math.cos(a + 0.2), cy + r * math.sin(a + 0.2)),
            ],
            fill=(20, 20, 20) if i % 2 == 0 else (100, 100, 100),
        )
    d.rounded_rectangle([820, 140, 1280, 320], radius=12, fill=(255, 255, 255), outline=(20, 20, 20), width=3)
    d.text((840, 160), "Local History Spot", fill=(20, 20, 20), font=font(22, True))
    d.text((840, 200), title, fill=(20, 20, 20), font=font(32, True))
    d.text((840, 250), "Replace with faculty-verified", fill=(80, 80, 80), font=font(18))
    d.text((840, 275), "site notes before class use.", fill=(80, 80, 80), font=font(18))
    hash_noise(d, seed, [100, 100, 1300, 1180], density=80, color=(90, 80, 60))
    frame(d, f"History {idx:02d} · {title}", f"ar-local-history · marker {idx}/4")
    img.save(OUT / f"history-{idx:02d}-{motif}.png", optimize=True)


def art_marker(idx, title, seed):
    img, d = new_canvas((20, 20, 24))
    rng = random.Random(seed)
    for _ in range(18):
        x0, y0 = rng.randint(80, 900), rng.randint(80, 900)
        x1, y1 = x0 + rng.randint(120, 400), y0 + rng.randint(120, 400)
        col = (rng.randint(40, 255), rng.randint(40, 255), rng.randint(40, 255))
        r = rng.random()
        if r < 0.4:
            d.ellipse([x0, y0, x1, y1], fill=col, outline=(255, 255, 255), width=2)
        elif r < 0.7:
            d.rectangle([x0, y0, x1, y1], fill=col, outline=(255, 255, 255), width=2)
        else:
            d.polygon(
                [(rng.randint(x0, x1), rng.randint(y0, y1)) for _ in range(5)],
                fill=col,
                outline=(255, 255, 255),
            )
    for _ in range(40):
        d.line(
            [
                rng.randint(100, 1300),
                rng.randint(100, 1200),
                rng.randint(100, 1300),
                rng.randint(100, 1200),
            ],
            fill=(255, 255, 255),
            width=rng.randint(1, 4),
        )
    d.rounded_rectangle([80, 980, 720, 1140], radius=10, fill=(255, 255, 255), outline=(0, 0, 0), width=3)
    d.text((100, 1000), "Pocket AR Mini-Gallery", fill=(20, 20, 20), font=font(22, True))
    d.text((100, 1040), title, fill=(20, 20, 20), font=font(28, True))
    frame(d, f"Art {idx:02d} · {title}", f"art-ar-gallery · practice marker {idx}/3")
    img.save(OUT / f"art-{idx:02d}-practice.png", optimize=True)


def practice_marker(idx, title, seed):
    img, d = new_canvas((255, 255, 255))
    rng = random.Random(seed)
    for y in range(100, 1150, 40):
        for x in range(100, 1300, 40):
            r = rng.random()
            if r < 0.55:
                d.rectangle([x, y, x + 28, y + 28], fill=(20, 20, 20))
            elif r < 0.8:
                d.ellipse([x, y, x + 28, y + 28], fill=(20, 20, 20))
            else:
                d.polygon([(x + 14, y), (x + 28, y + 14), (x + 14, y + 28), (x, y + 14)], fill=(20, 20, 20))
    d.polygon([(400, 300), (900, 250), (1100, 700), (700, 1000), (300, 800)], outline=(255, 80, 0), width=14)
    d.ellipse([500, 400, 900, 800], outline=(0, 120, 200), width=12)
    d.line([200, 200, 1200, 1100], fill=(200, 0, 80), width=10)
    d.line([1200, 200, 200, 1100], fill=(0, 160, 80), width=8)
    d.rounded_rectangle([100, 100, 520, 280], radius=12, fill=(255, 255, 255), outline=(20, 20, 20), width=3)
    d.text((120, 120), "Workshop practice target", fill=(20, 20, 20), font=font(22, True))
    d.text((120, 165), title, fill=(20, 20, 20), font=font(30, True))
    frame(d, f"Practice {idx:02d} · {title}", f"hands-on demo · marker {idx}/3")
    img.save(OUT / f"practice-{idx:02d}.png", optimize=True)


def make_sheet(files, out_name, title):
    cols, rows = 2, 2
    cell, pad = 900, 40
    sheet_w = cols * cell + (cols + 1) * pad
    sheet_h = rows * cell + (rows + 2) * pad + 60
    sheet = Image.new("RGB", (sheet_w, sheet_h), (255, 255, 255))
    draw = ImageDraw.Draw(sheet)
    draw.text((pad, pad // 2), title, fill=(20, 20, 20), font=font(36, True))
    draw.text(
        (pad, pad // 2 + 40),
        "Print at 100% scale · cut along edges · matte paper · avoid glossy laminate",
        fill=(80, 80, 80),
        font=font(20),
    )
    for i, f in enumerate(files[:4]):
        r, c = divmod(i, cols)
        im = Image.open(OUT / f).convert("RGB").resize((cell, cell), Image.Resampling.LANCZOS)
        x = pad + c * (cell + pad)
        y = pad + 70 + r * (cell + pad)
        sheet.paste(im, (x, y))
        draw.rectangle([x, y, x + cell, y + cell], outline=(20, 20, 20), width=2)
    sheet.save(OUT / out_name, optimize=True)


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    plant_leaf()
    plant_stem()
    plant_root()
    plant_flower()
    history_marker(1, "Town Plaza", "plaza", 101, [(40, 90, 140), (200, 180, 120), (160, 80, 40)])
    history_marker(2, "River Bridge", "bridge", 202, [(30, 80, 120), (180, 150, 100), (100, 120, 80)])
    history_marker(3, "Campus Gate", "gate", 303, [(80, 40, 20), (220, 200, 160), (140, 60, 40)])
    history_marker(4, "Market Hall", "market", 404, [(20, 60, 40), (200, 160, 80), (160, 100, 60)])
    art_marker(1, "Contrast Study A", 501)
    art_marker(2, "Rhythm Study B", 502)
    art_marker(3, "Balance Study C", 503)
    practice_marker(1, "Alpha pattern", 601)
    practice_marker(2, "Beta pattern", 602)
    practice_marker(3, "Gamma pattern", 603)
    make_sheet(
        ["plant-01-leaf.png", "plant-02-stem.png", "plant-03-root.png", "plant-04-flower.png"],
        "sheet-plant-anatomy.png",
        "Printable sheet · Scan-to-Analyze Plant Anatomy",
    )
    make_sheet(
        [
            "history-01-plaza.png",
            "history-02-bridge.png",
            "history-03-gate.png",
            "history-04-market.png",
        ],
        "sheet-local-history.png",
        "Printable sheet · AR Local History Spots (practice sites)",
    )
    make_sheet(
        ["art-01-practice.png", "art-02-practice.png", "art-03-practice.png", "practice-01.png"],
        "sheet-art-and-practice.png",
        "Printable sheet · Art practice + workshop pattern",
    )
    make_sheet(
        ["practice-01.png", "practice-02.png", "practice-03.png", "plant-01-leaf.png"],
        "sheet-workshop-practice.png",
        "Printable sheet · Hands-on Encantar practice set",
    )
    print(f"Wrote {len(list(OUT.glob('*.png')))} files to {OUT}")


if __name__ == "__main__":
    main()
