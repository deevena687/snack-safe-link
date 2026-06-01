import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Activity, AlertTriangle, HeartPulse, TrendingUp, Users } from "lucide-react";
import { Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PageHeader } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { healingTrend, notifications, patients, predictions, stats } from "@/lib/mock-data";

export const Route = createFileRoute("/app/")({
  head: () => ({ meta: [{ title: "Dashboard — BiopolyHeal" }] }),
  component: Dashboard,
});

const cards = [
  { label: "Total Patients", value: stats.totalPatients, icon: Users, tone: "from-primary to-primary-glow" },
  { label: "Active Cases", value: stats.activeCases, icon: HeartPulse, tone: "from-secondary to-primary-glow" },
  { label: "Avg Healing", value: `${stats.avgHealing}%`, icon: TrendingUp, tone: "from-primary to-secondary" },
  { label: "Infection Alerts", value: stats.infectionAlerts, icon: AlertTriangle, tone: "from-warning to-destructive" },
];

function Dashboard() {
  return (
    <div>
      <PageHeader
        title="Clinical overview"
        subtitle="Live signals from biopolymer dressings and AI predictions across all patients."
        actions={<Button asChild className="gradient-primary text-primary-foreground"><Link to="/app/ai">Open AI Predictions</Link></Button>}
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c, i) => (
          <motion.div key={c.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className={`rounded-2xl p-5 bg-gradient-to-br ${c.tone} text-primary-foreground shadow-elegant`}>
            <div className="flex items-center justify-between">
              <p className="text-sm opacity-90">{c.label}</p>
              <c.icon className="size-5 opacity-90" />
            </div>
            <p className="mt-3 text-3xl font-semibold">{c.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-5 mt-6">
        <div className="lg:col-span-2 rounded-2xl border bg-card p-5 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="font-semibold">Healing vs Inflammation</p>
              <p className="text-sm text-muted-foreground">Last 14 days · cohort average</p>
            </div>
            <Activity className="size-5 text-primary" />
          </div>
          <div className="h-72">
            <ResponsiveContainer>
              <AreaChart data={healingTrend}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.5} /><stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} /></linearGradient>
                  <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--color-destructive)" stopOpacity={0.4} /><stop offset="100%" stopColor="var(--color-destructive)" stopOpacity={0} /></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="day" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--color-border)", background: "var(--color-card)" }} />
                <Area type="monotone" dataKey="healing" stroke="var(--color-primary)" fill="url(#g1)" strokeWidth={2} />
                <Area type="monotone" dataKey="inflammation" stroke="var(--color-destructive)" fill="url(#g2)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border bg-card p-5 shadow-soft">
          <p className="font-semibold">Live alerts</p>
          <p className="text-sm text-muted-foreground">Auto-prioritized by AI</p>
          <ul className="mt-4 space-y-3">
            {notifications.slice(0, 4).map((n) => (
              <li key={n.id} className="flex gap-3">
                <span className={`mt-1 size-2 rounded-full ${n.type === "alert" ? "bg-destructive" : n.type === "reminder" ? "bg-warning" : "bg-primary"}`} />
                <div>
                  <p className="text-sm font-medium">{n.title}</p>
                  <p className="text-xs text-muted-foreground">{n.message}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{n.createdAt}</p>
                </div>
              </li>
            ))}
          </ul>
          <Button asChild variant="outline" className="w-full mt-4"><Link to="/app/notifications">View all</Link></Button>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border bg-card shadow-soft overflow-hidden">
        <div className="p-5 flex items-center justify-between">
          <div>
            <p className="font-semibold">Recent patients</p>
            <p className="text-sm text-muted-foreground">Top cases ranked by AI risk score</p>
          </div>
          <Button asChild variant="ghost"><Link to="/app/patients">Manage</Link></Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-muted-foreground">
              <tr className="text-left">
                <th className="px-5 py-3 font-medium">Patient</th>
                <th className="px-5 py-3 font-medium">Wound</th>
                <th className="px-5 py-3 font-medium">Doctor</th>
                <th className="px-5 py-3 font-medium">Healing</th>
                <th className="px-5 py-3 font-medium">Risk</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {patients.slice(0, 6).map((p) => {
                const pred = predictions.find((x) => x.patientId === p.id)!;
                return (
                  <tr key={p.id} className="border-t hover:bg-accent/40">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <img src={p.avatar} alt="" className="size-9 rounded-full bg-muted" />
                        <div>
                          <p className="font-medium">{p.name}</p>
                          <p className="text-xs text-muted-foreground">{p.id} · {p.age}{p.gender}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3">{p.woundType}</td>
                    <td className="px-5 py-3 text-muted-foreground">{p.doctor}</td>
                    <td className="px-5 py-3 w-48">
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div className="h-full gradient-heal" style={{ width: `${p.healingPercent}%` }} />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{p.healingPercent}% · {pred.stage}</p>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${p.riskLevel === "High" ? "bg-destructive/15 text-destructive" : p.riskLevel === "Medium" ? "bg-warning/20 text-warning-foreground" : "bg-success/15 text-success"}`}>{p.riskLevel}</span>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${p.status === "Critical" ? "bg-destructive/15 text-destructive" : p.status === "Recovered" ? "bg-success/15 text-success" : "bg-primary/10 text-primary"}`}>{p.status}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
