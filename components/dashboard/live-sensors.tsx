'use client'

import { Radio } from 'lucide-react'
import type { SimState, Sensor } from '@/lib/use-simulation'
import { PanelShell } from '@/components/dashboard/risk-analysis'
import { cn } from '@/lib/utils'

const DOT: Record<Sensor['status'], string> = {
  safe: 'bg-safe',
  warn: 'bg-warn',
  danger: 'bg-danger',
}
const TXT: Record<Sensor['status'], string> = {
  safe: 'text-safe',
  warn: 'text-warn',
  danger: 'text-danger',
}

export function LiveSensors({ state }: { state: SimState }) {
  return (
    <PanelShell title="Live Sensor Readings" icon={<Radio className="size-4 text-primary" />}>
      <div className="overflow-hidden rounded-lg border border-border/70">
        <table className="w-full text-left text-xs">
          <thead className="bg-muted/50 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-3 py-2 font-medium">Node</th>
              <th className="px-3 py-2 text-right font-medium">Vib mm/s</th>
              <th className="px-3 py-2 text-right font-medium">Strain µε</th>
              <th className="px-3 py-2 text-right font-medium">Temp °C</th>
              <th className="px-3 py-2 text-right font-medium">State</th>
            </tr>
          </thead>
          <tbody className="font-mono">
            {state.sensors.map((s) => (
 <tr
  key={s.id}
  onClick={() => console.log(s)}
  className={cn(
    "cursor-pointer border-t border-border/60 transition-colors hover:bg-primary/10",
    s.status === "danger" && "bg-danger/10",
    s.status === "warn" && "bg-warn/10",
  )}
>
              
                <td className="px-3 py-2 font-semibold text-foreground">{s.id}</td>
                <td className={cn('px-3 py-2 text-right tabular-nums', s.status !== 'safe' && TXT[s.status])}>
                  {s.vibration.toFixed(1)}
                </td>
                <td className={cn('px-3 py-2 text-right tabular-nums', s.status !== 'safe' && TXT[s.status])}>
                  {s.strain}
                </td>
                <td className="px-3 py-2 text-right tabular-nums text-muted-foreground">{s.temp}</td>
                <td className="px-3 py-2">
                  <span className="flex items-center justify-end gap-1.5">
                    <span className={cn('size-1.5 rounded-full', DOT[s.status], s.status !== 'safe' && 'animate-rg-blink')} />
                    <span className={cn(TXT[s.status])}>{s.status.toUpperCase()}</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 font-mono text-[11px] text-muted-foreground">
        Sampling @ 200 Hz · edge-filtered · thresholds: vib&gt;5.0, strain&gt;400
      </p>
    </PanelShell>
  )
}
