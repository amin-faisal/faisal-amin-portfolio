import Hero from '../components/Hero.jsx'
import Marquee from '../components/Marquee.jsx'
import About from '../components/About.jsx'
import Work from '../components/Work.jsx'
import Process from '../components/Process.jsx'
import Facts from '../components/Facts.jsx'
import Services from '../components/Services.jsx'
import Quote from '../components/Quote.jsx'

export default function Home({ ready }) {
  return (
    <div className="page">
      <Hero ready={ready} />
      <Marquee />
      <About />
      <Work limit={4} />
      <Process />
      <Facts />
      <Services />
      <Quote />
    </div>
  )
}
