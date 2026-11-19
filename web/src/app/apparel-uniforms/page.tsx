import type { Metadata } from "next";
import { PageShell, Actions } from "@/components/sections";
import { RevealWords } from "@/components/RevealWords";
import { RevealLine } from "@/components/RevealLine";
import { ApparelGallery } from "@/components/ScrollGallery";
import { CapabilityCards } from "@/components/CapabilityCards";
import { CustomizationShowcase } from "@/components/CustomizationShowcase";
import { UniformTiles } from "@/components/UniformTiles";

export const metadata: Metadata = {
  title: "Branded Apparel & Company Uniforms | Brand Fulfillment",
  description:
    "Branded company apparel, uniforms, and workwear designed to give your team a professional, consistent look.",
};

/* Apparel & Uniforms — visual redesign on the Brand Fulfillment palette
   (Production Ink navy / Electric Lime / Branded Beige), drawing on the
   collected section inspirations: split-screen product hero, a navy
   category-card grid with a lime hover invert, a capability strip, and a
   customization zig-zag. Tiles are square-cornered per brand; CTAs stay pill.
   Product imagery uses the real Brand Fulfillment apparel photography. */

const CATEGORIES = [
  "T-Shirts",
  "Polos",
  "Button-Down Shirts",
  "Jackets & Outerwear",
  "Hats & Headwear",
  "Workwear",
  "Performance Apparel",
  "Corporate Apparel",
  "Employee Uniforms",
];

/* Gallery tiles for the noho-style product marquee — every category shows its
   real Brand Fulfillment product photo (see CATEGORY_IMG below). */
const GALLERY = CATEGORIES.map((name) => ({
  name,
  photo: true as const,
  tone: null,
}));

const CAPABILITIES = [
  {
    k: "Decoration",
    title: "Embroidery & screen print",
    body: "The right method for your artwork and intended use, every time.",
  },
  {
    k: "Range",
    title: "Every size & style",
    body: "From everyday tees to outerwear and performance — XS and up.",
  },
  {
    k: "Ongoing",
    title: "Reorders handled",
    body: "New hires and restocks managed so your look stays consistent.",
  },
];

const UNIFORM_STEPS = [
  { num: "01", label: "Products", title: "Select the right products", body: "Pieces chosen for your roles, environment, and budget." },
  { num: "02", label: "Branding", title: "Maintain consistent branding", body: "The same look on every shirt and at every location." },
  { num: "03", label: "Ordering", title: "Simplify ordering", body: "One place to order, reorder, and outfit new hires." },
];

const PROGRAM = [
  { num: "01", title: "Approved products", body: "A curated list your team can order from." },
  { num: "02", title: "Employee ordering", body: "Simple, self-serve ordering for staff." },
  { num: "03", title: "Recurring needs", body: "Reorders and new hires, handled." },
  { num: "04", title: "Consistent over time", body: "The same look, season after season." },
];

// Real Brand Fulfillment apparel photography, one per category.
const CATEGORY_IMG: Record<string, string> = {
  "T-Shirts": "/images/apparel/t-shirts.webp",
  Polos: "/images/apparel/polos.webp",
  "Button-Down Shirts": "/images/apparel/button-down-shirts.webp",
  "Jackets & Outerwear": "/images/apparel/jackets-outerwear.webp",
  "Hats & Headwear": "/images/apparel/hats-headwear.webp",
  Workwear: "/images/apparel/workwear.webp",
  "Performance Apparel": "/images/apparel/performance-apparel.webp",
  "Corporate Apparel": "/images/apparel/corporate-apparel.webp",
  "Employee Uniforms": "/images/apparel/employee-uniforms.webp",
};

