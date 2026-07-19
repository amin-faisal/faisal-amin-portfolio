import { Reveal, BlurIn, BlurReveal } from '../components/Reveal.jsx'
import Marquee from '../components/Marquee.jsx'
import { PROJECTS } from '../data/content.js'

export default function WorkPage() {
  return (
    <div className="page">
      <section className="page-hero">
        <BlurIn delay={0.1}>
          <p className="kicker">Portfolio — {PROJECTS.length} projects</p>
        </BlurIn>
        <BlurIn delay={0.2}>
          <h1 className="page-title">
            Work that <span className="accent">shipped</span>,<br />
            not just shots.
          </h1>
        </BlurIn>
        <BlurIn delay={0.35}>
          <p className="page-intro">
            Healthcare SaaS, EdTech, AI and e-commerce — every project here made it
            to <strong>real users</strong>. Numbers over noise.
          </p>
        </BlurIn>
      </section>

      <section className="section" style={{ paddingTop: '1rem' }}>
        <div className="project-grid">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 0.1} y={40}>
              <article className="project-card" data-hover>
                <div className="media">
                  <img src={p.img} alt={p.title} loading="lazy" />
                </div>
                <div className="body">
                  <div className="meta">
                    <span className="work-tag">{p.tag}</span>
                    <span className="year">{p.year}</span>
                  </div>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                  <span className="result">→ {p.result}</span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <BlurReveal>
          <h2 className="section-title">
            Want the full case studies? <span className="accent">Ask me.</span>
          </h2>
        </BlurReveal>
      </section>

      <Marquee />
    </div>
  )
}
