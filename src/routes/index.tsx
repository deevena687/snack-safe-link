import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Activity, Brain, ShieldCheck, Sparkles, Stethoscope, Waves } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BiopolyHeal — Smart Biopolymer Wound Dressing" },
      { name: "description", content: "AI-assisted wound healing prediction, biopolymer dressing sensors, and clinical analytics in one platform." },
      { property: "og:title", content: "BiopolyHeal — Smart Biopolymer Wound Dressing" },
      { property: "og:description", content: "AI-assisted wound healing prediction with real-time biopolymer sensor monitoring." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Decorative gradient blobs */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 size-[36rem] rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute top-1/3 -left-40 size-[28rem] rounded-full bg-secondary/30 blur-3xl" />
      </div>

      <header className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="size-9 rounded-xl gradient-heal grid place-items-center text-primary-foreground shadow-elegant">
            <Activity className="size-5" />
          </div>
          <span className="font-semibold tracking-tight">BiopolyHeal</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground">Features</a>
          <a href="#how" className="hover:text-foreground">How it works</a>
          <a href="#roles" className="hover:text-foreground">For clinicians</a>
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost"><Link to="/login">Sign in</Link></Button>
          <Button asChild className="gradient-primary text-primary-foreground shadow-elegant"><Link to="/register">Get started</Link></Button>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-6 pt-12 pb-24 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs text-muted-foreground">
            <Sparkles className="size-3 text-primary" /> AI-assisted clinical wound care
          </span>
          <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-balance">
            Smart biopolymer dressings with predictive healing intelligence.
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-xl">
            Continuous moisture, pH and temperature sensing fused with a deep learning model that forecasts healing stage, infection risk and recovery time.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="gradient-primary text-primary-foreground shadow-elegant"><Link to="/app">Open dashboard</Link></Button>
            <Button asChild size="lg" variant="outline"><Link to="/register">Create account</Link></Button>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
            {[
              { n: "98.2%", l: "AI accuracy" },
              { n: "3.4×", l: "Faster triage" },
              { n: "24/7", l: "Sensor stream" },
            ].map((s) => (
              <div key={s.l}>
                <p className="text-2xl font-semibold">{s.n}</p>
                <p className="text-xs text-muted-foreground">{s.l}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.1 }}
          className="relative">
          <div className="glass rounded-3xl p-6 shadow-elegant">
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-sm text-muted-foreground">Patient P-1006</p>
                <p className="font-semibold">Diabetic foot ulcer · Day 14</p>
              </div>
              <span className="rounded-full bg-success/15 text-success px-3 py-1 text-xs font-medium">Healing</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Moisture", v: "68%", c: "from-primary to-primary-glow" },
                { label: "pH", v: "7.1", c: "from-secondary to-primary-glow" },
                { label: "Temp", v: "36.9°", c: "from-primary to-secondary" },
              ].map((m) => (
                <div key={m.label} className={`rounded-2xl p-4 bg-gradient-to-br ${m.c} text-primary-foreground`}>
                  <p className="text-xs opacity-80">{m.label}</p>
                  <p className="text-2xl font-semibold mt-1">{m.v}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-2xl bg-muted p-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="font-medium">Healing progress</span>
                <span className="text-muted-foreground">67%</span>
              </div>
              <div className="h-2 rounded-full bg-background overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: "67%" }} transition={{ duration: 1.2, delay: 0.4 }}
                  className="h-full gradient-heal" />
              </div>
              <p className="mt-3 text-xs text-muted-foreground">AI: Proliferative stage · est. 9 days to recovery · low infection risk.</p>
            </div>
          </div>
        </motion.div>
      </section>

      <section id="features" className="max-w-7xl mx-auto px-6 pb-24">
        <h2 className="text-3xl font-semibold tracking-tight text-balance max-w-2xl">A complete clinical workspace for biopolymer-based dressings.</h2>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { i: Brain, t: "AI healing prediction", d: "Stage classification, recovery %, infection risk and treatment guidance." },
            { i: Waves, t: "Live sensor telemetry", d: "Moisture, pH, temperature and color-index streamed from the dressing." },
            { i: Stethoscope, t: "Doctor workflow", d: "Patient queue, image review, consultation notes and PDF reports." },
            { i: ShieldCheck, t: "Role-based access", d: "Patient, Doctor and Admin roles with secure JWT-style sessions." },
            { i: Activity, t: "Healing analytics", d: "Trend lines for inflammation, granulation and re-epithelialization." },
            { i: Sparkles, t: "Smart alerts", d: "Critical infection, dressing-change and appointment reminders." },
          ].map((f) => (
            <div key={f.t} className="rounded-2xl border bg-card p-5 shadow-soft hover:shadow-elegant transition-shadow">
              <div className="size-10 rounded-xl bg-primary/10 text-primary grid place-items-center"><f.i className="size-5" /></div>
              <p className="mt-4 font-semibold">{f.t}</p>
              <p className="mt-1 text-sm text-muted-foreground">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row justify-between text-sm text-muted-foreground gap-3">
          <p>© {new Date().getFullYear()} BiopolyHeal. Clinical demo with synthetic data.</p>
          <div className="flex gap-6">
            <Link to="/login" className="hover:text-foreground">Sign in</Link>
            <Link to="/register" className="hover:text-foreground">Register</Link>
            <Link to="/app" className="hover:text-foreground">Dashboard</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
