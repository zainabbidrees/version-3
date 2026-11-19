"use client";

import { useEffect, useRef } from "react";

/* noho "Chairs that care" tile set on a light band: a left-aligned heading over
   three tonal tiles, each with a bullet label up top, the phrase centred in the
   open middle, and a large index number anchored bottom-left. All three rest the
   same — on hover a lime panel wipes up from the base (noho's directional fill)
   and the copy sits navy on lime. Tiles fade up in a short stagger on scroll.
   IntersectionObserver toggles .is-in; no rAF, no deps. */

export type UniformItem = {
  num: string;
  label: string;
  title: string;
  body: string;
};

type Props = {
  heading: string;
  lead: string;
  items: UniformItem[];
  action: { label: string; href: string };
};

export function UniformTiles({ heading, lead, items, action }: Props) {
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
        <h2 className="h2 text-ink">{heading}</h2>
        <p className="mt-6 text-[1.02rem] leading-relaxed text-ink-60">{lead}</p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-4 md:mt-14 md:grid-cols-3 md:gap-5">
        {items.map((it, i) => (
          <article
            key={it.num}
            className="reveal-up group relative isolate flex min-h-[20rem] flex-col overflow-hidden bg-element-2 p-7 md:min-h-[23rem] md:p-8"
            style={{ transitionDelay: `${120 + i * 90}ms` }}
          >
            {/* noho hover — a lime panel wipes up from the base */}
            <span
              aria-hidden="true"
              className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-[var(--lime)] transition-transform duration-[520ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100"
            />

            <span className="inline-flex items-center gap-2 text-[0.75rem] font-medium uppercase tracking-[0.16em] text-ink-40 transition-colors duration-300 group-hover:text-ink/70">
              <span className="inline-block h-1.5 w-1.5 bg-[var(--lime)] transition-colors duration-300 group-hover:bg-ink" />
              {it.label}
            </span>

            <div className="flex flex-1 items-center justify-center px-1 py-8 text-center">
              <div>
                <h3 className="text-[clamp(1.4rem,1.1rem+1vw,1.9rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-ink">
                  {it.title}
                </h3>
                <p className="mx-auto mt-3 max-w-[26ch] text-[0.95rem] leading-relaxed text-ink-60 transition-colors duration-300 group-hover:text-ink/75">
                  {it.body}
                </p>
              </div>
            </div>

            <span className="text-[1.9rem] font-semibold leading-none tabular-nums tracking-[-0.04em] text-ink/25 transition-colors duration-300 group-hover:text-ink/55">
              {it.num}
            </span>
          </article>
        ))}
      </div>

      <div
        className="reveal-up mt-10"
        style={{ transitionDelay: `${120 + items.length * 90}ms` }}
      >
        <a
          href={action.href}
          className="inline-flex items-center justify-center border border-ink/25 px-6 py-3 text-[0.92rem] font-medium text-ink transition-colors hover:border-ink/55 hover:bg-ink/[0.05] active:scale-[0.98]"
        >
          {action.label}
        </a>
      </div>
    </div>
  );
}
