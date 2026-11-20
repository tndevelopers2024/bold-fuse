"use client";

import { useState, useEffect, useRef, type FormEvent } from "react";
import { X, CheckCircle2, AlertCircle, ChevronDown } from "lucide-react";

interface CountryCode {
  code: string;
  label: string;
  flag: string;
}

const COUNTRY_CODES: CountryCode[] = [
  { code: "+91", label: "India (+91)", flag: "🇮🇳" },
  { code: "+1", label: "United States / Canada (+1)", flag: "🇺🇸" },
  { code: "+44", label: "United Kingdom (+44)", flag: "🇬🇧" },
  { code: "+971", label: "United Arab Emirates (+971)", flag: "🇦🇪" },
  { code: "+65", label: "Singapore (+65)", flag: "🇸🇬" },
  { code: "+61", label: "Australia (+61)", flag: "🇦🇺" },
  { code: "+966", label: "Saudi Arabia (+966)", flag: "🇸🇦" },
  { code: "+49", label: "Germany (+49)", flag: "🇩🇪" },
  { code: "+33", label: "France (+33)", flag: "🇫🇷" },
  { code: "+60", label: "Malaysia (+60)", flag: "🇲🇾" },
  { code: "+64", label: "New Zealand (+64)", flag: "🇳🇿" },
  { code: "+974", label: "Qatar (+974)", flag: "🇶🇦" },
  { code: "+965", label: "Kuwait (+965)", flag: "🇰🇼" },
  { code: "+968", label: "Oman (+968)", flag: "🇴🇲" },
  { code: "+973", label: "Bahrain (+973)", flag: "🇧🇭" },
  { code: "+31", label: "Netherlands (+31)", flag: "🇳🇱" },
  { code: "+41", label: "Switzerland (+41)", flag: "🇨🇭" },
  { code: "+353", label: "Ireland (+353)", flag: "🇮🇪" },
  { code: "+27", label: "South Africa (+27)", flag: "🇿🇦" },
  { code: "+81", label: "Japan (+81)", flag: "🇯🇵" },
];

