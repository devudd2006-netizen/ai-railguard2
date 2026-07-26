'use client'

import { Server } from 'lucide-react'
import type { SimState } from '@/lib/use-simulation'
import { PanelShell } from '@/components/dashboard/risk-analysis'
import { cn } from '@/lib/utils'

export function SystemStatus({ state }: { state: SimState }) {
  const services = [
    { name: 'IoT Sensor Mesh', status: 'Operational', ok: true, meta: `${state.sensors.length}/6 nodes` },
    { name: 'Edge Compute (EN-04)', status: 'Operational', ok: true, meta: '38 ms' },
    { name: 'AI Inference Engine', status: state.monitoring ? 'Running' : 'Idle', ok: true, meta: `conf ${state.aiConfidence}%` },
    { name: 'Cloud Sync', status: 'Operational', ok: true, meta: 'streaming' },
{
  name: 'Digital Twin',
  status: state.activeAlerts > 0 ? 'Alert' : 'Synced',
  ok: state.activeAlerts === 0,
  meta:
    state.activeAlerts > 0
      ? `${(state.sensors.find((s) => s.status === 'danger') ?? state.sensors.find((s) => s.status === 'warn'))?.id ?? 'Unknown'} fault`
      : 'in sync',
},
  ]

  return (
    <PanelShell title="System Status" icon={<Server className="size-4 text-primary" />}>
      <ul className="space-y-2">
        {services.map((s) => (
          <li
            key={s.name}
            className="flex items-center justify-between rounded-lg border border-border/70 bg-muted/20 px-3 py-2"
          >
            <span className="flex items-center gap-2.5">
              <span
                className={cn(
                  'size-2 rounded-full',
                  s.ok ? 'bg-safe' : 'bg-danger animate-rg-blink',
                )}
                aria-hidden
              />
              <span className="text-sm">{s.name}</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="hidden font-mono text-[10px] text-muted-foreground sm:inline">
                {s.meta}
              </span>
              <span
                className={cn(
                  'rounded px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider',
                  s.ok ? 'bg-safe/15 text-safe' : 'bg-danger/15 text-danger',
                )}
              >
                {s.status}
              </span>
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-3 flex items-center justify-between rounded-lg border border-border/70 bg-muted/20 px-3 py-2 font-mono text-[11px] text-muted-foreground">
        <span>Uptime</span>
        <span className="text-safe">99.98% · 214d</span>
      </div>
    </PanelShell>
  )
}
