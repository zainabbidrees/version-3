"use client";

import { useEffect, useRef, useState } from "react";

/* One-shot per-letter reveal — the same masked letter-drop the hero's rotating
   headline uses (.rot / .rot-mask / .rot-glyph + letterIn keyframes in
   globals.css), but played once when the line scrolls into view instead of
   cycling. Letters stay masked (translated up) until `play`, so there's no
   flash before the animation. Reduced motion is handled by the global
   .rot-glyph media query (forces the glyphs static + visible). */

const STAGGER = 45; // per-letter delay (ms) — matches RotatingHeadline

export function RevealLine({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPlay(true);
      return;
    }
    const io = new IntersectionObserver(
      ([en], obs) => {
        if (en.isIntersecting) {
          setPlay(true);
          obs.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const letters = text.split("");

  return (
    <span ref={ref} aria-label={text} className={`rot ${play ? "rot-in" : ""} ${className}`}>
      {letters.map((ch, i) => (
        <span key={i} className="rot-mask" aria-hidden="true">
          <span
            className="rot-glyph"
            style={{
              animationDelay: `${i * STAGGER}ms`,
              ...(play ? {} : { transform: "translateY(-115%)" }),
            }}
          >
            {ch === " " ? " " : ch}
          </span>
        </span>
      ))}
    </span>
  );
}
