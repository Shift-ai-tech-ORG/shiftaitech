import { useRef } from 'react'

export default function Magnetic({ children, strength = 0.28, className = '' }) {
  const ref = useRef(null)

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const r = el.getBoundingClientRect()
    const x = e.clientX - (r.left + r.width / 2)
    const y = e.clientY - (r.top + r.height / 2)
    el.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`
  }

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = 'translate3d(0, 0, 0)'
  }

  return (
    <span className={`magnetic ${className}`.trim()} onMouseMove={onMove} onMouseLeave={onLeave}>
      <span ref={ref} className="magnetic-inner">
        {children}
      </span>
    </span>
  )
}
