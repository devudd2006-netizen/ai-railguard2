import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/home/hero'
import { Architecture } from '@/components/home/architecture'
import { Capabilities } from '@/components/home/capabilities'
import { Brand } from '@/components/brand'

export default function HomePage() {
  return (
    <div className="min-h-dvh bg-background">
      <SiteHeader />
      <main>
        <Hero />
        <Architecture />
        <Capabilities />
      </main>
      <footer className="border-t border-border/70 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6">
          <Brand />
          <p className="font-mono text-xs text-muted-foreground">
            © {new Date().getFullYear()} AI RailGuard · Predictive Railway Safety
          </p>
        </div>
      </footer>
    </div>
  )
}
