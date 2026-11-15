"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/content/site";

const services = ["Production", "Social media", "Performance", "Not sure yet"];
const budgets = ["Under Rp 10 jt", "Rp 10–30 jt", "Rp 30–100 jt", "Rp 100 jt+", "Let’s talk"];

const field =
  "w-full rounded-xl border border-lab-line2 bg-white px-4 py-3 text-[15px] outline-none transition-colors placeholder:text-lab-light focus:border-lab-ink";
const label = "grid gap-1.5 text-[13px] font-medium";

/**
 * Posts to /api/contact (emails the enquiry via Resend when configured). If email sending is not set up or fails,
 * the form switches to a fallback: an email link with the enquiry pre-filled, plus WhatsApp, so nothing is lost.
 */
export function ContactForm({ defaultService = "" }: { defaultService?: string }) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error" | "fallback">("idle");
  const [error, setError] = useState("");
  const [mailto, setMailto] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setState("sending");
    setError("");
    const brand = String(f.get("brand") || "").trim();
    const service = String(f.get("service") || "");
    const extra = String(f.get("link") || "").trim();
    const payload = {
      name: String(f.get("name") || ""),
      email: String(f.get("email") || ""),
      subject: [service || "General", brand].filter(Boolean).join(" — "),
      budget: String(f.get("budget") || "") || undefined,
      message: [String(f.get("message") || ""), extra && `Instagram / website: ${extra}`].filter(Boolean).join("\n\n"),
      website: String(f.get("website") || ""),
    };
    const fallback = () => {
      const body = [`Hi Hey Coco!,`, ``, payload.message, ``, payload.budget ? `Budget: ${payload.budget}` : "", `From: ${payload.name} (${payload.email})`]
        .filter((l, i, a) => l !== "" || a[i - 1] !== "")
        .join("\n");
      setMailto(`mailto:${site.email}?subject=${encodeURIComponent(`Enquiry: ${payload.subject}`)}&body=${encodeURIComponent(body)}`);
      setState("fallback");
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        if (j.fallback) return fallback();
        throw new Error(j.error || "Something went wrong.");
      }
      setState("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div role="status" className="rounded-2xl border border-lab-line bg-white p-8">
        <p className="t-mono text-lab-accent">Message received</p>
        <p className="t-h3 mt-3">Thank you, we’ve got it.</p>
        <p className="t-body mt-2">We’ll reply within a day. If it’s urgent, message us on WhatsApp.</p>
      </div>
    );
  }

  if (state === "fallback") {
    return (
      <div role="status" className="rounded-2xl border border-lab-line bg-white p-8">
        <p className="t-mono text-lab-accent">One more step</p>
        <p className="t-h3 mt-3">Send it straight to our inbox.</p>
        <p className="t-body mt-2">Our form can’t send right now, so we’ve written the email for you. Just press send, or message us on WhatsApp.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={mailto} className="lab-btn inline-flex h-11 items-center rounded-full bg-lab-ink px-5 text-[13.5px] font-medium text-white">
            Email {site.email}
          </a>
          <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center rounded-full border border-lab-line2 px-5 text-[13.5px] font-medium">
            WhatsApp us
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
      <label className={label}>
        Your name
        <input name="name" required minLength={2} autoComplete="name" className={field} placeholder="Jane Doe" />
      </label>
      <label className={label}>
        Email
        <input name="email" type="email" required autoComplete="email" className={field} placeholder="you@brand.com" />
      </label>
      <label className={label}>
        Brand
        <input name="brand" className={field} placeholder="Brand or company name" />
      </label>
      <label className={label}>
        Instagram or website
        <input name="link" className={field} placeholder="@yourbrand or yourbrand.com" />
      </label>
      <label className={label}>
        What do you need?
        <select name="service" defaultValue={defaultService} className={field}>
          <option value="">Choose one</option>
          {services.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </label>
      <label className={label}>
        Monthly budget
        <select name="budget" defaultValue="" className={field}>
          <option value="">Prefer not to say</option>
          {budgets.map((b) => (
            <option key={b}>{b}</option>
          ))}
        </select>
      </label>
      <label className={`${label} sm:col-span-2`}>
        Tell us about the project
        <textarea name="message" required minLength={10} rows={5} className={field} placeholder="What are you making, and what would make it a success?" />
      </label>
      {/* Honeypot: real people never see or fill this */}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button
          type="submit"
          disabled={state === "sending"}
          className="lab-btn inline-flex h-11 items-center gap-3 rounded-full bg-lab-ink pl-5 pr-[6px] text-[13.5px] font-medium text-white disabled:opacity-60"
        >
          {state === "sending" ? "Sending…" : "Send message"}
          <span className="chip grid size-[32px] place-items-center rounded-full bg-white text-lab-ink">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
              <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </button>
        {state === "error" && <p role="alert" className="text-[13px] text-red-700">{error}</p>}
      </div>
    </form>
  );
}
