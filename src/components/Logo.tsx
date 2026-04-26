import { Link } from "react-router-dom";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`group inline-flex items-center gap-2 ${className}`}>
      <span className="relative inline-flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gradient-gold shadow-soft">
        <span className="font-display text-lg font-black text-ink">S</span>
      </span>
      <span className="font-display text-xl font-semibold tracking-tight text-foreground">
        Second<span className="text-oxblood">Cycle</span>
      </span>
    </Link>
  );
}