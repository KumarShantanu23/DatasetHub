"use client"
import useSWRMutation from "swr/mutation"
import { useState } from "react"
import { motion } from "framer-motion"
import { RotatingSweep } from "./loaders/radar-loader"
import { PlatformStatus } from "./platform-status"
import { useRipple } from "./ripple"
import type { Filters } from "./filters-panel"

type SearchResponse = {
  datasets: {
    title: string
    source: string
    usecases: string[]
    best_fit_ml_models?: { model: string; confidence: number }[]
  }[]
  processing_time: number
  total_found: number
}

async function sendSearch(url: string, { arg }: { arg: { query: string; filters: Filters } }) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(arg),
  })
  if (!res.ok) throw new Error("Search failed")
  return (await res.json()) as SearchResponse
}

export function HeroSearch({
  onResult,
  filters,
  onFiltersChange,
}: {
  onResult: (r: SearchResponse) => void
  filters: Filters
  onFiltersChange: (f: Filters) => void
}) {
  const [query, setQuery] = useState("")
  const [status, setStatus] = useState<Record<string, "idle" | "searching" | "done">>({
    Kaggle: "idle",
    HuggingFace: "idle",
    UCI: "idle",
  })
  const { trigger, isMutating } = useSWRMutation("/api/search-datasets", sendSearch)
  const { onClick: rippleClick, RippleNodes } = useRipple()

  const startSearch = async () => {
    setStatus({ Kaggle: "searching", HuggingFace: "idle", UCI: "idle" })
    setTimeout(() => setStatus((s) => ({ ...s, Kaggle: "done", HuggingFace: "searching" })), 600)
    setTimeout(() => setStatus((s) => ({ ...s, HuggingFace: "done", UCI: "searching" })), 1200)
    try {
      const result = await trigger({ query, filters })
      setStatus({ Kaggle: "done", HuggingFace: "done", UCI: "done" })
      onResult(result)
    } catch {
      setStatus({ Kaggle: "idle", HuggingFace: "idle", UCI: "idle" })
    }
  }

  const chips = ["Predict churn for telecom", "Recommend movies by synopsis", "Detect anomalies in IoT sensors"]

  return (
    <section className="relative">
      <div className="w-full px-4 md:px-6 py-10 md:py-16">
        <motion.h1
          className="font-mono text-balance text-2xl md:text-4xl mb-6"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          Describe your ML project. We’ll find the perfect dataset.
        </motion.h1>

        <motion.div
          className="grid grid-cols-1 gap-6"
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
        >
          <motion.div
            className="rounded-2xl p-4 md:p-5 deep-shadow border border-white/30 bg-white/15 dark:bg-white/10 backdrop-blur-md"
            variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
          >
            <textarea
              className="w-full h-36 md:h-40 bg-transparent rounded-lg p-3 resize-none outline-none ring-2 ring-[var(--neon-blue)] focus-glow always-focus 
             pl-2 placeholder:text-gray-400 dark:placeholder:text-gray-500"
              placeholder="I want to build a model that..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            <div className="flex flex-wrap gap-2 mt-3">
              {chips.map((c) => (
                <button
                  key={c}
                  onClick={() => setQuery(c)}
                  className="ripple-container px-3 py-1.5 rounded-full text-xs glass border border-white/10 hover:neon-glow-blue"
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-3">
              <button
                onClick={(e) => {
                  rippleClick(e)
                  startSearch()
                }}
                className="ripple-container btn-gradient px-4 py-2 rounded-lg font-mono text-sm deep-shadow hover:neon-glow-green transition"
                disabled={isMutating}
              >
                {isMutating ? "Searching..." : "Search Datasets"}
                <RippleNodes />
              </button>
              <RotatingSweep />
            </div>

            <div className="mt-4">
              <PlatformStatus statuses={status} />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
