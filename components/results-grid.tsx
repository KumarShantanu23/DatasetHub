"use client"
import { useEffect, useMemo, useRef, useState } from "react"
import { type Dataset, DatasetCard } from "./dataset-card"
import { SkeletonCard } from "./loaders/skeleton-card"

export function ResultsGrid({
  datasets,
  loading,
  onOpen,
}: { datasets: Dataset[]; loading: boolean; onOpen: (d: Dataset) => void }) {
  const [visible, setVisible] = useState(12)
  const loadMoreRef = useRef<HTMLDivElement>(null)

  useEffect(() => setVisible(12), [datasets])

  useEffect(() => {
    const el = loadMoreRef.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible((v) => Math.min(datasets.length, v + 8))
        }
      },
      { rootMargin: "600px" },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [datasets.length])

  const shown = useMemo(() => datasets.slice(0, visible), [datasets, visible])

  return (
    <div>
      <div className="masonry columns-1 sm:columns-2 lg:columns-3">
        {shown.map((d) => (
          <DatasetCard key={d.title + d.source} data={d} onOpen={() => onOpen(d)} />
        ))}
        {loading && Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={`sk-${i}`} />)}
      </div>
      <div ref={loadMoreRef} className="h-6" />
    </div>
  )
}
