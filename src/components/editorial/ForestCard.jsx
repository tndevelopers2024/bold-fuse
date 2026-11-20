export const forestCardClass = "relative isolate flex flex-col overflow-hidden rounded-[1.5rem] border border-forest-soft/60 bg-forest-soft p-5 shadow-[0_18px_40px_-22px_rgba(23,63,53,0.55)] sm:p-7";
export const forestCardIconClass = "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-accent-soft";

export function ForestCardBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_0%_0%,rgba(2,170,119,0.3),transparent_70%)]"
    >
      <svg
        viewBox="0 0 300 200"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full text-accent-soft"
        fill="none"
      >
        <path
          d="M70 230C180 215 160 125 250 140S310 75 340 40"
          stroke="currentColor"
          opacity="0.14"
        />
        <path
          d="M120 235C215 220 200 160 280 170S335 120 355 90"
          stroke="currentColor"
          opacity="0.09"
        />
      </svg>
    </div>
  );
}
