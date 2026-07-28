import { createContext, useContext, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, ChevronUp, Check, SendHorizontal, X } from 'lucide-react'
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

// Desktop docks the conversation at the bottom of the window like LinkedIn;
// mobile gets the bottom sheet, where a docked panel would cover the content.
function useIsDesktop() {
  const [desktop, setDesktop] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(min-width: 640px)').matches,
  )
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 640px)')
    const onChange = (e) => setDesktop(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return desktop
}

const FIELD =
  'w-full rounded border border-line bg-card px-2.5 py-1.5 text-sm outline-none focus:border-primary'

function MessageForm({ topic, setTopic, status, setStatus, form, setForm }) {
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

  if (status === 'sent') {
    return (
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
    )
  }

  return (
    // ph-no-capture keeps anything typed here out of analytics.
    <form onSubmit={submit} className="ph-no-capture flex flex-col gap-2.5">
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
  )
}

export function MessagingPanel() {
  const { open, setOpen, topic, setTopic } = useMessaging()
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const desktop = useIsDesktop()

  const formProps = { topic, setTopic, status, setStatus, form, setForm }

  const avatar = (
    <span className="relative shrink-0">
      <img src={`${BASE}dp.webp`} alt="" className="size-9 rounded-full bg-brand object-cover" />
      <span className="absolute right-0 bottom-0 size-2.5 rounded-full border-2 border-card bg-success" />
    </span>
  )

  return (
    <>
      {/* Mobile — bottom sheet over the page */}
      <AnimatePresence>
        {open && !desktop && (
          <ModalShell
            key="messaging-sheet"
            title="Message Faisal"
            subtitle="Usually replies within a day"
            lead={avatar}
            onClose={() => setOpen(false)}
          >
            <MessageForm {...formProps} />
          </ModalShell>
        )}
      </AnimatePresence>

      {/* Desktop — the dock grows into a panel in place. No overlay, so the
          page behind stays readable and scrollable, exactly like LinkedIn.
          The open panel and the collapsed launcher get their own
          AnimatePresence: sharing one would make each wait on the other. */}
      <AnimatePresence>
        {desktop && open && (
          <motion.section
            key="messaging-dock-open"
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            aria-label="Message Faisal"
            className="fixed right-6 bottom-0 z-40 flex max-h-[min(560px,calc(100vh-72px))] w-[340px] flex-col overflow-hidden rounded-t-lg border border-b-0 border-line bg-card shadow-[0_-2px_16px_rgba(0,0,0,0.18)]"
          >
            <header className="flex items-center gap-2 border-b border-line px-3 py-2">
              {avatar}
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">Message Faisal</p>
                <p className="truncate text-xs text-muted-foreground">Usually replies within a day</p>
              </div>
              <div className="ml-auto flex shrink-0 items-center">
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Minimise messaging"
                  className="cursor-pointer rounded p-1.5 text-muted-foreground hover:bg-black/5"
                >
                  <ChevronDown className="size-4" />
                </button>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close messaging"
                  className="cursor-pointer rounded p-1.5 text-muted-foreground hover:bg-black/5"
                >
                  <X className="size-4" />
                </button>
              </div>
            </header>
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-3">
              <MessageForm {...formProps} />
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Collapsed launcher. On mobile the bottom tab bar owns Messaging, so
          nothing hovers above the nav eating screen space. */}
      <AnimatePresence>
        {desktop && !open && (
          <motion.button
            key="messaging-dock-closed"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            onClick={() => setOpen(true)}
            className="fixed right-6 bottom-0 z-40 flex w-[340px] cursor-pointer items-center gap-2 rounded-t-lg border border-b-0 border-line bg-card px-3 py-2 shadow-[0_2px_12px_rgba(0,0,0,0.15)] hover:bg-black/[0.03]"
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
