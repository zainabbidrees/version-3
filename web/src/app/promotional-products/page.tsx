import type { Metadata } from "next";
import { PageShell, Section, Eyebrow } from "@/components/sections";
import { RevealLine } from "@/components/RevealLine";
import { StorySlider } from "@/components/StorySlider";
import { ProcessScroll } from "@/components/ProcessScroll";

export const metadata: Metadata = {
  title: "Promotional Products | Brand Fulfillment",
  description:
    "From event giveaways to client gifts, we help you choose branded products that fit your goal and your budget, then handle the branding and delivery.",
};

const PRODUCTS = [
  {
    num: "01",
    title: "Drinkware",
    body: "Tumblers, bottles, and mugs.",
    img: "/images/promo/drinkware.webp",
    alt: "Steel tumbler, navy water bottle with a small logo, and a cream mug on a stone ledge",
  },
  {
    num: "02",
    title: "Bags & Totes",
    body: "Totes, backpacks, and duffels.",
    img: "/images/promo/bags-totes.webp",
    alt: "Charcoal backpack, canvas tote with a small logo and navy duffel on stone steps",
  },
  {
    num: "03",
    title: "Office & Writing",
    body: "Notebooks, pens, and desk items.",
    img: "/images/promo/office-writing.webp",
    alt: "Charcoal and cream notebooks with debossed logos, two metal pens and a desk organizer",
  },
  {
    num: "04",
    title: "Tech Accessories",
    body: "Chargers, cables, and speakers.",
    img: "/images/promo/tech-accessories.webp",
    alt: "Black logo tech: earbuds case, speaker, wireless charger, wall adapter and braided cable",
  },
  {
    num: "05",
    title: "Event Giveaways",
    body: "Lanyards, stickers, and small items.",
    img: "/images/promo/event-giveaways.webp",
    alt: "Navy and cream logo lanyards with badge holders, stickers, wristbands and enamel pins",
  },
  {
    num: "06",
    title: "Company Gifts",
    body: "Curated kits and premium items.",
    img: "/images/promo/company-gifts.webp",
    alt: "Navy gift box with a logo mug, notebook, pen, socks and water bottle in tissue paper",
  },
  {
    num: "07",
    title: "Outdoor & Leisure",
    body: "Blankets, umbrellas, and coolers.",
    img: "/images/promo/outdoor-leisure.webp",
    alt: "Navy rolled blanket, canvas cooler bag with a small logo and a navy umbrella on stone steps",
  },
  {
    num: "08",
    title: "Seasonal & Holiday",
    body: "Timely items for any season.",
    img: "/images/promo/seasonal-holiday.webp",
    alt: "Green holiday gift box with a navy scarf, candle and ornament among pine sprigs",
  },
];

const OCCASIONS = [
  {
    num: "01",
    title: "Trade shows & events",
    excerpt: "Branded booths, giveaways, and apparel that help your team stand out on the floor.",
  },
  {
    num: "02",
    title: "Product launches",
    excerpt: "Launch kits and limited-run merchandise timed to your release date.",
  },
  {
    num: "03",
    title: "Employee appreciation",
    excerpt: "Thoughtful branded gifts that recognize your team and mark the milestones.",
  },
  {
    num: "04",
    title: "Client & partner gifts",
    excerpt: "Premium gifts that strengthen the relationships that matter most.",
  },
];

const PROCESS = [
  {
    num: "01",
    title: "Tell us the goal",
    body: "The event, audience, quantity, timeline, and budget.",
  },
  {
    num: "02",
    title: "Get recommendations",
    body: "Product options from trusted vendors that fit your brand.",
  },
  {
    num: "03",
    title: "We brand & deliver",
    body: "Decorated, packed, and shipped where you need it.",
  },
];

const PAIRINGS = [
  {
    href: "/apparel-uniforms",
    title: "Dress the team to match",
    body: "Branded apparel, uniforms, and workwear for every role.",
    link: "Apparel & Uniforms",
    img: "/images/promo/pair-apparel-team.webp",
    alt: "Four teammates in logo jackets, a polo, a hoodie and a vest chatting outside a warehouse",
  },
  {
    href: "/custom-online-stores",
    title: "Make reordering simple",
    body: "Put promo items in your company store for easy ordering.",
    link: "Custom Online Stores",
    img: "/images/promo/pair-company-store.webp",
    alt: "A branded company store open on a laptop, beside a logo tumbler, cap and notebook",
  },
];

