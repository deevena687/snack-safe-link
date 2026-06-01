import { createFileRoute } from "@tanstack/react-router";
import { FileDown, FileText } from "lucide-react";
import jsPDF from "jspdf";
import { PageHeader } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { patients, predictions } from "@/lib/mock-data";

export const Route = createFileRoute("/app/reports")({
  head: () => ({ meta: [{ title: "Reports — BiopolyHeal" }] }),
  component: Reports,
});

function generateReport(id: string) {
  const p = patients.find((x) => x.id === id)!;
  const pred = predictions.find((x) => x.patientId === id)!;
  const doc = new jsPDF();
  doc.setFontSize(20); doc.text("BiopolyHeal Clinical Report", 20, 20);
  doc.setFontSize(11); doc.setTextColor(120); doc.text(`Generated ${new Date().toLocaleString()}`, 20, 28);
  doc.setTextColor(0); doc.setFontSize(13);
  let y = 44;
  const line = (k: string, v: string) => { doc.text(`${k}:`, 20, y); doc.text(v, 80, y); y += 8; };
  line("Patient", `${p.name} (${p.id})`);
  line("Age / Sex", `${p.age} / ${p.gender}`);
  line("Wound", p.woundType);
  line("Admitted", p.admittedOn);
  line("Doctor", p.doctor);
  line("Healing stage", pred.stage);
  line("Recovery %", `${pred.recoveryPercent}%`);
  line("Infection risk", pred.infectionRisk);
  line("Model confidence", `${pred.confidence}%`);
  line("Recovery ETA", `${pred.predictedRecoveryDays} days`);
  y += 6; doc.setFontSize(12); doc.text("AI recommendation:", 20, y); y += 8;
  doc.setFontSize(11); doc.setTextColor(60);
  doc.text(doc.splitTextToSize(pred.recommendation, 170), 20, y);
  doc.save(`Report-${p.id}.pdf`);
}

function Reports() {
  return (
    <div>
      <PageHeader title="Clinical reports" subtitle="Generate healing analysis and infection risk PDF reports." />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {patients.slice(0, 9).map((p) => {
          const pred = predictions.find((x) => x.patientId === p.id)!;
          return (
            <div key={p.id} className="rounded-2xl border bg-card p-5 shadow-soft">
              <div className="flex items-center gap-3">
                <img src={p.avatar} className="size-11 rounded-full bg-muted" />
                <div>
                  <p className="font-semibold">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.id} · {p.woundType}</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                <div className="rounded-lg bg-muted p-2"><p className="text-xs text-muted-foreground">Stage</p><p className="font-medium">{pred.stage}</p></div>
                <div className="rounded-lg bg-muted p-2"><p className="text-xs text-muted-foreground">Risk</p><p className="font-medium">{pred.infectionRisk}</p></div>
              </div>
              <Button onClick={() => generateReport(p.id)} className="w-full mt-4 gradient-primary text-primary-foreground">
                <FileDown className="size-4" /> Download PDF
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
