import { CLIENTS } from '../data/content.js'

export default function Marquee() {
  const items = [...CLIENTS, ...CLIENTS]
  return (
    <div className="marquee-wrap" aria-label="Brands I have worked with">
      <div className="marquee">
        {items.map((c, i) => (
          <span className="marquee-item" key={i}>
            {c} <span className="star">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
