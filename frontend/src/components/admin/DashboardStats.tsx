export default function DashboardStats() {
  return (
    <section>
      <div className="mb-5">
        <h2 className="font-display text-2xl font-semibold text-ink">
          Overview
        </h2>

        <p className="text-sm text-ink/70">
          Current status of the FAQ and escalation system.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

        {/* Total FAQs */}
        <div className="rounded-2xl border border-line bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <p className="text-sm font-medium uppercase tracking-wide text-ink/60">
            Total FAQs
          </p>

          <h3 className="mt-2 text-4xl font-bold text-ink">
            124
          </h3>

          <p className="mt-2 text-sm text-ink/70">
            Official FAQs currently published.
          </p>
        </div>

        {/* Escalated Queries */}
        <div className="rounded-2xl border border-line bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <p className="text-sm font-medium uppercase tracking-wide text-ink/60">
            Escalated Queries
          </p>

          <h3 className="mt-2 text-4xl font-bold text-yellow-600">
            18
          </h3>

          <p className="mt-2 text-sm text-ink/70">
            Queries awaiting administrator review.
          </p>
        </div>

        {/* Resolved Today */}
        <div className="rounded-2xl border border-line bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <p className="text-sm font-medium uppercase tracking-wide text-ink/60">
            Resolved Today
          </p>

          <h3 className="mt-2 text-4xl font-bold text-blue-600">
            9
          </h3>

          <p className="mt-2 text-sm text-ink/70">
            Queries resolved by administrators today.
          </p>
        </div>

      </div>
    </section>
  );
}