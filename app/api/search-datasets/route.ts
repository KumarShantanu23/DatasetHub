import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body = await req.json()
  const { filters } = body ?? {}
  await new Promise((r) => setTimeout(r, 900))

  const sample = [
    {
      title: "Customer Churn Dataset",
      source: "kaggle",
      usecases: ["Prediction", "Classification"],
      best_fit_ml_models: [{ model: "XGBoost", confidence: 0.89 }],
    },
    {
      title: "MovieLens 25M",
      source: "kaggle",
      usecases: ["Recommendation"],
      best_fit_ml_models: [{ model: "Matrix Factorization", confidence: 0.86 }],
    },
    {
      title: "IMDB Reviews",
      source: "huggingface",
      usecases: ["NLP", "Sentiment"],
      best_fit_ml_models: [{ model: "BERT", confidence: 0.84 }],
    },
    {
      title: "UCI Power Consumption",
      source: "uci",
      usecases: ["Forecasting", "Time Series"],
      best_fit_ml_models: [{ model: "LSTM", confidence: 0.8 }],
    },
    {
      title: "Credit Card Fraud",
      source: "kaggle",
      usecases: ["Anomaly Detection"],
      best_fit_ml_models: [{ model: "Isolation Forest", confidence: 0.82 }],
    },
  ]

  const filtered = sample.filter((s) => {
    const p = filters?.platforms?.length
      ? filters.platforms.some((p: string) => s.source.toLowerCase().includes(p.toLowerCase()))
      : true
    const t = filters?.tasks?.length
      ? filters.tasks.some((t: string) => s.usecases.join(" ").toLowerCase().includes(t.toLowerCase()))
      : true
    return p && t
  })

  return NextResponse.json({
    datasets: filtered.length ? filtered : sample,
    processing_time: 2.5,
    total_found: (filtered.length ? filtered.length : sample.length) + 7,
  })
}
