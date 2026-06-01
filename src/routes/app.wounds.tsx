import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Upload } from "lucide-react";
import { PageHeader } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { patients, woundImages } from "@/lib/mock-data";

export const Route = createFileRoute("/app/wounds")({
  head: () => ({ meta: [{ title: "Wound Monitoring — BiopolyHeal" }] }),
  component: Wounds,
});

function Wounds() {
  const [selected, setSelected] = useState(patients[2].id);
  const imgs = woundImages.filter((w) => w.patientId === selected);
  const p = patients.find((x) => x.id === selected)!;
  return (
    <div>
      <PageHeader
        title="Wound monitoring"
        subtitle="Image history, healing timeline and stage classification."
        actions={<Button className="gradient-primary text-primary-foreground"><Upload className="size-4" /> Upload image</Button>}
      />

      <div className="grid lg:grid-cols-[280px_1fr] gap-5">
        <div className="rounded-2xl border bg-card p-3 shadow-soft h-fit">
          <p className="px-2 py-1.5 text-xs uppercase tracking-wide text-muted-foreground">Patients</p>
          <ul className="space-y-1">
            {patients.slice(0, 8).map((pt) => (
              <li key={pt.id}>
                <button onClick={() => setSelected(pt.id)} className={`w-full flex items-center gap-3 rounded-xl p-2 text-left transition ${selected === pt.id ? "bg-primary/10" : "hover:bg-accent"}`}>
                  <img src={pt.avatar} alt="" className="size-9 rounded-full bg-muted" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{pt.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{pt.woundType}</p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-5">
          <div className="rounded-2xl border bg-card p-5 shadow-soft">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">{p.name}</p>
                <p className="text-sm text-muted-foreground">{p.woundType} · admitted {p.admittedOn}</p>
              </div>
              <span className="rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-medium">{p.healingPercent}% healed</span>
            </div>
            <div className="mt-4 h-2 rounded-full bg-muted overflow-hidden">
              <div className="h-full gradient-heal" style={{ width: `${p.healingPercent}%` }} />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {imgs.map((w) => (
              <div key={w.id} className="rounded-2xl border bg-card overflow-hidden shadow-soft">
                <div className="aspect-square bg-muted overflow-hidden">
                  <img src={w.url} alt={w.notes} className="w-full h-full object-cover" />
                </div>
                <div className="p-3">
                  <p className="text-xs text-muted-foreground">{w.capturedAt}</p>
                  <p className="font-medium text-sm">{w.stage}</p>
                  <p className="text-xs text-muted-foreground mt-1">{w.notes}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border-2 border-dashed p-10 text-center bg-accent/30">
            <Upload className="size-6 mx-auto text-muted-foreground" />
            <p className="mt-2 font-medium">Drop a wound photo here</p>
            <p className="text-sm text-muted-foreground">PNG / JPG up to 10 MB · auto-analyzed by BiopolyAI</p>
          </div>
        </div>
      </div>
    </div>
  );
}
