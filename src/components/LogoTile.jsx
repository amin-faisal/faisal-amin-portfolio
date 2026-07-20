import { cn } from '../lib/utils.js'
import { LOGOS } from '../data/content.js'

const BASE = import.meta.env.BASE_URL

const PALETTE = [
  'bg-brand text-ink',
  'bg-ink text-white',
  'bg-[#dce6f1] text-primary',
  'bg-[#e0f0e9] text-success',
  'bg-[#f5e3c9] text-[#7a4b00]',
  'bg-[#f1dce8] text-[#8f2d56]',
]

function hash(str) {
  let h = 0
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0
  return h
}

export function logoFor(name) {
  const key = Object.keys(LOGOS).find((k) => name.toLowerCase().includes(k.toLowerCase()))
  return key ? `${BASE}${LOGOS[key]}` : null
}

export default function LogoTile({ name, className }) {
  const src = logoFor(name)
  if (src) {
    return (
      <img
        src={src}
        alt={`${name} logo`}
        // Logos sit in Experience, Education and the right rail — all below the
        // fold, so they shouldn't compete with the first paint.
        loading="lazy"
        decoding="async"
        width={160}
        height={160}
        className={cn(
          'size-12 shrink-0 rounded-[4px] border border-line bg-white object-contain',
          className,
        )}
      />
    )
  }
  return (
    <div
      aria-hidden="true"
      className={cn(
        'flex size-12 shrink-0 items-center justify-center rounded font-bold',
        PALETTE[hash(name) % PALETTE.length],
        className,
      )}
    >
      {name.charAt(0)}
    </div>
  )
}
