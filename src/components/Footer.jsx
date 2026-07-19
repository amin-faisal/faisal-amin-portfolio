import Magnetic from './Magnetic.jsx'
import { LineReveal } from './Reveal.jsx'
import { SITE } from '../data/content.js'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer" id="contact">
      <div className="footer-glow" />
      <h2 className="footer-title">
        <LineReveal text="Let's build your" />
        <LineReveal as="span" className="accent" text="next big idea." delay={0.12} />
      </h2>
      <div className="footer-cta">
        <Magnetic strength={0.25}>
          <a className="email-btn" href={`mailto:${SITE.email}`} data-hover>
            <span className="btn-bg" />
            <span>✉ {SITE.email}</span>
          </a>
        </Magnetic>
      </div>
      <div className="footer-meta">
        <span>© {year} {SITE.name}. Designer who gives a shit.</span>
        <span>
          <a href={SITE.linkedin} target="_blank" rel="noreferrer" data-hover>LinkedIn</a>
          {' · '}
          <a href={`mailto:${SITE.email}`} data-hover>Email</a>
        </span>
        <button
          className="back-top"
          data-hover
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Back to top ↑
        </button>
      </div>
    </footer>
  )
}
