import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Network, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section id="overview" className="relative overflow-hidden border-b border-border/70">
      <div className="absolute inset-0 grid-bg opacity-60" aria-hidden />
      <div
        className="pointer-events-none absolute -top-40 right-0 h-[520px] w-[520px] rounded-full bg-primary/20 blur-[120px]"
        aria-hidden
      />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-24">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-primary">
            <ShieldCheck className="size-3.5" aria-hidden />
            Predictive Rail Safety Platform
          </span>
          <h1 className="mt-5 text-pretty text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            AI RailGuard — AI Powered Predictive Railway Safety System
          </h1>
          <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            AI RailGuard fuses IoT sensors, Edge Computing, Artificial Intelligence, Cloud
            Computing, and a live Digital Twin to detect track anomalies and predict failures
            before derailments occur.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              className="h-11 px-5 text-sm"
              nativeButton={false}
              render={<Link href="/dashboard" />}
            >
              Launch Control Dashboard
              <ArrowRight className="size-4" aria-hidden />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-11 px-5 text-sm"
              nativeButton={false}
              render={<a href="#architecture" />}
            >
              <Network className="size-4" aria-hidden />
              View Architecture
            </Button>
          </div>
          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-border/70 pt-6">
            {[
              { v: '6', l: 'Sensor Nodes' },
              { v: '<40ms', l: 'Edge Latency' },
              { v: '99.2%', l: 'Model Accuracy' },
            ].map((s) => (
              <div key={s.l}>
                <dt className="font-mono text-2xl font-semibold text-foreground">{s.v}</dt>
                <dd className="mt-1 text-xs text-muted-foreground">{s.l}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative">
          <div className="relative overflow-hidden rounded-xl border border-border/70 bg-card/60 shadow-2xl">
            <Image
              src="/railguard-hero.png"
              alt="Wireframe digital twin of a high-speed train and railway track with glowing sensor nodes"
              width={1024}
              height={1024}
              priority
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-md border border-border/70 bg-background/80 px-2.5 py-1.5 font-mono text-[11px] text-muted-foreground backdrop-blur">
              <span className="size-1.5 rounded-full bg-safe animate-rg-blink" aria-hidden />
              DIGITAL TWIN · LIVE FEED
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
