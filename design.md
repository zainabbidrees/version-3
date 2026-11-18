# Variation 3 — Design Direction

**Project:** Redesign of **Brand Fulfillment** (branded merchandise, uniforms, promo products, custom online stores — Omaha, NE).
**Design language:** adapted from **noho.ink** — warm editorial, typographic, quietly animated.
**Content source:** [content/homepage.md](content/homepage.md).
**Tokens:** [design-system/tokens.css](design-system/tokens.css) · [design-system/tokens.json](design-system/tokens.json).

---

## 0. Hard color constraint

> **No purple. No orange. No green. Anywhere** — not in UI, not in accents, not in imagery backdrops, not in hover states, not in status colors.

This removes most of noho's original accent palette. What we drop and what replaces it:

| noho original | banned? | Variation 3 replacement |
|---|---|---|
| lavender `#B9A7E6` | 🚫 purple | removed |
| olive `#7C8A4E` | 🚫 green | removed |
| mustard `#E9C84B` | ⚠️ reads orange | removed (replaced with a true lemon yellow) |
| coral `#D9654E` | ⚠️ orange-leaning red | replaced with a clean poppy **red** |
| status green `#88C159` | 🚫 green | success → **ink / blue** treatment instead |

The warm-paper neutrals and the near-black ink are **kept** — creams and taupes are not purple/orange/green, and they carry the whole design.

---

## 1. The feel

Warm, editorial, confident. A near-white **paper** canvas, one almost-black **ink**, big tight typography, and generous whitespace. For a B2B merchandise brand this reads as *premium and organized* — the opposite of a cluttered catalog. Accents are used **sparingly** as flat color blocks and section dividers, never gradients, never drop shadows.

---

## 2. Color system

### Foundation (kept from noho — none are banned)
| Token | Hex | Role |
|---|---|---|
| `--bg-page` | `#F1EEE9` | Page background |
| `--bg-element` | `#E7E2DA` | Cards / tiles |
| `--bg-element-second` | `#D7D1C7` | Alt surface |
| `--bg-element-hover` | `#CDC0B0` | Hover / deepest surface |
| `--surface-white` | `#FFFFFF` | Header, forms, secondary buttons |
| `--txt-main` | `#3C3C3C` | All text + dark buttons |
| `--txt-main-60` | `rgba(60,60,60,.6)` | Secondary text |
| `--txt-main-40` | `rgba(60,60,60,.4)` | Tertiary / placeholder |

### Accents (compliant set — reds, blues, pink, true yellow)
Use for numbered-section color blocks, the rotating-hero word, and image/product backdrops. Keep it to **one accent per section** so the page stays calm.

| Token | Hex | Notes |
|---|---|---|
| `--accent-poppy` | `#D83A2E` | Primary pop — clean red, not orange |
| `--accent-berry` | `#B02E4A` | Deep red/raspberry for contrast blocks |
| `--accent-rose` | `#E6808C` | Soft pink, warm and friendly |
| `--accent-cobalt` | `#2F4BDA` | Cool counterpoint — confident blue |
| `--accent-sky` | `#8FB4D9` | Muted sky blue, calmer surfaces |
| `--accent-butter` | `#EBD873` | True lemon yellow (no orange cast) |

### Status (green is banned, so re-mapped)
| Purpose | Color | Note |
|---|---|---|
| Success / positive | `--accent-cobalt` `#2F4BDA` or ink `#3C3C3C` with a check | **not green** |
| Error / alert | `--accent-poppy` `#D83A2E` | red is allowed |
| Info | `--accent-sky` `#8FB4D9` | |

**Quick self-check before shipping any screen:** scan every hex. If a hue sits between red→yellow (orange), in the greens, or in the purples/violets, it's out.

---

## 3. Typography

**Family:** `Switzer` (variable grotesk, Fontshare), Arial fallback. Two weights only: **400** body, **600** every heading.

**Signature:** headings on **1.0 line-height** with **tight negative tracking** (−0.03 to −0.04em). Keep that compact, locked-up look — it's the brand's confidence.

