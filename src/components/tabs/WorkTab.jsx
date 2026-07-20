import { useNavigate } from 'react-router-dom'
import { ArrowRight, TrendingUp } from 'lucide-react'
import posthog from 'posthog-js'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card.jsx'
import Badge from '../ui/badge.jsx'
import { PROJECTS } from '../../data/content.js'

export default function WorkTab() {
  const navigate = useNavigate()
  return (
    <Card>
      <CardHeader>
        <CardTitle>Projects</CardTitle>
        <CardDescription>12+ shipped from zero to launch — here are the highlights.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-2">
        {PROJECTS.map((p) => (
          <article key={p.title} className="flex flex-col overflow-hidden rounded-lg border border-line">
            <img src={p.img} alt={p.title} loading="lazy" className="aspect-video w-full object-cover" />
            <div className="flex grow flex-col p-4">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-semibold">{p.title}</h3>
                <span className="text-sm text-muted-foreground">{p.year}</span>
              </div>
              <Badge variant="brand" className="mt-1.5 self-start">
                {p.tag}
              </Badge>
              <p className="mt-2 grow text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
              <p className="mt-3 flex items-start gap-1.5 text-sm font-semibold text-success">
                <TrendingUp className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                {p.result}
              </p>
              {p.caseStudy && (
                <button
                  onClick={() => { posthog.capture('project_clicked', { project: p.title, tag: p.tag }); navigate(`/work/${p.caseStudy}`) }}
                  className="mt-3 flex w-fit cursor-pointer items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                >
                  Read case study <ArrowRight className="size-4" aria-hidden="true" />
                </button>
              )}
            </div>
          </article>
        ))}
      </CardContent>
    </Card>
  )
}
