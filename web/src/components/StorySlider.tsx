"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

/* Reusable noho-style "stories" slider — the exact animation used by the
   homepage Fulfillment-stories row: a horizontal track of wide cards whose
   active card is left-aligned to the heading (neighbours peek right), a navy
   panel wipes up from the bottom as a card becomes focused, and its text turns
   Electric Lime. Arrow controls + counter sit under the cards. Hand-rolled CSS
   transforms, no new deps. */

export type SliderItem = {
  num: string;
  title: string;
  excerpt: string;
};

const CARD_W = "min(86vw, 540px)";
const CARD_H = "clamp(320px, 24vw, 360px)";
const GAP = 32; // px between cards (even gap, sharp corners)

export function StorySlider({
  heading,
  lead,
  items,
  ariaLabel,
  action,
}: {
  heading: string;
  lead?: string;
  items: SliderItem[];
  ariaLabel: string;
  action?: { label: string; href: string };
}) {
  const [active, setActive] = useState(0);
  const [tx, setTx] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);

  const go = (dir: 1 | -1) =>
    setActive((i) => Math.min(items.length - 1, Math.max(0, i + dir)));

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    }
  };

  /* Align the active card's left edge to the heading gutter; clamp so the row
     never shows empty space at either end. */
  useLayoutEffect(() => {
    const recalc = () => {
      const stage = stageRef.current;
      const card = cardRef.current;
      const head = revealRef.current;
      if (!stage || !card || !head) return;
      const sw = stage.clientWidth;
      const w = card.offsetWidth;
      const contentLeft =
        head.getBoundingClientRect().left - stage.getBoundingClientRect().left;
      const step = w + GAP;
      const trackWidth = items.length * w + (items.length - 1) * GAP;
      const maxTx = contentLeft;
      const minTx = Math.min(maxTx, sw - contentLeft - trackWidth);
      const desired = contentLeft - active * step;
      setTx(Math.max(minTx, Math.min(maxTx, desired)));
    };
    recalc();
    window.addEventListener("resize", recalc);
    return () => window.removeEventListener("resize", recalc);
  }, [active, items.length]);

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
  const atEnd = active === items.length - 1;

  return (
    <section className="relative overflow-hidden py-14 md:py-20">
      <div className="mx-auto max-w-[1840px] px-6 md:px-10 lg:px-14">
        <div ref={revealRef} className="reveal-up max-w-[48rem]">
          <h2 className="h2 text-ink">{heading}</h2>
          {lead && (
            <p className="mt-6 text-[1.02rem] leading-relaxed text-ink-60">
              {lead}
            </p>
          )}
        </div>
      </div>

      {/* slider stage (full width so neighbours peek) */}
      <div
        ref={stageRef}
        role="group"
        aria-roledescription="carousel"
        aria-label={ariaLabel}
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="relative mt-12 w-full overflow-hidden outline-none md:mt-16"
      >
        <div
          className="flex items-stretch"
          style={{
            gap: `${GAP}px`,
            transform: `translate3d(${tx}px, 0, 0)`,
            transition: "transform 0.7s cubic-bezier(0.65, 0, 0.35, 1)",
            willChange: "transform",
          }}
        >
          {items.map((s, i) => {
            const on = i === active;
            const limeBody = "rgba(222,226,30,0.85)";
            const limeMeta = "rgba(222,226,30,0.72)";
            return (
              <div
                key={s.title}
                ref={i === 0 ? cardRef : undefined}
                style={{
                  width: CARD_W,
                  height: CARD_H,
                  background: "var(--surface-white)",
                  boxShadow: on ? "none" : "inset 0 0 0 1px rgba(0,29,63,0.1)",
                  opacity: on ? 1 : 0.8,
                  transition:
                    "box-shadow 0.7s cubic-bezier(0.65, 0, 0.35, 1), opacity 0.7s cubic-bezier(0.65, 0, 0.35, 1)",
                }}
                className="relative flex shrink-0 flex-col overflow-hidden p-8 text-left sm:p-10 lg:p-12"
              >
                {/* navy panel wipes up from the bottom when the card is focused */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 z-0"
                  style={{
                    background: "var(--navy)",
                    transform: on ? "translateY(0%)" : "translateY(100%)",
                    transition: "transform 0.7s cubic-bezier(0.65, 0, 0.35, 1)",
                    willChange: "transform",
                  }}
                />

                <span
                  className="absolute right-8 top-8 z-10 h-2.5 w-2.5 rounded-full sm:right-10 sm:top-10 lg:right-12 lg:top-12"
                  style={{ background: on ? "var(--lime)" : "var(--navy)" }}
                />

                <span
                  className="relative z-10 text-[0.82rem] font-medium tabular-nums text-ink-40 transition-colors duration-500"
                  style={{ color: on ? limeMeta : undefined }}
                >
                  {s.num}
                </span>

                <h3
                  className="relative z-10 mt-6 max-w-[20ch] text-[clamp(1.45rem,1rem+1.3vw,1.85rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-ink transition-colors duration-500"
                  style={{ color: on ? "var(--lime)" : undefined }}
                >
                  {s.title}
                </h3>

                <p
                  className="relative z-10 mt-4 max-w-[44ch] text-[0.97rem] leading-relaxed text-ink-60 transition-colors duration-500"
                  style={{ color: on ? limeBody : undefined }}
                >
                  {s.excerpt}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* controls — bottom-left, aligned to the heading */}
      <div className="mx-auto max-w-[1840px] px-6 md:px-10 lg:px-14">
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => go(-1)}
              disabled={atStart}
              aria-label="Previous"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/15 text-ink transition-all hover:border-[var(--lime)] hover:bg-[var(--lime)] hover:text-ink disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-ink/15 disabled:hover:bg-transparent disabled:hover:text-ink active:scale-95"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              disabled={atEnd}
              aria-label="Next"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/15 text-ink transition-all hover:border-[var(--lime)] hover:bg-[var(--lime)] hover:text-ink disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-ink/15 disabled:hover:bg-transparent disabled:hover:text-ink active:scale-95"
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
            / {String(items.length).padStart(2, "0")}
          </span>

          {action && (
            <a
              href={action.href}
              className="ml-auto inline-flex items-center justify-center rounded-full border border-ink/20 px-7 py-3.5 text-[0.95rem] font-medium text-ink transition-colors hover:border-ink/45 hover:bg-ink/[0.03] active:scale-[0.98]"
            >
              {action.label}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
