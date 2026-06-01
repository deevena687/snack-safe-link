import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — BiopolyHeal" }] }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:flex relative gradient-heal text-primary-foreground p-12 flex-col justify-between overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 size-72 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute bottom-10 right-10 size-96 rounded-full bg-white/10 blur-3xl" />
        </div>
        <Link to="/" className="relative flex items-center gap-2">
          <div className="size-9 rounded-xl bg-white/15 grid place-items-center"><Activity className="size-5" /></div>
          <span className="font-semibold">BiopolyHeal</span>
        </Link>
        <div className="relative">
          <h2 className="text-4xl font-semibold tracking-tight max-w-md text-balance">Clinical-grade wound intelligence, at your fingertips.</h2>
          <p className="mt-3 opacity-90 max-w-md">Monitor biopolymer dressing sensors and AI healing predictions in real time.</p>
        </div>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-12">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
          <p className="text-muted-foreground mt-1">Sign in to your clinical workspace.</p>

          <form className="mt-8 space-y-4" onSubmit={(e) => { e.preventDefault(); setLoading(true); setTimeout(() => navigate({ to: "/app" }), 600); }}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@hospital.org" defaultValue="demo@biopolyheal.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" defaultValue="demo1234" required />
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-muted-foreground"><input type="checkbox" className="accent-primary" /> Remember me</label>
              <a className="text-primary hover:underline" href="#">Forgot password?</a>
            </div>
            <Button type="submit" disabled={loading} className="w-full gradient-primary text-primary-foreground shadow-elegant">
              {loading ? "Signing in…" : "Sign in"}
            </Button>
          </form>

          <p className="mt-6 text-sm text-muted-foreground text-center">
            New here? <Link to="/register" className="text-primary hover:underline">Create an account</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
