import { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useSpring } from 'framer-motion'

// Counts from 0 to `to` when scrolled into view.
export default function Counter({ to, prefix = '', suffix = '', duration = 1.6 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const mv = useMotionValue(0)
  const spring = useSpring(mv, { duration: duration * 1000, bounce: 0 })

  useEffect(() => {
    if (inView) mv.set(to)
  }, [inView, to, mv])

  useEffect(() => {
    return spring.on('change', (v) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${Math.round(v).toLocaleString()}${suffix}`
      }
    })
  }, [spring, prefix, suffix])

  return <span ref={ref}>{`${prefix}0${suffix}`}</span>
}
