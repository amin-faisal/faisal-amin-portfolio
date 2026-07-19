import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  Home,
  Users,
  BriefcaseBusiness,
  MessagesSquare,
  Search,
  ChevronDown,
  FileText,
  Wrench,
  Building2,
  GraduationCap,
  Sparkles,
  Download,
  Mail,
} from 'lucide-react'
import { useMessaging } from './Messaging.jsx'
import { cn } from '../lib/utils.js'
import {
  PROJECTS,
  SERVICES,
  EXPERIENCE,
  EDUCATION,
  SKILLS,
  TOOLS,
  CONNECTIONS,
  RESUME,
} from '../data/content.js'

const BASE = import.meta.env.BASE_URL

const SEARCH_INDEX = [
  ...PROJECTS.map((p) => ({ label: p.title, sub: `Project · ${p.tag}`, path: '/work', icon: FileText })),
  ...SERVICES.map((s) => ({ label: s.title, sub: 'Service', path: '/services', icon: Wrench })),
  ...EXPERIENCE.map((e) => ({ label: e.company, sub: e.role, path: '/', icon: Building2 })),
  ...EDUCATION.map((e) => ({ label: e.title, sub: `Education · ${e.place}`, path: '/', icon: GraduationCap })),
  ...SKILLS.map((s) => ({ label: s, sub: 'Skill', path: '/', icon: Sparkles })),
  ...TOOLS.map((t) => ({ label: t, sub: 'Tool', path: '/', icon: Sparkles })),
  ...CONNECTIONS.map((c) => ({ label: c.name, sub: 'Connection', path: '/network', icon: Users })),
  { label: 'Resume', sub: 'Download PDF', href: `${BASE}${RESUME}`, icon: Download },
  { label: 'Contact info', sub: 'Email · LinkedIn · location', path: '/contact', icon: Mail },
]

function SearchBox() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)

  const q = query.trim().toLowerCase()
  const results = q
    ? SEARCH_INDEX.filter((i) => `${i.label} ${i.sub}`.toLowerCase().includes(q)).slice(0, 8)
    : []

  return (
    <div className="relative hidden md:block">
      <div className="flex h-[34px] w-[260px] items-center gap-2 rounded bg-muted px-3">
        <Search className="size-4 text-muted-foreground" aria-hidden="true" />
        <input
          type="text"
          placeholder="Search"
          aria-label="Search this site"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>

      {focused && q && (
        <div className="absolute top-[42px] left-0 w-[320px] overflow-hidden rounded-lg border border-line bg-card py-1 shadow-[0_4px_24px_rgba(0,0,0,0.15)]">
          {results.length === 0 && (
            <p className="px-3 py-2.5 text-sm text-muted-foreground">No results for “{query}”</p>
          )}
          {results.map(({ label, sub, path, href, icon: Icon }) => {
            const inner = (
              <>
                <Icon className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                <span className="truncate text-sm font-semibold">{label}</span>
                <span className="truncate text-xs text-muted-foreground">· {sub}</span>
              </>
            )
            const cls =
              'flex w-full cursor-pointer items-center gap-2 px-3 py-2 text-left hover:bg-black/5'
            return href ? (
              <a key={label + sub} href={href} download className={cls} onMouseDown={(e) => e.stopPropagation()}>
                {inner}
              </a>
            ) : (
              <button
                key={label + sub}
                className={cls}
                onMouseDown={(e) => {
                  e.preventDefault()
                  setQuery('')
                  navigate(path)
                }}
              >
                {inner}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default function TopNav() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { openMessaging } = useMessaging()

  const items = [
    { label: 'Home', icon: Home, path: '/' },
    { label: 'My Network', icon: Users, path: '/network' },
    { label: 'Jobs', icon: BriefcaseBusiness, path: '/work' },
    { label: 'Messaging', icon: MessagesSquare, action: () => openMessaging() },
  ]

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-card">
      <div className="mx-auto flex h-[52px] max-w-[1128px] items-center gap-2 px-4">
        <button
          onClick={() => navigate('/')}
          aria-label="Home"
          className="flex size-[34px] shrink-0 cursor-pointer items-center justify-center rounded bg-primary text-lg font-bold text-white"
        >
          fa
        </button>

        <SearchBox />

        <nav className="ml-auto flex items-center">
          {items.map(({ label, icon: Icon, path, action }) => {
            const active = path && pathname === path
            return (
              <button
                key={label}
                onClick={() => (action ? action() : navigate(path))}
                className={cn(
                  'relative flex h-[52px] w-[64px] cursor-pointer flex-col items-center justify-center gap-0.5 sm:w-[80px]',
                  active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                <Icon className="size-5" aria-hidden="true" />
                <span className="hidden text-[12px] leading-none sm:block">{label}</span>
                {active && <span className="absolute inset-x-2 bottom-0 h-0.5 bg-foreground" />}
              </button>
            )
          })}

          <button
            onClick={() => navigate('/')}
            className="flex h-[52px] w-[64px] cursor-pointer flex-col items-center justify-center gap-0.5 text-muted-foreground hover:text-foreground sm:w-[72px]"
          >
            <img src={`${BASE}dp.png`} alt="Faisal Amin" className="size-6 rounded-full bg-brand object-cover" />
            <span className="hidden items-center text-[12px] leading-none sm:flex">
              Me <ChevronDown className="size-3" aria-hidden="true" />
            </span>
          </button>
        </nav>
      </div>
    </header>
  )
}
