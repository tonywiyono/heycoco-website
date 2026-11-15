import type { Metadata } from "next";
import { ContactForm } from "@/components/lab/ContactForm";
import { Eyebrow, Hl } from "@/components/lab/LabShared";
import { labSite } from "@/content/lab";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell Hey Coco! about your project. We reply within a day.",
};

export default function Contact() {
  return (
    <section className="bg-lab-bg pb-24 pt-36 lg:pt-44">
      <div className="lab-container grid gap-12 lg:grid-cols-[0.9fr_1.4fr] lg:gap-20">
        <div>
          <Eyebrow>Contact</Eyebrow>
          <h1 className="t-h1 mt-5">
            Let’s <Hl>create.</Hl>
          </h1>
          <p className="t-body mt-5 max-w-sm text-[16px]">Tell us about the project. We reply within a day.</p>
          <ul className="mt-10 divide-y divide-lab-line border-y border-lab-line text-[15px]">
            <li className="py-4">
              <span className="t-mono block text-lab-light">Email</span>
              <a href={`mailto:${labSite.email}`} className="mt-1 inline-block font-medium underline-offset-4 hover:underline">{labSite.email}</a>
            </li>
            <li className="py-4">
              <span className="t-mono block text-lab-light">WhatsApp</span>
              <a href={labSite.whatsapp} className="mt-1 inline-block font-medium underline-offset-4 hover:underline">{labSite.phone}</a>
            </li>
            <li className="py-4">
              <span className="t-mono block text-lab-light">Studio</span>
              <span className="mt-1 inline-block font-medium">{labSite.locations}</span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl border border-lab-line bg-white p-6 sm:p-9">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
