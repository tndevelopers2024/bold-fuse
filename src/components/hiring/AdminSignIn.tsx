import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { login } from "@/lib/hiring/actions";
import { Field, HiringForm } from "@/components/hiring/Forms";

export function AdminSignIn() {
  return (
    <main id="main-content" className="bg-white">
      <div className="mx-auto w-full max-w-[80rem] px-3 py-6 sm:px-6 sm:py-16 md:px-10 xl:px-16">
        <div className="mx-auto max-w-md overflow-hidden rounded-2xl border border-line bg-white sm:rounded-3xl">
          <div className="relative isolate overflow-hidden bg-forest-surface px-5 py-6 text-white sm:px-8 sm:py-7">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_0%_0%,rgba(2,170,119,0.28),transparent_60%),radial-gradient(ellipse_at_100%_100%,rgba(97,198,168,0.18),transparent_55%)]"
            >
              <svg
                viewBox="0 0 480 220"
                preserveAspectRatio="none"
                focusable="false"
                className="absolute inset-0 h-full w-full text-accent-soft"
                fill="none"
              >
                <path
                  d="M200 240C300 215 290 125 390 135S465 70 500 35"
                  stroke="currentColor"
                  strokeWidth="1"
                  opacity="0.16"
                />
                <path
                  d="M255 245C340 225 335 160 420 165S485 110 510 85"
                  stroke="currentColor"
                  strokeWidth="1"
                  opacity="0.1"
                />
              </svg>
            </div>
            <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-accent-soft uppercase">
              <ShieldCheck size={14} aria-hidden="true" />
              Boldfuse Recruiting
            </p>
            <h1 className="mt-2 font-heading text-2xl font-bold text-white sm:text-3xl">
              Hiring admin sign-in
            </h1>
            <p className="mt-2 font-description text-sm font-medium text-white/80">
              Sign in with your administrator credentials to manage job postings
              and review candidate applications.
            </p>
          </div>

          <div className="p-5 sm:p-8">
            <HiringForm action={login} button="Sign in" fullWidthButton>
              <Field
                label="Email address"
                name="email"
                type="email"
                autoComplete="username"
                placeholder="hiring@boldfuse.in"
                max={254}
              />
              <Field
                label="Password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                max={256}
              />
            </HiringForm>

            <div className="mt-6 border-t border-line pt-4">
              <Link
                href="/careers/"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-ink hover:text-forest"
              >
                <ArrowLeft size={15} aria-hidden="true" />
                Back to public Careers page
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
