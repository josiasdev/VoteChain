"use client"

import { Card } from "@/components/ui/card"
import { TrendingUp, Users, Coins } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

interface MetricsSectionProps {
  totalVotes: number
  totalRaised: number
}

export function MetricsSection({ totalVotes, totalRaised }: MetricsSectionProps) {
  const { t } = useLanguage()

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">{t("metrics.title")}</h2>
          <p className="text-muted-foreground">Dados em tempo real da blockchain</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-6 border-border bg-card hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">{t("metrics.totalVotes")}</p>
              <p className="text-3xl font-bold text-card-foreground">{totalVotes.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-success" />
                <span className="text-success">+12.5%</span> vs. última hora
              </p>
            </div>
            <div className="rounded-lg bg-primary/10 p-3">
              <Users className="h-6 w-6 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-border bg-card hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">{t("metrics.totalRaised")}</p>
              <p className="text-3xl font-bold text-card-foreground">{totalRaised.toFixed(3)} ETH</p>
              <p className="text-xs text-muted-foreground">
                ≈ ${(totalRaised * 2340).toLocaleString("pt-BR", { minimumFractionDigits: 2 })} USD
              </p>
            </div>
            <div className="rounded-lg bg-accent/10 p-3">
              <Coins className="h-6 w-6 text-accent" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-border bg-card hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">{t("metrics.voteCost")}</p>
              <p className="text-3xl font-bold text-card-foreground">0.025 ETH</p>
              <p className="text-xs text-muted-foreground">≈ ${(0.025 * 2340).toFixed(2)} USD</p>
            </div>
            <div className="rounded-lg bg-success/10 p-3">
              <svg className="h-6 w-6 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
