import { Reveal, BlurIn } from '../components/Reveal.jsx'
import Magnetic from '../components/Magnetic.jsx'
import { SITE } from '../data/content.js'

export default function ContactPage() {
  return (
    <div className="page">
      <section className="page-hero">
        <BlurIn delay={0.1}>
          <p className="kicker">Contact</p>
        </BlurIn>
        <BlurIn delay={0.2}>
          <h1 className="page-title">
            Got an idea?<br />
            <span className="accent">Let&apos;s ship it.</span>
          </h1>
        </BlurIn>
        <BlurIn delay={0.35}>
          <p className="page-intro">
            I usually reply within a day. Tell me what you&apos;re building, where it hurts,
            and when you want it live — I&apos;ll take it from there.
          </p>
        </BlurIn>
        <BlurIn delay={0.5}>
          <div className="hero-actions" style={{ marginTop: '2.5rem' }}>
            <Magnetic>
              <a className="email-btn" href={`mailto:${SITE.email}`} data-hover>
                <span className="btn-bg" />
                <span>✉ {SITE.email}</span>
              </a>
            </Magnetic>
          </div>
        </BlurIn>
      </section>

      <section className="section" style={{ paddingTop: '2rem' }}>
        <div className="contact-grid">
          <div className="contact-side">
            <Reveal>
              <div className="contact-block" data-hover>
                <span className="label">Email</span>
                <div className="value">{SITE.email}</div>
                <p>Best for project inquiries — the more context, the better.</p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="contact-block" data-hover>
                <span className="label">LinkedIn</span>
                <div className="value">
                  <a href={SITE.linkedin} target="_blank" rel="noreferrer" data-hover>
                    /in/faisal-amin ↗
                  </a>
                </div>
                <p>2,300+ followers. Designer who gives a shit.</p>
              </div>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="contact-block" data-hover>
                <span className="label">Based in</span>
                <div className="value">{SITE.location}</div>
                <p>Working remotely with teams worldwide — on-site, hybrid or remote.</p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div>
              <h2 className="section-title" style={{ fontSize: 'clamp(1.6rem, 3.4vw, 2.6rem)' }}>
                What happens <span className="accent">next?</span>
              </h2>
              <div className="timeline" style={{ marginTop: '2.5rem' }}>
                <div className="tl-item">
                  <span className="period">Within 24h</span>
                  <h3>I reply</h3>
                  <p>With honest first thoughts on your idea and what I&apos;d validate first.</p>
                </div>
                <div className="tl-item">
                  <span className="period">Day 2–3</span>
                  <h3>Intro call</h3>
                  <p>30 minutes on goals, scope and timelines. No slideware.</p>
                </div>
                <div className="tl-item">
                  <span className="period">Within a week</span>
                  <h3>Proposal &amp; kickoff</h3>
                  <p>A clear plan with milestones — then we start shipping.</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
