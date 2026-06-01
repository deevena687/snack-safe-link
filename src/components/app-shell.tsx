import { Link, useLocation } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Activity, Image as ImageIcon, Brain, FileBarChart,
  CalendarDays, Bell, Users, Settings, UserCircle, Stethoscope, LogOut, ShieldCheck
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/app", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/app/wounds", label: "Wound Monitoring", icon: ImageIcon },
  { to: "/app/sensors", label: "Sensor Dashboard", icon: Activity },
  { to: "/app/ai", label: "AI Predictions", icon: Brain },
  { to: "/app/reports", label: "Reports", icon: FileBarChart },
  { to: "/app/appointments", label: "Appointments", icon: CalendarDays },
  { to: "/app/patients", label: "Patients", icon: Users },
  { to: "/app/doctor", label: "Doctor View", icon: Stethoscope },
  { to: "/app/notifications", label: "Notifications", icon: Bell },
  { to: "/app/admin", label: "Admin", icon: ShieldCheck },
  { to: "/app/profile", label: "Profile", icon: UserCircle },
  { to: "/app/settings", label: "Settings", icon: Settings },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  return (
    <div className="min-h-screen bg-background">
      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:flex sticky top-0 h-screen flex-col border-r bg-sidebar p-5 gap-2">
          <Link to="/app" className="flex items-center gap-2 px-2 pb-4">
            <div className="size-9 rounded-xl gradient-heal grid place-items-center text-primary-foreground shadow-elegant">
              <Activity className="size-5" />
            </div>
            <div>
              <p className="font-semibold tracking-tight">BiopolyHeal</p>
              <p className="text-xs text-muted-foreground">AI Wound Care</p>
            </div>
          </Link>
          <nav className="flex flex-col gap-0.5">
            {nav.map((item) => {
              const active = item.end ? location.pathname === item.to : location.pathname.startsWith(item.to);
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                    active
                      ? "bg-primary text-primary-foreground shadow-soft"
                      : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
                  )}
                >
                  <Icon className="size-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-auto">
            <Link to="/login" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-sidebar-accent">
              <LogOut className="size-4" /> Sign out
            </Link>
          </div>
        </aside>
        <main className="min-w-0">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="px-4 sm:px-8 py-6 lg:py-10 max-w-7xl mx-auto"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}

export function PageHeader({ title, subtitle, actions }: { title: string; subtitle?: string; actions?: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-balance">{title}</h1>
        {subtitle && <p className="text-muted-foreground mt-1">{subtitle}</p>}
      </div>
      {actions}
    </div>
  );
}
