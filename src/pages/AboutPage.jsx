import { Reveal, BlurIn, BlurReveal } from '../components/Reveal.jsx'
import Facts from '../components/Facts.jsx'
import Quote from '../components/Quote.jsx'
import { EXPERIENCE, EDUCATION, TOOLS } from '../data/content.js'

const BASE = import.meta.env.BASE_URL

export default function AboutPage() {
  return (
    <div className="page">
      <section className="page-hero">
        <BlurIn delay={0.1}>
          <p className="kicker">About me</p>
        </BlurIn>
        <BlurIn delay={0.2}>
          <h1 className="page-title">
            Engineer&apos;s brain,<br />
            <span className="accent">designer&apos;s hands.</span>
          </h1>
        </BlurIn>
        <BlurIn delay={0.35}>
          <p className="page-intro">
            My first exposure to design was unplanned — a &quot;Graphic Designer&quot; role in a
            university society with very basic skills. Four years and 20+ societies later,
            what started as simple edits turned into a deep interest in how visuals,
            structure and communication influence people.
          </p>
        </BlurIn>
      </section>

      <section className="section" style={{ paddingTop: '1rem' }}>
        <div className="contact-grid">
          <div>
            <Reveal>
              <p className="about-meta" style={{ maxWidth: '40rem', fontSize: '1.05rem' }}>
                Choosing UX/UI as a full-time career meant stepping away from a traditional
                mechanical engineering path — but it felt right. <strong>Design became the
                place where my engineering mindset and creativity met.</strong>
                <br /><br />
                From a UX/UI internship working on real products, to Clyro&apos;s 50+ SaaS
                platforms, to OctiLearn — my first live product, which crossed 3,000+
                pre-launch sign-ups — I&apos;m driven by the belief that thoughtful design,
                backed by engineering thinking, can take you places you never planned but
                always hoped for.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="tool-pills" style={{ marginTop: '2rem' }}>
                {TOOLS.map((t) => (
                  <span className="tool-pill" key={t} data-hover>{t}</span>
                ))}
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <div className="hero-portrait" style={{ justifySelf: 'start', width: '100%' }}>
              <div className="frame" data-hover>
                <img src={`${BASE}portrait.png`} alt="Faisal Amin" />
                <div className="tag">
                  Faisal Amin
                  <span>Islamabad, Pakistan</span>
                </div>
              </div>
              <div className="badge">NUST &apos;24</div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-head">
          <span className="section-eyebrow">Experience</span>
          <span className="section-count">(01)</span>
        </div>
        <BlurReveal>
          <h2 className="section-title">
            Where I&apos;ve <span className="accent">shipped.</span>
          </h2>
        </BlurReveal>
        <div className="timeline" style={{ marginTop: '3.5rem' }}>
          {EXPERIENCE.map((e, i) => (
            <Reveal key={e.company} delay={i * 0.06} y={36}>
              <div className="tl-item">
                <span className="period">{e.period}</span>
                <h3>
                  {e.company} <span>— {e.role}</span>
                </h3>
                <p>{e.desc}</p>
                <div className="highlights">
                  {e.highlights.map((h) => (
                    <span key={h}>{h}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-head">
          <span className="section-eyebrow">Education &amp; certifications</span>
          <span className="section-count">(02)</span>
        </div>
        <div className="service-cards">
          {EDUCATION.map((ed, i) => (
            <Reveal key={ed.title} delay={i * 0.08}>
              <div className="service-card" data-hover>
                <span className="section-eyebrow" style={{ fontSize: '0.7rem' }}>{ed.period}</span>
                <h3>{ed.title}</h3>
                <p>{ed.place}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Facts count="(03)" />
      <Quote count="(04)" />
    </div>
  )
}
