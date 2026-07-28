import { Suspense, lazy, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import TopNav from './components/TopNav.jsx'
import ProfileCard, { TAB_STRIP_ID } from './components/ProfileCard.jsx'
import RightRail from './components/RightRail.jsx'
import { MessagingProvider, MessagingPanel } from './components/Messaging.jsx'
import { PageSkeleton } from './components/Skeleton.jsx'
import { capturePageview } from './lib/analytics.js'
import usePageTitle from './lib/usePageTitle.js'
import { TAB_PATHS } from './lib/nav.js'
import AboutTab from './components/tabs/AboutTab.jsx'
import WorkTab from './components/tabs/WorkTab.jsx'
import ServicesTab from './components/tabs/ServicesTab.jsx'
import ContactTab from './components/tabs/ContactTab.jsx'
import { TABS } from './data/content.js'

// Secondary pages load as their own chunks so the profile — the page almost
// everyone lands on — isn't waiting on code it may never need.
const NetworkPage = lazy(() => import('./components/NetworkPage.jsx'))
const CaseStudyPage = lazy(() => import('./components/CaseStudyPage.jsx'))
const AnalyticsPage = lazy(() => import('./components/AnalyticsPage.jsx'))

const TAB_CONTENT = {
  about: AboutTab,
  work: WorkTab,
  services: ServicesTab,
  contact: ContactTab,
}

const HEADER_H = 52

function ProfilePage() {
  const { pathname } = useLocation()
  const active =
    TABS.find((t) => t.path === pathname || (t.path === '/' && pathname === '/about')) ?? TABS[0]
  const Content = TAB_CONTENT[active.id]

  return (
    <main className="mx-auto grid max-w-[1128px] grid-cols-1 items-start gap-4 px-2 pt-4 pb-24 sm:gap-6 sm:px-4 sm:pt-6 sm:pb-12 lg:grid-cols-[minmax(0,1fr)_300px]">
      <div className="flex min-w-0 flex-col gap-4 sm:gap-6">
        <ProfileCard />
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="flex flex-col gap-4 sm:gap-6"
          >
            <Content />
          </motion.div>
        </AnimatePresence>
      </div>
      <RightRail />
    </main>
  )
}

export default function App() {
  const { pathname } = useLocation()
  const previous = useRef(null)
  const caseSlug = pathname.startsWith('/work/')
    ? pathname.slice('/work/'.length).replace(/\/+$/, '')
    : null

  usePageTitle(pathname)

  useEffect(() => {
    const from = previous.current
    previous.current = pathname
    const betweenTabs = from !== null && TAB_PATHS.has(from) && TAB_PATHS.has(pathname)

    if (!betweenTabs) {
      // A different page entirely — start it from the top.
      window.scrollTo({ top: 0, behavior: 'instant' })
    } else {
      // Switching profile tabs keeps the reader where they are. The only
      // correction is when the tab strip has scrolled off the top: pull it
      // back under the header so the new tab's content starts in view.
      const strip = document.getElementById(TAB_STRIP_ID)
      const top = strip?.getBoundingClientRect().top
      if (top !== undefined && top < HEADER_H) {
        window.scrollTo({ top: window.scrollY + top - HEADER_H, behavior: 'instant' })
      }
    }

    capturePageview(pathname)
  }, [pathname])

  let page
  if (pathname === '/network') page = <NetworkPage />
  else if (pathname === '/analytics') page = <AnalyticsPage />
  else if (caseSlug) page = <CaseStudyPage slug={caseSlug} />
  else page = <ProfilePage />

  return (
    <MessagingProvider>
      <TopNav />
      <Suspense fallback={<PageSkeleton />}>{page}</Suspense>
      <MessagingPanel />
    </MessagingProvider>
  )
}
