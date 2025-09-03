"use client"
import { useState } from "react"
import type React from "react"

export function useRipple() {
  const [ripples, setRipples] = useState<{ x: number; y: number; key: number }[]>([])
  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    setRipples((prev) => [...prev, { x: e.clientX - rect.left, y: e.clientY - rect.top, key: Date.now() }])
    setTimeout(() => setRipples((prev) => prev.slice(1)), 600)
  }
  const RippleNodes = () => (
    <>
      {ripples.map((r) => (
        <span key={r.key} className="ripple" style={{ left: r.x, top: r.y }} />
      ))}
    </>
  )
  return { onClick, RippleNodes }
}
