"use client";

import { useState } from "react";

const services = [
  { label: "Apparel & Uniforms", href: "/apparel-uniforms" },
  { label: "Custom Online Stores", href: "/custom-online-stores" },
  { label: "Promotional Products", href: "/promotional-products" },
];

const links = [
  { label: "Home", href: "/" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4 md:px-10 md:py-5">
        {/* Wordmark */}
        <a
          href="/"
          className="text-[1.05rem] font-semibold tracking-[-0.03em] text-ink"
        >
          Brand Fulfillment
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-7 md:flex">
          <a
            href="/"
            className="text-[0.95rem] text-ink/80 transition-colors hover:text-ink"
          >
            Home
          </a>

          {/* Services dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button className="text-[0.95rem] text-ink/80 transition-colors hover:text-ink">
              Services
            </button>
            {servicesOpen && (
              <div className="absolute left-1/2 top-full z-50 w-60 -translate-x-1/2 pt-3">
                <div className="rounded-2xl bg-surface p-2 shadow-[0_12px_40px_rgba(60,60,60,0.12)]">
                  {services.map((s) => (
                    <a
                      key={s.href}
                      href={s.href}
                      className="block rounded-xl px-4 py-2.5 text-[0.9rem] text-ink/80 transition-colors hover:bg-element hover:text-ink"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {links.slice(1).map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[0.95rem] text-ink/80 transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}

          {/* Primary CTA — noho ink pill */}
          <a
            href="/contact"
            className="rounded-full bg-ink px-5 py-2.5 text-[0.9rem] font-medium text-white transition-opacity hover:opacity-90"
          >
            Request a Discovery Meeting
          </a>
        </div>

        {/* Mobile menu button — noho white rounded square */}
        <button
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface md:hidden"
        >
          <span className="relative block h-[14px] w-[18px]">
            <span
              className={`absolute left-0 h-[2px] w-full bg-ink transition-transform ${open ? "top-[6px] rotate-45" : "top-0"}`}
            />
            <span
              className={`absolute left-0 top-[6px] h-[2px] w-full bg-ink transition-opacity ${open ? "opacity-0" : "opacity-100"}`}
            />
            <span
              className={`absolute left-0 h-[2px] w-full bg-ink transition-transform ${open ? "top-[6px] -rotate-45" : "top-[12px]"}`}
            />
          </span>
        </button>
      </nav>

      {/* Mobile overlay */}
      {open && (
        <div className="mx-4 rounded-2xl bg-surface p-4 md:hidden">
          <div className="flex flex-col">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-[1rem] text-ink/85 hover:bg-element"
              >
                {l.label}
              </a>
            ))}
            <div className="mt-1 border-t border-ink/10 pt-1">
              <p className="px-3 py-2 text-[0.75rem] uppercase tracking-wide text-ink-40">
                Services
              </p>
              {services.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-[1rem] text-ink/85 hover:bg-element"
                >
                  {s.label}
                </a>
              ))}
            </div>
            <a
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-ink px-5 py-3 text-center text-[0.95rem] font-medium text-white"
            >
              Request a Discovery Meeting
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
