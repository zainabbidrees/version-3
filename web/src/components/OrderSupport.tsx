"use client";

import { useEffect, useRef, useState } from "react";
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
  /* a small deck: [0] is the face shown at rest; the rest fan out on hover */
  images: string[];
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
    images: [
      "/images/promo/event-giveaways.webp",
      "/images/promo/events-booth.webp",
      "/images/promo/company-gifts.webp",
    ],
    tone: "var(--bg-element)",
    toneHover: "var(--bg-element-2)",
  },
  {
    badge: "Recurring",
    title: "Ongoing Apparel Programs",
    body: "For businesses with recurring uniform and apparel needs, we provide an easy way to manage products, ordering, and fulfillment over time.",
    quote: "A program that runs all year.",
    tags: ["Uniform programs", "Easy reorders", "Ongoing fulfillment"],
    images: [
      "/images/promo/pair-apparel-team.webp",
      "/images/promo/pair-company-store.webp",
      "/images/promo/office-writing.webp",
    ],
    tone: "var(--bg-element)",
    toneHover: "var(--bg-element-2)",
  },
];

export function OrderSupport() {
  const rootRef = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);

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
      <div className="mx-auto max-w-[1840px] px-6 md:px-10 lg:px-14">
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
        <div className="order-band mx-auto grid max-w-[1840px] grid-cols-1 gap-5 px-6 md:gap-6 md:px-10 lg:px-14 lg:grid-cols-2">
          {PANELS.map((p, i) => (
            <article
              key={p.title}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered((h) => (h === i ? null : h))}
              className="group/card reveal-up flex min-h-[26rem] flex-col p-8 transition-colors duration-500 sm:p-10 lg:min-h-[32rem] lg:p-14"
              style={{
                transitionDelay: `${160 + i * 120}ms`,
                // white by default; Branded Beige surfaces only on hover
                background: hovered === i ? "var(--bg-element)" : "var(--surface-white)",
                boxShadow:
                  hovered === i
                    ? "inset 0 0 0 1px rgba(0,29,63,0.16)"
                    : "inset 0 0 0 1px rgba(0,29,63,0.10)",
              }}
            >
              {/* top: image deck + label (noho headshot + name row).
                  One still image at rest; on hover the photos cycle, each
                  sliding up and stacking over the last. */}
              <div className="flex items-start gap-6 sm:gap-8">
                <div className="relative h-32 w-32 shrink-0 overflow-hidden bg-element-3 shadow-[0_10px_28px_rgba(0,29,63,0.14)] sm:h-40 sm:w-40 lg:h-44 lg:w-44">
                  <img
                    src={p.images[0]}
                    alt={`${p.title} — branded apparel and products`}
                    loading="lazy"
                    draggable={false}
                    className="h-full w-full object-cover"
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
