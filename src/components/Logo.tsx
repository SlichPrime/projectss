import { Coffee } from "lucide-react";

interface LogoProps {
  variant?: "light" | "dark";
}

export function Logo({ variant = "dark" }: LogoProps) {
  const color = variant === "light" ? "text-cream" : "text-navy";
  return (
    <a href="#home" className={`inline-flex items-center gap-2 ${color}`}>
      <span className="grid h-8 w-8 place-items-center rounded-full bg-navy text-cream">
        <Coffee className="h-4 w-4" />
      </span>
      <span className="font-display text-lg font-semibold tracking-tight">
        RE<span className="text-sky">:</span>PURO
      </span>
    </a>
  );
}