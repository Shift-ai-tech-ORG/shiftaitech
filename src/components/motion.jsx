import { useEffect, useRef, useState } from 'react'
import { motion, animate, useInView, useReducedMotion } from 'framer-motion'

/* Strong ease-out — built-in CSS easings are too weak */
export const EASE = [0.23, 1, 0.32, 1]

/* Scroll reveal that respects prefers-reduced-motion (cross-fade only). */
export function Reveal({ children, delay = 0, className, as = 'div', ...rest }) {
  const reduce = useReducedMotion()
  const Tag = motion[as] || motion.div
  return (
    <Tag
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: EASE, delay: Math.min(delay, 0.35) }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/* Clip-path image reveal — media uncovers from the top as it enters the viewport. */
export function MediaReveal({ children, className }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
      whileInView={reduce ? { opacity: 1 } : { clipPath: 'inset(0 0 0% 0)' }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.9, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

/* Count-up number that ticks to its value on first view. */
export function CountUp({ to, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduce = useReducedMotion()
  const [val, setVal] = useState(reduce ? to : 0)

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setVal(to)
      return
    }
    const controls = animate(0, to, {
      duration: 1.2,
      ease: EASE,
      onUpdate: (v) => setVal(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, reduce, to])

  return (
    <span ref={ref} className="tnum">
      {val}
      {suffix}
    </span>
  )
}
