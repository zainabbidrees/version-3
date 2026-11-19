"use client";

import { useEffect, useRef } from "react";
import { RevealWords } from "@/components/RevealWords";

/* Closing CTA — the Brand Fulfillment "Let's simplify your branded purchasing"
   moment, rebuilt in noho style: a full-bleed ink finale on the warm palette
   (no lime block), centered Switzer display heading, two pill CTAs, and a
   line-art "delivered package" graphic under an arch with a soft warm glow.
   Hand-rolled CSS reveal (IntersectionObserver), no new deps. */

export function ClosingCta() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
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
      { threshold: 0.2 },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section ref={rootRef} className="bg-ink text-page">
      <div className="mx-auto max-w-[1840px] px-6 py-20 text-center md:px-10 lg:px-14 md:py-28">
        <p
          className="reveal-up inline-flex items-center gap-2 text-[0.8rem] font-medium uppercase tracking-[0.18em] text-page/55"
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-poppy" />
          Get started
        </p>

        <h2
          aria-label="Let's simplify your branded purchasing."
          className="mx-auto mt-6 max-w-[22ch] text-page"
          style={{
            fontSize: "clamp(2.4rem, 1.2rem + 4vw, 5rem)",
            fontWeight: 600,
            lineHeight: 1.06,
            letterSpacing: "-0.04em",
            textWrap: "balance",
          }}
        >
          <RevealWords text="Let’s simplify your branded purchasing." />
        </h2>

        <p
          className="reveal-up mx-auto mt-6 max-w-[56ch] text-[1.05rem] leading-relaxed text-page/70"
          style={{ transitionDelay: "150ms", textWrap: "balance" }}
        >
          Tell us what your team needs. We&rsquo;ll help you explore the right
          products, ordering options, and fulfillment support.
        </p>

        <div
          className="reveal-up mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          style={{ transitionDelay: "220ms" }}
        >
          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-[var(--lime)] px-7 py-3.5 text-[0.95rem] font-semibold text-ink transition-[transform,opacity] duration-200 hover:opacity-90 active:scale-[0.98]"
          >
            Request a Discovery Meeting
          </a>
          <a
            href="/how-it-works"
            className="inline-flex items-center justify-center rounded-full border border-page/30 px-7 py-3.5 text-[0.95rem] font-medium text-page transition-[transform,border-color,background-color] duration-200 hover:border-page/60 hover:bg-page/5 active:scale-[0.98]"
          >
            See How It Works
          </a>
        </div>
      </div>
    </section>
  );
}
