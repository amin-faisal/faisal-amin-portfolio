import { cn } from '../../lib/utils.js'

// shadcn-style button, tuned to LinkedIn's pill buttons.
const VARIANTS = {
  default: 'bg-primary text-white hover:bg-primary-strong',
  outline:
    'border border-primary text-primary hover:bg-primary/10 hover:shadow-[inset_0_0_0_1px_var(--color-primary)]',
  ghost:
    'border border-muted-foreground/70 text-muted-foreground hover:bg-black/5 hover:shadow-[inset_0_0_0_1px_var(--color-muted-foreground)]',
  link: 'text-primary hover:underline px-0',
}

const SIZES = {
  default: 'h-9 px-4 text-base',
  sm: 'h-8 px-3.5 text-sm',
  icon: 'size-9 px-0',
}

export default function Button({
  variant = 'default',
  size = 'default',
  className,
  href,
  ...props
}) {
  const Comp = href ? 'a' : 'button'
  return (
    <Comp
      href={href}
      className={cn(
        'inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-full font-semibold transition-[color,background-color,box-shadow] duration-150 whitespace-nowrap select-none',
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
      {...props}
    />
  )
}
