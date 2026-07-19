import { cn } from '../../lib/utils.js'

const VARIANTS = {
  default: 'bg-primary text-white',
  secondary: 'bg-black/5 text-foreground',
  outline: 'border border-line text-muted-foreground',
  success: 'bg-success/10 text-success',
  brand: 'bg-brand/30 text-ink',
}

export default function Badge({ variant = 'secondary', className, ...props }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium whitespace-nowrap',
        VARIANTS[variant],
        className,
      )}
      {...props}
    />
  )
}
