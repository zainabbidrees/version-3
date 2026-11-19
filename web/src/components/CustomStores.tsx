"use client";

import { useEffect, useRef, useState } from "react";
import { RevealWords } from "@/components/RevealWords";
import { ScrollGallery, type GalleryTile } from "@/components/ScrollGallery";

/* Custom Online Stores page — Brand Fulfillment content, rebuilt in noho style
   (warm paper + ink, Switzer, editorial spacing). Content verbatim from the
   source /custom-online-stores page. One IntersectionObserver reveals the
   .reveal-up elements; the FAQ is a hand-rolled accordion. No new deps. */

const PRODUCTS = [
  "Branded Company Apparel",
  "Employee Uniforms",
  "Corporate Apparel",
  "T-Shirts & Polos",
  "Jackets & Outerwear",
  "Hats & Headwear",
  "Promotional Products",
  "Company Gifts",
];

/* noho product-strip tiles: alternating photo tiles and solid brand-color
   tiles for a varied, colorful horizontal gallery (matches the apparels page). */
const STORE_TONES = [
  { bg: "var(--lime)", fg: "text-ink" },
  { bg: "var(--navy)", fg: "text-page" },
  { bg: "var(--beige)", fg: "text-ink" },
  { bg: "var(--slate)", fg: "text-ink" },
];
let storeToneCursor = 0;
// Real Brand Fulfillment photography for the product tiles.
const STORE_IMG: Record<string, string> = {
  "Branded Company Apparel": "/images/apparel/hero-apparel-rack.webp",
  "Employee Uniforms": "/images/apparel/employee-uniforms.webp",
  "Corporate Apparel": "/images/apparel/corporate-apparel.webp",
  "T-Shirts & Polos": "/images/apparel/t-shirts.webp",
  "Jackets & Outerwear": "/images/apparel/jackets-outerwear.webp",
  "Hats & Headwear": "/images/apparel/hats-headwear.webp",
  "Promotional Products": "/images/promo/hero-flatlay.webp",
  "Company Gifts": "/images/promo/company-gifts.webp",
};
const STORE_TILES: GalleryTile[] = PRODUCTS.map((name, i) => {
  const photo = i % 2 === 0;
  return {
    name,
    photo,
    src: photo ? STORE_IMG[name] : null,
    tone: photo ? null : STORE_TONES[storeToneCursor++ % STORE_TONES.length],
  };
});

const SETUP = [
  {
    n: "01",
    t: "Select your products",
    d: "We help you choose the apparel and merchandise your team needs.",
    img: "/images/online-stores/select-products.webp",
  },
  {
    n: "02",
    t: "Set ordering requirements",
    d: "Decide who can order what, so orders stay on budget and on brand.",
    img: "/images/online-stores/ordering-requirements.webp",
  },
  {
    n: "03",
    t: "Launch your storefront",
    d: "A store that reflects your brand, ready for your team.",
    img: "/images/online-stores/launch-storefront.webp",
  },
];

const LOCATIONS = ["Retail", "Delivery", "Office", "Warehouse"];

const ONGOING = [
  { t: "New employees", d: "Need uniforms from day one." },
  { t: "Existing employees", d: "Need replacements over time." },
  { t: "Growing locations", d: "Need additional products." },
];

const SERVICES = [
  "Product sourcing",
  "Branded apparel",
  "Employee uniforms",
  "Embroidery",
  "Screen printing",
  "Promotional products",
  "Inventory",
  "Ordering",
  "Fulfillment",
];

const FAQ = [
  {
    q: "Is there a minimum order quantity?",
    a: "It depends on the product and decoration — we set any minimums with you during setup.",
  },
  {
    q: "Can individual employees place their own orders?",
    a: "Yes — your team orders what they need directly through the store.",
  },
  {
    q: "Who is responsible for payment?",
    a: "However your program is set up — the company can pay centrally, or employees can pay at checkout.",
  },
  {
    q: "Where can orders be shipped?",
    a: "Wherever you need — a single location, multiple locations, or individual employee addresses.",
  },
  {
    q: "Are products kept in stock or made after each order?",
    a: "Both — some items are stocked for quick turnaround, others are produced after ordering.",
  },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2 text-[0.78rem] font-medium uppercase tracking-[0.18em] text-ink-40">
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-poppy" />
      {children}
    </p>
  );
}

