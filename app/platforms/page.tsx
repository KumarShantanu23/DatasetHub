"use client"

import type React from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export default function Page() {
  const { toast } = useToast()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [platform, setPlatform] = useState("")
  const [details, setDetails] = useState("")

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!name || !email || !platform) {
      toast({ title: "Missing info", description: "Please fill your name, email, and the platform name." })
      return
    }
    toast({ title: "Request sent", description: "Thanks! We’ll review your integration request shortly." })
    setName("")
    setEmail("")
    setPlatform("")
    setDetails("")
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-mono text-2xl mb-2">Platforms</h1>
      <p className="opacity-80 mb-6">These dataset platforms are currently supported.</p>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        {["Kaggle", "Hugging Face", "UCI Machine Learning Repository", "Google Dataset Search"].map((p) => (
          <li key={p} className="glass rounded-xl p-4 border border-white/15 flex items-center justify-between">
            <span>{p}</span>
            <span className="text-xs opacity-70">Status: Available</span>
          </li>
        ))}
      </ul>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="font-mono text-xl mb-2">Request another platform</h2>
          <p className="opacity-80 mb-4">
            Tell us which platform you’d like to see next. We’ll use this to prioritize integrations.
          </p>
          <form onSubmit={submit} className="glass rounded-xl p-4 border border-white/15 grid gap-3">
            <Input
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-border pl-2 bg-transparent"
            />
            <Input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-border pl-2 bg-transparent"
            />
            <Input
              placeholder="Platform name (e.g., Data.gov)"
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="border border-border pl-2 bg-transparent"
            />
            <Textarea
              placeholder="What types of datasets or why this platform matters?"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="min-h-28 resize-y border border-border pl-2 bg-transparent "
            />
            <button type="submit" className="btn-gradient px-4 py-2 rounded-md font-mono text-sm deep-shadow">
              Submit request
            </button>
          </form>
        </div>
        <div className="glass rounded-xl p-4 border border-white/15">
          <h3 className="font-mono text-lg mb-2">What happens next?</h3>
          <ul className="list-disc ml-5 text-sm opacity-90 space-y-1">
            <li>We collect requests and gauge demand.</li>
            <li>We assess API stability and licensing.</li>
            <li>We build importers and test quality.</li>
            <li>We announce when the integration is live.</li>
          </ul>
        </div>
      </section>
    </main>
  )
}
