'use client'

import { AlertTriangle, Gauge, PhoneCall, Wrench, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { SimState } from '@/lib/use-simulation'

const ACTIONS = [
  { icon: Gauge, label: 'Reduce train speed to 40 km/h' },
  { icon: PhoneCall, label: 'Notify Control Room' },
  { icon: Wrench, label: 'Dispatch Maintenance Team' },
]

const KM_MAP: Record<string, string> = {
  S1: 'KM 110–111',
  S2: 'KM 112–113',
  S3: 'KM 114–115',
  S4: 'KM 116–117',
  S5: 'KM 118–119',
  S6: 'KM 120–121',
}

export function AlertPopup({ state, onDismiss }: { state: SimState; onDismiss: () => void }) {
  const faultSensor =
    state.sensors.find((s) => s.status === 'danger') ??
    state.sensors.find((s) => s.status === 'warn') ??
    state.sensors[0]

  const currentKM = KM_MAP[faultSensor.id] ?? 'Unknown'

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-background/60 p-4 backdrop-blur-sm sm:items-center"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="rg-alert-title"
    >
      <div className="animate-rg-pop w-full max-w-md overflow-hidden rounded-xl border border-danger/50 bg-card shadow-2xl shadow-danger/20">
        <div className="flex items-start gap-3 border-b border-danger/30 bg-danger/10 p-4">
          <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-danger/20 text-danger">
            <AlertTriangle className="size-5 animate-rg-blink" aria-hidden />
          </span>
          <div className="flex-1">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-danger">
              Critical Alert · Node {faultSensor.id}
            </p>
            <h2 id="rg-alert-title" className="mt-0.5 text-base font-semibold text-foreground">
              High Vibration Detected — Possible Track Failure
            </h2>
          </div>
          <Button variant="ghost" size="icon-sm" aria-label="Dismiss alert" onClick={onDismiss}>
            <X className="size-4" aria-hidden />
          </Button>
        </div>

        <div className="p-4">
          <p className="text-sm leading-relaxed text-muted-foreground">
            AI RailGuard predicts a track failure at sensor {faultSensor.id} ({currentKM}) with{' '}
            {state.riskScore}% risk. Immediate action is recommended.
          </p>

          <p className="mt-4 mb-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            Recommended Actions
          </p>
          <ul className="space-y-2">
            {ACTIONS.map((a) => (
              <li
                key={a.label}
                className="flex items-center gap-3 rounded-lg border border-border/70 bg-muted/30 px-3 py-2"
              >
                <span className="grid size-8 place-items-center rounded-md bg-danger/15 text-danger">
                  <a.icon className="size-4" aria-hidden />
                </span>
                <span className="text-sm font-medium">{a.label}</span>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex gap-2">
            <Button variant="outline" className="flex-1" onClick={onDismiss}>
              Dismiss
            </Button>
            <Button variant="destructive" className="flex-1" onClick={onDismiss}>
              Acknowledge & Act
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}