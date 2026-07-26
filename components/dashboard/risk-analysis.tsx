'use client'

import { ShieldAlert } from 'lucide-react'
import { AreaChart, Area, ResponsiveContainer, YAxis } from 'recharts'
import type { SimState } from '@/lib/use-simulation'
import { cn } from '@/lib/utils'

const BANDS = [
  { label: 'Safe', range: '0–34%', className: 'bg-safe', flex: 34 },
  { label: 'Warning', range: '35–69%', className: 'bg-warn', flex: 35 },
  { label: 'High Risk', range: '70–89%', className: 'bg-orange-500', flex: 20 },
  { label: 'Critical', range: '90–100%', className: 'bg-danger', flex: 11 },
]

export function RiskAnalysis({ state }: { state: SimState }) {
  const score = state.riskScore
  const level =
    score >= 90 ? 'CRITICAL' : score >= 70 ? 'HIGH RISK' : score >= 35 ? 'ELEVATED' : 'LOW'
  const tone =
    score >= 90 ? 'text-danger' : score >= 70 ? 'text-orange-500' : score >= 35 ? 'text-warn' : 'text-safe'
  const bar =
    score >= 90 ? 'bg-danger' : score >= 70 ? 'bg-orange-500' : score >= 35 ? 'bg-warn' : 'bg-safe'
  const lineColor =
    score >= 90
      ? 'var(--color-danger)'
      : score >= 70
      ? '#f97316'
      : score >= 35
      ? 'var(--color-warn)'
      : 'var(--color-safe)'

  // gauge as conic ring
  const angle = (score / 100) * 360

  const faultSensor =
    state.sensors.find((s) => s.status === 'danger') ??
    state.sensors.find((s) => s.status === 'warn') ??
    state.sensors[0]

  const factors = [
    { label: 'Vibration amplitude', weight: Math.min(100, Math.round(faultSensor.vibration * 10)) },
    { label: 'Strain (µε)', weight: Math.min(100, Math.round((faultSensor.strain / 700) * 100)) },
    { label: 'Thermal drift', weight: Math.min(100, Math.round(((faultSensor.temp - 27) / 31) * 100)) },
  ]

  const chartData = state.riskHistory.map((v, i) => ({ i, risk: v }))

  return (
    <PanelShell title="Risk Analysis" icon={<ShieldAlert className="size-4 text-primary" />}>
      <div className="flex items-center gap-4">
        <div
          className="relative grid size-24 shrink-0 place-items-center rounded-full"
          style={{
            background: `conic-gradient(var(--color-${score >= 90 ? 'danger' : score >= 35 ? 'warn' : 'safe'}) ${angle}deg, var(--color-muted) ${angle}deg)`,
          }}
          role="img"
          aria-label={`Risk score ${score} percent`}
        >
          <div className="grid size-[74px] place-items-center rounded-full bg-card">
            <span className={cn('font-mono text-xl font-semibold tabular-nums', tone)}>
              {score}%
            </span>
          </div>
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            Failure Probability
          </p>
          <p className={cn('mt-1 text-lg font-semibold', tone)}>{level}</p>
          <p className="mt-1 max-w-[16rem] text-xs leading-relaxed text-muted-foreground">
            Composite score across all monitored nodes on this section.
          </p>
        </div>
      </div>

      {/* Risk scale legend with bands */}
      <div className="mt-4">
        <p className="mb-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          Risk Scale
        </p>
        <div className="flex h-2 w-full overflow-hidden rounded-full">
          {BANDS.map((b) => (
            <div key={b.label} className={b.className} style={{ flex: b.flex }} />
          ))}
        </div>
        <div className="mt-1.5 flex justify-between">
          {BANDS.map((b) => (
            <div key={b.label} className="flex flex-col items-start">
              <span className="font-mono text-[9px] font-semibold text-foreground">{b.label}</span>
              <span className="font-mono text-[9px] text-muted-foreground">{b.range}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Risk trend over the run */}
      <div className="mt-4">
        <p className="mb-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          Risk Trend (this run)
        </p>
        <div className="h-20 w-full rounded-md border border-border/60 bg-muted/10 p-1">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <YAxis hide domain={[0, 100]} />
              <Area
                type="monotone"
                dataKey="risk"
                stroke={lineColor}
                fill={lineColor}
                fillOpacity={0.15}
                strokeWidth={2}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {factors.map((f) => (
          <div key={f.label}>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{f.label}</span>
              <span className="font-mono tabular-nums">{f.weight}%</span>
            </div>
            <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted">
              <div
                className={cn('h-full rounded-full transition-all duration-300', bar)}
                style={{ width: `${f.weight}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </PanelShell>
  )
}

export function PanelShell({
  title,
  icon,
  children,
  className,
}: {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
  className?: string
}) {
  return (
    <section className={cn('flex flex-col rounded-xl border border-border/70 bg-card', className)}>
      <div className="flex items-center gap-2 border-b border-border/70 px-4 py-3">
        {icon}
        <h2 className="text-sm font-semibold">{title}</h2>
      </div>
      <div className="flex-1 p-4">{children}</div>
    </section>
  )
}