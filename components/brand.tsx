import { TrainFront } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Brand({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <span className="grid size-8 place-items-center rounded-md bg-primary text-primary-foreground shadow-[0_0_20px_-4px_var(--color-primary)]">
        <TrainFront className="size-5" aria-hidden />
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-sm font-semibold tracking-tight">
          AI <span className="text-primary">RailGuard</span>
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          Predictive Safety
        </span>
      </span>
    </div>
  )
}
