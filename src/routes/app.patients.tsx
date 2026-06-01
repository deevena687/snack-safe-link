import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import { PageHeader } from "@/components/app-shell";
import { Input } from "@/components/ui/input";
import { patients, predictions } from "@/lib/mock-data";

export const Route = createFileRoute("/app/patients")({
  head: () => ({ meta: [{ title: "Patients — BiopolyHeal" }] }),
  component: PatientList,
});

function PatientList() {
  const [q, setQ] = useState("");
  const filtered = patients.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()) || p.woundType.toLowerCase().includes(q.toLowerCase()));
  return (
    <div>
      <PageHeader title="Patient management" subtitle={`${patients.length} patients enrolled.`} />
      <div className="relative mb-4 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name or wound…" className="pl-9" />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((p) => {
          const pred = predictions.find((x) => x.patientId === p.id)!;
          return (
            <div key={p.id} className="rounded-2xl border bg-card p-5 shadow-soft hover:shadow-elegant transition">
              <div className="flex items-center gap-3">
                <img src={p.avatar} className="size-12 rounded-full bg-muted" />
                <div className="min-w-0">
                  <p className="font-semibold truncate">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.id} · {p.age}{p.gender} · {p.doctor}</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{p.woundType}</p>
              <div className="mt-3 h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full gradient-heal" style={{ width: `${p.healingPercent}%` }} />
              </div>
              <div className="mt-3 flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{pred.stage}</span>
                <span className={`rounded-full px-2 py-0.5 font-medium ${p.riskLevel === "High" ? "bg-destructive/15 text-destructive" : p.riskLevel === "Medium" ? "bg-warning/20 text-warning-foreground" : "bg-success/15 text-success"}`}>{p.riskLevel} risk</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
