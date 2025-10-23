"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Medal, Award } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import type { Candidate } from "@/types/candidate"

interface RankingSectionProps {
  candidates: Candidate[]
}

export function RankingSection({ candidates }: RankingSectionProps) {
  const { t } = useLanguage()
  const sortedCandidates = [...candidates].sort((a, b) => b.votes - a.votes)
  const totalVotes = candidates.reduce((sum, c) => sum + c.votes, 0)

  const getRankIcon = (position: number) => {
    switch (position) {
      case 0:
        return <Trophy className="h-5 w-5 text-yellow-500" />
      case 1:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 2:
        return <Award className="h-5 w-5 text-amber-600" />
      default:
        return (
          <div className="h-5 w-5 flex items-center justify-center text-muted-foreground font-bold">{position + 1}</div>
        )
    }
  }

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">{t("ranking.title")}</h2>
        <p className="text-muted-foreground">{t("ranking.subtitle")}</p>
      </div>

      <Card className="overflow-hidden border-border bg-card">
        <div className="divide-y divide-border">
          {sortedCandidates.map((candidate, index) => {
            const percentage = totalVotes > 0 ? (candidate.votes / totalVotes) * 100 : 0

            return (
              <div key={candidate.id} className="relative p-6 hover:bg-muted/50 transition-colors">
                <div className="absolute inset-y-0 left-0 bg-primary/10" style={{ width: `${percentage}%` }} />

                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                      {getRankIcon(index)}
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-card-foreground">{candidate.name}</h3>
                      <p className="text-sm text-muted-foreground">{candidate.party}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-2xl font-bold text-card-foreground">{candidate.votes}</p>
                      <p className="text-xs text-muted-foreground">{t("ranking.votes")}</p>
                    </div>

                    <Badge
                      variant="secondary"
                      className="text-base font-semibold min-w-[80px] justify-center bg-primary/10 text-primary"
                    >
                      {percentage.toFixed(1)}%
                    </Badge>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </Card>
    </section>
  )
}
