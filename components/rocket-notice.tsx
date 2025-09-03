"use client"
import { motion, AnimatePresence } from "framer-motion"
import { Rocket } from "lucide-react"
import { useEffect, useState } from "react"

export function RocketNotice({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [startY, setStartY] = useState(0)
  const [endY, setEndY] = useState(-200)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setStartY(window.innerHeight - 80) // bottom offset
      setEndY(-200) // exit top
    }
  }, [open])

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="rocket"
          className="pointer-events-none fixed inset-0 z-[60]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Flight path: bottom → top */}
          <motion.div
            className="flex items-center gap-3 will-change-transform absolute left-1/2 -translate-x-1/2"
            initial={{ y: startY, x: 0 }}
            animate={{ y: endY, x: 0 }}
            transition={{ duration: 8, ease: "easeInOut" }}
            onAnimationComplete={onClose}
          >
            {/* Rocket pointing upward */}
            <motion.div
              className="h-10 w-10 rounded-full grid place-items-center bg-black/60 dark:bg-white/10 border border-white/20"
              animate={{ rotate: [-2, 2, -2] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <Rocket className="h-5 w-5 text-[var(--neon-pink)]" />
            </motion.div>

            {/* Banner text with waving (flag effect) */}
            <motion.div
              className="rounded-md px-3 py-2 glass-strong border border-white/20 text-xs font-mono shadow origin-left"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <motion.span
                animate={{ x: [0, 4, -4, 0] }} // horizontal sway like flag
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="block"
              >
                Datasethub developers are working on the backend service
              </motion.span>
            </motion.div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
