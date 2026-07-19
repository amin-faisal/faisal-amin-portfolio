import { useEffect, useRef, useState } from 'react'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [hover, setHover] = useState(false)
  const [label, setLabel] = useState('')

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    let mx = -100, my = -100
    let rx = -100, ry = -100
    let raf

    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY
      const target = e.target.closest('a, button, [data-hover]')
      setHover(!!target)
      setLabel(target?.dataset?.cursor || '')
    }

    const loop = () => {
      rx += (mx - rx) * 0.16
      ry += (my - ry) * 0.16
      dot.style.transform = `translate(${mx - 4}px, ${my - 4}px)`
      const size = ring.offsetWidth / 2
      ring.style.transform = `translate(${rx - size}px, ${ry - size}px)`
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div
        ref={ringRef}
        className={`cursor-ring ${label ? 'has-label' : hover ? 'is-hover' : ''}`}
      >
        <span className="cursor-label">{label}</span>
      </div>
    </>
  )
}