| Role | Weight | LH | Tracking | Size |
|---|---|---|---|---|
| Display / hero | 600 | 1.0 | −0.04em | `clamp(2.5rem, 4.2vw+.5rem, 4.5rem)` |
| H2 (section) | 600 | 1.0 | −0.04em | `clamp(2rem, 4.2vw, 2.75rem)` |
| H3 | 600 | 1.0 | −0.03em | `clamp(1.25rem, 2.1vw, 1.5rem)` |
| H4 / card title | 600 | 1.1 | −0.01em | `clamp(1rem, 1.3vw, 1.125rem)` |
| Body | 400 | 1.45 | 0 | `clamp(.9rem, .95vw+.4rem, 1rem)` |
| Small / meta | 400 | 1.4 | 0 | `0.8125rem` |

The big numbered list labels (**01–05**) are a type feature: set them large, 600, in an accent color or ink, as section anchors.

---

## 4. Shape & spacing

- **Radius:** pill (`999px`) for buttons, tags, pills; `~1.25rem` (21px) for cards/image tiles; `16px` mid.
- **Buttons:** primary = ink bg / white text, pill; secondary = white bg / ink text, pill. Padding `~0.5em 1.5em`. No border, `transition: all .25s`.
- **Spacing rhythm:** clusters at `0.8rem`, `2rem`, `2.75rem`, `4rem` — loosely ×1.5. Lots of air between sections.
- **Layout:** split-screen hero (copy left, visual right); asymmetric grid of square tiles; numbered rows for the "why" and "every size" sections.

---

## 5. Motion

Reproduce noho's stack: **GSAP + ScrollTrigger + SplitText + Lenis + Embla auto-scroll**.

1. **Lenis** smooth/inertia scroll — the base layer everything is timed against.
2. **SplitText line reveals** on headings — split into lines, mask, slide up with stagger. `y:100%→0`, stagger `~0.1s`, duration `~0.9s`, ease `power3.out` (`cubic-bezier(.22,1,.36,1)`). This is the hero entrance.
3. **Rotating hero word** — the second headline line cycles (Get Delivered / Come to Life / Make an Impact / Find Their Fit) with a masked swap. Set it in an accent (poppy or cobalt), not banned hues.
4. **ScrollTrigger fade-up** on cards/tiles as they enter — opacity `0→1`, `y 24–40px→0`, staggered across grids.
5. **Embla auto-scroll** marquee — a slow horizontal strip (e.g. product/apparel thumbnails), pauses on hover.
6. **CSS micro-transitions** — `0.25s` opacity; nav overlay `0.32s`.

Always gate behind `prefers-reduced-motion`: disable Lenis + reveals, show content static.

---

## 6. Section-by-section mapping (homepage)

| Content block | Treatment |
|---|---|
| Hero | Split-screen. Left: "Where Brands **[rotating word]**" + body + Discovery CTA. Right: image tile grid. |
| One Partner. Every Piece. | Big H2, three-item row (Apparel · Promo · Stores) as flat accent blocks. |
| Why (01–05) | Numbered rows, large accent numerals, line-reveal on scroll. Inline CTAs on 01 & 03. |
| Built for Every Size (01–05) | Grid of five cards, one muted accent surface each (stay compliant), fade-up stagger. |
| However you order | Two columns: One-Time vs Recurring, each with a tag list. |
| Closing CTA | Full-width paper block, ink headline, dual CTA (Discovery / How It Works). |
| Footer | Multi-column: Services · Company · Get in Touch · Office. Oversized "BRAND FULFILLMENT" wordmark. |

---

## 7. Decisions I made for you (flag any to change)
- **Yellow kept, but as a true lemon** (`#EBD873`) — if you consider yellow too close to orange, say so and I'll drop it.
- **Success state uses blue/ink**, since green is out.
- **Coral → poppy red**; the brand's "pop" leans red + cobalt blue as the two signatures.
- Neutrals and ink are unchanged from noho and do the heavy lifting; accents stay sparse.
