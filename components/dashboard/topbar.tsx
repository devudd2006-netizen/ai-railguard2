'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Bell, Home, RotateCcw, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function DashboardTopbar({
  activeAlerts,
  monitoring,
  onReset,
}: {
  activeAlerts: number
  monitoring: boolean
  onReset: () => void
}) {
  const [clock, setClock] = useState('--:--:--')

  useEffect(() => {
    const update = () =>
      setClock(new Date().toLocaleTimeString('en-US', { hour12: false }))
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <header className="flex h-16 shrink-0 items-center gap-3 border-b border-border/70 bg-background/80 px-4 backdrop-blur sm:px-6">
      <div>
        <h1 className="text-sm font-semibold sm:text-base">Track Section · Line 4 (KM 112–118)</h1>
        <p className="hidden font-mono text-[11px] text-muted-foreground sm:block">
          Live operational monitoring
        </p>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <div className="hidden items-center gap-2 rounded-md border border-border/70 bg-card/60 px-3 py-1.5 md:flex">
          <Search className="size-4 text-muted-foreground" aria-hidden />
          <span className="font-mono text-xs text-muted-foreground">Search nodes…</span>
        </div>

        <span
          className="hidden items-center gap-2 rounded-md border border-border/70 bg-card/60 px-3 py-1.5 font-mono text-xs text-muted-foreground sm:inline-flex"
          aria-live="off"
        >
          {clock}
        </span>

        <span className="inline-flex items-center gap-1.5 rounded-md border border-border/70 bg-card/60 px-2.5 py-1.5 font-mono text-xs">
          <span
            className={`size-1.5 rounded-full ${monitoring ? 'bg-safe animate-rg-blink' : 'bg-muted-foreground'}`}
            aria-hidden
          />
          {monitoring ? 'MONITORING' : 'STANDBY'}
        </span>

        <Button
          variant="outline"
          size="icon-lg"
          aria-label="Reset simulation"
          onClick={onReset}
        >
          <RotateCcw className="size-4" aria-hidden />
        </Button>

        <div className="relative">
          <Button variant="outline" size="icon-lg" aria-label="Alerts">
            <Bell className="size-4" aria-hidden />
          </Button>
          {activeAlerts > 0 && (
            <span className="absolute -right-1 -top-1 grid size-4 place-items-center rounded-full bg-danger text-[10px] font-semibold text-danger-foreground">
              {activeAlerts}
            </span>
          )}
        </div>

        <Button
          variant="outline"
          size="icon-lg"
          aria-label="Back to home"
          nativeButton={false}
          render={<Link href="/" />}
        >
          <Home className="size-4" aria-hidden />
        </Button>
      </div>
    </header>
  )
}
