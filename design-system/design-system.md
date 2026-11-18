# noho.ink — Design System (extracted)

Reverse-engineered from the live site on **2026-11-18**. Built on **Webflow**, typeset in **Switzer**, animated with **GSAP + Lenis**. Values below are pulled from the live DOM/CSS, not guessed.

> Starter artifacts, not a pixel-perfect clone. The site is single-page and em/viewport-driven, so absolute sizes are expressed as fluid `clamp()` approximations in `tokens.css` / `tokens.json`.

---

## 1. The feel

Warm, editorial, Scandinavian-meets-New-Zealand. A near-white **paper** canvas, one almost-black **ink**, generous whitespace, and playful bursts of color that come from *product photography* rather than UI chrome. Split-screen hero (text left, image grid right). Everything is quiet and typographic until you scroll — then it animates.

---

## 2. Color

A disciplined warm-neutral system: five paper tones + one ink. No gradients, no shadows in the UI.

| Token | Hex | Role |
|---|---|---|
| `--bg-page` | `#F1EEE9` | Page background (hacienda white) |
| `--bg-element` | `#E7E2DA` | Cards / tiles (toque white) |
| `--bg-element-second` | `#D7D1C7` | Alt surface (offbeat) |
| `--bg-element-hover` / `third` | `#CDC0B0` | Hover & deepest surface (sandbar) |
| `--surface-white` | `#FFFFFF` | Header, form fields, secondary buttons |
| `--txt-main` | `#3C3C3C` | All text + dark buttons (raven black) |
| `--txt-main-60` | `rgba(60,60,60,.6)` | Secondary text |
| `--txt-main-40` | `rgba(60,60,60,.4)` | Tertiary / placeholder |
| `--indicator-green` | `#88C159` | Positive status |
| `--indicator-red` | `#DC5B5B` | Negative status |

**Buttons:** primary = ink on nothing (`#3C3C3C` bg / white text); secondary = white bg / ink text. Both pill-shaped.

**Accent palette** (not in CSS — sampled from the photography; use for color-blocking, image backdrops, playful sections): coral `#D9654E`, mustard `#E9C84B`, lavender `#B9A7E6`, olive `#7C8A4E`, poppy red `#D83A2E`.

---

## 3. Typography

**Family:** `Switzer` — a geometric-humanist grotesk (variable, 100–900). Served locally as woff2; fallback **Arial**. Only two weights are actually used: **400 Regular** (body) and **600 Semibold** (every heading).

**Signature:** headings sit on a **1.0 line-height** with **tight negative tracking** (−0.03 to −0.04em). That compact, locked-up look is the whole personality of the type.

| Role | Weight | Line-height | Tracking | Fluid size |
|---|---|---|---|---|
| Display / hero line | 600 | 1.0 | −0.04em | `clamp(2.5rem, 4.2vw+.5rem, 4.5rem)` |
| H1 | 600 | 1.0 | −0.03em | `clamp(1.75rem, 2.1vw+.5rem, 2.5rem)` |
| H2 | 600 | 1.0 | −0.04em | `clamp(2rem, 4.2vw, 2.75rem)` |
| H3 | 600 | 1.0 | −0.03em | `clamp(1.25rem, 2.1vw, 1.5rem)` |
| H4 | 600 | 1.1 | −0.01em | `clamp(1rem, 1.3vw, 1.125rem)` |
| Body | 400 | 1.45 | 0 | `clamp(.9rem, .95vw+.4rem, 1rem)` |
| Small | 400 | 1.4 | 0 | `0.8125rem` |

> The real site scales type off an em base ≈ `1vw`, so the hero is literally `~4.17em`. The `clamp()`s above give the same optical result without the 1vw trick.

---

## 4. Shape & spacing

- **Radius:** pill (`999px`) for buttons, switches, tags; `~1.25rem` (21px) for image tiles & cards; `16px` for mid elements.
- **Buttons:** padding ≈ `0.47em 1.5em`, pill radius, no border, `transition: all`.
- **Spacing** clusters around `12.8px (0.8rem)`, `32px (2rem)`, `44px` — a loosely `×1.5` rhythm. See `--space-*` in `tokens.css`.
- **Layout:** 50/50 split-screen hero; asymmetric masonry-ish grid of square image tiles.

---

## 5. Motion — the important part

The stack: **GSAP 3.15.0**, **ScrollTrigger**, **SplitText**, **Lenis** (smooth scroll), **Embla Carousel + auto-scroll**. No Webflow IX2 — all hand-animated (240+ elements carry transforms).

1. **Smooth scroll (Lenis).** The whole page scrolls with eased inertia — content feels like it glides and settles rather than snapping to the wheel. This is the base layer everything else is timed against.

2. **Masked line reveals (SplitText + GSAP).** Headings are split into lines (`.title-line`), each clipped by a mask, then slid up from below with a stagger on load / on enter. This is the hero's entrance and recurs on section headings.
   - Pattern: `y: 100% → 0`, `stagger ≈ 0.08–0.12s`, `duration ≈ 0.9s`, ease `power3.out` (`cubic-bezier(0.22,1,0.36,1)`).

3. **Scroll-triggered reveals (ScrollTrigger).** Image tiles and blocks fade + translate up as they enter the viewport (opacity `0→1`, `y ≈ 24–40px → 0`), often staggered across a grid.

4. **Auto-scrolling marquee (Embla auto-scroll).** A continuously drifting horizontal strip of product images — slow, looping, pauses on hover.

5. **Micro-transitions (CSS).** Opacity fades at `0.25s`; the nav overlay uses `opacity 0.32s, visibility 0.32s, background-color 0.32s`. Loaders use a `spin` keyframe.

**To rebuild the feel:** Lenis for scroll + GSAP SplitText line reveals on headings + ScrollTrigger fade-up on media + one Embla marquee. Respect `prefers-reduced-motion` by disabling Lenis and the reveals.

---

## 6. Files

- `tokens.css` — CSS custom properties, drop-in.
- `tokens.json` — same tokens, structured (for Style Dictionary / Tailwind config / Figma import).
- `design-system.md` — this document.

**Font note:** Switzer is a commercial-but-free font by Indian Type Foundry (available via Fontshare). It isn't included here — grab the woff2s from Fontshare before shipping.
