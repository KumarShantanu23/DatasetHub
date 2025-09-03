"use client"
import { useEffect, useRef } from "react"
import { motion, useMotionValue, useTransform } from "framer-motion"

export function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateX = useTransform(my, [-50, 50], [6, -6])
  const rotateY = useTransform(mx, [-50, 50], [-6, 6])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window
      mx.set((e.clientX - innerWidth / 2) / 10)
      my.set((e.clientY - innerHeight / 2) / 10)
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    return () => window.removeEventListener("pointermove", onMove)
  }, [mx, my])

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY * 0.2
      if (containerRef.current) {
        containerRef.current.style.backgroundPosition = `0px ${y}px`
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div>
      <div
        ref={containerRef}
        className="fixed inset-0 -z-10 dot-grid"
        style={{ transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)` }}
      />
      <FloatingShapes />
    </div>
  )
}

export function FloatingShapes() {
  return (
    <motion.div className="pointer-events-none fixed inset-0 -z-10" initial={false} aria-hidden="true">
      <motion.div
        className="absolute top-[15%] left-[10%] h-24 w-24 rounded-xl glass neon-glow-blue deep-shadow"
        animate={{ y: [0, -10, 0], rotate: [0, 4, 0] }}
        transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[60%] right-[12%] h-28 w-28 rounded-full glass neon-glow-green deep-shadow"
        animate={{ y: [0, 14, 0], rotate: [0, -6, 0] }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[10%] left-[30%] h-16 w-32 rounded-lg glass neon-glow-pink deep-shadow"
        animate={{ y: [0, -8, 0], rotate: [0, 3, 0] }}
        transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
    </motion.div>
  )
}
