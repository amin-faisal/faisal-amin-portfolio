import { SquareArrowOutUpRight } from 'lucide-react'
import { Card, CardContent } from './ui/card.jsx'
import LogoTile from './LogoTile.jsx'
import { PUBLIC_URL, CURRENT_COMPANY, CONNECTIONS, SITE } from '../data/content.js'

export default function RightRail() {
  return (
    <aside className="flex flex-col gap-4">
      <Card>
        <CardContent className="py-4 sm:py-4">
          <h2 className="text-base font-semibold">Public profile & URL</h2>
          <a
            href={`https://${PUBLIC_URL}`}
            target="_blank"
            rel="noreferrer"
            className="mt-1 flex items-start gap-1 text-sm break-all text-muted-foreground hover:text-primary hover:underline"
          >
            {PUBLIC_URL}
            <SquareArrowOutUpRight className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
          </a>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="py-4 sm:py-4">
          <h2 className="text-base font-semibold">Current company</h2>
          <div className="mt-3 flex gap-3">
            <LogoTile name={CURRENT_COMPANY.name} />
            <div>
              <p className="text-sm font-semibold">{CURRENT_COMPANY.name}</p>
              <p className="mt-0.5 text-xs leading-snug text-muted-foreground">
                {CURRENT_COMPANY.sub}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="py-4 sm:py-4">
          <h2 className="text-base font-semibold">Companies that ship with Faisal</h2>
          <ul className="mt-3 flex flex-col gap-3">
            {CONNECTIONS.filter((c) => c.name !== CURRENT_COMPANY.name).map((c) => (
              <li key={c.name}>
                <a href={c.url} target="_blank" rel="noreferrer" className="group flex items-center gap-3">
                  <LogoTile name={c.name} className="size-10 text-sm" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold group-hover:underline">{c.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{c.industry}</p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <p className="px-2 text-center text-xs leading-relaxed text-muted-foreground">
        {SITE.name} © {new Date().getFullYear()}
        <br />
        Styled like LinkedIn · Built like a founding designer
      </p>
    </aside>
  )
}
