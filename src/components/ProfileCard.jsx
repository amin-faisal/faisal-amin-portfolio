import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import {
  BadgeCheck,
  CalendarClock,
  Download,
  Globe,
  Mail,
  MapPin,
  SquareArrowOutUpRight,
} from 'lucide-react'
import { Card } from './ui/card.jsx'
import Button from './ui/button.jsx'
import LogoTile from './LogoTile.jsx'
import ModalShell from './ModalShell.jsx'
import { LinkedinIcon } from './icons.jsx'
import { useMessaging } from './Messaging.jsx'
import { cn } from '../lib/utils.js'
import {
  SITE,
  STATS,
  CLIENTS,
  TABS,
  CURRENT_COMPANY,
  EDUCATION_SHORT,
  OPEN_TO,
  OPEN_TO_DETAILS,
  OPEN_TO_START,
  RESUME,
  PUBLIC_URL,
} from '../data/content.js'

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
    <ModalShell
      title="Open to work"
      subtitle={`${SITE.name} · ${SITE.location}`}
      lead={
        <img
          src={`${BASE}dp.png`}
          alt=""
          className="size-10 shrink-0 rounded-full bg-brand object-cover ring-2 ring-success/60"
        />
      }
      onClose={onClose}
      footer={
        <>
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
        </>
      }
    >
      {/* Availability banner */}
      <div className="flex items-start gap-3 rounded-lg border border-success/25 bg-success/[0.07] p-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-success/15 text-success">
          <CalendarClock className="size-[18px]" aria-hidden="true" />
        </span>
        <div>
          <p className="text-sm font-semibold text-success">Available now</p>
          <p className="text-sm leading-snug text-foreground/80">{OPEN_TO_START}</p>
        </div>
      </div>

      {/* What I'm open to */}
      <dl className="mt-4 flex flex-col gap-4">
        {OPEN_TO_DETAILS.map(({ label, values }) => (
          <div key={label}>
            <dt className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
              {label}
            </dt>
            <dd className="mt-1.5 flex flex-wrap gap-1.5">
              {values.map((v) => (
                <span
                  key={v}
                  className="rounded-full border border-line bg-muted px-2.5 py-1 text-xs font-medium text-foreground/85"
                >
                  {v}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>

      <p className="mt-4 border-t border-line pt-3 text-sm text-muted-foreground">
        The fastest way in is a message — it lands straight in my inbox.
      </p>
    </ModalShell>
  )
}

const CONTACT_ROWS = [
  { icon: LinkedinIcon, label: "Faisal's profile", value: 'in/faisal-amin-83a15320b', href: SITE.linkedin },
  { icon: Mail, label: 'Email', value: SITE.email, href: `mailto:${SITE.email}` },
  { icon: Globe, label: 'Portfolio', value: PUBLIC_URL, href: `https://${PUBLIC_URL}` },
  { icon: MapPin, label: 'Location', value: SITE.location },
]

function ContactInfoModal({ onClose }) {
  return (
    <ModalShell title="Contact info" subtitle={SITE.name} onClose={onClose}>
      <div className="flex flex-col gap-4">
        {CONTACT_ROWS.map(({ icon: Icon, label, value, href }) => (
          <div key={label} className="flex items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded bg-muted text-primary">
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold">{label}</p>
              {href ? (
                <a
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noreferrer"
                  className="block truncate text-sm text-primary hover:underline"
                >
                  {value}
                </a>
              ) : (
                <p className="text-sm text-muted-foreground">{value}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </ModalShell>
  )
}

export default function ProfileCard() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { openMessaging } = useMessaging()
  const [moreOpen, setMoreOpen] = useState(false)
  const [openToOpen, setOpenToOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)
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
          <div className="relative z-10 -mt-[62px] shrink-0 rounded-full bg-card p-1.5 sm:-mt-[76px]">
            <img
              src={`${BASE}dp.png`}
              alt="Faisal Amin"
              className="size-[116px] rounded-full bg-brand object-cover sm:size-[144px]"
            />
          </div>

          {/* Right column — company, school and the numbers, so the desktop
              profile doesn't trail off into empty space. */}
          <div className="hidden w-[260px] shrink-0 flex-col gap-3 pt-3 md:flex">
            <a
              href={CURRENT_COMPANY.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2.5 rounded-lg p-1.5 text-left hover:bg-black/[0.04]"
            >
              <LogoTile name={CURRENT_COMPANY.name} className="size-9 shrink-0" />
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold">{CURRENT_COMPANY.name}</span>
                <span className="block truncate text-xs text-muted-foreground">
                  Senior Product Designer
                </span>
              </span>
            </a>
            <a
              href={EDUCATION_SHORT.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2.5 rounded-lg p-1.5 text-left hover:bg-black/[0.04]"
            >
              <LogoTile name={EDUCATION_SHORT.name} className="size-9 shrink-0" />
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold">{EDUCATION_SHORT.name}</span>
                <span className="block truncate text-xs text-muted-foreground">
                  {EDUCATION_SHORT.sub}
                </span>
              </span>
            </a>

            <dl className="mt-1 grid grid-cols-3 divide-x divide-line rounded-lg border border-line bg-muted/60 py-2.5 text-center">
              {STATS.map((s) => (
                <div key={s.label} className="px-1">
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <span className="block text-base font-bold tracking-tight">
                      {s.prefix}
                      {s.value}
                      {s.suffix}
                    </span>
                    <span className="mt-0.5 block text-[10px] leading-tight text-muted-foreground">
                      {s.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
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
              onClick={() => setContactOpen(true)}
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
              // Right-aligned on mobile so the menu can't run off-screen; LinkedIn's
              // left-aligned drop is restored once there's room for it.
              <div className="absolute top-full right-0 z-40 mt-1 w-60 overflow-hidden rounded-lg border border-line bg-card py-1 shadow-[0_4px_24px_rgba(0,0,0,0.15)] sm:right-auto sm:left-0">
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
        {contactOpen && <ContactInfoModal onClose={() => setContactOpen(false)} />}
      </AnimatePresence>
    </Card>
  )
}
