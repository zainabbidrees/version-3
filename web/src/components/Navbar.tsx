"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/Logo";

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
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;
  const isServicesActive = services.some((s) => pathname === s.href);
  // dark-navbar link: lime + bold when it's the current page
  const linkCls = (active: boolean) =>
    `text-[0.95rem] transition-colors ${
      active ? "font-semibold text-[var(--lime)]" : "text-white/75 hover:text-white"
    }`;

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-ink/95 backdrop-blur-sm border-b border-white/10">
      <nav className="mx-auto flex max-w-[1840px] items-center justify-between px-6 py-3 md:px-10 lg:px-14 md:py-3.5">
        {/* Logo lockup */}
        <a href="/" aria-label="Brand Fulfillment home" className="text-[0.95rem] text-white">
          <Logo tone="white" height={38} />
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-7 md:flex">
          <a href="/" className={linkCls(isActive("/"))}>
            Home
          </a>

          {/* Services dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button className={linkCls(isServicesActive)}>
              Services
            </button>
            {servicesOpen && (
              <div className="absolute left-1/2 top-full z-50 w-60 -translate-x-1/2 pt-3">
                <div className="rounded-2xl bg-surface p-2 shadow-[0_12px_40px_rgba(60,60,60,0.12)]">
                  {services.map((s) => (
                    <a
                      key={s.href}
                      href={s.href}
                      aria-current={isActive(s.href) ? "page" : undefined}
                      className={`block rounded-xl px-4 py-2.5 text-[0.9rem] transition-colors ${
                        isActive(s.href)
                          ? "bg-lime/25 font-semibold text-ink"
                          : "text-ink/80 hover:bg-lime/25 hover:text-ink"
                      }`}
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
              aria-current={isActive(l.href) ? "page" : undefined}
              className={linkCls(isActive(l.href))}
            >
              {l.label}
            </a>
          ))}

          {/* Primary CTA — Electric Lime pill, navy text */}
          <a
            href="/contact"
            className="rounded-full bg-[var(--lime)] px-5 py-2.5 text-[0.9rem] font-semibold text-ink transition-opacity hover:opacity-90"
          >
            Request a Discovery Meeting
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 md:hidden"
        >
          <span className="relative block h-[14px] w-[18px]">
            <span
              className={`absolute left-0 h-[2px] w-full bg-white transition-transform ${open ? "top-[6px] rotate-45" : "top-0"}`}
            />
            <span
              className={`absolute left-0 top-[6px] h-[2px] w-full bg-white transition-opacity ${open ? "opacity-0" : "opacity-100"}`}
            />
            <span
              className={`absolute left-0 h-[2px] w-full bg-white transition-transform ${open ? "top-[6px] -rotate-45" : "top-[12px]"}`}
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
                aria-current={isActive(l.href) ? "page" : undefined}
                className={`rounded-xl px-3 py-3 text-[1rem] ${
                  isActive(l.href)
                    ? "bg-lime/25 font-semibold text-ink"
                    : "text-ink/85 hover:bg-lime/25"
                }`}
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
                  aria-current={isActive(s.href) ? "page" : undefined}
                  className={`rounded-xl px-3 py-3 text-[1rem] ${
                    isActive(s.href)
                      ? "bg-lime/25 font-semibold text-ink"
                      : "text-ink/85 hover:bg-lime/25"
                  }`}
                >
                  {s.label}
                </a>
              ))}
            </div>
            <a
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-[var(--lime)] px-5 py-3 text-center text-[0.95rem] font-semibold text-ink"
            >
              Request a Discovery Meeting
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
