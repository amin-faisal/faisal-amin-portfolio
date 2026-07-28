import { cn } from '../lib/utils.js'
import { Card, CardContent } from './ui/card.jsx'

// Shimmering placeholder block. `animate-pulse-soft` is defined in index.css so
// the sweep matches the one the static skeleton in index.html uses.
export function Skeleton({ className }) {
  return <div className={cn('animate-pulse-soft rounded bg-foreground/[0.08]', className)} />
}

// Generic card placeholder — a title bar plus a few lines of body.
export function CardSkeleton({ lines = 3, className }) {
  return (
    <Card className={className}>
      <CardContent className="flex flex-col gap-3">
        <Skeleton className="h-5 w-40" />
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton key={i} className={cn('h-3.5', i === lines - 1 ? 'w-2/3' : 'w-full')} />
        ))}
      </CardContent>
    </Card>
  )
}

// Stands in for a whole page body while its route chunk downloads.
export function PageSkeleton() {
  return (
    <main className="mx-auto grid max-w-[1128px] grid-cols-1 items-start gap-4 px-2 pt-4 pb-24 sm:gap-6 sm:px-4 sm:pt-6 sm:pb-12 lg:grid-cols-[minmax(0,1fr)_300px]">
      <div className="flex min-w-0 flex-col gap-4 sm:gap-6">
        <Card className="overflow-hidden">
          <Skeleton className="aspect-[2/1] w-full rounded-none" />
          <CardContent className="flex flex-col gap-3">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-3.5 w-full" />
            <Skeleton className="h-3.5 w-5/6" />
            <div className="mt-2 grid gap-3 sm:grid-cols-3">
              <Skeleton className="h-16" />
              <Skeleton className="h-16" />
              <Skeleton className="h-16" />
            </div>
          </CardContent>
        </Card>
        <CardSkeleton lines={4} />
      </div>
      <aside className="hidden flex-col gap-4 lg:flex">
        <CardSkeleton lines={2} />
        <CardSkeleton lines={3} />
      </aside>
    </main>
  )
}
