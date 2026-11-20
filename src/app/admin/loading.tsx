export default function AdminLoading() {
  return (
    <main
      id="main-content"
      aria-busy="true"
      aria-label="Loading hiring dashboard"
      className="bg-white"
    >
      <div className="mx-auto w-full max-w-[80rem] space-y-5 px-3 py-4 sm:space-y-6 sm:px-6 sm:py-8 md:px-10 xl:px-16">
        <p className="sr-only" role="status">
          Loading hiring dashboard…
        </p>

        {/* Compact Header Skeleton */}
        <div className="rounded-2xl border border-forest-soft/40 bg-forest-surface p-4 sm:rounded-3xl sm:px-7 sm:py-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="h-3.5 w-36 rounded-full bg-white/15" />
              <div className="h-8 w-56 rounded-xl bg-white/20" />
            </div>
            <div className="flex flex-wrap gap-2.5">
              <div className="h-10 w-40 rounded-full bg-white/20" />
              <div className="h-10 w-32 rounded-full bg-white/10" />
              <div className="h-10 w-28 rounded-full bg-white/10" />
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 border-t border-white/15 pt-4 lg:grid-cols-4">
            {[0, 1, 2, 3].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/12 bg-white/[0.05] px-4 py-3"
              >
                <div className="h-3 w-24 rounded-full bg-white/15" />
                <div className="mt-2 h-7 w-12 rounded-lg bg-white/20" />
              </div>
            ))}
          </div>
        </div>

        {/* Workspace Skeleton */}
        <div className="grid items-start gap-6 lg:grid-cols-[minmax(330px,400px)_minmax(0,1fr)] xl:grid-cols-[420px_minmax(0,1fr)]">
          <div className="space-y-4 rounded-3xl border border-line bg-white p-5 sm:p-6">
            <div className="h-6 w-36 rounded-lg bg-forest/10" />
            <div className="h-10 w-full rounded-xl bg-forest/8" />
            <div className="flex gap-2">
              <div className="h-9 w-16 rounded-full bg-forest/10" />
              <div className="h-9 w-20 rounded-full bg-forest/8" />
              <div className="h-9 w-20 rounded-full bg-forest/8" />
            </div>
            {[0, 1, 2].map((item) => (
              <div
                key={item}
                className="space-y-3 rounded-2xl border border-line p-4"
              >
                <div className="flex justify-between">
                  <div className="h-5 w-16 rounded-full bg-forest/10" />
                  <div className="h-4 w-20 rounded-full bg-forest/8" />
                </div>
                <div className="h-5 w-3/4 rounded-lg bg-forest/12" />
                <div className="h-4 w-1/2 rounded-lg bg-forest/8" />
              </div>
            ))}
          </div>

          <div className="space-y-5 rounded-3xl border border-line bg-white p-5 sm:p-7">
            <div className="space-y-2 border-b border-line pb-5">
              <div className="h-4 w-32 rounded-full bg-forest/10" />
              <div className="h-7 w-72 rounded-xl bg-forest/12" />
              <div className="h-4 w-64 rounded-lg bg-forest/8" />
            </div>
            <div className="flex flex-wrap gap-2">
              {[0, 1, 2, 3, 4, 5].map((item) => (
                <div
                  key={item}
                  className="h-9 w-24 rounded-full bg-forest/8"
                />
              ))}
            </div>
            {[0, 1].map((item) => (
              <div
                key={item}
                className="space-y-3 rounded-2xl border border-line p-5"
              >
                <div className="h-5 w-48 rounded-lg bg-forest/12" />
                <div className="h-4 w-64 rounded-lg bg-forest/8" />
                <div className="h-12 w-full rounded-xl bg-forest/6" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
