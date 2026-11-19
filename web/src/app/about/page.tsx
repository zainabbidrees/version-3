import type { Metadata } from "next";
import { PageShell } from "@/components/sections";
import { RevealWords } from "@/components/RevealWords";
import { RevealLine } from "@/components/RevealLine";

export const metadata: Metadata = {
  title: "About Brand Fulfillment | Branded Merchandise Solutions",
  description:
    "We bring custom apparel, uniforms, promotional products, and online company stores together to make branded purchasing easier to manage.",
};

/* About — rebuilt in the noho language used across the service pages: a
   Production Ink navy hero with an Electric Lime headline aligned to the shared
   max-w-[1840px] rail, then an editorial run of goal, "one partner" simplify
   list, core values, promise/vision, and a navy testimonial set. Square corners
   per brand, pills kept for CTAs. Copy is verbatim from the Brand Fulfillment
   site; imagery uses the project's on-brand product shots. */

const WRAP = "mx-auto max-w-[1840px] px-6 md:px-10 lg:px-14";

const SIMPLIFY = [
  "Providing one online storefront",
  "Sourcing quality products",
  "Working with trusted vendors",
  "Recommending the right products",
  "Managing vendor relationships",
  "Maintaining consistent branding",
  "Offering competitive pricing",
  "Saving your team valuable time",
];

const VALUES = [
  {
    num: "01",
    title: "Quality.",
    tagline: "If it carries your brand, it gets our best.",
    body: "We pay attention to the details, choose products that perform, and take pride in delivering items that look great and last. High-quality materials and careful handling mean your brand always shines.",
  },
  {
    num: "02",
    title: "Speed.",
    tagline: "We move fast, but never rush.",
    body: "We focus on quick turnarounds, clear communication, and smooth processes. We help you choose products that fit your timeline and coordinate production and delivery around your deadline. Speed is our superpower, and we use it to keep your business running efficiently.",
  },
  {
    num: "03",
    title: "Ease.",
    tagline: "We make fulfillment feel easy.",
    body: "From uniforms to promotional products, we simplify every step so you can check things off your list and move on with your day.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Every location orders from one store now, and every crew shows up looking like one brand.",
    name: "Marcus Reyes",
    role: "Franchise owner, Summit Home Services",
  },
  {
    quote:
      "We went from three vendors and a spreadsheet to one partner. Our team just orders, and it arrives right.",
    name: "Daniel Brooks",
    role: "Founder, Brightline Coffee Co.",
  },
  {
    quote:
      "New hires have their apparel on day one, and every item matches our brand. We don't chase anything.",
    name: "Priya Shah",
    role: "Operations Lead, Northfield Partners",
  },
];

