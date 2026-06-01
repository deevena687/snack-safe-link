import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/app/profile")({
  head: () => ({ meta: [{ title: "Profile — BiopolyHeal" }] }),
  component: Profile,
});

function Profile() {
  return (
    <div>
      <PageHeader title="Your profile" subtitle="Personal details and clinical credentials." />
      <div className="rounded-2xl border bg-card p-6 shadow-soft max-w-2xl">
        <div className="flex items-center gap-4">
          <img src="https://api.dicebear.com/9.x/notionists/svg?seed=Dr.%20Mehta" className="size-20 rounded-2xl bg-muted" />
          <div>
            <p className="text-lg font-semibold">Dr. Aanya Mehta</p>
            <p className="text-sm text-muted-foreground">Wound Care Specialist · MBBS, MD</p>
          </div>
        </div>
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <div className="space-y-2"><Label>Full name</Label><Input defaultValue="Aanya Mehta" /></div>
          <div className="space-y-2"><Label>Email</Label><Input defaultValue="aanya@biopolyheal.com" /></div>
          <div className="space-y-2"><Label>Phone</Label><Input defaultValue="+91 98765 43210" /></div>
          <div className="space-y-2"><Label>License #</Label><Input defaultValue="MH-2025-7762" /></div>
        </div>
        <Button className="mt-6 gradient-primary text-primary-foreground">Save changes</Button>
      </div>
    </div>
  );
}
