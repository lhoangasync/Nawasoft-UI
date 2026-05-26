"use client";

import { cn } from "@/lib/utils";
import type { CSSProperties } from "react";

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  colorFrom?: string;
  colorTo?: string;
  borderWidth?: number;
}

export function BorderBeam({
  className,
  size = 150,
  duration = 12,
  colorFrom = "oklch(0.49 0.27 293)",
  colorTo = "oklch(0.85 0.18 195)",
  borderWidth = 1.5,
}: BorderBeamProps) {
  return (
    <div
      style={
        {
          "--size": size,
          "--duration": `${duration}s`,
          "--color-from": colorFrom,
          "--color-to": colorTo,
          "--border-width": `${borderWidth}px`,
        } as CSSProperties
      }
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit]",
        "border-(length:--border-width) border-transparent",
        "[background:linear-gradient(var(--card),var(--card))_padding-box,conic-gradient(from_calc(var(--angle,0deg)),transparent_0%,var(--color-from)_10%,var(--color-to)_20%,transparent_30%)_border-box]",
        "animate-spin animation-duration-(--duration)",
        className
      )}
    />
  );
}
