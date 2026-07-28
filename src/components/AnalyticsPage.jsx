import { useNavigate, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Clock3,
  Eye,
  Minus,
  MoveUpRight,
} from 'lucide-react'
import { Card, CardContent } from './ui/card.jsx'
import Button from './ui/button.jsx'
import Badge from './ui/badge.jsx'
import LogoTile from './LogoTile.jsx'
import { useMessaging } from './Messaging.jsx'
import { cn } from '../lib/utils.js'
import { ANALYTICS, CASE_STUDIES, SITE } from '../data/content.js'

const BASE = import.meta.env.BASE_URL

function MetricTile({ metric }) {
  const Trend = metric.trend === 'flat' ? Minus : MoveUpRight
  return (
    <div className="rounded-lg border border-line p-4">
      <p className="text-2xl font-bold tracking-tight sm:text-[28px]">{metric.value}</p>
      <p className="mt-1 text-sm font-medium">{metric.label}</p>
      <p className="mt-2 flex items-start gap-1 text-xs leading-snug text-muted-foreground">
        <Trend
          className={cn(
            'mt-0.5 size-3.5 shrink-0',
            metric.trend === 'flat' ? 'text-muted-foreground' : 'text-success',
          )}
          aria-hidden="true"
        />
        {metric.sub}
      </p>
    </div>
  )
}

export default function AnalyticsPage() {
  const navigate = useNavigate()
  const { openMessaging } = useMessaging()
  const [params, setParams] = useSearchParams()

  const requested = params.get('p')
  const active = ANALYTICS.find((a) => a.id === requested) ?? ANALYTICS[0]
  const study = CASE_STUDIES.find((c) => c.slug === active.id)

  // Switching views replaces the entry, so Back returns to the profile rather
  // than stepping through every project you looked at.
  const select = (id) => setParams(id === 'all' ? {} : { p: id }, { replace: true })

  return (
    <main className="mx-auto grid max-w-[1128px] grid-cols-1 items-start gap-4 px-2 pt-4 pb-24 sm:gap-6 sm:px-4 sm:pt-6 sm:pb-12 lg:grid-cols-[300px_minmax(0,1fr)]">
      {/* Left column — identity plus the project switcher */}
      <div className="flex flex-col gap-4">
        <Card>
          <CardContent className="py-4 sm:py-4">
            <button
              onClick={() => navigate('/', { replace: true })}
              className="mb-3 flex cursor-pointer items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="size-4" aria-hidden="true" /> Back to profile
            </button>
            <div className="flex items-center gap-3">
              <img
                src={`${BASE}dp.webp`}
                alt={SITE.name}
                className="size-14 rounded-full bg-brand object-cover"
              />
              <div className="min-w-0">
                <p className="truncate font-semibold">{SITE.name}</p>
                <p className="truncate text-xs text-muted-foreground">{SITE.role}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <nav aria-label="Analytics views" className="flex flex-col py-1">
            {ANALYTICS.map((a) => {
              const isActive = a.id === active.id
              return (
                <button
                  key={a.id}
                  onClick={() => select(a.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'flex cursor-pointer items-center gap-2.5 border-l-2 px-3 py-2.5 text-left transition-colors',
                    isActive
                      ? 'border-success bg-success/[0.06] text-success'
                      : 'border-transparent text-muted-foreground hover:bg-black/[0.04] hover:text-foreground',
                  )}
                >
                  {a.logo ? (
                    <LogoTile name={a.logo} className="size-7 shrink-0 text-[10px]" />
                  ) : (
                    <span className="flex size-7 shrink-0 items-center justify-center rounded bg-muted">
                      <BarChart3 className="size-4" aria-hidden="true" />
                    </span>
                  )}
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold">{a.label}</span>
                    <span className="block truncate text-xs opacity-70">{a.tag}</span>
                  </span>
                  {a.status === 'wip' && <Clock3 className="size-3.5 shrink-0" aria-hidden="true" />}
                </button>
              )
            })}
          </nav>
        </Card>
      </div>

      {/* Right column — the numbers for whichever view is selected */}
      <motion.div
        key={active.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="flex min-w-0 flex-col gap-4 sm:gap-6"
      >
        <Card>
          <CardContent>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-semibold">{active.headline}</h1>
              {active.status === 'wip' && <Badge variant="brand">Coming soon</Badge>}
            </div>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
              <Eye className="size-4" aria-hidden="true" />
              Visible to everyone
            </p>
            <p className="mt-3 text-sm leading-relaxed">{active.intro}</p>
          </CardContent>
        </Card>

        {active.metrics.length > 0 && (
          <Card>
            <CardContent>
              <h2 className="flex items-center gap-1.5 text-base font-semibold">
                Track performance
                <span className="rounded-full bg-muted px-1.5 text-[10px] font-bold text-muted-foreground">
                  i
                </span>
              </h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {active.metrics.map((m) => (
                  <MetricTile key={m.label} metric={m} />
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardContent>
            <h2 className="text-base font-semibold">
              {active.id === 'all' ? 'Project breakdown' : 'What the work involved'}
            </h2>
            <dl className="mt-3 flex flex-col">
              {active.highlights.map((h, i) => (
                <div
                  key={h.label}
                  className={cn(
                    'flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5 py-3',
                    i > 0 && 'border-t border-line',
                  )}
                >
                  <dt className="text-sm font-semibold">{h.label}</dt>
                  <dd className="text-sm text-muted-foreground">{h.value}</dd>
                </div>
              ))}
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-wrap items-center justify-between gap-3">
            {study && study.status !== 'wip' ? (
              <>
                <div>
                  <p className="font-semibold">Read the {active.label} case study</p>
                  <p className="text-sm text-muted-foreground">
                    The decisions behind these numbers.
                  </p>
                </div>
                <Button size="sm" onClick={() => navigate(`/work/${study.slug}`)}>
                  Read case study <ArrowRight className="size-4" aria-hidden="true" />
                </Button>
              </>
            ) : (
              <>
                <div>
                  <p className="font-semibold">Want numbers like these?</p>
                  <p className="text-sm text-muted-foreground">
                    Tell me what you're building — it lands straight in my inbox.
                  </p>
                </div>
                <Button size="sm" onClick={() => openMessaging()}>
                  Message Faisal
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </main>
  )
}
