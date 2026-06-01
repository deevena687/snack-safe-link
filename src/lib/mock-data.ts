// Realistic mock data for the wound-healing application
import { subDays, subHours, format } from "date-fns";

export type HealingStage = "Inflammatory" | "Proliferative" | "Remodeling" | "Hemostasis";
export type RiskLevel = "Low" | "Medium" | "High";
export type CaseStatus = "Active" | "Healing" | "Recovered" | "Critical";

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: "M" | "F";
  woundType: string;
  admittedOn: string;
  doctor: string;
  status: CaseStatus;
  healingPercent: number;
  riskLevel: RiskLevel;
  avatar: string;
}

export interface WoundImage {
  id: string;
  patientId: string;
  capturedAt: string;
  url: string;
  stage: HealingStage;
  notes: string;
}

export interface SensorReading {
  timestamp: string;
  moisture: number; // %
  ph: number;
  temperature: number; // °C
  colorIndex: number; // 0-100 redness
}

export interface Prediction {
  patientId: string;
  stage: HealingStage;
  recoveryPercent: number;
  infectionRisk: RiskLevel;
  confidence: number;
  recommendation: string;
  predictedRecoveryDays: number;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctor: string;
  scheduledFor: string;
  reason: string;
  status: "Scheduled" | "Completed" | "Cancelled";
}

export interface AppNotification {
  id: string;
  type: "alert" | "reminder" | "info";
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
}

const firstNames = ["Aarav", "Priya", "Liam", "Sofia", "Noah", "Mei", "Kai", "Anika", "Ezra", "Zara"];
const lastNames = ["Sharma", "Chen", "Okafor", "Patel", "Garcia", "Singh", "Nakamura", "Ali", "Rossi", "Khan"];
const woundTypes = ["Diabetic Ulcer", "Surgical Incision", "Pressure Sore", "Burn — 2nd Degree", "Laceration", "Venous Ulcer"];
const stages: HealingStage[] = ["Hemostasis", "Inflammatory", "Proliferative", "Remodeling"];

function rand<T>(arr: T[]) { return arr[Math.floor(Math.random() * arr.length)]; }
function randBetween(min: number, max: number) { return Math.round((Math.random() * (max - min) + min) * 10) / 10; }

// Seeded-ish stable IDs
export const patients: Patient[] = Array.from({ length: 12 }).map((_, i) => {
  const name = `${firstNames[i % firstNames.length]} ${lastNames[(i + 3) % lastNames.length]}`;
  const healing = [22, 41, 67, 88, 14, 55, 73, 92, 33, 48, 79, 60][i];
  const risk: RiskLevel = healing < 30 ? "High" : healing < 70 ? "Medium" : "Low";
  const status: CaseStatus = healing > 85 ? "Recovered" : healing < 25 ? "Critical" : healing < 60 ? "Active" : "Healing";
  return {
    id: `P-${1000 + i}`,
    name,
    age: 24 + ((i * 7) % 50),
    gender: i % 2 === 0 ? "F" : "M",
    woundType: woundTypes[i % woundTypes.length],
    admittedOn: format(subDays(new Date(), 30 - i * 2), "yyyy-MM-dd"),
    doctor: i % 3 === 0 ? "Dr. Mehta" : i % 3 === 1 ? "Dr. Alvarez" : "Dr. Tanaka",
    status,
    healingPercent: healing,
    riskLevel: risk,
    avatar: `https://api.dicebear.com/9.x/notionists/svg?seed=${encodeURIComponent(name)}`,
  };
});

export const woundImages: WoundImage[] = patients.flatMap((p, i) =>
  Array.from({ length: 4 }).map((_, j) => ({
    id: `W-${p.id}-${j}`,
    patientId: p.id,
    capturedAt: format(subDays(new Date(), 21 - j * 7), "yyyy-MM-dd"),
    url: `https://images.unsplash.com/photo-${["1576091160550-2173dba999ef", "1559757175-5700dde675bc", "1584516150909-c43483ee7932", "1581595220892-b0739db3ba8c"][j]}?w=600&q=80&auto=format`,
    stage: stages[Math.min(j, 3)],
    notes: ["Initial assessment", "Inflammation reduced", "Granulation tissue forming", "Epithelialization in progress"][j],
  }))
);

export function generateSensorReadings(hours = 24): SensorReading[] {
  const out: SensorReading[] = [];
  for (let i = hours; i >= 0; i--) {
    out.push({
      timestamp: format(subHours(new Date(), i), "HH:mm"),
      moisture: randBetween(55, 78),
      ph: randBetween(6.2, 7.6),
      temperature: randBetween(36.1, 37.8),
      colorIndex: randBetween(20, 65),
    });
  }
  return out;
}

export const predictions: Prediction[] = patients.map((p) => ({
  patientId: p.id,
  stage: stages[Math.min(3, Math.floor(p.healingPercent / 25))],
  recoveryPercent: p.healingPercent,
  infectionRisk: p.riskLevel,
  confidence: 78 + ((p.healingPercent + 7) % 20),
  recommendation:
    p.riskLevel === "High"
      ? "Replace dressing now. Begin topical antibiotic. Re-evaluate in 6h."
      : p.riskLevel === "Medium"
      ? "Maintain moist environment. Schedule dressing change within 24h."
      : "Continue current regimen. Reassess in 48h.",
  predictedRecoveryDays: Math.max(2, Math.round((100 - p.healingPercent) / 4)),
}));

export const appointments: Appointment[] = patients.slice(0, 8).map((p, i) => ({
  id: `A-${500 + i}`,
  patientId: p.id,
  patientName: p.name,
  doctor: p.doctor,
  scheduledFor: format(subDays(new Date(), -((i % 5) + 1)), "yyyy-MM-dd 'at' HH:mm"),
  reason: ["Dressing review", "Follow-up", "Infection check", "Suture removal"][i % 4],
  status: i % 4 === 0 ? "Completed" : "Scheduled",
}));

export const notifications: AppNotification[] = [
  { id: "N1", type: "alert", title: "Critical infection risk", message: "Patient P-1004 shows elevated pH and temperature.", createdAt: "2m ago", read: false },
  { id: "N2", type: "reminder", title: "Dressing change due", message: "P-1002 dressing change scheduled in 30 minutes.", createdAt: "12m ago", read: false },
  { id: "N3", type: "info", title: "AI prediction updated", message: "Healing stage upgraded to Proliferative for P-1006.", createdAt: "1h ago", read: true },
  { id: "N4", type: "reminder", title: "Appointment tomorrow", message: "Dr. Alvarez — wound review at 09:30.", createdAt: "3h ago", read: true },
];

export const stats = {
  totalPatients: patients.length,
  activeCases: patients.filter((p) => p.status === "Active" || p.status === "Critical").length,
  avgHealing: Math.round(patients.reduce((a, b) => a + b.healingPercent, 0) / patients.length),
  infectionAlerts: patients.filter((p) => p.riskLevel === "High").length,
};

export const healingTrend = Array.from({ length: 14 }).map((_, i) => ({
  day: `D${i + 1}`,
  healing: Math.min(100, 20 + i * 5 + Math.round(Math.random() * 6)),
  inflammation: Math.max(5, 80 - i * 5 - Math.round(Math.random() * 6)),
}));
