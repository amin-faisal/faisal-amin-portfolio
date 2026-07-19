import { Reveal, BlurReveal } from './Reveal.jsx'
import Counter from './Counter.jsx'
import { FACTS } from '../data/content.js'

export default function Facts({ count = '(04)' }) {
  return (
    <section className="section" id="facts">
      <div className="section-head">
        <span className="section-eyebrow">Stats &amp; facts</span>
        <span className="section-count">{count}</span>
      </div>
      <BlurReveal>
        <h2 className="section-title">
          Every number <span className="accent">tells a story.</span>
        </h2>
      </BlurReveal>
      <div className="facts-grid" style={{ marginTop: '4rem' }}>
        {FACTS.map((f, i) => (
          <Reveal key={f.label} delay={i * 0.1}>
            <div className="fact">
              <div className="num">
                <Counter to={f.value} suffix={f.suffix || ''} prefix={f.prefix || ''} />
              </div>
              <div className="label">{f.label}</div>
              <div className="sub">{f.sub}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
