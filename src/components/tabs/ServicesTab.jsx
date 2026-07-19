import { Check, SendHorizontal } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card.jsx'
import Badge from '../ui/badge.jsx'
import { useMessaging } from '../Messaging.jsx'
import { SERVICES } from '../../data/content.js'

export default function ServicesTab() {
  const { openMessaging } = useMessaging()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Services provided</CardTitle>
        <CardDescription className="font-semibold text-success">
          Open for business — click a service to start the conversation
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-2">
        {SERVICES.map((s) => (
          <button
            key={s.title}
            onClick={() => openMessaging(s.title)}
            className="cursor-pointer rounded-lg border border-line p-4 text-left transition-colors hover:border-primary hover:bg-primary/[0.03]"
          >
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-semibold">{s.title}</h3>
              <Badge variant="brand">{s.tag}</Badge>
            </div>
            <p className="mt-1.5 text-sm text-muted-foreground">{s.desc}</p>
            <ul className="mt-3 flex flex-col gap-1.5">
              {s.points.map((point) => (
                <li key={point} className="flex items-start gap-1.5 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
            <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
              Message about this <SendHorizontal className="size-3.5" aria-hidden="true" />
            </span>
          </button>
        ))}
      </CardContent>
    </Card>
  )
}
