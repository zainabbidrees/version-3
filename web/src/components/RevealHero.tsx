"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { RevealWords } from "@/components/RevealWords";

/* Shared page hero, matching the Custom Online Stores hero: a beige band with
   the whole headline played in via RevealWords (the homepage per-letter reveal),
   plus a staggered reveal-up on the eyebrow, lead, and CTAs. One local
   IntersectionObserver drives the reveal-up elements. No new deps. */

type Action = { label: string; href: string; variant?: "primary" | "secondary" };

export function RevealHero({
  eyebrow,
  title,
  lead,
  actions = [],
}: {
  eyebrow: string;
  title: string;
  lead?: ReactNode;
  actions?: Action[];
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>(".reveal-up"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      items.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("is-in");
            obs.unobserve(en.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-element">
      <div className="mx-auto max-w-[1400px] px-6 pb-14 pt-32 md:px-10 md:pb-20 md:pt-44 lg:px-14">
        <p className="reveal-up inline-flex items-center gap-2 text-[0.78rem] font-medium uppercase tracking-[0.18em] text-ink/55">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-ink" />
          {eyebrow}
        </p>

        <h1
          aria-label={title}
          className="mt-6 max-w-[22ch] font-semibold leading-[0.98] tracking-[-0.04em] text-ink"
          style={{ fontSize: "clamp(2.6rem, 1.4rem + 4.6vw, 5.6rem)", textWrap: "balance" }}
        >
          <RevealWords text={title} />
        </h1>

        {lead && (
          <p
            className="reveal-up mt-7 max-w-[60ch] text-[1.1rem] leading-relaxed text-ink/70"
            style={{ transitionDelay: "120ms", textWrap: "balance" }}
          >
            {lead}
          </p>
        )}

        {actions.length > 0 && (
          <div
            className="reveal-up mt-9 flex flex-col gap-3 sm:flex-row"
            style={{ transitionDelay: "200ms" }}
          >
            {actions.map((a) => (
              <a
                key={a.label}
                href={a.href}
                className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-[0.95rem] font-medium transition-[transform,opacity,background-color,border-color] duration-200 active:scale-[0.98] ${
                  a.variant === "secondary"
                    ? "border border-ink/20 text-ink hover:border-ink/45 hover:bg-ink/[0.03]"
                    : "bg-ink text-white hover:opacity-90"
                }`}
              >
                {a.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
