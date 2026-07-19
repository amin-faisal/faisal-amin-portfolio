import { cn } from '../../lib/utils.js'

export function Card({ className, ...props }) {
  return (
    <div
      className={cn('rounded-lg border border-line bg-card shadow-[0_0_0_1px_rgba(0,0,0,0.02)]', className)}
      {...props}
    />
  )
}

export function CardHeader({ className, ...props }) {
  return <div className={cn('px-4 pt-4 sm:px-6 sm:pt-5', className)} {...props} />
}

export function CardTitle({ className, ...props }) {
  return <h2 className={cn('text-xl font-semibold leading-tight', className)} {...props} />
}

export function CardDescription({ className, ...props }) {
  return <p className={cn('mt-0.5 text-sm text-muted-foreground', className)} {...props} />
}

export function CardContent({ className, ...props }) {
  return <div className={cn('px-4 py-4 sm:px-6 sm:py-5', className)} {...props} />
}

export function CardFooter({ className, ...props }) {
  return <div className={cn('border-t border-line', className)} {...props} />
}