export function ContactModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "+91",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  // Close modal function
  const closeModal = () => {
    setIsOpen(false);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      countryCode: "+91",
      phone: "",
      message: "",
    });
    setErrors({});
    setServerError(null);
    setIsSuccess(false);
  };

  // 1. Intercept any "Let's Talk" button/link clicks across the entire site
  useEffect(() => {
    function handleGlobalClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest<HTMLElement>(
        'a, button, [role="button"], [data-open-contact-modal]',
      );
      if (!interactive) return;

      // Extract text content cleanly (collapse multi-line or icon text)
      const text = (interactive.textContent || "").trim().replace(/\s+/g, " ");
      const aria = (interactive.getAttribute("aria-label") || "").trim();

      // Do not intercept interactions inside the open modal itself
      if (modalRef.current && modalRef.current.contains(interactive)) {
        return;
      }

      // Check whether this is a "Let's Talk" or "Get in Touch" action or has explicit trigger
      const isContactTrigger =
        /(?:^|\b)let['’]s\s+talk\b/i.test(text) ||
        /(?:^|\b)let['’]s\s+talk\b/i.test(aria) ||
        /(?:^|\b)get\s+in\s+touch\b/i.test(text) ||
        /(?:^|\b)get\s+in\s+touch\b/i.test(aria) ||
        interactive.hasAttribute("data-open-contact-modal");

      if (isContactTrigger) {
        e.preventDefault();
        e.stopPropagation();

        // If the mobile menu dialog is open, close it cleanly
        const mobileDialog =
          document.querySelector<HTMLDialogElement>("dialog[open]");
        if (mobileDialog) {
          mobileDialog.close();
          document.documentElement.classList.remove("menu-open");
        }

        resetForm();
        setIsOpen(true);
      }
    }

    // Global custom event listener
    function handleCustomEvent() {
      resetForm();
      setIsOpen(true);
    }

    document.addEventListener("click", handleGlobalClick, true);
    window.addEventListener("open-contact-modal", handleCustomEvent);

    return () => {
      document.removeEventListener("click", handleGlobalClick, true);
      window.removeEventListener("open-contact-modal", handleCustomEvent);
    };
  }, []);

  // 2. Escape key listener & Body scroll locking
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        closeModal();
      }
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.classList.add("modal-open");
    window.addEventListener("keydown", handleKeyDown);

    // Auto-focus the first field when modal opens
    const focusTimer = setTimeout(() => {
      nameInputRef.current?.focus();
    }, 50);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.documentElement.classList.remove("modal-open");
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(focusTimer);
    };
  }, [isOpen]);

  // Client validation
  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name.";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email address.";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    const digitsOnly = formData.phone.replace(/\D/g, "");
    if (!formData.phone.trim()) {
      newErrors.phone = "Please enter your phone number.";
    } else if (digitsOnly.length < 7 || digitsOnly.length > 15) {
      newErrors.phone = "Please enter a valid phone number (7 to 15 digits).";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please enter your message.";
    } else if (formData.message.trim().length < 5) {
      newErrors.message = "Message must be at least 5 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          countryCode: formData.countryCode,
          phone: formData.phone.trim(),
          message: formData.message.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        if (data.errors) {
          setErrors(data.errors);
        }
        setServerError(
          data.error || "Failed to submit your message. Please try again.",
        );
        setIsSubmitting(false);
        return;
      }

      // Successful submission
      setIsSuccess(true);
      setIsSubmitting(false);
    } catch {
      setServerError(
        "Network error. Please check your connection and try again.",
      );
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="presentation"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-forest/70 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          closeModal();
        }
      }}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
        className="relative w-full max-w-lg rounded-3xl border border-line bg-white p-6 sm:p-8 shadow-2xl max-h-[92vh] overflow-y-auto"
      >
        {/* Dismiss / Close Icon */}
        <button
          type="button"
          onClick={closeModal}
          aria-label="Close dialog"
          className="absolute top-5 right-5 sm:top-6 sm:right-6 flex h-10 w-10 items-center justify-center rounded-full border border-line bg-cream/70 text-forest hover:bg-cream hover:text-accent-ink focus-visible:outline-2 focus-visible:outline-forest"
        >
          <X size={19} aria-hidden="true" />
        </button>

        {isSuccess ? (
          /* ================================================================ */
          /* SUCCESS STATE                                                    */
          /* ================================================================ */
          <div className="py-4 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/15 text-accent-ink">
              <CheckCircle2 size={36} aria-hidden="true" />
            </div>

            <h3
              id="contact-modal-title"
              className="mt-5 font-heading text-2xl font-bold tracking-tight text-forest sm:text-3xl"
            >
              Message Received!
            </h3>

            <p className="mt-3 font-description text-base font-medium text-muted leading-relaxed">
              Thank you, <strong className="text-forest">{formData.name}</strong>.
              We have successfully received your inquiry and our team will get back
              to you promptly at{" "}
              <span className="font-semibold text-forest">{formData.email}</span>.
            </p>

            <div className="mt-6 rounded-2xl border border-line bg-cream/40 p-4 text-left font-description text-sm font-medium text-muted">
              <p>
                <strong className="text-forest">Phone:</strong>{" "}
                {formData.countryCode} {formData.phone}
              </p>
              <p className="mt-1 line-clamp-2">
                <strong className="text-forest">Message:</strong>{" "}
                {formData.message}
              </p>
            </div>

            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={closeModal}
                className="w-full rounded-full bg-forest px-8 py-3.5 font-heading text-sm font-bold tracking-wider text-white uppercase hover:bg-forest-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* ================================================================ */
          /* FORM STATE                                                       */
          /* ================================================================ */
          <div>
            {/* Header */}
            <div className="pr-10">
              <span className="text-xs font-semibold tracking-[0.2em] text-accent-ink uppercase">
                Get In Touch
              </span>
              <h2
                id="contact-modal-title"
                className="mt-1 font-heading text-2xl font-bold tracking-tight text-forest sm:text-3xl"
              >
                Let’s Talk
              </h2>
              <p className="mt-2 font-description text-sm font-medium leading-relaxed text-muted sm:text-base">
                Share your requirements with our team and we’ll get back to you
                promptly.
              </p>
            </div>

            {/* Server Error Alert */}
            {serverError && (
              <div
                role="alert"
                className="mt-5 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-800"
              >
                <AlertCircle size={18} className="mt-0.5 shrink-0 text-red-600" />
                <span>{serverError}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-bold tracking-wider text-forest uppercase"
                >
                  Name <span className="text-accent-ink">*</span>
                </label>
                <input
                  ref={nameInputRef}
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: "" });
                  }}
                  className={`mt-1.5 w-full rounded-xl border bg-white px-4 py-3 font-description text-sm font-medium text-forest outline-none placeholder:text-muted/60 focus:ring-2 focus:ring-accent-ink/20 ${
                    errors.name
                      ? "border-red-500 focus:border-red-500"
                      : "border-line focus:border-accent-ink"
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 font-description text-xs font-medium text-red-600">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Address Field */}
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-bold tracking-wider text-forest uppercase"
                >
                  Email Address <span className="text-accent-ink">*</span>
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: "" });
                  }}
                  className={`mt-1.5 w-full rounded-xl border bg-white px-4 py-3 font-description text-sm font-medium text-forest outline-none placeholder:text-muted/60 focus:ring-2 focus:ring-accent-ink/20 ${
                    errors.email
                      ? "border-red-500 focus:border-red-500"
                      : "border-line focus:border-accent-ink"
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 font-description text-xs font-medium text-red-600">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Phone Number Field with Country Code Support */}
              <div>
                <label
                  htmlFor="contact-phone"
                  className="block text-xs font-bold tracking-wider text-forest uppercase"
                >
                  Phone Number <span className="text-accent-ink">*</span>
                </label>
                <div className="mt-1.5 flex gap-2">
                  <div className="relative shrink-0">
                    <label htmlFor="contact-country-code" className="sr-only">
                      Country Code
                    </label>
                    <select
                      id="contact-country-code"
                      value={formData.countryCode}
                      onChange={(e) =>
                        setFormData({ ...formData, countryCode: e.target.value })
                      }
                      className="h-full appearance-none rounded-xl border border-line bg-white py-3 pr-9 pl-3 font-description text-sm font-medium text-forest outline-none focus:border-accent-ink focus:ring-2 focus:ring-accent-ink/20"
                    >
                      {COUNTRY_CODES.map((item) => (
                        <option key={item.code} value={item.code}>
                          {item.flag} {item.code}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      aria-hidden="true"
                      className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-forest"
                    />
                  </div>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="98765 43210"
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value });
                      if (errors.phone) setErrors({ ...errors, phone: "" });
                    }}
                    className={`min-w-0 flex-1 rounded-xl border bg-white px-4 py-3 font-description text-sm font-medium text-forest outline-none placeholder:text-muted/60 focus:ring-2 focus:ring-accent-ink/20 ${
                      errors.phone
                        ? "border-red-500 focus:border-red-500"
                        : "border-line focus:border-accent-ink"
                    }`}
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 font-description text-xs font-medium text-red-600">
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-bold tracking-wider text-forest uppercase"
                >
                  Message <span className="text-accent-ink">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  placeholder="Tell us how we can help..."
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value });
                    if (errors.message) setErrors({ ...errors, message: "" });
                  }}
                  className={`mt-1.5 w-full resize-y rounded-xl border bg-white px-4 py-3 font-description text-sm font-medium text-forest outline-none placeholder:text-muted/60 focus:ring-2 focus:ring-accent-ink/20 min-h-24 ${
                    errors.message
                      ? "border-red-500 focus:border-red-500"
                      : "border-line focus:border-accent-ink"
                  }`}
                />
                {errors.message && (
                  <p className="mt-1 font-description text-xs font-medium text-red-600">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-full bg-forest px-8 py-3.5 font-heading text-sm font-bold tracking-wider text-white uppercase hover:bg-forest-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? "Sending..." : "Get in Touch"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
