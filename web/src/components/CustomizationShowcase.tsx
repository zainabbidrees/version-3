"use client";

import { useEffect, useRef } from "react";

/* noho "product section" adapted to customization methods: two tonal stage
   panels side by side, each floating a product shot with a corner action tile,
   and a bottom bar carrying a small label, a big title, a "Pick a color" swatch
   row, and a learn-more / primary pair. Square-cornered per brand (noho's
   circles become squares). Panels fade up in a short stagger on scroll; the
   shot eases on hover. IntersectionObserver toggles .is-in — no rAF, no deps. */

export type Method = {
  kicker: string;
  title: string;
  body: string;
  img: string;
  alt: string;
  tone: string;
  fg: string; // tailwind text color class for on-panel copy
  swatchLabel: string;
  swatches: string[];
  href: string;
};

type Props = {
  eyebrow: string;
  heading: string;
  lead: string;
  methods: Method[];
};

export function CustomizationShowcase({
  eyebrow,
  heading,
  lead,
  methods,
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const targets = Array.from(root.querySelectorAll<HTMLElement>(".reveal-up"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return (
    <div ref={rootRef} className="mx-auto max-w-[1840px]">
      <div className="reveal-up max-w-[48rem]">
        <span className="inline-flex items-center gap-2 text-[0.78rem] font-medium uppercase tracking-[0.18em] text-ink-40">
          <span className="inline-block h-1.5 w-1.5 bg-[var(--lime)]" />
          {eyebrow}
        </span>
        <h2 className="mt-5 h2 text-ink">{heading}</h2>
        <p className="mt-6 text-[1.02rem] leading-relaxed text-ink-60">{lead}</p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-4 md:mt-14 md:grid-cols-2 md:gap-5">
        {methods.map((m, i) => (
          <article
            key={m.title}
            className="reveal-up group relative flex min-h-[30rem] flex-col p-6 md:min-h-[34rem] md:p-9"
            style={{
              background: m.tone,
              transitionDelay: `${100 + i * 110}ms`,
            }}
          >
            {/* corner action tile — noho's circular icon, squared for brand */}
            <div className="flex justify-end">
              <a
                href={m.href}
                aria-label={`Explore ${m.title}`}
                className={`flex h-10 w-10 items-center justify-center bg-ink/[0.06] ${m.fg} transition-colors duration-300 hover:bg-ink hover:text-page`}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                >
                  <path
                    d="M4.5 11.5L11.5 4.5M11.5 4.5H5.5M11.5 4.5V10.5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>

            {/* the process shot, framed on the stage */}
            <div className="flex flex-1 items-center justify-center py-6 md:py-8">
              <div className="aspect-[4/3] w-full overflow-hidden shadow-[0_26px_60px_-30px_rgba(0,29,63,0.5)]">
                <img
                  src={m.img}
                  alt={m.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                />
              </div>
            </div>

            {/* bottom bar: label + title left, swatches + actions */}
            <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-5">
              <div>
                <span
                  className={`text-[0.74rem] font-medium uppercase tracking-[0.16em] ${m.fg} opacity-55`}
                >
                  {m.kicker}
                </span>
                <h3
                  className={`mt-1.5 text-[clamp(1.6rem,1.1rem+1.6vw,2.15rem)] font-semibold leading-[1.02] tracking-[-0.035em] ${m.fg}`}
                >
                  {m.title}
                </h3>
                <div className="mt-4 flex items-center gap-3">
                  <span
                    className={`text-[0.72rem] font-medium uppercase tracking-[0.14em] ${m.fg} opacity-55`}
                  >
                    {m.swatchLabel}
                  </span>
                  <span className="flex items-center gap-1.5">
                    {m.swatches.map((c) => (
                      <span
                        key={c}
                        aria-hidden="true"
                        className="h-4 w-4 shadow-[inset_0_0_0_1px_rgba(0,29,63,0.22)]"
                        style={{ background: c }}
                      />
                    ))}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <a
                  href={m.href}
                  className={`inline-flex items-center justify-center border border-ink/25 px-5 py-2.5 text-[0.9rem] font-medium ${m.fg} transition-colors hover:border-ink/55 hover:bg-ink/[0.05] active:scale-[0.98]`}
                >
                  Learn more
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center bg-ink px-5 py-2.5 text-[0.9rem] font-medium text-page transition-opacity hover:opacity-90 active:scale-[0.98]"
                >
                  Get a quote
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
