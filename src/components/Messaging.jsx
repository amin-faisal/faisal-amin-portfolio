import { createContext, useContext, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronUp, Check, SendHorizontal } from 'lucide-react'
import Button from './ui/button.jsx'
import ModalShell from './ModalShell.jsx'
import { SITE, SERVICES } from '../data/content.js'

const BASE = import.meta.env.BASE_URL

export const TOPICS = [
  'Just saying hello',
  ...SERVICES.map((s) => s.title),
  'Web Design (freelance)',
  'Something else',
]

const MessagingContext = createContext(null)

export function useMessaging() {
  return useContext(MessagingContext)
}

export function MessagingProvider({ children }) {
  const [open, setOpen] = useState(false)
  const [topic, setTopic] = useState(TOPICS[0])

  const openMessaging = (preselectedTopic) => {
    if (preselectedTopic && TOPICS.includes(preselectedTopic)) setTopic(preselectedTopic)
    setOpen(true)
  }

  return (
    <MessagingContext.Provider value={{ open, setOpen, topic, setTopic, openMessaging }}>
      {children}
    </MessagingContext.Provider>
  )
}

const FIELD =
  'w-full rounded border border-line bg-card px-2.5 py-1.5 text-sm outline-none focus:border-primary'

export function MessagingPanel() {
  const { open, setOpen, topic, setTopic } = useMessaging()
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${SITE.email}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          topic,
          message: form.message,
          _subject: `Portfolio message from ${form.name} — ${topic}`,
          _template: 'table',
          _captcha: 'false',
        }),
      })
      setStatus(res.ok ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  const avatar = (
    <span className="relative shrink-0">
      <img src={`${BASE}dp.png`} alt="" className="size-9 rounded-full bg-brand object-cover" />
      <span className="absolute right-0 bottom-0 size-2.5 rounded-full border-2 border-card bg-success" />
    </span>
  )

  return (
    <>
      <AnimatePresence>
        {open && (
          <ModalShell
            key="messaging"
            title="Message Faisal"
            subtitle="Usually replies within a day"
            lead={avatar}
            onClose={() => setOpen(false)}
          >
            {status === 'sent' ? (
              <div className="flex flex-col items-center gap-2 py-6 text-center">
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex size-10 items-center justify-center rounded-full bg-success/10 text-success"
                >
                  <Check className="size-5" />
                </motion.span>
                <p className="text-sm font-semibold">Message sent!</p>
                <p className="text-xs text-muted-foreground">
                  It's on its way to Faisal's inbox — expect a reply soon.
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setStatus('idle')
                    setForm({ name: '', email: '', message: '' })
                  }}
                >
                  Send another
                </Button>
              </div>
            ) : (
              <form onSubmit={submit} className="flex flex-col gap-2.5">
                <input
                  required
                  value={form.name}
                  onChange={set('name')}
                  placeholder="Your name"
                  aria-label="Your name"
                  className={FIELD}
                />
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={set('email')}
                  placeholder="Your email"
                  aria-label="Your email"
                  className={FIELD}
                />
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  aria-label="Topic"
                  className={FIELD}
                >
                  {TOPICS.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={set('message')}
                  placeholder="Write a message…"
                  aria-label="Message"
                  className={`${FIELD} resize-none`}
                />
                {status === 'error' && (
                  <p className="text-xs text-[#b24020]">
                    Couldn't send — email me directly at{' '}
                    <a href={`mailto:${SITE.email}`} className="font-semibold underline">
                      {SITE.email}
                    </a>
                  </p>
                )}
                <div className="flex justify-end border-t border-line pt-2.5">
                  <Button size="sm" type="submit" disabled={status === 'sending'}>
                    {status === 'sending' ? 'Sending…' : 'Send'}
                    <SendHorizontal className="size-4" aria-hidden="true" />
                  </Button>
                </div>
              </form>
            )}
          </ModalShell>
        )}
      </AnimatePresence>

      {/* Desktop-only launcher. On mobile the bottom tab bar owns Messaging, so
          nothing hovers above the nav eating screen space. */}
      <AnimatePresence>
        {!open && (
          <motion.button
            key="dock"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            onClick={() => setOpen(true)}
            className="fixed right-6 bottom-0 z-40 hidden w-[340px] cursor-pointer items-center gap-2 rounded-t-lg border border-b-0 border-line bg-card px-3 py-2 shadow-[0_2px_12px_rgba(0,0,0,0.15)] hover:bg-black/[0.03] sm:flex"
          >
            {avatar}
            <span className="text-sm font-semibold">Messaging</span>
            <ChevronUp className="ml-auto size-4 text-muted-foreground" aria-hidden="true" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}
