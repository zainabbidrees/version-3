"use client";

import { useEffect, useRef } from "react";
import { RevealWords } from "@/components/RevealWords";

/* Site footer — Brand Fulfillment content, rebuilt in noho's dark-ink,
   big-type style. Keeps the source site's signature micro-interaction: the
   diagonal arrow on each quick-action link flies out top-right while a fresh
   one slides in from bottom-left (0.25s, cubic-bezier(.4,0,.2,1)).
   The oversized wordmark replaces the original's yellow-green gradient with a
   quiet paper watermark (no banned hues). Hand-rolled reveal, no new deps. */

const ACTIONS = [
  { label: "Email us", href: "mailto:shop@fulfillmentdelivers.com" },
  { label: "Call us", href: "tel:4028193375" },
  {
    label: "Visit us",
    href: "https://www.google.com/maps/search/?api=1&query=3730%20S%20149th%20St%20%23109%2C%20Omaha%2C%20NE%2068144",
    external: true,
  },
  { label: "Book a meeting", href: "/contact" },
];

const COLUMNS = [
  {
    title: "Services",
    links: [
      { label: "Apparel & Uniforms", href: "/apparel-uniforms" },
      { label: "Custom Online Stores", href: "/custom-online-stores" },
      { label: "Promotional Products", href: "/promotional-products" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Home", href: "/" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "About Us", href: "/about" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Get in touch",
    links: [
      { label: "shop@fulfillmentdelivers.com", href: "mailto:shop@fulfillmentdelivers.com" },
      { label: "402-819-3375", href: "tel:4028193375" },
    ],
  },
];

/* diagonal arrow with the swap-on-hover motion from the source footer */
function SwapArrow() {
  const ease = "cubic-bezier(0.4,0,0.2,1)";
  const path =
    "M9 6.65032C9 6.65032 15.9383 6.10759 16.9154 7.08463C17.8924 8.06167 17.3496 15 17.3496 15M16.5 7.5L6.5 17.5";
  return (
    <span className="relative inline-block h-3.5 w-3.5 shrink-0 overflow-hidden">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full transition-transform duration-[250ms] group-hover:translate-x-full group-hover:-translate-y-full"
        style={{ transitionTimingFunction: ease }}
      >
        <path d={path} stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full -translate-x-full translate-y-full transition-transform duration-[250ms] group-hover:translate-x-0 group-hover:translate-y-0"
        style={{ transitionTimingFunction: ease }}
      >
        <path d={path} stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export function Footer() {
  const rootRef = useRef<HTMLElement>(null);

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
      { threshold: 0.12 },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <footer
      ref={rootRef}
      className="relative overflow-hidden bg-ink pt-16 text-page md:pt-20 lg:fixed lg:inset-x-0 lg:bottom-0 lg:z-0 lg:flex lg:min-h-[100dvh] lg:flex-col lg:justify-between lg:pt-28"
    >
      <div className="mx-auto w-full max-w-[1600px] px-6 md:px-10">
        {/* quick actions — the arrow-swap row */}
        <ul className="reveal-up grid grid-cols-1 divide-y divide-page/15 border-y border-page/15 md:grid-cols-4 md:divide-x md:divide-y-0">
          {ACTIONS.map((a, i) => (
            <li key={a.label}>
              <a
                href={a.href}
                {...(a.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className={`group flex items-center justify-between gap-4 py-6 text-[1.05rem] font-medium tracking-[-0.01em] text-page md:px-7 ${
                  i === 0 ? "md:pl-0" : ""
                } ${i === ACTIONS.length - 1 ? "md:pr-0" : ""}`}
              >
                {a.label}
                <SwapArrow />
              </a>
            </li>
          ))}
        </ul>

        {/* nav columns + office */}
        <div className="reveal-up grid grid-cols-2 gap-x-8 gap-y-12 py-16 md:grid-cols-4 md:py-20">
          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="text-[0.72rem] font-medium uppercase tracking-[0.14em] text-page/45">
                {col.title}
              </p>
              <ul className="mt-5 flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-[0.98rem] leading-snug text-page/70 transition-colors [overflow-wrap:anywhere] hover:text-page"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.14em] text-page/45">
              Office
            </p>
            <address className="mt-5 text-[0.98rem] not-italic leading-relaxed text-page/70">
              3730 S 149th St #109
              <br />
              Omaha, NE 68144
            </address>
          </div>
        </div>

        {/* bottom lockup */}
        <div className="reveal-up flex flex-col gap-6 border-t border-page/15 py-10 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[1.15rem] font-semibold tracking-[-0.02em] text-page">
              Brand Fulfillment
            </p>
            <p className="mt-1.5 text-[0.9rem] text-page/55">Where Brands Get Delivered</p>
          </div>
          <small className="text-[0.82rem] text-page/45">
            © 2026 Brand Fulfillment. All rights reserved.
          </small>
        </div>
      </div>

      {/* oversized wordmark — stretched full width, quiet paper watermark */}
      <div className="mx-auto mt-16 w-full max-w-[1600px] px-6 pb-10 md:px-10 md:pb-14 lg:mt-auto">
        <div
          role="img"
          aria-label="Brand Fulfillment"
          className="w-full overflow-hidden text-center"
        >
          <RevealWords
            text="BRAND FULFILLMENT"
            fit
            stagger={28}
            threshold={0.9}
            style={{
              fontWeight: 600,
              letterSpacing: "-0.02em",
              lineHeight: 1,
              color: "rgba(241, 238, 233, 0.14)",
            }}
          />
        </div>
      </div>
    </footer>
  );
}
