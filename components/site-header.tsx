"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Bell } from "lucide-react"
import { RocketNotice } from "./rocket-notice"
import { useRouter } from "next/navigation"

export function SiteHeader() {
  const [theme, setTheme] = useState<"light" | "dark">("dark")
  const [showRocket, setShowRocket] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter();

  useEffect(() => {
    const stored = (typeof window !== "undefined" && window.localStorage.getItem("theme")) as "light" | "dark" | null
    const initial = stored ?? "dark"
    setTheme(initial)
    document.documentElement.setAttribute("data-theme", initial)
    document.documentElement.classList.toggle("dark", initial === "dark")
  }, [])

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark"
    setTheme(next)
    document.documentElement.setAttribute("data-theme", next)
    document.documentElement.classList.toggle("dark", next === "dark")
    window.localStorage.setItem("theme", next)
  }

  return (
    <header className="sticky top-0 z-40 bg-white/70 dark:bg-zinc-950/55 backdrop-blur-md border-b border-white/10 shadow-sm">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <motion.div
          className="flex items-center gap-3 hover:cursor-pointer"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}

          onClick={() => router.push('/')}
        >
          <div className="h-8 w-8 rounded-md bg-background glass neon-glow-blue" />
          <div className="font-mono text-lg tracking-wider " style={{ textShadow: "0 0 8px var(--neon-blue)" }}>
            DATASETHUB
          </div>
        </motion.div>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          {[
            { label: "Discover", href: "/discover" },
            { label: "Platforms", href: "/platforms" },
            { label: "Insights", href: "/insights" },
            { label: "About", href: "/about" },
          ].map((item, i) => (
            <motion.a
              key={item.label}
              href={item.href}
              className="relative after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-[var(--neon-green)] hover:after:w-full after:transition-all"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.2 }}
            >
              {item.label}
            </motion.a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            aria-label="Toggle theme"
            onClick={toggleTheme}
            className="relative h-9 w-16 rounded-full glass flex items-center px-1 transition-colors hover:cursor-pointer"
          >
            <motion.span
              layout
              className="h-7 w-7 rounded-full bg-[var(--neon-blue)]"
              initial={false}
              animate={{
                x: theme === "dark" ? 7 : 35,
                backgroundColor: theme === "dark" ? "var(--neon-blue)" : "var(--neon-green)",
              }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </button>

          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="h-10 w-10 rounded-full glass grid place-items-center neon-glow-pink hover:cursor-pointer"
              aria-label="Notifications"
              onClick={() => {
                setShowRocket(true)
                // removed setTimeout close; RocketNotice will call onClose on animation complete
              }}
            >
              <Bell className="h-5 w-5" />
            </motion.button>
            <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-[var(--neon-pink)] animate-pulse" />
          </div>

          <div className="md:hidden">
            <motion.button
              aria-label="Open menu"
              className="h-10 w-10 rounded-full glass grid place-items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span className="sr-only">Menu</span>
              <div className="flex flex-col gap-1.5">
                <span className="block h-0.5 w-5 bg-current" />
                <span className="block h-0.5 w-5 bg-current" />
                <span className="block h-0.5 w-5 bg-current" />
              </div>
            </motion.button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-white/10">
          <nav className="mx-auto max-w-6xl px-4 py-3 grid gap-3 text-sm">
            {[
              { label: "Discover", href: "/discover" },
              { label: "Platforms", href: "/platforms" },
              { label: "Insights", href: "/insights" },
              { label: "About", href: "/about" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="glass rounded-md px-3 py-2 border border-white/10 hover:neon-glow-blue"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}

      <RocketNotice open={showRocket} onClose={() => setShowRocket(false)} />
    </header>
  )
}
