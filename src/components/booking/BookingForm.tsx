"use client";

import { useState } from "react";
import { Mail, MessageCircle, Phone, Send } from "lucide-react";
import { site } from "@/content/site";

const services = [
  "Anxiety Counselling",
  "Depression Counselling",
  "Child and Adolescent Counselling",
  "Teen Counselling",
  "Parenting Support",
  "Trauma Counselling",
  "Grief and Loss Counselling",
  "Eating Disorder Counselling",
  "Substance Abuse Counselling",
  "Self-Esteem Counselling",
  "Stress Management Counselling",
  "Couples Counselling",
  "Therapy",
  "Parenting",
  "Psychological Testing",
  "Psychosis Treatment",
  "De-addiction Services",
  "Business services",
  "Other",
];

export default function BookingForm({
  initialService = "",
}: {
  initialService?: string;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState(
    services.includes(initialService) ? initialService : "",
  );
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");

  const messageText = [
    "Hello Boldfuse, I would like to book an appointment.",
    `Name: ${name}`,
    `Phone: ${phone}`,
    email && `Email: ${email}`,
    `Service: ${service || "General enquiry"}`,
    date && `Preferred date: ${date}`,
    time && `Preferred time: ${time}`,
    message && `Message: ${message}`,
  ]
    .filter(Boolean)
    .join("\n");

  const whatsappHref = `https://wa.me/${site.telephone.replace("+", "")}?text=${encodeURIComponent(messageText)}`;
  const mailHref = `mailto:${site.email}?subject=${encodeURIComponent(
    `Booking enquiry: ${service || "General"}`,
  )}&body=${encodeURIComponent(messageText)}`;

  const inputClasses =
    "w-full rounded-xl border border-line bg-white px-4 py-3 font-description text-sm font-medium text-charcoal placeholder:text-muted/60 focus:outline-2 focus:outline-offset-1 focus:outline-accent";
  const labelClasses =
    "mb-1.5 block font-description text-sm font-semibold text-forest";

  return (
    <form
      className="space-y-5"
      onSubmit={(event) => {
        event.preventDefault();
        if (!event.currentTarget.checkValidity()) {
          event.currentTarget.reportValidity();
          return;
        }
        window.open(whatsappHref, "_blank", "noopener,noreferrer");
      }}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="booking-name" className={labelClasses}>
            Full name <span aria-hidden="true">*</span>
          </label>
          <input
            id="booking-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="booking-phone" className={labelClasses}>
            Phone <span aria-hidden="true">*</span>
          </label>
          <input
            id="booking-phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            placeholder="+91 00000 00000"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            className={inputClasses}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="booking-email" className={labelClasses}>
            Email <span className="font-medium text-muted">(optional)</span>
          </label>
          <input
            id="booking-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="booking-service" className={labelClasses}>
            Service <span aria-hidden="true">*</span>
          </label>
          <select
            id="booking-service"
            name="service"
            required
            value={service}
            onChange={(event) => setService(event.target.value)}
            className={inputClasses}
          >
            <option value="" disabled>
              Select a service
            </option>
            {services.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="booking-date" className={labelClasses}>
            Preferred date
          </label>
          <input
            id="booking-date"
            name="date"
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="booking-time" className={labelClasses}>
            Preferred time
          </label>
          <input
            id="booking-time"
            name="time"
            type="time"
            value={time}
            onChange={(event) => setTime(event.target.value)}
            className={inputClasses}
          />
        </div>
      </div>

      <div>
        <label htmlFor="booking-message" className={labelClasses}>
          Message <span className="font-medium text-muted">(optional)</span>
        </label>
        <textarea
          id="booking-message"
          name="message"
          rows={4}
          placeholder="Tell us briefly what you would like support with."
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className={`${inputClasses} resize-y`}
        />
      </div>

      <div className="flex flex-wrap gap-4 pt-2">
        <button
          type="submit"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent-ink px-7 py-3 text-sm font-semibold text-white hover:bg-forest focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink"
        >
          <Send size={16} aria-hidden="true" />
          Send on WhatsApp
        </button>
        <a
          href={mailHref}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-line px-7 py-3 text-sm font-semibold text-forest hover:bg-[#e8f5ef] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
        >
          <Mail size={16} aria-hidden="true" />
          Email us instead
        </a>
      </div>

      <p className="font-description text-xs leading-relaxed font-medium text-muted">
        Prefer to talk? Call{" "}
        <a
          href={`tel:${site.telephone}`}
          className="inline-flex items-center gap-1 font-semibold text-accent-ink hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink"
        >
          <Phone size={13} aria-hidden="true" />
          {site.phone}
        </a>{" "}
        or{" "}
        <a
          href={`https://wa.me/${site.telephone.replace("+", "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-semibold text-accent-ink hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink"
        >
          <MessageCircle size={13} aria-hidden="true" />
          WhatsApp
        </a>
        . Your details are only used to arrange your appointment.
      </p>
    </form>
  );
}
