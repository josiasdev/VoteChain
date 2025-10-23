"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2 } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"
import type { Candidate } from "@/types/candidate"

interface CandidatesGridProps {
  candidates: Candidate[]
  onVote: (candidateId: number) => void
  isConnected: boolean
}

export function CandidatesGrid({ candidates, onVote, isConnected }: CandidatesGridProps) {
  const { t } = useLanguage()

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">{t("candidates.title")}</h2>
        <p className="text-muted-foreground">{t("candidates.subtitle")}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {candidates.map((candidate) => (
          <Card
            key={candidate.id}
            className="overflow-hidden border-border bg-card hover:shadow-xl transition-all duration-300"
          >
            <div className="relative h-64 w-full bg-muted">
              <Image src={candidate.image || "/placeholder.svg"} alt={candidate.name} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-2xl font-bold text-white text-balance">{candidate.name}</h3>
                <Badge variant="secondary" className="mt-2 bg-white/90 text-foreground">
                  {candidate.party}
                </Badge>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-muted-foreground mb-3">{t("candidates.proposals")}</h4>
                <ul className="space-y-2">
                  {candidate.proposals.map((proposal, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-card-foreground">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-pretty">{proposal}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div>
                  <p className="text-2xl font-bold text-card-foreground">{candidate.votes}</p>
                  <p className="text-xs text-muted-foreground">{t("candidates.votes")}</p>
                </div>
                <Button
                  onClick={() => onVote(candidate.id)}
                  disabled={!isConnected}
                  size="lg"
                  className="bg-primary hover:bg-primary/90"
                >
                  {isConnected ? t("candidates.vote") : t("candidates.connectFirst")}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}
