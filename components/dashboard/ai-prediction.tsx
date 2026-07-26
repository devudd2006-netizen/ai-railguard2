'use client'

import { BrainCircuit, Gauge, PhoneCall, Wrench } from 'lucide-react'
import type { SimState } from '@/lib/use-simulation'
import { PanelShell } from '@/components/dashboard/risk-analysis'
import { cn } from '@/lib/utils'
function getFaultNode(sensors: SimState["sensors"]) {
  const fault = sensors.find((s) => s.status === "danger")
  const warn = sensors.find((s) => s.status === "warn")
  return (fault || warn)?.id ?? "Unknown"
}


export function AiPrediction({ state }: { state: SimState }) {
  const critical = state.riskScore >= 90
const highRisk = state.riskScore >= 70 && state.riskScore < 90
const warning = state.riskScore >= 35 && state.riskScore < 70

let verdict = "Track operating normally"

if (warning) verdict = "Early warning detected"
if (highRisk) verdict = "High probability of failure"
if (critical) verdict = `Track failure predicted at ${getFaultNode(state.sensors)}`
  const kmMap: Record<string, string> = {
  S1: "KM 110–111",
  S2: "KM 112–113",
  S3: "KM 114–115",
  S4: "KM 116–117",
  S5: "KM 118–119",
  S6: "KM 120–121",
}

const currentKM = kmMap[getFaultNode(state.sensors)] ?? "Unknown"
  const faultIdx = state.sensors.findIndex((s) => s.status === "danger")
const fallbackIdx = state.sensors.findIndex((s) => s.status === "warn")
const modeIdx = faultIdx >= 0 ? faultIdx : fallbackIdx >= 0 ? fallbackIdx : 0

const failureMode =
  state.riskScore >= 70
    ? [
        "Rail fatigue crack",
        "Track buckling",
        "Loose fastening",
        "Ballast settlement",
        "Thermal expansion",
        "Rail joint failure",
      ][modeIdx % 6]
    : "Nominal"
 const RECS = critical
  ? [
      {
        icon: Gauge,
        label: "STOP TRAIN",
        detail: "Emergency stop immediately",
      },
      {
        icon: PhoneCall,
        label: "Notify Control Room",
        detail: `Critical issue at ${currentKM}`,
      },
      {
        icon: Wrench,
        label: "Dispatch Emergency Team",
        detail: `Repair ${currentKM}`,
      },
    ]
  : highRisk
  ? [
      {
        icon: Gauge,
        label: "Reduce Speed",
        detail: "Limit train to 50 km/h",
      },
      {
        icon: PhoneCall,
        label: "Notify Maintenance",
        detail: `Inspection at ${currentKM}`,
      },
      {
        icon: Wrench,
        label: "Prepare Repair Crew",
        detail: "Maintenance within 2 hours",
      },
    ]
  : warning
  ? [
      {
        icon: Gauge,
        label: "Increase Monitoring",
        detail: "Watch vibration trend",
      },
      {
        icon: PhoneCall,
        label: "Inform Supervisor",
        detail: `Warning from ${currentKM}`,
      },
      {
        icon: Wrench,
        label: "Schedule Inspection",
        detail: "Inspection within 24 hours",
      },
    ]
  : [
      {
        icon: Gauge,
        label: "Normal Monitoring",
        detail: "Track healthy",
      },
    ]

  return (
    <PanelShell title="AI Prediction" icon={<BrainCircuit className="size-4 text-primary" />}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            Model Verdict
          </p>
          <p
  className={cn(
    "mt-1 text-base font-semibold",
    critical
      ? "text-danger"
      : highRisk
      ? "text-orange-500"
      : warning
      ? "text-warn"
      : "text-safe"
  )}
>
  {verdict}
</p>
        </div>
        <span className="rounded-md border border-border/70 bg-muted/40 px-2 py-1 font-mono text-[11px] text-muted-foreground">
          conf {state.aiConfidence}%
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <Stat label="Time to failure" value={state.etaHours != null ? `~${state.etaHours} h` : '—'} tone={critical ? 'text-danger' : 'text-foreground'} />
        <Stat
  label="Failure mode"
  value={failureMode}
  tone={critical ? "text-warn" : "text-foreground"}
/>
      </div>

      <div className="mt-4">
        <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          Recommended Actions
        </p>
        <ul className="space-y-2">
          {RECS.map((r) => (
            <li
              key={r.label}
              className={cn(
                'flex items-center gap-3 rounded-lg border px-3 py-2 transition-colors',
                critical ? 'border-danger/40 bg-danger/5' : 'border-border/70 bg-muted/20 opacity-60',
              )}
            >
              <span
                className={cn(
                  'grid size-8 shrink-0 place-items-center rounded-md',
                  critical ? 'bg-danger/15 text-danger' : 'bg-muted text-muted-foreground',
                )}
              >
                <r.icon className="size-4" aria-hidden />
              </span>
              <div>
                <p className="text-sm font-medium">{r.label}</p>
                <p className="text-[11px] text-muted-foreground">{r.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </PanelShell>
  )
}

function Stat({ label, value, tone }: { label: string; value: string; tone: string }) {
  return (
    <div className="rounded-lg border border-border/70 bg-muted/20 p-3">
      <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className={cn('mt-1 font-mono text-sm font-semibold', tone)}>{value}</p>
    </div>
  )
}
