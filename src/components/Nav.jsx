import { useEffect, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Magnetic from './Magnetic.jsx'
import { SITE } from '../data/content.js'
import { EASE } from './Reveal.jsx'

const LINKS = [
  { label: 'Work', to: '/work' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Contact', to: '/contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  return (
    <>
      <motion.nav
        className={`nav ${scrolled ? 'is-scrolled' : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
      >
        <Link to="/" className="nav-logo" data-hover>
          Faisal Amin<span className="reg">®</span>
        </Link>
        <ul className="nav-links">
          {LINKS.map((l) => (
            <li key={l.to}>
              <NavLink
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                to={l.to}
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <Magnetic>
          <a className="nav-cta" href={`mailto:${SITE.email}`} data-hover>
            <span className="dot" />
            Let&apos;s work
          </a>
        </Magnetic>
        <button
          className={`nav-burger ${open ? 'open' : ''}`}
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <span /><span /><span />
        </button>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <Link to="/">Home</Link>
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                {l.label}
              </NavLink>
            ))}
            <a className="nav-cta" href={`mailto:${SITE.email}`}>
              <span className="dot" /> Let&apos;s work
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
