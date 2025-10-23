"use client"

import { Button } from "@/components/ui/button"
import { Wallet, ExternalLink, LogOut, Sun, Moon } from "lucide-react"
import { useTheme } from "@/contexts/theme-context"
import { useLanguage } from "@/contexts/language-context"

interface HeaderProps {
  account: string | null
  onConnect: () => void
  onDisconnect: () => void
  isConnecting: boolean
}

export function Header({ account, onConnect, onDisconnect, isConnecting }: HeaderProps) {
  const { theme, toggleTheme } = useTheme()
  const { language, toggleLanguage, t } = useLanguage()
  const contractAddress = "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
  const etherscanUrl = `https://etherscan.io/address/${contractAddress}`

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <svg className="h-6 w-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">{t("header.title")}</h1>
              <p className="text-xs text-muted-foreground">{t("header.subtitle")}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleLanguage} className="h-9 w-9">
              {language === "pt-BR" ? (
                <span className="text-xl" title="Switch to English">
                  🇺🇸
                </span>
              ) : (
                <span className="text-xl" title="Mudar para Português">
                  🇧🇷
                </span>
              )}
            </Button>

            <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-9 w-9">
              {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(etherscanUrl, "_blank")}
              className="hidden sm:flex"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              {t("header.contract")}
            </Button>

            {account ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2">
                  <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
                  <span className="text-sm font-mono text-card-foreground">
                    {account.slice(0, 6)}...{account.slice(-4)}
                  </span>
                </div>
                <Button variant="outline" size="icon" onClick={onDisconnect} title={t("header.disconnect")}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button onClick={onConnect} disabled={isConnecting}>
                <Wallet className="mr-2 h-4 w-4" />
                {isConnecting ? t("header.connecting") : t("header.connect")}
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
