import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Reveal } from './Reveal.jsx'
import { TOOLS } from '../data/content.js'

const COPY =
  'Mechanical engineer turned designer. I transform fragmented workflows into scalable products — healthcare SaaS, EdTech, AI and fintech — with design that is backed by engineering thinking and obsessed with shipping.'

function Word({ word, range, progress }) {
  const opacity = useTransform(progress, range, [0.16, 1])
  return (
    <motion.span className="word" style={{ opacity }}>
      {word}&nbsp;
    </motion.span>
  )
}

export default function About() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.82', 'start 0.28'],
  })
  const words = COPY.split(' ')

  return (
    <section className="section" id="about">
      <div className="section-head">
        <span className="section-eyebrow">Hey, just an intro</span>
        <span className="section-count">(01)</span>
      </div>

      <p className="about-copy" ref={ref}>
        {words.map((w, i) => (
          <Word
            key={i}
            word={w}
            progress={scrollYProgress}
            range={[i / words.length, (i + 1) / words.length]}
          />
        ))}
      </p>

      <div className="about-footer">
        <Reveal>
          <p className="about-meta">
            Currently <strong>Senior Product Designer at Modalys</strong>, leading
            end-to-end design of an occupational healthcare platform. Previously:
            50+ SaaS platforms at Clyro, OctiLearn, Face44 &amp; Takhleeq.{' '}
            <Link to="/about" data-hover style={{ color: 'var(--lav)', fontWeight: 700 }}>
              Full story ↗
            </Link>
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="tool-pills">
            {TOOLS.map((t) => (
              <span className="tool-pill" key={t} data-hover>
                {t}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
