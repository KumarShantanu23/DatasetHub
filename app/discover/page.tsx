export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-mono text-2xl mb-2">Discover</h1>
      <p className="opacity-80 mb-6">This is a placeholder page for dataset discovery content.</p>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass rounded-xl p-4 border border-white/15">
          <div className="text-sm opacity-80 mb-2">Trending</div>
          <div className="h-24 skeleton rounded-md" />
        </div>
        <div className="glass rounded-xl p-4 border border-white/15">
          <div className="text-sm opacity-80 mb-2">New Datasets</div>
          <div className="h-24 skeleton rounded-md" />
        </div>
        <div className="glass rounded-xl p-4 border border-white/15">
          <div className="text-sm opacity-80 mb-2">Editors’ Picks</div>
          <div className="h-24 skeleton rounded-md" />
        </div>
      </section>
    </main>
  )
}
