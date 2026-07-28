import { useNavigate } from 'react-router-dom'
import { ArrowRight, Clock3, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card.jsx'
import Badge from '../ui/badge.jsx'
import { PROJECTS } from '../../data/content.js'

export default function WorkTab() {
  const navigate = useNavigate()
  return (
    <Card>
      <CardHeader>
        <CardTitle>Projects</CardTitle>
        <CardDescription>
          The four I'd want to be judged on — healthcare, identity, e-commerce, and one still on the
          desk.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-2">
        {PROJECTS.map((p) => {
          const wip = p.status === 'wip'
          return (
            <article
              key={p.title}
              className="flex flex-col overflow-hidden rounded-lg border border-line"
            >
              <div className="relative">
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  className={`aspect-video w-full object-cover ${wip ? 'opacity-70 grayscale' : ''}`}
                />
                {wip && (
                  <span className="absolute top-2 right-2 flex items-center gap-1 rounded bg-card/95 px-2 py-1 text-xs font-semibold text-muted-foreground">
                    <Clock3 className="size-3.5" aria-hidden="true" /> In design
                  </span>
                )}
              </div>
              <div className="flex grow flex-col p-4">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-semibold">{p.title}</h3>
                  <span className="text-sm text-muted-foreground">{p.year}</span>
                </div>
                <Badge variant="brand" className="mt-1.5 self-start">
                  {p.tag}
                </Badge>
                <p className="mt-2 grow text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                <p
                  className={`mt-3 flex items-start gap-1.5 text-sm font-semibold ${
                    wip ? 'text-muted-foreground' : 'text-success'
                  }`}
                >
                  {wip ? (
                    <Clock3 className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                  ) : (
                    <TrendingUp className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                  )}
                  {p.result}
                </p>
                {p.caseStudy && (
                  <button
                    onClick={() => navigate(`/work/${p.caseStudy}`)}
                    className="mt-3 flex w-fit cursor-pointer items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                  >
                    {wip ? 'See what it involves' : 'Read case study'}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </button>
                )}
              </div>
            </article>
          )
        })}
      </CardContent>
    </Card>
  )
}
