export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-mono text-2xl mb-2">Insights</h1>
      <p className="opacity-80 mb-6">This is a placeholder page for analytics and insights.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="glass rounded-xl p-4 border border-white/15">
            <div className="text-sm opacity-80 mb-2">Insight {i}</div>
            <div className="h-24 skeleton rounded-md" />
          </div>
        ))}
      </div>
    </main>
  )
}
