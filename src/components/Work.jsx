import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { Reveal, BlurReveal } from './Reveal.jsx'
import { PROJECTS } from '../data/content.js'

// Featured work list (home page) with cursor-following image preview.
export default function Work({ limit = 4 }) {
  const [active, setActive] = useState(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 140, damping: 18, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 140, damping: 18, mass: 0.4 })
  const projects = PROJECTS.slice(0, limit)

  const onMove = (e) => {
    x.set(e.clientX + 24)
    y.set(e.clientY - 140)
  }

  return (
    <section className="section" id="work" onMouseMove={onMove}>
      <div className="section-head">
        <span className="section-eyebrow">Featured works</span>
        <span className="section-count">(02)</span>
      </div>
      <BlurReveal>
        <h2 className="section-title">
          Selected <span className="accent">projects</span> that shipped.
        </h2>
      </BlurReveal>

      <div className="work-list" style={{ marginTop: '3.5rem' }}>
        {projects.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.05} y={32}>
            <Link
              to="/work"
              className="work-row"
              data-hover
              data-cursor="View"
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
            >
              <span className="work-index">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="work-title">{p.title}</h3>
              <span className="work-tag">{p.tag}</span>
              <span className="work-year">{p.year}</span>
              <p className="work-desc">{p.desc}</p>
              <div className="work-mobile-img">
                <img src={p.img} alt={p.title} loading="lazy" />
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <div style={{ marginTop: '2.5rem' }}>
          <Link className="btn-ghost" to="/work" data-hover>
            View all projects <span className="arrow">↗</span>
          </Link>
        </div>
      </Reveal>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            className="work-float"
            style={{ x: sx, y: sy }}
            initial={{ opacity: 0, scale: 0.82, rotate: -4 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.82, rotate: 4 }}
            transition={{ duration: 0.35, ease: [0.65, 0.05, 0, 1] }}
          >
            <img src={projects[active].img} alt="" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
