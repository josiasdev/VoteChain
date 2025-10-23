"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { useLanguage } from "@/contexts/language-context"

declare global {
  interface Window {
    ethereum?: any
  }
}

export function useWeb3() {
  const [account, setAccount] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    checkIfWalletIsConnected()
  }, [])

  const checkIfWalletIsConnected = async () => {
    try {
      if (typeof window.ethereum !== "undefined") {
        const accounts = await window.ethereum.request({ method: "eth_accounts" })
        if (accounts.length > 0) {
          setAccount(accounts[0])
        }
      }
    } catch (error) {
      console.error("Error checking wallet connection:", error)
    }
  }

  const connectWallet = async () => {
    try {
      if (typeof window.ethereum === "undefined") {
        toast.error(t("toast.walletNotDetected"), {
          description: t("toast.installMetaMask"),
        })
        return
      }

      setIsConnecting(true)
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      })

      setAccount(accounts[0])
      toast.success(t("toast.walletConnected"), {
        description: `${t("toast.connectedAs")} ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`,
      })
    } catch (error: any) {
      console.error("Error connecting wallet:", error)
      toast.error(t("toast.errorConnecting"), {
        description: error.message || t("toast.tryAgain"),
      })
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectWallet = () => {
    setAccount(null)
    toast.success(t("toast.walletDisconnected"), {
      description: t("toast.disconnectedSuccess"),
    })
  }

  return {
    account,
    connectWallet,
    disconnectWallet,
    isConnecting,
  }
}