export default function ApparelUniformsPage() {
  return (
    <PageShell>
      {/* ---------- HERO — copy left, layered product collage right ---------- */}
      <section className="relative bg-ink px-6 pt-32 pb-14 md:px-10 lg:px-14 md:pt-40 md:pb-20">
        <div className="mx-auto grid max-w-[1840px] grid-cols-1 items-center gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <div>
            <p className="mb-6 inline-flex items-center gap-2 text-[0.78rem] font-medium uppercase tracking-[0.18em] text-lime">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-lime" />
              Apparel &amp; Uniforms
            </p>
            <h1 className="h-display text-lime">
              <span className="block">Branded Apparel</span>
              <RevealLine text="Worn With Pride" className="text-lime" />
            </h1>
            <p className="mt-7 max-w-[52ch] text-[1.1rem] leading-relaxed text-lime/80">
              From everyday tees to full uniform programs, we help you outfit your team
              with branded apparel, then handle the decoration and delivery.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-lime px-7 py-3.5 text-[0.95rem] font-medium text-navy transition-opacity hover:opacity-90 active:scale-[0.98]"
              >
                Request a Discovery Meeting
              </a>
              <a
                href="#apparel"
                className="inline-flex items-center justify-center rounded-full border border-page/30 px-7 py-3.5 text-[0.95rem] font-medium text-page transition-colors hover:border-page/60 hover:bg-page/[0.06] active:scale-[0.98]"
              >
                Explore apparel
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-element">
              <img
                src="/images/apparel/hero-apparel-rack.webp"
                alt="Company apparel on a steel rack: tee, polo, oxford shirt, rain jacket and more"
                className="h-full w-full object-cover"
              />
            </div>
            {/* layered inset — hidden on phones to avoid crowding */}
            <div className="absolute -bottom-7 -left-7 hidden w-40 overflow-hidden border-[6px] border-page bg-element sm:block lg:w-52">
              <div className="aspect-square">
                <img
                  src="/images/apparel/hats-headwear.webp"
                  alt="Logo headwear on stone plinths: dad caps, a trucker cap and a bucket hat"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- VIDEO — cinematic feature ---------- */}
      <section className="relative px-6 py-16 md:px-10 lg:px-14 md:py-24">
        <div className="mx-auto max-w-[1840px]">
          <span className="inline-flex items-center gap-2 text-[0.78rem] font-medium uppercase tracking-[0.18em] text-ink-40">
            <span className="inline-block h-1.5 w-1.5 bg-[var(--lime)]" />
            See it in action
          </span>
          <h2
            aria-label="Branded apparel, brought to life."
            className="mt-5 max-w-[16ch] font-semibold leading-[0.98] tracking-[-0.04em] text-ink"
            style={{ fontSize: "clamp(2.2rem, 1.1rem + 3.8vw, 4.4rem)" }}
          >
            <span className="block" aria-hidden="true">
              Branded apparel,
            </span>
            <span className="block" aria-hidden="true">
              <RevealWords text="brought to life." />
            </span>
          </h2>
          <p className="mt-6 max-w-[46ch] text-[1.02rem] leading-relaxed text-ink-60">
            A look at how we outfit teams — from the first sample to a full, on-brand
            rollout across every location.
          </p>

          {/* video frame (poster + play — drop in a real <video src> to go live) */}
          <div className="group relative mt-10 aspect-video w-full overflow-hidden bg-element-2 md:mt-12">
            <img
              src="/images/home/corporate-offices.webp"
              alt="A team walking through an office in matching branded vests"
              className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
            />
            <span className="pointer-events-none absolute inset-0 bg-ink/25" />
            <span className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-ink/70 to-transparent" />

            <button
              type="button"
              aria-label="Play apparel film"
              className="absolute inset-0 grid cursor-pointer place-items-center"
            >
              <span className="relative grid place-items-center">
                <span className="absolute h-[4.75rem] w-[4.75rem] rounded-full bg-[var(--lime)]/40 motion-safe:animate-ping" />
                <span className="relative flex h-[4.75rem] w-[4.75rem] items-center justify-center rounded-full bg-[var(--lime)] text-ink shadow-[0_10px_34px_rgba(0,0,0,0.28)] transition-transform duration-300 group-hover:scale-105 active:scale-95">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="ml-0.5">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </span>
            </button>

            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-5 py-4 md:px-6">
              <span className="text-[0.85rem] font-medium text-page">
                Brand Fulfillment — Apparel
              </span>
              <span className="text-[0.8rem] tabular-nums text-page/70">01:48</span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- PRODUCT GALLERY — noho scroll-linked horizontal pan ---------- */}
      <ApparelGallery
        tiles={GALLERY.map((t) => ({
          name: t.name,
          photo: t.photo,
          tone: t.tone,
          src: t.photo ? CATEGORY_IMG[t.name] : null,
        }))}
      />

      {/* ---------- CAPABILITY STRIP — navy band, noho tile set ---------- */}
      <section className="relative bg-ink px-6 py-16 text-page md:px-10 lg:px-14 md:py-24">
        <CapabilityCards
          heading="Quality products from brands you know."
          lead="We work with trusted apparel and uniform brands to give businesses access to quality products across styles, sizes, price points, and performance needs."
          items={CAPABILITIES}
          cta={{ label: "Request a Discovery Meeting", href: "/contact" }}
        />
      </section>

      {/* ---------- CUSTOMIZATION — noho two-product split ---------- */}
      <section className="relative px-6 py-16 md:px-10 lg:px-14 md:py-24">
        <CustomizationShowcase
          eyebrow="Customization"
          heading="Put your brand on it"
          lead="Once you've found the right apparel, we bring your brand to life with the customization method that fits your artwork and intended use."
          methods={[
            {
              kicker: "Stitched",
              title: "Embroidery",
              body: "Durable, textured stitched logos with a premium finish that lasts.",
              img: "/images/apparel/embroidery.webp",
              alt: "Embroidery machine stitching a logo in cream thread onto a navy cap",
              tone: "var(--beige)",
              fg: "text-ink",
              swatchLabel: "Thread",
              swatches: ["#001d3f", "#dee21e", "#ffffff", "#a2c1c5"],
              href: "/contact",
            },
            {
              kicker: "Printed",
              title: "Screen Printing",
              body: "Bold, vibrant prints that stay cost-effective across larger runs.",
              img: "/images/apparel/screen-printing.webp",
              alt: "Close-up of a white tee with the Brand Fulfillment logo screen-printed on the chest",
              tone: "var(--slate)",
              fg: "text-ink",
              swatchLabel: "Ink",
              swatches: ["#001d3f", "#dee21e", "#ffffff", "#d1cab2"],
              href: "/contact",
            },
          ]}
        />
      </section>

      {/* ---------- UNIFORMS — beige band, noho chairs-style tiles ---------- */}
      <section className="relative bg-element px-6 py-16 md:px-10 lg:px-14 md:py-24">
        <UniformTiles
          heading="Uniforms that keep your team consistent"
          lead="Branded uniforms do more than look professional. They help customers recognize your team and keep your business consistent everywhere."
          items={UNIFORM_STEPS}
          action={{ label: "See How It Works", href: "/how-it-works" }}
        />
      </section>

      {/* ---------- PROGRAMS ---------- */}
      <section className="relative px-6 py-16 md:px-10 lg:px-14 md:py-24">
        <div className="mx-auto max-w-[1840px]">
          <div className="max-w-[48rem]">
            <h2 className="h2 text-ink">Apparel programs that grow with your business</h2>
            <p className="mt-6 text-[1.02rem] leading-relaxed text-ink-60">
              We help manage approved products, employee ordering, recurring needs, and fulfillment
              so your apparel program stays consistent over time.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
            {PROGRAM.map((s) => (
              <div key={s.num} className="border-t border-ink/15 pt-6">
                <span className="block text-[0.82rem] font-medium tabular-nums text-ink-40">
                  {s.num}
                </span>
                <h3 className="mt-4 text-[1.1rem] font-semibold tracking-[-0.02em] text-ink">
                  {s.title}
                </h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-60">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- MULTI-LOCATION CTA ---------- */}
      <section className="relative px-6 pb-20 md:px-10 lg:px-14 md:pb-28">
        <div className="mx-auto grid max-w-[1840px] grid-cols-1 gap-10 border-t border-ink/15 pt-14 lg:grid-cols-2 lg:items-center">
          <div className="max-w-[40ch]">
            <h2 className="h2 text-ink">Apparel for multiple locations</h2>
            <p className="mt-6 text-[1.02rem] leading-relaxed text-ink-60">
              Centralize your approved products and branding while giving individual teams a
              straightforward way to order what they need — consistent across every location.
            </p>
          </div>
          <div className="lg:justify-self-end">
            <Actions actions={[{ label: "Request a Discovery Meeting", href: "/contact" }]} />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
