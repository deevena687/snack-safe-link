import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Brain, Sparkles } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { PageHeader } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { patients, predictions } from "@/lib/mock-data";

export const Route = createFileRoute("/app/ai")({
  head: () => ({ meta: [{ title: "AI Predictions — BiopolyHeal" }] }),
  component: AIPredictions,
});

function AIPredictions() {
  const [pid, setPid] = useState(patients[3].id);
  const p = patients.find((x) => x.id === pid)!;
  const pred = predictions.find((x) => x.patientId === pid)!;
  const gaugeData = [
    { name: "Recovery", value: pred.recoveryPercent },
    { name: "Remaining", value: 100 - pred.recoveryPercent },
  ];

  return (
    <div>
      <PageHeader title="AI healing prediction" subtitle="Stage classification, recovery probability and treatment guidance." />

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="rounded-2xl border bg-card p-5 shadow-soft">
          <p className="text-sm text-muted-foreground">Select patient</p>
          <select value={pid} onChange={(e) => setPid(e.target.value)} className="mt-2 w-full rounded-lg border bg-background px-3 py-2 text-sm">
            {patients.map((pt) => <option key={pt.id} value={pt.id}>{pt.name} — {pt.woundType}</option>)}
          </select>
          <div className="mt-5 flex items-center gap-3">
            <img src={p.avatar} className="size-12 rounded-full bg-muted" />
            <div>
              <p className="font-semibold">{p.name}</p>
              <p className="text-xs text-muted-foreground">{p.id} · admitted {p.admittedOn}</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border bg-card p-5 shadow-soft">
          <p className="text-sm text-muted-foreground">Healing stage</p>
          <p className="text-2xl font-semibold mt-1">{pred.stage}</p>
          <div className="mt-4 h-44">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={gaugeData} dataKey="value" innerRadius={50} outerRadius={70} startAngle={90} endAngle={-270}>
                  <Cell fill="var(--color-primary)" />
                  <Cell fill="var(--color-muted)" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p className="text-center -mt-32 text-3xl font-semibold">{pred.recoveryPercent}%</p>
          <p className="text-center mt-20 text-xs text-muted-foreground">Predicted recovery progress</p>
        </div>

        <div className="rounded-2xl gradient-heal text-primary-foreground p-5 shadow-elegant">
          <Brain className="size-6" />
          <p className="mt-3 text-sm opacity-90">Model confidence</p>
          <p className="text-3xl font-semibold">{pred.confidence}%</p>
          <p className="mt-4 text-sm opacity-90">Infection risk</p>
          <p className="text-2xl font-semibold">{pred.infectionRisk}</p>
          <p className="mt-4 text-sm opacity-90">Estimated recovery in</p>
          <p className="text-2xl font-semibold">{pred.predictedRecoveryDays} days</p>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border bg-card p-5 shadow-soft">
        <div className="flex items-center gap-2">
          <Sparkles className="size-5 text-primary" />
          <p className="font-semibold">Recommended treatment</p>
        </div>
        <p className="mt-2 text-muted-foreground">{pred.recommendation}</p>
        <div className="mt-4 flex gap-2">
          <Button className="gradient-primary text-primary-foreground">Apply to chart</Button>
          <Button variant="outline">Re-run prediction</Button>
        </div>
      </div>
    </div>
  );
}
