import { TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card.jsx'
import Badge from '../ui/badge.jsx'
import { PROJECTS } from '../../data/content.js'

export default function WorkTab() {
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
            </div>
          </article>
        ))}
      </CardContent>
    </Card>
  )
}
