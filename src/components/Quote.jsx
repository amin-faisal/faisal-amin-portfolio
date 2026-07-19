import { BlurReveal, Reveal } from './Reveal.jsx'

export default function Quote({ count = '(06)' }) {
  return (
    <section className="section quote-section">
      <div className="section-head">
        <span className="section-eyebrow">Voices about me</span>
        <span className="section-count">{count}</span>
      </div>
      <BlurReveal>
        <div className="quote-mark">“</div>
        <p className="quote-text">
          Brilliant man, amazing team lead and confident problem solver.
        </p>
      </BlurReveal>
      <Reveal delay={0.15}>
        <div className="quote-author">
          <div className="avatar">TM</div>
          <div className="who">
            <strong>Tahir Mehmood</strong>
            <span>Prompt Engineer — AI Customer Success &amp; Team Management</span>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
