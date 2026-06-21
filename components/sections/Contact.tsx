"use client";

import type { FaqItem, SiteInfo } from "@/lib/types/content";
import { Section } from "@/components/layout/Section";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { SectionHead } from "@/components/ui/SectionHead";
import { SectionPanel } from "@/components/ui/SectionPanel";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(2, "Please enter a subject"),
  budget: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  website: z.string().max(0).optional(),
});

type ContactForm = z.infer<typeof contactSchema>;

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none";

export function Contact({ faqItems, site }: { faqItems: FaqItem[]; site: SiteInfo }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: { website: "" },
  });

  const onSubmit = async (data: ContactForm) => {
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Failed to send message");
      }

      setStatus("success");
      reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  const faqAccordion = faqItems.map((item) => ({
    id: item.id,
    title: item.question,
    content: item.answer,
  }));

  return (
    <Section id="contact" title="Contact" className="mb-4 space-y-4">
      <SectionPanel variant="dark">
        <SectionHead
          title="Let's Chat!"
          dark
          description="We will ask the right questions, discuss possibilities and make an action plan."
        />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-4 grid gap-5 sm:grid-cols-2"
          noValidate
        >
          <input
            type="text"
            {...register("website")}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden
          />

          <div>
            <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
              Full Name <span className="text-accent">*</span>
            </label>
            <input id="name" type="text" {...register("name")} className={inputClass} />
            {errors.name && (
              <p className="mt-1 text-xs text-red-400" role="alert">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
              Email Address <span className="text-accent">*</span>
            </label>
            <input id="email" type="email" {...register("email")} className={inputClass} />
            {errors.email && (
              <p className="mt-1 text-xs text-red-400" role="alert">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="subject" className="mb-1.5 block text-sm font-medium">
              Subject <span className="text-accent">*</span>
            </label>
            <input id="subject" type="text" {...register("subject")} className={inputClass} />
            {errors.subject && (
              <p className="mt-1 text-xs text-red-400" role="alert">{errors.subject.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="budget" className="mb-1.5 block text-sm font-medium">
              Your Budget <span className="text-text-muted">(Optional)</span>
            </label>
            <select id="budget" {...register("budget")} className={inputClass} defaultValue="">
              <option value="">Select range</option>
              <option value="under-5k">Under $5,000</option>
              <option value="5k-15k">$5,000 – $15,000</option>
              <option value="15k-50k">$15,000 – $50,000</option>
              <option value="50k+">$50,000+</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
              Message
            </label>
            <textarea id="message" rows={5} {...register("message")} className={`${inputClass} resize-none`} />
            {errors.message && (
              <p className="mt-1 text-xs text-red-400" role="alert">{errors.message.message}</p>
            )}
          </div>

          {status === "success" && (
            <p className="text-sm text-green-400 sm:col-span-2" role="status">
              Message sent! We&apos;ll be in touch soon.
            </p>
          )}
          {status === "error" && (
            <p className="text-sm text-red-400 sm:col-span-2" role="alert">{errorMessage}</p>
          )}

          <div className="sm:col-span-2">
            <Button type="submit" variant="primary" disabled={status === "loading"}>
              {status === "loading" ? "Sending..." : "Send Your Message"}
            </Button>
            <p className="mt-4 text-xs text-text-muted">
              Or reach us on{" "}
              <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                WhatsApp
              </a>
            </p>
          </div>
        </form>
      </SectionPanel>

      <SectionPanel>
        <h2 className="text-2xl font-bold text-text-dark">Got Something in Your Mind?</h2>
        <p className="mt-2 text-sm text-black/60">Maybe you can find the answer here.</p>
        <div className="mt-6">
          <Accordion items={faqAccordion} variant="light" />
        </div>
      </SectionPanel>
    </Section>
  );
}
