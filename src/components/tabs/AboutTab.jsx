import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card.jsx'
import Badge from '../ui/badge.jsx'
import LogoTile from '../LogoTile.jsx'
import { ABOUT, PROJECTS, EXPERIENCE, EDUCATION, SKILLS, TOOLS } from '../../data/content.js'

function ShowAll({ label, path }) {
  const navigate = useNavigate()
  return (
    <button
      onClick={() => navigate(path)}
      className="flex w-full cursor-pointer items-center justify-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-muted-foreground transition-colors hover:bg-black/5 hover:text-foreground"
    >
      {label} <ArrowRight className="size-4" aria-hidden="true" />
    </button>
  )
}

export default function AboutTab() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>About</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {ABOUT.map((para) => (
            <p key={para.slice(0, 24)} className="text-sm leading-relaxed">
              {para}
            </p>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Featured</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          {PROJECTS.slice(0, 2).map((p) => (
            <article key={p.title} className="overflow-hidden rounded-lg border border-line">
              <img src={p.img} alt={p.title} loading="lazy" className="h-40 w-full object-cover" />
              <div className="p-4">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-semibold">{p.title}</h3>
                  <Badge variant="brand">{p.tag}</Badge>
                </div>
                <p className="mt-1.5 text-sm text-muted-foreground">{p.desc}</p>
                <p className="mt-2 text-sm font-semibold text-success">{p.result}</p>
              </div>
            </article>
          ))}
        </CardContent>
        <CardFooter>
          <ShowAll label={`Show all ${PROJECTS.length} projects`} path="/work" />
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Experience</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col">
          {EXPERIENCE.map((job, i) => (
            <article
              key={job.company + job.period}
              className={i === 0 ? 'flex gap-3' : 'mt-5 flex gap-3 border-t border-line pt-5'}
            >
              <LogoTile name={job.company} />
              <div>
                <h3 className="font-semibold">{job.role}</h3>
                <p className="text-sm">{job.company}</p>
                <p className="text-sm text-muted-foreground">{job.period}</p>
                <p className="mt-2 text-sm leading-relaxed">{job.desc}</p>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {job.highlights.map((h) => (
                    <Badge key={h}>{h}</Badge>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Education</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          {EDUCATION.map((ed) => (
            <div key={ed.title} className="flex items-center gap-3">
              <LogoTile name={ed.place} />
              <div>
                <h3 className="text-sm font-semibold">{ed.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {ed.place} · {ed.period}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Skills & tools</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {[...SKILLS, ...TOOLS].map((s) => (
            <Badge key={s} className="px-3 py-1 text-sm">
              {s}
            </Badge>
          ))}
        </CardContent>
      </Card>
    </>
  )
}
