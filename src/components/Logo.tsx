import React from "react";
// Import the image file directly
// Note: Ensure the file is actually in src/assets/ or public/
import repuro from "@/assets/repuro-logo.png";

interface LogoProps {
  variant?: "light" | "dark";
}

export function Logo({ variant = "dark" }: LogoProps) {
  return (
    <a href="#home" className="inline-flex items-center gap-2">
      {/* Container to maintain the circular shape and size */}
      <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border border-border/10">
        <img
          src={repuro}
          alt="RE:PURO Logo"
          className="h-full w-full object-cover"
        />
      </div>

      {/* The Brand Text */}
      <span 
        className={`font-display text-lg font-semibold tracking-tight ${
          variant === "light" ? "text-cream" : "text-navy"
        }`}
      >
        RE<span className="text-sky">:</span>PURO
      </span>
    </a>
  );
}