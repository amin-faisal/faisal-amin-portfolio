import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { BadgeCheck, BriefcaseBusiness, Download, SquareArrowOutUpRight, X } from 'lucide-react'
import { Card } from './ui/card.jsx'
import Button from './ui/button.jsx'
import LogoTile from './LogoTile.jsx'
import { useMessaging } from './Messaging.jsx'
import { cn } from '../lib/utils.js'
import { SITE, STATS, CLIENTS, TABS, CURRENT_COMPANY, EDUCATION_SHORT, OPEN_TO, RESUME } from '../data/content.js'

const BASE = import.meta.env.BASE_URL

// CSS recreation of the purple banner — shown while public/banner.png loads (or if it's missing).
function BannerFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-between gap-6 bg-brand px-[5%]">
      <div className="hidden gap-8 sm:flex">
        {STATS.map((s) => (
          <div key={s.label}>
            <p className="text-2xl font-bold tracking-tight text-ink lg:text-3xl">
              {s.prefix}
              {s.value}
              {s.suffix}
            </p>
            <p className="text-xs text-ink/70 lg:text-sm">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="min-w-0 text-left sm:text-right">
        <p className="text-xl font-bold leading-tight tracking-tight text-ink lg:text-3xl">
          Senior Product Designer
        </p>
        <p className="text-lg font-medium leading-tight text-ink/60 lg:text-2xl">
          for your next big idea.
        </p>
        <p className="mt-1 hidden text-xs text-ink/70 md:block lg:text-sm">
          I function as a <span className="underline">founding designer</span> that talks shipping.
        </p>
        <p className="mt-2 hidden truncate text-[10px] font-semibold tracking-widest text-ink/50 uppercase md:block">
          {CLIENTS.slice(0, 6).join(' · ')}
        </p>
      </div>
    </div>
  )
}

function OpenToModal({ onClose }) {
  const { openMessaging } = useMessaging()
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Open to work details"
        className="w-full max-w-md rounded-lg bg-card shadow-xl"
      >
        <header className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="text-lg font-semibold">Open to work</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="cursor-pointer rounded-full p-1.5 text-muted-foreground hover:bg-black/5"
          >
            <X className="size-5" />
          </button>
        </header>
        <div className="flex flex-col gap-4 px-5 py-4">
          {OPEN_TO.map((role) => (
            <div key={role.title} className="flex items-center gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded bg-muted text-primary">
                <BriefcaseBusiness className="size-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold">{role.title}</p>
                <p className="text-sm text-muted-foreground">{role.type}</p>
              </div>
            </div>
          ))}
          <p className="text-sm text-muted-foreground">
            The fastest way in is a message — it lands straight in my inbox.
          </p>
        </div>
        <footer className="flex justify-end gap-2 border-t border-line px-5 py-3">
          <Button size="sm" variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button
            size="sm"
            onClick={() => {
              onClose()
              openMessaging()
            }}
          >
            Message Faisal
          </Button>
        </footer>
      </motion.div>
    </div>
  )
}

