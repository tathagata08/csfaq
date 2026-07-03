import StatCard from "./StatCard";

const dashboardStats = [
  {
    title: "Total FAQs",
    value: 124,
    description: "Official FAQs currently published.",
    accent: "moss" as const,
  },
  {
    title: "Escalated Queries",
    value: 18,
    description: "Queries awaiting administrator review.",
    accent: "amber" as const,
  },
  {
    title: "Resolved Today",
    value: 9,
    description: "Queries resolved by administrators today.",
    accent: "blue" as const,
  },
];

export default function DashboardStats() {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-semibold text-ink">
            Overview
          </h2>

          <p className="text-sm text-ink/70">
            Current status of the FAQ and escalation system.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {dashboardStats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            description={stat.description}
            accent={stat.accent}
          />
        ))}
      </div>
    </section>
  );
}