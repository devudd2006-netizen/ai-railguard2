'use client'

import { Activity, AlertTriangle, HeartPulse, Radio } from 'lucide-react'
import type { SimState } from '@/lib/use-simulation'
import { cn } from '@/lib/utils'

function riskTone(score: number) {
  if (score >= 70) return { text: 'text-danger', ring: 'border-danger/40', bar: 'bg-danger' }
  if (score >= 35) return { text: 'text-warn', ring: 'border-warn/40', bar: 'bg-warn' }
  return { text: 'text-safe', ring: 'border-safe/40', bar: 'bg-safe' }
}

function healthTone(v: number) {
  if (v < 55) return { text: 'text-danger', bar: 'bg-danger' }
  if (v < 80) return { text: 'text-warn', bar: 'bg-warn' }
  return { text: 'text-safe', bar: 'bg-safe' }
}

export function SummaryCards({ state }: { state: SimState }) {
  const risk = riskTone(state.riskScore)
  const health = healthTone(state.trackHealth)
  const onlineNodes = state.sensors.length

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {/* Total Sensor Nodes */}
      <div className="rounded-xl border border-border/70 bg-card p-4">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            Total Sensor Nodes
          </span>
          <Radio className="size-4 text-primary" aria-hidden />
        </div>
        <p className="mt-3 font-mono text-3xl font-semibold">{onlineNodes}</p>
        <p className="mt-1 flex items-center gap-1.5 text-xs text-safe">
          <span className="size-1.5 rounded-full bg-safe" aria-hidden />
          {onlineNodes} online · 0 offline
        </p>
      </div>

      {/* Track Health Index */}
      <div className="rounded-xl border border-border/70 bg-card p-4">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            Track Health Index
          </span>
          <HeartPulse className={cn('size-4', health.text)} aria-hidden />
        </div>
        <p className={cn('mt-3 font-mono text-3xl font-semibold', health.text)}>
          {state.trackHealth}%
        </p>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
          <div
            className={cn('h-full rounded-full transition-all duration-500', health.bar)}
            style={{ width: `${state.trackHealth}%` }}
          />
        </div>
      </div>

      {/* AI Risk Score */}
      <div className={cn('rounded-xl border bg-card p-4', risk.ring)}>
        <div className="flex items-center justify-between">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            AI Risk Score
          </span>
          <Activity className={cn('size-4', risk.text)} aria-hidden />
        </div>
        <p className={cn('mt-3 font-mono text-3xl font-semibold tabular-nums', risk.text)}>
          {state.riskScore}%
        </p>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
          <div
            className={cn('h-full rounded-full transition-all duration-300', risk.bar)}
            style={{ width: `${state.riskScore}%` }}
          />
        </div>
      </div>

      {/* Active Alerts */}
      <div
        className={cn(
          'rounded-xl border bg-card p-4',
          state.activeAlerts > 0 ? 'border-danger/40' : 'border-border/70',
        )}
      >
        <div className="flex items-center justify-between">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            Active Alerts
          </span>
          <AlertTriangle
            className={cn('size-4', state.activeAlerts > 0 ? 'text-danger' : 'text-muted-foreground')}
            aria-hidden
          />
        </div>
        <p
          className={cn(
            'mt-3 font-mono text-3xl font-semibold tabular-nums',
            state.activeAlerts > 0 ? 'text-danger' : 'text-foreground',
          )}
        >
          {state.activeAlerts}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          {state.activeAlerts > 0 ? 'Requires operator action' : 'All systems nominal'}
        </p>
      </div>
    </div>
  )
}
