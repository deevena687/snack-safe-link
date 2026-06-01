import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Create account — BiopolyHeal" }] }),
  component: Register,
});

function Register() {
  const navigate = useNavigate();
  const [role, setRole] = useState<"Patient" | "Doctor" | "Admin">("Patient");

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <div className="w-full max-w-lg rounded-3xl border bg-card p-8 shadow-elegant">
        <Link to="/" className="flex items-center gap-2 mb-6">
          <div className="size-9 rounded-xl gradient-heal grid place-items-center text-primary-foreground"><Activity className="size-5" /></div>
          <span className="font-semibold">BiopolyHeal</span>
        </Link>
        <h1 className="text-2xl font-semibold tracking-tight">Create your account</h1>
        <p className="text-muted-foreground mt-1">Join the clinical workspace in seconds.</p>

        <form className="mt-6 space-y-4" onSubmit={(e) => { e.preventDefault(); navigate({ to: "/app" }); }}>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2"><Label>First name</Label><Input required defaultValue="Ananya" /></div>
            <div className="space-y-2"><Label>Last name</Label><Input required defaultValue="Rao" /></div>
          </div>
          <div className="space-y-2"><Label>Email</Label><Input type="email" required defaultValue="ananya@hospital.org" /></div>
          <div className="space-y-2"><Label>Password</Label><Input type="password" required defaultValue="biopoly2025" /></div>

          <div className="space-y-2">
            <Label>I am a</Label>
            <div className="grid grid-cols-3 gap-2">
              {(["Patient", "Doctor", "Admin"] as const).map((r) => (
                <button type="button" key={r} onClick={() => setRole(r)}
                  className={`rounded-xl border px-3 py-2 text-sm transition ${role === r ? "border-primary bg-primary/10 text-primary font-medium" : "hover:bg-accent"}`}>
                  {r}
                </button>
              ))}
            </div>
          </div>

          <Button type="submit" className="w-full gradient-primary text-primary-foreground shadow-elegant">Create account</Button>
        </form>

        <p className="mt-6 text-sm text-muted-foreground text-center">
          Already have an account? <Link to="/login" className="text-primary hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
