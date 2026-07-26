import { Activity, BrainCircuit, Cloud, Cpu, Boxes, Radio } from 'lucide-react'

const LAYERS = [
  {
    icon: Radio,
    name: 'IoT Sensors',
    tag: 'ACQUIRE',
    desc: 'Vibration, strain, and temperature sensors mounted along the track continuously stream telemetry.',
  },
  {
    icon: Cpu,
    name: 'Edge Computing',
    tag: 'FILTER',
    desc: 'On-site edge nodes clean and pre-process signals in real time, flagging anomalies within milliseconds.',
  },
  {
    icon: BrainCircuit,
    name: 'Artificial Intelligence',
    tag: 'PREDICT',
    desc: 'ML models score failure risk from sensor patterns and forecast time-to-failure for each section.',
  },
  {
    icon: Cloud,
    name: 'Cloud Computing',
    tag: 'SCALE',
    desc: 'Historical data, model training, and fleet-wide analytics run in the cloud for network-scale insight.',
  },
  {
    icon: Boxes,
    name: 'Digital Twin',
    tag: 'VISUALIZE',
    desc: 'A live virtual replica of the track mirrors real conditions, highlighting risk zones as they emerge.',
  },
  {
    icon: Activity,
    name: 'Control Room',
    tag: 'ACT',
    desc: 'Operators receive prioritized alerts and AI recommendations to dispatch maintenance before failure.',
  },
]

export function Architecture() {
  return (
    <section id="architecture" className="relative border-b border-border/70 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-primary">
            System Architecture
          </span>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            From rail vibration to preventive action
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Data flows through six coordinated layers, turning raw physical signals into
            decisions that keep trains safely on the track.
          </p>
        </div>

        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LAYERS.map((layer, i) => (
            <li
              key={layer.name}
              className="group relative rounded-xl border border-border/70 bg-card/60 p-5 transition-colors hover:border-primary/50"
            >
              <div className="flex items-center justify-between">
                <span className="grid size-10 place-items-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
                  <layer.icon className="size-5" aria-hidden />
                </span>
                <span className="font-mono text-[11px] tracking-[0.16em] text-muted-foreground">
                  {String(i + 1).padStart(2, '0')} · {layer.tag}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-medium">{layer.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{layer.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
