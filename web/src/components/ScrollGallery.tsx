"use client";

import { useEffect, useRef } from "react";

/* noho "product section": a centered heading over a horizontal strip of tiles.
   The strip is a real horizontally-scrollable track (drag / trackpad), with
   prev/next buttons for manual control AND a gentle scroll-link — as the page
   scrolls through the section the strip eases along, yielding to the user the
   moment they drag, wheel, or press a button (manualUntil window). One source
   of truth (viewport.scrollLeft), rAF + transform only, no deps. Falls back to
   plain native scroll under reduced-motion / no JS. */

export type GalleryTile = {
  name: string;
  photo: boolean;
  src: string | null;
  tone: { bg: string; fg: string } | null;
};

const TILE =
  "h-[clamp(14rem,24vw,21rem)] w-[clamp(14rem,24vw,21rem)] mr-4 md:mr-5 shrink-0";

type ScrollGalleryProps = {
  tiles: GalleryTile[];
  eyebrow: string;
  headingLines: string[];
  kicker: string;
  disc?: string; // deprecated — kept for back-compat, no longer rendered
  id?: string;
  sub?: string;
  tileAria?: string;
};

export function ScrollGallery({
  tiles,
  eyebrow,
  headingLines,
  kicker,
  id,
  sub,
  tileAria = "branded product",
}: ScrollGalleryProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const manualUntil = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!section || !viewport || !track) return;

    const updateControls = () => {
      const max = viewport.scrollWidth - viewport.clientWidth;
      const sl = viewport.scrollLeft;
      if (prevRef.current) prevRef.current.disabled = sl <= 1;
      if (nextRef.current) nextRef.current.disabled = sl >= max - 1;
    };
    updateControls();

    const onScroll = () => updateControls();
    viewport.addEventListener("scroll", onScroll, { passive: true });
    const ro = new ResizeObserver(updateControls);
    ro.observe(viewport);
    ro.observe(track);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const onIntent = () => {
      manualUntil.current = performance.now() + 2200;
    };

    if (!reduce) {
      viewport.addEventListener("wheel", onIntent, { passive: true });
      viewport.addEventListener("pointerdown", onIntent);
      viewport.addEventListener("touchstart", onIntent, { passive: true });

      const tick = () => {
        const r = section.getBoundingClientRect();
        const vh = window.innerHeight;
        if (
          r.bottom > -40 &&
          r.top < vh + 40 &&
          performance.now() > manualUntil.current
        ) {
          const maxSL = viewport.scrollWidth - viewport.clientWidth;
          const total = r.height + vh;
          let p = (vh - r.top) / total;
          p = p < 0 ? 0 : p > 1 ? 1 : p;
          const target = maxSL * p;
          viewport.scrollLeft += (target - viewport.scrollLeft) * 0.12;
        }
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }

    return () => {
      viewport.removeEventListener("scroll", onScroll);
      viewport.removeEventListener("wheel", onIntent);
      viewport.removeEventListener("pointerdown", onIntent);
      viewport.removeEventListener("touchstart", onIntent);
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  const nudge = (dir: 1 | -1) => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;
    manualUntil.current = performance.now() + 2200;
    const first = track.firstElementChild as HTMLElement | null;
    const step = first ? first.getBoundingClientRect().width + 20 : 320;
    viewport.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id={id}
      className="relative scroll-mt-24 overflow-hidden py-16 md:py-24"
    >
      <div className="mx-auto max-w-[1000px] px-6 text-center md:px-10">
        <p className="mb-5 inline-flex items-center gap-2 text-[0.78rem] font-medium uppercase tracking-[0.18em] text-ink-40">
          <span className="inline-block h-1.5 w-1.5 bg-[var(--lime)]" />
          {eyebrow}
        </p>
        <h2
          className="mx-auto max-w-[27ch] font-semibold leading-[1.05] tracking-[-0.04em] text-ink"
          style={{ fontSize: "clamp(2rem, 1.1rem + 3vw, 3.6rem)" }}
        >
          {headingLines.map((l, i) => (
            <span key={i} className="block">
              {l}
            </span>
          ))}
        </h2>
        {sub ? (
          <p className="mx-auto mt-6 max-w-[52ch] text-[1.02rem] leading-relaxed text-ink-60">
            {sub}
          </p>
        ) : null}
      </div>

      <div
        ref={viewportRef}
        className="mt-12 overflow-x-auto md:mt-16 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div ref={trackRef} className="flex w-max">
          {tiles.map((t, i) => (
            <TileView key={i} t={t} kicker={kicker} tileAria={tileAria} />
          ))}
        </div>
      </div>

      {/* prev / next controls — bottom-left */}
      <div className="mx-auto mt-8 max-w-[1840px] px-6 md:px-10 lg:px-14">
        <div className="flex items-center gap-3">
          <button
            ref={prevRef}
            type="button"
            onClick={() => nudge(-1)}
            aria-label="Previous"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/15 text-ink transition-all hover:bg-ink hover:text-white active:scale-95 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            ref={nextRef}
            type="button"
            onClick={() => nudge(1)}
            aria-label="Next"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/15 text-ink transition-all hover:bg-ink hover:text-white active:scale-95 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

export function ApparelGallery({ tiles }: { tiles: GalleryTile[] }) {
  return (
    <ScrollGallery
      tiles={tiles}
      eyebrow="Apparel for your business"
      headingLines={["Apparel for how your team", "works, moves and shows up."]}
      kicker="Apparel"
      id="apparel"
      tileAria="branded apparel"
    />
  );
}

function TileView({
  t,
  kicker,
  tileAria,
}: {
  t: GalleryTile;
  kicker: string;
  tileAria: string;
}) {
  if (t.photo) {
    return (
      <a
        href="/contact"
        aria-label={`${t.name} — ${tileAria}`}
        className={`group relative block overflow-hidden bg-element ${TILE}`}
      >
        <img
          src={t.src ?? ""}
          alt=""
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
        />
        <span className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-ink/75 to-transparent" />
        <span className="absolute bottom-4 left-4 text-[0.98rem] font-semibold text-page">
          {t.name}
        </span>
      </a>
    );
  }
  return (
    <a
      href="/contact"
      className={`group flex flex-col justify-between p-6 ${TILE} ${t.tone!.fg}`}
      style={{ background: t.tone!.bg }}
    >
      <span className="text-[0.74rem] font-medium uppercase tracking-[0.14em] opacity-60">
        {kicker}
      </span>
      <span className="flex items-end justify-between gap-3">
        <span className="text-[clamp(1.35rem,1rem+1.3vw,1.95rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
          {t.name}
        </span>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        >
          <path
            d="M9 6.65C9 6.65 15.94 6.11 16.92 7.08C17.89 8.06 17.35 15 17.35 15M16.5 7.5L6.5 17.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </a>
  );
}
