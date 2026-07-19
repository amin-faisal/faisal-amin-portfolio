import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { EASE } from './Reveal.jsx'

export default function Preloader({ onDone }) {
  const [count, setCount] = useState(0)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    let n = 0
    const tick = () => {
      n += Math.max(1, Math.round((100 - n) / 9))
      if (n >= 100) {
        setCount(100)
        setTimeout(() => {
          setGone(true)
          onDone?.()
        }, 350)
        return
      }
      setCount(n)
      setTimeout(tick, 55)
    }
    const t = setTimeout(tick, 120)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          className="preloader"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <div className="preloader-inner">
            <motion.div
              className="preloader-name"
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              Faisal Amin<span className="reg">®</span>
            </motion.div>
            <div className="preloader-count">{count}%</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
