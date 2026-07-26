'use client'

import { Bell } from 'lucide-react'
import type { AlertEntry, SimState } from '@/lib/use-simulation'
import { PanelShell } from '@/components/dashboard/risk-analysis'
import { cn } from '@/lib/utils'

const LEVEL: Record<AlertEntry['level'], { dot: string; text: string }> = {
  info: { dot: 'bg-info', text: 'text-info' },
  warn: { dot: 'bg-warn', text: 'text-warn' },
  danger: { dot: 'bg-danger', text: 'text-danger' },
}

export function AlertTimeline({ state }: { state: SimState }) {
  return (
    <PanelShell title="Alert Timeline" icon={<Bell className="size-4 text-primary" />}>
      <ol className="relative space-y-4 before:absolute before:left-[5px] before:top-1 before:h-[calc(100%-0.5rem)] before:w-px before:bg-border">
        {state.alerts.map((a) => {
          const lv = LEVEL[a.level]
          return (
            <li key={a.id} className="relative pl-6">
              <span
                className={cn(
                  'absolute left-0 top-1 size-3 rounded-full border-2 border-card',
                  lv.dot,
                  a.level !== 'info' && 'animate-rg-blink',
                )}
                aria-hidden
              />
              <div className="flex items-center gap-2">
                <span className={cn('font-mono text-[10px] uppercase tracking-wider', lv.text)}>
                  {a.level}
                </span>
                <span className="font-mono text-[10px] text-muted-foreground">{a.time}</span>
              </div>
              <p className="mt-0.5 text-sm leading-snug text-foreground">{a.message}</p>
            </li>
          )
        })}
      </ol>
    </PanelShell>
  )
}
