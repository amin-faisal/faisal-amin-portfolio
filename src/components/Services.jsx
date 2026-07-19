import { Link } from 'react-router-dom'
import { Reveal, BlurReveal } from './Reveal.jsx'
import { SERVICES } from '../data/content.js'

// Compact services list used on the home page.
export default function Services({ count = '(05)' }) {
  return (
    <section className="section" id="services">
      <div className="section-head">
        <span className="section-eyebrow">Premium services</span>
        <span className="section-count">{count}</span>
      </div>
      <BlurReveal>
        <h2 className="section-title">
          Pro <span className="accent">services.</span>
        </h2>
      </BlurReveal>
      <div style={{ marginTop: '3.5rem' }}>
        {SERVICES.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.06} y={28}>
            <Link to="/services" className="service-row" data-hover data-cursor="More">
              <h3>{s.title}</h3>
              <span className="service-tag">{s.tag}</span>
              <p>{s.desc}</p>
              <span className="service-arrow">↗</span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
