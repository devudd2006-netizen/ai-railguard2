import Link from 'next/link'
import { ArrowRight, Bell, GaugeCircle, LineChart, MapPinned } from 'lucide-react'
import { Button } from '@/components/ui/button'

const FEATURES = [
  {
    icon: GaugeCircle,
    title: 'Real-time Track Health',
    desc: 'A continuously updated health index per section, computed from live multi-sensor fusion.',
  },
  {
    icon: LineChart,
    title: 'Failure Prediction',
    desc: 'AI risk scoring estimates the probability and window of a track failure before it happens.',
  },
  {
    icon: MapPinned,
    title: 'Geo-located Anomalies',
    desc: 'The digital twin pinpoints exactly which node and section is degrading, down to the meter.',
  },
  {
    icon: Bell,
    title: 'Actionable Alerts',
    desc: 'Prioritized alerts with recommended actions: slow trains, notify control, dispatch crews.',
  },
]

export function Capabilities() {
  return (
    <section id="capabilities" className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <div key={f.title} className="rounded-xl border border-border/70 bg-card/60 p-5">
              <f.icon className="size-6 text-primary" aria-hidden />
              <h3 className="mt-4 text-base font-medium">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="relative mt-14 overflow-hidden rounded-2xl border border-border/70 bg-card/60 p-8 sm:p-12">
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/20 blur-[110px]"
            aria-hidden
          />
          <div className="relative flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-xl">
              <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
                Step into the control room
              </h2>
              <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
                Launch the live dashboard, run a monitoring simulation, and watch AI RailGuard
                catch a developing track failure at sensor S4 in real time.
              </p>
            </div>
            <Button
              size="lg"
              className="h-11 shrink-0 px-5 text-sm"
              nativeButton={false}
              render={<Link href="/dashboard" />}
            >
              Launch Control Dashboard
              <ArrowRight className="size-4" aria-hidden />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