export default function PromotionalProductsPage() {
  return (
    <PageShell>
      {/* ---------- hero: copy left, layered product collage right ---------- */}
      <section className="relative bg-ink px-6 pt-32 pb-14 md:px-10 lg:px-14 md:pt-40 md:pb-20">
        <div className="mx-auto grid max-w-[1840px] grid-cols-1 items-center gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <div>
            <p className="mb-6 inline-flex items-center gap-2 text-[0.78rem] font-medium uppercase tracking-[0.18em] text-lime">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-lime" />
              Promotional Products
            </p>
            <h1 className="h-display text-lime">
              <span className="block">Promotional Products</span>
              <RevealLine text="People Actually Keep" className="text-lime" />
            </h1>
            <p className="mt-7 max-w-[52ch] text-[1.1rem] leading-relaxed text-lime/80">
              From event giveaways to client gifts, we help you choose branded
              products that fit your goal and your budget, then handle the
              branding and delivery.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-lime px-7 py-3.5 text-[0.95rem] font-medium text-navy transition-opacity hover:opacity-90 active:scale-[0.98]"
              >
                Request a Discovery Meeting
              </a>
              <a
                href="#products"
                className="inline-flex items-center justify-center rounded-full border border-page/30 px-7 py-3.5 text-[0.95rem] font-medium text-page transition-colors hover:border-page/60 hover:bg-page/[0.06] active:scale-[0.98]"
              >
                Explore Products
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-element">
              <img
                src="/images/promo/hero-flatlay.webp"
                alt="Logo tee, tumbler, canvas tote, notebook, pen and key fob laid out on a stone table"
                className="h-full w-full object-cover"
              />
            </div>
            {/* layered inset — hidden on phones to avoid crowding */}
            <div className="absolute -bottom-7 -left-7 hidden w-40 overflow-hidden border-[6px] border-page bg-element sm:block lg:w-52">
              <div className="aspect-square">
                <img
                  src="/images/promo/hero-tumbler.webp"
                  alt="Stainless steel tumbler with a small etched logo on a stone ledge"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- product categories: image-led grid ---------- */}
      <Section>
        <div id="products" className="scroll-mt-28">
          <div className="max-w-[48rem]">
            <div className="mb-5">
              <Eyebrow>One partner</Eyebrow>
            </div>
            <h2 className="h2 text-ink">Branded Products For Every Need</h2>
            <p className="mt-6 text-[1.02rem] leading-relaxed text-ink-60">
              A starting point, not a catalog. Tell us what you need and we&rsquo;ll
              recommend the right products for your brand, audience, and budget.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
            {PRODUCTS.map((p) => (
              <article key={p.num} className="group flex flex-col">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface">
                  <img
                    src={p.img}
                    alt={p.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                  />
                  {/* noho-style hover: lime arrow chip slides up into view */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute right-3 top-3 flex h-10 w-10 translate-y-2 items-center justify-center bg-lime text-navy opacity-0 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100"
                  >
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M4.5 11.5L11.5 4.5M11.5 4.5H5.5M11.5 4.5V10.5"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
                <div className="mt-4">
                  <span className="text-[0.8rem] font-medium tabular-nums text-ink-40">
                    {p.num}
                  </span>
                  <h3 className="mt-1.5 text-[1.08rem] font-semibold tracking-[-0.02em] text-ink transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1">
                    {p.title}
                  </h3>
                  <p className="mt-1.5 text-[0.9rem] leading-relaxed text-ink-60">
                    {p.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Section>

      {/* ---------- events / launches: noho-style story slider ---------- */}
      <StorySlider
        heading="For Events, Launches, And Special Projects"
        lead="Need branded products for an event, launch, or special project? We help you choose products that fit your timeline and coordinate production and delivery around your deadline."
        items={OCCASIONS}
        ariaLabel="Event and launch use cases"
        action={{ label: "See How It Works", href: "/how-it-works" }}
      />

      {/* ---------- process: pinned sticky-scroll stack ---------- */}
      <ProcessScroll
        heading="From Idea To Delivered"
        lead="You bring the goal. We handle product selection, branding, and fulfillment."
        steps={PROCESS}
        image="/images/promo/hero-flatlay.webp"
        imageAlt="Logo tee, tumbler, canvas tote, notebook, pen and key fob laid out on a stone table"
      />

      {/* ---------- pairings: image cards ---------- */}
      <Section>
        <div className="max-w-[48rem]">
          <h2 className="h2 text-ink">Pair It With The Rest Of Your Program</h2>
          <p className="mt-6 text-[1.02rem] leading-relaxed text-ink-60">
            Promotional products work best alongside consistent apparel and
            simple ordering.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10">
          {PAIRINGS.map((c) => (
            <a key={c.href} href={c.href} className="group flex flex-col">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-element">
                <img
                  src={c.img}
                  alt={c.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                />
              </div>
              <h3 className="mt-6 text-[clamp(1.25rem,1rem+1vw,1.5rem)] font-semibold tracking-[-0.03em] text-ink">
                {c.title}
              </h3>
              <p className="mt-3 max-w-[42ch] text-[0.98rem] leading-relaxed text-ink-60">
                {c.body}
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-[0.95rem] font-medium text-ink">
                {c.link}
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  &rsaquo;
                </span>
              </span>
            </a>
          ))}
        </div>
      </Section>
    </PageShell>
  );
}
