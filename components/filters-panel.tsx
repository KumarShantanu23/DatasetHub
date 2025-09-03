"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

const DOMAINS = ["Finance", "Healthcare", "Retail", "E-commerce", "IoT", "NLP"]
const TASKS = ["Classification", "Regression", "Clustering", "Recommendation", "Forecasting", "NLP"]
const PLATFORMS = ["Kaggle", "HuggingFace", "UCI"]

export type Filters = {
  domains: string[]
  tasks: string[]
  platforms: string[]
}

export function FiltersPanel({ value, onChange }: { value: Filters; onChange: (v: Filters) => void }) {
  const [open, setOpen] = useState(false)

  const toggle = (key: keyof Filters, item: string) => {
    const set = new Set(value[key])
    set.has(item) ? set.delete(item) : set.add(item)
    onChange({ ...value, [key]: Array.from(set) })
  }

  return (
    <div className="glass rounded-xl p-3 md:p-4 deep-shadow">
      <button className="w-full flex items-center justify-between" onClick={() => setOpen(!open)}>
        <span className="font-mono text-sm tracking-wide">Advanced Filters</span>
        <ChevronDown className={`h-5 w-5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3"
          >
            <FilterGroup
              title="Domain"
              items={DOMAINS}
              selected={value.domains}
              onToggle={(s) => toggle("domains", s)}
            />
            <FilterGroup title="Task Type" items={TASKS} selected={value.tasks} onToggle={(s) => toggle("tasks", s)} />
            <FilterGroup
              title="Platforms"
              items={PLATFORMS}
              selected={value.platforms}
              onToggle={(s) => toggle("platforms", s)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function FilterGroup({
  title,
  items,
  selected,
  onToggle,
}: { title: string; items: string[]; selected: string[]; onToggle: (s: string) => void }) {
  return (
    <div>
      <div className="font-mono text-xs uppercase opacity-80 mb-2">{title}</div>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => {
          const active = selected.includes(item)
          return (
            <button
              key={item}
              className={`ripple-container px-3 py-1.5 rounded-full text-xs border transition 
                ${active ? "bg-[var(--neon-green)] text-black border-transparent" : "glass"}`}
              onClick={onToggle.bind(null, item)}
            >
              {item}
            </button>
          )
        })}
      </div>
    </div>
  )
}
