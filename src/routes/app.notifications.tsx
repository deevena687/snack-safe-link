import { createFileRoute } from "@tanstack/react-router";
import { Bell } from "lucide-react";
import { PageHeader } from "@/components/app-shell";
import { notifications } from "@/lib/mock-data";

export const Route = createFileRoute("/app/notifications")({
  head: () => ({ meta: [{ title: "Notifications — BiopolyHeal" }] }),
  component: Notes,
});

function Notes() {
  return (
    <div>
      <PageHeader title="Notifications" subtitle="Critical alerts, dressing reminders and appointment updates." />
      <div className="rounded-2xl border bg-card divide-y shadow-soft overflow-hidden">
        {notifications.map((n) => (
          <div key={n.id} className="p-5 flex items-start gap-4">
            <div className={`size-10 rounded-xl grid place-items-center ${n.type === "alert" ? "bg-destructive/15 text-destructive" : n.type === "reminder" ? "bg-warning/20 text-warning-foreground" : "bg-primary/10 text-primary"}`}>
              <Bell className="size-5" />
            </div>
            <div className="flex-1">
              <p className="font-medium">{n.title}</p>
              <p className="text-sm text-muted-foreground">{n.message}</p>
            </div>
            <span className="text-xs text-muted-foreground">{n.createdAt}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
