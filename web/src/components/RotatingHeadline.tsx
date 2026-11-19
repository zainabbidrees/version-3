"use client";

import { useEffect, useState } from "react";

const PHRASES = ["Get Delivered", "Come to Life", "Make an Impact", "Find Their Fit"];

// timings (ms)
const STAGGER = 45; // per-letter delay
const LETTER_DUR = 550; // single letter slide duration
const HOLD = 1700; // how long a finished phrase stays

export function RotatingHeadline() {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);

  const phrase = PHRASES[index];
  const letters = phrase.split("");
  const inTotal = letters.length * STAGGER + LETTER_DUR;

  useEffect(() => {
    // after the word has fully entered + held, start leaving
    const leaveAt = inTotal + HOLD;
    const t1 = setTimeout(() => setLeaving(true), leaveAt);
    // after it has left, advance to next phrase and reset
    const t2 = setTimeout(() => {
      setIndex((i) => (i + 1) % PHRASES.length);
      setLeaving(false);
    }, leaveAt + inTotal);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [index, inTotal]);

  return (
    <span
      key={index}
      aria-label={phrase}
      className={`rot ${leaving ? "rot-out" : "rot-in"} text-cobalt`}
    >
      {letters.map((ch, i) => (
        <span key={i} className="rot-mask" aria-hidden="true">
          <span
            className="rot-glyph"
            style={{
              animationDelay: `${(leaving ? letters.length - 1 - i : i) * STAGGER}ms`,
            }}
          >
            {ch === " " ? " " : ch}
          </span>
        </span>
      ))}
    </span>
  );
}
