"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { MetricsSection } from "@/components/metrics-section"
import { CandidatesGrid } from "@/components/candidates-grid"
import { RankingSection } from "@/components/ranking-section"
import { VoteModal } from "@/components/vote-modal"
import { useWeb3 } from "@/hooks/use-web3"
import type { Candidate } from "@/types/candidate"

export default function Home() {
  const { account, connectWallet, disconnectWallet, isConnecting } = useWeb3()
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null)
  const [candidates, setCandidates] = useState<Candidate[]>([
    {
      id: 1,
      name: "Ana Silva",
      party: "Partido Progressista",
      image: "/professional-woman-politician.jpg",
      votes: 1247,
      proposals: [
        "Investimento em educação pública de qualidade",
        "Programa de energia renovável para toda cidade",
        "Criação de 50 mil empregos em tecnologia",
        "Sistema de saúde universal e digitalizado",
        "Transporte público gratuito e sustentável",
      ],
    },
    {
      id: 2,
      name: "Carlos Mendes",
      party: "Partido da Inovação",
      image: "/professional-man-politician.jpg",
      votes: 983,
      proposals: [
        "Blockchain para transparência governamental",
        "Incentivos fiscais para startups",
        "Internet de alta velocidade gratuita",
        "Modernização da infraestrutura urbana",
        "Programa de capacitação digital gratuito",
      ],
    },
    {
      id: 3,
      name: "Maria Santos",
      party: "Partido Verde",
      image: "/professional-woman-leader.png",
      votes: 1456,
      proposals: [
        "Reflorestamento de 1 milhão de árvores",
        "Proibição de plásticos descartáveis",
        "Agricultura urbana sustentável",
        "Mobilidade elétrica para toda frota pública",
        "Parques e áreas verdes em todos bairros",
      ],
    },
    {
      id: 4,
      name: "João Oliveira",
      party: "Partido Social",
      image: "/professional-man-leader.jpg",
      votes: 1102,
      proposals: [
        "Moradia digna para todas as famílias",
        "Renda básica universal de R$ 1.000",
        "Creches em tempo integral gratuitas",
        "Programa de inclusão digital para idosos",
        "Centro cultural em cada comunidade",
      ],
    },
  ])

  const totalVotes = candidates.reduce((sum, c) => sum + c.votes, 0)
  const totalRaised = totalVotes * 0.025

  const handleVote = (candidateId: number) => {
    const candidate = candidates.find((c) => c.id === candidateId)
    if (candidate) {
      setSelectedCandidate(candidate)
    }
  }

  const confirmVote = () => {
    if (selectedCandidate) {
      setCandidates((prev) => prev.map((c) => (c.id === selectedCandidate.id ? { ...c, votes: c.votes + 1 } : c)))
      setSelectedCandidate(null)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header account={account} onConnect={connectWallet} onDisconnect={disconnectWallet} isConnecting={isConnecting} />

      <main className="container mx-auto px-4 py-8 space-y-12">
        <MetricsSection totalVotes={totalVotes} totalRaised={totalRaised} />

        <CandidatesGrid candidates={candidates} onVote={handleVote} isConnected={!!account} />

        <RankingSection candidates={candidates} />
      </main>

      <VoteModal candidate={selectedCandidate} onClose={() => setSelectedCandidate(null)} onConfirm={confirmVote} />
    </div>
  )
}
