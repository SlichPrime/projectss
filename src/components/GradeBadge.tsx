import type { Grade } from "@/lib/types";

export function GradeBadge({ grade, size = "md" }: { grade: Grade; size?: "sm" | "md" | "lg" }) {
  const dim =
    size === "sm" ? "h-6 w-6 text-xs" : size === "lg" ? "h-10 w-10 text-lg" : "h-7 w-7 text-sm";
  return (
    <span
      className={`grade-chip grade-${grade} ${dim}`}
      title={`Grade ${grade}`}
      aria-label={`Grade ${grade}`}
    >
      {grade}
    </span>
  );
}