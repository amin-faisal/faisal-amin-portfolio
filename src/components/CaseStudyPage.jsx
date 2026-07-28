import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Check,
  CircleAlert,
  Clock3,
  Layers,
  Lock,
  SquareArrowOutUpRight,
  TrendingUp,
} from 'lucide-react'
import { Card, CardContent } from './ui/card.jsx'
import Button from './ui/button.jsx'
import Badge from './ui/badge.jsx'
import { useMessaging } from './Messaging.jsx'
import { CASE_STUDIES, PROJECTS, SITE } from '../data/content.js'

const BASE = import.meta.env.BASE_URL

function Section({ title, icon: Icon, intro, points, iconClass }) {
  return (
    <section className="mt-8">
      <h2 className="flex items-center gap-2 text-xl font-semibold">
        <Icon className={`size-5 ${iconClass}`} aria-hidden="true" />
        {title}
      </h2>
      <p className="mt-3 text-[15px] leading-relaxed">{intro}</p>
      {points && (
        <ul className="mt-3 flex flex-col gap-2">
          {points.map((point) => (
            <li key={point} className="flex items-start gap-2 text-[15px] leading-relaxed">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-muted-foreground/60" />
              {point}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default function CaseStudyPage({ slug }) {
  const navigate = useNavigate()
  const { openMessaging } = useMessaging()
  const cs = CASE_STUDIES.find((c) => c.slug === slug)

  useEffect(() => {
    if (!cs) navigate('/work', { replace: true })
  }, [cs, navigate])

  if (!cs) return null

  const wip = cs.status === 'wip'
  const otherProjects = PROJECTS.filter((p) => p.title !== cs.project).slice(0, 4)

  return (
    <main className="mx-auto grid max-w-[1128px] grid-cols-1 items-start gap-4 px-2 pt-4 pb-24 sm:gap-6 sm:px-4 sm:pt-6 sm:pb-12 lg:grid-cols-[minmax(0,1fr)_300px]">
      <div className="flex min-w-0 flex-col gap-4 sm:gap-6">
        <button
          onClick={() => navigate('/work', { replace: true })}
          className="flex w-fit cursor-pointer items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden="true" /> All projects
        </button>

        <Card className="overflow-hidden">
          <img
            src={cs.img}
            alt={cs.project}
            className={`aspect-[2/1] w-full object-cover ${wip ? 'opacity-75 grayscale' : ''}`}
          />
          <CardContent>
            {/* Title block */}
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="brand">{cs.tag}</Badge>
              <span className="text-sm text-muted-foreground">{cs.project}</span>
              {wip && (
                <span className="flex items-center gap-1 rounded bg-muted px-2 py-0.5 text-xs font-semibold text-muted-foreground">
                  <Clock3 className="size-3.5" aria-hidden="true" /> Coming soon
                </span>
              )}
            </div>
            <h1 className="mt-2 text-2xl leading-tight font-semibold sm:text-3xl">{cs.title}</h1>
            <p className="mt-2 text-base text-muted-foreground">{cs.subtitle}</p>

            {/* Author row — LinkedIn article style */}
            <div className="mt-4 flex items-center gap-3 border-y border-line py-3">
              <img
                src={`${BASE}dp.webp`}
                alt={SITE.name}
                className="size-12 rounded-full bg-brand object-cover"
              />
              <div className="min-w-0">
                <p className="text-sm font-semibold">{SITE.name}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {SITE.role} · founding designer that talks shipping
                </p>
                <p className="text-xs text-muted-foreground">
                  {cs.published} · {cs.readTime}
                </p>
              </div>
              {cs.link && (
                <a
                  href={cs.link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="ml-auto hidden shrink-0 items-center gap-1 text-sm font-semibold text-primary hover:underline sm:flex"
                >
                  {cs.link.label}
                  <SquareArrowOutUpRight className="size-3.5" aria-hidden="true" />
                </a>
              )}
            </div>

            {/* Meta */}
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase">Role</p>
                <p className="mt-1 text-sm font-semibold">{cs.role}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase">Timeline</p>
                <p className="mt-1 text-sm font-semibold">{cs.timeline}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase">Scope</p>
                <div className="mt-1 flex flex-wrap gap-1">
                  {cs.scope.map((s) => (
                    <Badge key={s}>{s}</Badge>
                  ))}
                </div>
              </div>
            </div>

            {cs.note && (
              <p className="mt-4 flex items-start gap-2 rounded-lg bg-muted p-3 text-sm text-muted-foreground">
                <Lock className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                {cs.note}
              </p>
            )}

            {wip ? (
              <section className="mt-8">
                <h2 className="flex items-center gap-2 text-xl font-semibold">
                  <Clock3 className="size-5 text-muted-foreground" aria-hidden="true" />
                  What I'm designing
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed">{cs.comingSoon.intro}</p>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {cs.comingSoon.focus.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 rounded-lg border border-line p-3 text-sm leading-relaxed"
                    >
                      <ArrowRight
                        className="mt-0.5 size-4 shrink-0 text-muted-foreground"
                        aria-hidden="true"
                      />
                      {f}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-muted-foreground">{cs.comingSoon.note}</p>
              </section>
            ) : (
              <>
                {cs.context && (
                  <section className="mt-8">
                    <h2 className="flex items-center gap-2 text-xl font-semibold">
                      <Layers className="size-5 text-muted-foreground" aria-hidden="true" />
                      The product
                    </h2>
                    <p className="mt-3 text-[15px] leading-relaxed">{cs.context.intro}</p>
                    <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                      {cs.context.modules.map((m) => (
                        <li key={m.name} className="rounded-lg border border-line p-3">
                          <p className="text-sm font-semibold">{m.name}</p>
                          <p className="mt-0.5 text-sm leading-snug text-muted-foreground">
                            {m.desc}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                <Section
                  title="The challenge"
                  icon={CircleAlert}
                  iconClass="text-[#b24020]"
                  intro={cs.challenge.intro}
                  points={cs.challenge.points}
                />
                <Section
                  title="The solution"
                  icon={Check}
                  iconClass="text-primary"
                  intro={cs.solution.intro}
                  points={cs.solution.points}
                />

                <section className="mt-8">
                  <h2 className="flex items-center gap-2 text-xl font-semibold">
                    <TrendingUp className="size-5 text-success" aria-hidden="true" />
                    The outcome
                  </h2>
                  <p className="mt-3 text-[15px] leading-relaxed">{cs.outcome.intro}</p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    {cs.outcome.metrics.map((m) => (
                      <div key={m.label} className="rounded-lg border border-line bg-muted/50 p-4">
                        <p className="text-2xl font-bold text-success">{m.value}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{m.label}</p>
                      </div>
                    ))}
                  </div>
                  {cs.outcome.points && (
                    <ul className="mt-4 flex flex-col gap-2">
                      {cs.outcome.points.map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-2 text-[15px] leading-relaxed"
                        >
                          <Check className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  )}
                  <button
                    onClick={() => navigate(`/analytics?p=${cs.slug}`)}
                    className="mt-4 flex cursor-pointer items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                  >
                    <BarChart3 className="size-4" aria-hidden="true" />
                    See {cs.project} in analytics
                  </button>
                </section>
              </>
            )}
          </CardContent>
        </Card>

        {/* CTA */}
        <Card>
          <CardContent className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-semibold">Working on something similar?</p>
              <p className="text-sm text-muted-foreground">
                Let's talk shipping — it lands straight in my inbox.
              </p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={() => openMessaging()}>
                Message Faisal
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => navigate('/work', { replace: true })}
              >
                More projects
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right rail */}
      <aside className="flex flex-col gap-4">
        <Card>
          <CardContent className="py-4 text-center sm:py-4">
            <img
              src={`${BASE}dp.webp`}
              alt={SITE.name}
              className="mx-auto size-16 rounded-full bg-brand object-cover"
            />
            <p className="mt-2 font-semibold">{SITE.name}</p>
            <p className="text-sm text-muted-foreground">{SITE.role} for your next big idea</p>
            <Button size="sm" className="mt-3" onClick={() => openMessaging()}>
              Message
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="py-4 sm:py-4">
            <h2 className="text-base font-semibold">More projects</h2>
            <ul className="mt-3 flex flex-col gap-3">
              {otherProjects.map((p) => (
                <li key={p.title}>
                  <button
                    onClick={() => navigate(p.caseStudy ? `/work/${p.caseStudy}` : '/work')}
                    className="group flex w-full cursor-pointer items-center gap-3 text-left"
                  >
                    <img
                      src={p.img}
                      alt=""
                      loading="lazy"
                      className="size-12 shrink-0 rounded-[4px] object-cover"
                    />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold group-hover:underline">
                        {p.title}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">{p.tag}</p>
                    </div>
                    <ArrowRight
                      className="ml-auto size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </aside>
    </main>
  )
}
