"use client";

import { CSSProperties, Fragment, useEffect, useRef } from "react";

/* The hero's per-letter drop-in reveal, applied to a static heading: each
   letter slides down from behind a mask, staggered. Plays once when the
   element scrolls into view. Words are kept intact so wrapping holds.
   With `fit`, the line is scaled to fill its parent's width (one-line wordmark). */

export function RevealWords({
  text,
  stagger = 38,
  className = "",
  style,
  fit = false,
  threshold = 0.35,
}: {
  text: string;
  stagger?: number;
  className?: string;
  style?: CSSProperties;
  fit?: boolean;
  threshold?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  // play the reveal when scrolled into view
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("rv-on");
      return;
    }
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("rv-on");
            obs.unobserve(en.target);
          }
        });
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  // scale the line to fill the parent's width
  useEffect(() => {
    if (!fit) return;
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;
    const resize = () => {
      el.style.fontSize = "100px";
      const w = el.getBoundingClientRect().width;
      const pw = parent.clientWidth;
      if (w > 0) el.style.fontSize = `${(100 * pw) / w}px`;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(parent);
    return () => ro.disconnect();
  }, [fit, text]);

  const words = text.split(" ");
  let gi = -1;

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={`reveal-words ${className}`.trim()}
      style={fit ? { display: "inline-block", whiteSpace: "nowrap", ...style } : style}
    >
      {words.map((w, wi) => (
        <Fragment key={wi}>
          <span className="reveal-word">
            {[...w].map((ch, ci) => {
              gi += 1;
              return (
                <span key={ci} className="rot-mask">
                  <span
                    className="rot-glyph"
                    style={{ animationDelay: `${gi * stagger}ms` }}
                  >
                    {ch}
                  </span>
                </span>
              );
            })}
          </span>
          {wi < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </span>
  );
}
