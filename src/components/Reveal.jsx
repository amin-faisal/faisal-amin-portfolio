import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const EASE = [0.65, 0.05, 0, 1]

// Slide-up reveal on scroll into view.
export function Reveal({ children, delay = 0, y = 48, ...rest }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

// Blur-in reveal (goodlifemeds-style): headings de-blur as they appear.
export function BlurReveal({ children, delay = 0, y = 28, amount = 14, ...rest }) {
  return (
    <motion.div
      initial={{ opacity: 0, y, filter: `blur(${amount}px)` }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 1, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

// Blur-in on mount (for page heros, independent of scroll).
export function BlurIn({ children, delay = 0, y = 28, amount = 16, ...rest }) {
  return (
    <motion.div
      initial={{ opacity: 0, y, filter: `blur(${amount}px)` }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 1, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

// Masked line reveal for headlines. The clipped child never intersects the
// viewport while hidden, so we observe the (visible) mask parent instead.
export function LineReveal({ text, className = '', delay = 0, as: Tag = 'span' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <Tag ref={ref} className={`line ${className}`}>
      <motion.span
        className="line-inner"
        initial={{ y: '110%' }}
        animate={inView ? { y: '0%' } : {}}
        transition={{ duration: 1, ease: EASE, delay }}
      >
        {text}
      </motion.span>
    </Tag>
  )
}

export { EASE }
