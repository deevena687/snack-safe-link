import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PageHeader } from "@/components/app-shell";
import { generateSensorReadings } from "@/lib/mock-data";

export const Route = createFileRoute("/app/sensors")({
  head: () => ({ meta: [{ title: "Sensor Dashboard — BiopolyHeal" }] }),
  component: Sensors,
});

function Sensors() {
  const data = useMemo(() => generateSensorReadings(24), []);
  const latest = data[data.length - 1];
  const metrics = [
    { k: "moisture", label: "Moisture", unit: "%", v: latest.moisture, tone: "from-primary to-primary-glow", ok: latest.moisture > 50 && latest.moisture < 80 },
    { k: "ph", label: "pH", unit: "", v: latest.ph, tone: "from-secondary to-primary-glow", ok: latest.ph > 6.4 && latest.ph < 7.4 },
    { k: "temperature", label: "Temperature", unit: "°C", v: latest.temperature, tone: "from-primary to-secondary", ok: latest.temperature < 37.5 },
    { k: "colorIndex", label: "Color Index", unit: "", v: latest.colorIndex, tone: "from-warning to-destructive", ok: latest.colorIndex < 50 },
  ];

  return (
    <div>
      <PageHeader title="Sensor dashboard" subtitle="Real-time biopolymer dressing telemetry · simulated 24h stream." />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => (
          <div key={m.k} className={`rounded-2xl p-5 bg-gradient-to-br ${m.tone} text-primary-foreground shadow-elegant`}>
            <p className="text-sm opacity-90">{m.label}</p>
            <p className="mt-2 text-3xl font-semibold">{m.v}{m.unit}</p>
            <p className="mt-2 text-xs opacity-90">{m.ok ? "Within range" : "⚠ Out of range"}</p>
          </div>
        ))}
      </div>

      {(["moisture", "ph", "temperature", "colorIndex"] as const).map((k) => (
        <div key={k} className="rounded-2xl border bg-card p-5 shadow-soft mt-5">
          <p className="font-semibold capitalize">{k === "colorIndex" ? "Color index" : k}</p>
          <p className="text-sm text-muted-foreground mb-3">Last 24 hours</p>
          <div className="h-56">
            <ResponsiveContainer>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="timestamp" stroke="var(--color-muted-foreground)" fontSize={11} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={11} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--color-border)", background: "var(--color-card)" }} />
                <Line dataKey={k} stroke="var(--color-primary)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      ))}
    </div>
  );
}
