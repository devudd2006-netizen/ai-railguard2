import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Brand } from '@/components/brand'

const NAV = [
  { label: 'Overview', href: '#overview' },
  { label: 'Architecture', href: '#architecture' },
  { label: 'Capabilities', href: '#capabilities' },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" aria-label="AI RailGuard home">
          <Brand />
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <span className="hidden items-center gap-1.5 rounded-full border border-safe/30 bg-safe/10 px-2.5 py-1 font-mono text-[11px] text-safe sm:inline-flex">
            <span className="size-1.5 rounded-full bg-safe animate-rg-blink" aria-hidden />
            SYSTEM ONLINE
          </span>
          <Button size="lg" nativeButton={false} render={<Link href="/dashboard" />}>
            Launch Dashboard
          </Button>
        </div>
      </div>
    </header>
  )
}