function Cta({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) {
  const base =
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-[0.95rem] font-medium transition-[transform,opacity,background-color,border-color] duration-200 active:scale-[0.98]";
  const styles =
    variant === "primary"
      ? "bg-ink text-white hover:opacity-90"
      : "border border-ink/20 text-ink hover:border-ink/45 hover:bg-ink/[0.03]";
  return (
    <a href={href} className={`${base} ${styles}`}>
      {children}
    </a>
  );
}

export function CustomStores() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<number | null>(0);

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
      { threshold: 0.15 },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const wrap = "mx-auto max-w-[1840px] px-6 md:px-10 lg:px-14";
  const section = "py-14 md:py-20";

  return (
    <div ref={rootRef}>
      {/* Hero */}
      <section className="bg-ink text-page">
        <div
          className={`${wrap} grid items-center gap-12 pb-16 pt-32 md:grid-cols-[1.05fr_1fr] md:gap-14 md:pb-24 md:pt-44`}
        >
          {/* left — copy */}
          <div>
            <p className="reveal-up inline-flex items-center gap-2 text-[0.78rem] font-medium uppercase tracking-[0.18em] text-poppy">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-poppy" />
              Custom online stores
            </p>
            <h1
              aria-label="One Store. Easy Ordering. Consistent Branding."
              className="mt-6 font-semibold leading-[0.98] tracking-[-0.04em] text-poppy"
              style={{
                fontSize: "clamp(2.4rem, 1rem + 3.1vw, 4.3rem)",
                textWrap: "balance",
              }}
            >
              <RevealWords text="One Store. Easy Ordering. Consistent Branding." />
            </h1>
            <p
              className="reveal-up mt-7 max-w-[46ch] text-[1.1rem] leading-relaxed text-poppy/75"
              style={{ transitionDelay: "120ms" }}
            >
              Give your team a simple way to order approved branded merchandise
              through a custom online store built around your business.
            </p>
            <div
              className="reveal-up mt-9 flex flex-col gap-3 sm:flex-row"
              style={{ transitionDelay: "200ms" }}
            >
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-[var(--lime)] px-7 py-3.5 text-[0.95rem] font-semibold text-ink transition-[transform,opacity] duration-200 hover:opacity-90 active:scale-[0.98]"
              >
                Request a Discovery Meeting
              </a>
              <a
                href="/how-it-works"
                className="inline-flex items-center justify-center rounded-full border border-page/30 px-7 py-3.5 text-[0.95rem] font-medium text-page transition-[transform,border-color,background-color] duration-200 hover:border-page/60 hover:bg-page/5 active:scale-[0.98]"
              >
                See How It Works
              </a>
            </div>
          </div>

          {/* right — image composition */}
          <div
            className="reveal-up relative mt-4 md:mt-0"
            style={{ transitionDelay: "160ms" }}
          >
            <div className="overflow-hidden rounded-2xl">
              <img
                src="/images/online-stores/hero-storefront.webp"
                alt="Branded apparel and merchandise ready to order"
                className="aspect-[4/3] w-full object-cover"
                loading="eager"
              />
            </div>
            <div className="absolute -bottom-6 -left-5 w-36 overflow-hidden rounded-xl border-[5px] border-ink shadow-[0_20px_45px_rgba(0,0,0,0.4)] sm:w-44 md:-bottom-8 md:-left-8">
              <img
                src="/images/online-stores/easy-ordering.webp"
                alt="Ordering branded products through the custom store"
                className="aspect-square w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Your store — noho scroll-linked product strip (as on the apparels page) */}
      <ScrollGallery
        tiles={STORE_TILES}
        eyebrow="Your store"
        headingLines={["Custom Online Stores", "For Your Business"]}
        sub="Give your employees, locations, and franchisees one place to order approved branded products — everything your store can include, without your team coordinating each request."
        kicker="In your store"
        disc="Explore"
        id="your-store"
        tileAria="branded product"
      />

      {/* Setup — noho social-card grid: image + filled hover-overlay reveal */}
      <section className={`${wrap} ${section}`}>
        <div className="reveal-up">
          <Eyebrow>Setup</Eyebrow>
        </div>
        <h2
          className="reveal-up mt-5 h-display max-w-[14ch] text-ink"
          style={{ transitionDelay: "60ms" }}
        >
          Your Products. Your Brand. Your Store.
        </h2>
        <p
          className="reveal-up mt-6 max-w-[56ch] text-[1.05rem] leading-relaxed text-ink-60"
          style={{ transitionDelay: "120ms" }}
        >
          We handle the details behind the store, so you don&rsquo;t spend time
          coordinating products, vendors and orders.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 md:mt-14 md:grid-cols-3 md:gap-7">
          {SETUP.map((s, i) => (
            <article
              key={s.n}
              className="reveal-up group block border border-ink/10 bg-surface p-3 shadow-[0_20px_52px_-28px_rgba(0,29,63,0.3)]"
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-ink/[0.05]">
                <img
                  src={s.img}
                  alt={s.t}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                />
                {/* slight navy scrim wipes up on hover — the image stays
                    visible, the step detail reads over the darkened base */}
                <div className="absolute inset-0 flex flex-col justify-end gap-2 bg-gradient-to-t from-[var(--navy)]/95 via-[var(--navy)]/45 to-transparent p-5 [transform:translateY(100%)] transition-transform duration-[650ms] ease-[cubic-bezier(0.65,0,0.35,1)] will-change-transform group-hover:[transform:translateY(0)]">
                  <span className="flex items-center justify-between gap-3">
                    <span className="text-[clamp(1.9rem,5vw,2.6rem)] font-semibold leading-none tracking-[-0.04em] text-[var(--lime)]">
                      {s.n}
                    </span>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                      className="shrink-0 text-[var(--lime)]"
                    >
                      <path
                        d="M9 6.65C9 6.65 15.94 6.11 16.92 7.08C17.89 8.06 17.35 15 17.35 15M16.5 7.5L6.5 17.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <p className="max-w-[26ch] text-[0.98rem] font-medium leading-snug text-page">
                    {s.t}
                  </p>
                </div>
              </div>
              <div className="px-2 pb-1 pt-5">
                <span className="text-[0.82rem] font-semibold tabular-nums text-[var(--lime)]">
                  {s.n}
                </span>
                <h3 className="mt-2 text-[1.2rem] font-semibold leading-[1.15] tracking-[-0.02em] text-ink">
                  {s.t}
                </h3>
                <p className="mt-2 text-[0.97rem] leading-relaxed text-ink-60">
                  {s.d}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="reveal-up mt-12">
          <Cta href="/contact">Request a Discovery Meeting</Cta>
        </div>
      </section>

      {/* Every location */}
      <section className="bg-ink text-page">
        <div className={`${wrap} ${section}`}>
          <div className="reveal-up">
            <p className="inline-flex items-center gap-2 text-[0.78rem] font-medium uppercase tracking-[0.18em] text-page/45">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-poppy" />
              Every location
            </p>
          </div>
          <h2
            className="reveal-up mt-5 h-display max-w-[16ch] text-page"
            style={{ transitionDelay: "60ms" }}
          >
            Keep Your Brand Consistent Across Locations
          </h2>
          <p
            className="reveal-up mt-6 max-w-[56ch] text-[1.05rem] leading-relaxed text-page/65"
            style={{ transitionDelay: "120ms" }}
          >
            Every location gets the same approved products and branding, while we
            manage the program as your needs change.
          </p>
          <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-page/10 md:grid-cols-4">
            {LOCATIONS.map((l, i) => (
              <div
                key={l}
                className="reveal-up bg-ink px-6 py-10 md:py-14"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <span className="text-[0.8rem] font-semibold tabular-nums text-poppy">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-4 text-[clamp(1.3rem,1rem+1vw,1.75rem)] font-semibold leading-none tracking-[-0.03em] text-page">
                  {l}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Over time */}
      <section className={`${wrap} ${section}`}>
        <div className="grid gap-10 md:grid-cols-[1fr_1.1fr] md:gap-16">
          <div>
            <div className="reveal-up">
              <Eyebrow>Over time</Eyebrow>
            </div>
            <h2
              className="reveal-up mt-5 h-display max-w-[10ch] text-ink"
              style={{ transitionDelay: "60ms" }}
            >
              Built For Ongoing Ordering
            </h2>
            <p
              className="reveal-up mt-6 max-w-[40ch] text-[1.05rem] leading-relaxed text-ink-60"
              style={{ transitionDelay: "120ms" }}
            >
              Your branded apparel and merchandise needs don&rsquo;t stop after
              the first order.
            </p>
          </div>
          <div className="md:pt-14">
            <p className="reveal-up text-[clamp(1.4rem,1rem+1.4vw,2rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-ink">
              Reordering made simple
            </p>
            <p className="reveal-up mt-3 max-w-[44ch] text-[1rem] leading-relaxed text-ink-60">
              We manage products, ordering and fulfillment as you grow.
            </p>
            <div className="mt-8 border-t border-ink/12">
              {ONGOING.map((o, i) => (
                <div
                  key={o.t}
                  className="reveal-up flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-ink/12 py-5"
                  style={{ transitionDelay: `${i * 70}ms` }}
                >
                  <span className="text-[1.1rem] font-semibold tracking-[-0.02em] text-ink">
                    {o.t}
                  </span>
                  <span className="text-[0.98rem] text-ink-60">{o.d}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Full service */}
      <section className="bg-element-2">
        <div className={`${wrap} ${section}`}>
          <div className="reveal-up">
            <Eyebrow>Full service</Eyebrow>
          </div>
          <h2
            className="reveal-up mt-5 h-display max-w-[12ch] text-ink"
            style={{ transitionDelay: "60ms" }}
          >
            More Than An Online Store
          </h2>
          <p
            className="reveal-up mt-6 max-w-[56ch] text-[1.05rem] leading-relaxed text-ink-60"
            style={{ transitionDelay: "120ms" }}
          >
            The storefront is only one part of the solution. We become an
            extension of your team, managing the products and fulfillment behind
            your store.
          </p>
          <div className="reveal-up mt-8 flex flex-wrap gap-2.5">
            {SERVICES.map((s) => (
              <span
                key={s}
                className="inline-flex items-center rounded-full border border-ink/15 bg-surface/60 px-4 py-2 text-[0.92rem] font-medium text-ink/80"
              >
                {s}
              </span>
            ))}
          </div>
          <div className="reveal-up mt-14 max-w-[60ch] border-t border-ink/15 pt-10">
            <p className="text-[clamp(1.4rem,1rem+1.4vw,2rem)] font-semibold leading-[1.15] tracking-[-0.03em] text-ink">
              One trusted partner
            </p>
            <p className="mt-3 text-[1.05rem] leading-relaxed text-ink-60">
              Instead of managing multiple vendors and ordering processes, you
              have one team keeping your program organized, from product
              selection through fulfillment.
            </p>
            <div className="mt-8">
              <Cta href="/contact">Request a Discovery Meeting</Cta>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={`${wrap} ${section}`}>
        <div className="grid gap-10 md:grid-cols-[1fr_1.3fr] md:gap-16">
          <div>
            <div className="reveal-up">
              <Eyebrow>Good to know</Eyebrow>
            </div>
            <h2
              className="reveal-up mt-5 h-display max-w-[9ch] text-ink"
              style={{ transitionDelay: "60ms" }}
            >
              Common Ordering Questions
            </h2>
            <p
              className="reveal-up mt-6 max-w-[40ch] text-[1rem] leading-relaxed text-ink-60"
              style={{ transitionDelay: "120ms" }}
            >
              The practical details of how a store works day to day. Answers are
              confirmed with your team during setup.
            </p>
          </div>
          <div className="reveal-up border-t border-ink/12">
            {FAQ.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={f.q} className="border-b border-ink/12">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="text-[clamp(1.05rem,0.9rem+0.5vw,1.3rem)] font-semibold leading-[1.2] tracking-[-0.02em] text-ink">
                      {f.q}
                    </span>
                    <span
                      className="relative mt-1 h-4 w-4 shrink-0"
                      aria-hidden="true"
                    >
                      <span className="absolute left-0 top-1/2 h-[1.5px] w-full -translate-y-1/2 bg-ink" />
                      <span
                        className={`absolute left-1/2 top-0 h-full w-[1.5px] -translate-x-1/2 bg-ink transition-transform duration-300 ${isOpen ? "scale-y-0" : "scale-y-100"}`}
                      />
                    </span>
                  </button>
                  <div
                    className="grid transition-[grid-template-rows] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-[52ch] pb-6 text-[1rem] leading-relaxed text-ink-60">
                        {f.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
