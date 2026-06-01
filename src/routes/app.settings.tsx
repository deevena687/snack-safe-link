import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app-shell";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/app/settings")({
  head: () => ({ meta: [{ title: "Settings — BiopolyHeal" }] }),
  component: Settings,
});

const groups = [
  { title: "Notifications", items: ["Critical infection alerts", "Dressing change reminders", "Appointment reminders", "Weekly summary email"] },
  { title: "AI & predictions", items: ["Auto-run prediction on new image", "Show confidence intervals", "Use experimental healing model"] },
  { title: "Privacy", items: ["Share anonymized data for research", "Enable two-factor auth"] },
];

function Settings() {
  return (
    <div>
      <PageHeader title="Settings" subtitle="Configure alerts, AI behavior and privacy." />
      <div className="space-y-5 max-w-2xl">
        {groups.map((g) => (
          <div key={g.title} className="rounded-2xl border bg-card p-5 shadow-soft">
            <p className="font-semibold">{g.title}</p>
            <ul className="mt-3 divide-y">
              {g.items.map((i, idx) => (
                <li key={i} className="flex items-center justify-between py-3 text-sm">
                  <span>{i}</span>
                  <Switch defaultChecked={idx % 2 === 0} />
                </li>
              ))}
            </ul>
          </div>
        ))}
        <Button className="gradient-primary text-primary-foreground">Save preferences</Button>
      </div>
    </div>
  );
}
