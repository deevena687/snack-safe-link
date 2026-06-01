import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { appointments, patients, predictions } from "@/lib/mock-data";

export const Route = createFileRoute("/app/doctor")({
  head: () => ({ meta: [{ title: "Doctor View — BiopolyHeal" }] }),
  component: DoctorView,
});

function DoctorView() {
  const queue = patients.filter((p) => p.status !== "Recovered").slice(0, 6);
  return (
    <div>
      <PageHeader title="Doctor workspace" subtitle="Patient queue, image review and consultation notes." />
      <div className="grid lg:grid-cols-[1fr_380px] gap-5">
        <div className="rounded-2xl border bg-card shadow-soft overflow-hidden">
          <div className="p-5 border-b"><p className="font-semibold">Today's queue</p></div>
          <ul className="divide-y">
            {queue.map((p) => {
              const pred = predictions.find((x) => x.patientId === p.id)!;
              return (
                <li key={p.id} className="p-4 flex items-center gap-4">
                  <img src={p.avatar} className="size-11 rounded-full bg-muted" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{p.woundType} · {pred.stage} · {pred.recoveryPercent}%</p>
                  </div>
                  <Button size="sm" variant="outline">Open chart</Button>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="space-y-5">
          <div className="rounded-2xl border bg-card p-5 shadow-soft">
            <p className="font-semibold">Consultation note</p>
            <textarea rows={6} className="mt-3 w-full rounded-lg border bg-background p-3 text-sm" placeholder="Document findings, plan, and dressing adjustments…" />
            <Button className="w-full mt-3 gradient-primary text-primary-foreground">Save note</Button>
          </div>
          <div className="rounded-2xl border bg-card p-5 shadow-soft">
            <p className="font-semibold">Upcoming consultations</p>
            <ul className="mt-3 space-y-3 text-sm">
              {appointments.filter((a) => a.status === "Scheduled").slice(0, 4).map((a) => (
                <li key={a.id} className="flex justify-between">
                  <span>{a.patientName}</span>
                  <span className="text-muted-foreground">{a.scheduledFor}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
