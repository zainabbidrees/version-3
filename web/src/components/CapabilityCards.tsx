"use client";

import { useEffect, useRef } from "react";

/* noho "Chairs that care" tile set: a heading over three tonal tiles, each with
   a bullet label up top, a big title, a short line of body, and a large index
   number anchored at the bottom. The middle tile reads as the active one (lime
   dot + brighter surface). Everything fades up on scroll in a short stagger —
   the site's .reveal-up signature — with a quiet lift on hover. rAF-free:
   IntersectionObserver toggles .is-in, CSS does the rest. No deps. */

export type Capability = {
  k: string;
  title: string;
  body: string;
};

type Props = {
  heading: string;
  lead: string;
  items: Capability[];
  cta: { label: string; href: string };
};

export function CapabilityCards({ heading, lead, items, cta }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const targets = Array.from(
      root.querySelectorAll<HTMLElement>(".reveal-up"),
    );
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return (
    <div ref={rootRef} className="mx-auto max-w-[1840px]">
      <h2 className="reveal-up h2 max-w-[22ch] text-page">{heading}</h2>
      <p
        className="reveal-up mt-6 max-w-[52ch] text-[1.02rem] leading-relaxed text-page/65"
        style={{ transitionDelay: "60ms" }}
      >
        {lead}
      </p>

      <div className="mt-12 grid grid-cols-1 gap-4 md:mt-16 md:grid-cols-3 md:gap-5">
        {items.map((cap, i) => (
          <article
            key={cap.k}
            className="reveal-up group relative isolate flex min-h-[19rem] flex-col justify-between overflow-hidden bg-page/[0.03] p-7 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] md:min-h-[21rem] md:p-8"
            style={{ transitionDelay: `${120 + i * 90}ms` }}
          >
            {/* noho hover — a lime panel wipes up from the base */}
            <span
              aria-hidden="true"
              className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-[var(--lime)] transition-transform duration-[520ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100"
            />

            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2 text-[0.75rem] font-medium uppercase tracking-[0.16em] text-page/45 transition-colors duration-300 group-hover:text-ink/65">
                <span className="inline-block h-1.5 w-1.5 bg-[var(--lime)] transition-colors duration-300 group-hover:bg-ink" />
                {cap.k}
              </span>
            </div>

            <div className="mt-auto pt-10">
              <h3 className="text-[clamp(1.35rem,1rem+1.1vw,1.75rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-page transition-colors duration-300 group-hover:text-ink">
                {cap.title}
              </h3>
              <p className="mt-3 max-w-[32ch] text-[0.95rem] leading-relaxed text-page/60 transition-colors duration-300 group-hover:text-ink/75">
                {cap.body}
              </p>
              <div className="mt-7 flex items-end justify-between border-t border-page/12 pt-5 transition-colors duration-300 group-hover:border-ink/25">
                <span className="text-[2rem] font-semibold leading-none tabular-nums tracking-[-0.04em] text-page/25 transition-colors duration-300 group-hover:text-ink/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                  className="text-page/35 transition-[transform,color] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink"
                >
                  <path
                    d="M4.5 11.5L11.5 4.5M11.5 4.5H5.5M11.5 4.5V10.5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div
        className="reveal-up mt-12"
        style={{ transitionDelay: `${120 + items.length * 90}ms` }}
      >
        <a
          href={cta.href}
          className="inline-flex items-center justify-center rounded-full bg-[var(--lime)] px-7 py-3.5 text-[0.95rem] font-semibold text-ink transition-opacity hover:opacity-90 active:scale-[0.98]"
        >
          {cta.label}
        </a>
      </div>
    </div>
  );
}
