"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

/* Noho-style "stories" slider for Brand Fulfillment.
   - A horizontal row of wide landscape cards (sharp, touching), warm tones,
     ink dot top-right, and a date / category / "Read article" footer.
   - Two arrow buttons under the cards slide the track one card at a time;
     the active card is left-aligned to the heading, neighbours peek right.
   Motion is hand-rolled CSS transform to match the rest of the site. */

type Story = {
  num: string;
  title: string;
  excerpt: string;
  cta?: { label: string; href: string };
  href: string;
  tone: string;
};

// Verbatim from the Brand Fulfillment "Why Brand Fulfillment" section (01–05).
const STORIES: Story[] = [
  {
    num: "01",
    title: "One Simple Online Storefront",
    excerpt:
      "Your team orders approved, branded items from one custom store, with no spreadsheets and no back-and-forth.",
    cta: { label: "Explore Online Stores", href: "/custom-online-stores" },
    href: "/custom-online-stores",
    tone: "var(--bg-element-2)",
  },
  {
    num: "02",
    title: "Quality Products & Trusted Vendors",
    excerpt: "Vetted suppliers, consistent results.",
    href: "/apparel-uniforms",
    tone: "var(--bg-element)",
  },
  {
    num: "03",
    title: "Expert Recommendations & Competitive Pricing",
    excerpt: "We help you pick what fits your brand and budget.",
    cta: { label: "Request a Discovery Meeting", href: "/contact" },
    href: "/contact",
    tone: "var(--bg-element-3)",
  },
  {
    num: "04",
    title: "Consistent Branding",
    excerpt: "Every item matches: colors, logos, placement.",
    href: "/apparel-uniforms",
    tone: "var(--bg-element-2)",
  },
  {
    num: "05",
    title: "Less Work for Your Team",
    excerpt: "Organized, on-time delivery. We handle the rest.",
    href: "/how-it-works",
    tone: "var(--bg-element)",
  },
];

const CARD_W = "min(86vw, 540px)";
const CARD_H = "clamp(320px, 24vw, 360px)";
const GAP = 32; // px between cards (separate, even gap — sharp corners)

export function Stories() {
  const [active, setActive] = useState(0);
  const [tx, setTx] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLAnchorElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);

  const go = (dir: 1 | -1) =>
    setActive((i) => Math.min(STORIES.length - 1, Math.max(0, i + dir)));

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    }
  };

  /* Position the track: the active card's left edge lines up exactly with
     the heading (measured, so it stays aligned at any container width), and
     the row is clamped so it never shows empty space at either end. */
  useLayoutEffect(() => {
    const recalc = () => {
      const stage = stageRef.current;
      const card = cardRef.current;
      const head = revealRef.current;
      if (!stage || !card || !head) return;
      const sw = stage.clientWidth;
      const w = card.offsetWidth;
      // heading's left edge, relative to the full-width slider stage
      const contentLeft =
        head.getBoundingClientRect().left - stage.getBoundingClientRect().left;
      const step = w + GAP;
      const trackWidth = STORIES.length * w + (STORIES.length - 1) * GAP;
      const maxTx = contentLeft; // first card flush to the heading gutter
      const minTx = Math.min(maxTx, sw - contentLeft - trackWidth); // last flush right
      const desired = contentLeft - active * step;
      setTx(Math.max(minTx, Math.min(maxTx, desired)));
    };
    recalc();
    window.addEventListener("resize", recalc);
    return () => window.removeEventListener("resize", recalc);
  }, [active]);

  /* fade the block in on scroll-in */
  useEffect(() => {
    const el = revealRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-in");
      return;
    }
    const io = new IntersectionObserver(
      ([en], obs) => {
        if (en.isIntersecting) {
          el.classList.add("is-in");
          obs.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const atStart = active === 0;
  const atEnd = active === STORIES.length - 1;

  return (
    <section className="relative overflow-hidden py-14 md:py-20">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div ref={revealRef} className="reveal-up">
          <h2 className="h-display text-ink">Fulfillment stories</h2>
        </div>
      </div>

      {/* slider stage (full width so neighbours peek) */}
      <div
        ref={stageRef}
        role="group"
        aria-roledescription="carousel"
        aria-label="Fulfillment stories"
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="relative mt-12 w-full overflow-hidden outline-none md:mt-16"
      >
        <div
          className="flex items-center"
          style={{
            gap: `${GAP}px`,
            transform: `translate3d(${tx}px, 0, 0)`,
            transition: "transform 0.65s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {STORIES.map((s, i) => (
            <a
              key={s.title}
              ref={i === 0 ? cardRef : undefined}
              href={s.href}
              style={{
                width: CARD_W,
                height: CARD_H,
                background: s.tone,
                opacity: i === active ? 1 : 0.55,
                transition: "opacity 0.5s ease",
              }}
              className="relative flex shrink-0 flex-col overflow-hidden p-8 text-left sm:p-10 lg:p-12"
            >
              <span className="absolute right-8 top-8 h-2.5 w-2.5 rounded-full bg-ink sm:right-10 sm:top-10 lg:right-12 lg:top-12" />

              <span className="text-[0.82rem] font-medium tabular-nums text-ink-40">
                {s.num}
              </span>

              <h3 className="mt-6 max-w-[20ch] text-[clamp(1.45rem,1rem+1.3vw,1.85rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-ink">
                {s.title}
              </h3>

              <p className="mt-4 max-w-[44ch] text-[0.97rem] leading-relaxed text-ink-60">
                {s.excerpt}
              </p>

              {s.cta && (
                <div className="mt-auto pt-6 text-[0.9rem]">
                  <span className="inline-flex items-center gap-1.5 font-medium text-ink">
                    {s.cta.label}
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M3 2.5L7 6l-4 3.5"
                        stroke="currentColor"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              )}
            </a>
          ))}
        </div>
      </div>

      {/* controls — bottom-left, aligned to the heading */}
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="mt-10 flex items-center gap-5">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => go(-1)}
              disabled={atStart}
              aria-label="Previous story"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/15 text-ink transition-all hover:bg-ink hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink active:scale-95"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              disabled={atEnd}
              aria-label="Next story"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/15 text-ink transition-all hover:bg-ink hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink active:scale-95"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <span className="text-[0.85rem] tabular-nums text-ink-40">
            <span className="font-medium text-ink">
              {String(active + 1).padStart(2, "0")}
            </span>{" "}
            / {String(STORIES.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
}
