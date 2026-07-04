import Navbar from "../components/Navbar";
import DashboardStats from "../components/admin/DashboardStats";

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-parchment text-ink">
      

      <main className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-8">

        {/* Header */}
        <section>
          <span className="inline-flex rounded-full bg-mossLight px-3 py-1 text-xs font-semibold uppercase tracking-wider text-moss">
            Administration
          </span>

          <h1 className="mt-2 font-display text-4xl font-bold tracking-tight">
            Admin Dashboard
          </h1>

          <p className="mt-2 max-w-3xl text-ink/70">
            Review escalated queries, assist administrators with AI-generated
            summaries, respond to users, and convert resolved issues into
            official FAQs.
          </p>
        </section>

        {/* Stats */}
        <DashboardStats />

        {/* Current Escalated Query */}
        <section className="rounded-2xl border border-line bg-white p-6 shadow-sm">

          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="font-display text-2xl font-semibold">
                Current Escalated Query
              </h2>

              <p className="text-sm text-ink/70">
                Highest priority unresolved query.
              </p>
            </div>

            <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
              Escalated
            </span>
          </div>

          <div className="space-y-5">

            <div>
              <p className="text-sm font-semibold uppercase text-ink/60">
                Query Title
              </p>

              <h3 className="mt-1 text-xl font-semibold">
                Certificate download unavailable after course completion
              </h3>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase text-ink/60">
                Student Query
              </p>

              <div className="mt-2 rounded-xl border border-line bg-parchment p-4">
                I completed all the required modules, but the certificate
                download button is not appearing on my dashboard. I have already
                refreshed the page and waited for more than 24 hours.
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase text-ink/60">
                AI Summary (Coming Soon)
              </p>

              <div className="mt-2 rounded-xl border border-dashed border-line bg-mossLight/30 p-4">
                <ul className="list-disc space-y-1 pl-5 text-sm text-ink/70">
                  <li>Course completion detected.</li>
                  <li>Certificate unavailable.</li>
                  <li>Possible publishing delay.</li>
                  <li>
                    Future AI models will generate concise summaries here.
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase text-ink/60">
                Administrator Reply
              </p>

              <textarea
                rows={6}
                placeholder="Write your response to the user..."
                className="mt-2 w-full rounded-xl border border-line bg-parchment p-4 outline-none transition focus:border-moss"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="rounded-lg bg-moss px-5 py-2 font-medium text-parchment transition hover:opacity-90">
                Send Reply
              </button>

              <button className="rounded-lg border border-line px-5 py-2 font-medium hover:bg-mossLight">
                Generate FAQ Draft (AI)
              </button>
            </div>

          </div>
        </section>

        {/* Escalated Queue */}

        <section className="rounded-2xl border border-line bg-white p-6 shadow-sm">

          <div className="mb-5">
            <h2 className="font-display text-2xl font-semibold">
              Escalated Query Queue
            </h2>

            <p className="text-sm text-ink/70">
              Queries awaiting administrator review.
            </p>
          </div>

          <table className="min-w-full">
            <thead>
              <tr className="border-b border-line">
                <th className="py-3 text-left">Query</th>
                <th className="py-3 text-left">Category</th>
                <th className="py-3 text-left">Priority</th>
                <th className="py-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody>

              <tr className="border-b border-line">
                <td className="py-4">
                  Registration payment not reflected
                </td>

                <td>Registration</td>

                <td>
                  <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
                    High
                  </span>
                </td>

                <td className="text-center">
                  <button className="rounded-lg border border-line px-3 py-1 hover:bg-mossLight">
                    Open
                  </button>
                </td>
              </tr>

              <tr className="border-b border-line">
                <td className="py-4">
                  Certificate download issue
                </td>

                <td>Certificate</td>

                <td>
                  <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
                    Critical
                  </span>
                </td>

                <td className="text-center">
                  <button className="rounded-lg border border-line px-3 py-1 hover:bg-mossLight">
                    Open
                  </button>
                </td>
              </tr>

              <tr>
                <td className="py-4">
                  Login authentication problem
                </td>

                <td>Technical</td>

                <td>
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                    Medium
                  </span>
                </td>

                <td className="text-center">
                  <button className="rounded-lg border border-line px-3 py-1 hover:bg-mossLight">
                    Open
                  </button>
                </td>
              </tr>

            </tbody>
          </table>

        </section>

      </main>
    </div>
  );
}