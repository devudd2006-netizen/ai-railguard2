'use client'

import { Play, RotateCcw } from 'lucide-react'
import { useSimulation } from '@/lib/use-simulation'
import { Button } from '@/components/ui/button'
import { DashboardSidebar } from '@/components/dashboard/sidebar'
import { DashboardTopbar } from '@/components/dashboard/topbar'
import { SummaryCards } from '@/components/dashboard/summary-cards'
import { DigitalTwin } from '@/components/dashboard/digital-twin'
import { RiskAnalysis } from '@/components/dashboard/risk-analysis'
import { LiveSensors } from '@/components/dashboard/live-sensors'
import { AiPrediction } from '@/components/dashboard/ai-prediction'
import { AlertTimeline } from '@/components/dashboard/alert-timeline'
import { SystemStatus } from '@/components/dashboard/system-status'
import { AlertPopup } from '@/components/dashboard/alert-popup'

export function Dashboard() {
  const { state, startMonitoring, reset, dismissPopup } = useSimulation()

  return (
    <div className="flex h-dvh overflow-hidden bg-background">
      <DashboardSidebar activeAlerts={state.activeAlerts} />

      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardTopbar
          activeAlerts={state.activeAlerts}
          monitoring={state.monitoring && state.progress < 1}
          onReset={reset}
        />

        <main className="flex-1 overflow-y-auto p-4 sm:p-5">
          <div className="mx-auto flex max-w-7xl flex-col gap-4">
            <SummaryCards state={state} />

            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border/70 bg-card px-4 py-3">
              <div className="min-w-0">
                <h2 className="text-sm font-semibold">Section 14-B · Live Simulation</h2>
                <p className="font-mono text-[11px] text-muted-foreground">
                  {state.monitoring
                    ? state.progress >= 1
                      ? 'Sweep complete — review AI prediction & alerts'
                      : 'Train traversing section · sampling all nodes'
                    : 'Idle — start a monitoring sweep across nodes S1–S6'}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="lg" onClick={reset}>
                  <RotateCcw className="size-4" aria-hidden />
                  Reset Simulation
                </Button>
                <Button
                  size="lg"
                  onClick={startMonitoring}
                  disabled={state.monitoring && state.progress < 1}
                  className="h-10 px-5 shadow-[0_0_24px_-6px_var(--color-primary)]"
                >
                  <Play className="size-4" aria-hidden />
                  {state.monitoring && state.progress < 1 ? 'Monitoring…' : 'Start Monitoring'}
                </Button>
              </div>
            </div>

            <div id="section-overview" className="grid gap-4 xl:grid-cols-3">
              <div id="section-digital-twin" className="flex flex-col gap-4 xl:col-span-2">
                <DigitalTwin state={state} />
                <div id="section-sensors">
                  <LiveSensors state={state} />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <RiskAnalysis state={state} />
                <div id="section-ai-prediction">
                  <AiPrediction state={state} />
                </div>
              </div>
            </div>

            <div id="section-alerts" className="grid gap-4 lg:grid-cols-2">
              <AlertTimeline state={state} />
              <SystemStatus state={state} />
            </div>
          </div>
        </main>
      </div>

      {state.showPopup && <AlertPopup state={state} onDismiss={dismissPopup} />}
    </div>
  )
}