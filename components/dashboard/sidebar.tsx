'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  LayoutDashboard,
  Boxes,
  Radio,
  BrainCircuit,
  Bell,
  Map,
  Settings,
  LifeBuoy,
} from 'lucide-react'
import { Brand } from '@/components/brand'
import { cn } from '@/lib/utils'

const NAV = [
  { icon: LayoutDashboard, label: 'Overview', sectionId: 'section-overview' },
  { icon: Boxes, label: 'Digital Twin', sectionId: 'section-digital-twin' },
  { icon: Radio, label: 'Sensor Nodes', sectionId: 'section-sensors' },
  { icon: BrainCircuit, label: 'AI Predictions', sectionId: 'section-ai-prediction' },
  { icon: Bell, label: 'Alerts', badge: true, sectionId: 'section-alerts' },
  { icon: Map, label: 'Track Map', sectionId: 'section-digital-twin' },
]

const NAV_BOTTOM = [
  { icon: Settings, label: 'Settings' },
  { icon: LifeBuoy, label: 'Support' },
]

export function DashboardSidebar({ activeAlerts }: { activeAlerts: number }) {
  const [active, setActive] = useState('Overview')

  const handleNavClick = (label: string, sectionId: string) => {
    setActive(label)
    const el = document.getElementById(sectionId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r border-border/70 bg-sidebar lg:flex">
      <div className="flex h-16 items-center border-b border-border/70 px-4">
        <Link href="/" aria-label="AI RailGuard home">
          <Brand />
        </Link>
      </div>
      <nav className="flex flex-1 flex-col gap-1 p-3">
        <p className="px-3 pb-2 pt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
          Monitoring
        </p>
        {NAV.map((item) => (
          <button
            key={item.label}
            onClick={() => handleNavClick(item.label, item.sectionId)}
            className={cn(
              'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors',
              active === item.label
                ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                : 'text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground',
            )}
          >
            <item.icon className="size-4" aria-hidden />
            <span className="flex-1 text-left">{item.label}</span>
            {item.badge && activeAlerts > 0 && (
              <span className="grid size-5 place-items-center rounded-full bg-danger text-[11px] font-semibold text-danger-foreground">
                {activeAlerts}
              </span>
            )}
          </button>
        ))}
        <div className="mt-auto flex flex-col gap-1">
          {NAV_BOTTOM.map((item) => (
            <button
              key={item.label}
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent/50 hover:text-foreground"
            >
              <item.icon className="size-4" aria-hidden />
              {item.label}
            </button>
          ))}
        </div>
      </nav>
      <div className="border-t border-border/70 p-3">
        <div className="rounded-lg border border-border/70 bg-card/60 p-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            Edge Node
          </p>
          <p className="mt-1 flex items-center gap-2 text-sm">
            <span className="size-1.5 rounded-full bg-safe animate-rg-blink" aria-hidden />
            EN-04 · Connected
          </p>
        </div>
      </div>
    </aside>
  )
}