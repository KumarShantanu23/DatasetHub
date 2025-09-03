"use client"
import { motion } from "framer-motion"

export function RadarLoader() {
  return (
    <div className="relative h-36 w-36 grid place-items-center">
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border"
          style={{ borderColor: "var(--neon-blue)", inset: 8 * i }}
          initial={{ opacity: 0.2, scale: 0.6 }}
          animate={{ opacity: [0.2, 0.6, 0.2], scale: [0.6, 1, 0.6] }}
          transition={{ duration: 2 + i * 0.2, repeat: Number.POSITIVE_INFINITY, delay: i * 0.25 }}
        />
      ))}
      <RotatingSweep className="absolute h-1/2 w-1" />
    </div>
  )
}

export function RotatingSweep({ className = "" }: { className?: string }) {
  // Simple rotating sweep bar you can reuse as a loader anywhere
  return (
    <div className={`relative h-8 w-8 grid place-items-center ${className}`}>
      <motion.div
        className="absolute h-1/2 w-0.5 rounded-full"
        style={{ background: "var(--neon-green)" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 2.2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />
      <div className="h-1.5 w-1.5 rounded-full bg-[var(--neon-pink)]" />
    </div>
  )
}
