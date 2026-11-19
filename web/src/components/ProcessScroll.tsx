"use client";

import { useEffect, useRef, useState } from "react";

/* "From Idea To Delivered" — pinned sticky-scroll stack.
   Desktop: the left image pins (stays static) while the three step panels on
   the right each take one viewport of scroll and physically stack over the
   previous one (CSS `position: sticky`, so the "force scroll" is native and
   smooth — no scroll hijacking). You pass through all three before the page
   continues. An IntersectionObserver only drives the progress indicator and
   the active-number emphasis. Mobile: steps fall back to a normal stacked list.
   Hand-rolled, no new deps. */

type Step = { num: string; title: string; body: string };

export function ProcessScroll({
  heading,
  lead,
  steps,
  image,
  imageAlt,
}: {
  heading: string;
  lead: string;
  steps: Step[];
  image: string;
  imageAlt: string;
}) {
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActive(steps.length - 1);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            const idx = Number((en.target as HTMLElement).dataset.idx);
            if (!Number.isNaN(idx)) setActive(idx);
          }
        });
      },
      // a 0-height band across the viewport centre — the panel crossing it wins
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
    );
    stepRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [steps.length]);

  return (
    <section className="relative bg-ink text-page">
      {/* heading */}
      <div className="mx-auto max-w-[1840px] px-6 pt-14 md:px-10 md:pt-20 lg:px-14">
        <div className="max-w-[48rem]">
          <h2 className="h2 text-page">{heading}</h2>
          <p className="mt-6 text-[1.02rem] leading-relaxed text-page/70">{lead}</p>
        </div>
      </div>

      {/* pinned two-column stage */}
      <div className="mx-auto max-w-[1840px] px-6 md:px-10 lg:px-14">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16">
          {/* LEFT — static pinned image */}
          <div className="lg:sticky lg:top-0 lg:flex lg:h-[100dvh] lg:items-center">
            <div className="relative mt-10 aspect-[4/5] w-full overflow-hidden bg-[color:var(--navy)] lg:mt-0 lg:aspect-auto lg:h-[76vh]">
              <img
                src={image}
                alt={imageAlt}
                loading="lazy"
                className="h-full w-full object-cover"
              />
              {/* progress bars */}
              <div className="absolute bottom-5 left-5 flex gap-2">
                {steps.map((_, i) => (
                  <span
                    key={i}
                    className="h-1 w-10 transition-colors duration-500"
                    style={{
                      background:
                        i <= active ? "var(--lime)" : "rgba(255,255,255,0.3)",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — sticky-stacking step panels */}
          <div className="relative">
            {steps.map((s, i) => {
              const on = i === active;
              return (
                <div
                  key={s.num}
                  data-idx={i}
                  ref={(el) => {
                    stepRefs.current[i] = el;
                  }}
                  className="flex items-center py-12 lg:sticky lg:top-0 lg:h-[100dvh] lg:bg-ink lg:py-0"
                >
                  <div className="w-full">
                    <span
                      className="block text-[2.5rem] font-semibold leading-none tracking-[-0.03em] transition-colors duration-500 md:text-[3rem]"
                      style={{ color: on ? "var(--lime)" : "rgba(255,255,255,0.35)" }}
                    >
                      {s.num}
                    </span>
                    <h3 className="mt-6 max-w-[16ch] text-[clamp(1.6rem,1.1rem+1.6vw,2.4rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-page">
                      {s.title}
                    </h3>
                    <p className="mt-5 max-w-[42ch] text-[1.05rem] leading-relaxed text-page/70">
                      {s.body}
                    </p>
                  </div>
                </div>
              );
            })}
            {/* trailing room so the last step can pin + dwell like the others */}
            <div aria-hidden className="hidden lg:block lg:h-[100dvh]" />
          </div>
        </div>
      </div>
    </section>
  );
}
