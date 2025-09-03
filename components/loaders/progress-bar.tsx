"use client"
import { useMemo } from "react"

export function NeonProgress({ value }: { value: number }) {
  const clamped = useMemo(() => Math.max(0, Math.min(100, value)), [value])
  return (
    <div className="w-full h-3 rounded-full glass relative overflow-hidden">
      <div
        className="h-full rounded-full neon-glow-green"
        style={{
          width: `${clamped}%`,
          background: "linear-gradient(90deg, var(--neon-blue), var(--neon-green))",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle at 10% 50%, rgba(255,255,255,0.12) 2px, transparent 2px)" }}
      />
    </div>
  )
}
