import type { ReactNode } from "react";
import { ClosingCta } from "@/components/ClosingCta";
import { Footer } from "@/components/Footer";
import { RevealWords } from "@/components/RevealWords";

/* Shared page primitives for the Brand Fulfillment sub-pages, built in the
   same noho language as the homepage sections: warm paper palette, Switzer
   display type, numbered lists grouped by hairline rules, pill chips, and the
   reveal-footer shell (content slides up over the pinned ink footer). Kept
   deliberately simple so each section can be redesigned from an inspiration
   later without unpicking bespoke markup. */

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2 text-[0.78rem] font-medium uppercase tracking-[0.18em] text-ink-40">
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-poppy" />
      {children}
    </p>
  );
}

export type Action = { label: string; href: string; variant?: "solid" | "outline" };

export function Actions({ actions, className = "" }: { actions: Action[]; className?: string }) {
  return (
    <div className={`flex flex-col gap-3 sm:flex-row sm:flex-wrap ${className}`}>
      {actions.map((a) =>
        a.variant === "outline" ? (
          <a
            key={a.label}
            href={a.href}
            className="inline-flex items-center justify-center rounded-full border border-ink/20 px-7 py-3.5 text-[0.95rem] font-medium text-ink transition-colors hover:border-ink/40 hover:bg-ink/[0.04] active:scale-[0.98]"
          >
            {a.label}
          </a>
        ) : (
          <a
            key={a.label}
            href={a.href}
            className="inline-flex items-center justify-center rounded-full bg-ink px-7 py-3.5 text-[0.95rem] font-medium text-white transition-opacity hover:opacity-90 active:scale-[0.98]"
          >
            {a.label}
          </a>
        ),
      )}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  lead,
  actions,
}: {
  eyebrow?: string;
  title: string;
  lead?: ReactNode;
  actions?: Action[];
}) {
  return (
    <section className="bg-element">
      <div className="mx-auto max-w-[1400px] px-6 pb-14 pt-32 md:px-10 md:pb-20 md:pt-44 lg:px-14">
        {eyebrow && (
          <p className="inline-flex items-center gap-2 text-[0.78rem] font-medium uppercase tracking-[0.18em] text-ink/55">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-ink" />
            {eyebrow}
          </p>
        )}
        <h1
          aria-label={title}
          className={`${eyebrow ? "mt-6 " : ""}max-w-[22ch] font-semibold leading-[0.98] tracking-[-0.04em] text-ink`}
          style={{ fontSize: "clamp(2.6rem, 1.4rem + 4.6vw, 5.6rem)", textWrap: "balance" }}
        >
          <RevealWords text={title} />
        </h1>
        {lead && (
          <p
            className="mt-7 max-w-[60ch] text-[1.1rem] leading-relaxed text-ink/70"
            style={{ textWrap: "balance" }}
          >
            {lead}
          </p>
        )}
        {actions && actions.length > 0 && <Actions actions={actions} className="mt-9" />}
      </div>
    </section>
  );
}

export function Section({
  children,
  tone,
  className = "",
}: {
  children: ReactNode;
  tone?: "page" | "element" | "ink";
  className?: string;
}) {
  const bg = tone === "element" ? "bg-element" : tone === "ink" ? "bg-ink text-page" : "";
  return (
    <section className={`relative py-14 md:py-20 ${bg} ${className}`}>
      <div className="mx-auto max-w-[1840px] px-6 md:px-10 lg:px-14">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`max-w-[48rem] ${className}`}>
      {eyebrow && (
        <div className="mb-5">
          <Eyebrow>{eyebrow}</Eyebrow>
        </div>
      )}
      <h2 className="h2 text-ink">{title}</h2>
      {lead && <p className="mt-6 text-[1.02rem] leading-relaxed text-ink-60">{lead}</p>}
    </div>
  );
}

export function Chips({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2.5">
      {items.map((it) => (
        <li
          key={it}
          className="rounded-full border border-ink/15 px-4 py-2 text-[0.92rem] text-ink/80"
        >
          {it}
        </li>
      ))}
    </ul>
  );
}

export type Step = { num?: string; title: string; body?: ReactNode };

export function NumberedList({ items, cols = 3 }: { items: Step[]; cols?: 2 | 3 | 4 }) {
  const colClass =
    cols === 2
      ? "sm:grid-cols-2"
      : cols === 4
        ? "sm:grid-cols-2 lg:grid-cols-4"
        : "sm:grid-cols-2 lg:grid-cols-3";
  return (
    <div className={`grid grid-cols-1 gap-x-10 gap-y-10 ${colClass}`}>
      {items.map((s, i) => (
        <div key={i} className="border-t border-ink/15 pt-6">
          {s.num && (
            <span className="block text-[0.82rem] font-medium tabular-nums text-ink-40">
              {s.num}
            </span>
          )}
          <h3 className="mt-4 text-[1.1rem] font-semibold tracking-[-0.02em] text-ink">
            {s.title}
          </h3>
          {s.body && <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-60">{s.body}</p>}
        </div>
      ))}
    </div>
  );
}

/* Reveal-footer shell: page content slides up over the pinned ink footer,
   matching the homepage. Pass closing={false} to omit the shared CTA. */
export function PageShell({
  children,
  closing = true,
}: {
  children: ReactNode;
  closing?: boolean;
}) {
  return (
    <>
      <div className="relative z-10 bg-page lg:mb-[100dvh]">
        {children}
        {closing && <ClosingCta />}
      </div>
      <Footer />
    </>
  );
}
