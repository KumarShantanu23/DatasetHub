"use client"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import type { Dataset } from "./dataset-card"

export function DatasetModal({ open, onClose, data }: { open: boolean; onClose: () => void; data?: Dataset }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center bg-black/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose} // backdrop closes modal
        >
          <motion.div
            className="relative rounded-2xl max-w-xl w-[92vw] p-5 
                       bg-white/90 dark:bg-black/70 
                       backdrop-blur-2xl border border-white/20 shadow-xl hover:cursor-pointer"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
          // onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            <button
              onClick={onClose}
              className="absolute right-3 top-3 h-9 w-9 rounded-full glass grid place-items-center hover:cursor-pointer neon-glow-blue"
              aria-label="Close"
            >
              <X className="h-5 w-5 " />
            </button>

            <div className="text-xs opacity-70 mb-2">{data?.source?.toUpperCase()}</div>
            <div className="font-mono text-lg mb-3">{data?.title}</div>
            <div className="text-sm opacity-90 mb-4">
              Best model:{" "}
              <span className="text-[var(--neon-green)]">{data?.best_fit_ml_models?.[0]?.model ?? "—"}</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="glass rounded-lg p-3">
                <div className="text-xs opacity-70 mb-1">Usecases</div>
                <div className="flex flex-wrap gap-1.5">
                  {data?.usecases?.map((u) => (
                    <span key={u} className="px-2 py-1 rounded-full text-[11px] glass border border-white/10">
                      {u}
                    </span>
                  ))}
                </div>
              </div>

              <div className="glass rounded-lg p-3">
                <div className="text-xs opacity-70 mb-1">Recommendations</div>
                <ul className="text-xs space-y-1">
                  {data?.best_fit_ml_models?.map((m) => (
                    <li key={m.model} className="flex items-center justify-between">
                      <span>{m.model}</span>
                      <span className="text-[var(--neon-blue)]">{Math.round(m.confidence * 100)}%</span>
                    </li>
                  )) ?? <li>—</li>}
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
