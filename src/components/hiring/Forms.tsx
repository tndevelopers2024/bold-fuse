"use client";

import { useActionState, type ReactNode } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";

export const inputClass =
  "mt-1.5 block w-full rounded-xl border border-line bg-white px-3.5 py-2.5 font-description text-base font-medium text-forest placeholder:text-muted/70 focus:border-accent-ink focus:outline-none focus:ring-2 focus:ring-accent-ink/20";

export function Field({
  label,
  name,
  type = "text",
  max,
  autoComplete,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  max: number;
  autoComplete?: string;
  placeholder?: string;
}) {
  return (
    <label className="block text-sm font-semibold text-forest">
      {label}
      <input
        className={inputClass}
        type={type}
        name={name}
        required
        maxLength={max}
        autoComplete={autoComplete}
        placeholder={placeholder}
      />
    </label>
  );
}

export function HiringForm({
  action,
  button,
  children,
  fullWidthButton = false,
  tone = "neutral",
}: {
  action: (previous: string, data: FormData) => Promise<string>;
  button: string;
  children: ReactNode;
  fullWidthButton?: boolean;
  tone?: "neutral" | "error";
}) {
  const [message, submit, pending] = useActionState(action, "");
  const isError =
    tone === "error" ||
    (Boolean(message) &&
      /invalid|too many|unavailable|closed|enter|not been configured/i.test(
        message,
      ));

  return (
    <form action={submit} className="mt-5 grid gap-4">
      {children}
      {message && (
        <div
          role={isError ? "alert" : "status"}
          className={
            isError
              ? "flex items-start gap-2.5 rounded-xl border border-danger/30 bg-danger/5 px-3.5 py-3 font-description text-sm font-medium text-danger"
              : "flex items-start gap-2.5 rounded-xl border border-accent/35 bg-accent/10 px-3.5 py-3 font-description text-sm font-medium text-forest"
          }
        >
          {isError ? (
            <AlertCircle
              size={18}
              aria-hidden="true"
              className="mt-0.5 shrink-0"
            />
          ) : (
            <CheckCircle2
              size={18}
              aria-hidden="true"
              className="mt-0.5 shrink-0 text-accent-ink"
            />
          )}
          <span>{message}</span>
        </div>
      )}
      <button
        disabled={pending}
        className={`${fullWidthButton ? "w-full justify-center" : "w-fit"} inline-flex min-h-11 items-center rounded-full bg-forest px-6 py-2.5 text-sm font-semibold text-white hover:bg-forest-soft disabled:opacity-60`}
      >
        {pending ? "Please wait…" : button}
      </button>
    </form>
  );
}
