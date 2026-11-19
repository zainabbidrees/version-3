"use client";

import { useEffect, useRef, useState } from "react";

/* Small cross-fading word cycler for the contact hero ("Build a Better …").
   Fades/slides between words; honours reduced motion by holding the first.
   No global CSS — the transition lives on inline style. */

export function RotatingWord({
  words,
  interval = 2400,
  className = "",
}: {
  words: string[];
  interval?: number;
  className?: string;
}) {
  const [i, setI] = useState(0);
  const [show, setShow] = useState(true);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setShow(false);
      const t = window.setTimeout(() => {
        setI((v) => (v + 1) % words.length);
        setShow(true);
      }, 260);
      timers.current.push(t);
    }, interval);
    return () => {
      window.clearInterval(id);
      timers.current.forEach((t) => window.clearTimeout(t));
      timers.current = [];
    };
  }, [words.length, interval]);

  return (
    <span
      className={`inline-block ${className}`}
      style={{
        transition: "opacity 0.26s ease, transform 0.26s ease",
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0)" : "translateY(0.4em)",
      }}
    >
      {words[i]}
    </span>
  );
}
