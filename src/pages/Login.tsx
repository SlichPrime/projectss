import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import { toast } from "sonner";

export default function Login() {
  const { login } = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string; form?: string }>({});

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errs: typeof errors = {};
    if (!email.includes("@")) errs.email = "Email must contain '@'.";
    if (!password) errs.password = "Password is required.";
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    const result = login(email, password);
    if (!result.ok) {
      setErrors({ form: result.error });
      return;
    }
    toast.success(`Welcome back, ${result.user.username}.`);
    navigate(from === "/login" ? "/" : from);
  };

  return (
    <div className="container flex min-h-[calc(100vh-4rem)] items-center justify-center py-10">
      <div className="w-full max-w-md">
        <div className="rounded-sm border border-border bg-card p-8 shadow-soft">
          <p className="text-xs uppercase tracking-[0.3em] text-oxblood">Members</p>
          <h1 className="mt-2 font-display text-3xl">Sign in</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Salvage yards keep odd hours. Welcome back.
          </p>

          <form onSubmit={onSubmit} noValidate className="mt-6 space-y-4">
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErrors((s) => ({ ...s, email: undefined, form: undefined })); }}
                className="mt-1 h-11 w-full rounded-sm border border-input bg-background px-3 text-sm outline-none focus:border-oxblood"
                placeholder="you@mail.id"
              />
              {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setErrors((s) => ({ ...s, password: undefined, form: undefined })); }}
                className="mt-1 h-11 w-full rounded-sm border border-input bg-background px-3 text-sm outline-none focus:border-oxblood"
                placeholder="••••••••"
              />
              {errors.password && <p className="mt-1 text-xs text-destructive">{errors.password}</p>}
            </div>
            {errors.form && (
              <p className="rounded-sm border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">{errors.form}</p>
            )}
            <Button type="submit" className="h-11 w-full bg-oxblood text-primary-foreground hover:bg-oxblood/90">
              Sign in
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/register" className="font-medium text-oxblood underline-offset-4 hover:underline">
              Register here
            </Link>
          </p>
        </div>

        <details className="mt-4 rounded-sm border border-border/60 bg-muted/40 p-3 text-xs text-muted-foreground">
          <summary className="cursor-pointer font-medium">Demo accounts</summary>
          <ul className="mt-2 space-y-1">
            <li>Customer · diana@mail.id / cust123</li>
            <li>Seller · seller@heritage.id / seller123</li>
            <li>Admin · admin@secondcycle.id / admin123</li>
          </ul>
        </details>
      </div>
    </div>
  );
}