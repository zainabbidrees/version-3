import type { Metadata } from "next";
import { PageShell } from "@/components/sections";
import { RevealWords } from "@/components/RevealWords";
import { RevealLine } from "@/components/RevealLine";
import { StorySlider } from "@/components/StorySlider";
import { ScrollGallery, type GalleryTile } from "@/components/ScrollGallery";

export const metadata: Metadata = {
  title: "Custom Online Store Setup & Fulfillment Process | Brand Fulfillment",
  description:
    "A simple, collaborative process — from the first discovery meeting to ongoing store management.",
};

/* How It Works — rebuilt on the Brand Fulfillment palette so the hero matches
   the service pages exactly: a Production Ink navy band, Electric Lime headline
   and eyebrow, lime primary CTA, all aligned to the shared max-w-[1840px] grid
   (the previous beige RevealHero sat on a narrower 1400px rail, which threw the
   left margin out of line with every section below it). Below the hero, a
   four-step editorial process, a live-store image band, and a navy outcomes
   grid — square corners per brand, pills kept for CTAs. */

/* Four-step process rendered as the noho "stories" card slider — num, title,
   and a one-line summary that folds the detail from each step's checklist. */
const STEPS = [
  {
    num: "Step 01",
    title: "Let's talk about your business",
    excerpt:
      "We learn about your company, brand, locations, and goals — who'll be ordering, how many sites you run, what you buy today, and what your merchandise program should accomplish.",
  },
  {
    num: "Step 02",
    title: "Recommendations built around your brand",
    excerpt:
      "We present a complete proposal — product ideas, store structure, branding, and pricing — customized to your organization and based on what we heard during discovery.",
  },
  {
    num: "Step 03",
    title: "From plan to custom online store",
    excerpt:
      "Once approved, we build your storefront: sourcing products, organizing categories, adding branding and customization, setting up ordering, and testing the whole experience.",
  },
  {
    num: "Step 04",
    title: "Your store is live. We're still here.",
    excerpt:
      "Launch is just the start. We manage vendors, product updates, store changes, purchasing trends, recurring orders, and ongoing support so it keeps running smoothly.",
  },
];

/* "Why a store" rendered as the apparel-style horizontal gallery — each
   benefit a real online-store photo tile, closed by a lime CTA tile. */
const WHY_TILES: GalleryTile[] = [
  { name: "Brand consistency", photo: true, src: "/images/online-stores/launch-storefront.webp", tone: null },
  { name: "Better visibility", photo: true, src: "/images/online-stores/ordering-requirements.webp", tone: null },
  { name: "Time savings", photo: true, src: "/images/online-stores/easy-ordering.webp", tone: null },
  { name: "Selection & pricing", photo: true, src: "/images/online-stores/select-products.webp", tone: null },
  { name: "Ongoing management", photo: true, src: "/images/online-stores/hero-storefront.webp", tone: null },
  { name: "See your store", photo: false, src: null, tone: { bg: "var(--lime)", fg: "text-navy" } },
];

const WRAP = "mx-auto max-w-[1840px] px-6 md:px-10 lg:px-14";

export default function HowItWorksPage() {
  return (
    <PageShell>
      {/* ---------- hero: navy band, lime headline, storefront image right ---------- */}
      <section className="relative bg-ink text-page">
        <div
          className={`${WRAP} grid grid-cols-1 items-center gap-12 pb-16 pt-32 md:gap-14 md:pb-24 md:pt-44 lg:grid-cols-[1.08fr_0.92fr]`}
        >
          <div>
            <p className="mb-6 inline-flex items-center gap-2 text-[0.78rem] font-medium uppercase tracking-[0.18em] text-lime">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-lime" />
              How It Works
            </p>
            <h1
              aria-label="How Your Company Store Gets Started"
              className="font-semibold leading-[0.98] tracking-[-0.04em] text-lime"
              style={{ fontSize: "clamp(2.5rem, 1.2rem + 4vw, 5rem)" }}
            >
              <span className="block">
                <RevealWords text="How Your Company" />
              </span>
              <RevealLine text="Store Gets Started" className="text-lime" />
            </h1>
            <p className="mt-7 max-w-[48ch] text-[1.1rem] leading-relaxed text-page/70">
              Creating and managing a branded online store doesn&rsquo;t have to be complicated. We
              guide you through a simple, collaborative process — from the first discovery meeting to
              ongoing store management.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-lime px-7 py-3.5 text-[0.95rem] font-semibold text-navy transition-opacity hover:opacity-90 active:scale-[0.98]"
              >
                Request a Discovery Meeting
              </a>
              <a
                href="/custom-online-stores"
                className="inline-flex items-center justify-center rounded-full border border-page/30 px-7 py-3.5 text-[0.95rem] font-medium text-page transition-colors hover:border-page/60 hover:bg-page/[0.06] active:scale-[0.98]"
              >
                Custom Online Stores
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-element">
              <img
                src="/images/online-stores/hero-storefront.webp"
                alt="A branded company online store open on a laptop, ready for employees to order approved merchandise"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden bg-lime px-6 py-5 text-navy sm:block">
              <span className="block text-[2rem] font-semibold leading-none tracking-[-0.03em]">
                4 steps
              </span>
              <span className="mt-1.5 block text-[0.8rem] font-medium uppercase tracking-[0.14em]">
                Discovery to live store
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- the four-step process: noho stories slider ---------- */}
      <StorySlider
        heading="From discovery meeting to a live store"
        lead="Four steps, one team guiding you the whole way — from the first conversation to the merchandise landing on doorsteps."
        items={STEPS}
        ariaLabel="How your company store gets started — four steps"
        action={{ label: "Request a Discovery Meeting", href: "/contact" }}
      />

      {/* ---------- live-store image band ---------- */}
      <section className="relative">
        <div className={`${WRAP} pb-14 md:pb-20`}>
          <div className="relative aspect-[16/7] w-full overflow-hidden bg-element-2">
            <img
              src="/images/online-stores/easy-ordering.webp"
              alt="An employee browsing branded products in a company store and placing an order in a few clicks"
              className="h-full w-full object-cover"
            />
            <span className="pointer-events-none absolute inset-0 bg-ink/35" />
            <span className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink/80 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-6 md:flex-row md:items-end md:justify-between md:p-10">
              <h3 className="max-w-[18ch] text-[clamp(1.4rem,1.1rem+1.1vw,2rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-page">
                One store your whole team orders from.
              </h3>
              <a
                href="/custom-online-stores"
                className="inline-flex w-fit items-center justify-center rounded-full bg-lime px-6 py-3 text-[0.9rem] font-semibold text-navy transition-opacity hover:opacity-90 active:scale-[0.98]"
              >
                See how stores work
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- why: apparel-style horizontal gallery ---------- */}
      <ScrollGallery
        tiles={WHY_TILES}
        eyebrow="Why a custom online store"
        headingLines={["Make branded merchandise", "easier to manage."]}
        sub="Managing branded merchandise shouldn't take time away from your business. Your store gives your team an organized way to order approved products, while we manage the products, vendors, and fulfillment behind the scenes."
        kicker="Get started"
        id="why"
        tileAria="store benefit"
      />
    </PageShell>
  );
}
