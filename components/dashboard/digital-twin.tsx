'use client'

import { TrainFront } from 'lucide-react'
import type { SimState, Sensor } from '@/lib/use-simulation'
import { cn } from '@/lib/utils'

const STATUS_STYLES: Record<
  Sensor['status'],
  { dot: string; ring: string; text: string; label: string }
> = {
  safe: { dot: 'bg-safe', ring: 'border-safe/60 shadow-[0_0_14px_-2px_var(--color-safe)]', text: 'text-safe', label: 'OK' },
  warn: { dot: 'bg-warn', ring: 'border-warn/70 shadow-[0_0_16px_-1px_var(--color-warn)]', text: 'text-warn', label: 'WARN' },
  danger: { dot: 'bg-danger', ring: 'border-danger shadow-[0_0_20px_0_var(--color-danger)]', text: 'text-danger', label: 'FAIL' },
}

export function DigitalTwin({ state }: { state: SimState }) {
  const faultSensor =
  state.sensors.find((s) => s.status === 'danger') ??
  state.sensors.find((s) => s.status === 'warn') ??
  state.sensors[0]
  const danger = faultSensor.status === 'danger'
  const warn = faultSensor.status === 'warn'
  const sectionActive = danger || warn

  return (
    <section className="rounded-xl border border-border/70 bg-card">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/70 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="grid size-7 place-items-center rounded-md bg-primary/15 text-primary">
            <TrainFront className="size-4" aria-hidden />
          </span>
          <div>
            <h2 className="text-sm font-semibold">Digital Twin — Live Track Monitor</h2>
            <p className="font-mono text-[11px] text-muted-foreground">
              6 nodes · vibration / strain / thermal fusion
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 font-mono text-[11px] text-muted-foreground">
          <Legend color="bg-safe" label="Safe" />
          <Legend color="bg-warn" label="Warning" />
          <Legend color="bg-danger" label="Critical" />
        </div>
      </div>

      {/* Scene */}
      <div className="relative overflow-hidden">
        <div className="grid-bg relative h-[300px] w-full sm:h-[340px]">
          {/* ambient scan line */}
          <div className="pointer-events-none absolute inset-y-0 w-1/3 overflow-hidden opacity-40">
            <div className="animate-rg-scan h-full w-24 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          </div>

          {/* Affected section highlight */}
          <div
            className={cn(
              'absolute inset-y-0 transition-all duration-500',
              sectionActive ? 'opacity-100' : 'opacity-0',
            )}
            style={{ left: `${Math.max(0, faultSensor.pos - 10)}%`, width: '20%' }}
            aria-hidden
          >
            <div
              className={cn(
                'h-full w-full',
                danger ? 'bg-danger/15' : 'bg-warn/12',
              )}
            />
            <div
              className={cn(
                'absolute inset-y-0 left-0 w-px',
                danger ? 'bg-danger/60' : 'bg-warn/50',
              )}
            />
            <div
              className={cn(
                'absolute inset-y-0 right-0 w-px',
                danger ? 'bg-danger/60' : 'bg-warn/50',
              )}
            />
            <span
              className={cn(
                'absolute left-1/2 top-3 -translate-x-1/2 rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider',
                danger
                  ? 'border-danger/50 bg-danger/15 text-danger'
                  : 'border-warn/50 bg-warn/15 text-warn',
              )}
            >
              {danger ? 'Failure Zone' : 'Watch Zone'}
            </span>
          </div>

          {/* Track (rails + ties) */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2">
            <div className="relative mx-6 h-16">
              {/* ties */}
              <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between px-1">
                {Array.from({ length: 40 }).map((_, i) => (
                  <span key={i} className="h-14 w-0.5 rounded bg-muted-foreground/25" />
                ))}
              </div>
              {/* rails */}
              <div className="absolute inset-x-0 top-[30%] h-0.5 rounded bg-muted-foreground/60" />
              <div className="absolute inset-x-0 top-[70%] h-0.5 rounded bg-muted-foreground/60" />

              {/* Train */}
              <div
                className="absolute top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 transition-[left] duration-100 ease-linear"
                style={{ left: `${Math.max(4, Math.min(96, state.trainPos))}%` }}
              >
                <div className="flex items-center">
                  <div className="flex h-9 items-center gap-1 rounded-md rounded-l-xl border border-primary/60 bg-primary/25 px-2 shadow-[0_0_20px_-4px_var(--color-primary)] backdrop-blur">
                    <TrainFront className="size-4 text-primary" aria-hidden />
                    <span className="hidden font-mono text-[10px] text-primary sm:inline">
                      {Math.round(state.trainPos)}%
                    </span>
                  </div>
                  <div className="h-7 w-6 rounded-sm border border-primary/40 bg-primary/15" />
                  <div className="h-7 w-6 rounded-sm rounded-r-md border border-primary/40 bg-primary/15" />
                </div>
              </div>
            </div>
          </div>

          {/* Sensor nodes */}
          {state.sensors.map((sensor) => {
            const st = STATUS_STYLES[sensor.status]
            return (
              <div
                key={sensor.id}
                className="absolute z-10 flex -translate-x-1/2 flex-col items-center"
                style={{ left: `calc(1.5rem + ${sensor.pos}% - ${sensor.pos * 0.03}rem)`, top: 'calc(50% + 42px)' }}
              >
                <span
                  className={cn(
                    'grid size-6 place-items-center rounded-full border-2 bg-background transition-all',
                    st.ring,
                    sensor.status !== 'safe' && 'animate-rg-blink',
                  )}
                >
                  <span className={cn('size-2 rounded-full', st.dot)} />
                </span>
                <span className={cn('mt-1 font-mono text-[11px] font-semibold', st.text)}>
                  {sensor.id}
                </span>
                <span className="font-mono text-[9px] text-muted-foreground">{st.label}</span>
              </div>
            )
          })}

          {/* Km markers top */}
          <div className="absolute inset-x-6 top-3 flex justify-between font-mono text-[10px] text-muted-foreground/70">
            <span>KM 112.0</span>
            <span>KM 115.0</span>
            <span>KM 118.0</span>
          </div>
        </div>
      </div>
    </section>
  )
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className={cn('size-2 rounded-full', color)} aria-hidden />
      {label}
    </span>
  )
}
