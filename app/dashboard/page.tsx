import type { Metadata } from 'next'
import { Dashboard } from '@/components/dashboard/dashboard'

export const metadata: Metadata = {
  title: 'Control Dashboard — AI RailGuard',
  description:
    'Live railway safety control dashboard with digital twin, sensor telemetry, AI risk prediction, and alert monitoring.',
}

export default function DashboardPage() {
  return <Dashboard />
}
