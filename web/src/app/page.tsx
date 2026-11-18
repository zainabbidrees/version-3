import { RotatingHeadline } from "@/components/RotatingHeadline";
import { Stories } from "@/components/Stories";
import { BusinessSizes } from "@/components/BusinessSizes";
import { OrderSupport } from "@/components/OrderSupport";
import { ClosingCta } from "@/components/ClosingCta";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* content slides up over the pinned footer (reveal-footer effect) */}
      <div className="relative z-10 bg-page lg:mb-[100dvh]">
      <section className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-6 md:px-10 text-center">
        <div className="relative z-10 flex flex-col items-center">
          <h1
            className="font-semibold leading-[0.95] tracking-[-0.045em] text-ink"
            style={{ fontSize: "clamp(3rem, 12vw, 11rem)" }}
          >
            <span className="block">Where Brands</span>
            <RotatingHeadline />
          </h1>

          <p className="mt-10 text-[1.05rem] font-medium tracking-[-0.01em] text-ink-60">
            Your Brand. One Store. Endless Possibilities.
          </p>

          <a
            href="/contact"
            className="mt-6 inline-block rounded-full bg-ink px-6 py-3 text-[0.95rem] font-medium text-white transition-opacity hover:opacity-90"
          >
            Request a Discovery Meeting
          </a>
        </div>
      </section>

      <Stories />

      <BusinessSizes />

      <OrderSupport />

      <ClosingCta />
      </div>

      <Footer />
    </>
  );
}
