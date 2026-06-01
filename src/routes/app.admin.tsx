import { createFileRoute } from "@tanstack/react-router";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PageHeader } from "@/components/app-shell";
import { patients, stats } from "@/lib/mock-data";

export const Route = createFileRoute("/app/admin")({
  head: () => ({ meta: [{ title: "Admin — BiopolyHeal" }] }),
  component: Admin,
});

const distribution = ["Hemostasis", "Inflammatory", "Proliferative", "Remodeling"].map((s, i) => ({
  stage: s,
  count: [2, 4, 4, 2][i],
}));

function Admin() {
  return (
    <div>
      <PageHeader title="Admin & analytics" subtitle="System health, user activity and AI accuracy." />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { l: "Users", v: stats.totalPatients + 6 },
          { l: "Doctors", v: 3 },
          { l: "AI accuracy", v: "98.2%" },
          { l: "Avg latency", v: "126ms" },
        ].map((c) => (
          <div key={c.l} className="rounded-2xl border bg-card p-5 shadow-soft">
            <p className="text-sm text-muted-foreground">{c.l}</p>
            <p className="mt-2 text-2xl font-semibold">{c.v}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-5 mt-5">
        <div className="rounded-2xl border bg-card p-5 shadow-soft">
          <p className="font-semibold">Healing stage distribution</p>
          <div className="h-64 mt-3">
            <ResponsiveContainer>
              <BarChart data={distribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="stage" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--color-border)", background: "var(--color-card)" }} />
                <Bar dataKey="count" fill="var(--color-primary)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-2xl border bg-card p-5 shadow-soft overflow-x-auto">
          <p className="font-semibold mb-3">User directory</p>
          <table className="w-full text-sm">
            <thead className="text-muted-foreground"><tr className="text-left"><th className="py-2">User</th><th>Role</th><th>Status</th></tr></thead>
            <tbody>
              {patients.slice(0, 6).map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="py-2 flex items-center gap-2"><img src={p.avatar} className="size-7 rounded-full" />{p.name}</td>
                  <td>Patient</td>
                  <td><span className="rounded-full bg-success/15 text-success px-2 py-0.5 text-xs">Active</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
