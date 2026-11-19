"use client";

import { useEffect, useRef, useState } from "react";

/* One-shot per-letter reveal — the same masked letter-drop the hero's rotating
   headline uses (.rot / .rot-mask / .rot-glyph + letterIn keyframes in
   globals.css), but played once when the line scrolls into view instead of
   cycling. Letters stay masked (translated up) until `play`, so there's no
   flash before the animation. Reduced motion is handled by the global
   .rot-glyph media query (forces the glyphs static + visible).

   Letters are grouped per word (each word is its own inline-flex group) so
   line wrapping only ever happens between words, never mid-word. */

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

  const words = text.split(" ");
  let gi = 0; // running glyph index so the stagger is continuous across words

  const glyph = (ch: string, key: string | number) => {
    const delay = gi++ * STAGGER;
    return (
      <span key={key} className="rot-mask" aria-hidden="true">
        <span
          className="rot-glyph"
          style={{
            animationDelay: `${delay}ms`,
            ...(play ? {} : { transform: "translateY(-115%)" }),
          }}
        >
          {ch}
        </span>
      </span>
    );
  };

  return (
    <span ref={ref} aria-label={text} className={`rot ${play ? "rot-in" : ""} ${className}`}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-flex">
          {word.split("").map((ch, ci) => glyph(ch, ci))}
          {wi < words.length - 1 && glyph(" ", "sp")}
        </span>
      ))}
    </span>
  );
}
