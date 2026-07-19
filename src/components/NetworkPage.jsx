import { Users, Building2, GraduationCap } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card.jsx'
import Button from './ui/button.jsx'
import LogoTile from './LogoTile.jsx'
import { useMessaging } from './Messaging.jsx'
import { CONNECTIONS, EDUCATION } from '../data/content.js'

const MANAGE = [
  { icon: Users, label: 'Connections', count: CONNECTIONS.length },
  { icon: Building2, label: 'Companies', count: CONNECTIONS.length },
  { icon: GraduationCap, label: 'Education', count: EDUCATION.length },
]

export default function NetworkPage() {
  const { openMessaging } = useMessaging()

  return (
    <main className="mx-auto grid max-w-[1128px] grid-cols-1 items-start gap-4 px-2 pt-4 pb-12 sm:gap-6 sm:px-4 sm:pt-6 lg:grid-cols-[300px_minmax(0,1fr)]">
      <Card>
        <CardContent className="py-4 sm:py-4">
          <h2 className="text-base font-semibold">Manage my network</h2>
          <ul className="mt-3 flex flex-col">
            {MANAGE.map(({ icon: Icon, label, count }) => (
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
        <CardHeader>
          <CardTitle>{CONNECTIONS.length} connections</CardTitle>
          <CardDescription>
            The companies and teams Faisal ships with — every one of them arrived as a client and
            stayed as a connection.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {CONNECTIONS.map((c) => (
            <article
              key={c.name}
              className="flex flex-col items-center overflow-hidden rounded-lg border border-line text-center"
            >
              <div className="h-14 w-full bg-brand/40" />
              <LogoTile name={c.name} className="-mt-8 size-16 rounded-full border-2 border-card p-1.5" />
              <div className="flex grow flex-col items-center gap-1 p-3 pt-2">
                <h3 className="text-sm font-semibold">{c.name}</h3>
                <p className="grow text-xs leading-snug text-muted-foreground">{c.sub}</p>
                <Button
                  size="sm"
                  variant="outline"
                  className="mt-2"
                  onClick={() => openMessaging()}
                >
                  Message
                </Button>
              </div>
            </article>
          ))}
        </CardContent>
      </Card>
    </main>
  )
}
