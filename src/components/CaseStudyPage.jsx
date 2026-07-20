import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, CircleAlert, TrendingUp } from 'lucide-react'
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

  const otherProjects = PROJECTS.filter((p) => p.title !== cs.project).slice(0, 4)

  return (
    <main className="mx-auto grid max-w-[1128px] grid-cols-1 items-start gap-4 px-2 pt-4 pb-24 sm:gap-6 sm:px-4 sm:pt-6 sm:pb-12 lg:grid-cols-[minmax(0,1fr)_300px]">
      <div className="flex min-w-0 flex-col gap-4 sm:gap-6">
        <button
          onClick={() => navigate('/work')}
          className="flex w-fit cursor-pointer items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden="true" /> All projects
        </button>

        <Card className="overflow-hidden">
          <img src={cs.img} alt={cs.project} className="aspect-[2/1] w-full object-cover" />
          <CardContent>
            {/* Title block */}
            <div className="flex items-center gap-2">
              <Badge variant="brand">{cs.tag}</Badge>
              <span className="text-sm text-muted-foreground">{cs.project}</span>
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

            {/* The three pillars */}
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
                    <li key={point} className="flex items-start gap-2 text-[15px] leading-relaxed">
                      <Check className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
              )}
            </section>
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
              <Button size="sm" variant="outline" onClick={() => navigate('/work')}>
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
            <p className="text-sm text-muted-foreground">
              {SITE.role} for your next big idea
            </p>
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
