"use client"
import { CheckCircle2, Loader2 } from "lucide-react"

type Status = "idle" | "searching" | "done"

export function PlatformStatus({ statuses }: { statuses: Record<string, Status> }) {
  const entries = Object.entries(statuses)
  return (
    <div className="glass rounded-xl p-3 md:p-4 flex flex-wrap gap-3">
      {entries.map(([name, status]) => (
        <div key={name} className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10">
          <span
            className="h-2 w-2 rounded-full"
            style={{
              background:
                status === "done"
                  ? "var(--neon-green)"
                  : status === "searching"
                    ? "var(--neon-blue)"
                    : "rgba(255,255,255,0.2)",
            }}
          />
          <span className="text-xs">{name}</span>
          {status === "searching" && <Loader2 className="h-3.5 w-3.5 animate-spin opacity-80" />}
          {status === "done" && <CheckCircle2 className="h-3.5 w-3.5 text-[var(--neon-green)]" />}
        </div>
      ))}
    </div>
  )
}
