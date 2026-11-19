"use client";

import { useEffect, useRef, useState } from "react";

import { RevealLine } from "./RevealLine";

/* "Built for Businesses of Every Size" — noho FAQ layout.
   - Left: a real Brand Fulfillment photo that cross-fades to whichever row is
     open; sticky on desktop so it stays in view while scanning the list.
   - Right: the noho FAQ accordion — filled taupe bars, each with a white
     square button whose "+" rotates to "×" when its row expands the answer
     inline. One row open at a time; the image remembers the last one opened.
   Hand-rolled CSS motion to match the rest of the site (no new deps). */

type Segment = {
  num: string;
  label: string;
  body: string;
  img: string;
  alt: string;
};

// Content verbatim; images are the real Brand Fulfillment section-3 photos.
const SEGMENTS: Segment[] = [
  {
    num: "01",
    label: "Small Businesses",
    body: "Professional branded apparel and promotional products without the hassle of managing multiple vendors.",
    img: "/images/home/small-businesses-cafe.webp",
    alt: "Three coffee shop staff in logo-embroidered caps and aprons laughing while brewing pour-over",
  },
  {
    num: "02",
    label: "Growing Companies",
    body: "As your team grows, we help you keep your apparel, merchandise, and branding organized and consistent.",
    img: "/images/home/growing-companies-team.webp",
    alt: "Team gathered around an office table of apparel samples and laptops, listening to a colleague",
  },
  {
    num: "03",
    label: "Franchise Organizations",
    body: "Create consistent branded apparel and merchandise across locations while giving individual teams an easy way to order.",
    img: "/images/home/franchise-organizations.webp",
    alt: "Three service technicians in matching navy polos carrying toolboxes up to a customer's door",
  },
  {
    num: "04",
    label: "Corporate Offices",
    body: "Simplify company apparel, employee uniforms, promotional products, and branded merchandise in one place.",
    img: "/images/home/corporate-offices.webp",
    alt: "Four colleagues in matching navy vests and lanyards walking through an office lobby",
  },
  {
    num: "05",
    label: "Multi-Location Businesses",
    body: "Keep your brand consistent across multiple locations with centralized products, ordering, and fulfillment.",
    img: "/images/home/multi-location-businesses.webp",
    alt: "Aerial view of a town's main street with map pins over four storefronts",
  },
];

export function BusinessSizes() {
  const [open, setOpen] = useState(0); // -1 = all collapsed
  const [imgIdx, setImgIdx] = useState(0); // persists last-opened for the image
  const revealRef = useRef<HTMLDivElement>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const select = (i: number) => {
    setOpen(i);
    setImgIdx(i);
  };

  // hover-intent: a row only opens once the cursor rests on it, so passing
  // the mouse across the list doesn't make the section jump around.
  const scheduleSelect = (i: number) => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => select(i), 200);
  };
  const cancelSchedule = () => {
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }
  };
  useEffect(
    () => () => {
      if (hoverTimer.current) clearTimeout(hoverTimer.current);
    },
    [],
  );

  /* fade the block in on scroll-in (matches Stories / .reveal-up) */
  useEffect(() => {
    const el = revealRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-in");
      return;
    }
    const io = new IntersectionObserver(
      ([en], obs) => {
        if (en.isIntersecting) {
          el.classList.add("is-in");
          obs.disconnect();
        }
      },
      { threshold: 0.18 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="relative py-14 md:py-20">
      <div className="mx-auto max-w-[1840px] px-6 md:px-10 lg:px-14">
        {/* header */}
        <div ref={revealRef} className="reveal-up">
          <h2 className="h-display text-ink">
            <span className="block">Built for Businesses</span>
            <span className="block">
              <RevealLine text="of Every Size" className="text-ink" />
            </span>
          </h2>
          <p className="mt-6 max-w-[46rem] text-[1.02rem] leading-relaxed text-ink-60">
            Small businesses, growing companies, franchise organizations, and
            multi-location teams all have different branded merchandise needs.
            We create solutions that fit the way your business operates.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 lg:mt-20 lg:grid-cols-2 lg:items-stretch lg:gap-8">
          {/* image panel — cross-fading stack; fills the accordion height so both columns stay equal */}
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-element-2 lg:aspect-auto lg:h-full">
              {SEGMENTS.map((s, i) => (
                <img
                  key={s.img}
                  src={s.img}
                  alt={s.alt}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{
                    opacity: i === imgIdx ? 1 : 0,
                    transform: i === imgIdx ? "scale(1)" : "scale(1.04)",
                  }}
                />
              ))}
          </div>

          {/* FAQ-style accordion */}
          <div className="flex flex-col gap-3">
            {SEGMENTS.map((s, i) => {
              const isOpen = i === open;
              return (
                <div
                  key={s.img}
                  onMouseEnter={() => scheduleSelect(i)}
                  onMouseLeave={cancelSchedule}
                  className="relative overflow-hidden"
                  style={{ boxShadow: "inset 0 0 0 1px rgba(0,29,63,0.10)" }}
                >
                  {/* navy fill crossfades in — navy and lime arrive together, so
                      no lime-on-white flash as a row opens or closes */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 z-0"
                    style={{
                      background: "var(--navy)",
                      opacity: isOpen ? 1 : 0,
                      transition: "opacity 0.35s ease",
                    }}
                  />

                  <button
                    type="button"
                    onClick={() => {
                      cancelSchedule();
                      select(i);
                    }}
                    onFocus={() => {
                      cancelSchedule();
                      select(i);
                    }}
                    aria-expanded={isOpen}
                    className="relative z-10 flex w-full items-center gap-5 p-4 text-left sm:gap-6 sm:p-5"
                  >
                    <span
                      className="shrink-0 text-[0.82rem] font-medium tabular-nums transition-colors duration-300"
                      style={{ color: isOpen ? "rgba(222,226,30,0.72)" : "var(--ink-40)" }}
                    >
                      {s.num}
                    </span>

                    <span
                      className="flex-1 text-[clamp(1.05rem,0.85rem+0.7vw,1.375rem)] font-semibold tracking-[-0.02em] transition-colors duration-300"
                      style={{ color: isOpen ? "var(--lime)" : "var(--ink)" }}
                    >
                      {s.label}
                    </span>

                    {/* square button — "+" rotates to "×" when the row is active */}
                    <span
                      className="flex h-12 w-12 shrink-0 items-center justify-center transition-[background-color,color] duration-300 active:scale-95 sm:h-14 sm:w-14"
                      style={{
                        background: isOpen ? "var(--lime)" : "var(--navy)",
                        color: isOpen ? "var(--navy)" : "#ffffff",
                      }}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        aria-hidden="true"
                        style={{
                          transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                          transition:
                            "transform 0.35s cubic-bezier(0.22,1,0.36,1)",
                        }}
                      >
                        <path
                          d="M9 2.5v13M2.5 9h13"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="square"
                        />
                      </svg>
                    </span>
                  </button>

                  {/* answer — expands inline (grid-rows 0fr→1fr) */}
                  <div
                    className="relative z-10 grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p
                        className="max-w-[52ch] px-4 pb-6 pl-[3.1rem] text-[0.97rem] leading-relaxed transition-colors duration-300 sm:px-5 sm:pl-[3.4rem]"
                        style={{ color: isOpen ? "rgba(222,226,30,0.85)" : "var(--ink-60)" }}
                      >
                        {s.body}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
