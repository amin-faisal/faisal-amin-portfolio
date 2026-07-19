import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Lenis from 'lenis'
import Cursor from './components/Cursor.jsx'
import Preloader from './components/Preloader.jsx'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import { EASE } from './components/Reveal.jsx'
import Home from './pages/Home.jsx'
import WorkPage from './pages/WorkPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import ServicesPage from './pages/ServicesPage.jsx'
import ContactPage from './pages/ContactPage.jsx'

function PageWrap({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -18, filter: 'blur(8px)' }}
      transition={{ duration: 0.55, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

export default function App() {
  const [ready, setReady] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true })

    let rafId
    const raf = (time) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  // New page → start at the top.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <>
      <Cursor />
      <Preloader onDone={() => setReady(true)} />
      <Nav />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageWrap><Home ready={ready} /></PageWrap>} />
          <Route path="/work" element={<PageWrap><WorkPage /></PageWrap>} />
          <Route path="/about" element={<PageWrap><AboutPage /></PageWrap>} />
          <Route path="/services" element={<PageWrap><ServicesPage /></PageWrap>} />
          <Route path="/contact" element={<PageWrap><ContactPage /></PageWrap>} />
          <Route path="*" element={<PageWrap><Home ready={ready} /></PageWrap>} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  )
}
