import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, Plus } from "lucide-react";
import { PageHeader } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { appointments } from "@/lib/mock-data";

export const Route = createFileRoute("/app/appointments")({
  head: () => ({ meta: [{ title: "Appointments — BiopolyHeal" }] }),
  component: Appts,
});

function Appts() {
  return (
    <div>
      <PageHeader title="Appointments" subtitle="Upcoming and recent consultations."
        actions={<Button className="gradient-primary text-primary-foreground"><Plus className="size-4" /> New appointment</Button>} />
      <div className="rounded-2xl border bg-card divide-y shadow-soft overflow-hidden">
        {appointments.map((a) => (
          <div key={a.id} className="p-5 flex items-center gap-4">
            <div className="size-12 rounded-xl bg-primary/10 text-primary grid place-items-center"><CalendarDays className="size-5" /></div>
            <div className="flex-1 min-w-0">
              <p className="font-medium">{a.patientName} <span className="text-muted-foreground font-normal">· {a.reason}</span></p>
              <p className="text-sm text-muted-foreground">{a.doctor} · {a.scheduledFor}</p>
            </div>
            <span className={`rounded-full px-3 py-1 text-xs font-medium ${a.status === "Completed" ? "bg-success/15 text-success" : "bg-primary/10 text-primary"}`}>{a.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
