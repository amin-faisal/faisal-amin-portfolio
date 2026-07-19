import { useRef } from 'react'
import { Reveal, BlurReveal } from './Reveal.jsx'
import { PROCESS } from '../data/content.js'

function Card({ step, delay }) {
  const glowRef = useRef(null)

  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    if (glowRef.current) {
      glowRef.current.style.left = `${e.clientX - rect.left}px`
      glowRef.current.style.top = `${e.clientY - rect.top}px`
    }
  }

  return (
    <Reveal delay={delay}>
      <div className="process-card" onMouseMove={onMove} data-hover>
        <div className="card-glow" ref={glowRef} />
        <div className="num">{step.num}</div>
        <h3>{step.title}</h3>
        <p>{step.desc}</p>
      </div>
    </Reveal>
  )
}

export default function Process({ count = '(03)' }) {
  return (
    <section className="section process" id="process">
      <div className="section-head">
        <span className="section-eyebrow">Approach &amp; style</span>
        <span className="section-count">{count}</span>
      </div>
      <BlurReveal>
        <h2 className="section-title">
          Bringing ideas <span className="accent">to life.</span>
        </h2>
      </BlurReveal>
      <div className="process-grid" style={{ marginTop: '3.5rem' }}>
        {PROCESS.map((s, i) => (
          <Card key={s.num} step={s} delay={i * 0.12} />
        ))}
      </div>
    </section>
  )
}
