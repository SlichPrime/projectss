import { useStore } from "@/lib/store";

export default function CustomerProfile() {
  const { currentUser } = useStore();
  if (!currentUser || currentUser.role !== "customer") return null;

  const { username, email, address } = currentUser;

  const Row = ({ label, value }: { label: string; value: string }) => (
    <div className="flex flex-col gap-1 border-b border-border/60 py-3 sm:flex-row sm:items-center sm:gap-6">
      <span className="w-32 shrink-0 text-xs uppercase tracking-widest text-muted-foreground">{label}</span>
      <span className="text-sm text-foreground">{value}</span>
    </div>
  );

  return (
    <div className="container max-w-3xl py-10">
      <p className="text-xs uppercase tracking-[0.3em] text-oxblood">Profile</p>
      <h1 className="mt-2 font-display text-4xl">Your details</h1>

      <div className="mt-8 rounded-sm border border-border bg-card p-6">
        <h2 className="font-display text-xl">Account</h2>
        <Row label="Username" value={username} />
        <Row label="Email" value={email} />
      </div>

      <div className="mt-6 rounded-sm border border-border bg-card p-6">
        <h2 className="font-display text-xl">Delivery address</h2>
        <Row label="Phone" value={address.phone} />
        <Row label="City" value={address.city} />
        <Row label="Postal code" value={address.postalCode} />
        <Row label="Address" value={address.addressLine} />
      </div>
    </div>
  );
}