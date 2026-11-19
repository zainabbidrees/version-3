"use client";

import { useId, useState } from "react";

/* Contact form UI for the Brand Fulfillment contact page. Front-end only —
   there is no backend wired up, so submit shows an inline confirmation rather
   than posting anywhere. Labels sit above inputs; required fields are marked. */

const INTERESTS = [
  "Apparel & Uniforms",
  "Custom Online Stores",
  "Promotional Products",
  "Not sure yet",
];

const fieldBase =
  "mt-2 w-full rounded-xl border border-ink/15 bg-surface px-4 py-3 text-[0.98rem] text-ink outline-none transition-colors placeholder:text-ink-40 focus:border-ink/40";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [interests, setInterests] = useState<string[]>([]);
  const uid = useId();

  const toggle = (label: string) =>
    setInterests((cur) =>
      cur.includes(label) ? cur.filter((i) => i !== label) : [...cur, label],
    );

  if (sent) {
    return (
      <div className="flex min-h-[28rem] flex-col items-start justify-center bg-element p-8 md:p-10">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ink text-page">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path
              d="M4 10.5l3.5 3.5L16 5.5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <h3 className="h3 mt-6 text-ink">Thanks — your request is in.</h3>
        <p className="mt-3 max-w-[40ch] text-[0.98rem] leading-relaxed text-ink-60">
          We&rsquo;ll review your details and contact you to arrange a discovery meeting.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-8 text-[0.9rem] font-medium text-ink underline underline-offset-4"
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="bg-element p-6 md:p-8 lg:p-10"
    >
      <fieldset>
        <legend className="text-[0.82rem] font-medium uppercase tracking-[0.14em] text-ink-40">
          I&rsquo;m interested in <span className="normal-case tracking-normal">(optional)</span>
        </legend>
        <p className="mt-1 text-[0.85rem] text-ink-40">Select all that apply</p>
        <div className="mt-4 flex flex-wrap gap-2.5">
          {INTERESTS.map((label) => {
            const active = interests.includes(label);
            return (
              <button
                type="button"
                key={label}
                aria-pressed={active}
                onClick={() => toggle(label)}
                className={`rounded-full border px-4 py-2 text-[0.9rem] transition-colors ${
                  active
                    ? "border-ink bg-ink text-page"
                    : "border-ink/20 text-ink/80 hover:border-ink/40"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${uid}-first`} className="text-[0.88rem] font-medium text-ink">
            First Name <span className="text-poppy">*</span>
          </label>
          <input id={`${uid}-first`} name="first" required className={fieldBase} autoComplete="given-name" />
        </div>
        <div>
          <label htmlFor={`${uid}-last`} className="text-[0.88rem] font-medium text-ink">
            Last Name <span className="text-poppy">*</span>
          </label>
          <input id={`${uid}-last`} name="last" required className={fieldBase} autoComplete="family-name" />
        </div>
        <div>
          <label htmlFor={`${uid}-company`} className="text-[0.88rem] font-medium text-ink">
            Company <span className="text-poppy">*</span>
          </label>
          <input id={`${uid}-company`} name="company" required className={fieldBase} autoComplete="organization" />
        </div>
        <div>
          <label htmlFor={`${uid}-email`} className="text-[0.88rem] font-medium text-ink">
            Email <span className="text-poppy">*</span>
          </label>
          <input id={`${uid}-email`} name="email" type="email" required className={fieldBase} autoComplete="email" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={`${uid}-phone`} className="text-[0.88rem] font-medium text-ink">
            Phone Number <span className="font-normal text-ink-40">(optional)</span>
          </label>
          <input id={`${uid}-phone`} name="phone" type="tel" className={fieldBase} autoComplete="tel" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={`${uid}-message`} className="text-[0.88rem] font-medium text-ink">
            Message
          </label>
          <textarea id={`${uid}-message`} name="message" rows={4} className={`${fieldBase} resize-y`} />
        </div>
      </div>

      <button
        type="submit"
        className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-ink px-7 py-3.5 text-[0.95rem] font-medium text-white transition-opacity hover:opacity-90 active:scale-[0.99] sm:w-auto"
      >
        Request a Discovery Meeting
      </button>
      <p className="mt-4 text-[0.88rem] text-ink-40">
        We&rsquo;ll review your request and contact you to arrange a time.
      </p>
    </form>
  );
}
