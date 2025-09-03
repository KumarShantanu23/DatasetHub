"use client"
import { useRef } from "react"
import type React from "react"

export function useTilt(max = 12) {
  const ref = useRef<HTMLDivElement>(null)
  const onMouseMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    const rx = (py - 0.5) * -2 * max
    const ry = (px - 0.5) * 2 * max
    el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0) scale(1.02)`
  }
  const onMouseLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)"
  }
  return { ref, onMouseMove, onMouseLeave }
}
