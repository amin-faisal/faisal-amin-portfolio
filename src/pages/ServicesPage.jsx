import { Reveal, BlurIn } from '../components/Reveal.jsx'
import Process from '../components/Process.jsx'
import Quote from '../components/Quote.jsx'
import { SERVICES } from '../data/content.js'

export default function ServicesPage() {
  return (
    <div className="page">
      <section className="page-hero">
        <BlurIn delay={0.1}>
          <p className="kicker">Services</p>
        </BlurIn>
        <BlurIn delay={0.2}>
          <h1 className="page-title">
            Design that <span className="accent">converts</span>,<br />
            systems that scale.
          </h1>
        </BlurIn>
        <BlurIn delay={0.35}>
          <p className="page-intro">
            I plug in as a <strong>founding designer</strong> — owning the product from
            research to launch, not handing off pretty pictures.
          </p>
        </BlurIn>
      </section>

      <section className="section" style={{ paddingTop: '1rem' }}>
        <div className="service-cards">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={(i % 2) * 0.1} y={40}>
              <div className="service-card" data-hover>
                <div className="icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <ul>
                  {s.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Process count="(01)" />
      <Quote count="(02)" />
    </div>
  )
}
