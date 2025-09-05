"use client"
import { AnimatedBackground, FloatingShapes } from "@/components/animated-background"
import { HeroSearch } from "@/components/hero-search"
import { FiltersPanel, type Filters } from "@/components/filters-panel"
import { ResultsGrid } from "@/components/results-grid"
import { DatasetModal } from "@/components/dataset-modal"
import { AnimeSidebar } from "@/components/anime-sidebar"
import { useState } from "react"
import type { Dataset } from "@/components/dataset-card"
import { motion } from "framer-motion"

export default function Page() {
  const [filters, setFilters] = useState<Filters>({ domains: [], tasks: [], platforms: [] })
  const [results, setResults] = useState<{ datasets: Dataset[]; processing_time: number; total_found: number } | null>(
    null,
  )
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState<Dataset | undefined>(undefined)

  const handleResult = (r: any) => {
    setLoading(false)
    setResults(r)
  }

  return (
    <main>
      <AnimatedBackground />
      <FloatingShapes />
      {/* SiteHeader is rendered globally in layout */}

      <div className="px-4 md:px-6 mt-6">
        <HeroSearch onResult={(r) => handleResult(r)} filters={filters} onFiltersChange={setFilters} />
      </div>

      <section className="mx-auto max-w-6xl px-4 mt-2">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6"
        >
          <div>
            <FiltersPanel value={filters} onChange={setFilters} />
            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm opacity-80">
                {results
                  ? `${results.total_found} datasets found in ${results.processing_time}s`
                  : "Start a search to see results"}
              </div>
            </div>
            <div className="mt-4">
              <ResultsGrid datasets={results?.datasets ?? []} loading={loading} onOpen={(d) => setSelected(d)} />
            </div>
          </div>

          {/* <AnimeSidebar /> */}
        </motion.div>
      </section>

      <DatasetModal open={!!selected} data={selected} onClose={() => setSelected(undefined)} />
    </main>
  )
}
