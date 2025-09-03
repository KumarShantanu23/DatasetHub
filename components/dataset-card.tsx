"use client"
import { motion } from "framer-motion"
import { useTilt } from "@/hooks/use-tilt"

export type Dataset = {
  title: string
  source: string
  usecases: string[]
  best_fit_ml_models?: { model: string; confidence: number }[]
  downloadUrl?: string
}

export function DatasetCard({ data, onOpen }: { data: Dataset; onOpen: () => void }) {
  const { ref, onMouseMove, onMouseLeave } = useTilt(10)
  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={onOpen}
      className="rounded-xl p-4 mb-4 cursor-pointer deep-shadow hover:neon-glow-blue transition-shadow border border-white/40 glass-strong"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="text-sm opacity-90 mb-1">{data.source.toUpperCase()}</div>
      <div className="font-mono text-pretty text-base mb-2">{data.title}</div>
      <div className="flex flex-wrap gap-2">
        {data.usecases.slice(0, 3).map((u) => (
          <span key={u} className="px-2 py-1 rounded-full text-[11px] glass-stronger border border-white/25">
            {u}
          </span>
        ))}
      </div>
      {data.best_fit_ml_models?.[0] && (
        <div className="mt-3 text-xs opacity-95">
          Suggests: <span className="text-[var(--neon-green)]">{data.best_fit_ml_models[0].model}</span> (
          {Math.round(data.best_fit_ml_models[0].confidence * 100)}%)
        </div>
      )}
      <div className="mt-3 flex flex-wrap items-center justify-end gap-2">
        <a
          href={data.downloadUrl || "/files/sample-dataset.csv"}
          download
          onClick={(e) => e.stopPropagation()}
          className="w-full md:w-auto inline-flex items-center justify-center px-3 py-1.5 text-xs rounded-md bg-[var(--neon-blue)] text-black font-mono hover:neon-glow-blue transition"
          aria-label={`Download ${data.title}`}
          title="Download dataset (CSV)"
        >
          Download CSV
        </a>
      </div>
    </motion.div>
  )
}
