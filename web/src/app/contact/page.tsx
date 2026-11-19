import type { Metadata } from "next";
import { PageShell } from "@/components/sections";
import { ContactForm } from "@/components/ContactForm";
import { RotatingWord } from "@/components/RotatingWord";
import { Faq } from "@/components/Faq";

export const metadata: Metadata = {
  title: "Contact Brand Fulfillment | Branded Merchandise Solutions",
  description:
    "Tell us about your business and we'll follow up to arrange a discovery meeting.",
};

/* Contact — navy hero in the service-page language: an Electric Lime headline
   with a rotating word, a short pitch and proof bullets on the left, and the
   contact form floated on the right as a light panel over the navy. Below it, a
   direct-contact strip (email / phone / office, verbatim from the Brand
   Fulfillment site) and a three-step "what happens next" band. */

const WRAP = "mx-auto max-w-[1840px] px-6 md:px-10 lg:px-14";

const POINTS = [
  "One partner for everything branded",
  "Tailored to your brand and budget",
  "Every request reviewed personally",
];

const CONTACTS = [
  {
    k: "Email",
    value: "shop@fulfillmentdelivers.com",
    href: "mailto:shop@fulfillmentdelivers.com",
    cta: "Email us",
  },
  {
    k: "Call",
    value: "402-819-3375",
    href: "tel:4028193375",
    cta: "Call us",
  },
  {
    k: "Office",
    value: "3730 S 149th St #109, Omaha, NE 68144",
    href: "https://maps.google.com/?q=3730+S+149th+St+%23109+Omaha+NE+68144",
    cta: "Visit us",
  },
];

const NEXT = [
  {
    num: "01",
    title: "Review",
    body: "We review your business details and what you're looking for.",
  },
  {
    num: "02",
    title: "Discovery call",
    body: "We contact you to arrange a discovery meeting and discuss your goals.",
  },
  {
    num: "03",
    title: "Recommendations",
    body: "From there, we recommend products, ordering options, and next steps.",
  },
];

const FAQS = [
  {
    q: "Do I need a company store to work with you?",
    a: "No. A custom online store is great for ongoing, multi-location ordering, but you can also place a one-time order of branded apparel or promotional products. Just reach out and we'll handle the project directly.",
  },
  {
    q: "What products can I order?",
    a: "Branded apparel and uniforms, promotional products, and the custom online stores that bring them together. If you're not sure what fits, we'll recommend options based on your brand, audience, and budget.",
  },
  {
    q: "How does branding and customization work?",
    a: "We match the decoration method to your artwork and how the item will be used — embroidery, screen print, and more — so logos, colors, and placement stay consistent across every product.",
  },
  {
    q: "Is there a minimum order?",
    a: "Minimums depend on the product and decoration method. During discovery we'll walk you through the options that fit your quantity and timeline, so you're never ordering more than you need.",
  },
  {
    q: "How long does production and delivery take?",
    a: "Timelines vary by product, decoration, and quantity. We help you choose items that fit your deadline, then coordinate production and delivery around it and keep you updated along the way.",
  },
  {
    q: "Can you manage ordering across multiple locations?",
    a: "Yes. A company store gives every team and location one place to order approved products, while we manage vendors, product updates, and fulfillment behind the scenes.",
  },
  {
    q: "Where do you ship?",
    a: "We handle delivery wherever you need it — to a single office or across multiple locations — and can set up recurring orders so merchandise arrives where and when it's needed.",
  },
  {
    q: "How do I get started?",
    a: "Share a few details in the form above and we'll follow up to arrange a discovery meeting. From there we review your needs and recommend products, ordering options, and next steps.",
  },
];

