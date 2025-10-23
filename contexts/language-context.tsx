"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

type Language = "pt-BR" | "en-US"

interface LanguageContextType {
  language: Language
  toggleLanguage: () => void
  t: (key: string) => string
}

const translations = {
  "pt-BR": {
    // Header
    "header.title": "VoteChain",
    "header.subtitle": "Votação Transparente",
    "header.contract": "Contrato",
    "header.connect": "Conectar Carteira",
    "header.connecting": "Conectando...",
    "header.disconnect": "Desconectar",

    // Metrics
    "metrics.title": "Métricas da Votação",
    "metrics.totalVotes": "Total de Votos",
    "metrics.totalRaised": "Total Arrecadado",
    "metrics.voteCost": "Custo por Voto",

    // Candidates
    "candidates.title": "Candidatos",
    "candidates.subtitle": "Escolha seu candidato e vote de forma transparente usando blockchain",
    "candidates.proposals": "Propostas de Governo",
    "candidates.vote": "Votar",
    "candidates.connectFirst": "Conecte sua carteira",
    "candidates.votes": "votos",

    // Ranking
    "ranking.title": "Ranking de Candidatos",
    "ranking.subtitle": "Classificação em tempo real baseada nos votos recebidos",
    "ranking.position": "Posição",
    "ranking.candidate": "Candidato",
    "ranking.votes": "Votos",
    "ranking.percentage": "Percentual",

    // Modal
    "modal.title": "Confirmar Votação",
    "modal.voting": "Você está votando em:",
    "modal.party": "Partido:",
    "modal.cost": "Custo da votação:",
    "modal.warning": "Esta transação irá transferir 0.025 ETH da sua carteira para o contrato de votação.",
    "modal.cancel": "Cancelar",
    "modal.confirm": "Confirmar Voto",

    // Toasts
    "toast.walletNotDetected": "MetaMask não detectada",
    "toast.installMetaMask": "Por favor, instale a extensão MetaMask para continuar",
    "toast.walletConnected": "Carteira conectada!",
    "toast.connectedAs": "Conectado como",
    "toast.walletDisconnected": "Carteira desconectada",
    "toast.disconnectedSuccess": "Desconectado com sucesso",
    "toast.errorConnecting": "Erro ao conectar carteira",
    "toast.tryAgain": "Tente novamente",
    "toast.voteSuccess": "Voto registrado com sucesso!",
    "toast.voteFor": "Seu voto para",
    "toast.voteRecorded": "foi registrado na blockchain",
    "toast.connectWallet": "Conecte sua carteira",
    "toast.connectFirst": "Por favor, conecte sua carteira MetaMask primeiro",
  },
  "en-US": {
    // Header
    "header.title": "VoteChain",
    "header.subtitle": "Transparent Voting",
    "header.contract": "Contract",
    "header.connect": "Connect Wallet",
    "header.connecting": "Connecting...",
    "header.disconnect": "Disconnect",

    // Metrics
    "metrics.title": "Voting Metrics",
    "metrics.totalVotes": "Total Votes",
    "metrics.totalRaised": "Total Raised",
    "metrics.voteCost": "Cost per Vote",

    // Candidates
    "candidates.title": "Candidates",
    "candidates.subtitle": "Choose your candidate and vote transparently using blockchain",
    "candidates.proposals": "Government Proposals",
    "candidates.vote": "Vote",
    "candidates.connectFirst": "Connect your wallet",
    "candidates.votes": "votes",

    // Ranking
    "ranking.title": "Candidate Ranking",
    "ranking.subtitle": "Real-time ranking based on votes received",
    "ranking.position": "Position",
    "ranking.candidate": "Candidate",
    "ranking.votes": "Votes",
    "ranking.percentage": "Percentage",

    // Modal
    "modal.title": "Confirm Vote",
    "modal.voting": "You are voting for:",
    "modal.party": "Party:",
    "modal.cost": "Vote cost:",
    "modal.warning": "This transaction will transfer 0.025 ETH from your wallet to the voting contract.",
    "modal.cancel": "Cancel",
    "modal.confirm": "Confirm Vote",

    // Toasts
    "toast.walletNotDetected": "MetaMask not detected",
    "toast.installMetaMask": "Please install the MetaMask extension to continue",
    "toast.walletConnected": "Wallet connected!",
    "toast.connectedAs": "Connected as",
    "toast.walletDisconnected": "Wallet disconnected",
    "toast.disconnectedSuccess": "Successfully disconnected",
    "toast.errorConnecting": "Error connecting wallet",
    "toast.tryAgain": "Try again",
    "toast.voteSuccess": "Vote successfully registered!",
    "toast.voteFor": "Your vote for",
    "toast.voteRecorded": "has been recorded on the blockchain",
    "toast.connectWallet": "Connect your wallet",
    "toast.connectFirst": "Please connect your MetaMask wallet first",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("pt-BR")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedLanguage = localStorage.getItem("language") as Language | null
    if (savedLanguage) {
      setLanguage(savedLanguage)
    }
  }, [])

  const toggleLanguage = () => {
    const newLanguage = language === "pt-BR" ? "en-US" : "pt-BR"
    setLanguage(newLanguage)
    if (mounted) {
      localStorage.setItem("language", newLanguage)
    }
  }

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)["pt-BR"]] || key
  }

  return <LanguageContext.Provider value={{ language, toggleLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
