import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import TopNav from './components/TopNav.jsx'
import ProfileCard from './components/ProfileCard.jsx'
import RightRail from './components/RightRail.jsx'
import NetworkPage from './components/NetworkPage.jsx'
import { MessagingProvider, MessagingPanel } from './components/Messaging.jsx'
import AboutTab from './components/tabs/AboutTab.jsx'
import WorkTab from './components/tabs/WorkTab.jsx'
import ServicesTab from './components/tabs/ServicesTab.jsx'
import ContactTab from './components/tabs/ContactTab.jsx'
import { TABS } from './data/content.js'

const TAB_CONTENT = {
  about: AboutTab,
  work: WorkTab,
  services: ServicesTab,
  contact: ContactTab,
}

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

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <MessagingProvider>
      <TopNav />
      {pathname === '/network' ? <NetworkPage /> : <ProfilePage />}
      <MessagingPanel />
    </MessagingProvider>
  )
}
