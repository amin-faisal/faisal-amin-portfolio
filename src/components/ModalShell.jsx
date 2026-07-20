import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '../lib/utils.js'

// Shared modal chrome. On mobile it's a bottom sheet that eases up from the
// bottom edge; on desktop it's a centred dialog that still rises into place.
export default function ModalShell({ title, subtitle, lead, onClose, children, footer, className }) {
  // Desktop rises a short distance, mobile slides the full sheet height.
  const desktop =
    typeof window !== 'undefined' && window.matchMedia('(min-width: 640px)').matches
  const from = desktop ? 24 : '100%'

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflow
    }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 sm:items-center sm:p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: from }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: from }}
        transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={typeof title === 'string' ? title : 'Dialog'}
        className={cn(
          'flex max-h-[90vh] w-full max-w-md flex-col overflow-hidden rounded-t-2xl bg-card shadow-[0_-8px_40px_rgba(0,0,0,0.25)] sm:max-h-[85vh] sm:rounded-lg sm:shadow-xl',
          className,
        )}
      >
        {/* Drag affordance — mobile sheets only */}
        <div className="flex justify-center pt-2 pb-1 sm:hidden">
          <span className="h-1 w-10 rounded-full bg-foreground/15" />
        </div>

        <header className="flex items-center gap-3 border-b border-line px-5 py-3 sm:py-4">
          {lead}
          <div className="min-w-0">
            <h2 className="truncate text-lg font-semibold">{title}</h2>
            {subtitle && <p className="truncate text-xs text-muted-foreground">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="ml-auto shrink-0 cursor-pointer rounded-full p-1.5 text-muted-foreground hover:bg-black/5"
          >
            <X className="size-5" />
          </button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-4">{children}</div>

        {footer && (
          <footer className="flex justify-end gap-2 border-t border-line px-5 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
            {footer}
          </footer>
        )}
      </motion.div>
    </motion.div>
  )
}
