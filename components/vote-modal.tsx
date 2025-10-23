"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { toast } from "sonner"
import { useLanguage } from "@/contexts/language-context"
import type { Candidate } from "@/types/candidate"

interface VoteModalProps {
  candidate: Candidate | null
  onClose: () => void
  onConfirm: () => void
}

export function VoteModal({ candidate, onClose, onConfirm }: VoteModalProps) {
  const { t } = useLanguage()

  const handleConfirm = async () => {
    try {
      toast.loading("Processando transação...", { id: "vote-tx" })

      // Simula transação blockchain
      await new Promise((resolve) => setTimeout(resolve, 2000))

      onConfirm()
      toast.success(t("toast.voteSuccess"), {
        id: "vote-tx",
        description: `${t("toast.voteFor")} ${candidate?.name} ${t("toast.voteRecorded")}`,
      })
      onClose()
    } catch (error) {
      toast.error(t("toast.errorConnecting"), {
        id: "vote-tx",
        description: t("toast.tryAgain"),
      })
    }
  }

  return (
    <Dialog open={!!candidate} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-primary" />
            {t("modal.title")}
          </DialogTitle>
          <DialogDescription>{t("modal.warning")}</DialogDescription>
        </DialogHeader>

        {candidate && (
          <div className="space-y-4 py-4">
            <div className="rounded-lg border border-border bg-muted/50 p-4 space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">{t("modal.voting")}</p>
                <p className="text-lg font-bold text-foreground">{candidate.name}</p>
                <p className="text-sm text-muted-foreground">
                  {t("modal.party")} {candidate.party}
                </p>
              </div>

              <div className="pt-3 border-t border-border">
                <p className="text-sm text-muted-foreground mb-2">{t("modal.cost")}</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-bold text-foreground">0.025 ETH</p>
                  <p className="text-sm text-muted-foreground">≈ ${(0.025 * 2340).toFixed(2)} USD</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-primary/10 border border-primary/20 p-4">
              <div className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground">Votação Segura</p>
                  <p className="text-xs text-muted-foreground">
                    Seu voto será registrado de forma permanente e transparente na blockchain Ethereum
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose}>
            {t("modal.cancel")}
          </Button>
          <Button onClick={handleConfirm} className="bg-primary hover:bg-primary/90">
            {t("modal.confirm")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
