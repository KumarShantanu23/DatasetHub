"use client"
import { RotatingSweep } from "./loaders/radar-loader"

export function AIInsightsSidebar() {
  return (
    <aside className="hidden lg:block sticky top-24 rounded-xl p-0 w-80 deep-shadow overflow-hidden border border-white/15 bg-black/60">
      <div className="p-3 border-b border-white/10 flex items-center justify-between">
        <div className="font-mono text-sm">Anime Panel</div>
        <RotatingSweep />
      </div>
      <div className="relative h-56">
        {/* Speedlines */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute h-0.5 w-[140%] left-[-20%] opacity-30"
              style={{
                top: `${(i + 1) * 12}%`,
                background:
                  i % 2 === 0
                    ? "linear-gradient(90deg, transparent, var(--neon-blue), transparent)"
                    : "linear-gradient(90deg, transparent, var(--neon-pink), transparent)",
                transform: "skewY(-10deg)",
                animation: `speedline ${2 + i * 0.2}s linear infinite`,
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>
        {/* Parallax stars */}
        <div className="absolute inset-0">
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: 2,
                height: 2,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                background: i % 3 === 0 ? "var(--neon-green)" : "white",
                opacity: 0.7,
                animation: `twinkle ${1.8 + (i % 5) * 0.2}s ease-in-out infinite`,
                animationDelay: `${(i % 7) * 0.1}s`,
              }}
            />
          ))}
        </div>
        {/* Center badge */}
        <div className="absolute inset-0 grid place-items-center">
          <div className="px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur text-xs font-mono">
            Visualizing matches...
          </div>
        </div>
      </div>
      <div className="p-3 grid grid-cols-3 gap-2 text-center text-[11px] border-t border-white/10">
        <div className="rounded-md p-2 bg-white/5">
          <div className="opacity-70">Style</div>
          <div className="text-[var(--neon-blue)]">Neon</div>
        </div>
        <div className="rounded-md p-2 bg-white/5">
          <div className="opacity-70">Vibe</div>
          <div className="text-[var(--neon-pink)]">Anime</div>
        </div>
        <div className="rounded-md p-2 bg-white/5">
          <div className="opacity-70">FPS</div>
          <div className="text-[var(--neon-green)]">60</div>
        </div>
      </div>
      <style>{`
        @keyframes speedline {
          0% { transform: translateX(-30%) skewY(-10deg); }
          100% { transform: translateX(30%) skewY(-10deg); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(0.9); }
          50% { opacity: 0.9; transform: scale(1.2); }
        }
      `}</style>
    </aside>
  )
}
