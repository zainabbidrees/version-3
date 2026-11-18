"use client";

import { useEffect, useRef } from "react";
import { RevealWords } from "@/components/RevealWords";

/* "However you order, we support it." — rebuilt in the noho "A few words
   about us" composition: a full-bleed band split into two tone-different
   panels. Each panel leads with a small square image + label (noho's
   headshot + name), carries a body paragraph, and lands on an oversized
   pull-quote with the offering's tags beneath it.
   Data is verbatim from the Brand Fulfillment "However you order" section.
   Hand-rolled CSS reveal (IntersectionObserver), no new deps. */

type Panel = {
  badge: string;
  title: string;
  body: string;
  quote: string;
  tags: string[];
  seed: string;
  tone: string;
  toneHover: string;
};

const PANELS: Panel[] = [
  {
    badge: "One-Time",
    title: "One-Time Buyers",
    body: "Need branded products for an event, launch, or special project? We can help you find the right products for your needs.",
    quote: "A single order for an event.",
    tags: ["Events", "Launches", "Special projects"],
    seed: "bf-onetime-event-512",
    tone: "var(--bg-element)",
    toneHover: "var(--bg-element-2)",
  },
  {
    badge: "Recurring",
    title: "Ongoing Apparel Programs",
    body: "For businesses with recurring uniform and apparel needs, we provide an easy way to manage products, ordering, and fulfillment over time.",
    quote: "A program that runs all year.",
    tags: ["Uniform programs", "Easy reorders", "Ongoing fulfillment"],
    seed: "bf-recurring-uniform-274",
    tone: "var(--bg-element)",
    toneHover: "var(--bg-element-2)",
  },
];

const imgSrc = (seed: string) => `https://picsum.photos/seed/${seed}/600/600`;

export function OrderSupport() {
  const rootRef = useRef<HTMLElement>(null);

  /* reveal children with .reveal-up once the section scrolls in */
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
      { threshold: 0.15 },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section ref={rootRef} className="relative py-14 md:py-20">
      {/* header — left-aligned, echoing noho's "A few words about us" */}
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <h2
          aria-label="However you order, we support it."
          className="h-display max-w-[9em] text-ink"
        >
          <RevealWords text="However you order, we support it." />
        </h2>
        <p
          className="reveal-up mt-6 max-w-[60ch] text-[1.02rem] leading-relaxed text-ink-60"
          style={{ transitionDelay: "90ms" }}
        >
          A single order for an event, or a program that runs all year: same
          team, same quality, same simple ordering.
        </p>
      </div>

      {/* two-panel band — edges aligned with the page margin */}
      <div className="mt-14 md:mt-20">
        <div className="order-band mx-auto grid max-w-[1600px] grid-cols-1 gap-5 px-6 md:gap-6 md:px-10 lg:grid-cols-2">
          {PANELS.map((p, i) => (
            <article
              key={p.seed}
              className="group/card reveal-up flex min-h-[26rem] flex-col p-8 sm:p-10 lg:min-h-[32rem] lg:p-14"
              style={{ transitionDelay: `${160 + i * 120}ms` }}
            >
              {/* top: image + label (noho headshot + name row) */}
              <div className="flex items-start gap-5">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden bg-element-3 sm:h-24 sm:w-24">
                  <img
                    src={imgSrc(p.seed)}
                    alt={`${p.title} — branded apparel and products`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:scale-105"
                  />
                </div>

                <div className="pt-1">
                  <span className="inline-flex items-center bg-surface px-3 py-1 text-[0.72rem] font-medium tracking-[0.01em] text-ink">
                    {p.badge}
                  </span>
                  <h3 className="mt-3 text-[clamp(1.35rem,1rem+1.1vw,1.75rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-ink">
                    {p.title}
                  </h3>
                </div>
              </div>

              {/* body paragraph */}
              <p className="mt-7 max-w-[46ch] text-[1rem] leading-relaxed text-ink-60">
                {p.body}
              </p>

              {/* oversized pull-quote — noho's signature bottom line */}
              <blockquote className="mt-auto pt-12">
                <p className="max-w-[16ch] text-[clamp(1.9rem,1.1rem+2.3vw,3.1rem)] font-semibold leading-[1.0] tracking-[-0.04em] text-ink">
                  &ldquo;{p.quote}&rdquo;
                </p>

                <div className="mt-7 flex flex-wrap gap-2.5">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center border border-ink/12 bg-surface/70 px-3.5 py-1.5 text-[0.82rem] font-medium text-ink/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </blockquote>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