export default function ContactPage() {
  return (
    <PageShell closing={false}>
      {/* ---------- hero: navy band, pitch left, form panel right ---------- */}
      <section className="relative bg-ink text-page">
        <div
          className={`${WRAP} grid grid-cols-1 gap-12 pb-16 pt-32 md:pb-24 md:pt-44 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16`}
        >
          {/* pitch */}
          <div className="lg:pt-8">
            <p className="mb-6 inline-flex items-center gap-2 text-[0.78rem] font-medium uppercase tracking-[0.18em] text-lime">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-lime" />
              Contact
            </p>
            <h1
              aria-label="Build a better branded purchasing experience."
              className="font-semibold leading-[1.0] tracking-[-0.04em] text-page"
              style={{ fontSize: "clamp(2.4rem, 1.3rem + 3.8vw, 4.6rem)" }}
            >
              <span className="block">Build a Better</span>
              <RotatingWord
                words={["Company Store", "Branded Store", "Uniform Line", "Promo Program"]}
                className="text-lime"
              />
            </h1>
            <p className="mt-7 max-w-[44ch] text-[1.1rem] leading-relaxed text-page/70">
              Let&rsquo;s build a better branded purchasing experience. Share a few details and
              we&rsquo;ll follow up to arrange a discovery meeting.
            </p>
            <ul className="mt-9 flex max-w-[34rem] flex-col divide-y divide-page/15 border-y border-page/15">
              {POINTS.map((p) => (
                <li key={p} className="flex items-center gap-3 py-4 text-[1rem] text-page/85">
                  <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-lime" />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          {/* form */}
          <div>
            <p className="text-[0.82rem] font-medium uppercase tracking-[0.16em] text-page/55">
              Tell us about your business
            </p>
            <div className="mt-5">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- direct contact strip ---------- */}
      <section className={`${WRAP} py-14 md:py-20`}>
        <div className="flex flex-col gap-3">
          <p className="inline-flex items-center gap-2 text-[0.78rem] font-medium uppercase tracking-[0.18em] text-ink-40">
            <span className="inline-block h-1.5 w-1.5 bg-[var(--lime)]" />
            Prefer to reach us directly
          </p>
        </div>
        <div className="mt-8 grid grid-cols-1 border-t border-ink/15 sm:grid-cols-3">
          {CONTACTS.map((c, i) => (
            <div
              key={c.k}
              className={`flex flex-col gap-4 border-ink/15 py-8 sm:px-8 sm:first:pl-0 sm:[&:not(:first-child)]:border-l ${
                i > 0 ? "border-t sm:border-t-0" : ""
              }`}
            >
              <span className="text-[0.75rem] font-medium uppercase tracking-[0.16em] text-ink-40">
                {c.k}
              </span>
              <p className="text-[clamp(1.1rem,0.95rem+0.6vw,1.45rem)] font-semibold leading-snug tracking-[-0.02em] text-ink">
                {c.value}
              </p>
              <a
                href={c.href}
                className="group mt-auto inline-flex w-fit items-center gap-2 text-[0.92rem] font-medium text-ink transition-colors hover:text-ink/70"
              >
                {c.cta}
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                >
                  <path
                    d="M4 8h8M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- what happens next ---------- */}
      <section className="bg-element">
        <div className={`${WRAP} py-16 md:py-24`}>
          <p className="inline-flex items-center gap-2 text-[0.78rem] font-medium uppercase tracking-[0.18em] text-ink-40">
            <span className="inline-block h-1.5 w-1.5 bg-[var(--lime)]" />
            What happens next
          </p>
          <h2 className="h-display mt-5 max-w-[16ch] text-ink">A simple process from here.</h2>

          <div className="mt-12 grid grid-cols-1 border-t border-ink/15 sm:grid-cols-3">
            {NEXT.map((s, i) => (
              <div
                key={s.num}
                className={`border-ink/15 py-8 sm:px-8 sm:first:pl-0 sm:[&:not(:first-child)]:border-l ${
                  i > 0 ? "border-t sm:border-t-0" : ""
                }`}
              >
                <span className="block text-[0.82rem] font-medium tabular-nums text-ink-40">
                  {s.num}
                </span>
                <h3 className="mt-4 text-[clamp(1.25rem,1rem+0.9vw,1.6rem)] font-semibold leading-[1.1] tracking-[-0.025em] text-ink">
                  {s.title}
                </h3>
                <p className="mt-3 max-w-[32ch] text-[0.97rem] leading-relaxed text-ink-60">
                  {s.body}
                </p>
              </div>
            ))}
          </div>

          <a
            href="/how-it-works"
            className="mt-12 inline-flex items-center justify-center rounded-full border border-ink/20 px-7 py-3.5 text-[0.95rem] font-medium text-ink transition-colors hover:border-ink/40 hover:bg-ink/[0.04] active:scale-[0.98]"
          >
            See How It Works
          </a>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <Faq
        eyebrow="Questions, answered"
        title="FAQ"
        lead="A few things businesses ask before their first order. Don't see yours? Send it along in the form above."
        image="/images/promo/hero-flatlay.webp"
        imageAlt="Logo tee, tumbler, canvas tote, notebook, pen and key fob laid out on a stone table"
        items={FAQS}
        footer={
          <a
            href="mailto:shop@fulfillmentdelivers.com"
            className="inline-flex items-center justify-center rounded-full bg-ink px-7 py-3.5 text-[0.95rem] font-medium text-white transition-opacity hover:opacity-90 active:scale-[0.98]"
          >
            Still have a question? Email us
          </a>
        }
      />
    </PageShell>
  );
}
