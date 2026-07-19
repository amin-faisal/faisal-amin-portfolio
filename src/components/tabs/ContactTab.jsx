import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Globe } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card.jsx'
import Button from '../ui/button.jsx'
import { SITE, PUBLIC_URL } from '../../data/content.js'

function LinkedinIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  )
}

const ROWS = [
  { icon: Mail, label: 'Email', value: SITE.email, href: `mailto:${SITE.email}` },
  { icon: LinkedinIcon, label: 'LinkedIn', value: 'in/faisal-amin-83a15320b', href: SITE.linkedin },
  { icon: Globe, label: 'Portfolio', value: PUBLIC_URL, href: `https://${PUBLIC_URL}` },
  { icon: MapPin, label: 'Location', value: SITE.location },
]

export default function ContactTab() {
  const [waved, setWaved] = useState(false)
  const waveTimer = useRef(null)

  const sayHello = () => {
    setWaved(true)
    clearTimeout(waveTimer.current)
    waveTimer.current = setTimeout(() => setWaved(false), 3500)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact info</CardTitle>
        <CardDescription>
          Have a next big idea? I usually reply within a day — founding designers talk shipping.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col gap-5">
          {ROWS.map(({ icon: Icon, label, value, href }) => (
            <li key={label} className="flex items-center gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded bg-muted text-primary">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold">{label}</p>
                {href ? (
                  <a
                    href={href}
                    target={href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noreferrer"
                    className="block truncate text-sm text-primary hover:underline"
                  >
                    {value}
                  </a>
                ) : (
                  <p className="text-sm text-muted-foreground">{value}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex min-h-9 flex-wrap items-center gap-3">
          {waved ? (
            <motion.p
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2 text-sm font-semibold text-success"
            >
              <motion.span
                animate={{ rotate: [0, 24, -12, 24, 0] }}
                transition={{ duration: 0.9, ease: 'easeInOut' }}
                className="inline-block text-2xl"
              >
                👋
              </motion.span>
              Hello sent! Don't worry — this one stays between us.
            </motion.p>
          ) : (
            <Button onClick={sayHello}>Say hello</Button>
          )}
          <Button variant="outline" href={SITE.linkedin} target="_blank" rel="noreferrer">
            Connect on LinkedIn
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
