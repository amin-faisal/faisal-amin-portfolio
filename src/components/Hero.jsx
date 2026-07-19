import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import Magnetic from './Magnetic.jsx'
import Counter from './Counter.jsx'
import { SITE, STATS } from '../data/content.js'
import { EASE } from './Reveal.jsx'

const BASE = import.meta.env.BASE_URL

export default function Hero({ ready }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const yTitle = useTransform(scrollYProgress, [0, 1], ['0%', '28%'])
  const blob1 = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])

  const blurIn = (delay) => ({
    initial: { opacity: 0, y: 26, filter: 'blur(16px)' },
    animate: ready ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {},
    transition: { duration: 1, ease: EASE, delay },
  })

  return (
    <header className="hero hero-noise" id="top" ref={ref}>
      <motion.div className="hero-blob b1" style={{ y: blob1 }} />
      <div className="hero-blob b2" />

      <div className="hero-inner">
        <div>
          <motion.p className="hero-eyebrow" {...blurIn(0.3)}>
            <span className="avail" /> Available for new projects — {SITE.location}
          </motion.p>

          <motion.h1 className="hero-title" style={{ y: yTitle }}>
            <motion.span style={{ display: 'block' }} {...blurIn(0.4)}>
              Senior Product
            </motion.span>
            <motion.span style={{ display: 'block' }} {...blurIn(0.5)}>
              <span className="italic">Designer</span> <span className="thin">for your</span>
            </motion.span>
            <motion.span style={{ display: 'block' }} {...blurIn(0.6)}>
              <span className="thin">next big idea.</span>
            </motion.span>
          </motion.h1>

          <motion.p className="hero-sub" {...blurIn(0.75)}>
            I&apos;m Faisal — a mechanical engineer turned product designer. I function as a{' '}
            <u>founding designer</u> that talks shipping: from bootstrap to products serving
            100K+ users.
          </motion.p>

          <motion.div className="hero-actions" {...blurIn(0.9)}>
            <Magnetic>
              <a className="btn-primary" href={`mailto:${SITE.email}`} data-hover>
                <span className="btn-bg" />
                <span>✉ {SITE.email}</span>
              </a>
            </Magnetic>
            <Link className="btn-ghost" to="/work" data-hover>
              See the work <span className="arrow">↗</span>
            </Link>
          </motion.div>
        </div>

        <motion.div className="hero-portrait" {...blurIn(0.55)}>
          <div className="frame" data-hover>
            <img src={`${BASE}portrait.png`} alt="Faisal Amin" />
            <div className="tag">
              {SITE.name}
              <span>{SITE.role} @ Modalys</span>
            </div>
          </div>
          <div className="badge">3+ YRS SHIPPING</div>
        </motion.div>
      </div>

      <motion.div
        className="hero-stats"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1.05 }}
      >
        {STATS.map((s) => (
          <div className="hero-stat" key={s.label} data-hover>
            <div className="num">
              <Counter to={s.value} prefix={s.prefix || ''} suffix={s.suffix || ''} />
            </div>
            <div className="label">{s.label}</div>
            <div className="sub">{s.sub}</div>
          </div>
        ))}
      </motion.div>
    </header>
  )
}
