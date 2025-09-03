"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export function SiteFooter() {
  const [isDark, setIsDark] = useState(true); // default to dark
  const router = useRouter();
  useEffect(() => {
    // only run client-side
    const stored = localStorage.getItem("theme") || "dark";
    setIsDark(stored === "dark");

    // watch for changes (in case other parts of app update theme)
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  return (
    <footer className="mt-16">
      <div className="h-px w-full bg-gradient-to-r from-[var(--neon-blue)] via-[var(--neon-green)] to-[var(--neon-pink)] opacity-40" />
      <div className="mx-auto max-w-6xl px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex items-start gap-3 hover:cursor-pointer" onClick={
          () => router.push('/')
        }>
          <div className="h-8 w-8 rounded-md glass neon-glow-blue mt-1" aria-hidden />
          <div>
            <div className="font-mono text-base tracking-wide">DatasetHub</div>
            <div className="text-sm opacity-80">Find the perfect dataset for your ML project</div>
          </div>
        </div>

        <nav className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-2 gap-3 text-sm opacity-90">
          <a href="/discover" className="hover:text-[var(--neon-blue)]">Discover</a>
          <a href="/platforms" className="hover:text-[var(--neon-green)]">Platforms</a>
          <a href="/insights" className="hover:text-[var(--neon-pink)]">Insights</a>
          <a href="/about" className="hover:text-[var(--neon-blue)]">About</a>
        </nav>

        <div className="md:text-right">
          <form
            className="glass rounded-xl p-3 border border-white/15 inline-flex w-full md:w-auto items-center gap-2"
            onSubmit={(e) => {
              e.preventDefault()
              alert("Thanks! We’ll keep you posted.")
            }}
          >
            <input
              type="email"
              required
              placeholder="Get updates by email"
              className="bg-transparent px-3 py-2 rounded-md text-sm flex-1 outline-none border border-border 
             focus-glow always-focus 
             placeholder:text-gray-500 dark:placeholder:text-white/50 
             transition-colors duration-300"
            />

            <button type="submit" className="btn-gradient px-3 py-2 rounded-md text-xs font-mono deep-shadow">
              Subscribe
            </button>
          </form>
          <div className="text-xs opacity-70 mt-3">© {new Date().getFullYear()} DatasetHub. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}
