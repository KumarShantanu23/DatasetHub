"use client"
import { motion } from "framer-motion"

export function AnimeSidebar() {
  return (
    <aside className="sticky top-24 h-[520px] rounded-2xl border border-white/15 bg-white/10 dark:bg-white/5 backdrop-blur-md p-4 overflow-hidden">
      <div className="font-mono text-sm mb-3 opacity-80">Anime Mode</div>
      {/* Faux anime speed lines */}
      <div className="relative h-40 w-full overflow-hidden rounded-md mb-4">
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "repeating-linear-gradient(90deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 2px, transparent 2px, transparent 6px)",
          }}
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "repeating-linear-gradient(0deg, rgba(0,212,255,0.15) 0px, rgba(0,212,255,0.15) 4px, transparent 4px, transparent 12px)",
          }}
          animate={{ y: ["0%", "-50%"] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 4, ease: "linear" }}
        />
      </div>
      <div className="text-sm opacity-80 mb-2">Now Playing:</div>
      <div className="rounded-lg overflow-hidden border border-white/10 mb-4">
        <img
          alt="Anime panel"
          className="w-full h-40 object-cover"
          src="/anime-neon-speed-lines.jpg"
          width={320}
          height={240}
          placeholder="blur"
        />
      </div>
      <p className="text-xs opacity-80 leading-relaxed">
        Action-packed vibes engaged. Search results will animate as your dataset quest unfolds.
      </p>
    </aside>
  )
}