export default function ProfileCard() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { openMessaging } = useMessaging()
  const [moreOpen, setMoreOpen] = useState(false)
  const [openToOpen, setOpenToOpen] = useState(false)
  const moreRef = useRef(null)

  useEffect(() => {
    const close = (e) => {
      if (moreRef.current && !moreRef.current.contains(e.target)) setMoreOpen(false)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  return (
    <Card className="overflow-hidden">
      {/* Banner */}
      <div className="relative aspect-[1584/396] w-full overflow-hidden">
        <BannerFallback />
        <img
          src={`${BASE}banner.png`}
          alt=""
          className="absolute inset-0 size-full object-cover"
          onError={(e) => (e.currentTarget.style.display = 'none')}
        />
      </div>

      <div className="px-4 pb-4 sm:px-6">
        {/* Avatar + company/education column */}
        <div className="flex items-start justify-between">
          <div className="-mt-[62px] shrink-0 rounded-full bg-card p-1 sm:-mt-[104px]">
            <img
              src={`${BASE}dp.png`}
              alt="Faisal Amin"
              className="size-[116px] rounded-full bg-brand object-cover sm:size-[144px]"
            />
          </div>

          <div className="hidden flex-col gap-3 pt-3 lg:flex">
            <button
              onClick={() => navigate('/')}
              className="flex cursor-pointer items-center gap-2 text-left text-sm font-semibold hover:underline"
            >
              <LogoTile name={CURRENT_COMPANY.name} className="size-8 rounded-sm" />
              {CURRENT_COMPANY.name}
            </button>
            <button
              onClick={() => navigate('/')}
              className="flex cursor-pointer items-center gap-2 text-left text-sm font-semibold hover:underline"
            >
              <LogoTile name={EDUCATION_SHORT.name} className="size-8 rounded-sm" />
              {EDUCATION_SHORT.name}
            </button>
          </div>
        </div>

        {/* Identity */}
        <div className="mt-3">
          <h1 className="flex items-center gap-1.5 text-2xl font-semibold">
            {SITE.name}
            <BadgeCheck className="size-5 text-[#38434f]" aria-label="Verified" />
          </h1>
          <p className="mt-0.5 text-base leading-snug">
            Senior Product Designer for your next big idea — I function as a founding designer that
            talks shipping.
          </p>
          <p className="mt-1.5 text-sm text-muted-foreground">
            {SITE.location} ·{' '}
            <button
              onClick={() => navigate('/contact')}
              className="cursor-pointer font-semibold text-primary hover:underline"
            >
              Contact info
            </button>
          </p>
          <button
            onClick={() => navigate('/network')}
            className="mt-1 cursor-pointer text-sm font-semibold text-primary hover:underline"
          >
            500+ connections
          </button>
        </div>

        {/* Actions */}
        <div className="mt-4 flex flex-wrap gap-2">
          <Button size="sm" onClick={() => setOpenToOpen(true)}>
            Open to
          </Button>
          <Button size="sm" variant="outline" onClick={() => openMessaging()}>
            Message
          </Button>
          <div ref={moreRef} className="relative">
            <Button size="sm" variant="ghost" onClick={() => setMoreOpen((v) => !v)}>
              More
            </Button>
            {moreOpen && (
              <div className="absolute top-full left-0 z-40 mt-1 w-60 overflow-hidden rounded-lg border border-line bg-card py-1 shadow-[0_4px_24px_rgba(0,0,0,0.15)]">
                <a
                  href={`${BASE}${RESUME}`}
                  download
                  onClick={() => setMoreOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2.5 text-sm font-semibold hover:bg-black/5"
                >
                  <Download className="size-4 text-muted-foreground" aria-hidden="true" />
                  Download resume
                </a>
                <a
                  href={SITE.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMoreOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2.5 text-sm font-semibold hover:bg-black/5"
                >
                  <SquareArrowOutUpRight className="size-4 text-muted-foreground" aria-hidden="true" />
                  View LinkedIn profile
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Open-to-work box */}
        <div className="mt-4 rounded-lg bg-muted p-3">
          <p className="text-sm font-semibold">Open to work</p>
          <p className="text-sm text-foreground/80">
            {OPEN_TO.map((r) => r.title).join(' · ')}
          </p>
          <button
            onClick={() => setOpenToOpen(true)}
            className="cursor-pointer text-sm font-semibold text-primary hover:underline"
          >
            See details
          </button>
        </div>
      </div>

      {/* Profile tabs — the site's entire navigation */}
      <nav
        aria-label="Profile sections"
        className="flex overflow-x-auto border-t border-line px-2 sm:px-4"
      >
        {TABS.map((tab) => {
          const active = pathname === tab.path || (tab.path === '/' && pathname === '/about')
          return (
            <button
              key={tab.id}
              onClick={() => navigate(tab.path)}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'relative cursor-pointer px-4 py-3 text-sm font-semibold whitespace-nowrap transition-colors',
                active ? 'text-success' : 'text-muted-foreground hover:bg-black/5 hover:text-foreground',
              )}
            >
              {tab.label}
              {active && <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-t bg-success" />}
            </button>
          )
        })}
      </nav>

      <AnimatePresence>
        {openToOpen && <OpenToModal onClose={() => setOpenToOpen(false)} />}
      </AnimatePresence>
    </Card>
  )
}
