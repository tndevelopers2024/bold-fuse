"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/content/site";
import { ArrowUpRight } from "lucide-react";

const field =
  "mt-2 w-full rounded-xl border border-[#cbded5] bg-white px-4 py-3.5 font-description text-base font-medium text-forest outline-none placeholder:text-[#758b80] focus:border-[#008e68] focus:ring-2 focus:ring-[#008e68]/20";

export default function ContactForm() {
  const [opened, setOpened] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = `Name: ${data.get("name")}\nEmail: ${data.get("email")}\nPhone: ${data.get("phone")}\n\nMessage:\n${data.get("message")}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent("Enquiry from Boldfuse website")}&body=${encodeURIComponent(body)}`;
    setOpened(true);
  }
  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-semibold text-forest">
          Name
          <input
            className={field}
            name="name"
            autoComplete="name"
            placeholder="Your name"
          />
        </label>
        <label className="text-sm font-semibold text-forest">
          Email address <span aria-hidden="true">*</span>
          <input
            className={field}
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
          />
        </label>
      </div>
      <label className="block text-sm font-semibold text-forest">
        Phone <span aria-hidden="true">*</span>
        <input
          className={field}
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="Your phone number"
          required
        />
      </label>
      <label className="block text-sm font-semibold text-forest">
        Message
        <textarea
          className={`${field} min-h-36 resize-y`}
          name="message"
          placeholder="Tell us how we can help"
        />
      </label>
      <button
        type="submit"
        className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-forest px-7 py-3 text-sm font-semibold text-white hover:bg-[#006b50] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest"
      >
        Send Message <ArrowUpRight size={17} aria-hidden="true" />
      </button>
      <p
        className="font-description text-sm leading-relaxed text-muted"
        role="status"
      >
        {opened
          ? "Your email app should now open with your message ready to send."
          : "This opens your email app with your message ready to send."}
      </p>
    </form>
  );
}
