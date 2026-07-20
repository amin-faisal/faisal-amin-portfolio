import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowLeft, ChevronDown, Users, Building2, GraduationCap } from 'lucide-react'
import { Card, CardContent } from './ui/card.jsx'
import Button from './ui/button.jsx'
import LogoTile from './LogoTile.jsx'
import { CONNECTIONS, EDUCATION } from '../data/content.js'

const BASE = import.meta.env.BASE_URL

/**
 * Parses LinkedIn's exported Connections.csv (Settings → Data privacy →
 * "Get a copy of your data" → Connections). Drop the file in /public as
 * connections.csv and every real connection shows up here automatically.
 */
function parseConnectionsCsv(text) {
  const rows = []
  let field = ''
  let row = []
  let inQuotes = false
  for (let i = 0; i < text.length; i++) {
    const ch = text[i]
    if (inQuotes) {
      if (ch === '"' && text[i + 1] === '"') {
        field += '"'
        i++
      } else if (ch === '"') {
        inQuotes = false
      } else {
        field += ch
      }
    } else if (ch === '"') {
      inQuotes = true
    } else if (ch === ',') {
      row.push(field)
      field = ''
    } else if (ch === '\n' || ch === '\r') {
      if (field || row.length) {
        row.push(field)
        rows.push(row)
        row = []
        field = ''
      }
    } else {
      field += ch
    }
  }
  if (field || row.length) {
    row.push(field)
    rows.push(row)
  }

  const headerIdx = rows.findIndex((r) => r.includes('First Name') && r.includes('Connected On'))
  if (headerIdx === -1) return []
  const header = rows[headerIdx]
  const col = (name) => header.indexOf(name)

  return rows
    .slice(headerIdx + 1)
    .filter((r) => r[col('First Name')])
    .map((r) => {
      const name = `${r[col('First Name')]} ${r[col('Last Name')] ?? ''}`.trim()
      const company = r[col('Company')] ?? ''
      const position = r[col('Position')] ?? ''
      const connectedOn = r[col('Connected On')] ?? ''
      return {
        person: true,
        name,
        url: r[col('URL')] || null,
        desc: [position, company].filter(Boolean).join(' at '),
        connectedText: connectedOn ? `Connected on ${connectedOn}` : '',
        date: connectedOn ? new Date(connectedOn) : new Date(0),
      }
    })
}

const COMPANY_ROWS = CONNECTIONS.map((c) => ({
  ...c,
  person: false,
  desc: c.industry,
  connectedText: `Connected on ${new Date(c.connected).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })}`,
  date: new Date(c.connected),
}))

function MetaLine({ meta, metaIcon }) {
  if (!meta) return null
  return (
    <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
      {metaIcon === 'school' ? (
        <img src={`${BASE}NUST.webp`} alt="" className="size-4 rounded-[2px] object-contain" />
      ) : metaIcon ? (
        <span className="flex size-4 items-center justify-center rounded-full bg-brand text-[9px] font-bold text-ink">
          {metaIcon.charAt(0)}
        </span>
      ) : null}
      {meta}
    </p>
  )
}

const SORTS = ['Recently added', 'First name']