export default function AboutPage() {
  return (
    <PageShell>
      {/* ---------- hero: navy band, lime headline, product image right ---------- */}
      <section className="relative bg-ink text-page">
        <div
          className={`${WRAP} grid grid-cols-1 items-center gap-12 pb-16 pt-32 md:gap-14 md:pb-24 md:pt-44 lg:grid-cols-[1.08fr_0.92fr]`}
        >
          <div>
            <p className="mb-6 inline-flex items-center gap-2 text-[0.78rem] font-medium uppercase tracking-[0.18em] text-lime">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-lime" />
              About Us
            </p>
            <h1
              aria-label="One Partner. Every Piece."
              className="font-semibold leading-[0.98] tracking-[-0.04em] text-lime"
              style={{ fontSize: "clamp(2.6rem, 1.3rem + 4.4vw, 5.4rem)" }}
            >
              <span className="block">
                <RevealWords text="One Partner." />
              </span>
              <RevealLine text="Every Piece." className="text-lime" />
            </h1>
            <p className="mt-7 max-w-[48ch] text-[1.1rem] leading-relaxed text-page/70">
              We bring custom apparel, uniforms, promotional products, and online company stores
              together to make branded purchasing easier to manage.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-lime px-7 py-3.5 text-[0.95rem] font-semibold text-navy transition-opacity hover:opacity-90 active:scale-[0.98]"
              >
                Request a Discovery Meeting
              </a>
              <a
                href="/how-it-works"
                className="inline-flex items-center justify-center rounded-full border border-page/30 px-7 py-3.5 text-[0.95rem] font-medium text-page transition-colors hover:border-page/60 hover:bg-page/[0.06] active:scale-[0.98]"
              >
                See How It Works
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-element">
              <img
                src="/images/promo/hero-flatlay.webp"
                alt="Folded sweatshirts, a cap, a water bottle, a polo and a gift box, all carrying the same logo"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden bg-lime px-6 py-5 text-navy sm:block">
              <span className="block text-[1.9rem] font-semibold leading-none tracking-[-0.03em]">
                One partner
              </span>
              <span className="mt-1.5 block text-[0.8rem] font-medium uppercase tracking-[0.14em]">
                Every piece, handled
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- our goal: large statement ---------- */}
      <section className={`${WRAP} py-16 md:py-24`}>
        <p className="inline-flex items-center gap-2 text-[0.78rem] font-medium uppercase tracking-[0.18em] text-ink-40">
          <span className="inline-block h-1.5 w-1.5 bg-[var(--lime)]" />
          Our goal
        </p>
        <p className="mt-7 max-w-[56rem] text-[clamp(1.35rem,1.05rem+1.3vw,2.1rem)] font-medium leading-[1.35] tracking-[-0.02em] text-ink">
          Deliver reliable, high-quality fulfillment that saves your team time, so you can focus on
          growing your business instead of chasing suppliers, tracking orders, and managing the
          details. From sourcing to doorstep, we handle every step, so your brand always shows up
          right, on time, every time.
        </p>
      </section>

      {/* ---------- why businesses choose: one partner, less to manage ---------- */}
      <section className="bg-element">
        <div className={`${WRAP} py-16 md:py-24`}>
          <div className="grid grid-cols-1 gap-x-14 gap-y-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <p className="mb-5 inline-flex items-center gap-2 text-[0.78rem] font-medium uppercase tracking-[0.18em] text-ink-40">
                <span className="inline-block h-1.5 w-1.5 bg-[var(--lime)]" />
                Why businesses choose Brand Fulfillment
              </p>
              <h2 className="h2 max-w-[16ch] text-ink">One Partner. Less to Manage.</h2>
              <p className="mt-6 max-w-[46ch] text-[1.05rem] leading-relaxed text-ink-60">
                Managing branded merchandise shouldn&rsquo;t require multiple vendors, endless
                emails, and complicated ordering. We manage the details so you don&rsquo;t have to.
              </p>
              <div className="mt-10 aspect-[16/10] w-full overflow-hidden bg-element-2">
                <img
                  src="/images/online-stores/select-products.webp"
                  alt="A team member reviewing products, orders, inventory and fulfillment on a laptop"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="lg:pt-2">
              <p className="text-[0.78rem] font-medium uppercase tracking-[0.16em] text-ink-40">
                We simplify the process by
              </p>
              <div className="mt-7 grid grid-cols-1 border-t border-ink/15 sm:grid-cols-2">
                {SIMPLIFY.map((item, i) => (
                  <div
                    key={item}
                    className={`border-ink/15 py-6 sm:px-7 sm:[&:nth-child(odd)]:pl-0 sm:[&:nth-child(even)]:border-l ${
                      i >= 2 ? "border-t sm:[&:nth-child(n+3)]:border-t" : ""
                    } ${i === 1 ? "border-t sm:border-t-0" : ""}`}
                  >
                    <span className="block text-[0.82rem] font-medium tabular-nums text-ink-40">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="mt-3 text-[1.02rem] font-medium leading-snug tracking-[-0.01em] text-ink">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- core values: quality / speed / ease ---------- */}
      <section className={`${WRAP} py-16 md:py-24`}>
        <div className="max-w-[48rem]">
          <p className="mb-5 inline-flex items-center gap-2 text-[0.78rem] font-medium uppercase tracking-[0.18em] text-ink-40">
            <span className="inline-block h-1.5 w-1.5 bg-[var(--lime)]" />
            Our core values
          </p>
          <h2 className="h-display text-ink">
            <RevealWords text="Quality. Speed." />{" "}
            <RevealLine text="Ease." className="text-ink" />
          </h2>
          <p className="mt-6 max-w-[52ch] text-[1.05rem] leading-relaxed text-ink-60">
            They shape how we make decisions, manage orders, communicate with customers, and work
            together as a team.
          </p>
        </div>

        <div className="mt-14 flex flex-col">
          {VALUES.map((v) => (
            <article
              key={v.num}
              className="grid grid-cols-1 gap-x-14 gap-y-4 border-t border-ink/15 py-10 md:py-12 lg:grid-cols-[0.8fr_1.2fr]"
            >
              <div>
                <span className="text-[0.82rem] font-medium tabular-nums text-ink-40">{v.num}</span>
                <h3 className="mt-3 text-[clamp(2rem,1.3rem+2vw,3.2rem)] font-semibold leading-none tracking-[-0.03em] text-ink">
                  {v.title}
                </h3>
                <p className="mt-5 text-[1.1rem] font-medium tracking-[-0.01em] text-ink/80">
                  {v.tagline}
                </p>
              </div>
              <p className="max-w-[52ch] text-[1.02rem] leading-relaxed text-ink-60 lg:pt-12">
                {v.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* ---------- promise + vision ---------- */}
      <section className={`${WRAP} pb-16 md:pb-24`}>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
          <div className="flex flex-col justify-center">
            <p className="inline-flex items-center gap-2 text-[0.78rem] font-medium uppercase tracking-[0.18em] text-ink-40">
              <span className="inline-block h-1.5 w-1.5 bg-[var(--lime)]" />
              Our promise
            </p>
            <h2 className="h2 mt-5 max-w-[16ch] text-ink">
              Fast. Reliable. High-Quality Fulfillment.
            </h2>
            <p className="mt-6 max-w-[46ch] text-[1.05rem] leading-relaxed text-ink-60">
              An all-in-one source for branded apparel, uniforms, and promotional products: one that
              simplifies operations, strengthens every brand we support, and lets businesses focus on
              growth.
            </p>
          </div>

          <div className="relative flex flex-col justify-center overflow-hidden bg-ink p-10 text-page md:p-14">
            <span
              aria-hidden
              className="pointer-events-none absolute right-10 top-10 h-2.5 w-2.5 bg-lime"
            />
            <p className="text-[0.78rem] font-medium uppercase tracking-[0.16em] text-lime">
              Our vision
            </p>
            <p className="mt-5 text-[0.95rem] font-medium uppercase tracking-[0.14em] text-page/60">
              The Trusted Partner Behind Your Brand
            </p>
            <blockquote className="mt-6 text-[clamp(1.35rem,1rem+1.3vw,2.05rem)] font-semibold leading-[1.22] tracking-[-0.02em] text-page">
              &ldquo;To be the most trusted and efficient partner for businesses that need a
              dependable source for the products and materials behind their brand.&rdquo;
            </blockquote>
          </div>
        </div>
      </section>

      {/* ---------- testimonials: navy band ---------- */}
      <section className="bg-ink text-page">
        <div className={`${WRAP} py-16 md:py-24`}>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-[40rem]">
              <p className="mb-5 inline-flex items-center gap-2 text-[0.78rem] font-medium uppercase tracking-[0.18em] text-lime">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-lime" />
                What our customers say
              </p>
              <h2 className="h2 max-w-[18ch] text-page">One partner, in their words.</h2>
            </div>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-x-12 border-t border-page/15 lg:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <figure
                key={t.name}
                className={`flex flex-col justify-between border-page/15 py-10 lg:px-10 lg:first:pl-0 lg:last:pr-0 lg:[&:not(:first-child)]:border-l ${
                  i > 0 ? "border-t lg:border-t-0" : ""
                }`}
              >
                <blockquote className="text-[clamp(1.2rem,1rem+0.7vw,1.5rem)] font-medium leading-[1.3] tracking-[-0.02em] text-lime">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-8">
                  <p className="text-[1rem] font-semibold text-page">{t.name}</p>
                  <p className="mt-1 text-[0.9rem] text-page/55">{t.role}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
