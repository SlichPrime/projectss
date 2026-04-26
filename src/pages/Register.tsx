import { Link, useNavigate } from "react-router-dom";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import { toast } from "sonner";

type Mode = "customer" | "seller";

export default function Register() {
  const { registerCustomer, registerSeller } = useStore();
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("customer");

  // shared
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // address fields
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [addressLine, setAddressLine] = useState("");

  // seller only
  const [storeName, setStoreName] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!username.trim()) e.username = "Username is required.";
    if (!email.includes("@")) e.email = "Email must contain '@'.";
    if (password.length < 6) e.password = "Password must be 6+ characters.";
    if (!phone.trim()) e.phone = "Phone is required.";
    if (!city.trim()) e.city = "City is required.";
    if (!postalCode.trim()) e.postalCode = "Postal code is required.";
    if (!addressLine.trim()) e.addressLine = "Address line is required.";
    if (mode === "seller" && !storeName.trim()) e.storeName = "Store name is required.";
    return e;
  };

  const onSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;

    const address = { phone, city, postalCode, addressLine };
    const result =
      mode === "customer"
        ? registerCustomer({ username, email, password, address })
        : registerSeller({ username, email, password, storeName, storeAddress: address });

    if (!result.ok) {
      setErrors({ form: result.error });
      return;
    }
    toast.success("Welcome to SecondCycle.");
    navigate("/");
  };

  const inputCls = "mt-1 h-11 w-full rounded-sm border border-input bg-background px-3 text-sm outline-none focus:border-oxblood";
  const lbl = "text-xs uppercase tracking-widest text-muted-foreground";

  return (
    <div className="container flex min-h-[calc(100vh-4rem)] items-center justify-center py-10">
      <div className="w-full max-w-2xl">
        <div className="rounded-sm border border-border bg-card p-8 shadow-soft">
          <p className="text-xs uppercase tracking-[0.3em] text-oxblood">Join</p>
          <h1 className="mt-2 font-display text-3xl">Create your account</h1>

          <div className="mt-6 inline-flex rounded-sm border border-border p-1">
            {(["customer", "seller"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={`rounded-sm px-4 py-2 text-sm font-medium transition-colors ${
                  mode === m ? "bg-brown-deep text-cream" : "text-foreground hover:bg-muted"
                }`}
              >
                I'm a {m}
              </button>
            ))}
          </div>

          <form onSubmit={onSubmit} noValidate className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className={lbl}>Username</label>
              <input value={username} onChange={(e) => setUsername(e.target.value)} className={inputCls} />
              {errors.username && <p className="mt-1 text-xs text-destructive">{errors.username}</p>}
            </div>
            <div>
              <label className={lbl}>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} />
              {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
            </div>
            <div className="md:col-span-2">
              <label className={lbl}>Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputCls} />
              {errors.password && <p className="mt-1 text-xs text-destructive">{errors.password}</p>}
            </div>

            {mode === "seller" && (
              <div className="md:col-span-2">
                <label className={lbl}>Store name</label>
                <input value={storeName} onChange={(e) => setStoreName(e.target.value)} className={inputCls} />
                {errors.storeName && <p className="mt-1 text-xs text-destructive">{errors.storeName}</p>}
              </div>
            )}

            <div className="md:col-span-2">
              <p className="hairline pt-4 text-xs uppercase tracking-[0.3em] text-oxblood">
                {mode === "seller" ? "Store address" : "Delivery address"}
              </p>
            </div>

            <div>
              <label className={lbl}>Phone</label>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} className={inputCls} placeholder="+62…" />
              {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
            </div>
            <div>
              <label className={lbl}>City</label>
              <input value={city} onChange={(e) => setCity(e.target.value)} className={inputCls} />
              {errors.city && <p className="mt-1 text-xs text-destructive">{errors.city}</p>}
            </div>
            <div>
              <label className={lbl}>Postal code</label>
              <input value={postalCode} onChange={(e) => setPostalCode(e.target.value)} className={inputCls} />
              {errors.postalCode && <p className="mt-1 text-xs text-destructive">{errors.postalCode}</p>}
            </div>
            <div>
              <label className={lbl}>Address line</label>
              <input value={addressLine} onChange={(e) => setAddressLine(e.target.value)} className={inputCls} />
              {errors.addressLine && <p className="mt-1 text-xs text-destructive">{errors.addressLine}</p>}
            </div>

            {errors.form && (
              <div className="md:col-span-2 rounded-sm border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {errors.form}
              </div>
            )}

            <div className="md:col-span-2">
              <Button type="submit" className="h-11 w-full bg-oxblood text-primary-foreground hover:bg-oxblood/90">
                Create account
              </Button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already a member?{" "}
            <Link to="/login" className="font-medium text-oxblood underline-offset-4 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}