export default function NetworkPage() {
  const [people, setPeople] = useState([])
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState(SORTS[0])
  const [sortOpen, setSortOpen] = useState(false)
  const sortRef = useRef(null)

  useEffect(() => {
    fetch(`${BASE}connections.csv`)
      .then((res) => (res.ok ? res.text() : Promise.reject()))
      .then((text) => setPeople(parseConnectionsCsv(text)))
      .catch(() => {}) // no CSV uploaded yet — companies only
  }, [])

  useEffect(() => {
    const close = (e) => {
      if (sortRef.current && !sortRef.current.contains(e.target)) setSortOpen(false)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  const rows = useMemo(() => {
    let all = [...people, ...COMPANY_ROWS]
    const q = query.trim().toLowerCase()
    if (q) all = all.filter((r) => `${r.name} ${r.desc}`.toLowerCase().includes(q))
    if (sort === 'First name') {
      all.sort((a, b) => a.name.localeCompare(b.name))
    } else {
      all.sort((a, b) => b.date - a.date)
    }
    return all
  }, [people, query, sort])

  const total = people.length + COMPANY_ROWS.length

  const manage = [
    { icon: Users, label: 'Connections', count: total },
    { icon: Building2, label: 'Companies', count: COMPANY_ROWS.length },
    { icon: GraduationCap, label: 'Education', count: EDUCATION.length },
  ]

  return (
    <main className="mx-auto grid max-w-[1128px] grid-cols-1 items-start gap-4 px-2 pt-4 pb-24 sm:gap-6 sm:px-4 sm:pt-6 sm:pb-12 lg:grid-cols-[300px_minmax(0,1fr)]">
      <Card>
        <CardContent className="py-4 sm:py-4">
          <h2 className="text-base font-semibold">Manage my network</h2>
          <ul className="mt-3 flex flex-col">
            {manage.map(({ icon: Icon, label, count }) => (
              <li
                key={label}
                className="flex items-center gap-3 rounded px-2 py-2.5 text-muted-foreground"
              >
                <Icon className="size-5" aria-hidden="true" />
                <span className="text-sm font-semibold">{label}</span>
                <span className="ml-auto text-sm">{count}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="sm:py-5">
          <h1 className="text-xl font-semibold">{total} connections</h1>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <div ref={sortRef} className="relative text-sm">
              <span className="text-muted-foreground">Sort by: </span>
              <button
                onClick={() => setSortOpen((v) => !v)}
                className="cursor-pointer font-semibold hover:underline"
              >
                {sort} <ChevronDown className="inline size-4" aria-hidden="true" />
              </button>
              {sortOpen && (
                <div className="absolute top-full left-0 z-30 mt-1 w-44 overflow-hidden rounded-lg border border-line bg-card py-1 shadow-[0_4px_24px_rgba(0,0,0,0.15)]">
                  {SORTS.map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        setSort(s)
                        setSortOpen(false)
                      }}
                      className={`block w-full cursor-pointer px-3 py-2 text-left text-sm hover:bg-black/5 ${
                        s === sort ? 'font-semibold text-success' : ''
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-9 w-56 items-center gap-2 rounded border border-line px-3">
                <ArrowLeft className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by name"
                  aria-label="Search connections by name"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
              </div>
              <span className="text-sm font-semibold text-primary">Search with filters</span>
            </div>
          </div>

          <ul className="mt-4 flex flex-col">
            {rows.map((r) => (
              <li
                key={r.name + r.connectedText}
                className="flex items-center gap-4 border-t border-line py-4 first:border-t-0"
              >
                {r.person ? (
                  <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-brand text-xl font-bold text-ink sm:size-16">
                    {r.name.charAt(0)}
                  </span>
                ) : (
                  <LogoTile name={r.name} className="size-14 sm:size-16" />
                )}

                <div className="min-w-0 grow">
                  <a
                    href={r.url ?? undefined}
                    target="_blank"
                    rel="noreferrer"
                    className="text-base font-semibold hover:underline"
                  >
                    {r.name}
                  </a>
                  <p className="truncate text-sm text-foreground/80">
                    {r.desc}
                    {!r.person && r.location ? ` · ${r.location}` : ''}
                  </p>
                  <MetaLine meta={r.meta} metaIcon={r.metaIcon} />
                  <p className="mt-0.5 text-xs text-muted-foreground">{r.connectedText}</p>
                </div>

                {r.url && (
                  <Button
                    size="sm"
                    variant="outline"
                    href={r.url}
                    target="_blank"
                    rel="noreferrer"
                    className="shrink-0"
                  >
                    {r.person ? 'View profile' : 'Visit website'}
                  </Button>
                )}
              </li>
            ))}
            {rows.length === 0 && (
              <li className="py-6 text-sm text-muted-foreground">
                No connections match “{query}”.
              </li>
            )}
          </ul>
        </CardContent>
      </Card>
    </main>
  )
}
