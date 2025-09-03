"use client"
import { motion } from "framer-motion"

export function DnaSpinner() {
  return (
    <div className="relative h-10 w-24">
      {[...Array(8)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute top-1/2 left-1/2 h-2 w-2 -mt-1 -ml-1 rounded-full"
          style={{ background: i % 2 ? "var(--neon-blue)" : "var(--neon-pink)" }}
          animate={{ x: [-40, 40, -40], y: [-6, 6, -6] }}
          transition={{ duration: 1.6, delay: i * 0.08, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      ))}
    </div>
  )
}
