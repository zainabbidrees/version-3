"use client";

import { useState, type ReactNode } from "react";

/* Noho-style FAQ — split layout: a big "FAQ" title plus a product image on the
   left, and a stacked accordion of Branded-Beige bars on the right, each with a
   square plus-toggle that rotates into a cross when open. Single-open accordion;
   answers reveal with a grid-rows height transition (no JS measuring, no deps).
   Hard edges per brand; the open bar deepens and gains a lime edge. */

type QA = { q: string; a: ReactNode };

export function Faq({
  eyebrow = "Questions, answered",
  title = "FAQ",
  lead,
  image,
  imageAlt = "",
  items,
  footer,
}: {
  eyebrow?: string;
  title?: string;
  lead?: ReactNode;
  image?: string;
  imageAlt?: string;
  items: QA[];
  footer?: ReactNode;
}) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-page">
      <div className="mx-auto max-w-[1840px] px-6 py-16 md:px-10 md:py-24 lg:px-14">
        <div className="grid grid-cols-1 gap-x-16 gap-y-10 lg:grid-cols-[0.82fr_1.18fr]">
          {/* left: title + image + footer */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="inline-flex items-center gap-2 text-[0.78rem] font-medium uppercase tracking-[0.18em] text-ink-40">
              <span className="inline-block h-1.5 w-1.5 bg-[var(--lime)]" />
              {eyebrow}
            </p>
            <h2
              className="mt-6 font-semibold leading-[0.9] tracking-[-0.04em] text-ink"
              style={{ fontSize: "clamp(3.5rem, 2rem + 6vw, 7rem)" }}
            >
              {title}
            </h2>
            {lead && (
              <p className="mt-6 max-w-[40ch] text-[1.05rem] leading-relaxed text-ink-60">{lead}</p>
            )}

            {image && (
              <div className="mt-10 aspect-[5/4] w-full overflow-hidden bg-element">
                <img src={image} alt={imageAlt} className="h-full w-full object-cover" />
              </div>
            )}

            {footer && <div className="mt-8">{footer}</div>}
          </div>

          {/* right: accordion */}
          <ul className="flex flex-col gap-3">
            {items.map((item, i) => {
              const isOpen = open === i;
              const panelId = `faq-panel-${i}`;
              const btnId = `faq-btn-${i}`;
              return (
                <li key={i}>
                  <div
                    className={`relative transition-colors duration-300 ${
                      isOpen ? "bg-element-2" : "bg-element hover:bg-element-2"
                    }`}
                  >
                    <span
                      aria-hidden
                      className={`pointer-events-none absolute inset-y-0 left-0 w-1 bg-lime transition-opacity duration-300 ${
                        isOpen ? "opacity-100" : "opacity-0"
                      }`}
                    />
                    <h3>
                      <button
                        id={btnId}
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => setOpen(isOpen ? null : i)}
                        className="flex w-full items-center justify-between gap-6 px-6 py-6 text-left md:px-8 md:py-7"
                      >
                        <span className="text-[clamp(1.05rem,0.95rem+0.5vw,1.3rem)] font-semibold leading-snug tracking-[-0.02em] text-ink">
                          {item.q}
                        </span>
                        <span className="relative grid h-11 w-11 shrink-0 place-items-center bg-surface text-ink transition-colors duration-300">
                          <span className="absolute h-[1.5px] w-4 bg-current" />
                          <span
                            className={`absolute h-4 w-[1.5px] bg-current transition-transform duration-300 ${
                              isOpen ? "rotate-90" : "rotate-0"
                            }`}
                          />
                        </span>
                      </button>
                    </h3>
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={btnId}
                      className="grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                      style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                    >
                      <div className="overflow-hidden">
                        <p className="max-w-[60ch] px-6 pb-7 text-[1rem] leading-relaxed text-ink-60 md:px-8">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
